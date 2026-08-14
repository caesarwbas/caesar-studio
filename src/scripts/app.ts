import "./active-nav";
import "./button-effects";
import "./fireworks";
import "./cinematic-scroll";

if (document.querySelector("#starfield-container")) void import("./starfield");
if (document.querySelector("#neural")) void import("./neural-network");
if (document.querySelector("#spotlight-reveal")) void import("./spotlight-reveal");
if (document.querySelector("[data-rating-widget]")) void import("./rating-widget");
if (document.querySelector(".service-orbit")) void import("./services-carousel");
if (document.querySelector("[data-cube-stage]")) void import("./cube-interaction");

const root = document.documentElement;
const page = document.querySelector<HTMLElement>("#page")!;
const theme = localStorage.getItem("caesar-theme") || "dark";
root.dataset.theme = theme; page.dataset.theme = theme;

document.querySelector<HTMLButtonElement>("#theme-button")?.addEventListener("click", (event) => {
  const button = event.currentTarget as HTMLButtonElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next; page.dataset.theme = next; localStorage.setItem("caesar-theme", next);
  button.setAttribute("aria-pressed", String(next === "light"));
});

const menuButton = document.querySelector<HTMLButtonElement>("#menu-button");
const menu = document.querySelector<HTMLElement>("#mobile-menu");
function closeMenu(){menu?.classList.remove("open");menu?.setAttribute("aria-hidden","true");menuButton?.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open")}
menuButton?.addEventListener("click",()=>{const open=!menu?.classList.contains("open");menu?.classList.toggle("open",open);menu?.setAttribute("aria-hidden",String(!open));menuButton.setAttribute("aria-expanded",String(open));document.body.classList.toggle("menu-open",open)});
menu?.querySelectorAll("a").forEach((link)=>link.addEventListener("click",closeMenu));

const reveal = new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add("visible");reveal.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach((element)=>reveal.observe(element));

let lastY=0;
addEventListener("scroll",()=>{const y=scrollY,max=document.documentElement.scrollHeight-innerHeight;const bar=document.querySelector<HTMLElement>("#scroll-progress");if(bar)bar.style.width=`${max?y/max*100:0}%`;document.querySelector("#site-header")?.classList.toggle("hidden",y>lastY&&y>160);lastY=y},{passive:true});
