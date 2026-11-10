import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowRight, Menu, RotateCcw, MessageCircle, Instagram, Facebook, Share2, SlidersHorizontal, Sparkles, ShoppingBag, X, Plus, Minus, Clock, Wind, Users, SunSnow } from "lucide-react";
import "./styles.css";
import "./landing.css";
import "./quiz-enhancements.css";
import { products, TRAITS, productCopy } from "./data/products";
import { questions } from "./data/quiz";

const ASSET_BASE = "/images/";
const WHATSAPP_NUMBER = "201207207794";
const INSTAGRAM_PROFILE = "https://www.instagram.com/starryfragrances/";
const asset = (name) => name ? `${ASSET_BASE}${name}` : "";
const CART_STORAGE = "starry-cart";
const RESULT_STORAGE = "starry-quiz-result";
const CUSTOMER_STORAGE = "starry-customer-info";

const GOVERNORATES = [
  { id: "Cairo", en: "Cairo", ar: "القاهرة" },
  { id: "Giza", en: "Giza", ar: "الجيزة" },
  { id: "Alexandria", en: "Alexandria", ar: "الإسكندرية" },
  { id: "Qalyubia", en: "Qalyubia", ar: "القليوبية" },
  { id: "Dakahlia", en: "Dakahlia", ar: "الدقهلية" },
  { id: "Gharbia", en: "Gharbia", ar: "الغربية" },
  { id: "Sharqia", en: "Sharqia", ar: "الشرقية" },
  { id: "Monufia", en: "Monufia", ar: "المنوفية" },
  { id: "Beheira", en: "Beheira", ar: "البحيرة" },
  { id: "Kafr El Sheikh", en: "Kafr El Sheikh", ar: "كفر الشيخ" },
  { id: "Damietta", en: "Damietta", ar: "دمياط" },
  { id: "Port Said", en: "Port Said", ar: "بورسعيد" },
  { id: "Ismailia", en: "Ismailia", ar: "الإسماعيلية" },
  { id: "Suez", en: "Suez", ar: "السويس" },
  { id: "Fayoum", en: "Fayoum", ar: "الفيوم" },
  { id: "Beni Suef", en: "Beni Suef", ar: "بني سويف" },
  { id: "Minia", en: "Minia", ar: "المنيا" },
  { id: "Assiut", en: "Assiut", ar: "أسيوط" },
  { id: "Sohag", en: "Sohag", ar: "سوهاج" },
  { id: "Qena", en: "Qena", ar: "قنا" },
  { id: "Luxor", en: "Luxor", ar: "الأقصر" },
  { id: "Aswan", en: "Aswan", ar: "أسوان" },
  { id: "Red Sea", en: "Red Sea", ar: "البحر الأحمر" },
  { id: "Matrouh", en: "Matrouh", ar: "مرسى مطروح" },
  { id: "North Sinai", en: "North Sinai", ar: "شمال سيناء" },
  { id: "South Sinai", en: "South Sinai", ar: "جنوب سيناء" },
  { id: "New Valley", en: "New Valley", ar: "الوادي الجديد" }
];

function track(event, payload = {}) {
  try {
    const key = "starry-funnel-analytics";
    const events = JSON.parse(localStorage.getItem(key) || "{}");
    events[event] = (events[event] || 0) + 1;
    events.lastEventAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(events));
  } catch { /* Local storage fallback */ }
  try {
    if (typeof window.va === "function") window.va("event", { name: event, data: payload });
    if (typeof window.gtag === "function") window.gtag("event", event, payload);
    if (typeof window.fbq === "function") {
      const fbStandard = {
        add_to_cart: "AddToCart",
        whatsapp_checkout: "InitiateCheckout",
        quiz_complete: "CompleteRegistration",
        product_view: "ViewContent"
      };
      if (fbStandard[event]) window.fbq("track", fbStandard[event], payload);
      else window.fbq("trackCustom", event, payload);
    }
    if (typeof window.ttq?.track === "function") window.ttq.track(event, payload);
  } catch { /* Analytics must not block the experience. */ }
}

function readCart() { try { const v=JSON.parse(localStorage.getItem(CART_STORAGE)||"[]"); return Array.isArray(v)?v:[]; } catch { return []; } }
function addToCart(product) { const cart=readCart(); const item=cart.find((entry)=>entry.id===product.id); if(item)item.quantity+=1;else cart.push({id:product.id,quantity:1}); try{localStorage.setItem(CART_STORAGE,JSON.stringify(cart));window.dispatchEvent(new Event("starry-cart-updated"));track("add_to_cart",{productId:product.id,name:product.name,price:product.offerPrice});}catch{/* WhatsApp checkout remains available. */} }
function setCartQuantity(id,quantity) { const cart=readCart().map((item)=>item.id===id?{...item,quantity}:item).filter((item)=>item.quantity>0);try{localStorage.setItem(CART_STORAGE,JSON.stringify(cart));window.dispatchEvent(new Event("starry-cart-updated"));}catch{/* Keep the current cart visible if storage is unavailable. */} }
function AddToCartButton({product,lang}) { const [added,setAdded]=useState(false); function add(){addToCart(product);setAdded(true);window.setTimeout(()=>setAdded(false),1600)} return <button type="button" className="add-to-cart" onClick={add}><ShoppingBag size={15}/>{added?labels[lang].addedToBag:labels[lang].add}</button>; }

function readCustomerInfo() {
  try {
    const saved = JSON.parse(localStorage.getItem(CUSTOMER_STORAGE) || "{}");
    return {
      name: typeof saved.name === "string" ? saved.name : "",
      phone: typeof saved.phone === "string" ? saved.phone : "",
      governorate: typeof saved.governorate === "string" ? saved.governorate : "",
      address: typeof saved.address === "string" ? saved.address : ""
    };
  } catch {
    return { name: "", phone: "", governorate: "", address: "" };
  }
}

