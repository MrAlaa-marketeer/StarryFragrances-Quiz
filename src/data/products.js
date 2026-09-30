export const TRAITS = [
  "fresh","fruity","floral","sweet","vanilla","woody","amber","spicy",
  "creamy","powdery","dark","sensual","elegant","mysterious","playful","energetic",
  "warm","clean","luxurious","bold"
];

const dna = (values) => Object.fromEntries(TRAITS.map((t) => [t, values[t] ?? 0]));

export const products = [
  {
    id: "elite", name: "THE ELITE", image: "the-elite.png", resultImage: "the-elite-result-960.webp",
    positioning: "Woody. Warm. Sophisticated.",
    description: "You gravitate toward refined woods, warm spices and a polished presence — a scent that feels confident, sophisticated and effortlessly put together.",
    dna: dna({ woody:5, spicy:4, powdery:4, elegant:5, warm:4, sensual:4, luxurious:5, creamy:3, sweet:3, dark:2 }),
    core: ["woody","elegant","warm","luxurious"],
    accords: [{name:"Woody",level:90},{name:"Warm Spicy",level:72},{name:"Powdery",level:68},{name:"Creamy",level:54}],
    notes: { "Top Notes":["Fig","Black Tea","Cardamom"], "Heart Notes":["Iris","Vetiver"], "Base Notes":["Sandalwood","Tonka Bean"] }
  },
  {
    id: "starry-amber", name: "STARRY AMBER", image: "starry-amber.png", resultImage: "starry-amber-result-960.webp",
    positioning: "Deep. Warm. Mysterious.",
    description: "Your choices lean toward resinous warmth, rich woods and an intriguing presence — luxurious, mysterious and made for the night.",
    dna: dna({ amber:5, woody:4, sweet:4, dark:4, warm:5, mysterious:5, luxurious:5, sensual:4, vanilla:3, spicy:2 }),
    core: ["amber","warm","mysterious","luxurious"],
    accords: [{name:"Amber",level:96},{name:"Woody",level:82},{name:"Warm",level:88},{name:"Vanilla",level:56}],
    notes: { "Top Notes":["Cedar","Amber","Ylang-Ylang"], "Heart Notes":["Gurjun Balsam","Iris","Myrrh"], "Base Notes":["Vanilla","Sandalwood","Benzoin"] }
  },
  {
    id: "tropical-bomb", name: "TROPICAL BOMB", image: "tropical-bomb.png", resultImage: "tropical-bomb-result-960.webp",
    positioning: "Fresh. Vibrant. Unforgettable.",
    description: "Bright, juicy and energetic. You want a fragrance that feels alive, playful and impossible to overlook.",
    dna: dna({ fruity:5, fresh:4, sweet:4, energetic:5, playful:5, vanilla:3, floral:3, creamy:2, sensual:2 }),
    core: ["fruity","playful","energetic","fresh"],
    accords: [{name:"Fruity",level:96},{name:"Fresh",level:84},{name:"Sweet",level:70},{name:"Musky",level:48}],
    notes: { "Top Notes":["Pear","Bergamot"], "Heart Notes":["Orange Blossom","Jasmine"], "Base Notes":["Sandalwood","Vanilla","Musks","Amber Woods"] }
  },
  {
    id: "perla", name: "PERLA", image: "perla.png", resultImage: "perla-result-960.webp",
    positioning: "Soft. Elegant. Radiant.",
    description: "You are drawn to luminous florals, creamy sweetness and elegant sensuality — soft enough to feel beautiful, strong enough to be remembered.",
    dna: dna({ floral:5, sweet:4, amber:4, creamy:4, sensual:5, elegant:5, vanilla:3, warm:3, fruity:3, spicy:2, luxurious:5 }),
    core: ["floral","elegant","sensual","luxurious"],
    accords: [{name:"Floral",level:96},{name:"Amber",level:78},{name:"Creamy",level:80},{name:"Sweet",level:72}],
    notes: { "Top Notes":["Pear","Frankincense","Hazelnut"], "Heart Notes":["Saffron","Rose","Jasmine Sambac","Osmanthus"], "Base Notes":["Sandalwood","Vanilla","Akigalawood","Amber"] }
  },
  {
    id: "fizzy-apple", name: "FIZZY APPLE", image: "fizzy-apple.png", resultImage: "fizzy-apple-result-960.webp",
    positioning: "Juicy. Bright. Effortless.",
    description: "Your profile is bright, playful and juicy. You want something refreshing, addictive and easy to wear whenever the mood hits.",
    dna: dna({ fresh:5, fruity:5, sweet:4, playful:5, energetic:5, clean:5, floral:3, sensual:2 }),
    core: ["fresh","fruity","playful","energetic"],
    accords: [{name:"Fruity",level:98},{name:"Fresh",level:94},{name:"Sweet",level:70},{name:"Clean",level:72}],
    notes: { "Top Notes":["Red Apple","Lychee","Black Currant","Pink Grapefruit"], "Heart Notes":["Wild Berries","Jasmine","Rose"], "Base Notes":["Sugar","Musk","Vanilla","Amber"] }
  },
  {
    id: "spicy-vanilla", name: "SPICY VANILLA", image: "spicy-vanilla.png", resultImage: "spicy-vanilla-result-960.webp",
    positioning: "Dark. Spicy. Addictive.",
    description: "Your choices point toward dark vanilla, warm spice and a magnetic presence — intimate, bold and made to leave a trace.",
    dna: dna({ vanilla:5, spicy:5, sweet:5, dark:5, sensual:5, warm:5, bold:5, amber:4, creamy:4, mysterious:5 }),
    core: ["vanilla","spicy","dark","sensual","bold"],
    accords: [{name:"Vanilla",level:98},{name:"Spicy",level:96},{name:"Warm",level:94},{name:"Suede",level:78}],
    notes: { "Top Notes":["Pink Pepper","Black Pepper","Elemi"], "Heart Notes":["Olibanum","Saffron"], "Base Notes":["Vanilla","Cedarwood","Suede"] }
  },
  {
    id: "star-boy", name: "STAR BOY", image: "star-boy.png", resultImage: "star-boy-result-960.webp",
    positioning: "Fresh. Green. Effortless.",
    description: "Fresh air, green energy and effortless confidence. Your scent should move with you, not weigh you down.",
    dna: dna({ fresh:5, energetic:5, clean:5, fruity:3, playful:4, woody:2, sweet:1 }),
    core: ["fresh","clean","energetic","playful"],
    accords: [{name:"Fresh",level:96},{name:"Green",level:90},{name:"Citrus",level:82},{name:"Fruity",level:52}],
    notes: { "Top Notes":["Mint","Bergamot","Grapefruit","Lavender"], "Heart Notes":["Green Apple","Cranberry","Rose"], "Base Notes":["Cotton Flower","Cactus","Amber"] }
  },
  {
    id: "luna", name: "LUNA", image: "luna.png", resultImage: "luna-result-960.webp",
    positioning: "Creamy. Magnetic. Sensual.",
    description: "You lean toward creamy florals, sweet warmth and magnetic sensuality — a fragrance that feels soft, confident and unforgettable.",
    dna: dna({ floral:5, sweet:5, vanilla:4, creamy:5, sensual:5, elegant:4, amber:4, bold:5, warm:4 }),
    core: ["floral","creamy","sensual","sweet","bold"],
    accords: [{name:"Floral",level:96},{name:"Creamy",level:92},{name:"Sweet",level:88},{name:"Amber",level:68}],
    notes: { "Top Notes":["Almond","Coffee"], "Heart Notes":["Jasmine","Tuberose"], "Base Notes":["Tonka Bean","Cocoa"] }
  }
];

