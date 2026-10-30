# Computer Science Foundation — V1

Kompyuter savodxonligini bosqichma-bosqich o'rgatadigan boshlang'ich web-platforma. Hozirgi ZIP ichida to'rtta dars to'liq namunaviy holatda tayyorlangan. Boshqa modullar o'quv dasturiga mos ravishda keyingi bosqichlarda to'ldiriladi.

## Ishga tushirish

1. ZIP faylni oching.
2. VS Code'da `cs-foundation` papkasini `File → Open Folder...` orqali oching.
3. Agar VS Code oynasida Restricted Mode ko'rinsa, faqat loyihaning manbasiga ishonchingiz komil bo'lsa `Manage → Trust this folder` ni tanlang. Ishonchingiz komil bo'lmasa, Restricted Mode'da qoldiring.
4. `index.html` faylini Live Server orqali oching yoki brauzerda oching.
5. `index.html`, `css/style.css`, `js/data.js`, `js/progress.js` va `js/script.js` fayllarini bir-biridan ajratilgan holda saqlang.

## Papka tuzilishi

```text
cs-foundation/
├── index.html
├── css/style.css
├── js/
│   ├── data.js       # modullar, dars mazmuni, atamalar, videolar, testlar va o'yinlar
│   ├── progress.js   # localStorage, faol vaqt, kunlik faollik, natijalar
│   └── script.js     # darslarni ko'rsatish, test/o'yin va navigatsiya
├── assets/images/
│   ├── lesson-01/learning-path.svg
│   ├── lesson-02/computer-cycle.svg
│   ├── lesson-03/computer-types.svg
│   └── lesson-04/keyboard-layout.svg
└── README.md
```

## Hozir ishlaydigan funksiyalar

- Modullar va mavjud darslar ro'yxati.
- Har bir izoh bo'limidagi matn yonida tegishli sxema/rasm (kichik ekranda matndan keyin ko'rsatiladi).
- Muhim atamalar, ta'rif va misollar.
- YouTube videosini sahifa ichida ko'rish va YouTube'da alohida ochish havolasi.
- Amaliy qadamlar va saqlanadigan checklist.
- Javob izohiga ega mini-o'yin.
- Natijani hisoblaydigan mini-test; urinishlar, oxirgi va eng yaxshi natija saqlanadi.
- Darsni yakunlash: checklistlar bajarilgan va test natijasi kamida 60% bo'lishi kerak.
- Oxirgi 13 haftalik faollik heatmapi, faol daqiqalar, streak va oxirgi test natijalari.
- Progress hozircha faqat shu brauzerning localStorage'ida saqlanadi; boshqa qurilmalar bilan sinxronlash yo'q.

## Kontent modeli (`js/data.js`)

Har bir dars quyidagi maydonlardan foydalanadi:

- `id`, `number`, `moduleId`, `title`, `level`, `estimatedMinutes`, `prerequisites`
- `objectives`: dars maqsadlari
- `explanationBlocks`: sarlavha, matn paragraflari va shu matnga tegishli rasm/sxema
- `terms`: atama, ta'rif va misol
- `video`: nom, til, YouTube URL va embed URL
- `task`: qadamlar, kutiladigan natija, checklist va ixtiyoriy tashqi resurslar
- `miniGame`: savol, javob variantlari va to'g'ri javob izohi
- `quiz`: test savollari, javob variantlari, to'g'ri javob indeksi va izoh
- `summary`, `nextLessonId`

Yangi dars qo'shganda yangi `lesson-XX` rasm papkasini yaratib, `explanationBlocks` ichida `image.src` manzilini ko'rsating. Agar rasm hali mavjud bo'lmasa, brauzer uni topolmaganini bildiradi.

## Video va tashqi resurslar

Video manzillarini dars mavzusiga mosligini tekshirib qo'shing. YouTube videolari boshqa muallifga tegishli bo'lib qoladi; platforma ularni joylashtirish/ko'rish uchun havola beradi. Video o'chirilsa yoki embed cheklangan bo'lsa, YouTube'da alohida ochish havolasi qoladi.

`l4` klaviatura darsida Monkeytype tashqi mashq sifatida berilgan: https://monkeytype.com/

## Progress qanday hisoblanadi?

- Dars sahifasi ko'rinib turgan va brauzer tab'i faol bo'lgan vaqt hisoblanadi.
- Testning oxirgi va eng yaxshi foizi saqlanadi.
- Checklist holati darslar orasida saqlanadi.
- Kunlik faollik mahalliy sana bo'yicha yoziladi.
- Brauzer ma'lumotlari tozalansa, localStorage'dagi natijalar yo'qolishi mumkin. Akkaunt va ma'lumotlar bazasi orqali sinxronlash keyingi versiyaga tegishli.

## Tekshirish ro'yxati

- [ ] Bosh sahifada 1-, 2- va 3-modul uchun mavjud kontent ko'rinadi.
- [ ] 1–4 darsni ochib bo'ladi; rasmlar chiqadi.
- [ ] Video iframe va YouTube havolasi ko'rinadi.
- [ ] Monkeytype havolasi yangi tabda ochiladi.
- [ ] Checklist belgilanganda sahifani yangilagandan keyin ham saqlanadi.
- [ ] Mini-o'yin javobi va test natijasi to'g'ri tekshiriladi.
- [ ] Test natijasi va dars yakunlangani Progress bo'limida ko'rinadi.
- [ ] Telefon yoki tor ekran o'lchamida matn hamda rasmlar ekranga moslashadi.

## GitHub'ga yuborish

VS Code terminalida loyiha papkasidan:

```bash
git status
git add .
git commit -m "Improve lesson reading, quiz and progress"
git push
```

Har bir mantiqiy bosqichdan keyin `git status` orqali o'zgarishlarni tekshiring.
