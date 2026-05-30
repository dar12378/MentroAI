const defaultState = {
  childName: "נועם",
  avatar: "🦊",
  xp: 0,
  coins: 0,
  tasks: [
    {
      id: 1,
      title: "לקרוא 10 דקות",
      reward: 15,
      xp: 15,
      done: false,
      emoji: "📚"
    },
    {
      id: 2,
      title: "לסדר את החדר",
      reward: 20,
      xp: 20,
      done: false,
      emoji: "🧹"
    },
    {
      id: 3,
      title: "לתרגל 5 מילים באנגלית",
      reward: 15,
      xp: 15,
      done: false,
      emoji: "🇬🇧"
    }
  ],
  inventory: []
};

const shopItems = [
  {
    id: "hat",
    title: "כובע קסמים",
    emoji: "🎩",
    price: 40,
    description: "פריט ראשון לאוסף שלך."
  },
  {
    id: "dragon",
    title: "דרקון קטן",
    emoji: "🐲",
    price: 75,
    description: "חיית מחמד שמראה שאתה מתקדם."
  },
  {
    id: "rocket",
    title: "טיל חלל",
    emoji: "🚀",
    price: 100,
    description: "פרס לשחקנים רציניים."
  },
  {
    id: "crown",
    title: "כתר אלוף",
    emoji: "👑",
    price: 150,
    description: "הפרס הכי יוקרתי בחנות."
  },
  {
    id: "dog",
    title: "כלב עוזר",
    emoji: "🐶",
    price: 90,
    description: "החבר שילווה אותך במשימות."
  }
];

const questions = [
  {
    question: "מה הפירוש של Apple באנגלית?",
    answers: ["תפוח", "שולחן", "כלב", "שמיים"],
    correct: "תפוח"
  },
  {
    question: "כמה זה 7 + 5?",
    answers: ["10", "11", "12", "13"],
    correct: "12"
  },
  {
    question: "איזו חיה אומרת מיאו?",
    answers: ["כלב", "חתול", "אריה", "סוס"],
    correct: "חתול"
  },
  {
    question: "מה עיר הבירה של ישראל?",
    answers: ["חיפה", "תל אביב", "ירושלים", "אילת"],
    correct: "ירושלים"
  },
  {
    question: "איזו מילה היא צבע?",
    answers: ["כחול", "רץ", "כיסא", "אוכל"],
    correct: "כחול"
  }
];

let state = loadState();
let currentQuestion = null;
let questionAnswered = false;

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadState() {
  const saved = localStorage.getItem("questKidState");

  if (!saved) {
    return clone(defaultState);
  }

  try {
    return {
      ...clone(defaultState),
      ...JSON.parse(saved)
    };
  } catch {
    return clone(defaultState);
  }
}

function saveState() {
  localStorage.setItem("questKidState", JSON.stringify(state));
}

function getLevel() {
  return Math.floor(state.xp / 100) + 1;
}

function getLevelPercent() {
  return state.xp % 100;
}

