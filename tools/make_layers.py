#!/usr/bin/env python3
"""Cuts a food photo into hero layers for a demo page.
  python3 tools/make_layers.py <slug> <photo.jpg> [--crop-pad 0.04]
Writes demos/<slug>/img/subject.webp, subject-m.webp (alpha cutout) and plate.webp (blurred, darkened backdrop).
Needs:  pip install rembg onnxruntime pillow  (first run downloads the u2net model)."""
import os, sys
from PIL import Image, ImageFilter, ImageEnhance
from rembg import remove, new_session

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main():
    slug, src = sys.argv[1], sys.argv[2]
    pad = 0.04
    out = os.path.join(ROOT, "demos", slug, "img")
    os.makedirs(out, exist_ok=True)
    im = Image.open(src).convert("RGB")
    cut = remove(im, session=new_session("u2net"))
    box = cut.getchannel("A").point(lambda a: 255 if a > 24 else 0).getbbox()
    px, py = int(im.width * pad), int(im.height * pad)
    box = (max(0, box[0] - px), max(0, box[1] - py), min(im.width, box[2] + px), min(im.height, box[3] + py))
    cut = cut.crop(box)
    for name, w in (("subject.webp", 1100), ("subject-m.webp", 640)):
        c = cut.resize((w, int(cut.height * w / cut.width)), Image.LANCZOS)
        c.save(os.path.join(out, name), "WEBP", quality=82, method=6, exact=True)
        print(name, c.size)
    plate = im.resize((1200, int(im.height * 1200 / im.width)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(28))
    plate = ImageEnhance.Brightness(plate).enhance(0.55)
    plate.save(os.path.join(out, "plate.webp"), "WEBP", quality=70, method=6)
    print("plate.webp", plate.size)


if __name__ == "__main__":
    main()
