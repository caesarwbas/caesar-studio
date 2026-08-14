const stage=document.querySelector<HTMLElement>("[data-cube-stage]");
const motion=stage?.querySelector<HTMLElement>("[data-cube-motion]");

if(stage&&motion){
  let pointerAngle=0,currentPointer=0,spin=0,velocity=.13,last=performance.now();
  const fine=matchMedia("(pointer:fine)").matches;
  stage.addEventListener("pointermove",event=>{
    if(!fine)return;
    const rect=stage.getBoundingClientRect();
    const x=event.clientX-(rect.left+rect.width/2);
    const y=event.clientY-(rect.top+rect.height/2);
    pointerAngle=Math.atan2(y,x)*180/Math.PI*.08;
  });
  stage.addEventListener("pointerleave",()=>{pointerAngle=0});
  stage.addEventListener("pointerdown",event=>{
    const rect=stage.getBoundingClientRect();
    velocity+=(event.clientX<rect.left+rect.width/2?-1:1)*.5;
  });
  const animate=(now:number)=>{
    const delta=Math.min(32,now-last)/16.67;last=now;
    velocity+=(Math.sign(velocity||1)*.13-velocity)*.018;
    spin=(spin+velocity*delta)%360;
    currentPointer+=(pointerAngle-currentPointer)*.08;
    motion.style.transform=`rotate(${spin+currentPointer}deg)`;
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

export {};
