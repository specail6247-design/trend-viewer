"""맥(가정용 IP)에서 릴스를 수집해 GitHub 저장소에 시드 파일로 올립니다.

인스타그램이 클라우드 IP를 차단하기 때문에, 웹 버전(GitHub Pages)의 릴스 탭은
이 스크립트가 올려둔 마지막 시드를 보여줍니다. 맥이 켜져 있을 때 실행하면
웹 버전 릴스가 그 시점 기준으로 갱신됩니다.

실행:  python3 push_reels_seed.py     (gh 로그인이 되어 있어야 합니다)
"""
import base64
import importlib.util
import json
import os
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "specail6247-design/trend-viewer"
PATH = "reels_seed.json"

spec = importlib.util.spec_from_file_location("srv", os.path.join(HERE, "server.py"))
srv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(srv)

print("릴스 수집 중...", flush=True)
reels, accounts, fetched_at = srv.get_reels(True)
if not reels:
    print("릴스를 가져오지 못했습니다 (인스타그램 일시 제한일 수 있음). 시드를 올리지 않습니다.")
    sys.exit(1)
print(f"릴스 {len(reels)}개 수집 완료", flush=True)

seed = {"reels": reels, "accounts": accounts, "fetchedAt": fetched_at}
content = base64.b64encode(
    json.dumps(seed, ensure_ascii=False).encode()).decode()

# 기존 파일 sha 조회 (있으면 갱신, 없으면 생성)
sha = ""
r = subprocess.run(["gh", "api", f"repos/{REPO}/contents/{PATH}", "--jq", ".sha"],
                   capture_output=True, text=True)
if r.returncode == 0:
    sha = r.stdout.strip()

args = ["gh", "api", "-X", "PUT", f"repos/{REPO}/contents/{PATH}",
        "-f", f"message=릴스 시드 갱신 ({time.strftime('%m/%d %H:%M')}, {len(reels)}개)",
        "-f", f"content={content}"]
if sha:
    args += ["-f", f"sha={sha}"]
r = subprocess.run(args, capture_output=True, text=True)
if r.returncode != 0:
    print("업로드 실패:", r.stderr[:300])
    sys.exit(1)
print("시드 업로드 완료 — 다음 자동 배포(매시 7분)부터 웹 릴스에 반영됩니다.")

# 바로 반영되도록 배포 워크플로도 실행
subprocess.run(["gh", "workflow", "run", "build-and-deploy", "-R", REPO],
               capture_output=True)
print("배포 워크플로 실행 요청 완료 (몇 분 뒤 웹에 반영)")
