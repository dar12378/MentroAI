const pages = document.querySelectorAll(".page");
const navBtns = document.querySelectorAll(".nav-btn");

const helloTitle = document.getElementById("helloTitle");
const streakBox = document.getElementById("streakBox");
const gemsBox = document.getElementById("gemsBox");
const shopGems = document.getElementById("shopGems");

const playerName = document.getElementById("playerName");
const playerEmail = document.getElementById("playerEmail");
const customStyle = document.getElementById("customStyle");
const saveProfileBtn = document.getElementById("saveProfileBtn");

const addGameSelect = document.getElementById("addGameSelect");
const addGameBtn = document.getElementById("addGameBtn");
const customGameName = document.getElementById("customGameName");
const customGameStyle = document.getElementById("customGameStyle");
const addCustomGameBtn = document.getElementById("addCustomGameBtn");
const myGamesList = document.getElementById("myGamesList");

const todayText = document.getElementById("todayText");
const dailyTip = document.getElementById("dailyTip");
const openTipBtn = document.getElementById("openTipBtn");
const tipDetails = document.getElementById("tipDetails");
const nextMissionText = document.getElementById("nextMissionText");

const missionOutput = document.getElementById("missionOutput");

const adviceGameSelect = document.getElementById("adviceGameSelect");
const adviceInput = document.getElementById("adviceInput");
const adviceBtn = document.getElementById("adviceBtn");
const adviceOutput = document.getElementById("adviceOutput");

const techGameSelect = document.getElementById("techGameSelect");
const techInput = document.getElementById("techInput");
const techBtn = document.getElementById("techBtn");
const techOutput = document.getElementById("techOutput");

const shopMessage = document.getElementById("shopMessage");

let user = JSON.parse(localStorage.getItem("mentro_user")) || {
  name: "",
  email: "",
  style: "",
  platforms: [],
  games: [],
  customGames: [],
  likedGames: [],
  streak: 0,
  gems: 0,
  lastVisit: "",
  purchases: [],
  missionsDone: []
};

function saveUser() {
  localStorage.setItem("mentro_user", JSON.stringify(user));
}

function setPage(pageId) {
  pages.forEach(page => page.classList.remove("active-page"));
  navBtns.forEach(btn => btn.classList.remove("active"));

  document.getElementById(pageId).classList.add("active-page");
  document.querySelector(`[data-page="${pageId}"]`).classList.add("active");
}

navBtns.forEach(btn => {
  btn.addEventListener("click", () => setPage(btn.dataset.page));
});

document.querySelectorAll("[data-go]").forEach(btn => {
  btn.addEventListener("click", () => setPage(btn.dataset.go));
});

function fillGameSelects() {
  [addGameSelect, adviceGameSelect, techGameSelect].forEach(select => {
    select.innerHTML = `<option value="">בחר משחק</option>`;

    gamesInfo.forEach(game => {
      const option = document.createElement("option");
      option.value = game.id;
      option.textContent = game.name;
      select.appendChild(option);
    });
  });
}

function handleDailyLogin() {
  const today = new Date().toDateString();

  if (user.lastVisit !== today) {
    user.streak += 1;
    user.lastVisit = today;

    if (user.streak % 10 === 0) {
      user.gems += 50;
      shopMessage.textContent = "🔥 קיבלת 50 יהלומים על 10 ימים רצופים!";
    }

    saveUser();
  }
}

function renderAll() {
  helloTitle.textContent = user.name ? `שלום ${user.name} 👋` : "שלום 👋";
  streakBox.textContent = user.streak;
  gemsBox.textContent = user.gems;
  shopGems.textContent = user.gems;

  playerName.value = user.name;
  playerEmail.value = user.email;
  customStyle.value = user.style;

  document.querySelectorAll(".platform-check").forEach(check => {
    check.checked = user.platforms.includes(check.value);
  });

  renderHome();
  renderGames();
  renderDailyTip();
}

function getMainGame() {
  const firstGameId = user.games[0];

  if (firstGameId) {
    return gamesInfo.find(game => game.id === firstGameId);
  }

  if (user.customGames.length) {
    return user.customGames[0];
  }

  return null;
}

function renderHome() {
  const game = getMainGame();

  if (!game) {
    todayText.textContent = "הוסף משחק ראשון כדי לקבל עצות, משימות והמלצות.";
    nextMissionText.textContent = "הוסף משחק ראשון.";
    return;
  }

  todayText.innerHTML = `
    המשחק שלך היום: <b>${game.name}</b><br>
    הסגנון שלך: ${user.style || "עוד לא כתבת סגנון"}<br>
    Mentro ילמד מה אתה אוהב וייתן לך עצות יומיות.
  `;

  nextMissionText.textContent = `שחק היום ב־${game.name} וסמן משימה כדי לקבל יהלומים.`;
}