const labels = {
  en: {
    back:"Back", next:"Next", reveal:"Reveal My Scent", analyzing:"YOUR STARRY PROFILE IS READY", reading:"Reading your scent profile...", finding:"Finding the fragrance that feels like you.", match:"YOUR STARRY SIGNATURE", discover:"DISCOVER YOUR SCENT", why:"WHY THIS IS YOUR MATCH", profile:"YOUR SCENT PROFILE", bestFor:"BEST FOR", second:"ALSO IN YOUR ORBIT", share:"SHARE MY RESULT", retake:"TAKE THE QUIZ AGAIN", copied:"Result card downloaded", matchLabel:"PREFERENCE FIT", scoreDisclaimer:"A preference-fit index from your six weighted answers. The top pick leads the alternative by at least 7 points; it isn't a probability or guarantee.", order:"ORDER ON WHATSAPP", orderInstagram:"ORDER ON INSTAGRAM", size:"50ml", offer:"PRICE", priceUnit:"EGP", explore:"EXPLORE THE FRAGRANCE", question:"QUESTION", of:"OF", language:"Choose language", policyLink:"Return & Exchange Policy", shop:"SHOP FRAGRANCES", quiz:"TAKE THE SCENT QUIZ", shopTitle:"THE FRAGRANCE COLLECTION", shopIntro:"BLACK FRIDAY | BUY 2, GET THE 3RD FREE", shopOfferDates:"November 11–17", sort:"SORT BY", featured:"Featured", priceLow:"Price: Low to high", priceHigh:"Price: High to low", nameSort:"Name: A to Z", notSure:"NOT SURE WHICH SCENT IS YOURS?", findScent:"FIND YOUR SCENT", description:"THE STORY", mayLike:"YOU MAY ALSO LIKE", viewDetails:"VIEW DETAILS", continueShopping:"Continue shopping", compare:"COMPARE", added:"ADDED", compareOneMore:"Choose one more scent to compare", compareNow:"COMPARE TWO SCENTS", compareTitle:"Compare fragrances", close:"Close", compareSize:"SIZE", comparePrice:"PRICE", compareScent:"SCENT PROFILE", compareNotes:"MAIN ACCORDS", compareLongevity:"LONGEVITY", compareInspired:"INSPIRED BY", bag:"Your bag", checkout:"Checkout on WhatsApp", checkoutRequired:"Enter your delivery details first to continue to WhatsApp.", emptyCart:"Your bag is empty", add:"Add to bag", addedToBag:"Added to your bag", bundle:"Discover the collection", bundleCopy:"Ask us about a discovery set", shareSuccess:"Your result is ready to share", shareError:"Could not prepare your result card. Please try again.",
    inspiredBy:"Inspired by", longevityLabel:"LONGEVITY", sillageLabel:"PROJECTION", genderLabel:"FOR", seasonLabel:"SEASON",
    genderMap:{ unisex:"Unisex", women:"Women", men:"Men" },
    seasonMap:{ winter:"Cool & Evening", summer:"Warm & Daytime", all:"All Seasons" },
    filterAll:"All", filterUnisex:"Unisex", filterWomen:"Women", filterMen:"Men", filterWinter:"Winter & Warm", filterSummer:"Summer & Fresh",
    deliveryTitle:"DELIVERY DETAILS", nameField:"Full Name", namePlaceholder:"Your full name", phoneField:"Mobile Number", phonePlaceholder:"01XXXXXXXXX", govField:"Governorate", govPlaceholder:"Select governorate", addressField:"Detailed Address", addressPlaceholder:"Street, building, floor, landmark...", shippingNote:"Shipping cost varies by governorate & will be confirmed on WhatsApp."
  },
  ar: {
    back:"السابق", next:"التالي", reveal:"اكتشف عطرك", analyzing:"ملفك العطري من STARRY جاهز", reading:"نقرأ ذوقك في العطور...", finding:"نبحث عن العطر الأقرب لشخصيتك.", match:"توقيعك العطري من STARRY", discover:"اكتشف عطرك", why:"ليه العطر ده مناسب لذوقك؟", profile:"ملفك العطري", bestFor:"الأنسب لـ", second:"عطر تاني ممكن يعجبك", share:"شارك نتيجتي", retake:"أعد الاختبار", copied:"تم تنزيل بطاقة النتيجة", matchLabel:"مؤشر ملاءمة", scoreDisclaimer:"مؤشر مبني على إجاباتك الستة ونقاطها. الترشيح الأول متقدم على البديل المعروض بـ7 نقاط على الأقل؛ ده مش احتمال علمي ولا ضمان لتجربتك.", order:"اطلب عبر واتساب", orderInstagram:"اطلب عبر إنستجرام", size:"50ml", offer:"السعر", priceUnit:"ج.م", explore:"اكتشف تفاصيل العطر", question:"السؤال", of:"من", language:"اختر اللغة", policyLink:"سياسة الاستبدال والاسترجاع", shop:"تسوق العطور", quiz:"اكتشف عطرك بالاختبار", shopTitle:"مجموعة العطور", shopIntro:"بلاك فرايداي | اشتري ٢ والثالث مجانًا", shopOfferDates:"من ١١ إلى ١٧ نوفمبر", sort:"ترتيب حسب", featured:"الأكثر تميزًا", priceLow:"السعر: من الأقل للأعلى", priceHigh:"السعر: من الأعلى للأقل", nameSort:"الاسم: أ إلى ي", notSure:"مش عارف أنهي عطر يناسبك؟", findScent:"اكتشف عطرك", description:"حكاية العطر", mayLike:"قد يعجبك كمان", viewDetails:"اكتشف التفاصيل", continueShopping:"تابع التسوق", compare:"قارن", added:"تمت الإضافة", compareOneMore:"اختار عطر كمان للمقارنة", compareNow:"قارن بين العطرين", compareTitle:"مقارنة العطور", close:"إغلاق", compareSize:"الحجم", comparePrice:"السعر", compareScent:"طابع العطر", compareNotes:"أبرز الروائح", compareLongevity:"الثبات", compareInspired:"مستوحى من", bag:"حقيبة التسوق", checkout:"كمّل طلبك على واتساب", checkoutRequired:"أدخل بيانات التوصيل أولًا للمتابعة إلى واتساب.", emptyCart:"حقيبتك فاضية", add:"أضف للحقيبة", addedToBag:"اتضاف لحقيبتك", bundle:"اكتشف المجموعة", bundleCopy:"اسألنا عن مجموعة اكتشاف العطور", shareSuccess:"نتيجتك جاهزة للمشاركة", shareError:"مش قادرين نجهز بطاقة النتيجة. جرّب تاني.",
    inspiredBy:"مستوحى من", longevityLabel:"مدة الثبات", sillageLabel:"قوة الفوحان", genderLabel:"مناسب لـ", seasonLabel:"الموسم الأنسب",
    genderMap:{ unisex:"للجنسين (Unisex)", women:"نسائي", men:"رجالي" },
    seasonMap:{ winter:"شتوي / ليلي دافئ", summer:"صيفي / نهاري منعش", all:"جميع الفصول" },
    filterAll:"الكل", filterUnisex:"Unisex", filterWomen:"نسائي", filterMen:"رجالي", filterWinter:"شتوي / دافئ", filterSummer:"صيفي / منعش",
    deliveryTitle:"بيانات التوصيل", nameField:"الاسم بالكامل", namePlaceholder:"اكتب اسمك الثلاثي", phoneField:"رقم الموبايل", phonePlaceholder:"01XXXXXXXXX", govField:"المحافظة", govPlaceholder:"اختر المحافظة", addressField:"العنوان بالتفصيل", addressPlaceholder:"الشارع، رقم العقار، الدور، علامة مميزة...", shippingNote:"يتم تحديد وتأكيد تكلفة الشحن عبر واتساب حسب المحافظة."
  }
};
const OPTION_ORDER_STORAGE = "starry-quiz-option-order";

