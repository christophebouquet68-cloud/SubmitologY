#!/usr/bin/env python3
"""
tees.py — build the shop's t-shirt product images from the mockups in
tools/tee-src/.

Run:  python3 tools/tees.py            (needs Pillow: pip install Pillow)

The mockups in tee-src/ are JPEG at quality 92, 4:4:4. They arrived as PNG and
were converted for the same reason as tools/photo-src/: twelve of them at that
size are 24 MB, which pushes the delivery archive past its transfer limit. At
q92 with no chroma subsampling the set is under 4 MB and every crop below still
regenerates; the extra generation of loss is invisible once the output is
itself a q80 JPEG.

WHAT CHANGED, 2026-08-23
────────────────────────
The shop used to show flat vector renders: a shirt outline with the artwork
placed on it, front and back, on a cream plate at 1412x740. They were honest
about being drawings, and the design notes listed "a photograph of a made
shirt" as the shop's oldest open gap.

These replace them with photographic mockups — still a render rather than a
photograph of a garment that exists, but a far better one, and the first thing
on the shop page that looks like a product rather than a diagram.

THE NAMING CONTRACT IS THE POINT
────────────────────────────────
`teeImage()` in src/data/tshirts.js builds the path as
`<design>-<colour>.jpg`, so the filenames below are not labels — they are the
lookup. Getting one wrong does not throw; it silently shows the wrong garment
under the right product name, which is the sort of error that survives to
launch. The mapping was verified frame by frame against the four catalogue
definitions before this script was written:

    crest-*      small circular crest on the chest
    wordmark-*   "SUBMITOLOGY BJJ" set as type on the chest
    *-kintsugi   back reads KINTSUGI / crest / MIND AND BODY
    *-team       back reads SUBMITOLOGY / crest / BJJ TEAM

ONE ASPECT RATIO
────────────────
The sources arrive at three different shapes (1.0, 1.25, 1.39) because they
were rendered in separate batches. Cards in a grid have to agree, so every
output is cropped to 7:5 and the card reserves that ratio up front — a grid
that reflows as images arrive is worse than one that waits.

The vertical anchor is per-source, not shared: the square frames are shot
head-to-knee and the wide ones head-to-hip, so cropping them all from the
centre would leave the collection looking framed by accident. Anchoring the
tall ones high crops the legs instead of the shirt, which is the subject.
"""

import os
import sys

try:
    from PIL import Image
except ImportError:                                          # pragma: no cover
    sys.exit("Pillow is required:  pip install Pillow")

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "tee-src")
DST = os.path.join(HERE, os.pardir, "public", "shop", "tshirts")

RATIO = 7 / 5
WIDTH = 1200      # card renders at ~560 CSS px, so this covers 2x comfortably
QUALITY = 80

# (output name, source file, vertical anchor 0=top 1=bottom)
TEES = [
    ("crest-kintsugi-black",    "crest-kintsugi-black.jpg",    0.14),
    ("crest-kintsugi-navy",     "crest-kintsugi-navy.jpg",     0.14),
    ("crest-kintsugi-white",    "crest-kintsugi-white.jpg",    0.14),
    ("crest-team-black",        "crest-team-black.jpg",        0.14),
    ("crest-team-navy",         "crest-team-navy.jpg",         0.10),
    ("crest-team-white",        "crest-team-white.jpg",        0.10),
    ("wordmark-kintsugi-black", "wordmark-kintsugi-black.jpg", 0.06),
    ("wordmark-kintsugi-navy",  "wordmark-kintsugi-navy.jpg",  0.06),
    ("wordmark-kintsugi-white", "wordmark-kintsugi-white.jpg", 0.06),
    ("wordmark-team-black",     "wordmark-team-black.jpg",     0.06),
    ("wordmark-team-navy",      "wordmark-team-navy.jpg",      0.06),
    ("wordmark-team-white",     "wordmark-team-white.jpg",     0.06),
]


# The two rashguards, which arrive as presentation sheets rather than plain
# mockups: a caption band reading "KINTSUGI FIGHTER / SUBMITOLOGY | KINTSUGI FOR
# THE MIND | BJJ APPAREL" runs across the bottom ~15% of the frame. That text
# is a designer's slate, not part of the garment, and leaving it in would put a
# second product name on a card that already has one.
#
# So the caption is cut first, and only then is the remainder squared to 7:5 —
# which at this point has to come off the sides, because the surviving frame is
# already wider than 7:5. Doing it in the other order would crop to ratio around
# the caption and keep a sliver of it.
RG_CAPTION_TOP = 0.845     # everything below this is the slate

RASHGUARDS = [
    ("rashguard-long",  "rashguard-long.jpg"),
    ("rashguard-short", "rashguard-short.jpg"),
]


def crop_to(img, ratio, anchor=0.5):
    """Crop to an aspect ratio. `anchor` slides the window along whichever
    axis is being cut: 0 is top/left, 1 is bottom/right."""
    w, h = img.size
    if w / h > ratio:
        nw = int(h * ratio)
        ox = int((w - nw) * anchor)
        return img.crop((ox, 0, ox + nw, h))
    nh = int(w / ratio)
    oy = int((h - nh) * anchor)
    return img.crop((0, oy, w, oy + nh))


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"mockups not found: {SRC}\n"
                 f"Put the twelve files there, named as in TEES above.")
    os.makedirs(DST, exist_ok=True)

    missing = [s for _, s, _ in TEES if not os.path.exists(os.path.join(SRC, s))]
    missing += [s for _, s in RASHGUARDS if not os.path.exists(os.path.join(SRC, s))]
    if missing:
        sys.exit("missing sources:\n  " + "\n  ".join(missing))

    for name, src, anchor in TEES:
        im = Image.open(os.path.join(SRC, src)).convert("RGB")
        out = crop_to(im, RATIO, anchor)
        out = out.resize((WIDTH, int(WIDTH / RATIO)), Image.LANCZOS)
        path = os.path.join(DST, name + ".jpg")
        out.save(path, quality=QUALITY, optimize=True, progressive=True)
        print(f"  {name + '.jpg':28} {out.size[0]}x{out.size[1]}  "
              f"{os.path.getsize(path) // 1024} KB")

    for name, src in RASHGUARDS:
        im = Image.open(os.path.join(SRC, src)).convert("RGB")
        im = im.crop((0, 0, im.width, int(im.height * RG_CAPTION_TOP)))
        out = crop_to(im, RATIO, 0.5)
        out = out.resize((WIDTH, int(WIDTH / RATIO)), Image.LANCZOS)
        path = os.path.join(DST, name + ".jpg")
        out.save(path, quality=QUALITY, optimize=True, progressive=True)
        print(f"  {name + '.jpg':28} {out.size[0]}x{out.size[1]}  "
              f"{os.path.getsize(path) // 1024} KB")

    total = sum(os.path.getsize(os.path.join(DST, n + ".jpg")) for n, _, _ in TEES)
    print(f"\n  12 files, {total // 1024} KB total "
          f"({total // 1024 // 12} KB each, 4 loaded per colourway)")


if __name__ == "__main__":
    main()
