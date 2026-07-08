"""GitHub Actions(데이터센터 IP)에서 인스타그램 릴스에 접근 가능한 경로를 찾는 실험 스크립트.
결과만 로그로 출력하며, 배포에는 포함되지 않습니다. (실험 후 삭제 예정)
"""
import gzip
import json
import re
import urllib.request

USER = "openai"
CHROME = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
          "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
GOOGLEBOT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
BINGBOT = ("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; "
           "bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.0.0 Safari/537.36")


def get(url, headers=None, timeout=20):
    req = urllib.request.Request(url)
    req.add_header("User-Agent", CHROME)
    req.add_header("Accept-Encoding", "gzip")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        body = r.read()
        if r.headers.get("Content-Encoding") == "gzip":
            body = gzip.decompress(body)
        return r.status, body.decode("utf-8", "ignore")


def probe(label, fn):
    try:
        result = fn()
        print(f"[{label}] {result}", flush=True)
    except Exception as e:
        print(f"[{label}] 실패: {type(e).__name__} {str(e)[:100]}", flush=True)


def a_web_profile_info():
    st, body = get(
        "https://www.instagram.com/api/v1/users/web_profile_info/?username=" + USER,
        headers={"x-ig-app-id": "936619743392459"})
    d = json.loads(body)
    edges = ((d.get("data") or {}).get("user") or {}).get("edge_owner_to_timeline_media") or {}
    return f"HTTP {st}, 게시물 {len(edges.get('edges') or [])}개"


def b_profile_html(ua, label_url="https://www.instagram.com/%s/" % USER):
    def run():
        st, html = get(label_url, headers={"User-Agent": ua})
        return (f"HTTP {st}, 길이 {len(html)}, timeline {html.count('edge_owner_to_timeline_media')}, "
                f"view_count {html.count('video_view_count')}, xdt {html.count('xdt_api')}, "
                f"login벽 {'yes' if 'loginForm' in html or '/accounts/login' in html else 'no'}")
    return run


def e_imginn():
    st, html = get("https://imginn.com/%s/" % USER)
    return f"HTTP {st}, 길이 {len(html)}, 게시물링크 {len(set(re.findall(r'/p/([A-Za-z0-9_-]+)', html)))}개"


def f_jina():
    st, body = get("https://r.jina.ai/https://www.instagram.com/%s/reels/" % USER, timeout=45)
    return f"HTTP {st}, 길이 {len(body)}, reel링크 {len(set(re.findall(r'/reel/([A-Za-z0-9_-]+)', body)))}개"


probe("A. web_profile_info API", a_web_profile_info)
probe("B. 프로필HTML+구글봇", b_profile_html(GOOGLEBOT))
probe("C. 프로필HTML+빙봇", b_profile_html(BINGBOT))
probe("D. 릴스HTML+구글봇", b_profile_html(GOOGLEBOT, "https://www.instagram.com/%s/reels/" % USER))
probe("E. imginn 미러", e_imginn)
probe("F. jina 리더", f_jina)
print("프로브 완료", flush=True)
