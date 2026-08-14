import * as THREE from "three";

const host = document.querySelector<HTMLElement>("#starfield-container");

if (host) {
  const hero = host.parentElement as HTMLElement;
  const mobile = innerWidth < 720;
  const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const rate = calm ? .82 : 1.55;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, .1, 200);
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:"high-performance" });
  const orb = new THREE.Group();
  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2();
  let visible = true;
  let frame = 0;
  let impactAt = -10;

  scene.background = null;
  camera.position.z = 62;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.16;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const nodes = mobile ? 220 : 430;
  const nodePositions = new Float32Array(nodes * 3);
  const nodePhases = new Float32Array(nodes);
  const spherePoints: THREE.Vector3[] = [];
  const shellCount = Math.floor(nodes * .62);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < nodes; i++) {
    let v:THREE.Vector3;
    if (i < shellCount) {
      const y = 1 - 2 * (i + .5) / shellCount;
      const ring = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      v = new THREE.Vector3(Math.cos(theta) * ring, y, Math.sin(theta) * ring)
        .multiplyScalar(17 + THREE.MathUtils.randFloatSpread(2.2));
    } else {
      v = new THREE.Vector3().randomDirection().multiplyScalar(Math.pow(Math.random(),.48) * 15.5);
    }
    spherePoints.push(v);
    nodePositions.set([v.x,v.y,v.z], i * 3);
    nodePhases[i] = Math.random() * Math.PI * 2;
  }

  const edges:number[] = [];
  for (let a = 0; a < nodes; a++) {
    const nearest = spherePoints.map((v,b) => ({ b,d:a===b ? 999 : v.distanceToSquared(spherePoints[a]) }))
      .sort((x,y) => x.d-y.d).slice(0, a >= shellCount ? 7 : 5);
    nearest.forEach(({b}) => edges.push(...spherePoints[a].toArray(),...spherePoints[b].toArray()));
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position",new THREE.Float32BufferAttribute(edges,3));
  const lineMaterial = new THREE.LineBasicMaterial({ color:0xff6328, transparent:true, opacity:.42, blending:THREE.AdditiveBlending, depthWrite:false });
  orb.add(new THREE.LineSegments(lineGeometry,lineMaterial));
  const lineGlowMaterial = lineMaterial.clone(); lineGlowMaterial.opacity = .14;
  orb.add(new THREE.LineSegments(lineGeometry,lineGlowMaterial));

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute("position",new THREE.BufferAttribute(nodePositions,3));
  nodeGeometry.setAttribute("phase",new THREE.BufferAttribute(nodePhases,1));
  const nodeMaterial = new THREE.ShaderMaterial({
    uniforms:{ time:{value:0}, hue:{value:0}, impact:{value:0} }, transparent:true, blending:THREE.AdditiveBlending, depthWrite:false,
    vertexShader:`attribute float phase;varying float pulse;uniform float time;void main(){pulse=.48+.52*sin(time*4.1+phase);vec4 v=modelViewMatrix*vec4(position,1.);gl_PointSize=(3.8+pulse*8.2)*(235./max(1.,-v.z));gl_Position=projectionMatrix*v;}`,
    fragmentShader:`varying float pulse;uniform float hue,impact;vec3 pal(float h){vec3 p=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);return .12+p*.88;}void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float a=pow(1.-d*2.,1.75);float core=smoothstep(.16,0.,d);gl_FragColor=vec4(pal(hue)*(1.55+core*3.2)*(1.+impact*1.7),a*(.7+pulse*.3));}`
  });
  orb.add(new THREE.Points(nodeGeometry,nodeMaterial));

  const dustCount = mobile ? 3600 : 8200;
  const dustPosition = new Float32Array(dustCount * 3);
  const dustPhase = new Float32Array(dustCount);
  for (let i = 0; i < dustCount; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(Math.pow(Math.random(),.55) * 20);
    dustPosition.set([v.x,v.y,v.z],i*3); dustPhase[i] = Math.random()*6.283;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position",new THREE.BufferAttribute(dustPosition,3));
  dustGeometry.setAttribute("phase",new THREE.BufferAttribute(dustPhase,1));
  const dustMaterial = nodeMaterial.clone();
  dustMaterial.vertexShader = `attribute float phase;varying float pulse;uniform float time;void main(){pulse=.35+.65*sin(time*5.2+phase);vec4 v=modelViewMatrix*vec4(position,1.);gl_PointSize=(.9+pulse*2.4)*(175./max(1.,-v.z));gl_Position=projectionMatrix*v;}`;
  orb.add(new THREE.Points(dustGeometry,dustMaterial));

  function glow() {
    const canvas=document.createElement("canvas");canvas.width=canvas.height=256;const c=canvas.getContext("2d")!;
    const g=c.createRadialGradient(128,128,0,128,128,128);g.addColorStop(0,"rgba(255,255,230,.95)");g.addColorStop(.12,"rgba(255,126,42,.7)");g.addColorStop(.42,"rgba(165,55,255,.2)");g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.fillRect(0,0,256,256);return new THREE.CanvasTexture(canvas);
  }
  const coreMaterial = new THREE.SpriteMaterial({ map:glow(), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false });
  const core = new THREE.Sprite(coreMaterial); core.scale.set(29,29,1); orb.add(core);
  scene.add(orb);

  function resize(){const w=Math.max(hero.clientWidth,1),h=Math.max(hero.clientHeight,1);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);orb.position.set(0,mobile?1:2.4,0);orb.scale.setScalar(mobile?.5:.5);}
  function interaction(age:number){
    if(age<0||age>1.05)return {scale:1,flash:0,boost:0};
    const flash=Math.sin(Math.PI*Math.min(age/.55,1));
    if(age<.1)return {scale:1-age,flash,boost:.02};
    if(age<.34){const p=(age-.1)/.24;return {scale:.9+.28*(1-Math.pow(1-p,3)),flash,boost:.02*(1-p*.35)};}
    const p=(age-.34)/.71;
    return {scale:1+.18*Math.exp(-3*p)*Math.cos(p*Math.PI*2),flash,boost:.013*(1-p)};
  }
  function hitOrb(event:PointerEvent){
    if((event.target as Element)?.closest?.("a,button,input,textarea,select"))return false;
    const rect=hero.getBoundingClientRect();orb.updateWorldMatrix(true,false);
    const center=orb.localToWorld(new THREE.Vector3()).project(camera);
    const edge=orb.localToWorld(new THREE.Vector3(21,0,0)).project(camera);
    const cx=rect.left+(center.x+1)*rect.width/2,cy=rect.top+(1-center.y)*rect.height/2;
    const ex=rect.left+(edge.x+1)*rect.width/2,ey=rect.top+(1-edge.y)*rect.height/2;
    return Math.hypot(event.clientX-cx,event.clientY-cy)<=Math.hypot(ex-cx,ey-cy)*1.04;
  }
  function animate(){const raw=clock.getElapsedTime(),t=raw*rate,hue=(t*.1)%1,fx=interaction(raw-impactAt);nodeMaterial.uniforms.time.value=t;nodeMaterial.uniforms.hue.value=hue;nodeMaterial.uniforms.impact.value=fx.flash;dustMaterial.uniforms.time.value=t;dustMaterial.uniforms.hue.value=hue;dustMaterial.uniforms.impact.value=fx.flash;lineMaterial.color.setHSL(hue,1,.43);lineGlowMaterial.color.copy(lineMaterial.color);lineMaterial.opacity=.3+Math.sin(t*1.6)*.07+fx.flash*.2;lineGlowMaterial.opacity=.07+Math.sin(t*1.6)*.025+fx.flash*.13;const breathe=1+Math.sin(t*1.05)*.14;orb.scale.setScalar(.5*breathe*fx.scale);orb.rotation.y+=.0062*rate+fx.boost;orb.rotation.x+=.0024*rate+fx.boost*.38;orb.rotation.z+=.00135*rate+fx.boost*.2;orb.position.y=(mobile?1:2.4)+pointer.y*.8;coreMaterial.color.copy(lineMaterial.color);coreMaterial.opacity=.4+Math.sin(t*1.9)*.12+fx.flash*.3;renderer.render(scene,camera);if(visible)frame=requestAnimationFrame(animate);}
  addEventListener("pointermove",e=>pointer.set(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5),{passive:true});
  hero.addEventListener("pointerdown",event=>{if(hitOrb(event))impactAt=clock.getElapsedTime();});
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;cancelAnimationFrame(frame);if(visible)animate();}).observe(host);
  resize();animate();
}

export {};
