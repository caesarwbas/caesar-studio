export type Location = {
  slug: string; ar: string; en: string; country: string; countryCode: string;
  currency: string; arMarket: string; enMarket: string;
};

export const locations: Location[] = [
  { slug:"istanbul", ar:"إسطنبول", en:"Istanbul", country:"Türkiye", countryCode:"TR", currency:"TRY", arMarket:"سوق متعدد اللغات يحتاج رسالة واضحة وتجربة سريعة تناسب الشركات المحلية والدولية.", enMarket:"A multilingual market where clear positioning and a fast experience help local and international brands compete." },
  { slug:"riyadh", ar:"الرياض", en:"Riyadh", country:"Saudi Arabia", countryCode:"SA", currency:"SAR", arMarket:"سوق سريع النمو يقدّر الحضور المتميز، المحتوى العربي المتقن، والقياس التجاري الواضح.", enMarket:"A fast-growing market that rewards distinctive brands, excellent Arabic content, and measurable commercial outcomes." },
  { slug:"dubai", ar:"دبي", en:"Dubai", country:"United Arab Emirates", countryCode:"AE", currency:"AED", arMarket:"سوق دولي كثيف المنافسة يحتاج هوية متفردة وتجربة ثنائية اللغة تُحوّل الاهتمام إلى طلبات.", enMarket:"A competitive international market where distinctive identity and bilingual conversion journeys matter." },
  { slug:"berlin", ar:"برلين", en:"Berlin", country:"Germany", countryCode:"DE", currency:"EUR", arMarket:"سوق تقني يقدّر البساطة، الأداء، الخصوصية، والمنتجات الرقمية المبنية بمنطق واضح.", enMarket:"A technology-led market that values clarity, performance, privacy, and thoughtfully engineered products." },
];

export const getLocation = (slug: string) => locations.find((item) => item.slug === slug);
