#!/usr/bin/env python3
"""
tank-colourways.py — derive the dark blue and jet black Team Crest tank tops
from the one mockup that exists, the white one.

Run:  python3 tools/tank-colourways.py
      (needs Pillow, numpy and opencv:  pip install Pillow numpy opencv-python-headless)
      then python3 tools/tees.py to rebuild the shop images.

WHY THIS EXISTS
───────────────
The tank top arrived on 2026-10-03 as a single white mockup. The t-shirt it
sits beside comes in three colourways, and one colour picker drives both
cards — a tank that only existed in white would have left that picker
showing a broken image on two of its three settings. So the two missing
colourways are made here, from the white source, rather than waited for.

They are a RECOLOUR OF A MOCKUP, not a second and third render. Same model,
same pose, same folds, with the garment's colour and the print's inks
swapped. If proper navy and black tank mockups arrive later, drop them into
tee-src/ under the same names and delete this script — nothing else changes.

WHAT IT MATCHES
───────────────
The Team Crest t-shirt sources in tee-src/ are the reference, both for the
cloth and for which ink goes where:

    white   black ink, gold seam, gold "ESTABLISHED IN 2020"   (the source)
    navy    white ink, gold seam, white "ESTABLISHED IN 2020"
    black   everything gold; the seam is kept legible where it crosses the S
            by a hairline of bare cloth either side of it, as on the tee

HOW
───
1. Find the garment: near-white, unsaturated pixels, the two big connected
   pieces (front and back), holes filled so the print counts as garment.
2. Split the print into black ink and gold by hue, and estimate the cloth
   *under* the print by inpainting its brightness — that is what lets the
   print be lifted off as an alpha instead of cut out with a hard edge.
3. Re-dye the cloth by rank: the brightest white becomes the brightest navy
   found on the navy tee, the deepest fold the deepest navy. Matching the two
   distributions, rather than multiplying by a colour, is what keeps dark
   cloth from coming out as a flat silhouette.
4. Lay the inks back on in their new colours and composite over the
   untouched photograph.
"""

import os
import sys

try:
    import cv2
    import numpy as np
    from PIL import Image
except ImportError:                                          # pragma: no cover
    sys.exit("needs:  pip install Pillow numpy opencv-python-headless")

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "tee-src")

SOURCE = "crest-team-tank-white.jpg"

GOLD = np.array([168, 127, 30], np.float32)       # median of the tee's gold ink
WHITE_INK = np.array([238, 237, 235], np.float32)

# name → (reference tee, fabric sample box on that tee x0,y0,x1,y1, ink plan)
TARGETS = {
    "navy":  ("crest-team-navy.jpg",  (180, 150, 520, 860), "white"),
    "black": ("crest-team-black.jpg", (150, 150, 480, 880),  "gold"),
}


def load(name):
    return np.asarray(Image.open(os.path.join(SRC, name)).convert("RGB"))


def luma(rgb):
    return rgb.astype(np.float32) @ np.array([0.299, 0.587, 0.114], np.float32)


def garment_mask(rgb):
    """Boolean masks of the garment, print included: (everything, lit panels)."""
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    whitish = ((hsv[..., 1] < 50) & (hsv[..., 2] > 120)).astype(np.uint8)
    whitish = cv2.morphologyEx(whitish, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    n, labels, stats, _ = cv2.connectedComponentsWithStats(whitish, connectivity=8)
    # Front and back are the only whitish things in frame bigger than a
    # ceiling light or the divider rule between the two panels.
    order = np.argsort(stats[1:, cv2.CC_STAT_AREA])[::-1][:2] + 1
    mask = np.isin(labels, order).astype(np.uint8)
    main = mask.copy()
    # The far side of each armhole shows a sliver of the other panel, cut off
    # from the main piece by the arm. Left white they read as a tear in a dark
    # garment. Take any whitish scrap that sits right beside the garment —
    # which the ceiling lights and the divider rule do not.
    # They sit in the arm's shadow, so they are looked for with a lower
    # brightness floor than the lit cloth — still far above the gym behind.
    near = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (61, 61))).astype(bool)
    dim = ((hsv[..., 1] < 55) & (hsv[..., 2] > 100) & (mask == 0)).astype(np.uint8)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(dim, connectivity=8)
    for i in range(1, n):
        if stats[i, cv2.CC_STAT_AREA] < 12:
            continue
        piece = labels == i
        tall_rule = stats[i, cv2.CC_STAT_HEIGHT] > 0.5 * rgb.shape[0]
        if not tall_rule and (piece & near).sum() > 0.6 * piece.sum():
            # with its dim, slightly warm fringe — anything beside it that
            # is not skin (skin is far more saturated than shadowed cotton)
            grown = cv2.dilate(piece.astype(np.uint8), np.ones((7, 7), np.uint8)).astype(bool)
            mask[grown & (hsv[..., 1] < 85) & (hsv[..., 2] > 50)] = 1
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    def fill(m):
        # Fill holes: the print is enclosed by cloth; the neck is not (it runs
        # off the top of the frame), so a flood from the border leaves it alone.
        flood = m.copy()
        h, w = m.shape
        ff = np.zeros((h + 2, w + 2), np.uint8)
        for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1)]:
            if flood[seed[1], seed[0]] == 0:
                cv2.floodFill(flood, ff, seed, 2)
        return flood != 2          # whatever the border flood could not reach

    # Two masks: the whole garment, which is what gets re-dyed, and the two
    # lit panels on their own, which is where the print is looked for. The
    # shadowed slivers are dark enough to pass for black ink otherwise.
    return fill(mask), fill(main)


