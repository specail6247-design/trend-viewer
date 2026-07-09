// 루나 울트라 팁 릴스 기획안 12개
// captions: 영상에 자동으로 입혀지는 자막 (초 단위 시작/끝)
// scenes: 촬영 가이드 + AI 영상 생성용 프롬프트 (Kling/Runway/Sora 등에 붙여넣기)
window.TIPS = [
  {
    id: "ninja-walk",
    num: 1,
    emoji: "🚶",
    title: "흔들림 0% 워킹샷 (닌자 워크)",
    cover: "워킹샷이 흔들린다면\n이 영상 저장하세요",
    hook: "워킹샷 찍을 때마다 화면이 울렁거린다면, 딱 3가지만 고치면 됩니다.",
    level: "입문",
    scenes: [
      { time: "0-3초", label: "훅", action: "흔들리는 영상 vs 부드러운 영상을 반반 화면처럼 연달아 보여주기. 루나 울트라를 손에 든 채 카메라를 향해 걸어오면서 시작.", aiPrompt: "Split comparison shot: shaky handheld walking footage vs buttery smooth gimbal-stabilized walking footage on a city street, 9:16 vertical video, cinematic" },
      { time: "3-15초", label: "자세", action: "팔꿈치를 몸통에 붙이고 카메라를 가슴 높이로 드는 모습을 정면+측면에서 촬영. 손목이 아니라 팔 전체로 드는 걸 강조.", aiPrompt: "Close-up of hands holding a compact gimbal camera at chest height, elbows tucked in, side profile view, soft natural light, 9:16 vertical" },
      { time: "15-30초", label: "닌자 워크", action: "무릎을 살짝 굽히고 발뒤꿈치→발끝 순서로 착지하며 걷는 발을 클로즈업. 그 상태로 찍은 부드러운 결과물을 바로 이어 붙이기.", aiPrompt: "Slow motion close-up of feet walking heel-to-toe smoothly on pavement, ninja walk technique, then smooth gliding camera movement through a park, golden hour, 9:16 vertical" },
      { time: "30-48초", label: "결과", action: "골목/공원/계단에서 루나 울트라로 찍은 시네마틱 워킹샷 3컷을 리듬감 있게 연결.", aiPrompt: "Cinematic gimbal tracking shot gliding through a narrow alley with warm string lights, ultra smooth, film look, 9:16 vertical video" },
      { time: "48-55초", label: "CTA", action: "카메라를 향해 '저장해두고 따라 해보세요' 제스처. 다음 팁 예고.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "워킹샷 흔들린다면 이거 보세요" },
      { start: 3, end: 15, text: "① 팔꿈치는 몸에 붙이고 가슴 높이로" },
      { start: 15, end: 30, text: "② 무릎 굽히고 뒤꿈치부터 착지 = 닌자 워크" },
      { start: 30, end: 48, text: "③ 나머지 미세 떨림은 3축 짐벌이 다 잡아줘요" },
      { start: 48, end: 55, text: "저장해두고 따라 해보세요 👉 팔로우" }
    ],
    igCaption: "워킹샷이 자꾸 흔들린다면 자세부터 고쳐야 해요 🚶\n\n1️⃣ 팔꿈치 몸에 붙이기\n2️⃣ 카메라는 가슴 높이\n3️⃣ 닌자 워크로 걷기\n\n나머지는 루나 울트라 3축 짐벌이 알아서 💪\n\n#인스타360 #insta360 #루나울트라 #lunaultra #짐벌카메라 #워킹샷 #영상꿀팁 #릴스꿀팁 #브이로그카메라 #카메라추천"
  },
  {
    id: "deep-track",
    num: 2,
    emoji: "🎯",
    title: "혼자서도 촬영팀처럼 — Deep Track 5.0",
    cover: "카메라가 나를\n따라다니게 하는 법",
    hook: "삼각대에 올려두면 카메라가 알아서 나를 따라다닙니다. 촬영자가 필요 없어요.",
    level: "입문",
    scenes: [
      { time: "0-3초", label: "훅", action: "삼각대 위 루나 울트라 앞에서 좌우로 움직이면 카메라 헤드가 따라 도는 걸 뒤에서 촬영 (폰으로 촬영).", aiPrompt: "A compact gimbal camera on a tripod automatically rotating to follow a person walking left and right in a bright studio, rear view showing the camera panning, 9:16 vertical" },
      { time: "3-15초", label: "설정법", action: "화면에서 피사체를 탭 한 번 → 트래킹 박스 생기는 화면 녹화 or 클로즈업. 'Deep Track 5.0 켜는 법은 탭 한 번' 강조.", aiPrompt: "Close-up of a finger tapping a camera touchscreen, subject tracking box appearing around a person, UI highlight, 9:16 vertical" },
      { time: "15-35초", label: "실전", action: "요리/운동/댄스 중 카메라가 계속 나를 프레임 중앙에 잡아주는 결과물. 빠르게 움직여도 안 놓치는 장면 포함.", aiPrompt: "A person dancing energetically in a living room while the camera smoothly auto-tracks keeping them centered, dynamic movement, 9:16 vertical video" },
      { time: "35-48초", label: "꿀팁", action: "가려졌다 나타나도 다시 잡아주는 장면 (기둥 뒤로 숨었다 나오기).", aiPrompt: "Person walking behind a pillar and reappearing, camera re-acquiring subject tracking instantly, smooth follow shot, 9:16 vertical" },
      { time: "48-55초", label: "CTA", action: "'이제 혼자서도 브이로그 찍으세요' 멘트 + 팔로우 유도.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "카메라가 알아서 나를 따라다닙니다" },
      { start: 3, end: 15, text: "화면에서 나를 탭 한 번 = Deep Track 5.0 ON" },
      { start: 15, end: 35, text: "요리하든 춤추든 항상 화면 중앙에 📍" },
      { start: 35, end: 48, text: "가려졌다 나와도 다시 찾아서 잡아줘요" },
      { start: 48, end: 55, text: "혼자서도 촬영팀처럼 👉 팔로우" }
    ],
    igCaption: "혼자 브이로그 찍는 사람 무조건 저장 🎯\n\n루나 울트라 화면에서 나를 탭 한 번이면\nDeep Track 5.0이 알아서 따라다녀요\n\n✔️ 빠르게 움직여도 OK\n✔️ 가려졌다 나와도 다시 추적\n✔️ 촬영자 없이 혼자 촬영 완성\n\n#인스타360 #루나울트라 #lunaultra #딥트래킹 #혼자브이로그 #브이로그카메라 #영상꿀팁 #릴스꿀팁 #insta360 #셀프촬영"
  },
  {
    id: "zoom-track",
    num: 3,
    emoji: "🔭",
    title: "멀어져도 놓치지 않는 액티브 줌 트래킹",
    cover: "멀리 뛰어가도\n카메라가 줌으로 따라옴",
    hook: "피사체가 멀어지면 카메라가 스스로 줌을 당겨서 크기를 유지합니다.",
    level: "중급",
    scenes: [
      { time: "0-3초", label: "훅", action: "카메라에서 멀리 뛰어가는데 화면 속 내 크기는 그대로인 결과물부터 보여주기.", aiPrompt: "Person running far away from camera on a beach but staying the same size in frame as the camera automatically zooms in, tracking shot, 9:16 vertical" },
      { time: "3-15초", label: "원리", action: "트래킹 설정에서 '액티브 줌 트래킹' 켜는 화면 클로즈업. 12배 줌(6배 무손실) 자막 강조.", aiPrompt: "Camera touchscreen UI close-up, toggling Active Zoom Tracking option, finger tap, clean interface, 9:16 vertical" },
      { time: "15-38초", label: "실전", action: "아이/반려견/자전거처럼 빠르게 멀어지는 피사체를 줌 트래킹으로 잡은 결과물 2~3컷.", aiPrompt: "A dog running across a wide park lawn, camera auto-zooming to keep the dog large in frame, sharp telephoto compression, 9:16 vertical video" },
      { time: "38-50초", label: "비교", action: "일반 트래킹(점점 작아짐) vs 줌 트래킹(크기 유지) 비교 컷.", aiPrompt: "Side by side comparison: subject shrinking in frame vs subject kept large via automatic zoom tracking, split screen, 9:16 vertical" },
      { time: "50-55초", label: "CTA", action: "'운동회, 공연 촬영에서 진가 발휘' 멘트.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "멀어져도 내 크기가 그대로?!" },
      { start: 3, end: 15, text: "트래킹 설정 → 액티브 줌 트래킹 ON" },
      { start: 15, end: 38, text: "최대 12배 줌으로 알아서 당겨서 따라와요" },
      { start: 38, end: 50, text: "일반 트래킹 vs 줌 트래킹, 차이 보이시죠?" },
      { start: 50, end: 55, text: "아이·반려견 촬영 필수템 👉 팔로우" }
    ],
    igCaption: "운동회, 공연, 반려견 촬영하는 분들 🔭\n\n피사체가 멀어지면 루나 울트라가\n알아서 줌을 당겨서 크기를 유지해줘요\n\n✔️ 액티브 줌 트래킹\n✔️ 최대 12배 줌 (6배 무손실)\n✔️ 망원렌즈라 화질 그대로\n\n#인스타360 #루나울트라 #lunaultra #줌트래킹 #망원카메라 #아이촬영 #반려견스타그램 #영상꿀팁 #insta360 #릴스꿀팁"
  },
  {
    id: "slowmo",
    num: 4,
    emoji: "💧",
    title: "4K 120fps 슬로우 모션 인생샷",
    cover: "이 슬로우모션\n폰으로는 못 찍어요",
    hook: "물 튀기기, 머리 넘기기, 점프 — 4K 120fps로 찍으면 전부 영화가 됩니다.",
    level: "입문",
    scenes: [
      { time: "0-3초", label: "훅", action: "물웅덩이 밟아서 물 튀기는 슬로우모션 임팩트 컷.", aiPrompt: "Ultra slow motion of a shoe splashing into a puddle, water droplets frozen in air, backlit by sunset, 4K 120fps look, 9:16 vertical" },
      { time: "3-15초", label: "설정", action: "해상도 메뉴에서 4K 120fps 선택하는 화면. '8K는 30fps, 슬로우는 4K 120' 자막.", aiPrompt: "Camera settings screen close-up selecting 4K 120fps mode, finger tapping, clean modern UI, 9:16 vertical" },
      { time: "15-35초", label: "실전 3컷", action: "머리카락 휘날리기 / 점프 / 음료 따르기 슬로우모션 3연속.", aiPrompt: "Slow motion of long hair flipping in golden backlight, then a person jumping mid-air, then iced coffee being poured with splashing droplets, cinematic 9:16 vertical montage" },
      { time: "35-48초", label: "꿀팁", action: "'슬로우는 빛이 생명 — 역광에서 찍으세요' 역광 비교 컷.", aiPrompt: "Backlit slow motion portrait with sun flare behind subject, dust particles floating, dreamy cinematic look, 9:16 vertical" },
      { time: "48-55초", label: "CTA", action: "'여러분의 슬로우모션 소재는? 댓글로' 참여 유도.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "이 슬로우모션, 폰으로는 못 찍어요" },
      { start: 3, end: 15, text: "설정 → 4K 120fps 슬로우 모션" },
      { start: 15, end: 35, text: "물튀김·점프·머리 넘기기 = 전부 영화 🎬" },
      { start: 35, end: 48, text: "꿀팁: 역광에서 찍으면 감성 2배" },
      { start: 48, end: 55, text: "뭘 슬로우로 찍을지 댓글로 👇" }
    ],
    igCaption: "슬로우모션 맛집은 4K 120fps 💧\n\n루나 울트라 설정에서 4K 120fps 켜고\n물튀김 / 점프 / 머리 넘기기 찍어보세요\n\n꿀팁: 역광에서 찍으면 감성이 2배가 됩니다 🌅\n\n#인스타360 #루나울트라 #lunaultra #슬로우모션 #4k120fps #감성영상 #영상꿀팁 #릴스꿀팁 #insta360 #브이로그"
  },
  {
    id: "telephoto",
    num: 5,
    emoji: "🌆",
    title: "12배 줌 압축샷 — 배경을 끌어당겨라",
    cover: "인물은 그대로\n배경만 커지는 마법",
    hook: "망원으로 찍으면 뒤에 있는 노을과 건물이 어마어마하게 커집니다. 이게 압축 효과예요.",
    level: "중급",
    scenes: [
      { time: "0-3초", label: "훅", action: "광각 인물샷 → 같은 자리 망원 압축샷으로 전환. 배경 커지는 임팩트.", aiPrompt: "Transition from wide angle portrait to telephoto compressed shot of the same person, background sunset becoming huge behind them, 9:16 vertical" },
      { time: "3-15초", label: "원리", action: "'피사체에서 멀리 떨어지고 줌으로 당기면 배경이 커진다' 도식 or 실연.", aiPrompt: "Diagram-style shot showing camera moving far from subject then zooming in, background appearing larger, educational visual, 9:16 vertical" },
      { time: "15-38초", label: "실전", action: "노을/보름달/도시 야경 배경 압축샷 결과물. 60mm 망원렌즈 6배 무손실 줌 자막.", aiPrompt: "Telephoto compressed shot of a person silhouetted against a giant orange sunset sun, then against a huge full moon over city skyline, cinematic 9:16 vertical" },
      { time: "38-50초", label: "꿀팁", action: "'무손실은 6배까지, 달 찍을 땐 12배' 줌 단계별 화면.", aiPrompt: "Zoom progression from 1x to 12x on a full moon over a city, each step getting closer, sharp detail, 9:16 vertical" },
      { time: "50-55초", label: "CTA", action: "'오늘 노을에 바로 도전' 멘트.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "배경이 갑자기 커지는 마법 🌆" },
      { start: 3, end: 15, text: "멀리 떨어져서 줌으로 당기면 = 압축 효과" },
      { start: 15, end: 38, text: "60mm 망원렌즈로 노을·달·야경을 끌어당겨요" },
      { start: 38, end: 50, text: "무손실 6배 · 최대 12배 줌" },
      { start: 50, end: 55, text: "오늘 노을로 바로 도전 👉 저장" }
    ],
    igCaption: "인물은 그대로인데 배경만 커지는 마법 🌆\n\n비결은 '압축 효과'\n피사체에서 멀리 떨어진 다음\n루나 울트라 망원으로 당기면 끝\n\n✔️ 60mm 전문 망원렌즈\n✔️ 6배 무손실 / 최대 12배 줌\n\n#인스타360 #루나울트라 #lunaultra #압축샷 #망원렌즈 #노을맛집 #인생샷 #사진꿀팁 #insta360 #릴스꿀팁"
  },
  {
    id: "leica-color",
    num: 6,
    emoji: "🎨",
    title: "라이카 컬러 3종 비교 — 필터 없이 감성",
    cover: "보정 없이 이 색감?\n라이카 컬러의 비밀",
    hook: "같은 장면인데 색감이 완전히 다릅니다. 라이카 컬러 프로필 3종, 뭐가 다를까요?",
    level: "입문",
    scenes: [
      { time: "0-3초", label: "훅", action: "같은 장면을 Natural/Vivid/Chrome으로 빠르게 전환하며 보여주기.", aiPrompt: "Same street scene cycling through three color grades: natural tones, vivid saturated colors, and classic chrome film look, quick cuts, 9:16 vertical" },
      { time: "3-18초", label: "Natural", action: "인물·일상 브이로그 컷에 Leica Natural 적용 결과. '피부톤이 제일 예쁨' 자막.", aiPrompt: "Soft natural color graded portrait video, true-to-life skin tones, gentle contrast, everyday vlog scene in a cafe, 9:16 vertical" },
      { time: "18-33초", label: "Vivid", action: "여행·풍경 컷에 Leica Vivid. 파란 하늘, 초록 숲 쨍한 색감.", aiPrompt: "Vibrant saturated travel footage, deep blue sky over turquoise ocean, lush green palm trees, punchy colors, 9:16 vertical" },
      { time: "33-48초", label: "Chrome", action: "도시·흑백 감성 컷에 Leica Chrome. 필름 무드 강조.", aiPrompt: "Moody classic chrome film look, urban street at dusk, muted tones with rich blacks, cinematic film grain, 9:16 vertical" },
      { time: "48-55초", label: "CTA", action: "'여러분 취향은 몇 번? 댓글로' 참여 유도.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "보정 없이 이 색감이 나온다고?" },
      { start: 3, end: 18, text: "① Leica Natural — 피부톤 최강, 일상용" },
      { start: 18, end: 33, text: "② Leica Vivid — 여행·풍경 쨍하게" },
      { start: 33, end: 48, text: "③ Leica Chrome — 필름 무드 그 자체" },
      { start: 48, end: 55, text: "당신의 취향은? 댓글로 👇" }
    ],
    igCaption: "보정 1도 안 한 색감입니다 🎨\n\n루나 울트라에 들어간 라이카 컬러 프로필 3종\n\n1️⃣ Natural — 일상, 인물 (피부톤 최강)\n2️⃣ Vivid — 여행, 풍경 (쨍한 색감)\n3️⃣ Chrome — 시티, 무드 (필름 감성)\n\n당신의 취향은 몇 번? 👇\n\n#인스타360 #루나울트라 #lunaultra #라이카 #leica #색감맛집 #필름감성 #영상꿀팁 #insta360 #브이로그카메라"
  },
  {
    id: "qr-color",
    num: 7,
    emoji: "📲",
    title: "QR 한 번에 색감 복사 — 컬러 쉐어",
    cover: "그 유튜버 색감,\nQR 찍으면 내 것",
    hook: "좋아하는 크리에이터의 색감을 QR 스캔 한 번으로 그대로 가져올 수 있습니다.",
    level: "중급",
    scenes: [
      { time: "0-3초", label: "훅", action: "QR 스캔 → 화면 색감이 즉시 바뀌는 순간 포착.", aiPrompt: "Camera scanning a QR code and the live preview instantly changing to a cinematic color grade, magic moment, 9:16 vertical" },
      { time: "3-18초", label: "받기", action: "다른 유저가 공유한 컬러 QR을 스캔해서 내 카메라에 적용하는 과정.", aiPrompt: "Step by step: phone displaying a color profile QR code, gimbal camera scanning it, color profile applied notification, 9:16 vertical" },
      { time: "18-35초", label: "만들기", action: "내가 만든 커스텀 색감을 QR로 내보내는 과정. '내 시그니처 컬러 만들기' 자막.", aiPrompt: "Creating a custom color profile on camera touchscreen, exporting it as a shareable QR code, clean UI, 9:16 vertical" },
      { time: "35-48초", label: "활용", action: "친구/팀원과 색감 통일해서 찍은 결과물 비교. '멀티캠 색 맞추기 끝' 자막.", aiPrompt: "Two creators filming the same event with perfectly matched color grades, side by side footage comparison, 9:16 vertical" },
      { time: "48-55초", label: "CTA", action: "'제 시그니처 컬러 QR은 다음 게시물에' 예고 → 다음 게시물 유도.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "그 색감, QR 찍으면 내 거예요 📲" },
      { start: 3, end: 18, text: "QR 스캔 한 번 → 색감 그대로 복사" },
      { start: 18, end: 35, text: "내 커스텀 색감도 QR로 공유 가능" },
      { start: 35, end: 48, text: "친구랑 색감 통일 = 멀티캠 색 맞추기 끝" },
      { start: 48, end: 55, text: "내 시그니처 컬러는 다음 게시물에 👉" }
    ],
    igCaption: "좋아하는 크리에이터 색감 훔치는 법 (합법) 📲\n\n루나 울트라는 색감을 QR로 공유해요\n스캔 한 번이면 그 색감이 내 카메라에 그대로\n\n✔️ 커스텀 색감 QR 내보내기\n✔️ 팀 촬영 색감 통일\n✔️ 시그니처 컬러 만들기\n\n#인스타360 #루나울트라 #lunaultra #색감공유 #컬러그레이딩 #영상꿀팁 #insta360 #릴스꿀팁 #크리에이터 #브이로그"
  },
  {
    id: "ilog",
    num: 8,
    emoji: "🎬",
    title: "10-bit I-Log — 색보정하는 사람은 무조건",
    cover: "영상 색보정 한다면\n무조건 켜야 하는 설정",
    hook: "나중에 색보정할 거라면 I-Log로 찍으세요. 밝은 곳도 어두운 곳도 정보가 살아있습니다.",
    level: "고급",
    scenes: [
      { time: "0-3초", label: "훅", action: "물 빠진 로그 원본 → 보정 완성본으로 확 바뀌는 비포애프터.", aiPrompt: "Flat desaturated log footage transforming into rich cinematic color graded footage, before and after wipe transition, 9:16 vertical" },
      { time: "3-18초", label: "설정", action: "촬영 설정에서 10-bit I-Log 켜는 화면. '14스톱 다이내믹 레인지' 자막.", aiPrompt: "Camera menu close-up enabling 10-bit I-Log recording mode, professional settings screen, 9:16 vertical" },
      { time: "18-35초", label: "왜?", action: "역광 장면에서 일반 모드(하늘 날아감) vs I-Log(하늘 살아있음) 비교.", aiPrompt: "Backlit scene comparison: blown out white sky in standard mode vs fully detailed sunset sky recovered from log footage, split screen, 9:16 vertical" },
      { time: "35-48초", label: "보정", action: "다빈치 리졸브에서 LUT 적용하는 화면 녹화. '다빈치 네이티브 호환' 자막.", aiPrompt: "Screen recording of DaVinci Resolve color page, applying a LUT to log footage, color wheels adjustment, 9:16 vertical crop" },
      { time: "48-55초", label: "CTA", action: "'색보정 기초편 원하면 댓글 + 팔로우'.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "색보정할 거면 무조건 이 설정" },
      { start: 3, end: 18, text: "10-bit I-Log ON — 14스톱 다이내믹 레인지" },
      { start: 18, end: 35, text: "역광에서도 하늘이 안 날아가요 ☀️" },
      { start: 35, end: 48, text: "다빈치 리졸브 네이티브 호환으로 보정 편하게" },
      { start: 48, end: 55, text: "색보정 기초편 원하면 댓글 👇" }
    ],
    igCaption: "영상 색보정 입문자들 이거 모르고 찍으면 후회해요 🎬\n\n루나 울트라의 10-bit I-Log\n\n✔️ 14스톱 다이내믹 레인지\n✔️ 역광에서도 하늘 정보 살아있음\n✔️ 다빈치 리졸브 네이티브 호환\n\n색보정 기초편 원하면 댓글로!\n\n#인스타360 #루나울트라 #lunaultra #색보정 #다빈치리졸브 #log촬영 #영상편집 #영상꿀팁 #insta360 #시네마틱"
  },
  {
    id: "remote-screen",
    num: 9,
    emoji: "📺",
    title: "분리형 스크린으로 20m 셀프캠",
    cover: "화면을 떼서\n손에 들고 다니는 카메라",
    hook: "루나 울트라는 화면이 분리됩니다. 카메라는 저기에, 화면은 내 손에.",
    level: "입문",
    scenes: [
      { time: "0-3초", label: "훅", action: "카메라에서 터치스크린을 '똑' 떼어내는 순간 클로즈업.", aiPrompt: "Close-up of a small touchscreen detaching from a gimbal camera with a satisfying click, product shot, 9:16 vertical" },
      { time: "3-18초", label: "원리", action: "카메라는 삼각대에, 분리한 화면은 손에 들고 멀리 떨어져서 구도 확인하는 모습. '최대 20m HD 전송' 자막.", aiPrompt: "Person standing 15 meters from a tripod-mounted camera, holding a detached screen showing live HD preview, outdoor scene, 9:16 vertical" },
      { time: "18-38초", label: "실전", action: "혼자 전신 인생샷/댄스 챌린지 찍으면서 손 안의 화면으로 실시간 확인. 화면 속 화면 연출.", aiPrompt: "Person filming a full-body dance video alone, checking framing on a small handheld monitor, picture-in-picture composition, 9:16 vertical" },
      { time: "38-50초", label: "꿀팁", action: "화면으로 녹화 시작/정지 원격 조작하는 모습. '왔다갔다 할 필요 없음' 자막.", aiPrompt: "Finger tapping record button on a detached wireless camera screen, remote control demonstration, 9:16 vertical" },
      { time: "50-55초", label: "CTA", action: "'혼자 찍는 사람들 저장 필수' 멘트.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "화면이 분리되는 카메라?! 📺" },
      { start: 3, end: 18, text: "카메라는 저기에, 화면은 내 손에 (20m HD 전송)" },
      { start: 18, end: 38, text: "혼자서도 전신샷 구도를 실시간으로 확인" },
      { start: 38, end: 50, text: "녹화 시작/정지도 손에서 원격으로" },
      { start: 50, end: 55, text: "혼자 찍는 사람 저장 필수 👉" }
    ],
    igCaption: "혼자 촬영하는 사람들에게 혁명입니다 📺\n\n루나 울트라는 터치스크린이 분리돼요\n\n✔️ 카메라는 삼각대에, 화면은 내 손에\n✔️ 최대 20m HD 실시간 전송\n✔️ 원격으로 녹화 시작/정지\n\n전신샷 찍으러 왔다갔다 이제 그만 🙅\n\n#인스타360 #루나울트라 #lunaultra #셀프촬영 #혼자브이로그 #댄스챌린지 #영상꿀팁 #insta360 #릴스꿀팁 #브이로그카메라"
  },
  {
    id: "angles",
    num: 10,
    emoji: "🔄",
    title: "로우앵글 트릭샷 — 발밑에서 하늘까지",
    cover: "같은 장소가\n다르게 보이는 앵글 3개",
    hook: "눈높이로만 찍으면 다 똑같아 보여요. 앵글만 바꿔도 새 영상이 됩니다.",
    level: "중급",
    scenes: [
      { time: "0-3초", label: "훅", action: "지면 스치듯 낮게 달리는 로우앵글 임팩트 컷.", aiPrompt: "Ultra low angle gimbal shot skimming just above the ground moving fast through fallen leaves, dynamic motion, 9:16 vertical" },
      { time: "3-18초", label: "로우앵글", action: "카메라를 뒤집어 지면 가까이에서 워킹샷. 발/자전거 바퀴 따라가기.", aiPrompt: "Inverted gimbal low angle tracking shot following sneakers walking, ground level perspective, shallow depth, 9:16 vertical" },
      { time: "18-33초", label: "하이앵글", action: "머리 위로 들어 올려 군중/식탁/골목을 내려다보는 부감샷.", aiPrompt: "High angle overhead shot looking down at a table full of food, slow rotation, warm light, 9:16 vertical" },
      { time: "33-48초", label: "회전샷", action: "제자리에서 카메라 롤 회전하며 하늘→인물로 이어지는 트랜지션.", aiPrompt: "Camera rolling 360 degrees from blue sky down to a smiling person, smooth rotation transition, 9:16 vertical" },
      { time: "48-55초", label: "CTA", action: "'셋 중 뭐부터 해볼래요?' 참여 유도.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "앵글만 바꿔도 새 영상이 됩니다 🔄" },
      { start: 3, end: 18, text: "① 로우앵글 — 뒤집어서 지면에 붙이기" },
      { start: 18, end: 33, text: "② 하이앵글 — 머리 위에서 내려다보기" },
      { start: 33, end: 48, text: "③ 회전샷 — 하늘에서 인물로 롤 트랜지션" },
      { start: 48, end: 55, text: "뭐부터 해볼래요? 댓글 👇" }
    ],
    igCaption: "같은 장소, 다른 영상 만드는 법 🔄\n\n눈높이 샷만 찍고 있다면 오늘부터 이렇게:\n\n1️⃣ 로우앵글 — 카메라 뒤집어 지면에 붙이기\n2️⃣ 하이앵글 — 머리 위에서 부감샷\n3️⃣ 회전샷 — 하늘→인물 롤 트랜지션\n\n짐벌이라 셋 다 흔들림 없이 가능 💪\n\n#인스타360 #루나울트라 #lunaultra #촬영꿀팁 #앵글 #시네마틱 #영상꿀팁 #insta360 #릴스꿀팁 #브이로그"
  },
  {
    id: "group-track",
    num: 11,
    emoji: "👨‍👩‍👧",
    title: "여럿이 찍을 땐 그룹 트래킹 + 스마트 프레이밍",
    cover: "가족·친구 영상\n전부 프레임 안에",
    hook: "여러 명을 찍으면 누군가는 꼭 잘리죠. 그룹 트래킹이면 전원이 프레임 안에 있습니다.",
    level: "중급",
    scenes: [
      { time: "0-3초", label: "훅", action: "아이 둘이 뛰어다니는데 둘 다 프레임 안에 계속 잡히는 결과물.", aiPrompt: "Two children running around a playground, camera automatically framing to keep both in shot, smooth auto-reframing, 9:16 vertical" },
      { time: "3-18초", label: "설정", action: "트래킹 메뉴에서 그룹 트래킹 선택, 여러 명 인식되는 화면.", aiPrompt: "Camera touchscreen showing multiple people detected with tracking boxes, group tracking mode enabled, 9:16 vertical" },
      { time: "18-38초", label: "실전", action: "가족 나들이/친구 모임에서 사람 수가 바뀌어도 알아서 화각 조절하는 결과물.", aiPrompt: "Family picnic scene, camera smartly reframing as people enter and leave the frame, natural candid moments, 9:16 vertical" },
      { time: "38-50초", label: "스마트 프레이밍", action: "혼자→둘→셋으로 늘어날 때 자동으로 넓어지는 화각 시연.", aiPrompt: "Frame automatically widening as one person is joined by two friends, smart framing demonstration, seamless zoom out, 9:16 vertical" },
      { time: "50-55초", label: "CTA", action: "'주말 가족 영상은 이걸로' 멘트.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "여럿 찍으면 꼭 한 명이 잘리죠? 👨‍👩‍👧" },
      { start: 3, end: 18, text: "그룹 트래킹 ON — 여러 명 동시 인식" },
      { start: 18, end: 38, text: "뛰어다녀도 전원 프레임 안에 📍" },
      { start: 38, end: 50, text: "인원이 늘면 화각도 알아서 넓어져요" },
      { start: 50, end: 55, text: "주말 가족 영상은 이걸로 👉 저장" }
    ],
    igCaption: "가족 영상 찍을 때 꼭 한 명은 잘리는 분들 👨‍👩‍👧\n\n루나 울트라 그룹 트래킹이면\n\n✔️ 여러 명 동시 인식\n✔️ 전원 프레임 안에 유지\n✔️ 인원 늘면 화각 자동 확장 (스마트 프레이밍)\n\n주말 나들이 영상이 달라져요\n\n#인스타360 #루나울트라 #lunaultra #가족영상 #육아스타그램 #그룹트래킹 #영상꿀팁 #insta360 #릴스꿀팁 #브이로그카메라"
  },
  {
    id: "photo-pano",
    num: 12,
    emoji: "📸",
    title: "사진도 괴물 — 37MP 울트라포토 & 2억 화소 파노라마",
    cover: "영상 카메라인 줄?\n사진이 2억 화소",
    hook: "루나 울트라는 영상만 잘 찍는 게 아닙니다. 사진은 최대 2억 화소예요.",
    level: "입문",
    scenes: [
      { time: "0-3초", label: "훅", action: "파노라마 사진을 계속 확대해도 선명한 디테일 줌인 연출.", aiPrompt: "Zooming deep into an ultra high resolution panorama photo of a city skyline, details staying razor sharp, endless zoom effect, 9:16 vertical" },
      { time: "3-18초", label: "울트라포토", action: "37MP 울트라포토로 찍은 인물/풍경 사진 결과물. 크롭해도 선명함 강조.", aiPrompt: "Crisp 37 megapixel portrait photo, cropping into the eyes still showing sharp detail, photo quality demonstration, 9:16 vertical" },
      { time: "18-38초", label: "파노라마", action: "카메라가 스스로 회전하며 200MP 파노라마 찍는 과정 + 결과물 스크롤.", aiPrompt: "Gimbal camera rotating automatically on tripod capturing a sweeping mountain panorama, then scrolling through the massive detailed result, 9:16 vertical" },
      { time: "38-50초", label: "활용", action: "파노라마에서 원하는 부분만 크롭해서 여러 장의 사진으로 만드는 꿀팁.", aiPrompt: "Cropping multiple different framed photos out of one giant panorama image, one shot many photos concept, 9:16 vertical" },
      { time: "50-55초", label: "CTA", action: "'한 번 찍고 사진 열 장 건지기' 멘트.", aiPrompt: "" }
    ],
    captions: [
      { start: 0, end: 3, text: "이 사진, 2억 화소입니다 📸" },
      { start: 3, end: 18, text: "37MP 울트라포토 — 크롭해도 선명" },
      { start: 18, end: 38, text: "카메라가 스스로 돌며 200MP 파노라마 촬영" },
      { start: 38, end: 50, text: "꿀팁: 파노라마 하나로 사진 10장 크롭" },
      { start: 50, end: 55, text: "한 번 찍고 열 장 건지세요 👉 팔로우" }
    ],
    igCaption: "영상 카메라인 줄 알았는데 사진이 2억 화소 📸\n\n✔️ 37MP 울트라포토 — 크롭해도 선명\n✔️ 200MP 시닉 파노라마 — 카메라가 알아서 회전\n✔️ 파노라마 한 장 → 크롭으로 사진 10장\n\n여행 가서 한 번 찍고 열 장 건지세요\n\n#인스타360 #루나울트라 #lunaultra #파노라마 #고화소 #여행사진 #사진꿀팁 #insta360 #릴스꿀팁 #여행스타그램"
  }
];
