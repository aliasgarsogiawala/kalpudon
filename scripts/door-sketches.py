"""Gold line drawings for the five contact doors (app/_components/DoorSketch.tsx), in the hand of the client's
architectural sketches: front elevations with a receding, hatched side for depth, inked like a pen — every stroke
wobbles slightly, overshoots its corners and is overdrawn by a fainter second pass; terraces carry scribbled
planting. Seeded, so the output is the same every run.

    python3 scripts/door-sketches.py   # rewrites public/sketch/<door>.svg
"""
import math, os, random

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "sketch")
os.makedirs(OUT, exist_ok=True)
W = H = 400


class Pen:
    def __init__(self, seed):
        self.r = random.Random(seed)
        self.main, self.faint, self.fine = [], [], []
        self.clip = None

    def _runs(self, pts):
        if not self.clip:
            return [pts]
        runs, cur = [], []
        for x, y in pts:
            if self.clip(x, y):
                cur.append((x, y))
            elif cur:
                runs.append(cur); cur = []
        if cur:
            runs.append(cur)
        return [r for r in runs if len(r) > 1]

    def _wob(self, pts, amp):
        r = self.r
        out = []
        for i, (x, y) in enumerate(pts):
            out.append((x + r.uniform(-amp, amp), y + r.uniform(-amp, amp)))
        return out

    def _poly(self, pts):
        return "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts)

    def line(self, a, b, weight="main", over=True):
        """A pen stroke from a to b: subdivided, wobbling, overshooting both ends a touch."""
        (x1, y1), (x2, y2) = a, b
        L = math.hypot(x2 - x1, y2 - y1)
        if L < 0.5:
            return
        ux, uy = (x2 - x1) / L, (y2 - y1) / L
        o1, o2 = self.r.uniform(0, 2.2), self.r.uniform(0, 2.2)
        x1, y1, x2, y2 = x1 - ux * o1, y1 - uy * o1, x2 + ux * o2, y2 + uy * o2
        n = max(2, int(L / (14 if not self.clip else 3)))
        allpts = [(x1 + (x2 - x1) * t / n, y1 + (y2 - y1) * t / n) for t in range(n + 1)]
        target = {"main": self.main, "fine": self.fine}[weight]
        for pts in self._runs(allpts):
            target.append(self._poly(self._wob(pts, 0.55 if weight == "main" else 0.4)))
            if over and self.r.random() < (0.75 if weight == "main" else 0.35):
                self.faint.append(self._poly(self._wob([(x + 0.9, y + 0.6) for x, y in pts], 1.0)))

    def path(self, pts, weight="main", closed=False):
        if closed:
            pts = pts + [pts[0]]
        for a, b in zip(pts, pts[1:]):
            self.line(a, b, weight)

    def curve(self, pts, weight="main"):
        """A freehand curve through many points (already dense)."""
        target = {"main": self.main, "fine": self.fine}[weight]
        for run in self._runs(pts):
            target.append(self._poly(self._wob(run, 0.5)))
            if self.r.random() < 0.6:
                self.faint.append(self._poly(self._wob([(x + 0.8, y + 0.6) for x, y in run], 0.9)))

    def hatch(self, poly, angle=-60, gap=4.2, weight="fine", density=1.0):
        """Parallel hatching clipped to a convex polygon, with ragged ends like quick pen hatching."""
        a = math.radians(angle)
        dx, dy = math.cos(a), math.sin(a)
        nx, ny = -dy, dx
        ds = [x * nx + y * ny for x, y in poly]
        d = min(ds) + gap * 0.5
        while d < max(ds):
            if self.r.random() < density:
                hits = []
                for (x1, y1), (x2, y2) in zip(poly, poly[1:] + poly[:1]):
                    s1, s2 = x1 * nx + y1 * ny - d, x2 * nx + y2 * ny - d
                    if s1 * s2 < 0:
                        t = s1 / (s1 - s2)
                        hits.append((x1 + (x2 - x1) * t, y1 + (y2 - y1) * t))
                if len(hits) >= 2:
                    (ax, ay), (bx, by) = hits[0], hits[1]
                    k1, k2 = self.r.uniform(0.0, 0.12), self.r.uniform(0.0, 0.18)
                    self.line((ax + (bx - ax) * k1, ay + (by - ay) * k1), (bx - (bx - ax) * k2, by - (by - ay) * k2), "fine", over=False)
            d += gap * self.r.uniform(0.8, 1.2)

    def scribble(self, cx, cy, w, h, n=14):
        """A clump of planting: short looping leaf strokes."""
        for _ in range(n):
            x, y = cx + self.r.uniform(-w / 2, w / 2), cy + self.r.uniform(-h, 0)
            L = self.r.uniform(3, 7)
            a = self.r.uniform(-math.pi * 0.95, -math.pi * 0.05)
            pts = [(x + math.cos(a) * L * t + math.sin(t * 3) * 1.2, y + math.sin(a) * L * t) for t in [0, 0.35, 0.7, 1]]
            self.fine.append(self._poly(self._wob(pts, 0.6)))
        for _ in range(n // 3):
            x = cx + self.r.uniform(-w / 2, w / 2)
            self.fine.append(self._poly(self._wob([(x, cy), (x + self.r.uniform(-2, 2), cy - h * self.r.uniform(0.6, 1))], 0.5)))

    def svg(self, name):
        def group(paths, sw, op):
            return f'<g stroke-width="{sw}" opacity="{op}"><path d="{" ".join(paths)}"/></g>'

        body = (
            group(self.faint, 0.7, 0.45)
            + group(self.fine, 0.75, 0.8)
            + group(self.main, 1.35, 1)
        )
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">
<defs><linearGradient id="g" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#f7dfa0"/><stop offset=".5" stop-color="#d9a84f"/><stop offset="1" stop-color="#9c6c28"/></linearGradient></defs>
<g fill="none" stroke="url(#g)" stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>"""
        open(f"{OUT}/{name}.svg", "w").write(svg)
        print(name, len(self.main) + len(self.fine) + len(self.faint), "strokes", round(len(svg) / 1024), "KB")


def arc(cx, cy, rx, ry, a0, a1, n=28):
    return [(cx + rx * math.cos(a0 + (a1 - a0) * i / n), cy + ry * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]

def rect(pen, x, y, w, h, weight="main"):
    pen.path([(x, y), (x + w, y), (x + w, y + h), (x, y + h)], weight, closed=True)

D = (14, -9)  # receding direction for side faces (right and up)

def side(pen, x, y0, y1, depth=1.0, hatch=True):
    """Receding right side of a vertical edge at x from y0 (top) to y1 (bottom)."""
    dx, dy = D[0] * depth, D[1] * depth
    pts = [(x, y0), (x + dx, y0 + dy), (x + dx, y1 + dy), (x, y1)]
    pen.line(pts[0], pts[1]); pen.line(pts[1], pts[2])
    if hatch:
        pen.hatch(pts, angle=-70, gap=3.4)


# ------------------------------------------------------------------ Capital: the Pantheon front
def capital():
    pen = Pen(101)
    cx = 200
    roof = lambda x: 182 - (182 - 120) * max(0.0, 1 - abs(x - 200) / 116)
    pen.clip = lambda x, y: y < roof(x) - 1.5
    # dome behind: drum, dome, coffer rings, oculus lantern
    pen.path([(118, 168), (118, 150), (282, 150), (282, 168)])
    pen.curve(arc(cx, 150, 82, 86, math.pi, 2 * math.pi, 40))
    for k, f in enumerate([0.84, 0.66, 0.46]):
        pen.curve(arc(cx, 150, 82 * f, 86 * f, math.pi * 1.06, math.pi * 1.94, 30), "fine")
    for a in [1.12, 1.25, 1.38, 1.5, 1.62, 1.75, 1.88]:
        x0, y0 = cx + 82 * math.cos(a * math.pi), 150 + 86 * math.sin(a * math.pi)
        x1, y1 = cx + 82 * 0.46 * math.cos(a * math.pi), 150 + 86 * 0.46 * math.sin(a * math.pi)
        pen.line((x0, y0), (x1, y1), "fine", over=False)
    pen.path([(190, 64), (190, 56), (210, 56), (210, 64)], "fine")
    pen.hatch([(cx + 30, 72), (cx + 82, 150), (cx + 40, 150)], angle=-68, gap=3.4)
    pen.clip = None
    # pediment
    L, R, T = 84, 316, 120
    pen.path([(L, 182), (cx, T), (R, 182)])
    pen.path([(L + 18, 178), (cx, 130), (R - 18, 178)], "fine")
    pen.line((L - 4, 182), (R + 4, 182))
    # tympanum relief hint
    for k in range(-4, 5):
        x = cx + k * 16
        pen.line((x, 172), (x + 4, 160 + abs(k) * 2), "fine", over=False)
    side(pen, R + 4, 182, 204, 1.0, hatch=True)
    pen.line((R + 4 + D[0], 182 + D[1]), (cx + D[0], T + D[1]))
    # entablature with dentils
    rect(pen, L - 4, 182, R - L + 8, 22)
    pen.line((L - 4, 190), (R + 4, 190), "fine")
    for x in range(L, R + 1, 7):
        pen.line((x, 198), (x, 204), "fine", over=False)
    # eight columns with capitals, bases and fluting
    for i in range(8):
        x = L + 10 + i * ((R - L - 20) / 7)
        pen.path([(x - 12, 204), (x + 12, 204), (x + 9, 210), (x - 9, 210)], closed=True)
        pen.line((x - 8, 210), (x - 7, 318)); pen.line((x + 8, 210), (x + 7, 318))
        for f in (-4, 0, 4):
            pen.line((x + f, 214), (x + f * 0.9, 314), "fine", over=False)
        pen.path([(x - 10, 318), (x + 10, 318), (x + 12, 324), (x - 12, 324)], closed=True)
        if i == 7:
            pen.hatch([(x + 2, 212), (x + 8, 212), (x + 7, 316), (x + 2, 316)], angle=-80, gap=2.6)
    # steps
    for k, (w, y) in enumerate([(252, 324), (266, 332), (280, 340)]):
        rect(pen, cx - w / 2, y, w, 8)
        side(pen, cx + w / 2, y, y + 8, 0.6, hatch=False)
    # shadowed doorway between the middle columns
    pen.hatch([(186, 230), (214, 230), (214, 318), (186, 318)], angle=-80, gap=2.4)
    rect(pen, 186, 230, 28, 88, "fine")
    # cypress and olive either side
    for x, h in ((50, 120), (350, 110)):
        pen.line((x, 348), (x, 348 - h * 0.3), "fine")
        pen.curve([(x + 14 * math.sin(t) * math.sin(t / 2), 348 - h * 0.25 - t / math.pi * h * 0.75) for t in [i * math.pi / 16 for i in range(17)]], "fine")
        pen.scribble(x, 348 - h * 0.28, 26, h * 0.72, 40)
    pen.line((20, 348), (380, 348), "fine")
    pen.svg("capital")


# ------------------------------------------------------------------ Careers: a terraced tower with planting
def careers():
    pen = Pen(202)
    r = random.Random(9)
    y, x0, w = 352, 136, 128
    for i in range(8):
        h = 26
        off = r.choice([-14, -8, 0, 8, 14])
        sx, sw = x0 + off, w + r.choice([0, 10, 18])
        # slab
        rect(pen, sx - 6, y - 6, sw + 12, 6)
        side(pen, sx + sw + 6, y - 6, y, 1.0, hatch=True)
        pen.line((sx - 6 + D[0], y - 6 + D[1]), (sx + sw + 6 + D[0], y - 6 + D[1]))
        # storey: glazing and mullions
        top = y - 6 - h
        rect(pen, sx + 6, top, sw - 12, h, "fine")
        for k in range(1, 6):
            xx = sx + 6 + k * (sw - 12) / 6
            pen.line((xx, top), (xx, y - 6), "fine", over=False)
        pen.hatch([(sx + sw - 22, top), (sx + sw - 6, top), (sx + sw - 6, y - 6), (sx + sw - 22, y - 6)], angle=-75, gap=3)
        side(pen, sx + sw - 6, top, y - 6, 0.8, hatch=True)
        # balustrade and planting on the slab edge
        for xx in range(int(sx - 4), int(sx + sw + 6), 6):
            pen.line((xx, y - 6), (xx, y - 12), "fine", over=False)
        pen.line((sx - 6, y - 12), (sx + sw + 6, y - 12), "fine")
        for _ in range(r.randint(2, 3)):
            pen.scribble(sx + r.uniform(0, sw), y - 12, r.uniform(14, 26), r.uniform(8, 16), 16)
        # trailing vines down the face
        if r.random() < 0.6:
            vx = sx + r.uniform(10, sw - 10)
            pen.curve([(vx + math.sin(t * 2) * 2.5, y - 6 + t * 6) for t in [i / 3 for i in range(10)]], "fine")
        y = top
    # roof terrace and pergola
    rect(pen, x0 - 4, y - 6, w + 8, 6)
    for k in range(6):
        xx = x0 + k * w / 5
        pen.line((xx, y - 6), (xx, y - 26), "fine")
    pen.line((x0, y - 26), (x0 + w, y - 26), "fine")
    pen.scribble(x0 + w / 2, y - 6, w * 0.8, 24, 40)
    # podium, trees and ground
    for x, hh in ((70, 70), (100, 52), (320, 64), (350, 48)):
        pen.line((x, 360), (x, 360 - hh * 0.4), "fine")
        pen.scribble(x, 360 - hh * 0.35, 30, hh * 0.65, 30)
    pen.line((20, 360), (380, 360), "fine")
    pen.svg("careers")


# ------------------------------------------------------------------ Partner with HOP: the stage
def hop():
    pen = Pen(303)
    r = random.Random(12)
    # truss: towers and top span (box truss drawn as two chords with zigzag)
    for x in (52, 334):
        pen.line((x, 70), (x, 300)); pen.line((x + 14, 70), (x + 14, 300))
        for yy in range(70, 300, 12):
            pen.line((x, yy), (x + 14, yy + 12), "fine", over=False)
        side(pen, x + 14, 70, 300, 0.5, hatch=False)
    pen.line((52, 70), (348, 70)); pen.line((52, 84), (348, 84))
    for xx in range(52, 348, 12):
        pen.line((xx, 70), (xx + 12, 84), "fine", over=False)
    pen.line((52 + 7, 70 + -4.5), (348 + 7, 70 - 4.5), "fine")
    # LED wall with a figure silhouette motif
    rect(pen, 96, 108, 208, 132)
    for xx in range(96, 304, 26):
        pen.line((xx, 108), (xx, 240), "fine", over=False)
    for yy in range(108, 240, 33):
        pen.line((96, yy), (304, yy), "fine", over=False)
    pen.curve(arc(200, 168, 46, 46, 0, 2 * math.pi, 40), "fine")
    pen.curve(arc(200, 168, 30, 30, 0, 2 * math.pi, 30), "fine")
    # lights and beams
    for i, xx in enumerate(range(78, 330, 36)):
        pen.path([(xx - 6, 86), (xx + 6, 86), (xx + 4, 96), (xx - 4, 96)], "fine", closed=True)
        tx = 200 + (xx - 200) * r.uniform(0.2, 0.7)
        pen.line((xx - 2, 96), (tx - 22, 300), "fine", over=False)
        pen.line((xx + 2, 96), (tx + 22, 300), "fine", over=False)
    # stage deck with front edge in perspective
    pen.path([(30, 300), (370, 300), (382, 318), (18, 318)], closed=True)
    pen.hatch([(18, 318), (382, 318), (382, 326), (18, 326)], angle=0, gap=2.4, density=0.9)
    pen.line((18, 326), (382, 326))
    # speaker stacks
    for x in (70, 306):
        for k in range(3):
            rect(pen, x, 300 - (k + 1) * 22, 24, 22)
            pen.curve(arc(x + 12, 300 - (k + 1) * 22 + 11, 6, 6, 0, 2 * math.pi, 14), "fine")
        side(pen, x + 24, 234, 300, 0.5, hatch=True)
    # performer, arm raised, with mic stand
    px = 200
    pen.curve(arc(px, 222, 7, 8, 0, 2 * math.pi, 18))
    pen.path([(px - 10, 236), (px - 12, 266), (px - 8, 300)]); pen.path([(px + 10, 236), (px + 12, 266), (px + 8, 300)])
    pen.path([(px - 10, 236), (px + 10, 236)])
    pen.path([(px + 10, 238), (px + 26, 214), (px + 30, 196)])
    pen.path([(px - 10, 240), (px - 18, 258), (px - 14, 266)])
    pen.line((px - 34, 300), (px - 30, 248), "fine"); pen.curve(arc(px - 30, 245, 3, 4, 0, 2 * math.pi, 10), "fine")
    # crowd silhouettes across the foreground, some hands up
    for row, (y, s) in enumerate([(350, 1.0), (378, 1.3)]):
        for k in range(10 - row * 2):
            x = 24 + k * (352 / (9 - row * 2)) + r.uniform(-8, 8)
            hy = y - 14 * s
            pen.curve(arc(x, hy, 5 * s, 6 * s, 0, 2 * math.pi, 14), "fine")
            pen.curve([(x - 13 * s, y + 10 * s), (x - 9 * s, hy + 9 * s), (x, hy + 7 * s), (x + 9 * s, hy + 9 * s), (x + 13 * s, y + 10 * s)], "fine")
            if r.random() < 0.45:
                d = 1 if r.random() < 0.5 else -1
                pen.path([(x + 8 * s * d, hy + 9 * s), (x + 12 * s * d, hy - 10 * s), (x + 11 * s * d, hy - 18 * s)], "fine")
    pen.svg("hop")


# ------------------------------------------------------------------ Press: a vintage studio microphone
def press():
    pen = Pen(404)
    cx = 200
    # capsule body: rounded capsule with a grille band, ribbed
    top, bot, w = 60, 230, 62
    pen.curve(arc(cx, top + w, w, w, math.pi, 2 * math.pi, 30))
    pen.line((cx - w, top + w), (cx - w, bot - 26)); pen.line((cx + w, top + w), (cx + w, bot - 26))
    pen.curve(arc(cx, bot - 26, w, 26, 0, math.pi, 24))
    # grille: vertical ribs that follow the curve
    for k in range(-5, 6):
        x = cx + k * w / 6
        yt = top + w - math.sqrt(max(0, w * w - (x - cx) ** 2))
        pen.line((x, yt + 4), (x, bot - 30), "fine", over=False)
    for yy in (top + 70, top + 112):
        pen.curve(arc(cx, yy, w, 8, 0, math.pi, 22))
    pen.hatch([(cx + 30, top + 20), (cx + w, top + w), (cx + w, bot - 30), (cx + 34, bot - 20)], angle=-70, gap=3)
    # emblem plate
    rect(pen, cx - 18, top + 82, 36, 18, "fine")
    pen.path([(cx - 10, top + 96), (cx, top + 86), (cx + 10, top + 96)], "fine")
    # yoke and stand
    pen.path([(cx - w - 8, top + 130), (cx - w - 8, bot + 8), (cx + w + 8, bot + 8), (cx + w + 8, top + 130)])
    pen.curve(arc(cx - w - 8, top + 130, 5, 5, 0, 2 * math.pi, 12)); pen.curve(arc(cx + w + 8, top + 130, 5, 5, 0, 2 * math.pi, 12))
    pen.line((cx - 4, bot + 8), (cx - 4, 334)); pen.line((cx + 4, bot + 8), (cx + 4, 334))
    pen.hatch([(cx, bot + 10), (cx + 4, bot + 10), (cx + 4, 334), (cx, 334)], angle=-80, gap=2.4)
    pen.curve(arc(cx, 342, 64, 12, 0, 2 * math.pi, 40))
    pen.curve(arc(cx, 336, 64, 12, math.pi, 2 * math.pi, 24), "fine")
    pen.line((cx - 64, 336), (cx - 64, 342)); pen.line((cx + 64, 336), (cx + 64, 342))
    pen.hatch([(cx + 20, 344), (cx + 60, 340), (cx + 50, 352), (cx + 16, 354)], angle=-20, gap=3)
    # sound lines either side
    for k in range(3):
        r = 96 + k * 22
        pen.curve(arc(cx, 140, r, r, math.pi * 0.84, math.pi * 1.16, 14), "fine")
        pen.curve(arc(cx, 140, r, r, -math.pi * 0.16, math.pi * 0.16, 14), "fine")
    pen.svg("press")


# ------------------------------------------------------------------ Contact: a sealed letter and a fountain pen
def general():
    pen = Pen(505)
    # envelope, slightly turned: front face plus edge
    A, B, C, Dd = (60, 150), (300, 120), (318, 290), (74, 324)
    pen.path([A, B, C, Dd], closed=True)
    pen.line(Dd, (Dd[0] + 6, Dd[1] + 5)); pen.line((Dd[0] + 6, Dd[1] + 5), (C[0] + 6, C[1] + 5)); pen.line(C, (C[0] + 6, C[1] + 5))
    M = (186, 236)
    pen.path([A, M, B])
    pen.path([Dd, (150, 250)], "fine"); pen.path([C, (226, 238)], "fine")
    pen.hatch([A, M, Dd], angle=-62, gap=3.6, density=0.8)
    # wax seal
    pen.curve(arc(M[0], M[1], 20, 18, 0, 2 * math.pi, 26))
    pen.curve(arc(M[0], M[1], 13, 12, 0, 2 * math.pi, 22), "fine")
    pen.path([(M[0] - 7, M[1] + 5), (M[0], M[1] - 7), (M[0] + 7, M[1] + 5)], "fine")
    for a in range(0, 360, 40):
        t = math.radians(a)
        pen.line((M[0] + 20 * math.cos(t), M[1] + 18 * math.sin(t)), (M[0] + 25 * math.cos(t + 0.15), M[1] + 23 * math.sin(t + 0.15)), "fine", over=False)
    # address lines
    for k in range(3):
        pen.line((96 + k * 4, 286 - k * 10), (170 - k * 10, 280 - k * 11), "fine", over=False)
    # fountain pen lying across, nib down-left
    nib = (120, 360)
    end = (360, 196)
    ux, uy = (end[0] - nib[0]), (end[1] - nib[1])
    L = math.hypot(ux, uy); ux, uy = ux / L, uy / L
    nx, ny = -uy, ux
    def at(t, o):
        return (nib[0] + ux * t + nx * o, nib[1] + uy * t + ny * o)
    pen.path([at(0, 0), at(30, -7), at(30, 7)], closed=True)
    pen.line(at(4, 0), at(26, 0), "fine")
    pen.path([at(30, -8), at(60, -9), at(60, 9), at(30, 8)], closed=True)
    for t in range(34, 58, 5):
        pen.line(at(t, -8), at(t, 8), "fine", over=False)
    pen.path([at(60, -10), at(L, -10), at(L, 10), at(60, 10)])
    pen.curve([at(L + 10 * math.cos(a) * 0 + 10 * math.sin(a), 10 * math.cos(a)) for a in [i * math.pi / 12 for i in range(13)]])
    pen.line(at(150, -10), at(150, 10)); pen.line(at(156, -10), at(156, 10))
    pen.path([at(160, -12), at(240, -12), at(244, -16)], "fine")
    pen.hatch([at(62, 2), at(L - 4, 2), at(L - 4, 9), at(62, 9)], angle=math.degrees(math.atan2(uy, ux)) + 90, gap=3)
    pen.svg("general")


capital(); careers(); hop(); press(); general()