function readAnswers() {
  try {
    const saved = JSON.parse(sessionStorage.getItem("starry-quiz-answers") || JSON.stringify(JSON.parse(localStorage.getItem(RESULT_STORAGE) || "{}").answers || []));
    if (!Array.isArray(saved)) return [];
    return questions.map((question, index) => question.options.find((option) => option.id === saved[index]?.id) || null).slice(0, questions.length).filter((answer, index, list) => answer && list.slice(0, index).every(Boolean));
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
  // Product packshots are transparent PNGs without generated WebP derivatives.
  if (name.toLowerCase().endsWith(".png")) {
    return <img src={asset(name)} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async"/>;
  }
  const base = name.replace(/-960\.webp$/, "");
  const widths = base.includes("spicy-vanilla") ? [480, 960] : [480, 960, 1600];
  const srcSet = widths.map((width) => `${asset(`${base}-${width}.webp`)} ${width}w`).join(", ");
  const src = asset(`${base}-${priority ? "1600" : "960"}.webp`);
  return <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async"/>;
}
function scoreProducts(answers) {
  const chosen = questions.map((question, index) => question.options.find((option) => option.id === answers[index]?.id)).filter(Boolean);
  const maxScore = chosen.reduce((sum, option) => sum + Math.max(0, ...Object.values(option.weights)), 0) || 1;
  const ranked = products.map((product) => {
    const score = chosen.reduce((sum, option) => sum + (option.weights[product.id] || 0), 0);
    const answerFit = Math.max(0, Math.min(1, score / maxScore));
    const fitIndex = 85 + Math.round(answerFit * 12);
    return { ...product, score, fitIndex };
  }).sort((a, b) => (b.score - a.score) || a.id.localeCompare(b.id));
  const topFit = Math.max(92, ranked[0]?.fitIndex || 92);
  return ranked.map((product, index) => ({
    ...product,
    match: index === 0 ? topFit : index === 1 ? Math.max(85, Math.min(product.fitIndex, topFit - 7)) : product.fitIndex
  }));
}

function PerformanceGrid({ product, lang }) {
  const copy = labels[lang];
  return (
    <section className="performance-section" aria-label={lang === "ar" ? "أداء العطر" : "Fragrance performance"}>
      <div className="performance-grid">
        <div className="perf-card">
          <Clock size={16} className="perf-icon" aria-hidden="true" />
          <small>{copy.longevityLabel}</small>
          <strong>{product.longevity[lang]}</strong>
        </div>
        <div className="perf-card">
          <Wind size={16} className="perf-icon" aria-hidden="true" />
          <small>{copy.sillageLabel}</small>
          <strong>{product.sillage[lang]}</strong>
        </div>
        <div className="perf-card">
          <Users size={16} className="perf-icon" aria-hidden="true" />
          <small>{copy.genderLabel}</small>
          <strong>{copy.genderMap[product.gender]}</strong>
        </div>
        <div className="perf-card">
          <SunSnow size={16} className="perf-icon" aria-hidden="true" />
          <small>{copy.seasonLabel}</small>
          <strong>{copy.seasonMap[product.season]}</strong>
        </div>
      </div>
    </section>
  );
}

function Header({ back, onBack, onGallery, onStartQuiz, onPolicy, onHome, lang = "en", setLang }) {
  const [drawerOpen,setDrawerOpen]=useState(false),[cartOpen,setCartOpen]=useState(false),[cart,setCart]=useState(readCart);
  const [customer, setCustomer] = useState(readCustomerInfo);
  const [checkoutError, setCheckoutError] = useState("");
  useEffect(()=>{const sync=()=>setCart(readCart());window.addEventListener("starry-cart-updated",sync);window.addEventListener("storage",sync);return()=>{window.removeEventListener("starry-cart-updated",sync);window.removeEventListener("storage",sync)}},[]);
  function updateCustomer(field, value) {
    setCheckoutError("");
    setCustomer((prev) => {
      const next = { ...prev, [field]: value };
      try { localStorage.setItem(CUSTOMER_STORAGE, JSON.stringify(next)); } catch { /* Ignore */ }
      return next;
    });
  }
  const rawItems=cart.map((entry)=>({product:products.find((p)=>p.id===entry.id),quantity:Number(entry.quantity)||0})).filter((x)=>x.product&&x.quantity>0);
  const count=rawItems.reduce((n,x)=>n+x.quantity,0);
  const units=[];
  rawItems.forEach(({product,quantity},itemIndex)=>{for(let i=0;i<quantity;i+=1)units.push({id:product.id,price:product.offerPrice,itemIndex});});
  units.sort((a,b)=>(b.price-a.price)||(a.itemIndex-b.itemIndex));
  const freeCount=Math.floor(units.length/3);
  const paidCount=units.length-freeCount;
  const freeByProduct={};
  let freeDiscount=0;
  units.forEach((u,idx)=>{if(idx>=paidCount){freeByProduct[u.id]=(freeByProduct[u.id]||0)+1;freeDiscount+=u.price;}});
  const items=rawItems.map(({product,quantity})=>{const freeQty=freeByProduct[product.id]||0;const paidQty=quantity-freeQty;const lineSubtotal=product.offerPrice*quantity;const lineTotal=product.offerPrice*paidQty;return{product,quantity,freeQty,paidQty,lineSubtotal,lineTotal};});
  const subtotalBeforeOffer=items.reduce((n,x)=>n+x.lineSubtotal,0);
  const total=subtotalBeforeOffer-freeDiscount;
  const saved=rawItems.reduce((n,x)=>n+Math.max(0,x.product.listPrice-x.product.offerPrice)*x.quantity,0)+freeDiscount;
  const orderText=items.map(({product,quantity,freeQty,lineTotal})=>{if(freeQty>0&&lineTotal===0)return `• ${quantity} × ${product.name} (${product.size}) — ${lang==="ar"?"مجانًا (عرض التالت هدية)":"FREE (Buy 2 Get 1 Free)"}`;if(freeQty>0)return `• ${quantity} × ${product.name} (${product.size}) — ${lineTotal} ${labels[lang].priceUnit} (${lang==="ar"?`شامل ${freeQty} مجانًا`:`incl. ${freeQty} FREE`})`;return `• ${quantity} × ${product.name} (${product.size}) — ${lineTotal} ${labels[lang].priceUnit}`;}).join("\n");
  const selectedGov = GOVERNORATES.find((g) => g.id === customer.governorate);
  const govLabel = selectedGov ? (lang === "ar" ? selectedGov.ar : selectedGov.en) : "";
  const offerNoteAr = freeDiscount > 0 ? `\n*خصم العرض (أغلى عطرين مدفوعين والتالت مجانًا):* -${freeDiscount} ج.م` : "";
  const offerNoteEn = freeDiscount > 0 ? `\n*Offer Discount (Buy 2 Get 1 Free):* -${freeDiscount} EGP` : "";
  const deliveryBlock = lang === "ar"
    ? `${offerNoteAr}\n\n*الإجمالي (قبل الشحن):* ${total} ج.م\n*بيانات التوصيل:*\n• الاسم: ${customer.name.trim() || "—"}\n• رقم الموبايل: ${customer.phone.trim() || "—"}\n• المحافظة: ${govLabel || "—"}\n• العنوان بالتفصيل: ${customer.address.trim() || "—"}\n\nبرجاء تأكيد الطلب وتكلفة الشحن للمحافظة.`
    : `${offerNoteEn}\n\n*Subtotal (excl. shipping):* ${total} EGP\n*Delivery Details:*\n• Name: ${customer.name.trim() || "—"}\n• Mobile: ${customer.phone.trim() || "—"}\n• Governorate: ${govLabel || "—"}\n• Full Address: ${customer.address.trim() || "—"}\n\nPlease confirm my order and the shipping fee for my governorate.`;
  const checkoutUrl=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent((lang==="ar"?`مرحبًا STARRY، أرغب في طلب:\n${orderText}`:`Hello STARRY, I would like to order:\n${orderText}`)+deliveryBlock)}`;
  const customerInfoComplete = Boolean(customer.name.trim() && customer.phone.trim() && GOVERNORATES.some((gov) => gov.id === customer.governorate) && customer.address.trim());
  function handleCheckout(event) {
    if (!customerInfoComplete) {
      event.preventDefault();
      setCheckoutError(labels[lang].checkoutRequired);
      return;
    }
    setCheckoutError("");
    track("whatsapp_checkout", { total, count, governorate: customer.governorate });
  }
  const close=()=>{setDrawerOpen(false);setCartOpen(false)};
  const copy = labels[lang];
  return <header className="header" dir="ltr">{back?<button className="icon-btn" onClick={onBack} aria-label={copy.back}><ArrowLeft size={19}/></button>:<div className="header-spacer"/>}<a className="logo" href="/" onClick={(e)=>{if(onHome){e.preventDefault();close();onHome();}}} aria-label="STARRY home">STARRY</a><div className="header-actions"><div className="header-language" role="group" aria-label="Choose language"><button type="button" className={lang==="ar"?"active":""} onClick={()=>setLang?.("ar")}>AR</button><i>|</i><button type="button" className={lang==="en"?"active":""} onClick={()=>setLang?.("en")}>EN</button></div><button className="icon-btn cart-trigger" onClick={()=>setCartOpen(true)} aria-label={copy.bag}><ShoppingBag size={18}/><span>{count}</span></button><button className="icon-btn" onClick={()=>setDrawerOpen(true)} aria-label={lang==="ar"?"فتح القائمة":"Open navigation menu"}><Menu size={20}/></button></div>
  {(drawerOpen||cartOpen)&&<div className="drawer-backdrop" onClick={close}><aside className="navigation-drawer" dir={lang==="ar"?"rtl":"ltr"} onClick={(e)=>e.stopPropagation()}><button className="drawer-close" onClick={close} aria-label={lang==="ar"?"إغلاق":"Close"}><X size={19}/></button>{drawerOpen?<><span className="drawer-kicker">STARRY FRAGRANCE HOUSE</span><h2>{lang==="ar"?"إلى أين تأخذك رائحتك؟":"Where will your scent take you?"}</h2><a href="/shop" onClick={(e)=>{e.preventDefault();close();onGallery?.()}}>{copy.shop}<ArrowRight className={lang==="ar"?"rtl-icon":""} size={16}/></a><a href="/quiz" onClick={(e)=>{e.preventDefault();close();onStartQuiz?.()}}>{copy.quiz}<ArrowRight className={lang==="ar"?"rtl-icon":""} size={16}/></a><a href="/return-exchange-policy" onClick={(e)=>{e.preventDefault();close();onPolicy?.()}}>{copy.policyLink}<ArrowRight className={lang==="ar"?"rtl-icon":""} size={16}/></a><a href="https://www.instagram.com/starryfragrances/" target="_blank" rel="noopener noreferrer">Instagram</a></>:<><span className="drawer-kicker">STARRY</span><h2>{copy.bag}</h2>{items.length?<><div className="cart-items">{items.map(({product,quantity,freeQty,lineSubtotal,lineTotal})=><div className="cart-item" key={product.id}><ResponsiveImage name={product.image} alt="" sizes="56px"/><span><strong dir="ltr">{product.name}</strong><small>{product.size}</small><span className="quantity-controls"><button type="button" aria-label={lang==="ar"?"تقليل الكمية":"Decrease quantity"} onClick={()=>setCartQuantity(product.id,quantity-1)}><Minus size={13} aria-hidden="true"/></button><b>{quantity}</b><button type="button" aria-label={lang==="ar"?"زيادة الكمية":"Increase quantity"} onClick={()=>setCartQuantity(product.id,quantity+1)}><Plus size={13} aria-hidden="true"/></button><button type="button" className="remove-cart-item" aria-label={lang==="ar"?"حذف المنتج":"Remove item"} onClick={()=>setCartQuantity(product.id,0)}><X size={14}/></button></span></span><b className="cart-item-price">{freeQty>0?<><del>{lineSubtotal} {copy.priceUnit}</del><strong>{lineTotal>0?`${lineTotal} ${copy.priceUnit}`:(lang==="ar"?"مجانًا":"FREE")}</strong>{quantity>1&&<small className="cart-free-tag">{lang==="ar"?`${freeQty} مجانًا`:`${freeQty} FREE`}</small>}</>:`${lineTotal} ${copy.priceUnit}`}</b></div>)}</div>
  <div className="cart-delivery-form">
    <span className="delivery-form-title">{copy.deliveryTitle}</span>
    <label className="delivery-field">
      <span>{copy.nameField}</span>
      <input type="text" value={customer.name} onChange={(e)=>updateCustomer("name", e.target.value)} placeholder={copy.namePlaceholder} aria-required="true" />
    </label>
    <label className="delivery-field">
      <span>{copy.phoneField}</span>
      <input type="tel" dir="ltr" value={customer.phone} onChange={(e)=>updateCustomer("phone", e.target.value)} placeholder={copy.phonePlaceholder} aria-required="true" />
    </label>
    <label className="delivery-field">
      <span>{copy.govField}</span>
      <select value={customer.governorate} onChange={(e)=>updateCustomer("governorate", e.target.value)} aria-required="true">
        <option value="">{copy.govPlaceholder}</option>
        {GOVERNORATES.map((gov) => <option key={gov.id} value={gov.id}>{lang === "ar" ? gov.ar : gov.en}</option>)}
      </select>
    </label>
    <label className="delivery-field">
      <span>{copy.addressField}</span>
      <input type="text" value={customer.address} onChange={(e)=>updateCustomer("address", e.target.value)} placeholder={copy.addressPlaceholder} aria-required="true" />
    </label>
    <p className="shipping-whatsapp-note">{copy.shippingNote}</p>
  </div>
  {freeDiscount>0&&<div className="cart-subtotal-before"><span>{lang==="ar"?"المجموع قبل العرض":"Total before offer"}</span><del>{subtotalBeforeOffer} {copy.priceUnit}</del></div>}<div className="cart-total"><span>{lang==="ar"?"الإجمالي (بدون الشحن)":"Subtotal (excl. shipping)"}</span><strong>{total} {copy.priceUnit}</strong></div>{saved>0&&<p className="cart-savings">{lang==="ar"?`وفرت في هذا الطلب: ${saved} ج.م (شامل عرض العطر الثالث مجانًا)`:`You save: ${saved} EGP (3rd fragrance FREE applied)`}</p>}{checkoutError&&<p className="checkout-error" role="alert">{checkoutError}</p>}<a className="cart-checkout" href={customerInfoComplete?checkoutUrl:undefined} onClick={handleCheckout} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>{copy.checkout}</a></>:<p>{copy.emptyCart}</p>}<a href="/shop" onClick={(e)=>{e.preventDefault();close();onGallery?.()}}>{copy.shop}<ArrowRight className={lang==="ar"?"rtl-icon":""} size={16}/></a></>}</aside></div>}
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
    <div className="price-values">{discount > 0 && <span className="old-price">{product.listPrice}{!compact && <> <small>{copy.priceUnit}</small></>}</span>}<strong>{product.offerPrice} <small>{copy.priceUnit}</small></strong></div>
  </div>;
}

function SocialLinks({ lang = "en", onPolicy }) {
  const links = [
    { name:"Instagram", url:"https://www.instagram.com/starryfragrances/", Icon:Instagram },
    { name:"Facebook", url:"https://www.facebook.com/starryfragrances", Icon:Facebook },
  ];
  return <div className="landing-footer-links"><nav className="social-links" aria-label="Follow STARRY">
    {links.map(({name,url,Icon}) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`STARRY on ${name}`}><Icon size={15} aria-hidden="true"/><span>{name}</span></a>)}
  </nav><a className="policy-link" href="/return-exchange-policy" onClick={onPolicy ? (event) => { event.preventDefault(); onPolicy(); } : undefined}>{lang === "ar" ? <ArrowLeft size={13} aria-hidden="true"/> : <ArrowRight size={13} aria-hidden="true"/>}<span>{labels[lang].policyLink}</span></a></div>;
}

function Landing({ onStart, onGallery, onPolicy, onHome, lang, setLang }) {
  return <main className="screen landing" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header onGallery={onGallery} onStartQuiz={onStart} onPolicy={onPolicy} onHome={onHome} lang={lang} setLang={setLang}/>
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

function Quiz({ onFinish, onExit, onGallery, onStartQuiz, onPolicy, onHome, lang, setLang, step, setStep, answers, setAnswers }) {
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
    <Header back={step > 0} onBack={back} onGallery={onGallery} onStartQuiz={onStartQuiz} onPolicy={onPolicy} onHome={onHome} lang={lang} setLang={setLang}/>
    <div className="quiz-wrap">
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

function Analyzing({ lang, setLang, onBack, onGallery, onStartQuiz, onPolicy, onHome }) {
  const copy = labels[lang];
  return <main className="screen analyzing" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back onBack={onBack} onGallery={onGallery} onStartQuiz={onStartQuiz} onPolicy={onPolicy} onHome={onHome} lang={lang} setLang={setLang}/><div className="analysis-symbol">✦</div><h2>{lang === "ar" ? copy.analyzing : <>ANALYZING<br/>YOUR PREFERENCES</>}</h2><p>{copy.reading}<br/>{copy.finding}</p><div className="loader"><span/></div></main>;
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
  const [shareStatus,setShareStatus]=useState("");
  async function share() {
    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch { /* Proceed if font readiness rejects */ }
    }
    const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) {setShareStatus(copy.shareError);return;}
    const localized = lang === "ar" ? productCopy[product.id] : product;
    const bodyFont = lang === "ar" ? '"Tajawal", "Cairo", sans-serif' : '"Montserrat", Arial, sans-serif';
    const displayFont = '"Playfair Display", Georgia, serif';
    const background = ctx.createLinearGradient(0, 0, 1080, 1350);
    background.addColorStop(0, "#111d2a"); background.addColorStop(.56, "#07111b"); background.addColorStop(1, "#03070c");
    ctx.fillStyle = background; ctx.fillRect(0, 0, 1080, 1350);
    ctx.strokeStyle = "rgba(222,177,105,.56)"; ctx.lineWidth = 2; ctx.strokeRect(34, 34, 1012, 1282);
    ctx.strokeStyle = "rgba(222,177,105,.2)"; ctx.lineWidth = 1; ctx.strokeRect(47, 47, 986, 1256);
    ctx.textAlign = "center"; ctx.direction = lang === "ar" ? "rtl" : "ltr";
    ctx.fillStyle = "#dfb56f"; ctx.font = `38px ${displayFont}`; ctx.fillText("✦  STARRY  ✦", 540, 112);
    ctx.fillStyle = "#bdad91"; ctx.font = `500 20px ${bodyFont}`; ctx.fillText(lang === "ar" ? "توقيعك العطري" : "YOUR STARRY SIGNATURE", 540, 166);
    let nameSize = 67; ctx.font = `bold ${nameSize}px ${displayFont}`;
    while (ctx.measureText(product.name).width > 900 && nameSize > 42) { nameSize -= 2; ctx.font = `bold ${nameSize}px ${displayFont}`; }
    ctx.fillStyle = "#f7edda"; ctx.direction = "ltr"; ctx.fillText(product.name, 540, 245);
    ctx.direction = lang === "ar" ? "rtl" : "ltr";
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
    ctx.fillStyle = "#efe2cb"; ctx.font = `500 26px ${bodyFont}`; ctx.fillText(localized.positioning, 540, 973, 900);
    ctx.fillStyle = "#07111b"; ctx.strokeStyle = "#d9ae69"; ctx.lineWidth = 2;
    ctx.beginPath(); traceRoundedRect(ctx, 382, 1014, 316, 142, 20); ctx.fill(); ctx.stroke();
    ctx.fillStyle = "#e6bd78"; ctx.font = `bold 72px ${displayFont}`; ctx.fillText(`${product.match}%`, 540, 1090);
    ctx.fillStyle = "#ddd0b8"; ctx.font = `600 16px ${bodyFont}`; ctx.fillText(copy.matchLabel.toUpperCase(), 540, 1129);
    const traits = product.core.slice(0, 3).map((trait) => lang === "ar" ? traitArabic[trait] : trait.toUpperCase());
    ctx.font = `500 18px ${bodyFont}`;
    const totalWidth = traits.reduce((total, trait) => total + Math.max(126, ctx.measureText(trait).width + 38), 0) + (traits.length - 1) * 14;
    let tagX = (1080 - totalWidth) / 2;
    traits.forEach((trait) => {
      ctx.font = `500 18px ${bodyFont}`; const chipWidth = Math.max(126, ctx.measureText(trait).width + 38);
      ctx.fillStyle = "rgba(222,177,105,.08)"; ctx.strokeStyle = "rgba(222,177,105,.42)"; ctx.lineWidth = 1;
      ctx.beginPath(); traceRoundedRect(ctx, tagX, 1190, chipWidth, 42, 21); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#e3d2b3"; ctx.fillText(trait, tagX + chipWidth / 2, 1217, chipWidth - 12); tagX += chipWidth + 14;
    });
    ctx.fillStyle = "#aa9a7e"; ctx.font = lang === "ar" ? `500 19px ${bodyFont}` : `17px ${displayFont}`; ctx.fillText(lang === "ar" ? "عطر يشبهك" : "A fragrance that feels like you", 540, 1281);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {setShareStatus(copy.shareError);return;}
    const file = new File([blob], "my-starry-signature.png", { type: "image/png" });
    try {
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: `My STARRY match: ${product.name}`, files: [file] });
        setShareStatus(copy.shareSuccess);track("share_result",{productId:product.id});return;
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = file.name; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);setShareStatus(copy.shareSuccess);track("share_result",{productId:product.id});
  }
  return <div className="share-area"><button className="share-btn" onClick={share}><Share2 size={16}/>{copy.share}</button>{shareStatus&&<div className="success-toast" role="status" aria-live="polite">{shareStatus}</div>}</div>;
}

function matchedAnswers(product, answers, lang) {
  return questions.map((question, index) => {
    const option = question.options.find((item) => item.id === answers[index]?.id);
    return option && (option.weights[product.id] || 0) > 0 ? option.reasonTag[lang] : null;
  }).filter(Boolean).slice(0, 3);
}

function MatchCard({ product, secondary, answers, onOpen, onOpenSecondary, onGallery, onStartQuiz, onPolicy, onHome, onRetake, lang, setLang }) {
  const copy = labels[lang];
  const localized = lang === "ar" ? productCopy[product.id] : product;
  const message = lang === "ar" ? `مرحبًا، أرغب في طلب عطر ${product.name} حجم ${product.size} بسعر ${product.offerPrice} جنيه من STARRY.` : `I want to order ${product.name} (${product.size}) at EGP ${product.offerPrice} from STARRY.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const bundleUrl = secondary ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === "ar" ? `مرحبًا، أرغب في الاستفسار عن طلب العطرين المرشحين لي: ${product.name} و${secondary.name}. برجاء تأكيد السعر والتوافر.` : `Hello, I would like to ask about ordering both recommended fragrances: ${product.name} and ${secondary.name}. Please confirm the price and availability.`)}` : "";
  return <main className="screen result" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header onGallery={onGallery} onStartQuiz={onStartQuiz} onPolicy={onPolicy} onHome={onHome} lang={lang} setLang={setLang}/>
    <div className="result-top"><span>{copy.match}</span><h1 dir="ltr">{product.name}</h1><p>{localized.positioning}</p>{product.inspiredBy && <div className="inspired-badge"><span>{copy.inspiredBy}:</span> <strong dir="ltr">{product.inspiredBy}</strong></div>}</div>
    <div className="product-stage result-art"><ResponsiveImage name={product.resultImage} alt={product.name}/><div className="match-badge">{product.match}%<small>{copy.matchLabel}</small></div></div>
    <PerformanceGrid product={product} lang={lang}/>
    <div className="result-copy"><p className="score-disclaimer">{copy.scoreDisclaimer}</p><h3>{copy.why}</h3><p>{localized.description}</p><p className="match-reasons">{matchedAnswers(product, answers, lang).join(" · ")}</p><h3 className="profile-title">{copy.profile}</h3><DNA product={product} lang={lang}/></div>
    <section className="best-for"><h3>{copy.bestFor}</h3><div className="occasion-chips">{product.bestFor[lang].map((item) => <span key={item}>{item}</span>)}</div></section>
    {secondary && <button type="button" className="secondary-match" onClick={onOpenSecondary} aria-label={lang === "ar" ? `عرض تفاصيل عطر ${secondary.name}` : `View details for ${secondary.name}`}><span>{copy.second}</span><strong dir="ltr">{secondary.name}</strong><b>{secondary.match}% <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={14}/></b></button>}
    {secondary && <a className="bundle-inquiry" href={bundleUrl} onClick={() => track("quiz_bundle_inquiry",{primary:product.id,secondary:secondary.id})} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>{lang === "ar" ? "استفسر عن العطرين معًا" : "Ask about ordering both"}</a>}
    <section className="purchase-panel result-purchase"><Price product={product} lang={lang}/><div className="order-actions"><a className="whatsapp-btn" href={whatsappUrl} onClick={() => track("whatsapp_direct_order",{productId:product.id,source:"result"})} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>{copy.order}</a><a className="instagram-btn" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer"><Instagram size={17}/>{copy.orderInstagram}</a></div></section>
    <AddToCartButton product={product} lang={lang}/>
    <button className="explore-btn" onClick={onOpen}>{copy.explore} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={14}/></button>
    <ShareButton product={product} lang={lang}/><button className="retake-btn" onClick={onRetake}><RotateCcw size={14}/>{copy.retake}</button>
  </main>;
}

function dnaSimilarity(first, second) {
  const traits = new Set([...Object.keys(first.dna), ...Object.keys(second.dna)]);
  const distance = [...traits].reduce((sum, trait) => sum + Math.abs((first.dna[trait] || 0) - (second.dna[trait] || 0)), 0);
  return 1 - distance / (traits.size * 5);
}

const accordArabic = { Woody:"خشبي", "Warm Spicy":"توابل دافئة", Powdery:"بودري ناعم", Fruity:"فاكهي", Fresh:"منعش", Sweet:"حلو", Musky:"مسكي", Floral:"زهري", Amber:"عنبر", Creamy:"كريمي", Clean:"نظيف", Vanilla:"فانيليا", Spicy:"متبّل", Warm:"دافئ", Suede:"جلد شامواه", Green:"أخضر", Citrus:"حمضيات" };
const noteArabic = {
  Fig:"تين", "Black Tea":"شاي أسود", Cardamom:"هيل", Iris:"سوسن", Vetiver:"فيتيفير", Sandalwood:"خشب الصندل", "Tonka Bean":"حبوب التونكا",
  Cedar:"خشب الأرز", Amber:"عنبر", "Ylang-Ylang":"يلانغ يلانغ", "Gurjun Balsam":"بلسم الجورجون", Myrrh:"مُرّ", Vanilla:"فانيليا", Benzoin:"الجاوي",
  Pear:"كمثرى", Bergamot:"برغموت", "Orange Blossom":"زهر البرتقال", Jasmine:"ياسمين", Musks:"مسك", "Amber Woods":"أخشاب عنبرية",
  Frankincense:"لبان", Hazelnut:"بندق", Saffron:"زعفران", Rose:"ورد", "Jasmine Sambac":"ياسمين سامباك", Osmanthus:"أوسمانثوس",
  "Red Apple":"تفاح أحمر", Lychee:"ليتشي", "Black Currant":"كشمش أسود", "Pink Grapefruit":"جريب فروت وردي", "Wild Berries":"توت بري", Sugar:"سكر", Musk:"مسك",
  "Pink Pepper":"فلفل وردي", "Black Pepper":"فلفل أسود", Elemi:"إليمي", Olibanum:"لبان", Cedarwood:"خشب الأرز", Mint:"نعناع", Grapefruit:"جريب فروت", Lavender:"لافندر",
  "Green Apple":"تفاح أخضر", Cranberry:"توت بري أحمر", "Cotton Flower":"زهرة القطن", Cactus:"صبار", Almond:"لوز", Coffee:"قهوة", Tuberose:"مسك الروم", Cocoa:"كاكاو", Akigalawood:"خشب أكيجالا"
};

function Details({ product, onBack, onGallery, onStartQuiz, onPolicy, onHome, onOpen, lang, setLang }) {
  const copy = labels[lang];
  const message = lang === "ar" ? `مرحبًا، أرغب في طلب عطر ${product.name} حجم ${product.size} بسعر ${product.offerPrice} جنيه من STARRY.` : `I want to order ${product.name} (${product.size}) at EGP ${product.offerPrice} from STARRY.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const localized = lang === "ar" ? productCopy[product.id] : product;
  const similar = products.filter((item) => item.id !== product.id).sort((a,b) => dnaSimilarity(product,b) - dnaSimilarity(product,a)).slice(0,2);
  return <main className="screen details" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back onBack={onBack} onGallery={onGallery} onStartQuiz={onStartQuiz} onPolicy={onPolicy} onHome={onHome} lang={lang} setLang={setLang}/><div className="details-bottle detail-art"><ResponsiveImage name={product.image} alt={product.name}/></div><h1 dir="ltr">{product.name}</h1><p className="product-positioning">{localized.positioning}</p>
    {product.inspiredBy && <div className="inspired-badge details-inspired"><span>{copy.inspiredBy}:</span> <strong dir="ltr">{product.inspiredBy}</strong></div>}
    <PerformanceGrid product={product} lang={lang}/>
    <section className="purchase-panel"><Price product={product} lang={lang}/><div className="order-actions"><a className="whatsapp-btn" href={whatsappUrl} onClick={() => track("whatsapp_direct_order",{productId:product.id,source:"details"})} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>{copy.order}</a><a className="instagram-btn" href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer"><Instagram size={17}/>{copy.orderInstagram}</a></div><AddToCartButton product={product} lang={lang}/><a className="product-policy-link" href="/return-exchange-policy" onClick={(e) => { if (onPolicy) { e.preventDefault(); onPolicy(); } }}>{copy.policyLink}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={13}/></a></section>
    <a className="mobile-order-dock" href={whatsappUrl} onClick={() => track("whatsapp_direct_order",{productId:product.id,source:"mobile_dock"})} target="_blank" rel="noopener noreferrer"><span className="mobile-order-price"><small>{product.size}</small><strong>{product.offerPrice} <i>{copy.priceUnit}</i></strong></span><span className="mobile-order-cta"><MessageCircle size={17}/>{copy.order}</span></a>
    <section className="product-description"><h2>{copy.description}</h2><p>{localized.description}</p>{lang === "ar" && localized.feeling && <p className="product-feeling"><strong>الإحساس العام:</strong> {localized.feeling}</p>}</section>
    <section className="accords"><h3>{lang === "ar" ? "الروائح الأساسية" : "MAIN ACCORDS"}</h3>{product.accords.map((a) => <div className="accord" key={a.name}><span className="accord-label"><span>{a.name}</span>{lang === "ar" && <small>{accordArabic[a.name] || a.name}</small>}</span><div><i style={{width:`${a.level}%`}}/></div></div>)}</section>
    <section><h3 className="section-title">{lang === "ar" ? "هرم العطر" : "FRAGRANCE PYRAMID"}</h3><div className="notes-grid">{Object.entries(product.notes).map(([type,list]) => <div className="note-card" key={type}><small>{lang === "ar" ? ({"Top Notes":"مقدمة العطر","Heart Notes":"قلب العطر","Base Notes":"قاعدة العطر"}[type] || type) : type}</small><strong>{lang === "ar" ? <span className="note-list">{list.map((note) => <span className="note-entry" key={note}><span dir="ltr">{note}</span><small dir="rtl">({noteArabic[note] || note})</small></span>)}</span> : list.join(" · ")}</strong></div>)}</div></section>
    <section className="similar-section"><h2>{copy.mayLike}</h2><div className="similar-grid">{similar.map((item) => <button type="button" className="similar-card" key={item.id} onClick={() => onOpen(item)}><span className="similar-art"><ResponsiveImage name={item.image} alt="" sizes="(max-width: 700px) 42vw, 220px"/></span><strong dir="ltr">{item.name}</strong><span className="similar-price">{item.offerPrice} {copy.priceUnit}</span></button>)}</div></section>
  </main>;
}