def fabric_lut(ref_rgb, box):
    """Mean cloth colour of the reference tee at each brightness percentile."""
    x0, y0, x1, y1 = box
    px = ref_rgb[y0:y1, x0:x1].reshape(-1, 3).astype(np.float32)
    hsv = cv2.cvtColor(ref_rgb[y0:y1, x0:x1], cv2.COLOR_RGB2HSV).reshape(-1, 3)
    L = luma(px)
    # cloth only: drop the print (bright) and any skin or gold (warm, saturated)
    warm = (hsv[:, 0] < 35) & (hsv[:, 1] > 70) & (hsv[:, 2] > 40)
    keep = (L < 70) & ~warm
    px, L = px[keep], L[keep]
    order = np.argsort(L)
    px = px[order]
    bins = np.array_split(px, 256)
    lut = np.stack([b.mean(0) for b in bins])             # 256 × 3, dark → light
    # smooth along the ramp: neighbouring bins differ by sensor noise, and
    # that noise would otherwise come back as colour speckle in flat cloth
    k = np.ones(9, np.float32) / 9
    pad = np.pad(lut, ((4, 4), (0, 0)), mode="edge")
    return np.stack([np.convolve(pad[:, c], k, mode="valid") for c in range(3)], axis=1)


def recolour(src, mask, main, lut, plan):
    h, w = mask.shape
    hsv = cv2.cvtColor(src, cv2.COLOR_RGB2HSV)
    L = luma(src)

    # ── the print ──────────────────────────────────────────────────────────
    # Work a few px inside the garment so the cloth/skin edge is never
    # mistaken for ink.
    inner = cv2.erode(main.astype(np.uint8), np.ones((9, 9), np.uint8)).astype(bool)
    gold_px = inner & (hsv[..., 0] >= 12) & (hsv[..., 0] <= 30) & (hsv[..., 1] > 55) & (hsv[..., 2] > 90)
    # Black ink is far darker than any fold in white cloth. Seam shadows along
    # the binding get down to ~120; ink sits under 90.
    dark_px = inner & (L < 110) & ~gold_px
    # only real print: components of a sensible size, away from the hem
    print_px = (gold_px | dark_px).astype(np.uint8)
    region = cv2.dilate(print_px, np.ones((7, 7), np.uint8)).astype(bool) & inner

    # cloth brightness under the print, by inpainting
    L8 = np.clip(L, 0, 255).astype(np.uint8)
    F = cv2.inpaint(L8, region.astype(np.uint8), 7, cv2.INPAINT_TELEA).astype(np.float32)
    F = np.where(region, cv2.GaussianBlur(F, (0, 0), 2.0), L)

    # gold alpha from saturation (gold S ≈ 210, cloth S ≈ 5)
    a_gold = np.clip((hsv[..., 1].astype(np.float32) - 25) / 150.0, 0, 1)
    # Saturation is a ratio, so a gold/black edge pixel — and plain chroma
    # noise in black ink — scores as fully gold. Brightness says otherwise.
    a_gold = np.minimum(a_gold, np.clip(hsv[..., 2].astype(np.float32) / 150.0, 0, 1))
    a_gold = np.where(region & (hsv[..., 0] >= 8) & (hsv[..., 0] <= 34), a_gold, 0)
    a_gold[a_gold < 0.12] = 0
    a_gold = cv2.GaussianBlur(a_gold, (0, 0), 0.6) * region

    # ink alpha: how far the pixel has fallen from the cloth it sits on.
    # Gold is darker than white cloth too, so take its share out first.
    gold_L = float(luma(GOLD[None])[0])
    expected = F * (1 - a_gold) + gold_L * a_gold
    a_ink = np.clip((expected - L) / np.maximum(expected - 8.0, 1), 0, 1) * (1 - a_gold)
    a_ink = np.where(region, a_ink, 0)
    a_ink[a_ink < 0.06] = 0

    # which gold is the seam and which is the "ESTABLISHED IN 2020" line:
    # the seam is the long thin component, the lettering is many small ones.
    n, lab, st, _ = cv2.connectedComponentsWithStats((a_gold > 0.35).astype(np.uint8), connectivity=8)
    seam = np.zeros((h, w), bool)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_WIDTH] > 4 * max(st[i, cv2.CC_STAT_HEIGHT], 1) and st[i, cv2.CC_STAT_WIDTH] > 40:
            seam |= lab == i
    seam_soft = cv2.dilate(seam.astype(np.uint8), np.ones((5, 5), np.uint8)).astype(np.float32)
    seam_soft = cv2.GaussianBlur(seam_soft, (0, 0), 1.0)
    a_seam = a_gold * np.clip(seam_soft * 1.5, 0, 1)
    a_text = a_gold - a_seam                               # gold lettering

    # ── the cloth ──────────────────────────────────────────────────────────
    cloth_L = F[mask & ~region]
    # brightness → percentile, from the white cloth's own distribution
    edges = np.percentile(cloth_L, np.linspace(0, 100, 256))
    rank = np.interp(F, edges, np.arange(256, dtype=np.float32))
    lo = np.floor(rank).astype(int).clip(0, 255)
    hi = (lo + 1).clip(0, 255)
    t = (rank - lo)[..., None]
    cloth = lut[lo] * (1 - t) + lut[hi] * t

    # ── the inks, in their new colours ─────────────────────────────────────
    # A little of the cloth's shading carries into the ink so the print bends
    # with the folds instead of floating over them.
    shade = np.clip(F / np.median(cloth_L), 0.82, 1.06)[..., None]
    gold = GOLD[None, None] * shade
    if plan == "white":
        ink_col, text_col = WHITE_INK[None, None] * shade, WHITE_INK[None, None] * shade
    else:
        ink_col, text_col = gold, gold
        # Gold seam over a gold S would vanish. The tee solves it with a
        # hairline of bare cloth either side of the seam; do the same.
        # Its width follows the seam's own thickness, so the small chest
        # crest gets a proportionally small gap instead of losing its S.
        # The seam is a straight rule, so the gap is drawn from a line fitted
        # to it rather than grown from its pixels — a dilated mask inherits
        # every bump of the antialiasing and looks torn. It stops short of
        # both ends so the ring it meets stays whole.
        gap = np.zeros((h, w), np.float32)
        n2, lab2, st2, _ = cv2.connectedComponentsWithStats(seam.astype(np.uint8), connectivity=8)
        for i in range(1, n2):
            ys, xs = np.nonzero(lab2 == i)
            pts = np.stack([xs, ys], 1).astype(np.float32)
            vx, vy, cx, cy = cv2.fitLine(pts, cv2.DIST_L2, 0, 0.01, 0.01).ravel()
            proj = (pts[:, 0] - cx) * vx + (pts[:, 1] - cy) * vy
            thick = len(xs) / max(proj.max() - proj.min(), 1)
            lo_t = proj.min() + 0.06 * (proj.max() - proj.min())
            hi_t = proj.max() - 0.06 * (proj.max() - proj.min())
            S = 8                                           # sub-pixel drawing
            p0 = (int(round((cx + vx * lo_t) * S)), int(round((cy + vy * lo_t) * S)))
            p1 = (int(round((cx + vx * hi_t) * S)), int(round((cy + vy * hi_t) * S)))
            big = np.zeros((h * S, w * S), np.uint8)
            cv2.line(big, p0, p1, 255, max(1, int(round(thick * 2.1 * S))), cv2.LINE_8)
            gap = np.maximum(gap, cv2.resize(big, (w, h), interpolation=cv2.INTER_AREA) / 255.0)
        a_ink = a_ink * (1 - np.clip(gap, 0, 1))

    a_i, a_s, a_t = a_ink[..., None], a_seam[..., None], a_text[..., None]
    out = cloth * (1 - a_i - a_s - a_t).clip(0, 1) + ink_col * a_i + gold * a_s + text_col * a_t

    # ── composite ──────────────────────────────────────────────────────────
    # Grow the mask a pixel so the antialiased white rim goes with the garment
    # rather than staying behind as a halo, then feather.
    m = cv2.dilate(mask.astype(np.uint8), np.ones((3, 3), np.uint8)).astype(np.float32)
    m = cv2.GaussianBlur(m, (0, 0), 0.8)[..., None]
    res = src.astype(np.float32) * (1 - m) + out * m
    return np.clip(res + 0.5, 0, 255).astype(np.uint8)


def main():
    src = load(SOURCE)
    mask, main = garment_mask(src)
    for name, (ref, box, plan) in TARGETS.items():
        lut = fabric_lut(load(ref), box)
        out = recolour(src, mask, main, lut, plan)
        path = os.path.join(SRC, f"crest-team-tank-{name}.jpg")
        # same settings as the other sources: q92, 4:4:4
        Image.fromarray(out).save(path, quality=92, subsampling=0, optimize=True)
        print(f"  {os.path.basename(path):30} {out.shape[1]}x{out.shape[0]}  "
              f"{os.path.getsize(path) // 1024} KB")


if __name__ == "__main__":
    main()
