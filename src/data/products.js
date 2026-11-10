export const TRAITS = [
  "fresh","fruity","floral","sweet","vanilla","woody","amber","spicy",
  "creamy","powdery","dark","sensual","elegant","mysterious","playful","energetic",
  "warm","clean","luxurious","bold"
];

const dna = (values) => Object.fromEntries(TRAITS.map((t) => [t, values[t] ?? 0]));

export const products = [
  {
    id: "elite", name: "THE ELITE", image: "the-elite.png", resultImage: "the-elite-result-960.webp", size: "50ml", listPrice: 775, offerPrice: 775,
    positioning: "Woody. Warm. Sophisticated.",
    inspiredBy: "BDK Gris Charnel EDP",
    longevity: { en: "+8 Hours", ar: "+8 ساعات" },
    sillage: { en: "Balanced to Strong", ar: "متوسط إلى قوي" },
    gender: "unisex",
    season: "winter",
    bestForKeys: ["everyday","work"], bestFor: { en:["Work & meetings","Everyday wear","Formal occasions"], ar:["الشغل والاجتماعات","الاستخدام اليومي","المناسبات الرسمية"] },
    description: "You gravitate toward refined woods, warm spices and a polished presence — a scent that feels confident, sophisticated and effortlessly put together.",
    dna: dna({ woody:5, spicy:4, powdery:4, elegant:5, warm:4, sensual:4, luxurious:5, creamy:3, sweet:3, dark:2 }),
    core: ["woody","elegant","warm","luxurious"],
    accords: [{name:"Woody",level:90},{name:"Warm Spicy",level:72},{name:"Powdery",level:68},{name:"Creamy",level:54}],
    notes: { "Top Notes":["Fig","Black Tea","Cardamom"], "Heart Notes":["Iris","Vetiver"], "Base Notes":["Sandalwood","Tonka Bean"] }
  },
  {
    id: "starry-amber", name: "STARRY AMBER", image: "starry-amber.png", resultImage: "starry-amber-result-960.webp", size: "50ml", listPrice: 775, offerPrice: 775,
    positioning: "Deep. Warm. Mysterious.",
    inspiredBy: "Xerjoff Amber Star",
    longevity: { en: "9+ Hours", ar: "+9 ساعات" },
    sillage: { en: "Strong", ar: "قوي" },
    gender: "unisex",
    season: "winter",
    bestForKeys: ["date","social"], bestFor: { en:["Date nights","Evening wear","Cool weather"], ar:["المواعيد الليلية","السهرات","الأجواء الباردة"] },
    description: "Your choices lean toward resinous warmth, rich woods and an intriguing presence — luxurious, mysterious and made for the night.",
    dna: dna({ amber:5, woody:4, sweet:4, dark:4, warm:5, mysterious:5, luxurious:5, sensual:4, vanilla:3, spicy:2 }),
    core: ["amber","warm","mysterious","luxurious"],
    accords: [{name:"Amber",level:96},{name:"Woody",level:82},{name:"Warm",level:88},{name:"Vanilla",level:56}],
    notes: { "Top Notes":["Cedar","Amber","Ylang-Ylang"], "Heart Notes":["Gurjun Balsam","Iris","Myrrh"], "Base Notes":["Vanilla","Sandalwood","Benzoin"] }
  },
  {
    id: "tropical-bomb", name: "TROPICAL BOMB", image: "tropical-bomb.png", resultImage: "tropical-bomb-result-960.webp", size: "50ml", listPrice: 575, offerPrice: 575,
    positioning: "Fresh. Vibrant. Unforgettable.",
    inspiredBy: "Ex Nihilo Blue Talisman Extrait",
    longevity: { en: "+8 Hours", ar: "+8 ساعات" },
    sillage: { en: "Strong", ar: "قوي" },
    gender: "unisex",
    season: "summer",
    bestForKeys: ["everyday","date","social"], bestFor: { en:["Social occasions","Daytime outings","Summer days"], ar:["المناسبات والخروجات","مشاوير النهار","أيام الصيف"] },
    description: "Bright, juicy and energetic. You want a fragrance that feels alive, playful and impossible to overlook.",
    dna: dna({ fruity:5, fresh:4, sweet:4, energetic:5, playful:5, vanilla:3, floral:3, creamy:2, sensual:2 }),
    core: ["fruity","playful","energetic","fresh"],
    accords: [{name:"Fruity",level:96},{name:"Fresh",level:84},{name:"Sweet",level:70},{name:"Musky",level:48}],
    notes: { "Top Notes":["Pear","Bergamot"], "Heart Notes":["Orange Blossom","Jasmine"], "Base Notes":["Sandalwood","Vanilla","Musks","Amber Woods"] }
  },
  {
    id: "perla", name: "PERLA", image: "perla.png", resultImage: "perla-result-960.webp", size: "50ml", listPrice: 500, offerPrice: 500,
    positioning: "Soft. Elegant. Radiant.",
    inspiredBy: null,
    longevity: { en: "+9 Hours", ar: "+9 ساعات" },
    sillage: { en: "Strong", ar: "قوي" },
    gender: "women",
    season: "all",
    bestForKeys: ["everyday","work","date","social"], bestFor: { en:["Work & daytime","Dates","Special occasions"], ar:["الشغل والنهار","المواعيد","المناسبات الخاصة"] },
    description: "You are drawn to luminous florals, creamy sweetness and elegant sensuality — soft enough to feel beautiful, strong enough to be remembered.",
    dna: dna({ floral:5, sweet:4, amber:4, creamy:4, sensual:5, elegant:5, vanilla:3, warm:3, fruity:3, spicy:2, luxurious:5 }),
    core: ["floral","elegant","sensual","luxurious"],
    accords: [{name:"Floral",level:96},{name:"Amber",level:78},{name:"Creamy",level:80},{name:"Sweet",level:72}],
    notes: { "Top Notes":["Pear","Frankincense","Hazelnut"], "Heart Notes":["Saffron","Rose","Jasmine Sambac","Osmanthus"], "Base Notes":["Sandalwood","Vanilla","Akigalawood","Amber"] }
  },
  {
    id: "fizzy-apple", name: "FIZZY APPLE", image: "fizzy-apple.png", resultImage: "fizzy-apple-result-960.webp", size: "50ml", listPrice: 500, offerPrice: 500,
    positioning: "Juicy. Bright. Effortless.",
    inspiredBy: "Kayali Eden Juicy Apple",
    longevity: { en: "6+ Hours", ar: "+6 ساعات" },
    sillage: { en: "Moderate", ar: "متوسط" },
    gender: "women",
    season: "summer",
    bestForKeys: ["everyday","work","social"], bestFor: { en:["Everyday wear","Daytime","Casual outings"], ar:["الاستخدام اليومي","النهار","الخروجات البسيطة"] },
    description: "Your profile is bright, playful and juicy. You want something refreshing, addictive and easy to wear whenever the mood hits.",
    dna: dna({ fresh:5, fruity:5, sweet:4, playful:5, energetic:5, clean:5, floral:3, sensual:2 }),
    core: ["fresh","fruity","playful","energetic"],
    accords: [{name:"Fruity",level:98},{name:"Fresh",level:94},{name:"Sweet",level:70},{name:"Clean",level:72}],
    notes: { "Top Notes":["Red Apple","Lychee","Black Currant","Pink Grapefruit"], "Heart Notes":["Wild Berries","Jasmine","Rose"], "Base Notes":["Sugar","Musk","Vanilla","Amber"] }
  },
  {
    id: "spicy-vanilla", name: "SPICY VANILLA", image: "spicy-vanilla.png", resultImage: "spicy-vanilla-result-960.webp", size: "50ml", listPrice: 620, offerPrice: 620,
    positioning: "Dark. Spicy. Addictive.",
    inspiredBy: "YSL Babycat",
    longevity: { en: "10+ Hours", ar: "+10 ساعات" },
    sillage: { en: "Strong", ar: "قوي" },
    gender: "unisex",
    season: "winter",
    bestForKeys: ["date","social"], bestFor: { en:["Date nights","Nights out","Cool evenings"], ar:["المواعيد الليلية","السهرات","الأمسيات الباردة"] },
    description: "Your choices point toward dark vanilla, warm spice and a magnetic presence — intimate, bold and made to leave a trace.",
    dna: dna({ vanilla:5, spicy:5, sweet:5, dark:5, sensual:5, warm:5, bold:5, amber:4, creamy:4, mysterious:5 }),
    core: ["vanilla","spicy","dark","sensual","bold"],
    accords: [{name:"Vanilla",level:98},{name:"Spicy",level:96},{name:"Warm",level:94},{name:"Suede",level:78}],
    notes: { "Top Notes":["Pink Pepper","Black Pepper","Elemi"], "Heart Notes":["Olibanum","Saffron"], "Base Notes":["Vanilla","Cedarwood","Suede"] }
  },
  {
    id: "star-boy", name: "STAR BOY", image: "star-boy.png", resultImage: "star-boy-result-960.webp", size: "50ml", listPrice: 475, offerPrice: 475,
    positioning: "Fresh. Green. Effortless.",
    inspiredBy: null,
    longevity: { en: "+6 Hours", ar: "+6 ساعات" },
    sillage: { en: "Moderate", ar: "متوسط" },
    gender: "men",
    season: "summer",
    bestForKeys: ["everyday","work"], bestFor: { en:["Everyday wear","Work","Warm days"], ar:["الاستخدام اليومي","الشغل","الأيام الدافئة"] },
    description: "Fresh air, green energy and effortless confidence. Your scent should move with you, not weigh you down.",
    dna: dna({ fresh:5, energetic:5, clean:5, fruity:3, playful:4, woody:2, sweet:1 }),
    core: ["fresh","clean","energetic","playful"],
    accords: [{name:"Fresh",level:96},{name:"Green",level:90},{name:"Citrus",level:82},{name:"Fruity",level:52}],
    notes: { "Top Notes":["Mint","Bergamot","Grapefruit","Lavender"], "Heart Notes":["Green Apple","Cranberry","Rose"], "Base Notes":["Cotton Flower","Cactus","Amber"] }
  },
  {
    id: "luna", name: "LUNA", image: "luna.png", resultImage: "luna-result-960.webp", size: "50ml", listPrice: 475, offerPrice: 475,
    positioning: "Creamy. Magnetic. Sensual.",
    inspiredBy: null,
    longevity: { en: "+7 Hours", ar: "+7 ساعات" },
    sillage: { en: "Balanced to Strong", ar: "متوسط إلى قوي" },
    gender: "women",
    season: "winter",
    bestForKeys: ["date","social"], bestFor: { en:["Dates","Evening wear","Special occasions"], ar:["المواعيد","السهرات","المناسبات الخاصة"] },
    description: "You lean toward creamy florals, sweet warmth and magnetic sensuality — a fragrance that feels soft, confident and unforgettable.",
    dna: dna({ floral:5, sweet:5, vanilla:4, creamy:5, sensual:5, elegant:4, amber:4, bold:5, warm:4 }),
    core: ["floral","creamy","sensual","sweet","bold"],
    accords: [{name:"Floral",level:96},{name:"Creamy",level:92},{name:"Sweet",level:88},{name:"Amber",level:68}],
    notes: { "Top Notes":["Almond","Coffee"], "Heart Notes":["Jasmine","Tuberose"], "Base Notes":["Tonka Bean","Cocoa"] }
  }
];

