// 탭 전환 + 기획안 목록 + 복사 기능
(function () {
  // ---- 탭 ----
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
      window.scrollTo({ top: 0 });
    });
  });
  window.switchTab = function (name) {
    document.querySelector(`.tab[data-tab="${name}"]`).click();
  };

  function copyText(text, el, cls) {
    navigator.clipboard.writeText(text).then(() => {
      el.classList.add(cls || "copied");
      setTimeout(() => el.classList.remove(cls || "copied"), 1500);
    });
  }

  // ---- 기획안 카드 렌더 ----
  const list = document.getElementById("tips-list");
  window.TIPS.forEach(tip => {
    const card = document.createElement("div");
    card.className = "tip-card";

    const scenesHtml = tip.scenes.map(s => `
      <div class="scene">
        <div class="scene-head">
          <span class="scene-time">${s.time}</span>
          <span class="scene-label">${s.label}</span>
        </div>
        <div class="scene-action">📷 ${s.action}</div>
        ${s.aiPrompt ? `<div class="ai-prompt" data-copy="${s.aiPrompt.replace(/"/g, "&quot;")}">${s.aiPrompt}</div>` : ""}
      </div>`).join("");

    card.innerHTML = `
      <div class="tip-head">
        <span class="tip-num">EP.${String(tip.num).padStart(2, "0")}</span>
        <h3>${tip.emoji} ${tip.title}</h3>
        <span class="tip-level">${tip.level}</span>
        <span class="tip-arrow">▶</span>
      </div>
      <div class="tip-body">
        <div class="tip-hook"><b>훅 (첫 3초):</b> ${tip.hook}</div>
        ${scenesHtml}
        <div class="tip-actions">
          <button class="btn primary act-make">🎬 이 기획안으로 만들기</button>
          <button class="btn act-script">📋 촬영 대본 복사</button>
          <button class="btn act-caption">#️⃣ 캡션+해시태그 복사</button>
        </div>
      </div>`;

    card.querySelector(".tip-head").addEventListener("click", () => card.classList.toggle("open"));

    card.querySelector(".act-make").addEventListener("click", () => {
      window.loadTemplate(tip.id);
      window.switchTab("editor");
    });

    card.querySelector(".act-script").addEventListener("click", e => {
      const script = [
        `【${tip.title}】 (약 55초)`,
        `커버 문구: ${tip.cover.replace(/\n/g, " ")}`,
        `훅: ${tip.hook}`,
        "",
        ...tip.scenes.map(s => `[${s.time}] ${s.label}\n촬영: ${s.action}${s.aiPrompt ? `\nAI 프롬프트: ${s.aiPrompt}` : ""}`),
        "",
        "자막 타이밍:",
        ...tip.captions.map(c => `${c.start}~${c.end}초: ${c.text}`)
      ].join("\n");
      copyText(script, e.target);
      e.target.textContent = "✓ 복사됨!";
      setTimeout(() => (e.target.textContent = "📋 촬영 대본 복사"), 1500);
    });

    card.querySelector(".act-caption").addEventListener("click", e => {
      copyText(tip.igCaption, e.target);
      e.target.textContent = "✓ 복사됨!";
      setTimeout(() => (e.target.textContent = "#️⃣ 캡션+해시태그 복사"), 1500);
    });

    card.querySelectorAll(".ai-prompt").forEach(p => {
      p.addEventListener("click", () => copyText(p.dataset.copy, p));
    });

    list.appendChild(card);
  });

  // ---- 해시태그 세트 복사 ----
  document.querySelectorAll(".tag-set").forEach(t => {
    t.addEventListener("click", () => copyText(t.dataset.copy, t));
  });
})();
