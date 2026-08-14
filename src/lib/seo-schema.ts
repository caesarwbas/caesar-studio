import type { Service } from "@/data/services";
import type { Location } from "@/data/locations";
import type { SeoCopy } from "@/data/seo-content";

const origin = "https://caesarstudio.com";
export type Lang = "ar" | "en";
export type Faq = { q: string; a: string };
export const absolute = (path: string) => new URL(path, origin).href;

export const breadcrumbSchema = (items: { name: string; href: string }[]) => ({
  "@type":"BreadcrumbList",
  itemListElement:items.map((item, index) => ({ "@type":"ListItem", position:index + 1, name:item.name, item:absolute(item.href) })),
});

export const faqSchema = (items: Faq[]) => ({
  "@type":"FAQPage",
  mainEntity:items.map((item) => ({ "@type":"Question", name:item.q, acceptedAnswer:{ "@type":"Answer", text:item.a } })),
});

export const webPageSchema = (path: string, name: string, description: string, lang: Lang) => ({
  "@type":"WebPage", "@id":`${absolute(path)}#webpage`, url:absolute(path), name, description,
  inLanguage:lang, isPartOf:{ "@id":`${origin}/#website` },
});

export const serviceSchema = (service: Service, copy: SeoCopy, path: string, lang: Lang, location?: Location) => {
  const name = lang === "ar" ? service.ar : service.en;
  const description = lang === "ar" ? copy.arIntro : copy.enIntro;
  return {
    "@type":"Service", "@id":`${absolute(path)}#service`, name:location ? `${name} — ${location[lang]}` : name,
    serviceType:name, description, url:absolute(path), provider:{ "@id":`${origin}/#organization` },
    areaServed:location ? { "@type":"City", name:location.en, containedInPlace:{ "@type":"Country", name:location.country } } : ["TR","SA","AE","DE"],
    audience:{ "@type":"BusinessAudience", audienceType:lang === "ar" ? "الشركات والعلامات التجارية" : "Businesses and brands" },
    serviceOutput:(lang === "ar" ? copy.arDeliverables : copy.enDeliverables).map((name) => ({ "@type":"Thing", name })),
  };
};

export const itemListSchema = (items: { name: string; href: string }[], name: string) => ({
  "@type":"ItemList", name, numberOfItems:items.length,
  itemListElement:items.map((item, index) => ({ "@type":"ListItem", position:index + 1, name:item.name, url:absolute(item.href) })),
});
