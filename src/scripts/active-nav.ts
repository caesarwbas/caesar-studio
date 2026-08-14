import { gsap } from "gsap";

type Point = { x: number; y: number };

const nav = document.querySelector<HTMLElement>("#nav-links");
const buttons = nav ? [...nav.querySelectorAll<HTMLAnchorElement>("[data-nav]")] : [];

if (nav && buttons.length) {
  const navElement = nav;
  const canvas = document.createElement("canvas");
  canvas.id = "lightningCanvas";
  canvas.className = "lightning-canvas";
  canvas.setAttribute("aria-hidden", "true");
  navElement.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const progressObj = { value: 0 };
  let currentPos: Point | null = null;
  let targetPos: Point | null = null;

  const route = location.pathname.replace(/^\/en/, "");
  let activeButton = buttons.find((button) =>
    location.hash === "#contact" ? button.dataset.nav === "contact" :
    location.hash === "#services" ? button.dataset.nav === "services" :
    route.startsWith("/work") ? button.dataset.nav === "work" :
    route.startsWith("/insights") ? button.dataset.nav === "insights" :
    route.startsWith("/services") || route.startsWith("/locations")
      ? button.dataset.nav === "services"
      : button.dataset.nav === "home"
  ) || buttons[0];

  function resizeCanvas() {
    if (!ctx) return;
    const rect = navElement.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const height = rect.height + 64;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function getButtonCenter(button: HTMLElement): Point {
    const btnRect = button.getBoundingClientRect();
    const navRect = navElement.getBoundingClientRect();
    return {
      x: btnRect.left - navRect.left + btnRect.width / 2,
      y: btnRect.bottom - navRect.top + 10
    };
  }

  function generateLightningPoints(start: Point, end: Point, detail = 25) {
    const points: Point[] = [start];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);
    if (length < 1) return [start, end];
    const nx = -dy / length;
    const ny = dx / length;
    for (let index = 1; index < detail; index++) {
      const time = index / detail;
      const offset = (Math.random() - .5) * length * .25 * Math.sin(time * Math.PI);
      points.push({
        x: start.x + dx * time + nx * offset,
        y: start.y + dy * time + ny * offset
      });
    }
    points.push(end);
    return points;
  }

  function clearCanvas() {
    if (!ctx) return;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
  }

  function makePath(points: Point[]) {
    if (!ctx || points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  }

  function strokeLayer(points: Point[], color: string | CanvasGradient, width: number, shadow: string, blur: number) {
    if (!ctx) return;
    makePath(points);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.shadowColor = shadow;
    ctx.shadowBlur = blur;
    ctx.stroke();
  }

  function paintLayers(points: Point[], start: Point, end: Point, withBranches = true) {
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
    gradient.addColorStop(0, "rgba(255,140,0,0)");
    gradient.addColorStop(.4, "rgba(255,140,0,.3)");
    gradient.addColorStop(.8, "rgba(255,180,50,.8)");
    gradient.addColorStop(1, "rgba(255,230,150,1)");
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = .7 + Math.random() * .3;
    strokeLayer(points, gradient, 6, "rgba(255,140,0,.9)", 25);
    strokeLayer(points, gradient, 2.5, "rgba(255,220,100,1)", 12);
    if (withBranches) drawBranches(points);
    ctx.restore();
  }

  function drawBranches(points: Point[]) {
    if (!ctx || points.length < 4) return;
    const count = Math.floor(Math.random() * 3) + 2;
    for (let branch = 0; branch < count; branch++) {
      const index = Math.floor((.2 + Math.random() * .6) * (points.length - 1));
      const start = points[index];
      const length = 10 + Math.random() * 30;
      const angle = Math.random() * Math.PI * 2;
      const end = { x:start.x + Math.cos(angle) * length, y:start.y + Math.sin(angle) * length };
      const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
      gradient.addColorStop(0, "rgba(255,180,50,.8)");
      gradient.addColorStop(1, "rgba(255,140,0,0)");
      strokeLayer([start, end], gradient, 1.5, "rgba(255,160,0,.7)", 8);
    }
  }

  function drawIdle(point: Point) {
    clearCanvas();
    const start = { x: point.x - 13, y: point.y };
    const end = { x: point.x + 13, y: point.y };
    paintLayers(generateLightningPoints(start, end, 7), start, end, false);
  }

  function drawLightning(progress: number) {
    if (!currentPos || !targetPos) return;
    const lead = {
      x: currentPos.x + (targetPos.x - currentPos.x) * progress,
      y: currentPos.y + (targetPos.y - currentPos.y) * progress
    };
    const points = generateLightningPoints(currentPos, lead, 25);
    clearCanvas();
    paintLayers(points, currentPos, lead);
  }

  function setActive(button: HTMLAnchorElement) {
    buttons.forEach((item) => item.classList.toggle("active", item === button));
    activeButton = button;
  }

  function initIndicator() {
    resizeCanvas();
    setActive(activeButton);
    currentPos = getButtonCenter(activeButton);
    targetPos = { ...currentPos };
    drawIdle(currentPos);
  }

  buttons.forEach((button) => {
    button.addEventListener("pointerup", (event) => {
      if (event.pointerType === "mouse") button.blur();
    });
    button.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (button === activeButton) return;
      event.preventDefault();
      setActive(button);
      const newTarget = getButtonCenter(button);
      if (!currentPos) currentPos = newTarget;
      gsap.killTweensOf(progressObj);
      const startPos = { ...currentPos };
      targetPos = newTarget;
      progressObj.value = 0;
      gsap.to(progressObj, {
        value: 1,
        duration: .7,
        ease: "sine.inOut",
        onUpdate: () => {
          currentPos = startPos;
          drawLightning(progressObj.value);
        },
        onComplete: () => {
          currentPos = { ...newTarget };
          drawIdle(currentPos);
        }
      });
      window.setTimeout(() => { location.href = button.href; }, 780);
    });
  });

  document.fonts.ready.then(initIndicator);
  addEventListener("resize", initIndicator, { passive: true });
}

export {};