function showToast(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function updateUI() {
  const level = getLevel();
  const percent = getLevelPercent();
  const completedTasks = state.tasks.filter(task => task.done).length;

  document.getElementById("welcomeTitle").textContent = `שלום, ${state.childName} 👋`;
  document.getElementById("childNameBox").textContent = state.childName;
  document.getElementById("avatarBox").textContent = state.avatar;
  document.getElementById("xpBox").textContent = state.xp;
  document.getElementById("coinsBox").textContent = state.coins;

  document.getElementById("levelText").textContent = `רמה ${level}`;
  document.getElementById("levelProgress").style.width = `${percent}%`;

  document.getElementById("todayTasksNumber").textContent = `${completedTasks}/${state.tasks.length}`;
  document.getElementById("homeLevelNumber").textContent = level;
  document.getElementById("inventoryNumber").textContent = state.inventory.length;

  document.getElementById("profileName").textContent = state.childName;
  document.getElementById("profileXp").textContent = state.xp;
  document.getElementById("profileCoins").textContent = state.coins;

  document.getElementById("nameInput").value = state.childName;
  document.getElementById("avatarSelect").value = state.avatar;

  renderTasks();
  renderShop();
  renderInventory();
  renderDailyPath();

  saveState();
}

function renderTasks() {
  const box = document.getElementById("tasksList");
  box.innerHTML = "";

  if (state.tasks.length === 0) {
    box.innerHTML = `<div class="empty">אין משימות עדיין. הוסף משימה חדשה למעלה.</div>`;
    return;
  }

  state.tasks.forEach(task => {
    const el = document.createElement("div");
    el.className = `task ${task.done ? "done" : ""}`;

    el.innerHTML = `
      <div class="emoji-box">${task.emoji || "✅"}</div>

      <div>
        <div class="task-title">${task.title}</div>
        <div class="task-sub">פרס: ${task.reward} מטבעות + ${task.xp} XP</div>
      </div>

      <div class="buttons-box">
        <button class="btn ${task.done ? "secondary" : ""}" onclick="completeTask(${task.id})">
          ${task.done ? "בוצע" : "סיים"}
        </button>

        <button class="btn red" onclick="deleteTask(${task.id})">
          מחק
        </button>
      </div>
    `;

    box.appendChild(el);
  });
}

function renderShop() {
  const box = document.getElementById("shopList");
  box.innerHTML = "";

  shopItems.forEach(item => {
    const owned = state.inventory.includes(item.id);
    const canBuy = state.coins >= item.price && !owned;

    const el = document.createElement("div");
    el.className = "shop-item";

    el.innerHTML = `
      <div class="emoji-box">${item.emoji}</div>

      <div>
        <div class="item-title">${item.title}</div>
        <div class="item-sub">${item.description} מחיר: ${item.price} מטבעות.</div>
      </div>

      <button class="btn ${owned ? "secondary" : canBuy ? "orange" : "locked"}" onclick="buyItem('${item.id}')">
        ${owned ? "נקנה" : canBuy ? "קנה" : "נעול"}
      </button>
    `;

    box.appendChild(el);
  });
}

function renderInventory() {
  const box = document.getElementById("inventoryBox");
  box.innerHTML = "";

  if (state.inventory.length === 0) {
    box.innerHTML = `<div class="empty">עדיין אין פרסים. לך לחנות וקנה פריט ראשון.</div>`;
    return;
  }

  state.inventory.forEach(id => {
    const item = shopItems.find(shopItem => shopItem.id === id);

    if (!item) {
      return;
    }

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.innerHTML = `<span>${item.emoji}</span> ${item.title}`;

    box.appendChild(badge);
  });
}

function renderDailyPath() {
  const box = document.getElementById("dailyPath");

  const steps = [
    {
      title: "משימה ראשונה",
      sub: "סיים לפחות משימה אחת",
      icon: "✅",
      done: state.tasks.some(task => task.done)
    },
    {
      title: "שאלה יומית",
      sub: "ענה נכון על שאלה בלמידה",
      icon: "🧠",
      done: state.xp >= 10
    },
    {
      title: "אסוף 50 מטבעות",
      sub: "צבור מספיק מטבעות לחנות",
      icon: "🪙",
      done: state.coins >= 50
    },
    {
      title: "פתח פרס",
      sub: "קנה פריט אחד בחנות",
      icon: "🎁",
      done: state.inventory.length > 0
    }
  ];

  box.innerHTML = "";

  steps.forEach(step => {
    const el = document.createElement("div");
    el.className = `path-node ${step.done ? "completed" : ""}`;

    el.innerHTML = `
      <div class="node-icon">${step.done ? "✓" : step.icon}</div>

      <div>
        <div class="task-title">${step.title}</div>
        <div class="task-sub">${step.sub}</div>
      </div>

      <span class="pill ${step.done ? "green" : ""}">
        ${step.done ? "הושלם" : "פתוח"}
      </span>
    `;

    box.appendChild(el);
  });
}

function addTask() {
  const input = document.getElementById("newTaskInput");
  const reward = Number(document.getElementById("taskRewardSelect").value);
  const title = input.value.trim();

  if (!title) {
    showToast("צריך לכתוב שם למשימה");
    return;
  }

  const emojis = ["✅", "📚", "🧹", "🏃", "🧠", "🎨", "🦷", "🎒"];

  const task = {
    id: Date.now(),
    title: title,
    reward: reward,
    xp: reward,
    done: false,
    emoji: emojis[Math.floor(Math.random() * emojis.length)]
  };

  state.tasks.push(task);
  input.value = "";

  showToast("המשימה נוספה");
  updateUI();
}

function completeTask(id) {
  const task = state.tasks.find(task => task.id === id);

  if (!task || task.done) {
    return;
  }

  task.done = true;
  state.coins += task.reward;
  state.xp += task.xp;

  showToast(`כל הכבוד! קיבלת ${task.reward} מטבעות`);
  updateUI();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(task => task.id !== id);

  showToast("המשימה נמחקה");
  updateUI();
}

function buyItem(id) {
  const item = shopItems.find(shopItem => shopItem.id === id);

  if (!item) {
    return;
  }

  if (state.inventory.includes(id)) {
    showToast("כבר קנית את הפריט הזה");
    return;
  }

  if (state.coins < item.price) {
    showToast("אין מספיק מטבעות עדיין");
    return;
  }

  state.coins -= item.price;
  state.inventory.push(id);

  showToast(`קנית את ${item.title}!`);
  updateUI();
}

function nextQuestion() {
  questionAnswered = false;

  const random = questions[Math.floor(Math.random() * questions.length)];
  currentQuestion = random;

  document.getElementById("questionText").textContent = random.question;

  const message = document.getElementById("quizMessage");
  message.className = "message";
  message.textContent = "";

  const answersBox = document.getElementById("answersBox");
  answersBox.innerHTML = "";

  random.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer;
    btn.onclick = function () {
      checkAnswer(btn, answer);
    };

    answersBox.appendChild(btn);
  });
}

