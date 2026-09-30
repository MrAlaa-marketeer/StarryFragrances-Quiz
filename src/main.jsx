import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, Menu, RotateCcw, MessageCircle } from "lucide-react";
import "./styles.css";
import "./landing.css";
import { products, questions, TRAITS } from "./data/products";

const ASSET_BASE = "/images/";
const WHATSAPP_NUMBER = "201207207794";
const asset = (name) => name ? `${ASSET_BASE}${name}` : "";

function ResponsiveImage({ name, alt, priority = false, sizes = "(max-width: 700px) 100vw, 382px" }) {
  const base = name.replace(/-960\.webp$/, "").replace(/\.png$/, "");
  const widths = base.includes("spicy-vanilla") ? [480, 960] : [480, 960, 1600];
  const srcSet = widths.map((width) => `${asset(`${base}-${width}.webp`)} ${width}w`).join(", ");
  const src = asset(`${base}-${priority ? "1600" : "960"}.webp`);

  return <img
    src={src}
    srcSet={srcSet}
    sizes={sizes}
    alt={alt}
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    decoding="async"
  />;
}

function buildUserDNA(answers) {
  const totals = Object.fromEntries(TRAITS.map((t) => [t, 0]));
  answers.forEach((answer, index) => {
    if (!answer) return;
    const question = questions[index];
    Object.entries(answer.weights || {}).forEach(([trait, value]) => {
      totals[trait] += value * question.weight;
    });
  });
  return totals;
}

function dot(a, b) {
  return TRAITS.reduce((sum, t) => sum + (a[t] || 0) * (b[t] || 0), 0);
}

function magnitude(a) {
  return Math.sqrt(TRAITS.reduce((sum, t) => sum + (a[t] || 0) ** 2, 0));
}

function cosineSimilarity(a, b) {
  const denom = magnitude(a) * magnitude(b);
  return denom ? dot(a, b) / denom : 0;
}

function scoreProducts(answers) {
  const userDNA = buildUserDNA(answers);
  const raw = products.map((product) => {
    const similarity = cosineSimilarity(userDNA, product.dna);
    const coreEvidence = product.core.reduce((sum, trait) => sum + (userDNA[trait] || 0), 0) / product.core.length;
    return { ...product, similarity, coreEvidence };
  });

  const min = Math.min(...raw.map((r) => r.similarity));
  const max = Math.max(...raw.map((r) => r.similarity));

  const ranked = raw.map((r) => ({
    ...r,
    score: r.similarity * 0.82 + (r.coreEvidence / 20) * 0.18,
  })).sort((a, b) => b.score - a.score);

  const best = ranked[0]?.score || 0;
  const second = ranked[1]?.score || 0;
  return ranked.map((r) => ({
    ...r,
    match: Math.round(72 + ((r.score - min) / (max === min ? 1 : max - min)) * 24),
    confidenceGap: best - second
  }));
}

function Header({ back, onBack, onGallery }) {
  return <header className="header">
    {back ? <button className="icon-btn" onClick={onBack} aria-label="Go back"><ArrowLeft size={19}/></button> : <div className="header-spacer"/>}
    <div className="logo">STARRY</div>
    <button className="icon-btn" onClick={onGallery} aria-label="Explore all fragrances"><Menu size={20}/></button>
  </header>;
}

function PrimaryButton({ children, onClick }) {
  return <button className="primary-btn" onClick={onClick}>{children}<ArrowRight size={16}/></button>;
}

function Landing({ onStart, onGallery }) {
  return <main className="screen landing">
    <Header onGallery={onGallery} />
    <div className="landing-art" aria-hidden="true">
      <ResponsiveImage name={products[0].resultImage} alt="" priority sizes="100vw" />
      <span className="landing-star landing-star-one">✦</span>
      <span className="landing-star landing-star-two">✧</span>
    </div>
    <div className="landing-copy">
      <div className="landing-kicker"><span/> THE STARRY SCENT EDIT</div>
      <h1><span>FIND YOUR</span><span>SIGNATURE</span><span>SCENT</span></h1>
      <p>A few questions.<br/>One fragrance that feels like you.</p>
      <PrimaryButton onClick={onStart}>START THE JOURNEY</PrimaryButton>
    </div>
    <div className="landing-note"><span>01 — 07</span><i/> A PERSONAL SCENT DISCOVERY</div>
  </main>;
}

function Quiz({ onFinish, onExit, onGallery }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const q = questions[step];
  function choose(option) { const next = [...answers]; next[step] = option; setAnswers(next); }
  function next() {
    if (!answers[step]) return;
    if (step === questions.length - 1) onFinish(answers);
    else setStep(step + 1);
  }
  return <main className="screen">
    <Header back={step > 0} onBack={() => step > 0 ? setStep(step - 1) : onExit()} onGallery={onGallery} />
    <div className="quiz-wrap">
      <div className="progress-row"><div className="progress"><span style={{width: `${((step + 1) / questions.length) * 100}%`}}/></div><span>{step + 1}/{questions.length}</span></div>
      <h2>{q.title}</h2>
      <div className="options">{q.options.map((option) => {
        const selected = answers[step]?.id === option.id;
        return <button key={option.id} className={`option ${selected ? "selected" : ""}`} onClick={() => choose(option)}><span>{option.label}</span></button>;
      })}</div>
      <div className="bottom-nav"><button className="back-text" onClick={() => step > 0 ? setStep(step - 1) : onExit()}><ArrowLeft size={15}/> Back</button><PrimaryButton onClick={next}>{step === questions.length - 1 ? "Reveal My Scent" : "Next"}</PrimaryButton></div>
    </div>
  </main>;
}

