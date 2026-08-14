import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const homePaths = new Set(["/", "/en", "/en/"]);
const copySelector = "h1, h2, h3, .section-text, .eyebrow";

function initCinematicScroll() {
  if (!homePaths.has(window.location.pathname)) return;

  const sections = gsap.utils.toArray<HTMLElement>("main > section");
  sections.forEach((section) => {
    const sectionMotion = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.65,
        invalidateOnRefresh: true,
      },
    });
    sectionMotion
      .fromTo(
        section,
        { y: 45, scale: 0.985, autoAlpha: 0.48, filter: "brightness(.82)" },
        { y: 0, scale: 1, autoAlpha: 1, filter: "brightness(1)", duration: 0.28 },
      )
      .to(section, { y: 0, scale: 1, autoAlpha: 1, filter: "brightness(1)", duration: 0.44 })
      .to(section, {
        y: -24,
        scale: 0.992,
        autoAlpha: 0.78,
        filter: "brightness(.78)",
        duration: 0.28,
      });

    const copy = section.querySelectorAll<HTMLElement>(copySelector);
    if (!copy.length || section.id === "home") return;
    gsap.fromTo(
      copy,
      { y: 34, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

initCinematicScroll();
