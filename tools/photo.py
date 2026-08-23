#!/usr/bin/env python3
"""
photo.py — regenerate every crop and treatment in src/photo/ from the
originals in tools/photo-src/.

The masters are JPEG at quality 92, 4:4:4, not PNG. They arrived as PNG and
were converted for one reason: twelve 1122x1402 PNGs are 26 MB, which pushed
the delivery archive past its transfer limit and would have meant shipping the
repo without the originals at all. At q92 with no chroma subsampling the whole
set is under 5 MB and every crop below still regenerates. The extra generation
of loss is invisible once the output is itself a q76–78 JPEG.

Run:  python3 tools/photo.py            (needs Pillow: pip install Pillow)

WHY THIS EXISTS
───────────────
The duotone is baked into the files rather than applied with a CSS filter.
Two reasons, in order of weight:

  1. A CSS filter on a full-bleed background repaints on every scroll frame.
     On a page with four photographic bands that is measurable on a phone.
  2. The treated file has to survive being reused outside CSS — og:image is
     the obvious case, and a filter cannot reach it.

The cost is that the treatment is no longer editable in devtools, which is
what this script is for: change a constant here, re-run, rebuild.

THE RULE (Option C, agreed 2026-08-22)
──────────────────────────────────────
COLOUR   where the photograph IS the content — hero, product cards.
GRADED   where the photograph is the content AND its colour is information,
         but it shares a hard edge with a coloured surface it would otherwise
         fight. Saturation down, a warm cast toward the paper. One case today:
         the home story split against the bone chapter.
DUOTONE  wherever type sits on top of it.

Duotone compresses the mid-tones so white type separates from the image, and
it stops the gi blue (#02225F) and gi pink (#B59492) competing with --accent
orange. One decision solves legibility and the accent clash together.

Never two colour photo bands adjacent, never two duotones — see the rhythm
note in app.css.

WHAT IS DELIBERATELY CROPPED OUT
────────────────────────────────
The celebration frame carries a JJIF banner and a scoreboard in the bottom
~26% of the frame. An image showing a federation mark claims a sanctioned
result the brand has never had, so the crop removes them at source. Do not
"fix" that by widening the crop back out.
"""

import os
import sys

try:
    from PIL import Image, ImageChops, ImageEnhance, ImageOps
except ImportError:                                          # pragma: no cover
    sys.exit("Pillow is required:  pip install Pillow")

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "photo-src")
DST = os.path.join(HERE, os.pardir, "src", "photo")
PUB = os.path.join(HERE, os.pardir, "public", "photo")

# --ink, and the bone/mid ends of the two duotone ramps.
INK = (8, 8, 10)
BONE = (233, 225, 210)
MID = (150, 142, 130)   # a lower white point, for images that sit under type

FRAMES = {
    "crest": "01-back-crest.jpg",     # top position, crest legible
    "grip": "02-grip-fight.jpg",      # close, tactile
    "fist": "03-fist-bump.jpg",       # the seam
    "jump": "04-celebration.jpg",     # arena — see crop note above
    "ref": "05-referee.jpg",          # arena — duotone only
    "trio": "06-trio.jpg",            # three colourways, faces to camera
    "solo": "07-solo.jpg",            # formal portrait
    "kneel": "08-kneeling.jpg",       # seated, to camera — basic concepts
    # The four steps on the Basic Concepts page, one per element.
    "takedown": "09-takedown.jpg",
    "pass": "10-pass.jpg",
    "mount": "11-mount.jpg",
    "choke": "12-choke.jpg",
}

