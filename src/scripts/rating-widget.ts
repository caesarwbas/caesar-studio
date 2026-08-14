document.querySelectorAll<HTMLElement>("[data-rating-widget]").forEach((widget) => {
  const form = widget.querySelector<HTMLFormElement>("[data-rating-form]");
  const status = widget.querySelector<HTMLElement>("[data-rating-status]");
  const lang = widget.dataset.lang || "ar";
  if (!form || !status) return;
  const sentKey = "caesar-rating-sent";
  const sent = localStorage.getItem(sentKey);
  if (sent) status.textContent = lang === "ar" ? "سبق أن أرسلت تقييمًا من هذا الجهاز، شكرًا لك." : "A rating was already sent from this device. Thank you.";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const rating = data.get("rating")?.toString();
    const comment = data.get("comment")?.toString().trim();
    const name = data.get("name")?.toString().trim() || (lang === "ar" ? "عميل" : "Client");
    if (!rating || !comment) {
      status.textContent = lang === "ar" ? "اختر عدد النجوم واكتب ملاحظتك أولًا." : "Choose stars and add your feedback first.";
      return;
    }
    const subject = encodeURIComponent(`CAESAR STUDIO rating: ${rating}/5`);
    const body = encodeURIComponent(`Name: ${name}\nRating: ${rating}/5\n\nFeedback:\n${comment}`);
    localStorage.setItem(sentKey, JSON.stringify({ rating, date: new Date().toISOString() }));
    status.textContent = lang === "ar" ? "شكرًا لك — افتح تطبيق البريد لإكمال إرسال تقييمك." : "Thank you — open your email app to complete sending.";
    location.href = `mailto:hello@caesarstudio.com?subject=${subject}&body=${body}`;
  });
});

export {};