export const questions = [
  { id:"q1", weight:1.1, title:{en:"When do you see yourself reaching for this fragrance?",ar:"إمتى تتخيل نفسك بتستخدم العطر ده؟"}, options:[
    {id:"a",label:{en:"Every day, wherever the day takes me",ar:"كل يوم، في أي مشوار"}},
    {id:"b",label:{en:"Work, meetings & polished moments",ar:"الشغل والاجتماعات والمواقف الرسمية"}},
    {id:"c",label:{en:"Dates & nights out",ar:"المواعيد والخروجات بالليل"}},
    {id:"d",label:{en:"Parties & social occasions",ar:"الحفلات والمناسبات الاجتماعية"}}
  ]},
  { id:"q2", weight:1.1, title:{en:"What first impression should it leave?",ar:"إيه أول انطباع تحب العطر يسيبه؟"}, options:[
    {id:"a",label:{en:"Fresh and easy to be around",ar:"منعش وقريب من الناس"}},
    {id:"b",label:{en:"Elegant and quietly expensive",ar:"أنيق وفخم من غير مبالغة"}},
    {id:"c",label:{en:"Mysterious and hard to forget",ar:"غامض وصعب يتنسي"}},
    {id:"d",label:{en:"Fun, magnetic and addictive",ar:"مرح وجذاب ومغري بتكراره"}}
  ]},
  { id:"q3", weight:0.9, title:{en:"How noticeable should it be in the air?",ar:"تحب العطر يكون واضح قد إيه في المكان؟"}, options:[
    {id:"a",label:{en:"Soft and close to my skin",ar:"هادي وقريب من بشرتي"}},
    {id:"b",label:{en:"Noticeable when someone comes close",ar:"يتلاحظ لما حد يقرب مني"}},
    {id:"c",label:{en:"Leaves a beautiful trail as I pass",ar:"يسيب أثر جميل وأنا ماشي"}},
    {id:"d",label:{en:"Makes a bold entrance and fills the room",ar:"حضوره قوي ويملى المكان"}}
  ]},
  { id:"q4", weight:1.0, title:{en:"Which opening would make you want to smell it again?",ar:"أنهي افتتاحية تخليك تحب تشم العطر تاني؟"}, options:[
    {id:"a",label:{en:"Crisp fruit and fresh citrus",ar:"فاكهة مقرمشة وحمضيات منعشة"}},
    {id:"b",label:{en:"Spices, woods and a warm edge",ar:"توابل وأخشاب ولمسة دافئة"}},
    {id:"c",label:{en:"Creamy vanilla and glowing amber",ar:"فانيليا كريمية وعنبر دافئ"}},
    {id:"d",label:{en:"Flowers, sweetness and soft sensuality",ar:"زهور وحلاوة وأنوثة ناعمة"}}
  ]},
  { id:"q5", weight:1.1, title:{en:"What kind of sweetness do you actually enjoy?",ar:"إيه نوع الحلاوة اللي بتحبها فعلًا؟"}, options:[
    {id:"a",label:{en:"Almost none — keep it crisp and fresh",ar:"قليلة جدًا — خليه منعش وخفيف"}},
    {id:"b",label:{en:"Juicy and fruity",ar:"فاكهية وعصيرية"}},
    {id:"c",label:{en:"Creamy and smooth",ar:"كريمية وناعمة"}},
    {id:"d",label:{en:"Deep vanilla, warm and addictive",ar:"فانيليا غنية ودافئة ومغرية"}}
  ]},
  { id:"q6", weight:0.85, title:{en:"Pick a place that feels like your scent.",ar:"اختار مكان تحس إنه شبه ريحتك."}, options:[
    {id:"a",label:{en:"Rooftop at midnight, city lights below",ar:"سطح مبنى بعد نص الليل وأضواء المدينة تحتك"}},
    {id:"b",label:{en:"A luxury hotel lounge with warm lighting",ar:"لاونج فندق فخم بإضاءة دافئة"}},
    {id:"c",label:{en:"A private room lit by candles",ar:"مكان هادي على ضوء الشموع"}},
    {id:"d",label:{en:"A sunny beach or a colorful city afternoon",ar:"شاطئ مشمس أو جولة وسط مدينة مليانة ألوان"}}
  ]},
  { id:"q7", weight:0.75, title:{en:"Which style feels most like the way you dress?",ar:"أنهي ستايل أقرب لطريقة لبسك؟"}, options:[
    {id:"a",label:{en:"Casual, relaxed and effortless",ar:"كاجوال ومريح ومن غير تكلف"}},
    {id:"b",label:{en:"Clean, tailored and polished",ar:"مرتب وأنيق وتفاصيله محسوبة"}},
    {id:"c",label:{en:"Dark, confident and statement-making",ar:"غامق وجريء وملفت"}},
    {id:"d",label:{en:"Expressive, colorful and individual",ar:"مميز وملون وبيعبر عن شخصيتي"}}
  ]},
  { id:"q8", weight:0.9, title:{en:"What do you want to feel after spraying it?",ar:"تحب تحس بإيه بعد ما ترش العطر؟"}, options:[
    {id:"a",label:{en:"Energy — awake, fresh and ready to go",ar:"طاقة — صاحي ومنتعش ومستعد أبدأ"}},
    {id:"b",label:{en:"Confidence — composed and put together",ar:"ثقة — هادي ومرتب وواثق من نفسي"}},
    {id:"c",label:{en:"Seduction — magnetic and unforgettable",ar:"جاذبية — حضوري مغناطيسي وصعب يتنسي"}},
    {id:"d",label:{en:"Joy — playful, bright and a little addictive",ar:"بهجة — مرح ومشرق ويخليني مبسوط"}}
  ]},
  { id:"q9", weight:1.0, title:{en:"Which weather feels right for your signature scent?",ar:"أنهي جو تحس إنه الأنسب لعطرك المميز؟"}, options:[
    {id:"a",label:{en:"Cold and rainy",ar:"جو بارد وممطر"}},
    {id:"b",label:{en:"A cool evening",ar:"مساء لطيف ومائل للبرودة"}},
    {id:"c",label:{en:"A warm night",ar:"ليلة دافئة"}},
    {id:"d",label:{en:"A sunny, hot day",ar:"نهار مشمس وحار"}}
  ]},
  { id:"q10", weight:1.3, title:{en:"Be honest: what would make you stop wearing a fragrance?",ar:"بصراحة، إيه أكتر حاجة ممكن تخليك تبطل تستخدم عطر؟"}, options:[
    {id:"a",label:{en:"It turns too sweet",ar:"لو حلاوته زيادة عن اللزوم"}},
    {id:"b",label:{en:"It feels too heavy or suffocating",ar:"لو تقيل أو خانق"}},
    {id:"c",label:{en:"It smells too generic or forgettable",ar:"لو ريحته عادية أو سهلة النسيان"}},
    {id:"d",label:{en:"It is too sharp or relentlessly fresh",ar:"لو حاد أو منعش بشكل مزعج"}}
  ]}
];

