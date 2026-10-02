import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, Menu, RotateCcw, MessageCircle, Instagram, Facebook, Music2 } from "lucide-react";
import "./styles.css";
import "./landing.css";
import { products, questions, TRAITS, quizFit, productCopy } from "./data/products";

const ASSET_BASE = "/images/";
const WHATSAPP_NUMBER = "201207207794";
const asset = (name) => name ? `${ASSET_BASE}${name}` : "";
// Small offsets counter broad-profile bias in the match matrix; preference evidence stays dominant.
const MATCH_CALIBRATION = { elite:0.032, "starry-amber":-0.028, "tropical-bomb":0.011, perla:-0.005, "fizzy-apple":0.063, "spicy-vanilla":-0.043, "star-boy":0.073, luna:-0.022 };
const labels = {
  en: { back:"Back", next:"Next", reveal:"Reveal My Scent", analyzing:"ANALYZING YOUR PREFERENCES", reading:"Reading your scent profile...", finding:"Finding the fragrance that feels like you.", match:"YOUR STARRY MATCH", why:"WHY IT FEELS LIKE YOU", matchLabel:"MATCH", order:"ORDER ON WHATSAPP", explore:"EXPLORE THE FRAGRANCE", question:"QUESTION", of:"OF", language:"Choose language" },
  ar: { back:"السابق", next:"التالي", reveal:"اكتشف عطرك", analyzing:"نحلل تفضيلاتك", reading:"نقرأ ذوقك في العطور...", finding:"نبحث عن العطر الأقرب لشخصيتك.", match:"العطر الأنسب لك من STARRY", why:"ليه العطر ده شبهك؟", matchLabel:"تطابق", order:"اطلب عبر واتساب", explore:"اكتشف تفاصيل العطر", question:"السؤال", of:"من", language:"اختر اللغة" }
};

function ResponsiveImage({ name, alt, priority = false, sizes = "(max-width: 700px) 100vw, 382px" }) {
  const base = name.replace(/-960\.webp$/, "").replace(/\.png$/, "");
  const widths = base.includes("spicy-vanilla") ? [480, 960] : [480, 960, 1600];
  const srcSet = widths.map((width) => `${asset(`${base}-${width}.webp`)} ${width}w`).join(", ");
  const src = asset(`${base}-${priority ? "1600" : "960"}.webp`);
  return <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async"/>;
}

function scoreProducts(answers) {
  const totalWeight = questions.reduce((sum, question) => sum + question.weight, 0);
  return products.map((product) => {
    const fit = quizFit[product.id];
    let weightedFit = 0;
    let tieBreak = 0;
    answers.forEach((answer, questionIndex) => {
      const question = questions[questionIndex];
      const optionIndex = question.options.findIndex((option) => option.id === answer?.id);
      if (optionIndex < 0) return;
      const value = fit[questionIndex][optionIndex];
      weightedFit += (value / 5) * question.weight;
      if (question.id === "q4") tieBreak += value * 0.7;
      if (question.id === "q10") tieBreak += value * 0.3;
    });
    const score = weightedFit / totalWeight + MATCH_CALIBRATION[product.id];
    return { ...product, score, match: Math.round(70 + score * 26), tieBreak };
  }).sort((a, b) => (b.score - a.score) || (b.tieBreak - a.tieBreak) || a.id.localeCompare(b.id));
}

function Header({ back, onBack, onGallery, lang = "en" }) {
  return <header className="header" dir="ltr">
    {back ? <button className="icon-btn" onClick={onBack} aria-label={labels[lang].back}><ArrowLeft size={19}/></button> : <div className="header-spacer"/>}
    <div className="logo">STARRY</div>
    <button className="icon-btn" onClick={onGallery} aria-label={lang === "ar" ? "استكشف كل العطور" : "Explore all fragrances"}><Menu size={20}/></button>
  </header>;
}

function PrimaryButton({ children, onClick, lang = "en" }) {
  return <button className="primary-btn" onClick={onClick}>{children}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={16}/></button>;
}

function SocialLinks() {
  const links = [
    { name:"Instagram", url:"https://www.instagram.com/starryfragrances/", Icon:Instagram },
    { name:"Facebook", url:"https://www.facebook.com/starryfragrances", Icon:Facebook },
    { name:"TikTok", url:"https://www.tiktok.com/@starryfragrances", Icon:Music2 }
  ];
  return <nav className="social-links" aria-label="Follow STARRY">
    {links.map(({name,url,Icon}) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`STARRY on ${name}`}><Icon size={15} aria-hidden="true"/><span>{name}</span></a>)}
  </nav>;
}

