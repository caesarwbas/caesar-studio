const canvas = document.querySelector<HTMLCanvasElement>("#fireworks");

if (canvas) {
  const ctx = canvas.getContext("2d")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let particles: {x:number;y:number;vx:number;vy:number;life:number;decay:number;size:number;color:string}[] = [];
  let frame = 0, endAt = 0, dpr = 1;

  function fit() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas!.width = innerWidth * dpr; canvas!.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function burst(x: number, y: number, count: number) {
    const colors = ["#d6522b", "#ff9c74", "#f5f1e9", "#ffffff"];
    for (let index = 0; index < count; index += 1) {
      const angle = Math.random() * Math.PI * 2; const speed = 1.7 + Math.random() * 5;
      particles.push({ x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:1,decay:.014+Math.random()*.014,size:1+Math.random()*2.4,color:colors[index%colors.length] });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight); ctx.globalCompositeOperation = "lighter";
    particles = particles.filter((particle) => particle.life > 0);
    particles.forEach((particle) => { particle.x+=particle.vx; particle.y+=particle.vy; particle.vy+=.045; particle.vx*=.992; particle.life-=particle.decay; ctx.globalAlpha=Math.max(0,particle.life); ctx.fillStyle=particle.color; ctx.beginPath(); ctx.arc(particle.x,particle.y,particle.size,0,Math.PI*2); ctx.fill(); });
    ctx.globalAlpha = 1;
    if (particles.length && performance.now() < endAt + 700) frame=requestAnimationFrame(animate);
    else { canvas!.classList.remove("visible"); particles=[]; }
  }

  function launch(element: HTMLElement) {
    fit(); cancelAnimationFrame(frame); particles=[];
    const rect=element.getBoundingClientRect(); canvas!.classList.add("visible"); endAt=performance.now()+1350;
    burst(rect.left+rect.width/2,rect.top+rect.height/2,45);
    if(!reduced){setTimeout(()=>burst(innerWidth*.27,innerHeight*.33,46),160);setTimeout(()=>burst(innerWidth*.72,innerHeight*.28,46),310);setTimeout(()=>burst(innerWidth*.52,innerHeight*.58,52),470)}
    frame=requestAnimationFrame(animate);
  }

  document.querySelectorAll<HTMLElement>("[data-fireworks]").forEach((element)=>element.addEventListener("click",()=>launch(element)));
}

export {};
