const hero = document.querySelector<HTMLElement>(".profile");
const reveal = document.querySelector<HTMLElement>("#spotlight-reveal");
const pattern = document.querySelector<SVGPatternElement>("#profile-grid-pattern");

if (hero && reveal) {
  const heroElement = hero;
  const revealElement = reveal;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const mouse = { x:innerWidth / 2, y:innerHeight / 2 };
  const smooth = { ...mouse };
  const grid = { x:0, y:0 };
  let active = false;
  let frame = 0;

  canvas.hidden = true;
  heroElement.append(canvas);
  function resize(){canvas.width=innerWidth;canvas.height=innerHeight}
  function track(event:MouseEvent){
    mouse.x=event.clientX;mouse.y=event.clientY;
    if(!active){smooth.x=mouse.x;smooth.y=mouse.y}
    active=true;
    revealElement.classList.add("active");
  }

  function render(){
    smooth.x += (mouse.x - smooth.x) * .22;
    smooth.y += (mouse.y - smooth.y) * .22;
    context.clearRect(0,0,canvas.width,canvas.height);
    if(active){
      const gradient=context.createRadialGradient(smooth.x,smooth.y,0,smooth.x,smooth.y,260);
      gradient.addColorStop(0,"rgba(255,255,255,1)");gradient.addColorStop(.4,"rgba(255,255,255,1)");
      gradient.addColorStop(.6,"rgba(255,255,255,.75)");gradient.addColorStop(.75,"rgba(255,255,255,.4)");
      gradient.addColorStop(.88,"rgba(255,255,255,.12)");gradient.addColorStop(1,"rgba(255,255,255,0)");
      context.fillStyle=gradient;context.fillRect(0,0,canvas.width,canvas.height);
      const mask=`url(${canvas.toDataURL()})`;revealElement.style.maskImage=mask;revealElement.style.webkitMaskImage=mask;
      const rect=heroElement.getBoundingClientRect();
      const targetX=((smooth.x-rect.left)/rect.width-.5)*16,targetY=((smooth.y-rect.top)/rect.height-.5)*16;
      grid.x+=(targetX-grid.x)*.06;grid.y+=(targetY-grid.y)*.06;
      pattern?.setAttribute("x",String(grid.x));pattern?.setAttribute("y",String(grid.y));
    }
    frame=requestAnimationFrame(render);
  }
  heroElement.addEventListener("mousemove",track,{passive:true});
  heroElement.addEventListener("mouseleave",()=>{active=false;revealElement.classList.remove("active")});
  addEventListener("resize",resize,{passive:true});
  new IntersectionObserver(([entry])=>{cancelAnimationFrame(frame);if(entry.isIntersecting)render()}).observe(heroElement);
  resize();render();
}

export {};
