def lin(c):
    c = c/255
    return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
def L(h):
    h = h.lstrip('#')
    r,g,b = (int(h[i:i+2],16) for i in (0,2,4))
    return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b)
def ratio(a,b):
    la,lb = L(a),L(b)
    hi,lo = max(la,lb),min(la,lb)
    return (hi+0.05)/(lo+0.05)

BONE = '#e9e1d2'
INK  = '#14111a'

print(f"--- text candidates on BONE {BONE} (AA body needs 4.5) ---")
for name,hexv in [('bone-ink   ','#221d17'),('bone-ink alt','#2a231b'),
                  ('bone-muted ','#5c5347'),('bone-muted+','#544b3e'),
                  ('bone-dim   ','#6f6656'),('gold       ','#d4a03c'),
                  ('gold-deep  ','#8a6413'),('accent     ','#e85d04'),
                  ('accent-deep','#a83f02'),('mission    ','#a897f0'),
                  ('mission-dp ','#4c3a8f')]:
    r = ratio(hexv,BONE)
    print(f"  {name} {hexv}  {r:5.2f}:1  {'PASS' if r>=4.5 else ('large-only' if r>=3 else 'FAIL')}")

print(f"\n--- on INK {INK} (existing tokens re-checked) ---")
for name,hexv in [('text       ','#ede8df'),('muted      ','#b3aab8'),
                  ('dim        ','#8f8799'),('gold       ','#d4a03c'),
                  ('gold-soft  ','#e8c274'),('accent     ','#e85d04'),
                  ('accent-soft','#ff8534'),('mission    ','#a897f0')]:
    r = ratio(hexv,INK)
    print(f"  {name} {hexv}  {r:5.2f}:1  {'PASS' if r>=4.5 else ('large-only' if r>=3 else 'FAIL')}")

print(f"\n--- levels as belts (2026-08-16) ---")
print("  LEVEL_COLORS set pill text and borders, so they need 4.5 on ink.")
print("  LEVEL_BELTS fill the rail body, which is a bounded block: the 1px")
print("  border on .rail is what guarantees its edge, not the fill's contrast.")
for name, text, belt in [('Beginner    ', '#f1eee6', '#f1eee6'),
                         ('Intermediate', '#7d9dd1', '#3c5a8a'),
                         ('Advanced    ', '#c08a52', '#7a4f28')]:
    rt, rb = ratio(text, INK), ratio(belt, INK)
    print(f"  {name} text {text} {rt:5.2f}:1 {'PASS' if rt>=4.5 else 'FAIL'}"
          f"   belt {belt} {rb:5.2f}:1 (bounded)")

print(f"\n--- exercise figures on --surface-sunk #0d0a0f ---")
SUNK = '#0d0a0f'
for name, hexv, floor in [('accent-soft (near limbs)', '#ff8534', 3.0),
                          ('accent (far limbs)      ', '#e85d04', 3.0),
                          ('equip (bells, bands)    ', '#8ea0b5', 3.0)]:
    r = ratio(hexv, SUNK)
    print(f"  {name} {hexv}  {r:5.2f}:1  {'PASS' if r>=floor else 'FAIL'}")

print(f"\n--- non-text UI (rules, borders, focus) need 3.0 ---")
for label,fg,bg in [('gold seam on ink ','#d4a03c',INK),
                    ('gold seam on bone','#d4a03c',BONE),
                    ('bone-line on bone','#c8bda6',BONE)]:
    r = ratio(fg,bg)
    print(f"  {label} {r:5.2f}:1  {'PASS' if r>=3 else 'FAIL'}")