# Basic Concepts step illustrations. 4:3 rather than square: at 4:3 a
# 1402-tall source leaves ~560px of vertical travel, which is what lets the
# window start below the gym decal (~y=205) and still hold the action. A
# square crop leaves 280px and cannot clear it without cutting heads off.
#
# The anchors are per-frame and were picked against the render, not guessed —
# 0.50 on the takedown because 0.40 still caught a sliver of "JIU-JITSU", and
# 0.45 on the pass and the mount because anything lower crops the top player's
# head. Same decal reasoning as the concepts band: SubmitologY is an apparel
# brand with no academy.
STEP_FRAMES = [
    ("takedown", 0.50),   # 01 take it to the ground
    ("pass",     0.45),   # 02 pass the legs
    ("mount",    0.45),   # 03 pin, then climb
    ("choke",    0.42),   # 04 submit
]


def duotone(img, dark=INK, light=BONE, contrast=1.12):
    """Map luminance onto a two-point ramp. Contrast is nudged up first
    because the source frames are flat in the mid-tones, which is exactly
    where a headline needs separation."""
    grey = ImageOps.grayscale(img)
    grey = ImageEnhance.Contrast(grey).enhance(contrast)
    return ImageOps.colorize(grey, black=dark, white=light)


def grade(img, sat=0.62, bright=0.88, contrast=1.05, warm=0.22):
    """Hold the colour, take the volume down.

    Between full colour and duotone there is a third option, and it is the
    right one wherever a photograph has to keep its subject readable *as
    colour* while sitting next to a coloured surface. The trio frame is the
    case: the blue and the pink are information — three colourways, which is
    half of what the shot is saying — so duotoning it threw away content, but
    at full saturation the royal blue and the pink sat two inches from paper
    and from an orange button and nothing on the row read as the accent.

    `warm` multiplies a --bone-coloured layer over the result, which pulls the
    whole frame toward the paper it butts against. At 0.22 it is a cast, not a
    tint: the gis are still plainly blue and pink.
    """
    out = ImageEnhance.Color(img).enhance(sat)
    out = ImageEnhance.Brightness(out).enhance(bright)
    out = ImageEnhance.Contrast(out).enhance(contrast)
    if warm:
        tint = Image.new("RGB", out.size, BONE)
        out = Image.blend(out, ImageChops.multiply(out, tint), warm)
    return out


def crop_to(img, ratio, anchor=0.5):
    """Centre-crop to an aspect ratio. `anchor` moves the window along the
    axis being cut: 0 is top/left, 1 is bottom/right."""
    w, h = img.size
    if w / h > ratio:
        nw = int(h * ratio)
        ox = int((w - nw) * anchor)
        return img.crop((ox, 0, ox + nw, h))
    nh = int(w / ratio)
    oy = int((h - nh) * anchor)
    return img.crop((0, oy, w, oy + nh))


def write(img, path, width, quality=76):
    img = img.resize((width, max(1, int(img.height * width / img.width))),
                     Image.LANCZOS)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, quality=quality, optimize=True, progressive=True)
    print(f"  {os.path.basename(path):22} {img.size[0]}x{img.size[1]}  "
          f"{os.path.getsize(path) // 1024} KB")


