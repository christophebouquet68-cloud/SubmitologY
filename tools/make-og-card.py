"""Generate public/og-card.png — 1200x630 link-preview card for SubmitologY.

Design notes:
  • Palette comes straight from the tokens in src/styles/app.css, so the card
    and the site cannot drift apart.
  • The gold diagonal is the kintsugi seam from the logo mark, continued off
    the right edge of the card at the mark's own angle. It is the brand's own
    device rather than added decoration.
  • The faint node/edge web echoes the SynapticField background in App.jsx.
  • Everything is drawn at 2x and downsampled, because PIL draws aliased
    lines and a jagged diagonal is exactly what a "cheap" card looks like.
"""
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# Run from anywhere: paths are resolved relative to this file.
#   pip install pillow
#   python3 tools/make-og-card.py
ROOT = Path(__file__).resolve().parent.parent

S = 2                      # supersample factor
W, H = 1200 * S, 630 * S

BG      = (20, 17, 26)     # --bg           #14111a
TEXT    = (237, 232, 223)  # --text         #ede8df
MUTED   = (179, 170, 184)  # --text-muted   #b3aab8
ACCENT  = (255, 133, 52)   # --accent-soft  #ff8534
MISSION = (168, 151, 240)  # --mission      #a897f0
GOLD    = (184, 145, 47)   # kintsugi seam, sampled from the logo

FONT = str(ROOT / "tools" / "Archivo-w108.ttf")   # width-pinned instance


def face(size, weight):
    f = ImageFont.truetype(FONT, size * S)
    f.set_variation_by_axes([weight])
    return f


def tracked(draw, xy, text, font, fill, tracking=0):
    """Draw text with letter-spacing — PIL has no native tracking."""
    x, y = xy[0] * S, xy[1] * S
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking * S


img = Image.new("RGB", (W, H), BG)

# ── Ambient synaptic web ────────────────────────────────────────────────────
net = Image.new("RGB", (W, H), BG)
nd = ImageDraw.Draw(net)
rng = random.Random(7)              # fixed seed → regenerating gives the same card
pts = [(rng.randint(-80, W + 80), rng.randint(-80, H + 80)) for _ in range(34)]
for i, a in enumerate(pts):
    for b in pts[i + 1:]:
        if math.dist(a, b) < 190 * S:
            nd.line([a, b], fill=MISSION, width=1 * S)
for p in pts:
    nd.ellipse([p[0] - 3 * S, p[1] - 3 * S, p[0] + 3 * S, p[1] + 3 * S], fill=MISSION)
img = Image.blend(img, net, 0.085)

d = ImageDraw.Draw(img)

# ── Logo, and the seam continuing out of it ─────────────────────────────────
LOGO_X, LOGO_Y, LOGO_D = 862, 186, 258
logo = Image.open(ROOT / "public" / "logo512.png").convert("RGBA")
logo = logo.resize((LOGO_D * S, LOGO_D * S), Image.LANCZOS)

# Seam endpoints inside the 512px mark, scaled into place, then extrapolated
# left and right so the line reads as one continuous stroke through the mark.
k = LOGO_D / 512
ax, ay = LOGO_X + 25 * k, LOGO_Y + 295 * k
bx, by = LOGO_X + 490 * k, LOGO_Y + 220 * k
slope = (by - ay) / (bx - ax)
x0, x1 = 762, 1210
d.line([(x0 * S, (ay + (x0 - ax) * slope) * S),
        (x1 * S, (ay + (x1 - ax) * slope) * S)], fill=GOLD, width=3 * S)

img.paste(logo, (LOGO_X * S, LOGO_Y * S), logo)

# ── Type block, left ────────────────────────────────────────────────────────
PAD = 74

tracked(d, (PAD, 138), "SINGAPORE · BJJ APPAREL", face(19, 600), ACCENT, tracking=3.4)

title = face(50, 700)
d.text((PAD * S, 194 * S), "The Study of Submission", font=title, fill=TEXT)
d.text((PAD * S, 256 * S), "The Science of Resilience", font=title, fill=ACCENT)

sub = face(24, 400)
d.text((PAD * S, 348 * S), "34 techniques, and every transition", font=sub, fill=MUTED)
d.text((PAD * S, 382 * S), "between them, on one interactive map.", font=sub, fill=MUTED)

# ── Footing rule + pledge ───────────────────────────────────────────────────
d.line([(PAD * S, 462 * S), ((PAD + 92) * S, 462 * S)], fill=GOLD, width=2 * S)
tracked(d, (PAD, 484), "1% OF PROFITS PLEDGED TO MENTAL HEALTH",
        face(16, 600), MUTED, tracking=2.2)

out = ROOT / "public" / "og-card.png"
img.resize((1200, 630), Image.LANCZOS).save(out, optimize=True)
print("wrote", out)
