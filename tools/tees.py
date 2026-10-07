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

(Only crest-team is in the shop since 2026-10-03; the other three definitions
are kept here because they are what the names mean if those designs return.
crest-team-tank is the same print on a tank top.)

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
#
# 2026-10-03: the range is the Team Crest only for the time being — the
# Kintsugi Crest and both Wordmark designs were taken out of the shop, and
# their nine sources and nine outputs deleted with them rather than left to
# rot (they are in git history if the designs come back). A tank top in the
# same print joined instead. Its white source is a mockup like the tees; its
# navy and black sources are recolours of that mockup, made by
# tools/tank-colourways.py — see that file for why and how.
TEES = [
    ("crest-team-black",        "crest-team-black.jpg",        0.14),
    ("crest-team-navy",         "crest-team-navy.jpg",         0.10),
    ("crest-team-white",        "crest-team-white.jpg",        0.10),
    ("crest-team-tank-black",   "crest-team-tank-black.jpg",   0.10),
    ("crest-team-tank-navy",    "crest-team-tank-navy.jpg",    0.10),
    ("crest-team-tank-white",   "crest-team-tank-white.jpg",   0.10),
]


# The short-sleeve rashguard. Since 2026-10-07 its source is an on-model
# mockup, front and back, at 3:2 — the same kind of picture as the long
# sleeve's. (Before that it was a presentation sheet with a caption band
# across the bottom, which this script cut off.)
#
# 3:2 is wider than the card's 7:5, and this frame cannot lose its sides: the
# crest on one sleeve and the KINTSUGI BJJ label on the other sit within a few
# pixels of the edges. So the whole frame is kept and scaled to the card's
# width, and the rows left over underneath are a flat band.
#
# That is exactly what the long-sleeve image in public/ does — it was made by
# hand, and is a 1200x800 photograph over a band of this colour — so the two
# rashguard cards are framed alike, side by side. If the long sleeve is ever
# rebuilt without its band, drop this one too.
RG_BAND = (39, 38, 43)

# rashguard-long is deliberately NOT rebuilt here any more. The image in
# public/ was replaced by hand after this script was written (commits
# "Update rashguard-long.jpg", "updated long sleeves in shop") and no longer
# matches tee-src/rashguard-long.jpg — running the old list silently put the
# superseded render back. Found on 2026-10-03 while rebuilding the tees. To
# bring it back under the script, replace the source in tee-src/ first.
RASHGUARDS = [
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
                 f"Put the files there, named as in TEES above.")
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
        size = (WIDTH, int(WIDTH / RATIO))
        if im.width / im.height > RATIO:
            # Wider than the card: keep it all, band underneath (see RG_BAND).
            photo = im.resize((WIDTH, round(WIDTH * im.height / im.width)), Image.LANCZOS)
            out = Image.new("RGB", size, RG_BAND)
            out.paste(photo, (0, 0))
        else:
            out = crop_to(im, RATIO, 0.5).resize(size, Image.LANCZOS)
        path = os.path.join(DST, name + ".jpg")
        out.save(path, quality=QUALITY, optimize=True, progressive=True)
        print(f"  {name + '.jpg':28} {out.size[0]}x{out.size[1]}  "
              f"{os.path.getsize(path) // 1024} KB")

    total = sum(os.path.getsize(os.path.join(DST, n + ".jpg")) for n, _, _ in TEES)
    per = len(TEES) // 3                                    # three colourways
    print()
    print(f"  {len(TEES)} files, {total // 1024} KB total "
          f"({total // 1024 // len(TEES)} KB each, {per} loaded per colourway)")


if __name__ == "__main__":
    main()
