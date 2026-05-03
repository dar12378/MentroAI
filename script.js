const playerName = document.getElementById("playerName");
const mainGame = document.getElementById("mainGame");
const playStyle = document.getElementById("playStyle");
const saveProfileBtn = document.getElementById("saveProfileBtn");

const streakBox = document.getElementById("streakBox");
const gemsBox = document.getElementById("gemsBox");
const dailyTip = document.getElementById("dailyTip");

const questionInput = document.getElementById("questionInput");
const adviceBtn = document.getElementById("adviceBtn");
const answerBox = document.getElementById("answerBox");

const techInput = document.getElementById("techInput");
const techBtn = document.getElementById("techBtn");
const techAnswer = document.getElementById("techAnswer");

const buyGlowBtn = document.getElementById("buyGlowBtn");
const buyAvatarBtn = document.getElementById("buyAvatarBtn");
const shopMessage = document.getElementById("shopMessage");

let user = JSON.parse(localStorage.getItem("playpilot_user")) || {
  name: "",
  game: "",
  style: "",
  streak: 0,
  gems: 0,
  lastVisit: "",
  glow: false,
  avatar: false,
  progress: []
};

function saveUser() {
  localStorage.setItem("playpilot_user", JSON.stringify(user));
}

function loadUser() {
  playerName.value = user.name || "";
  mainGame.value = user.game || "";
  playStyle.value = user.style || "";
  updateStats();
  handleDailyLogin();
  showDailyTip();
}

function updateStats() {
  streakBox.textContent = user.streak;
  gemsBox.textContent = user.gems;

  if (user.glow && user.name) {
    document.querySelector("h1").innerHTML = `<span class="glow-name">PlayPilot</span>`;
  }
}

function handleDailyLogin() {
  const today = new Date().toDateString();

  if (user.lastVisit !== today) {
    user.streak += 1;
    user.lastVisit = today;

    if (user.streak % 10 === 0) {
      user.gems += 50;
      shopMessage.textContent = "כל הכבוד! קיבלת 50 יהלומים על 10 ימים רצופים!";
    }

    saveUser();
    updateStats();
  }
}

function showDailyTip() {
  const game = user.game || "minecraft";
  const list = tips[game] || tips.minecraft;
  const index = new Date().getDate() % list.length;
  dailyTip.textContent = list[index];
}

saveProfileBtn.addEventListener("click", () => {
  user.name = playerName.value.trim();
  user.game = mainGame.value;
  user.style = playStyle.value;
  saveUser();
  showDailyTip();
  updateStats();
  answerBox.textContent = "הפרופיל נשמר. עכשיו העצות יהיו מותאמות אליך.";
});

document.querySelectorAll(".progress-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const today = new Date().toLocaleDateString("he-IL");

    user.progress.push({
      game: user.game,
      action,
      date: today
    });

    user.gems += 2;
    saveUser();
    updateStats();

    answerBox.innerHTML = `
      שמרתי את ההתקדמות שלך ✅<br>
      קיבלת 2 יהלומים 💎<br>
      עצה: ${getProgressAdvice(action)}
    `;
  });
});

function getProgressAdvice(action) {
  if (action === "level") return "עכשיו כדאי לבדוק אם נפתח לך שדרוג חדש.";
  if (action === "win") return "נסה להבין מה עבד טוב בקרב הזה וחזור על זה.";
  if (action === "stuck") return "נסה לשנות נשק, דמות או דרך משחק במקום להמשיך אותו דבר.";
  if (action === "item") return "בדוק אם הפריט החדש מתאים לסגנון המשחק שלך.";
  return "תמשיך לעקוב אחרי ההתקדמות.";
}

adviceBtn.addEventListener("click", () => {
  const q = questionInput.value.toLowerCase();
  const game = user.game;
  const style = user.style;

  if (!q) {
    answerBox.textContent = "כתוב מה ההתלבטות שלך.";
    return;
  }

  let answer = "הנה העצה שלי: ";

  if (game === "minecraft" || q.includes("מיינקראפט")) {
    if (q.includes("פיקאקס") || q.includes("חרב")) {
      answer += "אם אתה חוצב ובונה הרבה — פיקאקס קודם. אם אתה נלחם הרבה במובים — חרב קודם. אם אתה עושה גם וגם, תשפר פיקאקס ואז חרב.";
    } else {
      answer += "במיינקראפט תבחר ציוד לפי סגנון: בנייה וחציבה = כלים, קרבות = חרב ומגן.";
    }
  } else if (game === "brawl" || q.includes("ברואל")) {
    answer += "ב־Brawl Stars אל תקנה דמות רק לפי נדירות. תבדוק אם היא מתאימה לסגנון שלך ולמודים שאתה משחק. אם אתה אוהב התקפה — דמות עם נזק ובריחה. אם אתה אוהב שליטה — דמות עם טווח או שליטה באזור.";
  } else if (game === "pokemon" || q.includes("פוקימון")) {
    answer += "בפוקימון תבחר מתקפות לפי הסטטים של הפוקימון. Physical לפוקימון עם Attack גבוה, Special לפוקימון עם Special Attack גבוה.";
  } else {
    answer += "בחר לפי הסגנון שלך. אם אתה אוהב להילחם — כוח ונזק. אם אתה אוהב לחשוב — שליטה ואסטרטגיה. אם אתה אוהב לאסוף — השקעה בדמויות/פריטים לטווח ארוך.";
  }

  if (style === "fight") answer += "<br>לפי הסגנון שלך, כדאי לך לבחור דברים שנותנים כוח בקרבות.";
  if (style === "build") answer += "<br>לפי הסגנון שלך, כדאי להשקיע בכלים ובדברים שעוזרים לבנייה.";
  if (style === "smart") answer += "<br>לפי הסגנון שלך, כדאי לבחור דמויות או פריטים עם שליטה ואסטרטגיה.";
  if (style === "collect") answer += "<br>לפי הסגנון שלך, כדאי להשקיע בדברים שנשארים לך לטווח ארוך.";

  answerBox.innerHTML = answer;
});

techBtn.addEventListener("click", () => {
  const q = techInput.value.toLowerCase();

  if (!q) {
    techAnswer.textContent = "כתוב את הבעיה הטכנית.";
    return;
  }

  const match = techProblems.find((p) =>
    p.keywords.some((k) => q.includes(k))
  );

  techAnswer.textContent = match
    ? match.answer
    : "נסה לעדכן את המשחק, להפעיל מחדש את המכשיר, לבדוק אינטרנט, לפנות מקום אחסון ולחפש קוד שגיאה מדויק.";
});

buyGlowBtn.addEventListener("click", () => {
  if (user.gems < 30) {
    shopMessage.textContent = "אין מספיק יהלומים.";
    return;
  }

  user.gems -= 30;
  user.glow = true;
  saveUser();
  updateStats();
  shopMessage.textContent = "קנית שם זוהר!";
});

buyAvatarBtn.addEventListener("click", () => {
  if (user.gems < 50) {
    shopMessage.textContent = "אין מספיק יהלומים.";
    return;
  }

  user.gems -= 50;
  user.avatar = true;
  saveUser();
  updateStats();
  shopMessage.textContent = "קנית תמונת פרופיל מיוחדת!";
});

loadUser();
