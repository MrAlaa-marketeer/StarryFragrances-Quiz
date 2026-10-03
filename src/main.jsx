import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, Menu, RotateCcw, MessageCircle, Instagram, Facebook, Music2, Share2 } from "lucide-react";
import "./styles.css";
import "./landing.css";
import "./quiz-enhancements.css";
import { products, questions, TRAITS, quizFit, productCopy } from "./data/products";

const ASSET_BASE = "/images/";
const WHATSAPP_NUMBER = "201207207794";
const asset = (name) => name ? `${ASSET_BASE}${name}` : "";
const labels = {
  en: { back:"Back", next:"Next", reveal:"Reveal My Scent", analyzing:"YOUR STARRY PROFILE IS READY", reading:"Reading your scent profile...", finding:"Finding the fragrance that feels like you.", match:"YOUR STARRY SIGNATURE", discover:"DISCOVER YOUR SCENT", why:"WHY THIS IS YOUR MATCH", profile:"YOUR SCENT PROFILE", bestFor:"BEST FOR", second:"ALSO IN YOUR ORBIT", share:"SHARE MY RESULT", retake:"TAKE THE QUIZ AGAIN", copied:"Result card downloaded", matchLabel:"ANSWER FIT", order:"ORDER ON WHATSAPP", explore:"EXPLORE THE FRAGRANCE", question:"QUESTION", of:"OF", language:"Choose language" },
  ar: { back:"السابق", next:"التالي", reveal:"اكتشف عطرك", analyzing:"ملفك العطري من STARRY جاهز", reading:"نقرأ ذوقك في العطور...", finding:"نبحث عن العطر الأقرب لشخصيتك.", match:"توقيعك العطري من STARRY", discover:"اكتشف عطرك", why:"لماذا يناسبك هذا العطر؟", profile:"ملفك العطري", bestFor:"الأنسب لـ", second:"عطر آخر قريب من ذوقك", share:"شارك نتيجتي", retake:"أعد الاختبار", copied:"تم تنزيل بطاقة النتيجة", matchLabel:"توافق إجاباتك", order:"اطلب عبر واتساب", explore:"اكتشف تفاصيل العطر", question:"السؤال", of:"من", language:"اختر اللغة" }
};
const occasionByAnswer = { a:"everyday", b:"work", c:"date", d:"social" };
const OPTION_ORDER_STORAGE = "starry-quiz-option-order";

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
  try { previous = JSON.parse(sessionStorage.getItem(OPTION_ORDER_STORAGE) || "{}"); } catch { /* Start with a fresh order when storage is unavailable. */ }
  const current = {};
  const orders = questions.map((question) => {
    let shuffled = shuffleOptions(question.options);
    let attempts = 0;
    while (previous[question.id]?.join(",") === shuffled.map((option) => option.id).join(",") && attempts < 8) {
      shuffled = shuffleOptions(question.options);
      attempts += 1;
    }
    if (previous[question.id]?.join(",") === shuffled.map((option) => option.id).join(",")) shuffled = [...shuffled.slice(1), shuffled[0]];
    current[question.id] = shuffled.map((option) => option.id);
    return shuffled;
  });
  try { sessionStorage.setItem(OPTION_ORDER_STORAGE, JSON.stringify(current)); } catch { /* The current attempt still keeps its shuffled order in memory. */ }
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

