export type Service = {
  slug: string;
  ar: string;
  en: string;
  arSummary: string;
  enSummary: string;
  icon: string;
};

export const services: Service[] = [
  { slug: "website-design", ar: "تصميم المواقع", en: "Website Design", arSummary: "مواقع سريعة ومقنعة مبنية للتحويل والنمو.", enSummary: "Fast, persuasive websites engineered for conversion and growth.", icon: "↗" },
  { slug: "web-applications", ar: "تطبيقات الويب", en: "Web Applications", arSummary: "تجارب وظيفية موثوقة للمستخدمين والفرق.", enSummary: "Reliable functional experiences for customers and teams.", icon: "⌘" },
  { slug: "saas-development", ar: "تطوير SaaS", en: "SaaS Development", arSummary: "من الفكرة إلى منتج قابل للتوسع في السوق.", enSummary: "From concept to a scalable market-ready product.", icon: "◇" },
  { slug: "paid-media", ar: "إدارة الحملات الإعلانية", en: "Paid Media", arSummary: "رسائل وإبداع وقياس وتحسين مستمر.", enSummary: "Messaging, creative, measurement, and ongoing optimisation.", icon: "◎" },
  { slug: "social-media", ar: "إدارة السوشال ميديا", en: "Social Media", arSummary: "حضور يومي متماسك يخدم أهداف العلامة.", enSummary: "A consistent daily presence aligned with brand goals.", icon: "#" },
  { slug: "visual-identity", ar: "تصميم الهوية البصرية", en: "Visual Identity", arSummary: "نظام بصري متكامل، لا شعار منفرد.", enSummary: "A complete visual system, not an isolated logo.", icon: "✦" },
  { slug: "logo-design", ar: "تصميم اللوغو", en: "Logo Design", arSummary: "علامة مميزة تعمل بوضوح في كل المقاسات.", enSummary: "A distinctive mark that works at every size.", icon: "△" },
  { slug: "video-production", ar: "المونتاج الاحترافي", en: "Video Production", arSummary: "قصص مرئية بإيقاع سينمائي ودقة عالية.", enSummary: "Visual stories with cinematic rhythm and precision.", icon: "▶" },
  { slug: "seo-growth", ar: "رفع الظهور في غوغل", en: "SEO Growth", arSummary: "بنية ومحتوى وروابط تساعد البحث على فهمك.", enSummary: "Architecture, content, and links search can understand.", icon: "⌕" },
];

export const getService = (slug: string) => services.find((item) => item.slug === slug);
