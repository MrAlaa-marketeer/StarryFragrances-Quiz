import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, Menu, RotateCcw, MessageCircle, Instagram, Facebook, Music2, Share2, SlidersHorizontal, Sparkles } from "lucide-react";
import "./styles.css";
import "./landing.css";
import "./quiz-enhancements.css";
import { products, questions, TRAITS, quizFit, productCopy } from "./data/products";

const ASSET_BASE = "/images/";
const WHATSAPP_NUMBER = "201207207794";
const INSTAGRAM_PROFILE = "https://www.instagram.com/starryfragrances/";
const asset = (name) => name ? `${ASSET_BASE}${name}` : "";
const labels = {
  en: { back:"Back", next:"Next", reveal:"Reveal My Scent", analyzing:"YOUR STARRY PROFILE IS READY", reading:"Reading your scent profile...", finding:"Finding the fragrance that feels like you.", match:"YOUR STARRY SIGNATURE", discover:"DISCOVER YOUR SCENT", why:"WHY THIS IS YOUR MATCH", profile:"YOUR SCENT PROFILE", bestFor:"BEST FOR", second:"ALSO IN YOUR ORBIT", share:"SHARE MY RESULT", retake:"TAKE THE QUIZ AGAIN", copied:"Result card downloaded", matchLabel:"ANSWER FIT", order:"ORDER ON WHATSAPP", orderInstagram:"ORDER ON INSTAGRAM", size:"50ml", offer:"10% OFF", priceUnit:"EGP", explore:"EXPLORE THE FRAGRANCE", question:"QUESTION", of:"OF", language:"Choose language", policyLink:"Return & Exchange Policy", shop:"SHOP FRAGRANCES", quiz:"TAKE THE SCENT QUIZ", shopTitle:"THE FRAGRANCE COLLECTION", shopIntro:"Find the scent that feels like you.", sort:"SORT BY", featured:"Featured", priceLow:"Price: Low to high", priceHigh:"Price: High to low", nameSort:"Name: A to Z", notSure:"NOT SURE WHICH SCENT IS YOURS?", findScent:"FIND YOUR SCENT", description:"THE STORY", mayLike:"YOU MAY ALSO LIKE", viewDetails:"VIEW DETAILS", continueShopping:"Continue shopping", compare:"COMPARE", added:"ADDED", compareOneMore:"Choose one more scent to compare", compareNow:"COMPARE TWO SCENTS", compareTitle:"Compare fragrances", close:"Close", compareSize:"SIZE", comparePrice:"PRICE", compareScent:"SCENT PROFILE", compareNotes:"MAIN ACCORDS" },
  ar: { back:"السابق", next:"التالي", reveal:"اكتشف عطرك", analyzing:"ملفك العطري من STARRY جاهز", reading:"نقرأ ذوقك في العطور...", finding:"نبحث عن العطر الأقرب لشخصيتك.", match:"توقيعك العطري من STARRY", discover:"اكتشف عطرك", why:"لماذا يناسبك هذا العطر؟", profile:"ملفك العطري", bestFor:"الأنسب لـ", second:"عطر آخر قريب من ذوقك", share:"شارك نتيجتي", retake:"أعد الاختبار", copied:"تم تنزيل بطاقة النتيجة", matchLabel:"توافق إجاباتك", order:"اطلب عبر واتساب", orderInstagram:"اطلب عبر إنستجرام", size:"50ml", offer:"خصم 10٪", priceUnit:"ج.م", explore:"اكتشف تفاصيل العطر", question:"السؤال", of:"من", language:"اختر اللغة", policyLink:"سياسة الاستبدال والاسترجاع", shop:"تسوق العطور", quiz:"اكتشف عطرك بالاختبار", shopTitle:"مجموعة العطور", shopIntro:"اختار العطر الأقرب لذوقك.", sort:"ترتيب حسب", featured:"الأكثر تميزًا", priceLow:"السعر: من الأقل للأعلى", priceHigh:"السعر: من الأعلى للأقل", nameSort:"الاسم: أ إلى ي", notSure:"مش عارف أنهي عطر يناسبك؟", findScent:"اكتشف عطرك", description:"حكاية العطر", mayLike:"قد يعجبك أيضًا", viewDetails:"اكتشف التفاصيل", continueShopping:"تابع التسوق", compare:"قارن", added:"تمت الإضافة", compareOneMore:"اختار عطر كمان للمقارنة", compareNow:"قارن بين العطرين", compareTitle:"مقارنة العطور", close:"إغلاق", compareSize:"الحجم", comparePrice:"السعر", compareScent:"طابع العطر", compareNotes:"أبرز الروائح" }
};
const occasionByAnswer = { a:"everyday", b:"work", c:"date", d:"social" };
const OPTION_ORDER_STORAGE = "starry-quiz-option-order";

function readAnswers() {
  try {
    const saved = JSON.parse(sessionStorage.getItem("starry-quiz-answers") || "[]");
    return Array.isArray(saved) ? saved.slice(0, questions.length) : [];
  } catch { return []; }
}

function readStep() {
  try {
    const saved = Number(sessionStorage.getItem("starry-quiz-step") || 0);
    return Number.isInteger(saved) && saved >= 0 && saved < questions.length ? saved : 0;
  } catch { return 0; }
}