function renderDailyTip() {
  const game = getMainGame();

  if (!game) {
    dailyTip.textContent = "הוסף משחק כדי לקבל טיפ יומי.";
    tipDetails.classList.add("hidden");
    return;
  }

  const tips = game.tips || ["שחק לאט, תבין את המפה, ותבחר לפי הסגנון שלך."];
  const strategies = game.strategies || ["נסה לשחק סיבוב אחד רק כדי ללמוד ולא רק כדי לנצח."];

  const index = new Date().getDate() % tips.length;

  dailyTip.textContent = tips[index];

  openTipBtn.onclick = () => {
    tipDetails.innerHTML = `
      <b>אסטרטגיה לדוגמה:</b><br>
      ${strategies[index % strategies.length]}<br><br>
      <b>משימה קטנה:</b><br>
      שחק סיבוב אחד ותנסה להשתמש בטיפ הזה.
    `;
    tipDetails.classList.toggle("hidden");
  };
}

saveProfileBtn.addEventListener("click", () => {
  user.name = playerName.value.trim();
  user.email = playerEmail.value.trim();
  user.style = customStyle.value.trim();

  user.platforms = [...document.querySelectorAll(".platform-check:checked")]
    .map(check => check.value);

  user.gems += 3;
  saveUser();
  renderAll();

  alert("הפרופיל נשמר! קיבלת 3 יהלומים 💎");
});

addGameBtn.addEventListener("click", () => {
  const id = addGameSelect.value;

  if (!id) return;

  if (!user.games.includes(id)) {
    user.games.push(id);
    user.gems += 5;
    saveUser();
    renderAll();
  }
});

addCustomGameBtn.addEventListener("click", () => {
  const name = customGameName.value.trim();
  const style = customGameStyle.value.trim();

  if (!name) return;

  const newGame = {
    id: "custom_" + Date.now(),
    name,
    icon: "🎮",
    genre: style || "משחק אישי",
    styles: style ? style.split(",").map(x => x.trim()) : ["אישי"],
    summary: `משחק אישי שהוספת: ${name}`,
    tips: [
      `ב־${name}, תעקוב אחרי מה שעובד לך ותשפר את הסגנון שלך.`,
      `נסה לשחק סיבוב אחד ב־${name} רק כדי ללמוד, לא רק לנצח.`
    ],
    strategies: [
      `כתוב מה קשה לך ב־${name}, ו־Mentro ינסה לתת עצה לפי הסגנון שלך.`,
      `אם אתה נתקע, שנה דרך משחק במקום לחזור על אותה טעות.`
    ],
    store: "#"
  };

  user.customGames.push(newGame);
  user.gems += 5;

  customGameName.value = "";
  customGameStyle.value = "";

  saveUser();
  renderAll();
});

function renderGames() {
  myGamesList.innerHTML = "";

  const knownGames = user.games
    .map(id => gamesInfo.find(game => game.id === id))
    .filter(Boolean);

  const allUserGames = [...knownGames, ...user.customGames];

  if (!allUserGames.length) {
    myGamesList.innerHTML = `<div class="big-answer">עוד לא הוספת משחקים.</div>`;
    return;
  }

  allUserGames.forEach(game => {
    const liked = user.likedGames.includes(game.id);

    const div = document.createElement("div");
    div.className = "game-card";

    div.innerHTML = `
      <div class="game-img">${game.icon || "🎮"}</div>
      <h3>${game.name}</h3>
      <p>${game.summary || ""}</p>

      <button class="heart ${liked ? "liked" : ""}" data-like="${game.id}">
        ${liked ? "❤️ אהבתי" : "♡ שים לב"}
      </button>

      <button data-progress="${game.id}" data-action="played">🎮 שיחקתי היום</button>
      <button data-progress="${game.id}" data-action="stuck">🚧 נתקעתי</button>

      ${game.store && game.store !== "#"
        ? `<a class="store-link" href="${game.store}" target="_blank">פתח אתר / חנות</a>`
        : ""}
    `;

    myGamesList.appendChild(div);
  });

  document.querySelectorAll("[data-like]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.like;

      if (user.likedGames.includes(id)) {
        user.likedGames = user.likedGames.filter(x => x !== id);
      } else {
        user.likedGames.push(id);
        user.gems += 2;
      }

      saveUser();
      renderAll();
    });
  });

  document.querySelectorAll("[data-progress]").forEach(btn => {
    btn.addEventListener("click", () => {
      user.gems += btn.dataset.action === "stuck" ? 4 : 3;

      user.missionsDone.push({
        game: btn.dataset.progress,
        action: btn.dataset.action,
        date: new Date().toLocaleDateString("he-IL")
      });

      saveUser();
      renderAll();
    });
  });
}

