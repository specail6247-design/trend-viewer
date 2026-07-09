// 릴스 에디터: 클립 업로드 → 자막 합성 → 1080x1920 mp4 렌더링 (전부 브라우저 안에서)
(function () {
  const W = 1080, H = 1920, FPS = 30;

  const state = {
    clips: [],        // {file, url, name, duration, in, out, thumb}
    captions: [],     // {start, end, text}
    bgmBuffer: null,
    playing: false,
    cancelFlag: false
  };

  const $ = id => document.getElementById(id);
  const canvas = $("preview-canvas");
  const ctx = canvas.getContext("2d");

  // 재생/렌더 공용 비디오 엘리먼트 (오디오 그래프 제약 때문에 하나만 사용)
  const vid = document.createElement("video");
  vid.playsInline = true;
  vid.preload = "auto";
  vid.crossOrigin = "anonymous";

  // 오디오 그래프 (내보내기 시 생성)
  let audioCtx = null, vidSource = null, vidGain = null, bgmGain = null, streamDest = null;

  // ---------- 기획안 목록 → 셀렉트 ----------
  const sel = $("template-select");
  window.TIPS.forEach(t => {
    const o = document.createElement("option");
    o.value = t.id;
    o.textContent = `EP.${String(t.num).padStart(2, "0")} ${t.emoji} ${t.title}`;
    sel.appendChild(o);
  });
  sel.addEventListener("change", () => { if (sel.value) window.loadTemplate(sel.value); });

  window.loadTemplate = function (id) {
    const tip = window.TIPS.find(t => t.id === id);
    if (!tip) return;
    sel.value = id;
    $("badge-text").value = `루나 울트라 꿀팁 EP.${String(tip.num).padStart(2, "0")}`;
    $("title-text").value = tip.title;
    state.captions = tip.captions.map(c => ({ ...c }));
    renderCaptions();
    drawIdle();
  };

  // ---------- 클립 업로드 ----------
  const clipInput = $("clip-input");
  const dropzone = $("dropzone");
  clipInput.addEventListener("change", () => addFiles(clipInput.files));
  dropzone.addEventListener("dragover", e => { e.preventDefault(); dropzone.classList.add("drag"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("drag"));
  dropzone.addEventListener("drop", e => {
    e.preventDefault(); dropzone.classList.remove("drag");
    addFiles(e.dataTransfer.files);
  });

  async function addFiles(files) {
    for (const f of files) {
      if (!f.type.startsWith("video/")) continue;
      const url = URL.createObjectURL(f);
      const meta = await probe(url);
      state.clips.push({
        file: f, url, name: f.name,
        duration: meta.duration,
        in: 0,
        out: Math.min(meta.duration, 15),
        thumb: meta.thumb
      });
    }
    clipInput.value = "";
    renderClips();
    drawIdle();
  }

  function probe(url) {
    return new Promise(resolve => {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.muted = true;
      v.playsInline = true;
      v.src = url;
      v.addEventListener("loadedmetadata", () => {
        const seekTo = Math.min(0.5, v.duration / 2);
        v.currentTime = seekTo;
        v.addEventListener("seeked", () => {
          const c = document.createElement("canvas");
          c.width = 92; c.height = 140;
          drawCover(c.getContext("2d"), v, 92, 140);
          resolve({ duration: v.duration, thumb: c.toDataURL("image/jpeg", 0.6) });
          v.src = "";
        }, { once: true });
      }, { once: true });
      v.addEventListener("error", () => resolve({ duration: 10, thumb: "" }), { once: true });
    });
  }

  function renderClips() {
    const box = $("clip-list");
    box.innerHTML = "";
    state.clips.forEach((c, i) => {
      const row = document.createElement("div");
      row.className = "clip-item";
      row.innerHTML = `
        ${c.thumb ? `<img class="clip-thumb" src="${c.thumb}">` : `<div class="clip-thumb"></div>`}
        <div class="clip-info">
          <div class="clip-name">${i + 1}. ${c.name}</div>
          <div class="clip-trim">
            <span>시작</span><input type="number" class="t-in" value="${c.in.toFixed(1)}" min="0" max="${c.duration.toFixed(1)}" step="0.5">
            <span>끝</span><input type="number" class="t-out" value="${c.out.toFixed(1)}" min="0" max="${c.duration.toFixed(1)}" step="0.5">
            <span>초 / 전체 ${c.duration.toFixed(1)}초</span>
          </div>
        </div>
        <div class="clip-btns">
          <button class="mv-up" title="위로">▲</button>
          <button class="mv-dn" title="아래로">▼</button>
          <button class="rm" title="삭제">✕</button>
        </div>`;
      row.querySelector(".t-in").addEventListener("change", e => {
        c.in = Math.max(0, Math.min(parseFloat(e.target.value) || 0, c.duration));
        if (c.out <= c.in) c.out = Math.min(c.in + 1, c.duration);
        renderClips();
      });
      row.querySelector(".t-out").addEventListener("change", e => {
        c.out = Math.max(c.in + 0.5, Math.min(parseFloat(e.target.value) || c.duration, c.duration));
        renderClips();
      });
      row.querySelector(".mv-up").addEventListener("click", () => {
        if (i > 0) { [state.clips[i - 1], state.clips[i]] = [state.clips[i], state.clips[i - 1]]; renderClips(); }
      });
      row.querySelector(".mv-dn").addEventListener("click", () => {
        if (i < state.clips.length - 1) { [state.clips[i + 1], state.clips[i]] = [state.clips[i], state.clips[i + 1]]; renderClips(); }
      });
      row.querySelector(".rm").addEventListener("click", () => {
        URL.revokeObjectURL(c.url);
        state.clips.splice(i, 1);
        renderClips();
      });
      box.appendChild(row);
    });
  }

  // 목표 길이에 맞춰 클립 시간 균등 배분
  $("auto-fit").addEventListener("click", () => {
    if (!state.clips.length) return alert("먼저 클립을 올려주세요!");
    const target = parseFloat($("target-dur").value) || 55;
    let remaining = target;
    let flexible = state.clips.slice();
    // 짧은 클립은 전체 사용, 남은 시간을 긴 클립들이 나눠 가짐
    for (let pass = 0; pass < 5 && flexible.length; pass++) {
      const share = remaining / flexible.length;
      const still = [];
      for (const c of flexible) {
        if (c.duration <= share) { c.in = 0; c.out = c.duration; remaining -= c.duration; }
        else still.push(c);
      }
      if (still.length === flexible.length) {
        for (const c of still) { c.in = 0; c.out = Math.min(c.duration, remaining / still.length); }
        remaining = 0; flexible = [];
      } else flexible = still;
    }
    renderClips();
  });

  // ---------- 자막 편집 ----------
  function renderCaptions() {
    const box = $("caption-list");
    box.innerHTML = "";
    state.captions.forEach((c, i) => {
      const row = document.createElement("div");
      row.className = "cap-row";
      row.innerHTML = `
        <input type="number" class="c-start" value="${c.start}" min="0" step="1" title="시작(초)">
        <input type="number" class="c-end" value="${c.end}" min="0" step="1" title="끝(초)">
        <input type="text" class="c-text" value="${c.text.replace(/"/g, "&quot;")}" placeholder="자막 내용">
        <button class="cap-del">✕</button>`;
      row.querySelector(".c-start").addEventListener("change", e => c.start = parseFloat(e.target.value) || 0);
      row.querySelector(".c-end").addEventListener("change", e => c.end = parseFloat(e.target.value) || 0);
      row.querySelector(".c-text").addEventListener("input", e => c.text = e.target.value);
      row.querySelector(".cap-del").addEventListener("click", () => { state.captions.splice(i, 1); renderCaptions(); });
      box.appendChild(row);
    });
  }
  $("add-caption").addEventListener("click", () => {
    const last = state.captions[state.captions.length - 1];
    const s = last ? last.end : 0;
    state.captions.push({ start: s, end: s + 5, text: "" });
    renderCaptions();
  });

  // ---------- BGM ----------
  $("bgm-input").addEventListener("change", async e => {
    const f = e.target.files[0];
    if (!f) { state.bgmBuffer = null; return; }
    try {
      const buf = await f.arrayBuffer();
      const tmpCtx = new (window.AudioContext || window.webkitAudioContext)();
      state.bgmBuffer = await tmpCtx.decodeAudioData(buf);
      tmpCtx.close();
    } catch { alert("음악 파일을 읽을 수 없어요. mp3/m4a/wav를 써보세요."); }
  });

  // ---------- 캔버스 합성 ----------
  function drawCover(c, video, w, h) {
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!vw || !vh) { c.fillStyle = "#000"; c.fillRect(0, 0, w, h); return; }
    const scale = Math.max(w / vw, h / vh);
    const dw = vw * scale, dh = vh * scale;
    c.drawImage(video, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }

  function wrapText(c, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (c.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function drawOverlay(c, t, total) {
    const badge = $("badge-text").value.trim();
    const title = $("title-text").value.trim();
    const mark = $("watermark-text").value.trim();

    // 진행바 (상단)
    if (total > 0) {
      c.fillStyle = "rgba(255,255,255,.25)";
      c.fillRect(0, 0, W, 10);
      const g = c.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, "#f09433"); g.addColorStop(.5, "#dc2743"); g.addColorStop(1, "#bc1888");
      c.fillStyle = g;
      c.fillRect(0, 0, W * Math.min(t / total, 1), 10);
    }

    // 배지
    let y = 150;
    if (badge) {
      c.font = "800 38px Pretendard, 'Apple SD Gothic Neo', sans-serif";
      const bw = c.measureText(badge).width + 56;
      const g = c.createLinearGradient((W - bw) / 2, 0, (W + bw) / 2, 0);
      g.addColorStop(0, "#f09433"); g.addColorStop(1, "#bc1888");
      c.fillStyle = g;
      roundRect(c, (W - bw) / 2, y, bw, 64, 32);
      c.fill();
      c.fillStyle = "#fff";
      c.textAlign = "center"; c.textBaseline = "middle";
      c.fillText(badge, W / 2, y + 34);
      y += 84;
    }

    // 타이틀
    if (title) {
      c.font = "900 58px Pretendard, 'Apple SD Gothic Neo', sans-serif";
      const lines = wrapText(c, title, 880);
      for (const line of lines) {
        const tw = c.measureText(line).width + 48;
        c.fillStyle = "rgba(0,0,0,.55)";
        roundRect(c, (W - tw) / 2, y, tw, 86, 18);
        c.fill();
        c.fillStyle = "#fff";
        c.textAlign = "center"; c.textBaseline = "middle";
        c.fillText(line, W / 2, y + 46);
        y += 96;
      }
    }

    // 자막 (하단, 인스타 UI 안전영역 위)
    const active = state.captions.filter(cp => t >= cp.start && t < cp.end && cp.text.trim());
    if (active.length) {
      c.font = "900 56px Pretendard, 'Apple SD Gothic Neo', sans-serif";
      const lines = wrapText(c, active[0].text, 820);
      let cy = 1560 - (lines.length - 1) * 92;
      for (const line of lines) {
        const tw = c.measureText(line).width + 52;
        c.fillStyle = "rgba(0,0,0,.62)";
        roundRect(c, (W - tw) / 2, cy - 44, tw, 88, 20);
        c.fill();
        c.fillStyle = "#ffe14d";
        c.textAlign = "center"; c.textBaseline = "middle";
        c.fillText(line, W / 2, cy + 2);
        cy += 92;
      }
    }

    // 워터마크
    if (mark && mark !== "@") {
      c.font = "600 34px Pretendard, sans-serif";
      c.fillStyle = "rgba(255,255,255,.65)";
      c.textAlign = "center"; c.textBaseline = "middle";
      c.fillText(mark, W / 2, 1700);
    }
  }

  function drawFrame(c, t, total) {
    c.fillStyle = "#000";
    c.fillRect(0, 0, W, H);
    drawCover(c, vid, W, H);
    drawOverlay(c, t, total);
  }

  function drawIdle() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#333";
    ctx.font = "600 44px Pretendard, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    if (!state.clips.length) {
      ctx.fillText("클립을 올리면", W / 2, H / 2 - 40);
      ctx.fillText("여기 미리보기가 떠요", W / 2, H / 2 + 40);
    } else {
      ctx.fillText("▶️ 미리보기를 눌러보세요", W / 2, H / 2);
    }
    drawOverlay(ctx, 0, 0);
  }

  function totalDuration() {
    return state.clips.reduce((s, c) => s + (c.out - c.in), 0);
  }

  function loadClip(url) {
    return new Promise((resolve, reject) => {
      if (vid.src === url && vid.readyState >= 2) return resolve();
      vid.src = url;
      vid.addEventListener("loadeddata", () => resolve(), { once: true });
      vid.addEventListener("error", () => reject(new Error("클립 로드 실패")), { once: true });
    });
  }

  function seekTo(t) {
    return new Promise(resolve => {
      if (Math.abs(vid.currentTime - t) < 0.05) return resolve();
      vid.currentTime = t;
      vid.addEventListener("seeked", () => resolve(), { once: true });
    });
  }

  // 클립들을 순서대로 재생하면서 매 프레임 draw(t, total) 호출
  async function playThrough(drawCtx, onDone) {
    const total = totalDuration();
    let done = 0;
    state.cancelFlag = false;

    for (const clip of state.clips) {
      if (state.cancelFlag) break;
      await loadClip(clip.url);
      await seekTo(clip.in);
      try { await vid.play(); } catch (e) { /* 자동재생 차단 등 */ }

      await new Promise(resolve => {
        function tick() {
          if (state.cancelFlag) { vid.pause(); return resolve(); }
          const local = vid.currentTime - clip.in;
          const t = done + Math.max(0, local);
          drawFrame(drawCtx, t, total);
          if (vid.currentTime >= clip.out || vid.ended) { vid.pause(); return resolve(); }
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
      done += clip.out - clip.in;
    }
    onDone && onDone();
  }

  // ---------- 미리보기 ----------
  $("btn-preview").addEventListener("click", async () => {
    if (!state.clips.length) return alert("먼저 클립을 올려주세요!");
    if (state.playing) return;
    state.playing = true;
    vid.muted = !$("original-audio").checked;
    if (vidGain) vidGain.gain.value = $("original-audio").checked ? 1 : 0;
    await playThrough(ctx, () => { state.playing = false; drawIdle(); });
  });

  $("btn-stop").addEventListener("click", () => {
    state.cancelFlag = true;
    state.playing = false;
  });

  // ---------- 내보내기 ----------
  function pickMime() {
    const candidates = [
      'video/mp4;codecs="avc1.640028,mp4a.40.2"',
      'video/mp4;codecs="avc1.640028"',
      "video/mp4",
      'video/webm;codecs="vp9,opus"',
      "video/webm"
    ];
    for (const m of candidates) {
      if (window.MediaRecorder && MediaRecorder.isTypeSupported(m)) return m;
    }
    return "";
  }

  function setupAudioGraph() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      vidSource = audioCtx.createMediaElementSource(vid);
      vidGain = audioCtx.createGain();
      bgmGain = audioCtx.createGain();
      streamDest = audioCtx.createMediaStreamDestination();
      vidSource.connect(vidGain);
      vidGain.connect(streamDest);
      vidGain.connect(audioCtx.destination); // 렌더 중에도 들리게
      bgmGain.connect(streamDest);
      bgmGain.connect(audioCtx.destination);
    }
    audioCtx.resume();
  }

  $("btn-export").addEventListener("click", async () => {
    if (!state.clips.length) return alert("먼저 클립을 올려주세요!");
    if (state.playing) return alert("미리보기를 정지한 뒤 다시 눌러주세요.");

    const mime = pickMime();
    if (!mime) return alert("이 브라우저는 영상 녹화를 지원하지 않아요. 크롬이나 사파리 최신 버전을 써주세요.");

    const status = $("export-status");
    const result = $("export-result");
    result.innerHTML = "";
    const btn = $("btn-export");
    btn.disabled = true;

    const total = totalDuration();
    const useAudio = $("original-audio").checked || state.bgmBuffer;

    // 오디오 그래프
    let bgmNode = null;
    if (useAudio) {
      setupAudioGraph();
      vid.muted = false;
      vidGain.gain.value = $("original-audio").checked ? 1 : 0;
      if (state.bgmBuffer) {
        bgmNode = audioCtx.createBufferSource();
        bgmNode.buffer = state.bgmBuffer;
        bgmNode.loop = true;
        bgmNode.connect(bgmGain);
        bgmGain.gain.value = $("original-audio").checked ? 0.25 : 0.9;
      }
    } else {
      vid.muted = true;
      if (vidGain) vidGain.gain.value = 0;
    }

    // 렌더용 캔버스 (화면 캔버스를 그대로 사용해 진행상황이 보이게)
    const stream = canvas.captureStream(FPS);
    if (useAudio && streamDest) {
      streamDest.stream.getAudioTracks().forEach(tr => stream.addTrack(tr));
    }

    const chunks = [];
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 12_000_000 });
    rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };

    const recDone = new Promise(resolve => (rec.onstop = resolve));
    rec.start(1000);
    if (bgmNode) bgmNode.start();

    state.playing = true;
    const timer = setInterval(() => {
      status.textContent = `🎬 렌더링 중... 잠시만요 (${Math.round(total)}초 분량)`;
    }, 500);
    status.textContent = "🎬 렌더링 시작!";

    await playThrough(ctx, null);

    rec.stop();
    if (bgmNode) { try { bgmNode.stop(); } catch {} }
    await recDone;
    clearInterval(timer);
    state.playing = false;
    btn.disabled = false;

    if (state.cancelFlag) { status.textContent = "⏹ 렌더링을 취소했어요."; drawIdle(); return; }

    const isMp4 = mime.startsWith("video/mp4");
    const blob = new Blob(chunks, { type: isMp4 ? "video/mp4" : "video/webm" });
    const url = URL.createObjectURL(blob);
    const ep = ($("badge-text").value.match(/EP\.?(\d+)/i) || [])[1] || "";
    const fname = `luna-reels${ep ? "-ep" + ep : ""}.${isMp4 ? "mp4" : "webm"}`;

    status.textContent = `✅ 완성! (${(blob.size / 1024 / 1024).toFixed(1)}MB)`;
    result.innerHTML = "";
    const v = document.createElement("video");
    v.src = url; v.controls = true; v.playsInline = true;
    const a = document.createElement("a");
    a.href = url; a.download = fname; a.className = "dl";
    a.textContent = `⬇️ ${fname} 저장하기`;
    const p = document.createElement("p");
    p.className = "hint";
    p.textContent = isMp4
      ? "저장한 파일을 인스타그램 릴스에 바로 올리면 돼요! 📲"
      : "webm 파일이 나왔어요. 아이폰/인스타 업로드가 안 되면 크롬 최신 버전에서 다시 만들어 보세요.";
    result.append(v, a, p);
    drawIdle();
  });

  // 초기 화면
  drawIdle();
})();