function Gallery({ onAgain, onBack, onGallery, onStartQuiz, onPolicy, onHome, onOpen, lang, setLang }) {
  const [sort, setSort] = useState("featured");
  const [category, setCategory] = useState("all");
  const [compareIds, setCompareIds] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const compareRef = React.useRef(null);
  const copy = labels[lang];

  const categories = [
    { id: "all", label: copy.filterAll },
    { id: "unisex", label: copy.filterUnisex },
    { id: "women", label: copy.filterWomen },
    { id: "men", label: copy.filterMen },
    { id: "winter", label: copy.filterWinter },
    { id: "summer", label: copy.filterSummer }
  ];

  const filteredProducts = products.filter((product) => {
    if (category === "all") return true;
    if (category === "unisex" || category === "women" || category === "men") return product.gender === category;
    if (category === "winter") return product.season === "winter" || product.season === "all";
    if (category === "summer") return product.season === "summer" || product.season === "all";
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a,b) => sort === "price-low" ? a.offerPrice-b.offerPrice : sort === "price-high" ? b.offerPrice-a.offerPrice : sort === "name" ? a.name.localeCompare(b.name) : products.indexOf(a)-products.indexOf(b));
  const compareProducts = compareIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  useEffect(() => { if (showComparison) compareRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }); }, [showComparison]);
  function toggleCompare(productId) {
    setCompareIds((current) => current.includes(productId) ? current.filter((id) => id !== productId) : current.length < 2 ? [...current, productId] : current);
    setShowComparison(false);
  }
  return <main className={`screen gallery${compareIds.length ? " has-compare" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}><Header back onBack={onBack} onGallery={onGallery} onStartQuiz={onStartQuiz} onPolicy={onPolicy} onHome={onHome} lang={lang} setLang={setLang}/><div className="shop-heading"><span className="shop-kicker">✦ STARRY FRAGRANCE HOUSE ✦</span><h1>{copy.shopTitle}</h1><p className="shop-offer">{copy.shopIntro}<small>{copy.shopOfferDates}</small></p></div>
    <div className="category-pills" role="tablist" aria-label={lang === "ar" ? "تصنيف العطور" : "Filter fragrances"}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          role="tab"
          aria-selected={category === cat.id}
          className={`category-pill${category === cat.id ? " active" : ""}`}
          onClick={() => { setCategory(cat.id); track("filter_category", { category: cat.id }); }}
        >
          {cat.label}
        </button>
      ))}
    </div>
    <label className="sort-control"><span><SlidersHorizontal size={15}/>{copy.sort}</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label={copy.sort}><option value="featured">{copy.featured}</option><option value="price-low">{copy.priceLow}</option><option value="price-high">{copy.priceHigh}</option><option value="name">{copy.nameSort}</option></select></label>
    <div className="product-grid">{sortedProducts.map((product) => { const isCompared = compareIds.includes(product.id); return <article key={product.id} className={`mini-product${isCompared ? " is-compared" : ""}`}><button type="button" className="mini-product-open" onClick={() => onOpen(product)} aria-label={`${product.name}, ${product.size}, ${product.offerPrice} ${copy.priceUnit}`}><span className="mini-bottle"><ResponsiveImage name={product.image} alt="" sizes="(max-width: 600px) 44vw, 260px"/><span className="card-longevity-pill"><Clock size={10}/>{product.longevity[lang]}</span></span><span className="mini-name" dir="ltr">{product.name}</span>{product.inspiredBy ? <span className="card-inspired" dir="ltr">{product.inspiredBy}</span> : <span className="card-inspired">{copy.genderMap[product.gender]}</span>}<Price product={product} lang={lang} compact/><span className="card-detail-link">{copy.viewDetails} <ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={12}/></span></button><div className="product-card-actions"><AddToCartButton product={product} lang={lang}/><button type="button" className="compare-pick" aria-pressed={isCompared} disabled={compareIds.length === 2 && !isCompared} onClick={() => toggleCompare(product.id)}>{isCompared ? copy.added : copy.compare}</button></div></article>; })}</div>
    <section className="discovery-set"><span className="drawer-kicker">STARRY DISCOVERY</span><h2>{copy.bundle}</h2><p>{copy.bundleCopy}</p><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === "ar" ? "مرحبًا، أود الاستفسار عن مجموعة اكتشاف عطور STARRY." : "Hello, I would like to ask about a STARRY fragrance discovery set.")}`} onClick={() => track("discovery_set_inquiry")} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/>{lang === "ar" ? "استفسر عبر واتساب" : "Ask on WhatsApp"}</a></section>
    {compareIds.length > 0 && !showComparison && <div className="compare-dock"><span>{compareIds.length === 1 ? copy.compareOneMore : copy.compareNow}</span><button type="button" disabled={compareIds.length < 2} onClick={() => setShowComparison(true)}>{compareIds.length === 1 ? `${compareIds.length}/2` : copy.compareNow}</button></div>}
    {showComparison && compareProducts.length === 2 && <section className="compare-panel" ref={compareRef} aria-labelledby="compare-title"><header className="compare-header"><h2 id="compare-title">{copy.compareTitle}</h2><button type="button" onClick={() => setShowComparison(false)}>{copy.close}</button></header><div className="compare-heads"><span aria-hidden="true"/>{compareProducts.map((product) => <div className="compare-product-head" key={product.id}><ResponsiveImage name={product.image} alt="" sizes="(max-width: 600px) 30vw, 180px"/><strong dir="ltr">{product.name}</strong></div>)}</div><div className="compare-row"><span>{copy.compareSize}</span>{compareProducts.map((product) => <b key={product.id}>{product.size}</b>)}</div><div className="compare-row"><span>{copy.comparePrice}</span>{compareProducts.map((product) => <b className="compare-price" key={product.id}>{product.offerPrice} <small>{copy.priceUnit}</small>{product.listPrice > product.offerPrice && <del>{product.listPrice} {copy.priceUnit}</del>}</b>)}</div><div className="compare-row"><span>{copy.compareLongevity}</span>{compareProducts.map((product) => <b key={product.id}>{product.longevity[lang]}</b>)}</div><div className="compare-row"><span>{copy.compareScent}</span>{compareProducts.map((product) => <b key={product.id}>{(lang === "ar" ? productCopy[product.id]?.positioning : product.positioning) || product.positioning}</b>)}</div><div className="compare-row"><span>{copy.compareNotes}</span>{compareProducts.map((product) => <b key={product.id}>{product.accords.slice(0,3).map((accord) => lang === "ar" ? (accordArabic[accord.name] || accord.name) : accord.name).join(" · ")}</b>)}</div><div className="compare-actions">{compareProducts.map((product) => <button type="button" key={product.id} onClick={() => onOpen(product)}>{copy.viewDetails}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={13}/></button>)}</div></section>}
    <section className="shop-quiz-cta"><Sparkles size={19}/><h2>{copy.notSure}</h2><a href="/quiz" onClick={(event) => {event.preventDefault();onAgain();}}>{copy.findScent}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></a></section><SocialLinks lang={lang} onPolicy={onPolicy}/><div className="footer-brand">STARRY<br/><small>FRAGRANCE HOUSE</small></div></main>;
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

