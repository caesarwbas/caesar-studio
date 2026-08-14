from pathlib import Path
from PIL import Image, ImageChops, ImageFilter, ImageStat

SOURCE = Path("public/assets/clients")
OUTPUT = SOURCE / "clean"
OUTPUT.mkdir(exist_ok=True)


def border_color(image: Image.Image) -> tuple[int, int, int]:
    rgb = image.convert("RGB")
    w, h = rgb.size
    edge = Image.new("RGB", (w * 2 + h * 2, 1))
    pixels = []
    pixels.extend(rgb.crop((0, 0, w, 1)).getdata())
    pixels.extend(rgb.crop((0, h - 1, w, h)).getdata())
    pixels.extend(rgb.crop((0, 0, 1, h)).getdata())
    pixels.extend(rgb.crop((w - 1, 0, w, h)).getdata())
    edge.putdata(pixels)
    return tuple(round(value) for value in ImageStat.Stat(edge).median)


def background_alpha(image: Image.Image) -> Image.Image:
    base = Image.new("RGB", image.size, border_color(image))
    difference = ImageChops.difference(image.convert("RGB"), base)
    distance = difference.convert("L").point(
        lambda value: max(0, min(255, round((value - 7) * 6.2)))
    )
    return distance.filter(ImageFilter.GaussianBlur(0.45))


def clean_logo(path: Path) -> None:
    image = Image.open(path).convert("RGBA")
    alpha = image.getchannel("A")
    if ImageStat.Stat(alpha).extrema[0][0] > 5:
        alpha = background_alpha(image)
    image.putalpha(alpha)
    box = alpha.point(lambda value: 255 if value > 10 else 0).getbbox()
    if box:
        image = image.crop(box)
    image.thumbnail((900, 360), Image.Resampling.LANCZOS)
    image.save(OUTPUT / path.name, optimize=True)


for logo in sorted(SOURCE.glob("*.png")):
    clean_logo(logo)
