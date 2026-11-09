"""Export page and journal content from the static site into paste-ready
HTML for Shopify (Online Store > Pages / Blog posts). Run from the repo root:
    python3 tools/export_shopify_content.py
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "shopify-content"

PAGES = ["terms", "privacy", "accessibility", "shipping-returns", "faq", "size-guide"]
ARTICLES = {
    "journal-paris": "paris-always",
    "journal-natural-fabrics": "the-beauty-of-natural-fabrics",
    "journal-atelier": "inside-the-atelier",
    "journal-designed-with-intention": "designed-with-intention",
    "journal-everyday-rituals": "everyday-rituals",
    "journal-details-matter": "the-details-matter",
}
LINKS = {
    "index": "/", "shop": "/collections/all", "collections": "/collections",
    "journal": "/blogs/journal", "about": "/pages/about", "contact": "/pages/contact",
    **{p: f"/pages/{p}" for p in PAGES},
    **{k: f"/blogs/journal/{v}" for k, v in ARTICLES.items()},
}
SHOP_ANCHORS = {"tops": "/collections/tops", "bottoms": "/collections/bottoms", "sets": "/collections/sets"}


def rewrite_links(body, prefix):
    def repl(m):
        name, anchor = m.group(1), m.group(2) or ""
        if name == "shop" and anchor[1:] in SHOP_ANCHORS:
            return f'href="{prefix}{SHOP_ANCHORS[anchor[1:]]}"'
        if name not in LINKS:
            return m.group(0)
        target = LINKS[name]
        return f'href="{(prefix + target).rstrip("/") or "/"}{anchor}"'
    return re.sub(r'href="(?:\.\./)?(?:he/)?([a-z-]+)\.html(#[^"]*)?"', repl, body)


def body_of(src):
    m = re.search(r'<div class="article-body">(.*?)</div>\s*(?:<footer|</article>)', src, re.S)
    return m.group(1).strip()


def text(pattern, src):
    m = re.search(pattern, src, re.S)
    return html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip() if m else ""


def main():
    rows = []
    for lang, base, prefix in [("en", ROOT, ""), ("he", ROOT / "he", "/he")]:
        for kind, names in [("pages", {p: p for p in PAGES}), ("articles", ARTICLES)]:
            for src_name, handle in names.items():
                src = (base / f"{src_name}.html").read_text(encoding="utf-8")
                out = OUT / kind / f"{handle}.{lang}.html"
                out.parent.mkdir(parents=True, exist_ok=True)
                out.write_text(rewrite_links(body_of(src), prefix) + "\n", encoding="utf-8")
                meta = re.findall(r'<span class="label muted">(.*?)</span>', src)
                img = re.search(r'<div class="article-media">\s*<img src="(?:\.\./)?([^"]+)"', src)
                rows.append([kind, lang, handle, text(r"<h1>(.*?)</h1>", src),
                             text(r'<p class="standfirst">(.*?)</p>', src) if kind == "articles" else "",
                             meta[0] if kind == "articles" and meta else "",
                             meta[1] if kind == "articles" and len(meta) > 1 else "",
                             img.group(1) if img else ""])
    lines = ["| סוג | שפה | handle | כותרת | תקציר (Excerpt) | תגית | תאריך | תמונה |", "|---|---|---|---|---|---|---|---|"]
    lines += ["| " + " | ".join(c.replace("|", "\\|") for c in r) + " |" for r in rows]
    (OUT / "INDEX.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    # The terms page renders this snippet (sections/main-terms.liquid).
    terms = (OUT / "pages" / "terms.he.html").read_text(encoding="utf-8")
    (ROOT / "shopify-theme" / "snippets" / "terms-content.liquid").write_text(terms, encoding="utf-8")


if __name__ == "__main__":
    main()