function Landing({ onStart, onGallery }) {
  return <main className="screen landing">
    <Header onGallery={onGallery}/>
    <div className="landing-art" aria-hidden="true"><ResponsiveImage name={products[0].resultImage} alt="" priority sizes="100vw"/><span className="landing-star landing-star-one">✦</span><span className="landing-star landing-star-two">✧</span></div>
    <div className="landing-copy"><div className="landing-kicker"><span/> THE STARRY SCENT EDIT</div><h1><span>FIND YOUR</span><span>SIGNATURE</span><span>SCENT</span></h1><p>A few questions.<br/>One fragrance that feels like you.</p><PrimaryButton onClick={onStart}>START THE JOURNEY</PrimaryButton></div>
    <div className="landing-note"><span>01 — 10</span><i/> A PERSONAL SCENT DISCOVERY</div>
    <SocialLinks/>
  </main>;
}

function LanguageToggle({ lang, onChange }) {
  return <div className="language-row" dir="ltr"><span className="language-label">{labels[lang].language}</span><div className="language-toggle" role="group" aria-label="Choose language">
    <button type="button" className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => onChange("en")}>EN</button>
    <button type="button" className={lang === "ar" ? "active" : ""} aria-pressed={lang === "ar"} onClick={() => onChange("ar")}>AR</button>
  </div></div>;
}

function Quiz({ onFinish, onExit, onGallery, lang, setLang }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const q = questions[step];
  function choose(option) { const next = [...answers]; next[step] = option; setAnswers(next); }
  function back() { if (step > 0) setStep(step - 1); else onExit(); }
  function next() {
    if (!answers[step]) return;
    if (step === questions.length - 1) onFinish(answers);
    else setStep(step + 1);
  }
  return <main className="screen" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header back={step > 0} onBack={back} onGallery={onGallery} lang={lang}/>
    <div className="quiz-wrap">
      <LanguageToggle lang={lang} onChange={setLang}/>
      <div className="progress-row"><div className="progress"><span style={{width: `${((step + 1) / questions.length) * 100}%`}}/></div><span>{lang === "ar" ? `${labels.ar.question} ${String(step + 1).padStart(2,"0")} ${labels.ar.of} ${questions.length}` : `${labels.en.question} ${String(step + 1).padStart(2,"0")} ${labels.en.of} ${questions.length}`}</span></div>
      <h2>{q.title[lang]}</h2>
      <div className="options">{q.options.map((option) => {
        const selected = answers[step]?.id === option.id;
        return <button key={option.id} className={`option ${selected ? "selected" : ""}`} aria-pressed={selected} onClick={() => choose(option)}><span>{option.label[lang]}</span></button>;
      })}</div>
      <div className="bottom-nav"><button className="back-text" onClick={back}>{lang === "ar" ? <ArrowRight size={15}/> : <ArrowLeft size={15}/>} {labels[lang].back}</button><PrimaryButton lang={lang} onClick={next}>{step === questions.length - 1 ? labels[lang].reveal : labels[lang].next}</PrimaryButton></div>
    </div>
  </main>;
}

function Analyzing({ lang }) {
  const copy = labels[lang];
  return <main className="screen analyzing" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back lang={lang}/><div className="analysis-symbol">✦</div><h2>{lang === "ar" ? copy.analyzing : <>ANALYZING<br/>YOUR PREFERENCES</>}</h2><p>{copy.reading}<br/>{copy.finding}</p><div className="loader"><span/></div></main>;
}

const traitArabic = { fresh:"منعش",fruity:"فاكهي",floral:"زهري",sweet:"حلو",vanilla:"فانيليا",woody:"خشبي",amber:"عنبر",spicy:"متبّل",creamy:"كريمي",powdery:"بودري",dark:"داكن",sensual:"حسي",elegant:"أنيق",mysterious:"غامض",playful:"مرح",energetic:"حيوي",warm:"دافئ",clean:"نظيف",luxurious:"فاخر",bold:"جريء" };
function DNA({ product, lang }) {
  const visible = [...product.core, ...TRAITS.filter((trait) => product.dna[trait] >= 4)].filter((value,index,array) => array.indexOf(value) === index).slice(0,5);
  return <div className="dna-bars">{visible.map((trait) => <div className="dna-row" key={trait}><span>{lang === "ar" ? traitArabic[trait] : trait.replace("woody","WOODY").toUpperCase()}</span><div><i style={{width:`${(product.dna[trait] / 5) * 100}%`}}/></div></div>)}</div>;
}

