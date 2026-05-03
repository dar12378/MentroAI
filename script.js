const pages = document.querySelectorAll(".page");
const navBtns = document.querySelectorAll(".nav-btn");

const profileShortcut = document.getElementById("profileShortcut");
const quickAskInput = document.getElementById("quickAskInput");
const quickAskBtn = document.getElementById("quickAskBtn");

const playerName = document.getElementById("playerName");
const playerEmail = document.getElementById("playerEmail");
const customStyle = document.getElementById("customStyle");
const saveProfileBtn = document.getElementById("saveProfileBtn");

const streakBox = document.getElementById("streakBox");
const gemsBox = document.getElementById("gemsBox");
const gamesCountBox = document.getElementById("gamesCountBox");
const helloTitle = document.getElementById("helloTitle");
const todayBox = document.getElementById("todayBox");
const dailyTip = document.getElementById("dailyTip");
const tipDetails = document.getElementById("tipDetails");

const addGameSelect = document.getElementById("addGameSelect");
const addGameBtn = document.getElementById("addGameBtn");
const myGamesList = document.getElementById("myGamesList");

const adviceGameSelect = document.getElementById("adviceGameSelect");
const adviceInput = document.getElementById("adviceInput");
const adviceBtn = document.getElementById("adviceBtn");
const adviceOutput = document.getElementById("adviceOutput");

const recommendBtn = document.getElementById("recommendBtn");
const recommendOutput = document.getElementById("recommendOutput");

const techPlatform = document.getElementById("techPlatform");
const techGameSelect = document.getElementById("techGameSelect");
const techInput = document.getElementById("techInput");
const techBtn = document.getElementById("techBtn");
const techOutput = document.getElementById("techOutput");

const infoGameSelect = document.getElementById("infoGameSelect");
const infoOutput = document.getElementById("infoOutput");

const shopMessage = document.getElementById("shopMessage");

let user = JSON.parse(localStorage.getItem("mentro_user")) || {
  name: "",
  email: "",
  platforms: [],
  style: "",
  games: [],
  likedGames: [],
  progress: [],
  streak: 0,
  gems: 0,
  lastVisit: "",
  purchases: []
};

function saveUser() {
  localStorage.setItem("mentro_user", JSON.stringify(user));
}

function normalize(text) {
  return String(text || "").toLowerCase().trim();
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

profileShortcut.addEventListener("click", () => {
  setPage("profile");
});

quickAskBtn.addEventListener("click", () => {
  const text = quickAskInput.value.trim();
  if (!text) return;

  setPage("advice");
  adviceInput.value = text;
  adviceBtn.click();
});

quickAskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") quickAskBtn.click();
});

function fillGameSelects() {
  [addGameSelect, adviceGameSelect, techGameSelect, infoGameSelect].forEach(select => {
    select.innerHTML = '<option value="">בחר משחק</option>';
    gamesInfo.forEach(game => {
      const option = document.createElement("option");
      option.value = game.id;
      option.textContent = game.name;
      select.appendChild(option);
    });
  });
}

function loadProfile() {
  playerName.value = user.name;
  playerEmail.value = user.email;
  customStyle.value = user.style;

  document.querySelectorAll(".platform-check").forEach(check => {
    check.checked = user.platforms.includes(check.value);
  });

  handleDailyLogin();
  renderAll();
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
  }
}

function renderAll() {
  helloTitle.textContent = user.name ? `שלום ${user.name} 👋` : "שלום 👋";
  streakBox.textContent = user.streak;
  gemsBox.textContent = user.gems;
  gamesCountBox.textContent = user.games.length;

  renderToday();
  renderDailyTip();
  renderMyGames();
}

function renderToday() {
  const lastGame = user.games[0];
  const game = gamesInfo.find(g => g.id === lastGame);

  if (!game) {
    todayBox.innerHTML = "עוד לא הוספת משחקים. עבור ל־המשחקים שלי והוסף משחק ראשון.";
    return;
  }

  todayBox.innerHTML = `
    אתה משחק ב־<b>${game.name}</b><br>
    הסגנון שלך: ${user.style || "לא הוגדר"}<br>
    המלצה: ${game.tips[0]}
  `;
}

function renderDailyTip() {
  const gameId = user.games[0] || "brawl";
  const game = gamesInfo.find(g => g.id === gameId) || gamesInfo[0];
  const index = new Date().getDate() % game.tips.length;

  dailyTip.textContent = game.tips[index];

  dailyTip.onclick = () => {
    const strategy = game.strategies[index % game.strategies.length];

    tipDetails.innerHTML = `
      <b>דוגמה לאסטרטגיה:</b><br>
      ${strategy}
    `;

    tipDetails.classList.toggle("hidden");
  };
}