function writeSessionValue(key, value) {
  try { sessionStorage.setItem(key, value); } catch { /* Keep the quiz usable when browser storage is unavailable. */ }
}

function removeSessionValue(key) {
  try { sessionStorage.removeItem(key); } catch { /* Retaking still works for the current page session. */ }
}

function shuffleOptions(options) {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function makeOptionOrders() {
  let previous = {};
  try {
    const saved = JSON.parse(sessionStorage.getItem(OPTION_ORDER_STORAGE) || "{}");
    if (saved && typeof saved === "object" && !Array.isArray(saved)) previous = saved;
  } catch { /* Start with a fresh order when storage is unavailable. */ }
  const current = {};
  const orders = questions.map((question) => {
    const previousOrder = Array.isArray(previous[question.id]) ? previous[question.id].join(",") : null;
    let shuffled = shuffleOptions(question.options);
    let attempts = 0;
    while (previousOrder === shuffled.map((option) => option.id).join(",") && attempts < 8) {
      shuffled = shuffleOptions(question.options);
      attempts += 1;
    }
    if (previousOrder === shuffled.map((option) => option.id).join(",")) shuffled = [...shuffled.slice(1), shuffled[0]];
    current[question.id] = shuffled.map((option) => option.id);
    return shuffled;
  });
  writeSessionValue(OPTION_ORDER_STORAGE, JSON.stringify(current));
  return orders;
}

function ResponsiveImage({ name, alt, priority = false, sizes = "(max-width: 700px) 100vw, 382px" }) {
  const base = name.replace(/-960\.webp$/, "").replace(/\.png$/, "");
  const widths = base.includes("spicy-vanilla") ? [480, 960] : [480, 960, 1600];
  const srcSet = widths.map((width) => `${asset(`${base}-${width}.webp`)} ${width}w`).join(", ");
  const src = asset(`${base}-${priority ? "1600" : "960"}.webp`);
  return <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async"/>;
}

function scoreProducts(answers) {
  const occasion = occasionByAnswer[answers[0]?.id];
  const candidates = products.filter((product) => product.bestForKeys?.includes(occasion));
  const eligibleProducts = candidates.length ? candidates : products;
  const scoredQuestions = questions.slice(1);
  const totalWeight = scoredQuestions.reduce((sum, question) => sum + question.weight, 0);
  return eligibleProducts.map((product) => {
    const fit = quizFit[product.id];
    let weightedFit = 0;
    let tieBreak = 0;
    scoredQuestions.forEach((question, offset) => {
      const questionIndex = offset + 1;
      const answer = answers[questionIndex];
      const optionIndex = question.options.findIndex((option) => option.id === answer?.id);
      if (optionIndex < 0) return;
      const value = fit[questionIndex][optionIndex];
      weightedFit += (value / 5) * question.weight;
      if (question.id === "q4") tieBreak += value * 0.7;
      if (question.id === "q10") tieBreak += value * 0.3;
    });
    const score = weightedFit / totalWeight;
    return { ...product, score, match: Math.round(score * 100), tieBreak };
}).sort((a, b) => (b.score - a.score) || (b.tieBreak - a.tieBreak) || a.id.localeCompare(b.id));
}

function Header({ back, onBack, onGallery, lang = "en" }) {
  return <header className="header" dir="ltr">
    {back ? <button className="icon-btn" onClick={onBack} aria-label={labels[lang].back}><ArrowLeft size={19}/></button> : <div className="header-spacer"/>}
    <a className="logo" href="https://starry-fragrances-quiz.vercel.app/" aria-label="STARRY quiz home">STARRY</a>
    <button className="icon-btn" onClick={onGallery} aria-label={lang === "ar" ? "استكشف كل العطور" : "Explore all fragrances"}><Menu size={20}/></button>
  </header>;
}

function PrimaryButton({ children, onClick, lang = "en" }) {
  return <button className="primary-btn" onClick={onClick}>{children}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={16}/></button>;
}

function Price({ product, lang, compact = false }) {
  const copy = labels[lang];
  const discount = Math.max(0, Math.round((1 - product.offerPrice / product.listPrice) * 100));
  return <div className={`price-block${compact ? " compact" : ""}`} aria-label={`${product.size}, ${product.offerPrice} ${copy.priceUnit}`}>
    <div className="price-meta"><span>{product.size}</span>{discount > 0 && <span className="offer-badge">{lang === "ar" ? `خصم ${discount}٪` : `${discount}% OFF`}</span>}</div>
    <div className="price-values">{discount > 0 && <span className="old-price">{product.listPrice} <small>{copy.priceUnit}</small></span>}<strong>{product.offerPrice} <small>{copy.priceUnit}</small></strong></div>
  </div>;
}

function SocialLinks({ lang = "en", onPolicy }) {
  const links = [
    { name:"Instagram", url:"https://www.instagram.com/starryfragrances/", Icon:Instagram },
    { name:"Facebook", url:"https://www.facebook.com/starryfragrances", Icon:Facebook },
    { name:"TikTok", url:"https://www.tiktok.com/@starryfragrances", Icon:Music2 }
  ];
  return <div className="landing-footer-links"><nav className="social-links" aria-label="Follow STARRY">
    {links.map(({name,url,Icon}) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`STARRY on ${name}`}><Icon size={15} aria-hidden="true"/><span>{name}</span></a>)}
  </nav><a className="policy-link" href="/return-exchange-policy" onClick={onPolicy ? (event) => { event.preventDefault(); onPolicy(); } : undefined}>{lang === "ar" ? <ArrowLeft size={13} aria-hidden="true"/> : <ArrowRight size={13} aria-hidden="true"/>}<span>{labels[lang].policyLink}</span></a></div>;
}

