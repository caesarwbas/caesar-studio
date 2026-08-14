document.querySelectorAll<HTMLElement>("[data-discovery]").forEach((section) => {
  const wall = section.querySelector<HTMLElement>("[data-discovery-wall]");
  const cursor = section.querySelector<HTMLElement>("[data-discovery-cursor]");
  const raw = { x: section.clientWidth / 2, y: section.clientHeight / 2 };
  const smooth = { ...raw };
  let active = false;
  let radius = 0;
  let frame = 0;

  const render = () => {
    smooth.x += (raw.x - smooth.x) * 0.24;
    smooth.y += (raw.y - smooth.y) * 0.24;
    radius += ((active ? Math.min(300, innerWidth * 0.25) : 0) - radius) * 0.2;
    section.style.setProperty("--spot-x", `${smooth.x}px`);
    section.style.setProperty("--spot-y", `${smooth.y}px`);
    section.style.setProperty("--spot-radius", `${radius}px`);
    if (cursor) cursor.style.transform = `translate3d(${smooth.x - 25}px,${smooth.y - 25}px,0)`;
    if (wall) {
      wall.style.setProperty("--wall-x", `${(smooth.x / section.clientWidth - 0.5) * -16}px`);
      wall.style.setProperty("--wall-y", `${(smooth.y / section.clientHeight - 0.5) * -12}px`);
    }
    frame = requestAnimationFrame(render);
  };

  const track = (event: PointerEvent) => {
    const rect = section.getBoundingClientRect();
    raw.x = event.clientX - rect.left;
    raw.y = event.clientY - rect.top;
    if (!active) Object.assign(smooth, raw);
    radius = Math.min(300, innerWidth * 0.25);
    active = true;
    section.classList.add("is-active");
  };

  section.addEventListener("pointerenter", track);
  section.addEventListener("pointermove", track);
  section.addEventListener("pointerleave", () => { active = false; section.classList.remove("is-active"); });
  frame = requestAnimationFrame(render);
  addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
});