function MatchCard({ product, onOpen, onGallery, lang }) {
  const copy = labels[lang];
  const localized = lang === "ar" ? productCopy[product.id] : product;
  const message = lang === "ar" ? `مرحبًا، أرغب في طلب عطر ${product.name} من STARRY.` : `I want to order ${product.name} from STARRY`;
  return <main className="screen result" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header onGallery={onGallery} lang={lang}/>
    <div className="result-top"><span>{copy.match}</span><h1 dir="ltr">{product.name}</h1><p>{localized.positioning}</p></div>
    <div className="product-stage result-art"><ResponsiveImage name={product.resultImage} alt={product.name}/><div className="match-badge">{product.match}%<small>{copy.matchLabel}</small></div></div>
    <div className="result-copy"><h3>{copy.why}</h3><p>{localized.description}</p><DNA product={product} lang={lang}/></div>
    <a className="whatsapp-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}><MessageCircle size={17}/> {copy.order} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></a>
    <button className="explore-btn" onClick={onOpen}>{copy.explore} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={14}/></button>
  </main>;
}

function Details({ product, onBack, onGallery, lang }) {
  const copy = labels[lang];
  const message = lang === "ar" ? `مرحبًا، أرغب في طلب عطر ${product.name} من STARRY.` : `I want to order ${product.name} from STARRY`;
  return <main className="screen details" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back onBack={onBack} onGallery={onGallery} lang={lang}/><div className="details-bottle detail-art"><ResponsiveImage name={product.resultImage} alt={product.name}/></div><h1 dir="ltr">{product.name}</h1>
    <section className="accords"><h3>{lang === "ar" ? "الروائح الأساسية" : "MAIN ACCORDS"}</h3>{product.accords.map((a) => <div className="accord" key={a.name}><span>{a.name}</span><div><i style={{width:`${a.level}%`}}/></div></div>)}</section>
    <section><h3 className="section-title">{lang === "ar" ? "مكونات العطر" : "FRAGRANCE NOTES"}</h3><div className="notes-grid">{Object.entries(product.notes).map(([type,list]) => <div className="note-card" key={type}><small>{lang === "ar" ? ({"Top Notes":"مقدمة العطر","Heart Notes":"قلب العطر","Base Notes":"قاعدة العطر"}[type] || type) : type}</small><strong>{list.join(" · ")}</strong></div>)}</div></section>
    <a className="whatsapp-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}><MessageCircle size={17}/> {copy.order} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></a>
  </main>;
}

function Gallery({ onAgain, onBack, onGallery, lang }) {
  return <main className="screen gallery" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back onBack={onBack} onGallery={onGallery} lang={lang}/><h1>{lang === "ar" ? "اكتشف كل العطور" : "EXPLORE ALL FRAGRANCES"}</h1><p>{lang === "ar" ? "حكايات مختلفة. عالم واحد." : "Different stories. The same universe."}</p><div className="product-grid">{products.map((product) => <article key={product.id} className="mini-product"><div className="mini-bottle"><ResponsiveImage name={product.resultImage} alt={product.name} sizes="96px"/></div><span dir="ltr">{product.name}</span></article>)}</div><button className="again-btn" onClick={onAgain}><RotateCcw size={15}/> {lang === "ar" ? "ابدأ الاختبار من جديد" : "TAKE THE QUIZ AGAIN"} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></button><SocialLinks/><div className="footer-brand">STARRY<br/><small>FRAGRANCE HOUSE</small></div></main>;
}

function App() {
  const [screen, setScreen] = useState("landing");
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [lang, setLang] = useState("en");
  const results = useMemo(() => scoreProducts(answers), [answers]);
  const openGallery = () => setScreen("gallery");
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, [lang]);
  function finish(value) { setAnswers(value); setScreen("analyzing"); window.setTimeout(() => setScreen("result"), 1600); }
  if (screen === "landing") return <Landing onStart={() => setScreen("quiz")} onGallery={openGallery}/>;
  if (screen === "quiz") return <Quiz onFinish={finish} onExit={() => setScreen("landing")} onGallery={openGallery} lang={lang} setLang={setLang}/>;
  if (screen === "analyzing") return <Analyzing lang={lang}/>;
  if (screen === "result") { const product = results[0] || products[0]; return <MatchCard product={product} lang={lang} onOpen={() => {setSelected(product);setScreen("details")}} onGallery={openGallery}/>; }
  if (screen === "details") return <Details product={selected} lang={lang} onBack={() => setScreen("result")} onGallery={openGallery}/>;
  if (screen === "gallery") return <Gallery lang={lang} onAgain={() => setScreen("landing")} onBack={() => setScreen("landing")} onGallery={openGallery}/>;
  return null;
}

createRoot(document.getElementById("root")).render(<App/>);
