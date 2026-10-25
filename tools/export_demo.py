#!/usr/bin/env python3
"""Exports one demo as a self-contained site for its own repo.
  python3 tools/export_demo.py <slug> <out_dir>
Copies the demo folder and the shared assets, and rewrites ../_shared/ to _shared/."""
import os, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    slug, out = sys.argv[1], os.path.abspath(sys.argv[2])
    src = os.path.join(ROOT, "demos", slug)
    os.makedirs(out, exist_ok=True)
    for name in ("img", "fonts"):
        shutil.copytree(os.path.join(src, name), os.path.join(out, name), dirs_exist_ok=True)
    shutil.copytree(os.path.join(ROOT, "demos", "_shared"), os.path.join(out, "_shared"), dirs_exist_ok=True)
    shutil.copy(os.path.join(src, "config.json"), os.path.join(out, "config.json"))
    page = open(os.path.join(src, "index.html"), encoding="utf-8").read().replace("../_shared/", "_shared/")
    open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(page)
    open(os.path.join(out, ".nojekyll"), "w").close()
    cfg = __import__("json").load(open(os.path.join(src, "config.json"), encoding="utf-8"))
    open(os.path.join(out, "README.md"), "w", encoding="utf-8").write(
        f"# {cfg['name']}\n\nConcept demo website for a fictional {cfg['cuisine'].lower()} restaurant, made by SAL Digital.\n"
        f"It is not a real business. Orders are built on the page and sent as a WhatsApp message.\n\n"
        f"Want a site like this for your restaurant? https://saldigital.co/lp/restaurants/\n\n"
        f"Photos are from Unsplash (free licence). Fonts are open source (SIL OFL). Motion uses GSAP and Lenis.\n")
    print("exported", slug, "->", out)


if __name__ == "__main__":
    main()
