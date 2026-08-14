const canvas = document.querySelector<HTMLCanvasElement>("#neural");

if (canvas) {
  const ctx = canvas.getContext("2d")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let points: { x:number; y:number; vx:number; vy:number; r:number; phase:number }[] = [];
  let width = 0, height = 0, dpr = 1, frame = 0, visible = true;
  const pointer = { x: .5, y: .5 };

  function resize() {
    const rect = canvas!.getBoundingClientRect();
    width = rect.width; height = rect.height; dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas!.width = Math.max(1, Math.round(width * dpr));
    canvas!.height = Math.max(1, Math.round(height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width < 720 ? 34 : (navigator.hardwareConcurrency || 4) < 6 ? 56 : 82;
    points = Array.from({ length: count }, (_, index) => ({ x:Math.random()*width, y:Math.random()*height, vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.22, r:index%12===0?2.2:.7+Math.random(), phase:Math.random()*6.28 }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const light = document.documentElement.dataset.theme === "light";
    points.forEach((point, index) => {
      if (!reduced) {
        point.x += point.vx + (pointer.x - .5) * .012; point.y += point.vy + (pointer.y - .5) * .012;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        point.phase += .018;
      }
      for (let next = index + 1; next < points.length; next += 1) {
        const other = points[next]; const distance = Math.hypot(point.x-other.x, point.y-other.y);
        if (distance < 138) { ctx.beginPath(); ctx.moveTo(point.x,point.y); ctx.lineTo(other.x,other.y); ctx.strokeStyle = light ? `rgba(60,35,20,${(1-distance/138)*.17})` : `rgba(214,82,43,${(1-distance/138)*.22})`; ctx.lineWidth=.65; ctx.stroke(); }
      }
      ctx.beginPath(); ctx.arc(point.x,point.y,point.r+Math.sin(point.phase)*.15,0,Math.PI*2); ctx.fillStyle=index%12===0?"rgba(214,82,43,.95)":light?"rgba(35,25,18,.4)":"rgba(245,241,233,.62)"; ctx.fill();
    });
    if (visible && !reduced) frame = requestAnimationFrame(draw);
  }

  new ResizeObserver(() => { cancelAnimationFrame(frame); resize(); draw(); }).observe(canvas);
  new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; cancelAnimationFrame(frame); if(visible) draw(); }).observe(canvas);
  addEventListener("pointermove", (event) => { pointer.x=event.clientX/innerWidth; pointer.y=event.clientY/innerHeight; }, { passive:true });
  resize(); draw();
}

export {};