function Analyzing() {
  return <main className="screen analyzing"><Header back /><div className="analysis-symbol">✦</div><h2>ANALYZING<br/>YOUR PREFERENCES</h2><p>Reading your scent profile...<br/>Finding the fragrance that feels like you.</p><div className="loader"><span/></div></main>;
}

function DNA({ product }) {
  const visible = [...product.core, ...TRAITS.filter(t => product.dna[t] >= 4)].filter((v,i,a) => a.indexOf(v) === i).slice(0,5);
  return <div className="dna-bars">{visible.map((trait) => <div className="dna-row" key={trait}><span>{trait.replace("woody","WOODY").toUpperCase()}</span><div><i style={{width:`${(product.dna[trait] / 5) * 100}%`}}/></div></div>)}</div>;
}

function MatchCard({ product, onOpen, onGallery }) {
  return <main className="screen result">
    <Header onGallery={onGallery} />
    <div className="result-top"><span>YOUR STARRY MATCH</span><h1>{product.name}</h1><p>{product.positioning}</p></div>
    <div className="product-stage result-art"><ResponsiveImage name={product.resultImage} alt={product.name}/><div className="match-badge">{product.match}%<small>MATCH</small></div></div>
    <div className="result-copy"><h3>WHY IT FEELS LIKE YOU</h3><p>{product.description}</p><DNA product={product}/></div>
    <a className="whatsapp-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`I want to order ${product.name} from STARRY`)}`}><MessageCircle size={17}/> ORDER ON WHATSAPP <ArrowRight size={15}/></a>
    <button className="explore-btn" onClick={onOpen}>EXPLORE THE FRAGRANCE <ArrowRight size={14}/></button>
  </main>;
}

function Details({ product, onBack, onGallery }) {
  return <main className="screen details"><Header back onBack={onBack} onGallery={onGallery}/><div className="details-bottle detail-art"><ResponsiveImage name={product.resultImage} alt={product.name}/></div><h1>{product.name}</h1>
    <section className="accords"><h3>MAIN ACCORDS</h3>{product.accords.map((a) => <div className="accord" key={a.name}><span>{a.name}</span><div><i style={{width:`${a.level}%`}}/></div></div>)}</section>
    <section><h3 className="section-title">FRAGRANCE NOTES</h3><div className="notes-grid">{Object.entries(product.notes).map(([type,list]) => <div className="note-card" key={type}><small>{type}</small><strong>{list.join(" · ")}</strong></div>)}</div></section>
    <a className="whatsapp-btn" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`I want to order ${product.name} from STARRY`)}`}><MessageCircle size={17}/> ORDER ON WHATSAPP <ArrowRight size={15}/></a>
  </main>;
}

function Gallery({ onAgain, onBack, onGallery }) {
  return <main className="screen gallery"><Header back onBack={onBack} onGallery={onGallery}/><h1>EXPLORE ALL FRAGRANCES</h1><p>Different stories. The same universe.</p><div className="product-grid">{products.map(p => <article key={p.id} className="mini-product"><div className="mini-bottle"><ResponsiveImage name={p.resultImage} alt={p.name} sizes="96px"/></div><span>{p.name}</span></article>)}</div><button className="again-btn" onClick={onAgain}><RotateCcw size={15}/> TAKE THE QUIZ AGAIN <ArrowRight size={15}/></button><div className="footer-brand">STARRY<br/><small>FRAGRANCE HOUSE</small></div></main>;
}

function App() {
  const [screen, setScreen] = useState("landing");
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const results = useMemo(() => scoreProducts(answers), [answers]);
  const openGallery = () => setScreen("gallery");

  function finish(a) { setAnswers(a); setScreen("analyzing"); window.setTimeout(() => setScreen("result"), 1600); }
  if (screen === "landing") return <Landing onStart={() => setScreen("quiz")} onGallery={openGallery}/>;
  if (screen === "quiz") return <Quiz onFinish={finish} onExit={() => setScreen("landing")} onGallery={openGallery}/>;
  if (screen === "analyzing") return <Analyzing/>;
  if (screen === "result") { const p = results[0] || products[0]; return <MatchCard product={p} onOpen={() => {setSelected(p);setScreen("details")}} onGallery={openGallery}/>; }
  if (screen === "details") return <Details product={selected} onBack={() => setScreen("result")} onGallery={openGallery}/>;
  if (screen === "gallery") return <Gallery onAgain={() => setScreen("landing")} onBack={() => setScreen("landing")} onGallery={openGallery}/>;
  return null;
}

createRoot(document.getElementById("root")).render(<App />);
