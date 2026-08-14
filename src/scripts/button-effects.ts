const reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
const selector = "button,.button,.icon-button,.contact-button,.service-card";

document.querySelectorAll<HTMLElement>(selector).forEach((button) => {
  if (button.hasAttribute("data-native-button")) return;
  button.classList.add("fx-button");

  if (!button.classList.contains("icon-button") && !button.dataset.animatedLabel) {
    button.dataset.animatedLabel = "true";
    let label = Array.from(button.children).find((child) =>
      child instanceof HTMLElement && child.tagName === "SPAN" &&
      !child.classList.contains("arrow") && !child.classList.contains("spark")
    ) as HTMLElement | undefined;

    if (!label) {
      const textNodes = Array.from(button.childNodes).filter((node) =>
        node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
      );
      if (textNodes.length) {
        label = document.createElement("span");
        label.textContent = textNodes.map((node) => node.textContent).join(" ").trim();
        textNodes.forEach((node) => node.remove());
        button.insertBefore(label, button.firstChild);
      }
    }

    if (label?.textContent) {
      const text = label.textContent;
      label.classList.add("button-label");
      const letters = /[\u0600-\u06ff]/.test(text) ? [text] : Array.from(text);
      label.replaceChildren(...letters.map((letter, index) => {
        const span = document.createElement("span");
        span.className = "btn-letter";
        span.textContent = letter === " " ? "\u00a0" : letter;
        span.style.setProperty("--letter-delay", `${index * .055}s`);
        return span;
      }));
    }
  }

  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    button.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    button.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });

  button.addEventListener("pointerleave", () => {
    button.classList.remove("edge-release");
    void button.offsetWidth;
    button.classList.add("edge-release");
    setTimeout(() => button.classList.remove("edge-release"), 740);
  });

  button.addEventListener("pointerdown", (event) => {
    const rect = button.getBoundingClientRect();
    button.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    button.style.setProperty("--my", `${event.clientY - rect.top}px`);
    button.classList.remove("edge-release", "electric");
    void button.offsetWidth;
    button.classList.add("electric");
    setTimeout(() => button.classList.remove("electric"), 480);
    if (reduced) return;
    for (let index = 0; index < 10; index += 1) {
      const spark = document.createElement("i");
      const angle = Math.PI * 2 * index / 10 + Math.random() * .36;
      const distance = 24 + Math.random() * 48;
      spark.className = "spark";
      spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
      spark.style.setProperty("--spin", `${Math.random() * 180 - 90}deg`);
      button.append(spark);
      spark.addEventListener("animationend", () => spark.remove(), { once:true });
    }
  });

  if (button instanceof HTMLAnchorElement && button.target !== "_blank") {
    button.addEventListener("click", (event) => {
      if (button.dataset.fxLeaving || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = new URL(button.href, location.href);
      if (target.origin !== location.origin) return;
      event.preventDefault();
      button.dataset.fxLeaving = "true";
      setTimeout(() => { location.href = target.href; }, 360);
    });
  }
});

document.querySelectorAll<HTMLElement>(".fx-frame").forEach((frame) => {
  frame.addEventListener("pointermove", (event) => {
    const rect = frame.getBoundingClientRect();
    frame.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    frame.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
  frame.addEventListener("pointerleave", () => {
    frame.classList.remove("edge-release");
    void frame.offsetWidth;
    frame.classList.add("edge-release");
    setTimeout(() => frame.classList.remove("edge-release"), 740);
  });
});

if (matchMedia("(pointer:fine)").matches && !reduced) {
  document.querySelectorAll<HTMLElement>(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .08;
      const y = (event.clientY - rect.top - rect.height / 2) * .08;
      button.style.transform = `translate(${x}px,${y}px)`;
    });
    button.addEventListener("pointerleave", () => { button.style.transform = ""; });
  });
}

document.querySelectorAll<HTMLElement>("[data-logo]").forEach((logo) => {
  logo.addEventListener("click", () => logo.classList.toggle("active"));
});