document.querySelectorAll(".mission").forEach(btn => {
  btn.addEventListener("click", () => {
    const mission = btn.dataset.mission;

    const rewards = {
      play: 5,
      win: 8,
      learn: 6,
      stuck: 4
    };

    user.gems += rewards[mission] || 3;

    user.missionsDone.push({
      mission,
      date: new Date().toLocaleDateString("he-IL")
    });

    saveUser();
    renderAll();

    missionOutput.innerHTML = `
      כל הכבוד! השלמת משימה ✅<br>
      קיבלת ${rewards[mission]} יהלומים 💎<br>
      תמשיך רצף כדי להגיע לבונוס של 10 ימים.
    `;
  });
});

adviceBtn.addEventListener("click", () => {
  const gameId = adviceGameSelect.value || user.games[0];
  const game =
    gamesInfo.find(g => g.id === gameId) ||
    user.customGames.find(g => g.id === gameId) ||
    getMainGame();

  const q = adviceInput.value.trim().toLowerCase();

  if (!game) {
    adviceOutput.textContent = "הוסף משחק או בחר משחק כדי לקבל עצה.";
    return;
  }

  if (!q) {
    adviceOutput.textContent = "כתוב מה ההתלבטות שלך.";
    return;
  }

  let answer = `<b>${game.name}</b><br><br>`;

  if (q.includes("לקנות") || q.includes("שווה") || q.includes("דמות")) {
    answer += `אל תקנה רק בגלל שזה נדיר או נראה מגניב. תבדוק אם זה מתאים לסגנון שלך: ${user.style || "לא הוגדר עדיין"}.<br><br>`;
  }

  if (q.includes("חרב") || q.includes("פיקאקס")) {
    answer += "אם אתה חוצב ובונה הרבה — פיקאקס קודם. אם אתה נלחם הרבה — חרב קודם. אם אתה עושה גם וגם — פיקאקס ואז חרב.<br><br>";
  }

  if (q.includes("בראול") || q.includes("brawl")) {
    answer += "ב־Brawl Stars תבחר דמות לפי המוד: ב־Brawl Ball חשוב שליטה בכדור וקירות; ב־Gem Grab חשוב לא למות עם יהלומים; במפות פתוחות דמות טווח חזקה יותר.<br><br>";
  }

  answer += `<b>טיפ מותאם:</b><br>${game.tips[0] || "שחק חכם ולא מהר מדי."}<br><br>`;
  answer += `<b>אסטרטגיה:</b><br>${game.strategies[0] || "נסה דרך אחרת אם אתה נתקע."}`;

  adviceOutput.innerHTML = answer;
});

techBtn.addEventListener("click", () => {
  const text = techInput.value.trim().toLowerCase();

  if (!text) {
    techOutput.textContent = "כתוב מה הבעיה.";
    return;
  }

  const match = techProblems.find(problem =>
    problem.keywords.some(k => text.includes(k.toLowerCase()))
  );

  techOutput.textContent = match
    ? match.answer
    : "נסה לפי הסדר: הפעלה מחדש, עדכון משחק, בדיקת אינטרנט, פינוי מקום אחסון, ואז בדיקת קוד שגיאה מדויק.";
});

document.querySelectorAll("[data-buy]").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.dataset.buy;

    const prices = {
      crown: 80,
      fireName: 60,
      robot: 50,
      wizard: 50,
      rainbowBg: 40,
      speed: 30
    };

    const price = prices[item];

    if (user.purchases.includes(item)) {
      shopMessage.textContent = "כבר קנית את זה.";
      return;
    }

    if (user.gems < price) {
      shopMessage.textContent = "אין לך מספיק יהלומים.";
      return;
    }

    user.gems -= price;
    user.purchases.push(item);

    saveUser();
    renderAll();

    shopMessage.textContent = "נקנה בהצלחה! 🎉";
  });
});

fillGameSelects();
handleDailyLogin();
renderAll();
