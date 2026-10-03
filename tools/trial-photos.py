#!/usr/bin/env python3
"""
trial-photos.py — build the What's New photographs of the rashguard trial
from the originals, with every face blurred.

Run:  python3 tools/trial-photos.py <folder holding the original photos>
      (needs Pillow, numpy and opencv:  pip install Pillow numpy opencv-python-headless)

THE ORIGINALS ARE NOT IN THIS REPOSITORY, ON PURPOSE
────────────────────────────────────────────────────
Every other tool here reads its sources from a folder beside it. This one
takes the folder as an argument, because the originals show people's faces
and this repository is public. Only the blurred, cropped outputs in
public/whats-new/ are ever committed. Keep the originals somewhere private.

HOW A PHOTO IS RECOGNISED
─────────────────────────
By content, not by name: each original is matched on the first 20 characters
of its SHA-256. The files arrived named by a messaging app and a phone
(a UUID, IMG_3203), so a filename is no promise of anything — and a face box
laid over the wrong photograph blurs a wall and leaves a face. A file that
has been re-saved or resized will not match, which is the safe failure.

WHAT IT DOES
────────────
1. Blurs each listed face: the region is reduced to about six blocks across
   and smoothed, inside a soft-edged ellipse. Nothing of the features is
   left to sharpen back. Faces in the background and in the gym mirrors are
   listed too, not only the people wearing the rashguard.
2. Crops to the frame the site uses. Where the garment allows it the crop
   leaves heads out altogether, the way the shop mockups do.
3. Saves at web size with no metadata.

Blurring hides a face. It does not make someone unrecognisable to people who
know them — hair, build and the room are still there — so the people shown
should still be asked before a photograph is published.

ADDING A PHOTOGRAPH
───────────────────
Add an entry to PHOTOS: its hash, one (x, y, w, h, hand) box per face in
source pixels, the output name, the crop as fractions of the frame, and the
widest it needs to be. hand = 1 marks a box drawn round a whole head rather
than a detected face, which is grown less. Then LOOK at the result before
committing it.
"""

import hashlib
import os
import sys

try:
    import cv2
    import numpy as np
    from PIL import Image
except ImportError:                                          # pragma: no cover
    sys.exit("needs:  pip install Pillow numpy opencv-python-headless")

HERE = os.path.dirname(os.path.abspath(__file__))
DST = os.path.join(HERE, os.pardir, "public", "whats-new")
QUALITY = 84

PHOTOS = {
    "42a6c3a9b6d3b50fa576": ([(940, 816, 191, 222, 0), (574, 0, 137, 61, 1)],
                             "trial-roll", (0, 0.40, 1, 0.83), 1366),
    "0d1ae5c5251c18ad2ad5": ([(683, 589, 233, 344, 0), (647, 108, 111, 142, 0), (443, 781, 88, 108, 0)],
                             "trial-front", (0.28, 0.455, 0.98, 0.80), 1200),
    "bd659053abf4793271c1": ([(808, 116, 161, 242, 0), (313, 1323, 100, 109, 0), (16, 1108, 97, 147, 0),
                              (36, 850, 58, 84, 0), (690, 602, 154, 227, 0)],
                             "trial-standing", (0, 0, 1, 1), 900),
    "920ccc31b7f11b6057c1": ([(31, 1162, 252, 256, 0), (483, 558, 188, 228, 0)],
                             "trial-pass", (0, 0.10, 1, 0.92), 900),
    "6a31521a9f1595f07c26": ([(830, 537, 140, 177, 0), (224, 586, 107, 189, 0), (549, 732, 45, 74, 0),
                              (1296, 917, 28, 35, 0), (1229, 881, 137, 123, 1)],
                             "trial-backs", (0, 0.375, 1, 0.80), 1600),
    "843e5b24b459fe59a75b": ([(951, 1261, 267, 232, 0)],
                             "trial-sleeve", (0, 0.25, 1, 0.92), 900),
    "4bbbb5b4ccf6cee8c6db": ([(735, 1724, 187, 230, 0), (1123, 1546, 171, 213, 0), (1844, 1669, 177, 210, 0),
                              (1474, 1815, 158, 202, 0), (2270, 1675, 171, 216, 0), (2836, 1783, 44, 68, 0),
                              (542, 1749, 55, 85, 0), (238, 1681, 62, 74, 0), (52, 1800, 82, 98, 0),
                              (1617, 1747, 41, 53, 0)],
                             "trial-team", (0.05, 0.455, 0.97, 0.70), 1800),
    "6e1c5b81db44c7b2c47e": ([(1457, 1764, 115, 150, 0), (2433, 1721, 129, 153, 0), (1129, 2347, 130, 166, 0),
                              (517, 2481, 161, 208, 0), (608, 1750, 44, 63, 0), (2619, 1817, 44, 60, 0),
                              (2313, 2257, 152, 205, 0), (1692, 1773, 33, 43, 0), (366, 1766, 44, 63, 0),
                              (242, 2144, 53, 70, 0), (286, 1964, 53, 66, 0), (309, 1802, 35, 49, 0),
                              (1078, 1832, 22, 27, 0), (2, 1969, 27, 59, 0), (942, 1762, 25, 32, 0),
                              (591, 1853, 49, 59, 0), (396, 1716, 50, 63, 0)],
                             "trial-group", (0, 0.36, 1, 0.92), 1500),
}