function Landing({ onStart, onGallery, onPolicy, lang, setLang }) {
  return <main className="screen landing" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header onGallery={onGallery}/>
    <div className="landing-language"><LanguageToggle lang={lang} onChange={setLang}/></div>
    <div className="landing-art" aria-hidden="true"><ResponsiveImage name={products[0].resultImage} alt="" priority sizes="100vw"/><span className="landing-star landing-star-one">✦</span><span className="landing-star landing-star-two">✧</span></div>
    <div className="landing-copy"><div className="landing-kicker"><span/> {lang === "ar" ? "عالم STARRY للعطور" : "THE STARRY SCENT EDIT"}</div><h1>{lang === "ar" ? <><span>اختار عطرك</span><span>المميز</span></> : <><span>YOUR NEXT</span><span>SIGNATURE SCENT</span></>}</h1><p>{lang === "ar" ? "اكتشف مجموعتنا أو دع الاختبار يختار عطرك الأقرب إليك." : "Explore the collection or let our quiz find the scent that feels like you."}</p><PrimaryButton onClick={onGallery} lang={lang}>{labels[lang].shop}</PrimaryButton><a className="quiz-link" href="/quiz" onClick={(event) => { event.preventDefault(); onStart(); }}>{labels[lang].quiz}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></a></div>
    <div className="landing-note"><span>STARRY</span><i/> {lang === "ar" ? "عطرك. حكايتك." : "YOUR SCENT. YOUR STORY."}</div>
    <SocialLinks lang={lang} onPolicy={onPolicy}/>
  </main>;
}

function LanguageToggle({ lang, onChange }) {
  return <div className="language-row" dir="ltr"><span className="language-label">{labels[lang].language}</span><div className="language-toggle" role="group" aria-label="Choose language">
    <button type="button" className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => onChange("en")}>EN</button>
    <button type="button" className={lang === "ar" ? "active" : ""} aria-pressed={lang === "ar"} onClick={() => onChange("ar")}>AR</button>
  </div></div>;
}

