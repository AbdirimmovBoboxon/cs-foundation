/*
  DATA.JS — darslar kontenti.
  Yangi dars qo'shishda LESSONS obyektiga yangi dars qo'shiladi; HTML/JS tuzilmasini
  o'zgartirish shart emas. Rasmni assets/images/lesson-XX/ ichiga qo'ying.
*/

const MODULES = [
  { id: "m1", number: "01", title: "Boshlash va kompyuter savodxonligi", description: "Platforma bilan tanishish, kompyuter nima ekanini va qayerda ishlatilishini tushunish." },
  { id: "m2", number: "02", title: "Sichqoncha, klaviatura va tez yozish", description: "Klaviatura bilan tanishish, tugmalarni anglash va yozish tezligini asta-sekin oshirish." },
  { id: "m3", number: "03", title: "Operatsion tizim, oynalar va fayllar", description: "Windows/macOS muhitida ishlash, fayl va papkalarni boshqarish." },
  { id: "m4", number: "04", title: "Kompyuter qurilmalari va raqamli ma'lumot", description: "Hardware, protsessor, xotira va raqamli ma'lumotlarning asoslari." },
  { id: "m5", number: "05", title: "Internet, brauzer va elektron pochta", description: "Brauzer, qidiruv, internet manzillari va elektron pochta." },
  { id: "m6", number: "06", title: "Kiberxavfsizlik va bulutli xizmatlar", description: "Hisoblarni himoyalash, xavfsiz internet va bulutdagi fayllar." },
  { id: "m7", number: "07", title: "Word va Google Docs", description: "Tartibli hujjat yaratish, rasm/jadval qo'shish va PDF chiqarish." },
  { id: "m8", number: "08", title: "Excel va Google Sheets", description: "Jadvallar, formulalar, diagrammalar va kundalik hisob-kitoblar." },
  { id: "m9", number: "09", title: "PowerPoint va Google Slides", description: "Aniq va tushunarli taqdimot tayyorlash." },
  { id: "m10", number: "10", title: "Muammolarni hal qilish va yakuniy amaliyot", description: "O'rgangan ko'nikmalarni birlashtirish va mustaqil ishlash." }
];