def blur_face(img, x, y, w, h, hand):
    """Blur one face in place. The box is grown to take in forehead, chin and
    ears — a detector's box stops at the eyebrows and the jaw."""
    H, W = img.shape[:2]
    gx, gy = (1.15, 1.2) if hand else (1.55, 1.7)
    cx, cy = x + w / 2, y + h / 2 - 0.03 * h
    w2, h2 = w * gx, h * gy
    pad = 0.35 * max(w2, h2)
    x0, y0 = int(max(0, cx - w2 / 2 - pad)), int(max(0, cy - h2 / 2 - pad))
    x1, y1 = int(min(W, cx + w2 / 2 + pad)), int(min(H, cy + h2 / 2 + pad))
    roi = img[y0:y1, x0:x1].copy()
    rh, rw = roi.shape[:2]
    block = max(w2 / 6.0, 4)             # about six blocks across the face
    small = cv2.resize(roi, (max(2, int(rw / block)), max(2, int(rh / block))),
                       interpolation=cv2.INTER_AREA)
    soft = cv2.resize(small, (rw, rh), interpolation=cv2.INTER_LINEAR)
    soft = cv2.GaussianBlur(soft, (0, 0), max(2.0, w2 * 0.10))
    m = np.zeros((rh, rw), np.float32)
    cv2.ellipse(m, (int(cx - x0), int(cy - y0)), (int(w2 / 2), int(h2 / 2)), 0, 0, 360, 1.0, -1)
    m = cv2.GaussianBlur(m, (0, 0), max(1.5, w2 * 0.07))[..., None]
    img[y0:y1, x0:x1] = (roi * (1 - m) + soft * m).astype(np.uint8)


def main():
    if len(sys.argv) != 2 or not os.path.isdir(sys.argv[1]):
        sys.exit("usage:  python3 tools/trial-photos.py <folder holding the original photos>")
    src = sys.argv[1]
    os.makedirs(DST, exist_ok=True)

    found = {}
    for name in sorted(os.listdir(src)):
        if not name.lower().endswith((".jpg", ".jpeg")):
            continue
        path = os.path.join(src, name)
        with open(path, "rb") as f:
            key = hashlib.sha256(f.read()).hexdigest()[:20]
        if key in PHOTOS:
            found[key] = path

    missing = [PHOTOS[k][1] for k in PHOTOS if k not in found]
    if missing:
        sys.exit("originals not found for:  " + ", ".join(missing))

    for key, (faces, out, box, width) in PHOTOS.items():
        img = cv2.imread(found[key])
        for face in faces:
            blur_face(img, *face)
        H, W = img.shape[:2]
        crop = img[int(box[1] * H):int(box[3] * H), int(box[0] * W):int(box[2] * W)]
        im = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))
        if im.width > width:
            im = im.resize((width, int(im.height * width / im.width)), Image.LANCZOS)
        path = os.path.join(DST, out + ".jpg")
        im.save(path, quality=QUALITY, optimize=True, progressive=True)
        print(f"  {out + '.jpg':22} {im.width}x{im.height}  {len(faces):2} faces  "
              f"{os.path.getsize(path) // 1024} KB")


if __name__ == "__main__":
    main()