// Each row scores fit for the four answers to q1…q10 (0–5). q10 scores
// suitability when the user wants to avoid that drawback.
export const quizFit = {
  elite: [[4,5,3,3],[2,5,3,2],[2,3,3,2],[1,3,4,3],[1,2,3,3],[2,5,3,1],[2,5,3,2],[3,5,3,2],[1,4,2,1],[4,2,4,4]],
  "starry-amber": [[2,2,5,4],[2,4,5,3],[2,3,4,4],[1,4,5,2],[1,2,4,5],[4,3,5,1],[2,4,5,3],[2,4,5,2],[5,4,4,1],[2,1,4,5]],
  "tropical-bomb": [[4,1,3,5],[5,2,2,4],[1,3,5,5],[5,1,1,2],[1,5,2,2],[3,1,1,5],[3,2,2,5],[5,3,2,5],[1,2,4,5],[2,3,4,1]],
  perla: [[3,3,4,4],[3,5,3,4],[2,3,3,2],[2,2,3,5],[1,2,4,3],[2,5,4,2],[2,5,3,3],[2,4,5,3],[2,4,3,2],[2,4,4,4]],
  "fizzy-apple": [[5,3,2,4],[5,2,2,4],[1,2,4,2],[5,1,1,2],[1,5,1,1],[2,1,1,5],[5,3,1,4],[5,3,1,5],[1,1,3,5],[1,2,4,1]],
  "spicy-vanilla": [[2,2,5,4],[2,4,5,4],[1,3,5,5],[1,4,5,2],[1,2,4,5],[4,3,5,1],[2,4,5,3],[1,4,5,3],[4,5,4,1],[2,1,4,5]],
  "star-boy": [[5,3,1,3],[5,3,2,2],[1,2,3,2],[5,3,1,1],[1,2,1,1],[3,2,1,4],[5,5,2,2],[5,4,1,2],[1,2,2,5],[2,5,2,1]],
  luna: [[2,2,4,4],[2,4,4,4],[2,3,4,3],[2,3,5,5],[1,1,4,5],[2,4,5,2],[1,3,5,4],[2,4,5,4],[4,3,5,2],[2,1,4,4]]
};