function Quiz({ onFinish, onExit, onGallery, lang, setLang, step, setStep, answers, setAnswers }) {
  const q = questions[step];
  const [optionOrders] = useState(makeOptionOrders);
  const advancing = React.useRef(false);
  const advanceTimer = React.useRef(null);
  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);
  function choose(option) {
    if (advancing.current) return;
    const nextAnswers = [...answers]; nextAnswers[step] = option; setAnswers(nextAnswers);
    advancing.current = true;
    advanceTimer.current = window.setTimeout(() => {
      advancing.current = false;
      if (step === questions.length - 1) onFinish(nextAnswers);
      else setStep(step + 1);
    }, 320);
  }
  function back() {
    if (advancing.current) return;
    if (step > 0) setStep(step - 1); else onExit();
  }
  return <main className="screen" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header back={step > 0} onBack={back} onGallery={onGallery} lang={lang}/>
    <div className="quiz-wrap">
      <LanguageToggle lang={lang} onChange={setLang}/>
      <div className="progress-row"><span className="progress-title">{labels[lang].discover}</span><div className="star-progress" role="progressbar" aria-label={labels[lang].discover} aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={step + 1} aria-valuetext={`${step + 1} ${labels[lang].of} ${questions.length}`}>{questions.map((question, index) => <span key={question.id} className={index <= step ? "lit" : ""} aria-hidden="true">{index <= step ? "✦" : "·"}</span>)}</div><span className="progress-count">{String(step + 1).padStart(2,"0")}<i>/</i>{String(questions.length).padStart(2,"0")}</span></div>
      <div className="question-stage" key={q.id}><h2>{q.title[lang]}</h2>
      <div className="options">{optionOrders[step].map((option) => {
        const selected = answers[step]?.id === option.id;
        return <button key={option.id} className={`option ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => choose(option)}><span>{option.label[lang]}</span></button>;
      })}</div></div>
      <div className="bottom-nav"><button className="back-text" onClick={back}>{lang === "ar" ? <ArrowRight size={15}/> : <ArrowLeft size={15}/>} {labels[lang].back}</button><span className="auto-next">{lang === "ar" ? "اختر إجابة للمتابعة" : "Choose an answer to continue"}</span></div>
    </div>
  </main>;
}

function Analyzing({ lang, onBack }) {
  const copy = labels[lang];
  return <main className="screen analyzing" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back onBack={onBack} lang={lang}/><div className="analysis-symbol">✦</div><h2>{lang === "ar" ? copy.analyzing : <>ANALYZING<br/>YOUR PREFERENCES</>}</h2><p>{copy.reading}<br/>{copy.finding}</p><div className="loader"><span/></div></main>;
}

const traitArabic = { fresh:"منعش",fruity:"فاكهي",floral:"زهري",sweet:"حلو",vanilla:"فانيليا",woody:"خشبي",amber:"عنبر",spicy:"متبّل",creamy:"كريمي",powdery:"بودري",dark:"داكن",sensual:"حسي",elegant:"أنيق",mysterious:"غامض",playful:"مرح",energetic:"حيوي",warm:"دافئ",clean:"نظيف",luxurious:"فاخر",bold:"جريء" };
function DNA({ product, lang }) {
  const visible = [...product.core, ...TRAITS.filter((trait) => product.dna[trait] >= 4)].filter((value,index,array) => array.indexOf(value) === index).slice(0,4);
  return <div className="dna-bars">{visible.map((trait) => <div className="dna-row" key={trait}><span>{lang === "ar" ? traitArabic[trait] : trait.replace("woody","WOODY").toUpperCase()}</span><div><i style={{width:`${(product.dna[trait] / 5) * 100}%`}}/></div></div>)}</div>;
}

function traceRoundedRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, width, height, radius);
  else ctx.rect(x, y, width, height);
}

function ShareButton({ product, lang }) {
  const copy = labels[lang];
  async function share() {
    const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const localized = lang === "ar" ? productCopy[product.id] : product;
    const background = ctx.createLinearGradient(0, 0, 1080, 1350);
    background.addColorStop(0, "#111d2a"); background.addColorStop(.56, "#07111b"); background.addColorStop(1, "#03070c");
    ctx.fillStyle = background; ctx.fillRect(0, 0, 1080, 1350);
    ctx.strokeStyle = "rgba(222,177,105,.56)"; ctx.lineWidth = 2; ctx.strokeRect(34, 34, 1012, 1282);
    ctx.strokeStyle = "rgba(222,177,105,.2)"; ctx.lineWidth = 1; ctx.strokeRect(47, 47, 986, 1256);
    ctx.textAlign = "center"; ctx.direction = lang === "ar" ? "rtl" : "ltr";
    ctx.fillStyle = "#dfb56f"; ctx.font = "38px Georgia,serif"; ctx.fillText("✦  STARRY  ✦", 540, 112);
    ctx.fillStyle = "#bdad91"; ctx.font = "19px Arial,sans-serif"; ctx.fillText(lang === "ar" ? "توقيعك العطري" : "YOUR STARRY SIGNATURE", 540, 166);
    let nameSize = 67; ctx.font = `bold ${nameSize}px Georgia,serif`;
    while (ctx.measureText(product.name).width > 900 && nameSize > 42) { nameSize -= 2; ctx.font = `bold ${nameSize}px Georgia,serif`; }
    ctx.fillStyle = "#f7edda"; ctx.fillText(product.name, 540, 245);
    ctx.save(); ctx.beginPath(); traceRoundedRect(ctx, 104, 286, 872, 622, 24); ctx.clip();
    const artwork = new Image(); artwork.crossOrigin = "anonymous"; artwork.src = asset(product.resultImage);
    try {
      await artwork.decode();
      const scale = Math.max(872 / artwork.naturalWidth, 622 / artwork.naturalHeight);
      const drawWidth = artwork.naturalWidth * scale; const drawHeight = artwork.naturalHeight * scale;
      ctx.drawImage(artwork, 104 + (872 - drawWidth) / 2, 286 + (622 - drawHeight) / 2, drawWidth, drawHeight);
    } catch { ctx.fillStyle = "#101b28"; ctx.fillRect(104, 286, 872, 622); }
    const imageShade = ctx.createLinearGradient(0, 650, 0, 908);
    imageShade.addColorStop(0, "rgba(4,8,13,0)"); imageShade.addColorStop(1, "rgba(4,8,13,.62)");
    ctx.fillStyle = imageShade; ctx.fillRect(104, 286, 872, 622); ctx.restore();
    ctx.strokeStyle = "rgba(222,177,105,.72)"; ctx.lineWidth = 2; ctx.beginPath(); traceRoundedRect(ctx, 104, 286, 872, 622, 24); ctx.stroke();
    ctx.fillStyle = "#efe2cb"; ctx.font = "26px Arial,sans-serif"; ctx.fillText(localized.positioning, 540, 973, 900);
    ctx.fillStyle = "#07111b"; ctx.strokeStyle = "#d9ae69"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(382, 1014, 316, 142, 20); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#e6bd78"; ctx.font = "bold 72px Georgia,serif"; ctx.fillText(`${product.match}%`, 540, 1090);
    ctx.fillStyle = "#ddd0b8"; ctx.font = "16px Arial,sans-serif"; ctx.fillText(copy.matchLabel.toUpperCase(), 540, 1129);
    const traits = product.core.slice(0, 3).map((trait) => lang === "ar" ? traitArabic[trait] : trait.toUpperCase());
    ctx.font = "17px Arial,sans-serif";
    const totalWidth = traits.reduce((total, trait) => total + Math.max(126, ctx.measureText(trait).width + 38), 0) + (traits.length - 1) * 14;
    let tagX = (1080 - totalWidth) / 2;
    traits.forEach((trait) => {
      ctx.font = "17px Arial,sans-serif"; const chipWidth = Math.max(126, ctx.measureText(trait).width + 38);
      ctx.fillStyle = "rgba(222,177,105,.08)"; ctx.strokeStyle = "rgba(222,177,105,.42)"; ctx.lineWidth = 1;
      ctx.beginPath(); traceRoundedRect(ctx, tagX, 1190, chipWidth, 42, 21); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#e3d2b3"; ctx.fillText(trait, tagX + chipWidth / 2, 1217, chipWidth - 12); tagX += chipWidth + 14;
    });
    ctx.fillStyle = "#aa9a7e"; ctx.font = "17px Georgia,serif"; ctx.fillText(lang === "ar" ? "عطر يشبهك" : "A fragrance that feels like you", 540, 1281);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    const file = new File([blob], "my-starry-signature.png", { type: "image/png" });
    try {
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: `My STARRY match: ${product.name}`, files: [file] });
        return;
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = file.name; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <button className="share-btn" onClick={share}><Share2 size={16}/>{copy.share}</button>;
}

function matchedAnswers(product, answers, lang) {
  return questions.slice(1, 9).map((question, offset) => {
    const questionIndex = offset + 1;
    const optionIndex = question.options.findIndex((option) => option.id === answers[questionIndex]?.id);
    if (optionIndex < 0) return null;
    return { label: question.options[optionIndex].label[lang], fit: quizFit[product.id][questionIndex][optionIndex], weight: question.weight };
  }).filter((item) => item && item.fit >= 4)
    .sort((a, b) => b.fit * b.weight - a.fit * a.weight)
    .slice(0, 3)
    .map((item) => item.label);
}

function MatchCard({ product, secondary, answers, onOpen, onOpenSecondary, onGallery, onRetake, lang }) {
  const copy = labels[lang];
  const localized = lang === "ar" ? productCopy[product.id] : product;
  const message = lang === "ar" ? `مرحبًا، أرغب في طلب عطر ${product.name} حجم ${product.size} بسعر العرض ${product.offerPrice} جنيه من STARRY.` : `I want to order ${product.name} (${product.size}) at the offer price of EGP ${product.offerPrice} from STARRY.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return <main className="screen result" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header onGallery={onGallery} lang={lang}/>
    <div className="result-top"><span>{copy.match}</span><h1 dir="ltr">{product.name}</h1><p>{localized.positioning}</p></div>
    <div className="product-stage result-art"><ResponsiveImage name={product.resultImage} alt={product.name}/><div className="match-badge">{product.match}%<small>{copy.matchLabel}</small></div></div>
    <div className="result-copy"><h3>{copy.why}</h3><p>{localized.description}</p><p className="match-reasons">{matchedAnswers(product, answers, lang).join(" · ")}</p><h3 className="profile-title">{copy.profile}</h3><DNA product={product} lang={lang}/></div>
    <section className="best-for"><h3>{copy.bestFor}</h3><div className="occasion-chips">{product.bestFor[lang].map((item) => <span key={item}>{item}</span>)}</div></section>
    {secondary && <button type="button" className="secondary-match" onClick={onOpenSecondary} aria-label={lang === "ar" ? `عرض تفاصيل عطر ${secondary.name}` : `View details for ${secondary.name}`}><span>{copy.second}</span><strong>{secondary.name}</strong><b>{secondary.match}% <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={14}/></b></button>}
    <section className="purchase-panel result-purchase"><Price product={product} lang={lang}/><div className="order-actions"><a className="whatsapp-btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>{copy.order}</a><a className="instagram-btn" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer"><Instagram size={17}/>{copy.orderInstagram}</a></div></section>
    <button className="explore-btn" onClick={onOpen}>{copy.explore} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={14}/></button>
    <ShareButton product={product} lang={lang}/><button className="retake-btn" onClick={onRetake}><RotateCcw size={14}/>{copy.retake}</button>
  </main>;
}

function dnaSimilarity(first, second) {
  const traits = new Set([...Object.keys(first.dna), ...Object.keys(second.dna)]);
  const distance = [...traits].reduce((sum, trait) => sum + Math.abs((first.dna[trait] || 0) - (second.dna[trait] || 0)), 0);
  return 1 - distance / (traits.size * 5);
}

const accordArabic = { Fruity:"فاكهي", Fresh:"منعش", Sweet:"حلو", Musky:"مسكي", Floral:"زهري", Amber:"عنبر", Creamy:"كريمي", Clean:"نظيف", Vanilla:"فانيليا", Spicy:"متبّل", Warm:"دافئ", Suede:"جلد شامواه", Green:"أخضر", Citrus:"حمضيات" };

function Details({ product, onBack, onGallery, onOpen, lang }) {
  const copy = labels[lang];
  const message = lang === "ar" ? `مرحبًا، أرغب في طلب عطر ${product.name} حجم ${product.size} بسعر العرض ${product.offerPrice} جنيه من STARRY.` : `I want to order ${product.name} (${product.size}) at the offer price of EGP ${product.offerPrice} from STARRY.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const localized = lang === "ar" ? productCopy[product.id] : product;
  const similar = products.filter((item) => item.id !== product.id).sort((a,b) => dnaSimilarity(product,b) - dnaSimilarity(product,a)).slice(0,2);
  return <main className="screen details" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back onBack={onBack} onGallery={onGallery} lang={lang}/><div className="details-bottle detail-art"><ResponsiveImage name={product.resultImage} alt={product.name}/></div><h1 dir="ltr">{product.name}</h1><p className="product-positioning">{localized.positioning}</p>
    <section className="purchase-panel"><Price product={product} lang={lang}/><div className="order-actions"><a className="whatsapp-btn" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>{copy.order}</a><a className="instagram-btn" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer"><Instagram size={17}/>{copy.orderInstagram}</a></div><a className="product-policy-link" href="/return-exchange-policy">{copy.policyLink}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={13}/></a></section>
    <a className="mobile-order-dock" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><span className="mobile-order-price"><small>{product.size}</small><strong>{product.offerPrice} <i>{copy.priceUnit}</i></strong></span><span className="mobile-order-cta"><MessageCircle size={17}/>{copy.order}</span></a>
    <section className="product-description"><h2>{copy.description}</h2><p>{localized.description}</p></section>
    <section className="accords"><h3>{lang === "ar" ? "الروائح الأساسية" : "MAIN ACCORDS"}</h3>{product.accords.map((a) => <div className="accord" key={a.name}><span>{a.name}</span><div><i style={{width:`${a.level}%`}}/></div></div>)}</section>
    <section><h3 className="section-title">{lang === "ar" ? "مكونات العطر" : "FRAGRANCE NOTES"}</h3><div className="notes-grid">{Object.entries(product.notes).map(([type,list]) => <div className="note-card" key={type}><small>{lang === "ar" ? ({"Top Notes":"مقدمة العطر","Heart Notes":"قلب العطر","Base Notes":"قاعدة العطر"}[type] || type) : type}</small><strong>{list.join(" · ")}</strong></div>)}</div></section>
    <section className="similar-section"><h2>{copy.mayLike}</h2><div className="similar-grid">{similar.map((item) => <button type="button" className="similar-card" key={item.id} onClick={() => onOpen(item)}><span className="similar-art"><ResponsiveImage name={item.resultImage} alt="" sizes="(max-width: 700px) 42vw, 220px"/></span><strong dir="ltr">{item.name}</strong><span className="similar-price">{item.offerPrice} {copy.priceUnit}</span></button>)}</div></section>
  </main>;
}

function Gallery({ onAgain, onBack, onGallery, onOpen, lang }) {
  const [sort, setSort] = useState("featured");
  const [compareIds, setCompareIds] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const compareRef = React.useRef(null);
  const copy = labels[lang];
  const sortedProducts = [...products].sort((a,b) => sort === "price-low" ? a.offerPrice-b.offerPrice : sort === "price-high" ? b.offerPrice-a.offerPrice : sort === "name" ? a.name.localeCompare(b.name) : products.indexOf(a)-products.indexOf(b));
  const compareProducts = compareIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  useEffect(() => { if (showComparison) compareRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }); }, [showComparison]);
  function toggleCompare(productId) {
    setCompareIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : current.length < 2 ? [...current, productId] : current);
    setShowComparison(false);
  }
  return <main className={`screen gallery${compareIds.length ? " has-compare" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back onBack={onBack} onGallery={onGallery} lang={lang}/><div className="shop-heading"><span className="shop-kicker">✦ STARRY FRAGRANCE HOUSE ✦</span><h1>{copy.shopTitle}</h1><p>{copy.shopIntro}</p></div><label className="sort-control"><span><SlidersHorizontal size={15}/>{copy.sort}</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label={copy.sort}><option value="featured">{copy.featured}</option><option value="price-low">{copy.priceLow}</option><option value="price-high">{copy.priceHigh}</option><option value="name">{copy.nameSort}</option></select></label>
    <div className="product-grid">{sortedProducts.map((product) => { const isCompared = compareIds.includes(product.id); return <article key={product.id} className={`mini-product${isCompared ? " is-compared" : ""}`}><button type="button" className="mini-product-open" onClick={() => onOpen(product)} aria-label={`${product.name}, ${product.size}, ${product.offerPrice} ${copy.priceUnit}`}><span className="mini-bottle"><ResponsiveImage name={product.resultImage} alt="" sizes="(max-width: 600px) 44vw, 260px"/></span><span className="mini-name" dir="ltr">{product.name}</span><Price product={product} lang={lang} compact/><span className="card-detail-link">{copy.viewDetails} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={12}/></span></button><button type="button" className="compare-pick" aria-pressed={isCompared} disabled={compareIds.length === 2 && !isCompared} onClick={() => toggleCompare(product.id)}>{isCompared ? copy.added : copy.compare}</button></article>; })}</div>
    {compareIds.length > 0 && <div className="compare-dock"><span>{compareIds.length === 1 ? copy.compareOneMore : copy.compareNow}</span><button type="button" disabled={compareIds.length < 2} onClick={() => setShowComparison((value) => !value)}>{showComparison ? copy.close : compareIds.length === 1 ? `${compareIds.length}/2` : copy.compareNow}</button></div>}
    {showComparison && compareProducts.length === 2 && <section className="compare-panel" ref={compareRef} aria-labelledby="compare-title"><header className="compare-header"><h2 id="compare-title">{copy.compareTitle}</h2><button type="button" onClick={() => setShowComparison(false)}>{copy.close}</button></header><div className="compare-heads"><span aria-hidden="true"/>{compareProducts.map((product) => <div className="compare-product-head" key={product.id}><ResponsiveImage name={product.resultImage} alt="" sizes="(max-width: 600px) 30vw, 180px"/><strong dir="ltr">{product.name}</strong></div>)}</div><div className="compare-row"><span>{copy.compareSize}</span>{compareProducts.map((product) => <b key={product.id}>{product.size}</b>)}</div><div className="compare-row"><span>{copy.comparePrice}</span>{compareProducts.map((product) => <b className="compare-price" key={product.id}>{product.offerPrice} <small>{copy.priceUnit}</small>{product.listPrice > product.offerPrice && <del>{product.listPrice} {copy.priceUnit}</del>}</b>)}</div><div className="compare-row"><span>{copy.compareScent}</span>{compareProducts.map((product) => <b key={product.id}>{(lang === "ar" ? productCopy[product.id]?.positioning : product.positioning) || product.positioning}</b>)}</div><div className="compare-row"><span>{copy.compareNotes}</span>{compareProducts.map((product) => <b key={product.id}>{product.accords.slice(0,3).map((accord) => lang === "ar" ? (accordArabic[accord.name] || accord.name) : accord.name).join(" · ")}</b>)}</div><div className="compare-actions">{compareProducts.map((product) => <button type="button" key={product.id} onClick={() => onOpen(product)}>{copy.viewDetails}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={13}/></button>)}</div></section>}
    <section className="shop-quiz-cta"><Sparkles size={19}/><h2>{copy.notSure}</h2><a href="/quiz" onClick={(event) => {event.preventDefault();onAgain();}}>{copy.findScent}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></a></section><SocialLinks lang={lang}/><div className="footer-brand">STARRY<br/><small>FRAGRANCE HOUSE</small></div></main>;
}

const policyCopy = {
  en: {
    title: "Return & Exchange Policy",
    introStart: "For your peace of mind, you may request an exchange or return within ",
    days: "7 days",
    introEnd: " of receiving your order.",
    defect: "If your product arrives with any defect—including a faulty atomizer, a damaged bottle, leakage, or any other damage—Starry will cover the full cost of the exchange.",
    exchangeStart: "If you try the fragrance and it is not the right fit for you, you may exchange it for another fragrance, provided no more than ",
    amount: "5 ml",
    exchangeMiddle: " has been used. You will only be responsible for the ",
    shippingCost: "shipping cost.",
    lower: "If the replacement fragrance costs less, you will receive the price difference.",
    higher: "If the replacement fragrance costs more, you will only pay the difference.",
  },
  ar: {
    title: "سياسة الاستبدال والاسترجاع",
    introStart: "حرصًا منّا على رضاك، تقدر تطلب الاستبدال أو الاسترجاع خلال ",
    days: "7 أيام",
    introEnd: " من استلام الطلب.",
    defect: "لو المنتج وصلك فيه أي عيب، سواء في الأوتمايزر، الزجاجة، التسريب أو أي تلف آخر، Starry هتتحمل تكلفة الاستبدال بالكامل.",
    exchangeStart: "لو جربت العطر ومناسبكش، تقدر تستبدله بعطر آخر بشرط ألا يكون المستخدم منه أكثر من ",
    amount: "5 مل",
    exchangeMiddle: "، وتتحمل فقط ",
    shippingCost: "تكلفة الشحن.",
    lower: "لو العطر البديل سعره أقل، هتحصل على فرق السعر.",
    higher: "لو العطر البديل سعره أعلى، هتدفع فرق السعر فقط.",
  },
};

function PolicyPage({ lang, setLang, onBack, onGallery }) {
  const copy = policyCopy[lang];
  return <main className="screen policy-page" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header back onBack={onBack} onGallery={onGallery} lang={lang}/>
    <div className="policy-language"><LanguageToggle lang={lang} onChange={setLang}/></div>
    <article className="policy-content">
      <div className="policy-kicker"><span/> STARRY <span/></div>
      <h1>{copy.title}</h1>
      <div className="policy-rule" aria-hidden="true">✦</div>
      <p className="policy-intro">{copy.introStart}<strong>{copy.days}</strong>{copy.introEnd}</p>
      <ul>
        <li>{copy.defect}</li>
        <li>{copy.exchangeStart}<strong>{copy.amount}</strong>{copy.exchangeMiddle}<strong>{copy.shippingCost}</strong></li>
        <li>{copy.lower}</li>
        <li>{copy.higher}</li>
      </ul>
      <a className="policy-back-link" href="/shop" onClick={(event) => { event.preventDefault(); onBack(); }}>{lang === "ar" ? "العودة إلى المتجر" : "Back to the shop"}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></a>
    </article>
  </main>;
}

function readLanguage() {
  try { return localStorage.getItem("starry-quiz-language") === "ar" ? "ar" : "en"; }
  catch { return "en"; }
}

function screenFromPath(pathname) {
  if (pathname === "/return-exchange-policy") return "policy";
  if (pathname === "/shop") return "gallery";
  if (pathname === "/quiz") return "quiz";
  if (pathname.startsWith("/fragrance/")) return "details";
  return "landing";
}

function App() {
  const [screen, setScreen] = useState(() => screenFromPath(window.location.pathname));
  const [answers, setAnswers] = useState(readAnswers);
  const [step, setStep] = useState(readStep);
  const [selected, setSelected] = useState(null);
  const [detailsReturnScreen, setDetailsReturnScreen] = useState("result");
  const [lang, setLang] = useState(readLanguage);
  const analysisTimer = React.useRef(null);
  const results = useMemo(() => scoreProducts(answers), [answers]);
  useEffect(() => {
    const match = window.location.pathname.match(/^\/fragrance\/([^/]+)$/);
    if (match) setSelected(products.find((product) => product.id === decodeURIComponent(match[1])) || products[0]);
  }, []);
  const openGallery = () => {
    if (window.location.pathname !== "/shop") window.history.pushState({ screen: "gallery" }, "", "/shop");
    setScreen("gallery");
  };
  function openPolicy() { window.history.pushState({ screen: "policy" }, "", "/return-exchange-policy"); setScreen("policy"); }
  function backFromPolicy() { window.history.replaceState({ screen: "gallery" }, "", "/shop"); setScreen("gallery"); }
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, [lang]);
  useEffect(() => { try { localStorage.setItem("starry-quiz-language", lang); } catch { /* Keep language selection for the current visit. */ } }, [lang]);
  useEffect(() => {
    function syncRoute() {
      const nextScreen = screenFromPath(window.location.pathname);
      setScreen(nextScreen);
      if (nextScreen === "details") {
        const id = decodeURIComponent(window.location.pathname.split("/").pop() || "");
        setSelected(products.find((product) => product.id === id) || products[0]);
      }
    }
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);
  useEffect(() => {
    const isPolicy = screen === "policy";
    const isShop = screen === "gallery";
    const isDetails = screen === "details";
    document.title = isPolicy ? `${policyCopy[lang].title} | STARRY` : isShop ? `${labels[lang].shopTitle} | STARRY` : isDetails ? `${selected?.name || "Fragrance"} | STARRY` : "STARRY — Find Your Signature Scent";
  }, [screen, lang, selected]);
  function openDetails(product, returnScreen = "gallery") {
    setSelected(product);
    setDetailsReturnScreen(returnScreen);
    window.history.pushState({ screen: "details", productId: product.id }, "", `/fragrance/${product.id}`);
    setScreen("details");
  }
  useEffect(() => { writeSessionValue("starry-quiz-answers", JSON.stringify(answers)); }, [answers]);
  useEffect(() => { writeSessionValue("starry-quiz-step", String(step)); }, [step]);
  useEffect(() => () => window.clearTimeout(analysisTimer.current), []);
  function finish(value) {
    setAnswers(value);
    setScreen("analyzing");
    window.clearTimeout(analysisTimer.current);
    analysisTimer.current = window.setTimeout(() => setScreen("result"), 1100);
  }
  function exitAnalysis() { window.clearTimeout(analysisTimer.current); setScreen("quiz"); }
  function retake() {
    window.clearTimeout(analysisTimer.current);
    if (window.location.pathname !== "/quiz") window.history.pushState({screen:"quiz"},"", "/quiz");
    setAnswers([]); setStep(0); setSelected(null);
    removeSessionValue("starry-quiz-answers"); removeSessionValue("starry-quiz-step");
    setScreen("quiz");
  }
  function startQuiz() {
    const completed = questions.every((_, index) => Boolean(answers[index]?.id));
    if (completed) {
      setAnswers([]); setStep(0); setSelected(null);
      removeSessionValue("starry-quiz-answers"); removeSessionValue("starry-quiz-step");
    }
    if (window.location.pathname !== "/quiz") window.history.pushState({screen:"quiz"},"", "/quiz");
    setScreen("quiz");
  }
  function exitQuiz() {
    if (window.location.pathname !== "/") window.history.pushState({screen:"landing"},"", "/");
    setScreen("landing");
  }
  if (screen === "landing") return <Landing onStart={startQuiz} onGallery={openGallery} lang={lang} setLang={setLang} onPolicy={openPolicy}/>;
  if (screen === "policy") return <PolicyPage lang={lang} setLang={setLang} onBack={backFromPolicy} onGallery={openGallery}/>;
  if (screen === "quiz") return <Quiz onFinish={finish} onExit={exitQuiz} onGallery={openGallery} lang={lang} setLang={setLang} step={step} setStep={setStep} answers={answers} setAnswers={setAnswers}/>;
  if (screen === "analyzing") return <Analyzing lang={lang} onBack={exitAnalysis}/>;
  if (screen === "result") { const product = results[0] || products[0]; const secondary = results[1]; return <MatchCard product={product} secondary={secondary} answers={answers} lang={lang} onRetake={retake} onOpen={() => openDetails(product,"result")} onOpenSecondary={() => {if (secondary) openDetails(secondary,"result");}} onGallery={openGallery}/>; }
  if (screen === "details") return <Details product={selected || products[0]} lang={lang} onBack={() => { if (detailsReturnScreen === "details") { window.history.back(); return; } const path = detailsReturnScreen === "gallery" ? "/shop" : "/quiz"; window.history.replaceState({screen:detailsReturnScreen},"",path); setScreen(detailsReturnScreen); }} onGallery={openGallery} onOpen={(product) => openDetails(product,"details")}/>;
  if (screen === "gallery") return <Gallery lang={lang} onAgain={retake} onBack={() => {window.history.pushState({screen:"landing"},"", "/");setScreen("landing");}} onGallery={openGallery} onOpen={(product) => openDetails(product,"gallery")}/>;
  return null;
}

createRoot(document.getElementById("root")).render(<App/>);
