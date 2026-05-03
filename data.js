const gamesInfo = [
  // Nintendo
  {
    id: "animal_crossing_new_horizons",
    name: "Animal Crossing: New Horizons",
    year: 2020,
    icon: "🏝️",
    platforms: ["nintendo"],
    genre: "חיים / בנייה",
    styles: ["רגוע", "בנייה", "איסוף", "חברים"],
    summary: "משחק רגוע של בניית אי, איסוף חפצים ועיצוב.",
    store: "https://www.nintendo.com/",
    tips: ["תשקיע בעיצוב האי בהדרגה.", "אסוף משאבים כל יום.", "דבר עם התושבים כדי לפתוח דברים חדשים."],
    strategies: ["תתחיל מאזור קטן באי ותשפר אותו.", "שמור חומרים חשובים לבנייה.", "אל תמכור כל דבר מיד."]
  },
  {
    id: "mario_kart_8_deluxe",
    name: "Mario Kart 8 Deluxe",
    year: 2017,
    icon: "🏎️",
    platforms: ["nintendo"],
    genre: "מירוצים",
    styles: ["מירוץ", "משפחה", "חברים", "כיף"],
    summary: "משחק מירוצים צבעוני עם דמויות מריו וחפצים.",
    store: "https://www.nintendo.com/",
    tips: ["למד Drift.", "שמור חפץ הגנה כשאתה ראשון.", "אל תיקח קיצור דרך אם אתה לא שולט בו."],
    strategies: ["בפניות ארוכות תתחיל Drift מוקדם.", "אם אתה ראשון, שמור Banana או Shell.", "במסלולים קשים שחק בטוח."]
  },
  {
    id: "zelda_breath_of_the_wild",
    name: "The Legend of Zelda: Breath of the Wild",
    year: 2017,
    icon: "🗡️",
    platforms: ["nintendo"],
    genre: "הרפתקה / עולם פתוח",
    styles: ["חקירה", "חידות", "קרבות", "עולם פתוח"],
    summary: "משחק עולם פתוח עם חקירה, חידות וקרבות.",
    store: "https://www.nintendo.com/",
    tips: ["חקור לפני שאתה רץ למשימה.", "אסוף אוכל ונשקים.", "נסה פתרונות יצירתיים."],
    strategies: ["לפני קרב קשה תכין אוכל.", "אם נתקעת בחידה בדוק את הסביבה.", "שדרג ציוד בהדרגה."]
  },
  {
    id: "zelda_tears_of_the_kingdom",
    name: "The Legend of Zelda: Tears of the Kingdom",
    year: 2023,
    icon: "🛡️",
    platforms: ["nintendo"],
    genre: "הרפתקה / עולם פתוח",
    styles: ["יצירה", "חקירה", "חידות", "קרבות"],
    summary: "הרפתקה ענקית עם בנייה, יצירה ופתרון חידות.",
    store: "https://www.nintendo.com/",
    tips: ["נסה לשלב חפצים.", "אל תפחד להתנסות.", "חקור גם שמיים וגם מערות."],
    strategies: ["בנה פתרונות פשוטים לפני מורכבים.", "שמור חומרים שימושיים.", "נצל גובה לטובתך."]
  },
  {
    id: "super_mario_odyssey",
    name: "Super Mario Odyssey",
    year: 2017,
    icon: "🍄",
    platforms: ["nintendo"],
    genre: "פלטפורמה",
    styles: ["משפחה", "קפיצות", "חקירה", "כיף"],
    summary: "משחק מריו תלת־ממדי עם עולמות מגוונים.",
    store: "https://www.nintendo.com/",
    tips: ["חפש ירחים סודיים.", "נסה לקפוץ לכל מקום חשוד.", "אל תרוץ מהר מדי בשלב חדש."],
    strategies: ["למד את תנועות מריו.", "חזור לשלבים אחרי שפתחת יכולות.", "חקור פינות נסתרות."]
  },
  {
    id: "pokemon_scarlet_violet",
    name: "Pokémon Scarlet & Violet",
    year: 2022,
    icon: "⚡",
    platforms: ["nintendo"],
    genre: "RPG / איסוף",
    styles: ["פוקימון", "איסוף", "קרבות", "עולם פתוח"],
    summary: "משחק פוקימון בעולם פתוח עם קרבות ואיסוף.",
    store: "https://www.pokemon.com/",
    tips: ["בדוק חולשות סוגים.", "אל תשתמש רק במתקפות חזקות.", "בנה צוות מגוון."],
    strategies: ["Physical לפוקימון עם Attack גבוה.", "Special לפוקימון עם Special Attack גבוה.", "שמור כיסוי נגד סוגים שונים."]
  },

  // PlayStation
  {
    id: "god_of_war_ragnarok",
    name: "God of War Ragnarök",
    year: 2022,
    icon: "🪓",
    platforms: ["playstation"],
    genre: "אקשן / הרפתקה",
    styles: ["קרבות", "סיפור", "בוסים", "אקשן"],
    summary: "משחק אקשן וסיפור עם קרבות חזקים.",
    store: "https://www.playstation.com/",
    tips: ["למד להתחמק בזמן.", "שדרג ציוד שמתאים לסגנון שלך.", "אל תבזבז התקפות מיוחדות סתם."],
    strategies: ["נגד בוסים למד דפוסי התקפה.", "השתמש במגן בזמן נכון.", "שנה נשק לפי אויב."]
  },
  {
    id: "spider_man_2",
    name: "Marvel's Spider-Man 2",
    year: 2023,
    icon: "🕷️",
    platforms: ["playstation"],
    genre: "עולם פתוח / אקשן",
    styles: ["גיבורי על", "קרבות", "עולם פתוח", "סיפור"],
    summary: "משחק ספיידרמן בעולם פתוח עם תנועה מהירה וקרבות.",
    store: "https://www.playstation.com/",
    tips: ["השתמש בגאדג'טים.", "אל תילחם רק על הקרקע.", "שדרג יכולות תנועה."],
    strategies: ["בקרבות גדולים הפרד אויבים.", "השתמש באוויר כדי לשלוט בקרב.", "נצל קומבואים."]
  },
  {
    id: "horizon_forbidden_west",
    name: "Horizon Forbidden West",
    year: 2022,
    icon: "🏹",
    platforms: ["playstation", "pc"],
    genre: "RPG / עולם פתוח",
    styles: ["חקירה", "קרבות", "קשת", "עולם פתוח"],
    summary: "עולם פתוח עם מכונות, קשתות ואסטרטגיית קרב.",
    store: "https://www.playstation.com/",
    tips: ["סרוק אויבים לפני קרב.", "כוון לנקודות חלשות.", "הכן חצים מסוגים שונים."],
    strategies: ["נצל אלמנטים נגד מכונות.", "הצב מלכודות לפני קרב.", "אל תסתער בלי סריקה."]
  },
  {
    id: "the_last_of_us_part_ii",
    name: "The Last of Us Part II",
    year: 2020,
    icon: "🌿",
    platforms: ["playstation", "pc"],
    genre: "אקשן / הישרדות",
    styles: ["סיפור", "הישרדות", "התגנבות", "אקשן"],
    summary: "משחק סיפור והישרדות עם קרבות קשים.",
    store: "https://www.playstation.com/",
    tips: ["חסוך תחמושת.", "התגנבות עדיפה מקרב פתוח.", "בדוק כל חדר לחומרים."],
    strategies: ["נצל בקבוקים ולבנים להסחה.", "הפרד אויבים.", "אל תבזבז משאבים על אויב בודד."]
  },

  // Xbox
  {
    id: "halo_infinite",
    name: "Halo Infinite",
    year: 2021,
    icon: "🪐",
    platforms: ["xbox", "pc"],
    genre: "יריות",
    styles: ["יריות", "מדע בדיוני", "קמפיין", "אונליין"],
    summary: "משחק יריות מדע בדיוני עם קמפיין ואונליין.",
    store: "https://www.xbox.com/",
    tips: ["השתמש ברימונים.", "החלף נשק לפי מרחק.", "השתמש ב־Grappleshot."],
    strategies: ["שלוט בגובה.", "קח נשקים חזקים במפה.", "אל תרוץ לבד מול כמה אויבים."]
  },
  {
    id: "forza_horizon_5",
    name: "Forza Horizon 5",
    year: 2021,
    icon: "🏁",
    platforms: ["xbox", "pc"],
    genre: "מירוצים",
    styles: ["מירוץ", "מכוניות", "עולם פתוח", "מהירות"],
    summary: "משחק מירוצים בעולם פתוח עם הרבה מכוניות.",
    store: "https://www.xbox.com/",
    tips: ["שפר רכב לפי סוג מירוץ.", "אל תאיץ בכל פנייה.", "למד בלימה נכונה."],
    strategies: ["למרוצי שטח בחר רכב מתאים.", "בכביש השתמש ברכב יציב.", "שפר אחיזה לפני כוח."]
  },
  {
    id: "starfield",
    name: "Starfield",
    year: 2023,
    icon: "🚀",
    platforms: ["xbox", "pc"],
    genre: "RPG / חלל",
    styles: ["חלל", "חקירה", "RPG", "סיפור"],
    summary: "RPG חלל עם חקירה, משימות ובניית דמות.",
    store: "https://www.xbox.com/",
    tips: ["התמקד בסקילים שמתאימים לסגנון שלך.", "שדרג ספינה בהדרגה.", "חקור כוכבים למשאבים."],
    strategies: ["בחר תפקיד ברור לדמות.", "אל תסחוב יותר מדי.", "שפר נשקים לפי אויבים."]
  },

  // PC
  {
    id: "valorant",
    name: "Valorant",
    year: 2020,
    icon: "🔺",
    platforms: ["pc"],
    genre: "יריות טקטי",
    styles: ["יריות", "אסטרטגיה", "תחרותי", "קבוצה"],
    summary: "משחק יריות טקטי עם דמויות ויכולות.",
    store: "https://playvalorant.com/",
    tips: ["אל תירה תוך כדי ריצה.", "שים כוונת בגובה הראש.", "דבר עם הקבוצה."],
    strategies: ["השתמש ביכולות לפני כניסה.", "אל תציץ מאותה פינה שוב.", "שחק לאט כשיש יתרון."]
  },
  {
    id: "league_of_legends",
    name: "League of Legends",
    year: 2009,
    icon: "🧙",
    platforms: ["pc"],
    genre: "MOBA",
    styles: ["אסטרטגיה", "קבוצה", "דמויות", "תחרותי"],
    summary: "משחק MOBA קבוצתי עם דמויות ותפקידים.",
    store: "https://www.leagueoflegends.com/",
    tips: ["אל תדחוף ליין בלי ראייה.", "למד דמות אחת טוב.", "Farm חשוב מאוד."],
    strategies: ["שים wards.", "אל תילחם כשאתה מאחור.", "שחק סביב objectives."]
  },
  {
    id: "counter_strike_2",
    name: "Counter-Strike 2",
    year: 2023,
    icon: "💣",
    platforms: ["pc"],
    genre: "יריות טקטי",
    styles: ["יריות", "תחרותי", "דיוק", "קבוצה"],
    summary: "משחק יריות טקטי קלאסי עם קבוצות ודיוק.",
    store: "https://store.steampowered.com/",
    tips: ["אל תירה תוך כדי ריצה.", "למד Recoil.", "תקשורת חשובה."],
    strategies: ["בדוק פינות.", "שמור כסף לקנייה נכונה.", "אל תעשה push לבד."]
  },
  {
    id: "minecraft",
    name: "Minecraft",
    year: 2011,
    icon: "⛏️",
    platforms: ["pc", "xbox", "playstation", "nintendo", "mobile"],
    genre: "בנייה והישרדות",
    styles: ["בנייה", "חציבה", "הישרדות", "יצירה"],
    summary: "משחק עולם פתוח של בנייה, חציבה, הישרדות ויצירה.",
    store: "https://www.minecraft.net/",
    tips: ["פיקאקס חשוב לבנייה וחציבה.", "קח לפידים למערות.", "תבנה בסיס לפני הלילה."],
    strategies: ["שים לפידים בצד אחד במערה.", "שדרג כלים לפי הצורך.", "אל תחפור ישר למטה."]
  },

  // Mobile
  {
    id: "brawl_stars",
    name: "Brawl Stars",
    year: 2018,
    icon: "⭐",
    platforms: ["mobile"],
    genre: "קרבות מהירים",
    styles: ["קרבות", "דמויות", "קבוצה", "תחרותי"],
    summary: "משחק קרבות קצר עם דמויות ומודים שונים.",
    store: "https://supercell.com/en/games/brawlstars/",
    tips: ["ב־Brawl Ball מסירה חשובה.", "אל תשפר רק לפי נדירות.", "שחק מאחורי קירות."],
    strategies: ["אל תרוץ לבד עם הכדור.", "ב־Gem Grab אל תמות עם יהלומים.", "התאם דמות למפה."]
  },
  {
    id: "clash_royale",
    name: "Clash Royale",
    year: 2016,
    icon: "👑",
    platforms: ["mobile"],
    genre: "קלפים ואסטרטגיה",
    styles: ["אסטרטגיה", "קלפים", "קצר", "תחרותי"],
    summary: "משחק קלפים בזמן אמת עם מגדלים ואליקסיר.",
    store: "https://supercell.com/en/games/clashroyale/",
    tips: ["אל תבזבז Elixir.", "הגנה ואז התקפה.", "Deck מאוזן חשוב."],
    strategies: ["שמור קלף נגד טנק.", "אל תשים הכל באותו צד.", "תן ליריב להתחיל אם אתה לא בטוח."]
  },
  {
    id: "clash_of_clans",
    name: "Clash of Clans",
    year: 2012,
    icon: "🏰",
    platforms: ["mobile"],
    genre: "בנייה ואסטרטגיה",
    styles: ["בנייה", "שדרוגים", "אסטרטגיה", "מלחמות"],
    summary: "משחק בניית בסיס ומלחמות שבטים.",
    store: "https://supercell.com/en/games/clashofclans/",
    tips: ["אל תשדרג Town Hall מהר מדי.", "שמור Builder עובד.", "אל תבזבז Gems."],
    strategies: ["שדרג הגנות וצבא יחד.", "תכנן תקיפה לפני מלחמה.", "הגן על מחסנים."]
  }
];

const techProblems = [
  {
    keywords: ["קורס", "crash", "נסגר", "תקוע", "freeze", "לא נפתח"],
    answer: "נסה לפי הסדר: סגור את המשחק, הפעל מחדש, בדוק עדכון למשחק, פנה מקום אחסון ובדוק עדכון מערכת."
  },
  {
    keywords: ["שלט", "controller", "joy con", "dualsense", "לא מתחבר"],
    answer: "טען את השלט, נסה כבל אחר, מחק חיבור ישן וחבר מחדש. אם זה Switch בדוק Controllers → Change Grip/Order."
  },
  {
    keywords: ["אינטרנט", "wifi", "online", "לא מתחבר", "network", "nat"],
    answer: "בדוק שהאינטרנט עובד במכשיר אחר, הפעל ראוטר מחדש, בדוק NAT Type ונסה רשת אחרת."
  },
  {
    keywords: ["dlc", "הרחבה", "לא מופיע", "תוכן נוסף"],
    answer: "בדוק שה־DLC נקנה באותו חשבון ואותו אזור חנות כמו המשחק, ושהוא הורד בפועל."
  }
];