export const productCopy = {
  elite: { positioning:"خشبي. دافئ. راقٍ.", description:"ذوقك يميل للأخشاب المصقولة والتوابل الدافئة والحضور الأنيق — عطر يعكس الثقة والرقي من غير مجهود." },
  "starry-amber": { positioning:"عميق. دافئ. غامض.", description:"اختياراتك تميل لدفء العنبر والأخشاب الغنية والحضور الغامض — فخامة آسرة صُممت لأجواء الليل." },
  "tropical-bomb": { positioning:"منعش. نابض. لا يُنسى.", description:"شخصيتك تحب الفاكهة المشرقة والطاقة المرحة. تريد عطرًا حيويًا وجذابًا يلفت الانتباه." },
  perla: { positioning:"ناعم. أنيق. مشرق.", description:"تنجذب للزهور المضيئة والحلاوة الكريمية والجاذبية الراقية — نعومة جميلة وحضور يظل في الذاكرة." },
  "fizzy-apple": { positioning:"فاكهي. مشرق. سهل.", description:"ذوقك منعش ومرح وفاكهي. تحب عطرًا مبهجًا وسهل الاستخدام كلما ناسبك المزاج." },
  "spicy-vanilla": { positioning:"داكن. متبّل. آسر.", description:"اختياراتك تميل للفانيليا الداكنة والتوابل الدافئة والحضور المغناطيسي — عطر جريء وحميم يترك أثرًا." },
  "star-boy": { positioning:"منعش. أخضر. عفوي.", description:"هواء منعش وطاقة خضراء وثقة عفوية. عطرك يتحرك معك بخفة ومن غير ما يطغى عليك." },
  luna: { positioning:"كريمي. جذاب. حسي.", description:"تميل إلى الزهور الكريمية والدفء الحلو والجاذبية الحسية — رائحة ناعمة وواثقة ويصعب نسيانها." }
};