function Quiz({ onFinish, onExit, onGallery, lang, setLang, step, setStep, answers, setAnswers }) {
  const q = questions[step];
  const [optionOrders] = useState(makeOptionOrders);
  const advancing = React.useRef(false);
  function choose(option) {
    if (advancing.current) return;
    const nextAnswers = [...answers]; nextAnswers[step] = option; setAnswers(nextAnswers);
    advancing.current = true;
    window.setTimeout(() => {
      advancing.current = false;
      if (step === questions.length - 1) onFinish(nextAnswers);
      else setStep(step + 1);
    }, 320);
  }
  function back() { if (step > 0) setStep(step - 1); else onExit(); }
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

function Analyzing({ lang }) {
  const copy = labels[lang];
  return <main className="screen analyzing" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back lang={lang}/><div className="analysis-symbol">✦</div><h2>{lang === "ar" ? copy.analyzing : <>ANALYZING<br/>YOUR PREFERENCES</>}</h2><p>{copy.reading}<br/>{copy.finding}</p><div className="loader"><span/></div></main>;
}

const traitArabic = { fresh:"منعش",fruity:"فاكهي",floral:"زهري",sweet:"حلو",vanilla:"فانيليا",woody:"خشبي",amber:"عنبر",spicy:"متبّل",creamy:"كريمي",powdery:"بودري",dark:"داكن",sensual:"حسي",elegant:"أنيق",mysterious:"غامض",playful:"مرح",energetic:"حيوي",warm:"دافئ",clean:"نظيف",luxurious:"فاخر",bold:"جريء" };
function DNA({ product, lang }) {
  const visible = [...product.core, ...TRAITS.filter((trait) => product.dna[trait] >= 4)].filter((value,index,array) => array.indexOf(value) === index).slice(0,4);
  return <div className="dna-bars">{visible.map((trait) => <div className="dna-row" key={trait}><span>{lang === "ar" ? traitArabic[trait] : trait.replace("woody","WOODY").toUpperCase()}</span><div><i style={{width:`${(product.dna[trait] / 5) * 100}%`}}/></div></div>)}</div>;
}

function ShareButton({ product, lang }) {
  const copy = labels[lang];
  async function share() {
    const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1350;
    const ctx = canvas.getContext("2d");
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
    ctx.save(); ctx.beginPath(); ctx.roundRect(104, 286, 872, 622, 24); ctx.clip();
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
    ctx.strokeStyle = "rgba(222,177,105,.72)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(104, 286, 872, 622, 24); ctx.stroke();
    ctx.fillStyle = "#efe2cb"; ctx.font = "26px Arial,sans-serif"; ctx.fillText(localized.positioning, 540, 973, 900);
    ctx.fillStyle = "#07111b"; ctx.strokeStyle = "#d9ae69"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(382, 1014, 316, 142, 20); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#e6bd78"; ctx.font = "bold 72px Georgia,serif"; ctx.fillText(`${product.match}%`, 540, 1090);
    ctx.fillStyle = "#ddd0b8"; ctx.font = "16px Arial,sans-serif"; ctx.fillText(copy.matchLabel.toUpperCase(), 540, 1129);
    const traits = product.core.slice(0, 3).map((trait) => lang === "ar" ? traitArabic[trait] : trait.toUpperCase());
    const totalWidth = traits.reduce((total, trait) => total + Math.max(126, ctx.measureText(trait).width + 38), 0) + (traits.length - 1) * 14;
    let tagX = (1080 - totalWidth) / 2;
    traits.forEach((trait) => {
      ctx.font = "17px Arial,sans-serif"; const chipWidth = Math.max(126, ctx.measureText(trait).width + 38);
      ctx.fillStyle = "rgba(222,177,105,.08)"; ctx.strokeStyle = "rgba(222,177,105,.42)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(tagX, 1190, chipWidth, 42, 21); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#e3d2b3"; ctx.fillText(trait, tagX + chipWidth / 2, 1217, chipWidth - 12); tagX += chipWidth + 14;
    });
    ctx.fillStyle = "#aa9a7e"; ctx.font = "17px Georgia,serif"; ctx.fillText(lang === "ar" ? "عطر يشبهك" : "A fragrance that feels like you", 540, 1281);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    const file = new File([blob], "my-starry-signature.png", { type: "image/png" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) await navigator.share({ title: `My STARRY match: ${product.name}`, files: [file] });
    else { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = file.name; link.click(); URL.revokeObjectURL(url); }
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

function MatchCard({ product, secondary, answers, onOpen, onGallery, onRetake, lang }) {
  const copy = labels[lang];
  const localized = lang === "ar" ? productCopy[product.id] : product;
  const message = lang === "ar" ? `مرحبًا، أرغب في طلب عطر ${product.name} من STARRY.` : `I want to order ${product.name} from STARRY`;
  return <main className="screen result" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header onGallery={onGallery} lang={lang}/>
    <div className="result-top"><span>{copy.match}</span><h1 dir="ltr">{product.name}</h1><p>{localized.positioning}</p></div>
    <div className="product-stage result-art"><ResponsiveImage name={product.resultImage} alt={product.name}/><div className="match-badge">{product.match}%<small>{copy.matchLabel}</small></div></div>
    <div className="result-copy"><h3>{copy.why}</h3><p>{localized.description}</p><p className="match-reasons">{matchedAnswers(product, answers, lang).join(" · ")}</p><h3 className="profile-title">{copy.profile}</h3><DNA product={product} lang={lang}/></div>
    <section className="best-for"><h3>{copy.bestFor}</h3><div className="occasion-chips">{product.bestFor[lang].map((item) => <span key={item}>{item}</span>)}</div></section>
    {secondary && <div className="secondary-match"><span>{copy.second}</span><strong>{secondary.name}</strong><b>{secondary.match}%</b></div>}
    <a className="whatsapp-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}><MessageCircle size={17}/> {copy.order} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></a>
    <button className="explore-btn" onClick={onOpen}>{copy.explore} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={14}/></button>
    <ShareButton product={product} lang={lang}/><button className="retake-btn" onClick={onRetake}><RotateCcw size={14}/>{copy.retake}</button>
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
  const [answers, setAnswers] = useState(() => { try { return JSON.parse(sessionStorage.getItem("starry-quiz-answers") || "[]"); } catch { return []; } });
  const [step, setStep] = useState(() => Number(sessionStorage.getItem("starry-quiz-step") || 0));
  const [selected, setSelected] = useState(null);
  const [lang, setLang] = useState("en");
  const results = useMemo(() => scoreProducts(answers), [answers]);
  const openGallery = () => setScreen("gallery");
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, [lang]);
  useEffect(() => { sessionStorage.setItem("starry-quiz-answers", JSON.stringify(answers)); }, [answers]);
  useEffect(() => { sessionStorage.setItem("starry-quiz-step", String(step)); }, [step]);
  function finish(value) { setAnswers(value); setScreen("analyzing"); window.setTimeout(() => setScreen("result"), 1100); }
  function retake() { setAnswers([]); setStep(0); setSelected(null); sessionStorage.removeItem("starry-quiz-answers"); sessionStorage.removeItem("starry-quiz-step"); setScreen("quiz"); }
  if (screen === "landing") return <Landing onStart={() => setScreen("quiz")} onGallery={openGallery}/>;
  if (screen === "quiz") return <Quiz onFinish={finish} onExit={() => setScreen("landing")} onGallery={openGallery} lang={lang} setLang={setLang} step={step} setStep={setStep} answers={answers} setAnswers={setAnswers}/>;
  if (screen === "analyzing") return <Analyzing lang={lang}/>;
  if (screen === "result") { const product = results[0] || products[0]; return <MatchCard product={product} secondary={results[1]} answers={answers} lang={lang} onRetake={retake} onOpen={() => {setSelected(product);setScreen("details")}} onGallery={openGallery}/>; }
  if (screen === "details") return <Details product={selected} lang={lang} onBack={() => setScreen("result")} onGallery={openGallery}/>;
  if (screen === "gallery") return <Gallery lang={lang} onAgain={retake} onBack={() => setScreen("landing")} onGallery={openGallery}/>;
  return null;
}

createRoot(document.getElementById("root")).render(<App/>);