function checkAnswer(button, answer) {
  if (questionAnswered) {
    return;
  }

  questionAnswered = true;

  const allButtons = document.querySelectorAll(".answer");

  allButtons.forEach(btn => {
    if (btn.textContent === currentQuestion.correct) {
      btn.classList.add("correct");
    }
  });

  const message = document.getElementById("quizMessage");
  message.classList.add("show");

  if (answer === currentQuestion.correct) {
    button.classList.add("correct");

    state.coins += 10;
    state.xp += 10;

    message.textContent = "נכון מאוד! קיבלת 10 מטבעות ו־10 XP 🎉";
    showToast("תשובה נכונה!");
  } else {
    button.classList.add("wrong");
    message.textContent = `לא נורא. התשובה הנכונה היא: ${currentQuestion.correct}`;
    showToast("נסה שוב בשאלה הבאה");
  }

  updateUI();
}

function quickLesson(name, coins, xp) {
  state.coins += coins;
  state.xp += xp;

  showToast(`סיימת שיעור ${name}! קיבלת ${coins} מטבעות`);
  updateUI();
}

function saveName() {
  const name = document.getElementById("nameInput").value.trim();

  if (!name) {
    showToast("צריך לכתוב שם");
    return;
  }

  state.childName = name;

  showToast("השם נשמר");
  updateUI();
}

function saveAvatar() {
  state.avatar = document.getElementById("avatarSelect").value;

  showToast("הדמות הוחלפה");
  updateUI();
}

function resetApp() {
  const ok = confirm("בטוח לאפס את כל ההתקדמות?");

  if (!ok) {
    return;
  }

  localStorage.removeItem("questKidState");
  state = clone(defaultState);

  showToast("האפליקציה אופסה");
  updateUI();
  nextQuestion();
}

document.querySelectorAll(".nav button").forEach(button => {
  button.addEventListener("click", function () {
    document.querySelectorAll(".nav button").forEach(btn => {
      btn.classList.remove("active");
    });

    document.querySelectorAll(".page").forEach(page => {
      page.classList.remove("active");
    });

    button.classList.add("active");

    const pageId = button.dataset.page;
    document.getElementById(pageId).classList.add("active");
  });
});

updateUI();
nextQuestion();
