"""Share images (1200x630) for each page: his name on the left in the site's lockup, the page's own photograph
on the right fading into the plum ground. Run from the repo root: python3 scripts/og-images.py
Writes public/og/<page>.jpg; the pages point to them through app/_lib/seo.ts."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

W, H = 1200, 630
PLUM = (12, 8, 15)
BONE = (242, 238, 231)
GOLD_SOFT = (239, 211, 148)
HELVETICA = "/System/Library/Fonts/HelveticaNeue.ttc"
BOLD, MEDIUM = 1, 10

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "public" / "img"
OUT = ROOT / "public" / "og"

# page -> (photograph, how far down to keep in view 0..1, the word, the line under it)
PAGES = {
    "home": ("kk-gtn-portrait.jpg", 0.15, "Platform builder", "Mining chemicals · Capital markets\nReal estate · Live entertainment"),
    "podcasts": ("podcast-studio-hd.jpg", 0.2, "Podcasts", "In his own words."),
    "press": ("kk-cover-gtn.jpg", 0.0, "Press & media", "Biography, facts and awards."),
    "ideas": ("solo-ground.jpg", 0.3, "Ideas", "Written after they worked."),
    "hop": ("hop-page.jpg", 0.2, "HOP Events", "At arena scale."),
    "real-estate": ("solo-welcome.jpg", 0.2, "Real Estate", "Delivered on schedule."),
    "contact": ("solo-enquiries-v3.jpg", 0.2, "Enquiries", "Pick your door."),
}


def font(size, index):
    return ImageFont.truetype(HELVETICA, size, index=index)


def photo(name, focus, width):
    """The photograph cropped to width x H, keeping `focus` (0 top .. 1 bottom) in view."""
    img = ImageOps.exif_transpose(Image.open(IMG / name)).convert("RGB")
    scale = max(width / img.width, H / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = (img.width - width) // 2
    top = round((img.height - H) * focus)
    return img.crop((left, top, left + width, top + H))


def card(name, focus, word, line):
    canvas = Image.new("RGB", (W, H), PLUM)

    # The photograph on the right, fading into the ground towards the words
    pw = 560
    pic = photo(name, focus, pw)
    fade = Image.new("L", (pw, H))
    for x in range(pw):
        a = min(1.0, x / 220)
        ImageDraw.Draw(fade).line([(x, 0), (x, H)], fill=round(255 * a * a))
    canvas.paste(pic, (W - pw, 0), fade)

    d = ImageDraw.Draw(canvas)
    x = 64
    # Name lockup: "Kalpesh" in bone, "Kinariwala" beneath in gold-soft, both bold grotesk
    d.text((x, 150), "Kalpesh", font=font(118, BOLD), fill=BONE)
    d.text((x + 4, 268), "Kinariwala", font=font(64, BOLD), fill=GOLD_SOFT)
    d.text((x + 4, 392), word, font=font(40, MEDIUM), fill=BONE)
    # The line wraps to the room the photograph leaves
    f = font(26, MEDIUM)
    rows = []
    for part in line.split("\n"):
        row = ""
        for w in part.split():
            trial = f"{row} {w}".strip()
            if d.textlength(trial, font=f) > 560 and row:
                rows.append(row)
                row = w
            else:
                row = trial
        rows.append(row)
    for n, r in enumerate(rows):
        d.text((x + 4, 448 + n * 36), r, font=f, fill=BONE)
    d.text((x + 4, H - 64), "kalpeshkinariwala.com", font=font(22, MEDIUM), fill=(160, 150, 140))
    return canvas


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for page, (name, focus, word, line) in PAGES.items():
        card(name, focus, word, line).save(OUT / f"{page}.jpg", quality=88, optimize=True, progressive=True)
        print(OUT / f"{page}.jpg")
