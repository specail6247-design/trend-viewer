"""정적 배포용 데이터 수집 스크립트.

GitHub Actions가 1시간마다 실행해 모든 탭의 데이터를 site/data/all.json 하나로
만들고, index.html과 함께 GitHub Pages로 배포합니다. (서버 불필요)

로컬 점검:  FAST=1 python3 build_static.py   (조합을 줄여 빠르게 실행)
"""
import importlib.util
import json
import os
import shutil
import time

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("srv", os.path.join(HERE, "server.py"))
srv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(srv)

FAST = os.environ.get("FAST") == "1"


def collect_videos(shorts: bool):
    cats = ["전체", "AI"] + list(srv.CATEGORIES)
    periods = ["day", "week", "month"]
    if FAST:
        cats, periods = ["전체"], ["day"]
    out = {}
    for c in cats:
        out[c] = {}
        for p in periods:
            try:
                vids, _ = srv.get_videos(c, p, shorts, force=True, enrich=not FAST)
            except Exception as e:
                print(f"  ! {c}/{p} 실패: {e}", flush=True)
                vids = []
            out[c][p] = vids
            print(f"  {'쇼츠' if shorts else '영상'} {c}/{p}: {len(vids)}개", flush=True)
    return out


def safe(label, fn, empty):
    try:
        return fn()
    except Exception as e:
        print(f"! {label} 수집 실패: {e}", flush=True)
        return empty


def main():
    data = {"categories": ["전체", "AI"] + list(srv.CATEGORIES)}

    print("유튜브 수집...", flush=True)
    data["videos"] = collect_videos(False)
    print("쇼츠 수집...", flush=True)
    data["shorts"] = collect_videos(True)

    print("AI 뉴스·모델 수집...", flush=True)
    def _ai():
        ai, at = srv.get_ai_data(True)
        return {**ai, "fetchedAt": at}
    data["ai"] = safe("AI", _ai, {"news": [], "models": {"latest": [], "trending": []}, "fetchedAt": 0})

    for key, getter in [("reels", srv.get_reels), ("x", srv.get_x_posts),
                        ("threads", srv.get_threads_posts), ("tiktok", srv.get_tiktok)]:
        print(f"{key} 수집...", flush=True)
        def _get(g=getter, k=key):
            items, accounts, at = g(True)
            body_key = "reels" if k == "reels" else "posts"
            return {body_key: items, "accounts": accounts, "fetchedAt": at}
        empty_key = "reels" if key == "reels" else "posts"
        data[key] = safe(key, _get, {empty_key: [], "accounts": [], "fetchedAt": 0})
        print(f"  {key}: {len(data[key].get(empty_key) or [])}개", flush=True)

    # 릴스는 인스타그램이 데이터센터 IP를 차단해 Actions에서는 못 가져옵니다.
    # 맥(가정용 IP)이 미리 올려둔 시드 파일이 있으면 그걸 씁니다.
    if not data["reels"]["reels"]:
        try:
            with open(os.path.join(HERE, "reels_seed.json")) as f:
                seed = json.load(f)
            if seed.get("reels"):
                data["reels"] = seed
                print(f"  reels: 시드 파일 사용 ({len(seed['reels'])}개, "
                      f"{time.strftime('%m/%d %H:%M', time.localtime(seed.get('fetchedAt', 0)))} 수집)", flush=True)
        except (OSError, json.JSONDecodeError):
            print("  reels: 시드 파일 없음", flush=True)

    data["fetchedAt"] = time.time()

    site = os.path.join(HERE, "site")
    shutil.rmtree(site, ignore_errors=True)
    os.makedirs(os.path.join(site, "data"))
    shutil.copy(os.path.join(HERE, "index.html"), site)
    with open(os.path.join(site, "data", "all.json"), "w") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    size = os.path.getsize(os.path.join(site, "data", "all.json"))
    print(f"완료: site/data/all.json ({size / 1024:.0f} KB)", flush=True)


if __name__ == "__main__":
    main()
