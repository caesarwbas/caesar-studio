export type SeoCopy = {
  arIntro: string; enIntro: string; arDeliverables: string[]; enDeliverables: string[];
  arOutcomes: string[]; enOutcomes: string[]; arFactors: string[]; enFactors: string[];
  related: string[];
};

export const seoContent: Record<string, SeoCopy> = {
  "website-design": {
    arIntro:"نصمم مواقع تُعرّف القيمة بسرعة، تقود الزائر نحو القرار، وتبقى خفيفة وقابلة للنمو والظهور في البحث.", enIntro:"We design fast, persuasive websites that clarify value, guide decisions, and scale with search demand.",
    arDeliverables:["استراتيجية المحتوى والصفحات","تصميم UX/UI متجاوب","تطوير سريع وتهيئة تقنية للبحث"], enDeliverables:["Page and content strategy","Responsive UX/UI design","Fast development and technical SEO"],
    arOutcomes:["رسالة أوضح","تحويلات أكثر","Core Web Vitals أفضل"], enOutcomes:["Clearer positioning","More conversions","Stronger Core Web Vitals"],
    arFactors:["عدد القوالب والصفحات","تعقيد المحتوى والحركات","التكاملات واللغات"], enFactors:["Templates and page count","Content and motion complexity","Integrations and languages"], related:["seo-growth","visual-identity","web-applications"] },
  "web-applications": {
    arIntro:"نبني تطبيقات ويب موثوقة تجمع سهولة الاستخدام مع بنية تقنية قابلة للصيانة والتوسع.", enIntro:"We build maintainable web applications that balance usability, reliability, and scalable architecture.",
    arDeliverables:["بحث المستخدم وتدفقات العمل","نظام واجهات ومكونات","تطوير واختبارات ونشر"], enDeliverables:["User research and workflows","Interface system and components","Development, testing, and release"],
    arOutcomes:["عمليات أسرع","أخطاء أقل","تجربة قابلة للتوسع"], enOutcomes:["Faster operations","Fewer errors","A scalable experience"],
    arFactors:["الأدوار والصلاحيات","حجم البيانات","التكاملات والأتمتة"], enFactors:["Roles and permissions","Data volume","Integrations and automation"], related:["saas-development","website-design","visual-identity"] },
  "saas-development": {
    arIntro:"نحوّل الفكرة إلى منتج SaaS قابل للاختبار والبيع والتوسع، من منطق المنتج حتى لوحة الإدارة.", enIntro:"We turn concepts into testable, sellable SaaS products, from product logic to administration and growth.",
    arDeliverables:["تعريف MVP وخريطة المنتج","UX/UI ونظام التصميم","تطوير الاشتراكات ولوحات التحكم"], enDeliverables:["MVP definition and roadmap","UX/UI and design system","Subscriptions and dashboards"],
    arOutcomes:["إطلاق أسرع","تعلم مبكر من السوق","قاعدة تقنية للنمو"], enOutcomes:["Faster launch","Earlier market learning","A foundation for growth"],
    arFactors:["نطاق MVP","الفوترة والتكاملات","الأمان والبنية السحابية"], enFactors:["MVP scope","Billing and integrations","Security and cloud architecture"], related:["web-applications","website-design","seo-growth"] },
  "paid-media": {
    arIntro:"ندير الحملات كمنظومة رسائل وإبداع وقياس، لا كشراء نقرات منفصلة عن هدف العمل.", enIntro:"We manage paid media as a system of messaging, creative, measurement, and commercial learning.",
    arDeliverables:["استراتيجية القنوات والجمهور","إبداع ونسخ إعلانية","تتبع وتحسين وتقارير"], enDeliverables:["Channel and audience strategy","Creative and ad copy","Tracking, optimisation, and reporting"],
    arOutcomes:["تكلفة اكتساب أوضح","تعلم إبداعي أسرع","ميزانية أكثر كفاءة"], enOutcomes:["Clearer acquisition cost","Faster creative learning","More efficient spend"],
    arFactors:["عدد القنوات والأسواق","حجم المواد الإبداعية","تعقيد القياس"], enFactors:["Channels and markets","Creative volume","Measurement complexity"], related:["social-media","website-design","seo-growth"] },
  "social-media": {
    arIntro:"نبني حضورًا اجتماعيًا متماسكًا يربط المحتوى بصوت العلامة وأهدافها التجارية.", enIntro:"We build a consistent social presence that connects content, brand voice, and commercial priorities.",
    arDeliverables:["استراتيجية وأعمدة محتوى","تقويم وتصميم وكتابة","نشر وإدارة وقياس"], enDeliverables:["Strategy and content pillars","Calendar, design, and copy","Publishing, management, and measurement"],
    arOutcomes:["هوية أكثر ثباتًا","تفاعل أجود","إنتاج منظم"], enOutcomes:["Stronger consistency","Higher-quality engagement","Organised production"],
    arFactors:["عدد المنصات","وتيرة النشر","التصوير وإدارة المجتمع"], enFactors:["Platform count","Publishing frequency","Production and community management"], related:["paid-media","visual-identity","video-production"] },
  "visual-identity": {
    arIntro:"نصمم نظامًا بصريًا يترجم شخصية العلامة ويجعل كل نقطة تواصل تبدو من عائلة واحدة.", enIntro:"We create visual systems that express brand character and unify every customer touchpoint.",
    arDeliverables:["استراتيجية واتجاه إبداعي","ألوان وخطوط ولغة بصرية","دليل تطبيق وقوالب"], enDeliverables:["Strategy and creative direction","Colour, type, and visual language","Guidelines and templates"],
    arOutcomes:["تميّز أقوى","اتساق أسرع","قرارات تصميم أسهل"], enOutcomes:["Stronger distinction","Faster consistency","Easier design decisions"],
    arFactors:["عمق الاستراتيجية","عدد نقاط التطبيق","نطاق الدليل والقوالب"], enFactors:["Strategic depth","Application count","Guideline and template scope"], related:["logo-design","website-design","social-media"] },
  "logo-design": {
    arIntro:"نصمم علامة أصلية واضحة ومرنة، مبنية على فكرة لا على زخرفة عابرة.", enIntro:"We design original, adaptable marks built around a memorable idea rather than a passing style.",
    arDeliverables:["بحث واتجاهات مفاهيمية","الشعار ونظام نسخه","ملفات وتسليمات الاستخدام"], enDeliverables:["Research and concepts","Logo and responsive variants","Production-ready asset package"],
    arOutcomes:["تذكر أسهل","مرونة عبر المقاسات","أساس لهوية متماسكة"], enOutcomes:["Better recall","Cross-size flexibility","A foundation for identity"],
    arFactors:["البحث والتسمية","عدد الاتجاهات","نطاق النسخ والتطبيقات"], enFactors:["Research and naming","Concept directions","Variants and applications"], related:["visual-identity","website-design","social-media"] },
  "video-production": {
    arIntro:"نحوّل الرسالة إلى قصة مرئية بإيقاع دقيق وصوت وصورة يخدمان الهدف لا الاستعراض.", enIntro:"We turn messages into focused visual stories where rhythm, sound, and image serve the objective.",
    arDeliverables:["فكرة وسيناريو ولوحة مشاهد","مونتاج وصوت وموشن","نسخ مهيأة للمنصات"], enDeliverables:["Concept, script, and storyboard","Editing, sound, and motion","Platform-ready versions"],
    arOutcomes:["انتباه أطول","رسالة أسرع","محتوى قابل لإعادة الاستخدام"], enOutcomes:["Longer attention","Faster understanding","Reusable content assets"],
    arFactors:["مدة المادة الخام","الموشن والمؤثرات","عدد النسخ والمقاسات"], enFactors:["Source footage duration","Motion and effects","Versions and formats"], related:["social-media","paid-media","visual-identity"] },
  "seo-growth": {
    arIntro:"نبني نموًا عضويًا من بنية قابلة للزحف، محتوى يجيب النية، وروابط داخلية توزع الأهمية بوضوح.", enIntro:"We build organic growth through crawlable architecture, intent-led content, and deliberate internal linking.",
    arDeliverables:["تدقيق تقني ودلالي","خريطة موضوعات وصفحات","قياس وتحسين وروابط داخلية"], enDeliverables:["Technical and semantic audit","Topic and page architecture","Measurement, optimisation, and internal links"],
    arOutcomes:["تغطية بحث أوسع","فهرسة أوضح","زيارات عالية النية"], enOutcomes:["Broader search coverage","Clearer indexation","Higher-intent traffic"],
    arFactors:["حجم الموقع والأسواق","المنافسة والمحتوى","الهجرات والمشكلات التقنية"], enFactors:["Site and market size","Competition and content","Migrations and technical debt"], related:["website-design","paid-media","web-applications"] },
};

export const getSeoCopy = (slug: string) => seoContent[slug];
