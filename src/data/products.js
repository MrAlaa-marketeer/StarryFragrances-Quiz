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

const w = (weights) => weights;

export const questions = [
  { id:"q1", title:"When the night begins, where do you belong?", weight:1.0, options:[
    {id:"a",label:"A rooftop, city lights & cold air",weights:w({fresh:5,energetic:4,clean:3,playful:1})},
    {id:"b",label:"A candlelit dinner in an elegant place",weights:w({elegant:5,warm:4,luxurious:4,sensual:3,woody:2})},
    {id:"c",label:"A dimly lit bar with low music",weights:w({dark:5,mysterious:5,spicy:4,sensual:4,warm:3,bold:2})},
    {id:"d",label:"Somewhere loud, colorful & spontaneous",weights:w({fruity:5,playful:5,energetic:4,sweet:3,fresh:2})}
  ]},
  { id:"q2", title:"What do you want your fragrance to say about you?", weight:1.25, options:[
    {id:"a",label:"Fresh, effortless & full of energy",weights:w({fresh:5,clean:4,energetic:5,playful:1})},
    {id:"b",label:"Elegant, refined & sophisticated",weights:w({elegant:5,luxurious:5,woody:4,powdery:3,warm:2})},
    {id:"c",label:"Mysterious, intense & unforgettable",weights:w({mysterious:5,dark:5,bold:5,sensual:4,amber:3,spicy:3})},
    {id:"d",label:"Playful, attractive & full of personality",weights:w({playful:5,fruity:4,sweet:4,energetic:3,sensual:2,bold:2})}
  ]},
  { id:"q3", title:"Pick the atmosphere that feels most like you.", weight:1.0, options:[
    {id:"a",label:"Fresh morning air after rain",weights:w({fresh:5,clean:5,energetic:2})},
    {id:"b",label:"A luxurious hotel with warm lighting",weights:w({luxurious:5,elegant:5,warm:5,woody:3,sensual:2})},
    {id:"c",label:"A dark room filled with candlelight",weights:w({dark:5,warm:5,mysterious:5,amber:4,sensual:3})},
    {id:"d",label:"A sunny afternoon surrounded by color",weights:w({fruity:5,fresh:4,playful:5,energetic:4,sweet:2})}
  ]},
  { id:"q4", title:"How do you want people to remember you after you leave?", weight:1.25, options:[
    {id:"a",label:"“They smelled incredibly fresh.”",weights:w({fresh:5,clean:5,energetic:3})},
    {id:"b",label:"“There was something classy about them.”",weights:w({elegant:5,luxurious:4,woody:3,powdery:3,warm:2})},
    {id:"c",label:"“I couldn't stop thinking about that scent.”",weights:w({sensual:5,mysterious:5,dark:4,bold:4,warm:3})},
    {id:"d",label:"“They had such a fun, addictive presence.”",weights:w({playful:5,sweet:4,fruity:4,sensual:3,energetic:3})}
  ]},
  { id:"q5", title:"Which fragrance personality attracts you the most?", weight:1.5, options:[
    {id:"a",label:"Clean & refreshing",weights:w({fresh:5,clean:5,energetic:3})},
    {id:"b",label:"Warm & sophisticated",weights:w({warm:5,elegant:5,woody:4,luxurious:4,powdery:2})},
    {id:"c",label:"Dark & sensual",weights:w({dark:5,sensual:5,spicy:4,mysterious:4,amber:3,bold:3})},
    {id:"d",label:"Sweet & playful",weights:w({sweet:5,playful:5,fruity:4,energetic:3,sensual:2})}
  ]},
  { id:"q6", title:"Choose your ideal outfit for a night out.", weight:0.75, options:[
    {id:"a",label:"Relaxed outfit, sneakers & effortless style",weights:w({clean:4,fresh:4,energetic:3,playful:2})},
    {id:"b",label:"Tailored outfit, watch & polished details",weights:w({elegant:5,luxurious:5,woody:3,warm:2,bold:2})},
    {id:"c",label:"Dark outfit, leather & statement pieces",weights:w({dark:5,bold:5,mysterious:4,spicy:3,sensual:3})},
    {id:"d",label:"Something stylish, colorful & attention-grabbing",weights:w({playful:5,bold:4,fruity:4,energetic:4,sweet:2})}
  ]},
  { id:"q7", title:"What's the feeling you want when you spray your fragrance?", weight:1.5, options:[
    {id:"a",label:"Energy — I feel alive and ready to go.",weights:w({energetic:5,fresh:5,clean:4,playful:1})},
    {id:"b",label:"Confidence — I feel polished and put together.",weights:w({elegant:5,bold:4,luxurious:4,woody:3,warm:2})},
    {id:"c",label:"Seduction — I want to leave an unforgettable impression.",weights:w({sensual:5,dark:4,warm:4,spicy:4,bold:4,mysterious:3})},
    {id:"d",label:"Joy — I want something addictive and fun.",weights:w({playful:5,fruity:5,sweet:4,energetic:4,fresh:2})}
  ]}
];
