// Six bilingual questions. Scores are an editorial preference rubric, not a
// statistical probability of liking a fragrance.
export const questions = [
  { id:"vibe", title:{en:"How do you want your fragrance to feel from the first spray?",ar:"تحب عطرك يدي إحساس بإيه من أول رشة؟"}, options:[
    {id:"fresh",label:{en:"Fresh, clean & full of energy",ar:"منعش ونضيف ويدّي طاقة"},reasonTag:{en:"a fresh, energetic feel",ar:"انتعاش وطاقة"},weights:{"star-boy":3,"fizzy-apple":3,"tropical-bomb":2}},
    {id:"soft",label:{en:"Soft, bright & effortlessly elegant",ar:"ناعم ومنوّر وأنيق من غير تكلف"},reasonTag:{en:"soft, effortless elegance",ar:"نعومة وأناقة من غير تكلف"},weights:{perla:3,luna:2,elite:2}},
    {id:"warm",label:{en:"Warm, magnetic & hard to forget",ar:"دافي وجذاب وصعب يتنسي"},reasonTag:{en:"warm, magnetic character",ar:"دفء وجاذبية"},weights:{luna:3,"spicy-vanilla":3,perla:1}},
    {id:"deep",label:{en:"Luxurious, deep & mysterious",ar:"فخم وعميق وفيه غموض"},reasonTag:{en:"a deep, luxurious character",ar:"فخامة وعمق"},weights:{"starry-amber":3,elite:3,"spicy-vanilla":2}}
  ]},
  { id:"occasion", title:{en:"When are you most likely to wear it?",ar:"غالبًا هتلبسه إمتى؟"}, options:[
    {id:"daily",label:{en:"Everyday and daytime outings",ar:"كل يوم وفي خروجات النهار"},reasonTag:{en:"easy everyday wear",ar:"ينفع كل يوم وفي النهار"},weights:{"star-boy":3,"fizzy-apple":3,"tropical-bomb":2}},
    {id:"work",label:{en:"Work, meetings and important plans",ar:"الشغل والاجتماعات والمشاوير المهمة"},reasonTag:{en:"polished confidence for work",ar:"أناقة وثقة للشغل والمشاوير المهمة"},weights:{elite:3,perla:3,"star-boy":2}},
    {id:"date",label:{en:"Dates and evenings out",ar:"خروجات ومواعيد بالليل"},reasonTag:{en:"captivating evening allure",ar:"طابع جذاب للسهرات"},weights:{luna:3,"spicy-vanilla":3,perla:2}},
    {id:"events",label:{en:"Parties and special occasions",ar:"حفلات ومناسبات خاصة"},reasonTag:{en:"standout presence for special events",ar:"حضور لافت للمناسبات"},weights:{"starry-amber":3,"spicy-vanilla":2,"tropical-bomb":2,luna:2}}
  ]},
  { id:"notes", title:{en:"What kind of fragrance do you usually gravitate toward?",ar:"تحب العطور غالبًا بطابع إيه؟"}, options:[
    {id:"fruity",label:{en:"Fresh and light, with a lively fruity feel",ar:"منعشة وخفيفة، وفيها إحساس فاكهي"},reasonTag:{en:"a fresh, lively fragrance style",ar:"طابع منعش وحيوي"},weights:{"fizzy-apple":4,"tropical-bomb":4,"star-boy":3}},
    {id:"floral",label:{en:"Soft and smooth, with a gentle floral feel",ar:"ناعمة وهادية، وفيها لمسة زهور"},reasonTag:{en:"a soft, gentle fragrance style",ar:"طابع ناعم وهادي"},weights:{perla:4,luna:3,"tropical-bomb":1}},
    {id:"vanilla",label:{en:"Warm and sweet, with a cozy feel",ar:"دافية وحلوة، وإحساسها مريح"},reasonTag:{en:"a warm, comforting fragrance style",ar:"طابع دافي ومريح"},weights:{"spicy-vanilla":4,luna:4,"starry-amber":2}},
    {id:"woods",label:{en:"Deep and bold, with a woody, spicy feel",ar:"عميقة وجريئة، بطابع خشبي ومتبل"},reasonTag:{en:"a deep, bold fragrance style",ar:"طابع عميق وجريء"},weights:{elite:4,"starry-amber":4,"spicy-vanilla":2}}
  ]},
  { id:"projection", title:{en:"How much do you like a fragrance to project?",ar:"تحب فوحان العطر يبقى عامل إزاي؟"}, options:[
    {id:"light",label:{en:"Soft and close to me",ar:"هادي وقريب مني"},reasonTag:{en:"light, airy projection",ar:"فوحان هادي وخفيف"},weights:{"star-boy":3,"fizzy-apple":3}},
    {id:"balanced",label:{en:"Noticeable, with a subtle trail",ar:"واضح وبيسيب أثر خفيف"},reasonTag:{en:"a balanced, elegant trail",ar:"فوحان متوازن وأنيق"},weights:{perla:3,elite:3,"tropical-bomb":2}},
    {id:"close",label:{en:"Magnetic when someone gets close",ar:"يبان أكتر لما حد يقرب"},reasonTag:{en:"magnetic close-up presence",ar:"جاذبية تظهر مع القرب"},weights:{luna:3,perla:2,elite:2}},
    {id:"bold",label:{en:"Strong and noticeable as soon as I enter",ar:"قوي وملحوظ من أول ما أدخل"},reasonTag:{en:"a bold, confident presence",ar:"فوحان قوي وحضور واثق"},weights:{"starry-amber":3,"spicy-vanilla":3,"tropical-bomb":2}}
  ]},
  { id:"setting", title:{en:"Which setting feels right for your scent?",ar:"أنهي جو تحس العطر ده لايق عليه؟"}, options:[
    {id:"sun",label:{en:"A sunny day outdoors",ar:"نهار مشمس في مكان مفتوح"},reasonTag:{en:"bright sunny-day freshness",ar:"انتعاش يناسب النهار المشمس"},weights:{"tropical-bomb":3,"star-boy":3,"fizzy-apple":2}},
    {id:"mild",label:{en:"A mild afternoon at a café",ar:"بعد الضهر في كافيه والجو لطيف"},reasonTag:{en:"refined afternoon charm",ar:"طابع رايق للأجواء المعتدلة"},weights:{perla:3,"fizzy-apple":2,elite:2}},
    {id:"cool",label:{en:"A cool evening out in the city",ar:"سهرة والجو مائل للبرودة"},reasonTag:{en:"cool-evening sophistication",ar:"أناقة تناسب السهرات والجو البارد"},weights:{"spicy-vanilla":3,luna:3,elite:2}},
    {id:"winter",label:{en:"A cozy place on a cold night",ar:"مكان دافي في ليلة برد"},reasonTag:{en:"warm winter-night luxury",ar:"دفء يناسب ليالي الشتا"},weights:{"starry-amber":3,luna:2,"spicy-vanilla":2}}
  ]},
  { id:"dealbreaker", title:{en:"What bothers you most in a fragrance?",ar:"إيه أكتر حاجة بتضايقك في العطر؟"}, options:[
    {id:"sweet",label:{en:"When it gets too sweet",ar:"لما يبقى مسكر زيادة"},reasonTag:{en:"balanced sweetness",ar:"حلاوة متوازنة"},weights:{"star-boy":3,elite:3,"starry-amber":1,"fizzy-apple":-3,luna:-3,"tropical-bomb":-2}},
    {id:"heavy",label:{en:"When it feels too heavy or suffocating",ar:"لما يبقى تقيل أو يخنقني"},reasonTag:{en:"a smooth, comfortable composition",ar:"تركيبة ناعمة ومريحة"},weights:{"star-boy":3,"fizzy-apple":3,perla:2,"tropical-bomb":2,"starry-amber":-3,"spicy-vanilla":-3}},
    {id:"generic",label:{en:"When it smells too ordinary or fades too quickly",ar:"لما يبقى عادي ومكرر أو ريحته تروح بسرعة"},reasonTag:{en:"distinctive character",ar:"طابع مميز ومختلف"},weights:{elite:3,"spicy-vanilla":3,"starry-amber":3,perla:2,luna:2,"star-boy":-2}},
    {id:"sharp",label:{en:"When it smells too sharp at first",ar:"لما تكون ريحته حادة من أول رشة"},reasonTag:{en:"a smooth, rounded opening",ar:"بداية ناعمة ومريحة"},weights:{luna:3,perla:3,elite:2,"starry-amber":2,"star-boy":-3}}
  ]}
];

