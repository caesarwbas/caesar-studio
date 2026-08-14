document.querySelectorAll<HTMLElement>(".service-orbit").forEach((orbit) => {
  const inner = orbit.querySelector<HTMLElement>(".inner");
  if (!inner) return;

  let angle = 0;
  let dragging = false;
  let moved = false;
  let lastX = 0;
  let lastTime = 0;
  let momentum = 0;
  let previousFrame = performance.now();
  const autoSpeed = 0.018;

  const render = () => {
    inner.style.transform = `perspective(var(--perspective)) rotateX(var(--rotate-x)) rotateY(${angle}deg)`;
  };

  orbit.addEventListener("pointerdown", (event) => {
    dragging = true;
    moved = false;
    momentum = 0;
    lastX = event.clientX;
    lastTime = performance.now();
    orbit.classList.add("dragging");
    orbit.setPointerCapture(event.pointerId);
  });

  orbit.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const now = performance.now();
    const deltaX = event.clientX - lastX;
    if (Math.abs(deltaX) > 1) moved = true;
    angle += deltaX * 0.34;
    momentum = deltaX * 0.34 / Math.max(1, now - lastTime);
    lastX = event.clientX;
    lastTime = now;
    render();
  });

  const release = (event: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    orbit.classList.remove("dragging");
    if (orbit.hasPointerCapture(event.pointerId)) orbit.releasePointerCapture(event.pointerId);
  };

  orbit.addEventListener("pointerup", release);
  orbit.addEventListener("pointercancel", release);
  orbit.addEventListener("click", (event) => {
    if (!moved) return;
    event.preventDefault();
    event.stopPropagation();
    moved = false;
  }, true);

  const animate = (time: number) => {
    const delta = Math.min(32, time - previousFrame);
    previousFrame = time;
    if (!dragging) {
      angle += (autoSpeed + momentum) * delta;
      momentum *= Math.pow(0.93, delta / 16.67);
      render();
    }
    requestAnimationFrame(animate);
  };

  render();
  requestAnimationFrame(animate);
});
export {};
