#!/bin/bash
# 맥용 실행 파일 — 더블클릭하면 트렌드 뷰어가 켜지고 브라우저가 열립니다.
cd "$(dirname "$0")" || exit 1

if ! command -v python3 >/dev/null 2>&1; then
  echo ""
  echo "  [알림] 파이썬(Python 3)이 설치되어 있지 않습니다."
  echo "  https://www.python.org/downloads/ 에서 설치한 뒤 이 파일을 다시 더블클릭해 주세요."
  echo ""
  read -n 1 -s -r -p "  아무 키나 누르면 창이 닫힙니다..."
  exit 1
fi

echo ""
echo "  ▶ 데일리 트렌드 뷰어를 시작합니다..."
echo "  ▶ 잠시 후 브라우저가 자동으로 열립니다. (안 열리면 http://localhost:8778 접속)"
echo "  ▶ 종료하려면 이 창을 닫거나 Ctrl+C 를 누르세요."
echo ""

# 2초 뒤 브라우저 자동 오픈
( sleep 2 && open "http://localhost:8778" ) &

# 릴스 시드 업로드: 웹 버전(GitHub Pages) 릴스 탭을 최신으로 유지합니다 (백그라운드)
( python3 push_reels_seed.py >> /tmp/trend-viewer-reels-seed.log 2>&1 ) &

python3 server.py