function PolicyPage({ lang, setLang, onBack, onGallery, onStartQuiz, onPolicy, onHome }) {
  const copy = policyCopy[lang];
  return <main className="screen policy-page" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
    <Header back onBack={onBack} onGallery={onGallery} onStartQuiz={onStartQuiz} onPolicy={onPolicy} onHome={onHome} lang={lang} setLang={setLang}/>
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
      <a className="policy-back-link" href="/shop" onClick={(event) => { event.preventDefault(); onBack(); }}>{lang === "ar" ? "رجوع" : "Go back"}<ArrowRight className={lang === "ar" ? "rtl-icon" : ""} size={15}/></a>
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
  if (pathname === "/result") return "result";
  if (pathname.startsWith("/fragrance/") || pathname.startsWith("/product/")) return "details";
  return "landing";
}

function pathForScreen(screen, product) {
  if (screen === "policy") return "/return-exchange-policy";
  if (screen === "gallery") return "/shop";
  if (screen === "quiz") return "/quiz";
  if (screen === "result") return "/result";
  if (screen === "details" && product) return `/fragrance/${product.id}`;
  return "/";
}

function App() {
  const [screen, setScreen] = useState(() => screenFromPath(window.location.pathname));
  const [answers, setAnswers] = useState(readAnswers);
  const [step, setStep] = useState(readStep);
  const [selected, setSelected] = useState(null);
  const [detailsReturnScreen, setDetailsReturnScreen] = useState("result");
  const [policyReturnScreen, setPolicyReturnScreen] = useState("landing");
  const [lang, setLang] = useState(readLanguage);
  const analysisTimer = React.useRef(null);
  const results = useMemo(() => scoreProducts(answers), [answers]);

  useEffect(() => {
    const match = window.location.pathname.match(/^\/(?:fragrance|product)\/([^/]+)$/);
    if (match) setSelected(products.find((product) => product.id === decodeURIComponent(match[1])) || products[0]);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [screen, selected]);

  const goHome = () => {
    window.clearTimeout(analysisTimer.current);
    if (window.location.pathname !== "/") window.history.pushState({ screen: "landing" }, "", "/");
    setScreen("landing");
  };

  const openGallery = () => {
    window.clearTimeout(analysisTimer.current);
    if (window.location.pathname !== "/shop") window.history.pushState({ screen: "gallery" }, "", "/shop");
    setScreen("gallery");
  };

  function openPolicy() {
    window.clearTimeout(analysisTimer.current);
    if (screen !== "policy") setPolicyReturnScreen(screen === "analyzing" ? "quiz" : screen);
    if (window.location.pathname !== "/return-exchange-policy") {
      window.history.pushState({ screen: "policy", returnTo: screen }, "", "/return-exchange-policy");
    }
    setScreen("policy");
  }

  function backFromPolicy() {
    const targetScreen = policyReturnScreen && policyReturnScreen !== "policy" ? policyReturnScreen : "landing";
    const targetPath = pathForScreen(targetScreen, selected || products[0]);
    window.history.pushState({ screen: targetScreen }, "", targetPath);
    setScreen(targetScreen);
  }

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, [lang]);
  useEffect(() => { try { localStorage.setItem("starry-quiz-language", lang); } catch { /* Keep language selection for the current visit. */ } }, [lang]);

  useEffect(() => {
    function syncRoute() {
      window.clearTimeout(analysisTimer.current);
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
    const isResult = screen === "result";
    document.title = isPolicy
      ? `${policyCopy[lang].title} | STARRY`
      : isShop
      ? `${labels[lang].shopTitle} | STARRY`
      : isDetails
      ? `${selected?.name || "Fragrance"} | STARRY`
      : isResult
      ? `${results[0]?.name || "Your Match"} — ${labels[lang].match} | STARRY`
      : "STARRY — Find Your Signature Scent";
  }, [screen, lang, selected, results]);

  function openDetails(product, returnScreen = "gallery") {
    setSelected(product);
    setDetailsReturnScreen(returnScreen);
    window.history.pushState({ screen: "details", productId: product.id }, "", `/fragrance/${product.id}`);
    setScreen("details");
    track("product_view", { productId: product.id, name: product.name, from: returnScreen });
  }

  useEffect(() => { writeSessionValue("starry-quiz-answers", JSON.stringify(answers)); }, [answers]);
  useEffect(() => { if(screen==="gallery") track("shop_open"); }, [screen]);
  useEffect(() => { writeSessionValue("starry-quiz-step", String(step)); }, [step]);
  useEffect(() => () => window.clearTimeout(analysisTimer.current), []);

  function finish(value) {
    setAnswers(value);
    const ranked = scoreProducts(value);
    const topProduct = ranked[0];
    try { localStorage.setItem(RESULT_STORAGE,JSON.stringify({answers:value,productId:topProduct?.id,savedAt:Date.now()})); } catch { /* The result stays available during this visit. */ }
    track("quiz_complete", { topMatch: topProduct?.id, matchScore: topProduct?.match });
    setScreen("analyzing");
    window.clearTimeout(analysisTimer.current);
    analysisTimer.current = window.setTimeout(() => {
      if (window.location.pathname !== "/result") {
        window.history.pushState({ screen: "result", productId: topProduct?.id }, "", "/result");
      }
      setScreen("result");
    }, 1100);
  }

  function exitAnalysis() {
    window.clearTimeout(analysisTimer.current);
    if (window.location.pathname !== "/quiz") window.history.pushState({ screen: "quiz" }, "", "/quiz");
    setScreen("quiz");
  }

  function retake() {
    window.clearTimeout(analysisTimer.current);
    if (window.location.pathname !== "/quiz") window.history.pushState({screen:"quiz"},"", "/quiz");
    setAnswers([]); setStep(0); setSelected(null);
    try { localStorage.removeItem(RESULT_STORAGE); } catch { /* Retaking still works. */ }
    removeSessionValue("starry-quiz-answers"); removeSessionValue("starry-quiz-step");
    setScreen("quiz");
  }

  function startQuiz() {
    window.clearTimeout(analysisTimer.current);
    const completed = questions.every((_, index) => Boolean(answers[index]?.id));
    if (completed) {
      setAnswers([]); setStep(0); setSelected(null);
      removeSessionValue("starry-quiz-answers"); removeSessionValue("starry-quiz-step");
    }
    if (window.location.pathname !== "/quiz") window.history.pushState({screen:"quiz"},"", "/quiz");
    setScreen("quiz");
  }

  function exitQuiz() {
    goHome();
  }

  if (screen === "landing") return <Landing onStart={startQuiz} onGallery={openGallery} onPolicy={openPolicy} onHome={goHome} lang={lang} setLang={setLang}/>;
  if (screen === "policy") return <PolicyPage lang={lang} setLang={setLang} onBack={backFromPolicy} onGallery={openGallery} onStartQuiz={startQuiz} onPolicy={openPolicy} onHome={goHome}/>;
  if (screen === "quiz") return <Quiz onFinish={finish} onExit={exitQuiz} onGallery={openGallery} onStartQuiz={startQuiz} onPolicy={openPolicy} onHome={goHome} lang={lang} setLang={setLang} step={step} setStep={setStep} answers={answers} setAnswers={setAnswers}/>;
  if (screen === "analyzing") return <Analyzing lang={lang} setLang={setLang} onBack={exitAnalysis} onGallery={openGallery} onStartQuiz={startQuiz} onPolicy={openPolicy} onHome={goHome}/>;
  if (screen === "result") { const product = results[0] || products[0]; const secondary = results[1]; return <MatchCard product={product} secondary={secondary} answers={answers} lang={lang} setLang={setLang} onRetake={retake} onOpen={() => openDetails(product,"result")} onOpenSecondary={() => {if (secondary) openDetails(secondary,"result");}} onGallery={openGallery} onStartQuiz={startQuiz} onPolicy={openPolicy} onHome={goHome}/>; }
  if (screen === "details") return <Details product={selected || products[0]} lang={lang} setLang={setLang} onBack={() => { if (detailsReturnScreen === "details") { window.history.back(); return; } const path = pathForScreen(detailsReturnScreen, selected || products[0]); window.history.pushState({screen:detailsReturnScreen},"",path); setScreen(detailsReturnScreen); }} onGallery={openGallery} onStartQuiz={startQuiz} onPolicy={openPolicy} onHome={goHome} onOpen={(product) => openDetails(product,"details")}/>;
  if (screen === "gallery") return <Gallery lang={lang} setLang={setLang} onAgain={retake} onBack={goHome} onGallery={openGallery} onStartQuiz={startQuiz} onPolicy={openPolicy} onHome={goHome} onOpen={(product) => openDetails(product,"gallery")}/>;
  return null;
}

createRoot(document.getElementById("root")).render(<App/>);