saveProfileBtn.addEventListener("click", () => {
  user.name = playerName.value.trim();
  user.email = playerEmail.value.trim();
  user.style = customStyle.value.trim();
  user.platforms = [...document.querySelectorAll(".platform-check:checked")].map(x => x.value);

  saveUser();
  renderAll();
  alert("הפרופיל נשמר");
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

function renderMyGames() {
  myGamesList.innerHTML = "";

  if (!user.games.length) {
    myGamesList.innerHTML = `<div class="answer">עוד לא הוספת משחקים.</div>`;
    return;
  }

  user.games.forEach(id => {
    const game = gamesInfo.find(g => g.id === id);
    if (!game) return;

    const liked = user.likedGames.includes(id);

    const div = document.createElement("div");
    div.className = "game-card";
    div.innerHTML = `
      <div class="game-img">${game.icon}</div>
      <h3>${game.name}</h3>
      <p>${game.summary}</p>
      <button class="heart ${liked ? "liked" : ""}" data-like="${id}">
        ${liked ? "❤️ אהבתי" : "♡ שים לב"}
      </button>
      <button data-progress="${id}" data-action="played">שיחקתי היום</button>
      <button data-progress="${id}" data-action="stuck">נתקעתי</button>
      <a class="store-link" href="${game.store}" target="_blank">פתח חנות / אתר</a>
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
      user.progress.push({
        game: btn.dataset.progress,
        action: btn.dataset.action,
        date: new Date().toLocaleDateString("he-IL")
      });

      user.gems += 2;
      saveUser();
      renderAll();
    });
  });
}

adviceBtn.addEventListener("click", () => {
  const game = gamesInfo.find(g => g.id === adviceGameSelect.value) ||
               gamesInfo.find(g => g.id === user.games[0]);

  const q = normalize(adviceInput.value);

  if (!game) {
    adviceOutput.textContent = "בחר משחק או הוסף משחק לפרופיל.";
    return;
  }

  let answer = `<b>${game.name}</b><br>`;

  if (q.includes("לקנות") || q.includes("שווה") || q.includes("דמות")) {
    answer += "תבדוק אם זה מתאים לסגנון שלך לפני שאתה קונה. ";
  }

  if (user.style) {
    answer += `לפי הסגנון שלך — ${user.style} — כדאי לבחור דברים שמתאימים לזה ולא רק מה שנראה מגניב.<br>`;
  }

  answer += `<br><b>טיפ:</b> ${game.tips[0]}<br>`;
  answer += `<b>אסטרטגיה:</b> ${game.strategies[0]}`;

  adviceOutput.innerHTML = answer;
});

recommendBtn.addEventListener("click", () => {
  const liked = gamesInfo.filter(g => user.likedGames.includes(g.id));
  const userWords = normalize(user.style).split(" ");

  const scores = gamesInfo
    .filter(g => !user.games.includes(g.id))
    .map(game => {
      let score = 0;

      liked.forEach(likedGame => {
        game.styles.forEach(style => {
          if (likedGame.styles.includes(style)) score += 5;
        });
      });

      userWords.forEach(word => {
        game.styles.forEach(style => {
          if (normalize(style).includes(word)) score += 4;
        });
      });

      return { game, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  recommendOutput.innerHTML = "";

  scores.forEach(({ game }) => {
    const div = document.createElement("div");
    div.className = "game-card";

    div.innerHTML = `
      <div class="game-img">${game.icon}</div>
      <h3>${game.name}</h3>
      <p>${game.summary}</p>
      <p><b>למה זה מתאים לך?</b><br>
      כי המשחק מתאים לסגנונות: ${game.styles.slice(0, 4).join(", ")}.</p>
      <a class="store-link" href="${game.store}" target="_blank">קישור לחנות / אתר</a>
    `;

    recommendOutput.appendChild(div);
  });
});

techBtn.addEventListener("click", () => {
  const text = normalize(techInput.value);

  if (!text) {
    techOutput.textContent = "כתוב את הבעיה.";
    return;
  }

  const match = techProblems.find(problem =>
    problem.keywords.some(k => text.includes(normalize(k)))
  );

  techOutput.textContent = match
    ? match.answer
    : "נסה להפעיל מחדש, לעדכן משחק, לבדוק אינטרנט, לפנות מקום אחסון ולבדוק אם יש קוד שגיאה.";
});

infoGameSelect.addEventListener("change", () => {
  const game = gamesInfo.find(g => g.id === infoGameSelect.value);

  if (!game) {
    infoOutput.textContent = "בחר משחק.";
    return;
  }

  infoOutput.innerHTML = `
    <b>${game.name}</b><br>
    סוג: ${game.genre}<br>
    פלטפורמות: ${game.platforms.join(", ")}<br><br>
    ${game.summary}<br><br>
    <b>טיפים:</b><br>
    ${game.tips.map(t => "• " + t).join("<br>")}<br><br>
    <b>אסטרטגיות:</b><br>
    ${game.strategies.map(s => "• " + s).join("<br>")}<br><br>
    <a class="store-link" href="${game.store}" target="_blank">קישור לחנות / אתר</a>
  `;
});

document.querySelectorAll("[data-buy]").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.dataset.buy;
    const prices = { glow: 30, wizard: 50, robot: 50, fire: 40 };
    const price = prices[item];

    if (user.gems < price) {
      shopMessage.textContent = "אין לך מספיק יהלומים.";
      return;
    }

    if (user.purchases.includes(item)) {
      shopMessage.textContent = "כבר קנית את זה.";
      return;
    }

    user.gems -= price;
    user.purchases.push(item);
    saveUser();
    renderAll();
    shopMessage.textContent = "נקנה בהצלחה!";
  });
});

fillGameSelects();
loadProfile();