export const productCopy = {
  elite: { positioning:"خشبي. دافئ. راقٍ.", description:"ذوقك يميل للأخشاب المصقولة والتوابل الدافئة والحضور الأنيق — عطر يعكس الثقة والرقي من غير مجهود.", feeling:"خشب ناعم ودافئ مع توابل أنيقة ولمسة بودرية." },
  "starry-amber": { positioning:"عميق. دافئ. غامض.", description:"اختياراتك تميل لدفء العنبر والأخشاب الغنية والحضور الغامض — فخامة آسرة صُممت لأجواء الليل.", feeling:"عنبر دافئ وأخشاب عميقة بطابع غني وغامض." },
  "tropical-bomb": { positioning:"منعش. نابض. لا يُنسى.", description:"شخصيتك تحب الفاكهة المشرقة والطاقة المرحة. تريد عطرًا حيويًا وجذابًا يلفت الانتباه.", feeling:"فاكهة مشرقة وانتعاش واضح مع حلاوة مرحة." },
  perla: { positioning:"ناعم. أنيق. مشرق.", description:"تنجذب للزهور المضيئة والحلاوة الكريمية والجاذبية الراقية — نعومة جميلة وحضور يظل في الذاكرة.", feeling:"زهور ناعمة ودفء كريمي بحلاوة رقيقة." },
  "fizzy-apple": { positioning:"فاكهي. مشرق. سهل.", description:"ذوقك منعش ومرح وفاكهي. تحب عطرًا مبهجًا وسهل الاستخدام كلما ناسبك المزاج.", feeling:"تفاح وفاكهة مقرمشة مع انتعاش نظيف وحلاوة خفيفة." },
  "spicy-vanilla": { positioning:"داكن. متبّل. آسر.", description:"اختياراتك تميل للفانيليا الداكنة والتوابل الدافئة والحضور المغناطيسي — عطر جريء وحميم يترك أثرًا.", feeling:"فانيليا دافئة ومتَبّلة بلمسة داكنة ناعمة." },
  "star-boy": { positioning:"منعش. أخضر. عفوي.", description:"هواء منعش وطاقة خضراء وثقة عفوية. عطرك يتحرك معك بخفة ومن غير ما يطغى عليك.", feeling:"انتعاش أخضر وحمضي بحضور خفيف." },
  luna: { positioning:"كريمي. جذاب. حسي.", description:"تميل إلى الزهور الكريمية والدفء الحلو والجاذبية الحسية — رائحة ناعمة وواثقة ويصعب نسيانها.", feeling:"زهور كريمية بحلاوة دافئة وطابع ناعم." }
};