const LESSONS = {
  l1: {
    id: "l1", number: 1, moduleId: "m1", title: "Platformadan qanday foydalanish", level: "Boshlang'ich", estimatedMinutes: 15,
    prerequisites: [],
    objectives: [
      "Darsning bo'limlarini topa olasiz.",
      "Test, amaliy vazifa va mini-o'yin nimaga kerakligini tushunasiz.",
      "O'z natijalaringiz qayerda saqlanishini bilasiz."
    ],
    explanationBlocks: [
      {
        heading: "O'rganish yo'li qanday ishlaydi?",
        paragraphs: [
          "Bu platforma kompyuterni umuman bilmaydigan odam uchun ham bosqichma-bosqich tuzilgan. Darslar oson tushunchalardan boshlanadi va sekin-asta murakkablashadi.",
          "Har bir darsda maqsad, izoh, muhim atamalar, rasm yoki sxema, video, amaliy mashq va test bo'lishi mumkin. Dars oxiridagi mini-o'yin mavzuni eslab qolishga yordam beradi."
        ],
        image: { src: "assets/images/lesson-01/learning-path.svg", alt: "Dars maqsadi, tushuntirish, amaliyot, test va natija ketma-ketligi", caption: "Tavsiya etilgan ketma-ketlik: tushunish → bajarish → tekshirish → natijani saqlash." }
      },
      {
        heading: "Shoshilmasdan, amaliyot bilan o'rganing",
        paragraphs: [
          "Har bir narsani bir marta o'qib tushunmaslik tabiiy. Qiyin bo'lgan joyni qayta o'qing, videoni yana ko'ring va mashqni qayta bajaring.",
          "Darsni yakunlashdan oldin amaliy vazifadagi belgilarni va testni bajaring. Progress bo'limi tugatilgan darslar, test natijalari va o'rgangan kunlaringizni ko'rsatadi."
        ],
        callout: { title: "Esda tuting", text: "Maqsad faqat ko'p dars tugatish emas — har bir darsdan keyin biror ishni o'zingiz bajara olish." }
      }
    ],
    terms: [
      { term: "Dars", definition: "Bitta mavzuni o'rgatuvchi kichik bo'lim.", example: "Masalan, kompyuter turlari yoki klaviatura tugmalari." },
      { term: "Amaliyot", definition: "O'qilgan bilimni o'zingiz bajarib ko'rish.", example: "Kompyuterda yangi papka yaratish." },
      { term: "Progress", definition: "O'rganish jarayoni, vaqt va natijalar haqidagi yozuv.", example: "Bugun 20 daqiqa o'qib, 1 ta test topshirish." }
    ],
    video: { title: "Kompyuter savodxonligi: asosiy tushunchalar", language: "O'zbekcha", url: "https://www.youtube.com/watch?v=U8_nN_l32Wc", embedUrl: "https://www.youtube.com/embed/U8_nN_l32Wc", note: "Bu video kursning o'z interfeysini emas, kompyuter mavzusiga kirishni tushuntiradi." },
    task: {
      steps: ["Chap tomondan modulni tanlang.", "Darsdagi 'Muhim atamalar', 'Video dars', 'Amaliy vazifa' va 'Mini-test' bo'limlarini toping.", "Mening rivojlanishim sahifasini ochib, natijalar qayerda ko'rinishini tekshiring."],
      expectedResult: "Siz dars bo'limlarini mustaqil topa olasiz va o'quv jarayoni qanday tuzilganini bilasiz.",
      checklist: ["Modul va darsni ochdim", "Video va atamalar bo'limini topdim", "Progress sahifasini ko'rdim"]
    },
    miniGame: { title: "Dars tartibini top", prompt: "Tushuntirishni o'qib bo'lgach, bilimni mustahkamlash uchun eng yaxshi keyingi qadam qaysi?", options: ["Darhol keyingi modulga o'tish", "Amaliy mashqni bajarib, test topshirish", "Sahifani yopish"], correctIndex: 1, explanation: "Amaliy mashq bilimni qo'llashga, test esa tushunganingizni tekshirishga yordam beradi." },
    quiz: [
      { question: "Darsdagi amaliy vazifa nima uchun kerak?", options: ["Sayt rangini o'zgartirish uchun", "Bilimni o'zingiz bajarib ko'rish uchun", "Faqat vaqt o'tkazish uchun"], correctIndex: 1, explanation: "Amaliy vazifa nazariy bilimni amalda qo'llashga yordam beradi." },
      { question: "Progress bo'limi nimani ko'rsatadi?", options: ["Faqat sayt nomini", "O'rganish va natijalar tarixini", "Internet tezligini"], correctIndex: 1, explanation: "Progress tugatilgan darslar, faol vaqt va test natijalarini ko'rsatadi." },
      { question: "Bir mavzu qiyin bo'lsa nima qilish kerak?", options: ["Qayta o'qib, mashqni takrorlash", "O'rganishni butunlay to'xtatish", "Javobni taxmin qilib o'tish"], correctIndex: 0, explanation: "Qayta ko'rish va takrorlash o'rganishning odatiy qismidir." }
    ],
    summary: ["Darslar bosqichma-bosqich o'rganish uchun tuzilgan.", "Amaliyot va test bilimni mustahkamlaydi.", "Progress natijalarni shu brauzerda saqlaydi."],
    nextLessonId: "l2"
  },

  l2: {
    id: "l2", number: 2, moduleId: "m1", title: "Kompyuter nima va u qanday ishlaydi?", level: "Boshlang'ich", estimatedMinutes: 25,
    prerequisites: ["l1"],
    objectives: [
      "Kompyuterga sodda va aniq ta'rif bera olasiz.",
      "Kiritish, qayta ishlash, natijani chiqarish va saqlash farqini tushunasiz.",
      "Kompyuter ishlatiladigan uchta vaziyatga misol keltirasiz."
    ],
    explanationBlocks: [
      {
        heading: "Kompyuter — ma'lumot bilan ishlaydigan qurilma",
        paragraphs: [
          "Kompyuter — dastur ko'rsatmalarini bajarib, ma'lumotni qabul qiladigan, qayta ishlaydigan va natija chiqaradigan elektron qurilma. U faqat stol ustidagi katta kompyuter emas: noutbuk, planshet va smartfon ham ko'p vazifalarni bajaruvchi hisoblash qurilmalaridir.",
          "Masalan, kalkulyatorda 12 + 8 ni kiritsangiz, kompyuter kiritilgan sonlarni qayta ishlaydi va ekranga 20 natijasini chiqaradi. Matn yozsangiz, harflarni qabul qiladi, ularni ekranda ko'rsatadi va fayl sifatida saqlashi mumkin."
        ],
        image: { src: "assets/images/lesson-02/images.png", alt: "Kompyuterda ma'lumot kiritish, qayta ishlash, chiqarish va saqlash sxemasi", caption: "Kompyuterning asosiy jarayoni: kiritish → qayta ishlash → chiqarish; kerakli natija diskka saqlanadi." }
      },
      {
        heading: "Kompyuter qayerlarda ishlatiladi?",
        paragraphs: [
          "Ta'limda kompyuter orqali dars ko'rish, matn yozish va masala yechish mumkin. Ishxonada hujjat, jadval va taqdimot tayyorlanadi. Do'konda kassa tizimi savdoni hisoblaydi, shifoxonada esa ma'lumot va tekshiruv natijalari bilan ishlashga yordam beradi.",
          "Kompyuterning foydasi uning kuchida emas, vazifani to'g'ri bajarishida. Shuning uchun avval muammoni aniqlash, keyin kerakli dastur yoki qurilmani tanlash muhim."
        ],
        callout: { title: "Oddiy o'xshatish", text: "Kompyuter oshxonaga o'xshaydi: ma'lumot — mahsulotlar, dastur — retsept, protsessor — ishni bajaruvchi, natija esa tayyor taomga o'xshaydi." }
      }
    ],
    terms: [
      { term: "Ma'lumot (data)", definition: "Kompyuter qabul qiladigan yoki saqlaydigan matn, son, rasm, ovoz va boshqa axborot.", example: "Ism yozilgan matn yoki surat." },
      { term: "Kiritish (input)", definition: "Ma'lumotni kompyuterga berish jarayoni.", example: "Klaviaturada so'z yozish." },
      { term: "Qayta ishlash (processing)", definition: "Kiritilgan ma'lumot ustida buyruqlarni bajarish.", example: "Kalkulyatorda sonlarni qo'shish." },
      { term: "Chiqarish (output)", definition: "Natijani foydalanuvchiga ko'rsatish yoki eshittirish.", example: "Natijaning monitorda ko'rinishi." },
      { term: "Saqlash (storage)", definition: "Ma'lumotni keyin ishlatish uchun xotirada saqlab qo'yish.", example: "Hujjatni SSD'ga saqlash." }
    ],
    video: { title: "Kompüter Savodxonligi | 1-dars: Kompyuter nima? Asosiy tushunchalar", language: "O'zbekcha", url: "https://www.youtube.com/watch?v=U8_nN_l32Wc", embedUrl: "https://www.youtube.com/embed/U8_nN_l32Wc", note: "Video muallifi: IT Creative UZ. Video boshqa muallifga tegishli; platforma faqat havolani ko'rsatadi." },
    task: {
      steps: ["Kompyuteringizda Kalkulyator ilovasini oching (yoki telefoningizdan foydalaning).", "12 + 8 amalini bajaring va natijani kuzating.", "Natija qanday kiritilgani, qayta ishlangani va chiqarilganini o'z so'zingiz bilan tushuntiring.", "Istasangiz, matn muharririda bir jumla yozib, fayl sifatida saqlang."],
      expectedResult: "Kiritish, qayta ishlash, chiqarish va saqlashning kamida uchta bosqichini misol bilan tushuntirasiz.",
      checklist: ["Kalkulyatorda amal bajardim", "Natijani qanday olganimni tushuntirdim", "Kompyuter ishlatiladigan 3 ta joyga misol keltirdim"]
    },
    miniGame: { title: "Qaysi bosqich?", prompt: "Klaviaturada 'Salom' deb yozish kompyuter ish jarayonining qaysi bosqichi?", options: ["Kiritish", "Chiqarish", "Saqlash"], correctIndex: 0, explanation: "Klaviatura orqali matn kompyuterga beriladi, bu kiritish (input) hisoblanadi." },
    quiz: [
      { question: "Kompyuterning eng umumiy vazifasi qaysi?", options: ["Faqat rasm ko'rsatish", "Ma'lumotni qabul qilish, qayta ishlash va natija chiqarish", "Faqat internetga ulanish"], correctIndex: 1, explanation: "Kompyuter ko'p turdagi ma'lumot bilan ishlaydi va turli natijalar chiqaradi." },
      { question: "Kalkulyatorga 12 + 8 kiritish qanday jarayon?", options: ["Kiritish", "Saqlash", "Chiqarish"], correctIndex: 0, explanation: "Sonlarni kalkulyatorga kiritish — input, natijani ko'rish esa output." },
      { question: "Hujjatni keyin ochish uchun saqlash nima deb ataladi?", options: ["Chiqarish", "Saqlash", "Kiritish"], correctIndex: 1, explanation: "Saqlash ma'lumotni keyinroq qayta foydalanish uchun yozib qo'yadi." }
    ],
    summary: ["Kompyuter ma'lumotni qabul qiladi, qayta ishlaydi va natija chiqaradi.", "Ma'lumot turli shaklda bo'ladi: matn, son, rasm, audio va video.", "Faylni saqlash natijani keyin yana ochishga yordam beradi."],
    nextLessonId: "l3"
  },

  l3: {
    id: "l3", number: 3, moduleId: "m1", title: "Kompyuter turlari: desktop, noutbuk, planshet, smartfon va server", level: "Boshlang'ich", estimatedMinutes: 25,
    prerequisites: ["l2"],
    objectives: ["Kompyuterning beshta keng tarqalgan turini ajratasiz.", "Ko'chma qurilma va server vazifasini tushunasiz.", "Vazifaga qarab mos qurilmani tanlashni mashq qilasiz."],
    explanationBlocks: [
      {
        heading: "Kompyuterning turli ko'rinishlari",
        paragraphs: [
          "Desktop odatda stol ustida turadi va ko'pincha monitor, klaviatura, sichqoncha hamda tizim blokidan tashkil topadi. Uning ayrim qismlarini almashtirish yoki yangilash osonroq bo'lishi mumkin.",
          "Noutbuk ko'chirib yurishga mos: ekran, klaviatura va asosiy qismlar bitta korpusga joylashgan. Planshet katta sensorli ekranga ega, smartfon esa cho'ntakka sig'adigan qurilma. Bularning barchasi dasturlarni ishga tushirishi va ma'lumot bilan ishlashi mumkin."
        ],
        image: { src: "assets/images/lesson-03/images.jpeg", alt: "Desktop, noutbuk, planshet, smartfon va server tasvirlari", caption: "Qurilmalarning ko'rinishi va qulayligi turlicha, lekin ularning barchasi ma'lumot bilan ishlaydi." }
      },
      {
        heading: "Server nima uchun kerak?",
        paragraphs: [
          "Server — boshqa kompyuterlar yoki ilovalarga xizmat ko'rsatadigan kompyuter yoki dastur. Masalan, siz veb-saytni ochganingizda, sayt ma'lumotlari serverdan kelishi mumkin.",
          "Server har doim oddiy tizim blokiga o'xshamasligi mumkin. U alohida xonada yoki ma'lumotlar markazida turishi, ko'plab foydalanuvchilarga bir vaqtning o'zida xizmat ko'rsatishi mumkin."
        ],
        callout: { title: "Tanlash bo'yicha misol", text: "O'qish va ko'chib yurish uchun noutbuk qulay bo'lishi mumkin. Og'ir grafik ishlar uchun kuchli desktop, sayt xizmatlari uchun esa server kerak bo'lishi mumkin." }
      }
    ],
    terms: [
      { term: "Desktop", definition: "Stol ustida ishlatiladigan shaxsiy kompyuter.", example: "Uy yoki ofisdagi alohida monitorli kompyuter." },
      { term: "Noutbuk (laptop)", definition: "Ekran va klaviaturasi bitta ko'chma korpusda bo'lgan kompyuter.", example: "Universitetga olib boriladigan kompyuter." },
      { term: "Planshet", definition: "Asosan sensorli ekran orqali boshqariladigan ko'chma qurilma.", example: "E-kitob o'qish yoki chizish uchun planshet." },
      { term: "Server", definition: "Boshqa foydalanuvchilar yoki qurilmalarga ma'lumot va xizmat taqdim etadigan tizim.", example: "Veb-sayt fayllarini foydalanuvchiga yetkazish." }
    ],
    video: { title: "Kompyuter qurilmalari: asosiy va qo'shimcha qurilmalar", language: "O'zbekcha", url: "https://www.youtube.com/watch?v=-bHMIyrO58s", embedUrl: "https://www.youtube.com/embed/-bHMIyrO58s", note: "Video muallifi: Shaxzod Yoqubov. U kompyuter qurilmalari mavzusiga kirish uchun tavsiya etiladi." },
    task: {
      steps: ["Atrofingizda mavjud qurilmalarni yozib chiqing: kompyuter, noutbuk, planshet yoki smartfon.", "Har bir qurilma asosan nima uchun ishlatilishini bir jumlada yozing.", "Bir tanishingizga qaysi vazifaga qaysi qurilma mosligini tushuntiring."],
      expectedResult: "Kamida uchta qurilma turini va ularning vazifasini ajrata olasiz.",
      checklist: ["Kamida 3 ta qurilmani sanab chiqdim", "Har birining vazifasini yozdim", "Server nima ekanini tushuntira olaman"]
    },
    miniGame: { title: "Qurilma detektivi", prompt: "Sayt fayllari saqlanib, internetdagi foydalanuvchilarga yuborilishida qaysi tizim xizmat qilishi mumkin?", options: ["Server", "Oddiy klaviatura", "Printer"], correctIndex: 0, explanation: "Server boshqa qurilmalarga xizmat va ma'lumot yetkazishi mumkin." },
    quiz: [
      { question: "Ko'chib yurish va universitetga olib borish uchun qaysi qurilma qulay?", options: ["Noutbuk", "Stol monitori", "Server shkafi"], correctIndex: 0, explanation: "Noutbuk ko'chma bo'lishi uchun yaratilgan." },
      { question: "Serverning asosiy vazifalaridan biri qaysi?", options: ["Faqat matn terish", "Boshqa qurilmalarga xizmat yoki ma'lumot taqdim etish", "Faqat ovoz chiqarish"], correctIndex: 1, explanation: "Server tarmoq orqali xizmat yoki ma'lumot yetkazishi mumkin." },
      { question: "Qaysi qurilma odatda sensorli ekranga tayanadi?", options: ["Planshet", "Tizim bloki", "Printer"], correctIndex: 0, explanation: "Planshet ko'pincha sensorli ekran orqali boshqariladi." }
    ],
    summary: ["Desktop, noutbuk, planshet va smartfon ko'chma yoki joyiga o'rnatilgan foydalanish uchun mo'ljallangan.", "Server boshqa qurilma va foydalanuvchilarga xizmat taqdim etadi.", "Qurilma tanlashda vazifa, qulaylik, narx va kerakli quvvatni hisobga oling."],
    nextLessonId: "l4"
  },

  l4: {
    id: "l4", number: 4, moduleId: "m2", title: "Klaviatura bilan tanishish va tez yozishga kirish", level: "Boshlang'ich", estimatedMinutes: 30,
    prerequisites: ["l3"],
    objectives: ["Klaviaturadagi asosiy tugmalar vazifasini bilasiz.", "Matn yozish uchun barmoqlarni qulay joylashtirish muhimligini tushunasiz.", "Monkeytype orqali boshlang'ich yozish mashqini bajarib ko'rasiz."],
    explanationBlocks: [
      {
        heading: "Klaviatura — ma'lumot kiritish qurilmasi",
        paragraphs: [
          "Klaviatura kompyuterga harflar, raqamlar, belgilar va buyruqlarni kiritish uchun ishlatiladi. Harflar bilan birga maxsus vazifali tugmalar ham bor: Enter, Backspace, Shift, Tab, Escape va Space.",
          "Backspace odatda kursorning chap tomonidagi belgini o'chiradi. Enter yangi qatorga o'tish yoki buyruqni tasdiqlash uchun ishlatiladi. Shift katta harf yoki tugmaning yuqori belgisini yozishga yordam beradi. Space so'zlar orasiga bo'sh joy qo'yadi."
        ],
        image: { src: "assets/images/lesson-04/keyboard.png", alt: "Klaviatura tugmalarining sodda sxemasi", caption: "Muhim tugmalarni o'rganing; joylashuv klaviatura turi va tiliga qarab o'zgarishi mumkin." }
      },
      {
        heading: "Tezlikdan oldin aniqlik",
        paragraphs: [
          "Yozishni endi o'rganayotgan paytda tez yozishga shoshilmang. Avval tugmalar joylashuviga ko'niking, xatolarni kamaytiring, keyin tezlik tabiiy ravishda oshadi.",
          "Monkeytype — brauzerda ishlaydigan yozish mashqi sayti. Unda vaqtli test, so'zlar va natija ko'rsatkichlari mavjud. Dastlab 15 yoki 30 soniyalik oson mashqni tanlang. Natijani yozib oling va bir necha kundan keyin yana solishtiring."
        ],
        callout: { title: "Boshlovchi uchun qoida", text: "Maqsad — birinchi kuni rekord o'rnatish emas. To'g'ri yozish va muntazam 5–10 daqiqalik mashq qilish muhim." }
      }
    ],
    terms: [
      { term: "Kursor", definition: "Matn ichida keyingi belgi qayerga yozilishini ko'rsatadigan belgi.", example: "Matnning o'rtasini bosib yozsangiz, yangi harflar kursor joyida paydo bo'ladi." },
      { term: "Backspace", definition: "Odatda kursorning chap tomonidagi belgini o'chiradigan tugma.", example: "Xato yozilgan oxirgi harfni o'chirish." },
      { term: "Shift", definition: "Boshqa tugma bilan birga katta harf yoki qo'shimcha belgini yozishga yordam beradi.", example: "Shift + a ko'p klaviaturalarda A yozadi." },
      { term: "WPM", definition: "Words per minute — bir daqiqada yozilgan so'zlar tezligi ko'rsatkichi.", example: "WPM yuqori bo'lishi mumkin, lekin aniqlik ham muhim." }
    ],
    video: { title: "Klaviatura yordamida matnni tez yozishni o'rganamiz", language: "O'zbekcha", url: "https://www.youtube.com/watch?v=hmp-O-PeXcQ", embedUrl: "https://www.youtube.com/embed/hmp-O-PeXcQ", note: "Video muallifi: Amu Web school. Klaviatura mashqiga kirish sifatida tavsiya etiladi." },
    task: {
      steps: ["Matn muharririni oching va ismingizni yozing.", "Backspace bilan bitta belgini o'chirib, qayta yozing.", "Shift yordamida bosh harf yozib ko'ring.", "Monkeytype saytini ochib, 15 yoki 30 soniyalik test bajaring.", "WPM va aniqlik ko'rsatkichlarini qayd eting; bir haftadan keyin qayta o'lchang."],
      expectedResult: "Asosiy tugmalarni amalda ishlatasiz va birinchi yozish natijangizni bilib olasiz.",
      checklist: ["Ismimni matn muharririda yozdim", "Backspace va Shiftni sinab ko'rdim", "Monkeytype testini bajardim", "Natijamni qayd qildim"],
      resources: [{ label: "Monkeytype — yozish mashqi", url: "https://monkeytype.com/", description: "Brauzerda tez va aniq yozishni mashq qilish uchun tashqi sayt." }]
    },
    miniGame: { title: "Tugma vazifasini top", prompt: "Kursorning chap tomonidagi belgini o'chirish uchun odatda qaysi tugma ishlatiladi?", options: ["Backspace", "Space", "Caps Lock"], correctIndex: 0, explanation: "Backspace ko'pchilik klaviaturalarda kursorning chap tomonidagi belgini o'chiradi." },
    quiz: [
      { question: "Matnni keyingi qatorga o'tkazish uchun qaysi tugma ishlatiladi?", options: ["Enter", "Shift", "Esc"], correctIndex: 0, explanation: "Matn muharririda Enter odatda yangi qatorga o'tkazadi." },
      { question: "WPM nimani anglatadi?", options: ["Bir daqiqadagi so'zlar soni", "Ekran yorqinligi", "Internet tezligi"], correctIndex: 0, explanation: "WPM — words per minute, ya'ni daqiqadagi so'zlar tezligi." },
      { question: "Yozishni o'rganishda birinchi navbatda nimaga e'tibor berish kerak?", options: ["Faqat tezlikka", "Aniqlik va qulay texnikaga", "Klaviaturani qattiq bosishga"], correctIndex: 1, explanation: "Avval aniqlikni oshirish, keyin tezlikni bosqichma-bosqich oshirish foydali." }
    ],
    summary: ["Klaviatura ma'lumot kiritish uchun xizmat qiladi.", "Enter, Backspace, Shift va Space kabi tugmalarni bilish zarur.", "Monkeytype orqali mashq qiling va WPM bilan aniqlikni solishtirib boring."],
    nextLessonId: null
  }
};