def main():
    if not os.path.isdir(SRC):
        sys.exit(f"originals not found: {SRC}\n"
                 f"Put the seven frames there, named as in FRAMES above.")

    im = {}
    for key, name in FRAMES.items():
        p = os.path.join(SRC, name)
        if not os.path.exists(p):
            sys.exit(f"missing frame: {p}")
        im[key] = Image.open(p).convert("RGB")

    print("colour — the photograph is the content")
    # 01 hero. 16:9, anchored high so the black wall behind the figure stays
    # in frame; that wall is what the diagonal veil in app.css sits on.
    hero = crop_to(im["crest"], 16 / 9, 0.14)
    write(hero, os.path.join(DST, "hero-crest.jpg"), 1900, 76)
    write(hero, os.path.join(DST, "hero-crest-sm.jpg"), 1000, 72)
    # 07 for the story page sidebar.
    write(crop_to(im["solo"], 4 / 5, 0.02), os.path.join(DST, "split-solo.jpg"), 900, 76)
    # 06 story split, on the home page. GRADED, not duotone and not full
    # colour: the three colourways are half of what the frame says, so the
    # blue and pink have to survive — but at full saturation they fought the
    # bone chapter they butt against and the orange band further down. See
    # grade() for the reasoning and the numbers.
    write(grade(crop_to(im["trio"], 4 / 5, 0.06)),
          os.path.join(DST, "split-trio.jpg"), 1000, 78)
    # 08 concepts band. GRADED to match the story split rather than duotoned:
    # the pink gi is the same piece of information here as it is there, and the
    # band's headline sits in the dark left third rather than over her.
    #
    # Anchor 0.30 is not arbitrary. The gym decal reading "SUBMITOLOGY
    # JIU-JITSU" sits in the top ~14% of the frame, and SubmitologY is an
    # apparel brand with no academy — a wall sign implying otherwise is the
    # same class of overclaim as a gi that does not exist yet. The crop
    # removes it at source. Do not raise this anchor.
    # 32:9 rather than 21:9. The band is short — its content is a title and
    # one line — so a 21:9 source lost nearly half its height to `cover` and
    # cropped her at the nose. A wider source loses almost nothing.
    #
    # Anchor 0.17 puts the top edge just below the decal and keeps the face
    # whole; both constraints are tight, so check the render if you change it.
    write(grade(crop_to(im["kneel"], 32 / 9, 0.17)),
          os.path.join(DST, "band-concepts.jpg"), 1800, 78)
    # The four step illustrations, graded to match the band above them so the
    # page reads as one photographic pass rather than a header plus a gallery.
    for i, (key, anchor) in enumerate(STEP_FRAMES, start=1):
        write(grade(crop_to(im[key], 4 / 3, anchor)),
              os.path.join(DST, f"step-{i}.jpg"), 760, 78)
    # 02 square, colour: a card, so nothing sits on top of it.
    write(crop_to(im["grip"], 1 / 1, 0.35), os.path.join(DST, "card-grip.jpg"), 900, 76)
    # og:image lives in public/ because index.html references it literally.
    write(crop_to(im["crest"], 1200 / 630, 0.16),
          os.path.join(PUB, "og-crest.jpg"), 1200, 78)

    print("duotone — type sits on top")
    # 03 the seam: 32:9, no type, lower white point so it recedes.
    fb = im["fist"]
    strip = fb.crop((0, 600, fb.width, 600 + int(fb.width * 9 / 32)))
    write(duotone(strip, INK, MID, 1.05), os.path.join(DST, "seam-fist.jpg"), 1600, 74)
    # 02 wide: the technique band, with the map drawn over it.
    write(duotone(crop_to(im["grip"], 16 / 9, 0.34)),
          os.path.join(DST, "band-grip.jpg"), 1600, 74)
    # 04 mission band. The bottom 26% carries the JJIF banner and the
    # scoreboard; removing them here is the whole point — see module docstring.
    jm = im["jump"]
    jm = jm.crop((0, 0, jm.width, int(jm.height * 0.74)))
    write(duotone(crop_to(jm, 21 / 9, 0.34), INK, MID, 1.08),
          os.path.join(DST, "band-mission.jpg"), 1600, 74)
    # 07 story band, same treatment as the mission band: a formal, centred,
    # symmetrical portrait reads as an introduction, which is what the story
    # page is.
    # anchor 0.06, not 0.20: the standing figure's head sits high in the
    # frame and a 21:9 window taken any lower crops it at the jaw.
    write(duotone(crop_to(im["solo"], 21 / 9, 0.06), INK, MID, 1.08),
          os.path.join(DST, "band-story.jpg"), 1600, 74)
    print("\nnot currently referenced by app.css, kept for the next band:")
    # 05 referee. Duotone only: in colour the arena reads as a real event the
    # brand attended, which is a claim it cannot make.
    write(duotone(crop_to(im["ref"], 21 / 9, 0.22), INK, BONE, 1.16),
          os.path.join(DST, "band-referee.jpg"), 1500, 74)


if __name__ == "__main__":
    main()
