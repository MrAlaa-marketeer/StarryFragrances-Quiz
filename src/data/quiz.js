// Six bilingual questions. Scores are an editorial preference rubric, not a
// statistical probability of liking a fragrance.
export const questions = [
  { id:"vibe", title:{en:"What first impression do you want your fragrance to leave?",ar:"إيه الانطباع الأول اللي تحب عطرك يسيبه؟"}, options:[
    {id:"fresh",label:{en:"Fresh, clean & full of energy",ar:"منعش ونظيف ومليان حيوية"},reasonTag:{en:"a fresh, energetic feel",ar:"طابع منعش ومليان حيوية"},weights:{"star-boy":3,"fizzy-apple":3,"tropical-bomb":2}},
    {id:"soft",label:{en:"Soft, radiant & effortlessly elegant",ar:"ناعم ومشرق وأنيق من غير تكلف"},reasonTag:{en:"soft, effortless elegance",ar:"نعومة وأناقة من غير تكلف"},weights:{perla:3,luna:2,elite:2}},
    {id:"warm",label:{en:"Warm, magnetic & unforgettable",ar:"دافئ وجذاب وصعب يتنسي"},reasonTag:{en:"warm, magnetic character",ar:"دفء وجاذبية لافتة"},weights:{luna:3,"spicy-vanilla":3,perla:1}},
    {id:"deep",label:{en:"Luxurious, deep & mysterious",ar:"فخم وعميق وغامض"},reasonTag:{en:"a deep, luxurious character",ar:"طابع عميق وفخم"},weights:{"starry-amber":3,elite:3,"spicy-vanilla":2}}
  ]},
  { id:"occasion", title:{en:"When will you wear this fragrance most?",ar:"إيه أكتر وقت أو مناسبة هتستخدم فيها العطر؟"}, options:[
    {id:"daily",label:{en:"Everyday wear & daytime outings",ar:"استخدام يومي وخروجات نهارية"},reasonTag:{en:"everyday versatility",ar:"مناسب للاستخدام اليومي والخروجات النهارية"},weights:{"star-boy":3,"fizzy-apple":3,"tropical-bomb":2}},
    {id:"work",label:{en:"Work, meetings & smart settings",ar:"الشغل والاجتماعات والمشاوير المهمة"},reasonTag:{en:"polished confidence for work",ar:"ثقة وأناقة تناسب العمل والاجتماعات"},weights:{elite:3,perla:3,"star-boy":2}},
    {id:"date",label:{en:"Date nights & intimate evenings",ar:"سهرات خاصة ومواعيد ليلية مميزة"},reasonTag:{en:"captivating evening allure",ar:"سحر يناسب السهرات والمواعيد الليلية"},weights:{luna:3,"spicy-vanilla":3,perla:2}},
    {id:"events",label:{en:"Parties, celebrations & standout nights",ar:"حفلات ومناسبات وليالي استثنائية"},reasonTag:{en:"standout presence for special events",ar:"حضور لافت في الحفلات والمناسبات"},weights:{"starry-amber":3,"spicy-vanilla":2,"tropical-bomb":2,luna:2}}
  ]},
  { id:"notes", title:{en:"Which scent family attracts you most?",ar:"أنهي عائلة عطرية أو نوتات بتشدك أكتر؟"}, options:[
    {id:"fruity",label:{en:"Juicy fruits, crisp apple & bright citrus",ar:"فواكه وتفاح منعش وحمضيات مشرقة"},reasonTag:{en:"vibrant fruity and citrus notes",ar:"نوتات الفواكه والحمضيات المنعشة"},weights:{"fizzy-apple":4,"tropical-bomb":4,"star-boy":3}},
    {id:"floral",label:{en:"Soft florals, rose & jasmine",ar:"أزهار ناعمة وورد وياسمين"},reasonTag:{en:"soft floral notes",ar:"نوتات زهرية ناعمة"},weights:{perla:4,luna:3,"tropical-bomb":1}},
    {id:"vanilla",label:{en:"Warm vanilla, coffee, almond & spices",ar:"فانيليا دافئة وقهوة ولوز وتوابل"},reasonTag:{en:"rich vanilla and warm spice",ar:"فانيليا غنية وتوابل دافئة"},weights:{"spicy-vanilla":4,luna:4,"starry-amber":2}},
    {id:"woods",label:{en:"Sandalwood, amber, cardamom & black tea",ar:"خشب الصندل والعنبر والهيل والشاي الأسود"},reasonTag:{en:"sophisticated woods and amber",ar:"أخشاب راقية وعنبر دافئ"},weights:{elite:4,"starry-amber":4,"spicy-vanilla":2}}
  ]},
  { id:"projection", title:{en:"How noticeable should your fragrance be?",ar:"بتفضل فوحان العطر يكون عامل إزاي؟"}, options:[
    {id:"light",label:{en:"Light, airy & refreshing around me",ar:"خفيف ومنعش وقريب مني"},reasonTag:{en:"light, airy projection",ar:"فوحان خفيف ومريح"},weights:{"star-boy":3,"fizzy-apple":3}},
    {id:"balanced",label:{en:"Balanced, with a classy trail",ar:"متوازن وبيسيب أثر راقي"},reasonTag:{en:"a balanced, elegant trail",ar:"فوحان متوازن وأنيق"},weights:{perla:3,elite:3,"tropical-bomb":2}},
    {id:"close",label:{en:"Magnetic when someone gets close",ar:"جذاب وملحوظ عند الاقتراب"},reasonTag:{en:"magnetic close-up presence",ar:"جاذبية تظهر عند الاقتراب"},weights:{luna:3,perla:2,elite:2}},
    {id:"bold",label:{en:"Bold and fills the room",ar:"قوي ويملى المكان"},reasonTag:{en:"a bold, confident presence",ar:"فوحان قوي وحضور واثق"},weights:{"starry-amber":3,"spicy-vanilla":3,"tropical-bomb":2}}
  ]},
  { id:"setting", title:{en:"Which setting and weather feels most like you?",ar:"أنهي جو ومكان بتحس إنه بيعبر عنك أكتر؟"}, options:[
    {id:"sun",label:{en:"A sunny morning by the sea",ar:"صباح مشمس على البحر أو في الهواء الطلق"},reasonTag:{en:"bright sunny-day freshness",ar:"انتعاش يناسب الأجواء المشمسة"},weights:{"tropical-bomb":3,"star-boy":3,"fizzy-apple":2}},
    {id:"mild",label:{en:"A breezy afternoon in an elegant café",ar:"جو معتدل وهادي في كافيه راقي"},reasonTag:{en:"refined afternoon charm",ar:"سحر يناسب الأجواء المعتدلة"},weights:{perla:3,"fizzy-apple":2,elite:2}},
    {id:"cool",label:{en:"A cool night in the city",ar:"ليلة باردة وأضواء المدينة"},reasonTag:{en:"cool-evening sophistication",ar:"أناقة تناسب الليالي الباردة"},weights:{"spicy-vanilla":3,luna:3,elite:2}},
    {id:"winter",label:{en:"A luxurious lounge on a cold night",ar:"أجواء شتوية دافئة ومكان فخم"},reasonTag:{en:"warm winter-night luxury",ar:"دفء وفخامة لليالي الشتاء"},weights:{"starry-amber":3,luna:2,"spicy-vanilla":2}}
  ]},
  { id:"dealbreaker", title:{en:"What would make you stop wearing a fragrance?",ar:"إيه أكتر حاجة ممكن تخليك تبطل تستخدم عطر؟"}, options:[
    {id:"sweet",label:{en:"When it becomes overly sweet",ar:"لما يكون مسكر زيادة عن اللزوم"},reasonTag:{en:"balanced sweetness",ar:"حلاوة متوازنة من غير مبالغة"},weights:{"star-boy":3,elite:3,"starry-amber":1,"fizzy-apple":-3,luna:-3,"tropical-bomb":-2}},
    {id:"heavy",label:{en:"When it feels too heavy or suffocating",ar:"لما يكون تقيل أوي أو خانق"},reasonTag:{en:"a smooth, comfortable composition",ar:"تركيبة ناعمة ومريحة"},weights:{"star-boy":3,"fizzy-apple":3,perla:2,"tropical-bomb":2,"starry-amber":-3,"spicy-vanilla":-3}},
    {id:"generic",label:{en:"When it smells too generic or forgettable",ar:"لما يكون تقليدي ومكرر أو بيطير بسرعة"},reasonTag:{en:"distinctive character",ar:"طابع متفرد ومميز"},weights:{elite:3,"spicy-vanilla":3,"starry-amber":3,perla:2,luna:2,"star-boy":-2}},
    {id:"sharp",label:{en:"When it feels too sharp or piercing",ar:"لما يكون حاد أو لاذع في البداية"},reasonTag:{en:"a smooth, rounded opening",ar:"نعومة وانسيابية من أول رشة"},weights:{luna:3,perla:3,elite:2,"starry-amber":2,"star-boy":-3}}
  ]}
];

