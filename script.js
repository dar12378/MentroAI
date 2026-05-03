const pages=document.querySelectorAll(".page");
const navBtns=document.querySelectorAll(".nav");

const helloTitle=document.getElementById("helloTitle");
const streakBox=document.getElementById("streakBox");
const gemsBox=document.getElementById("gemsBox");
const gamesCountBox=document.getElementById("gamesCountBox");
const shopGems=document.getElementById("shopGems");

const playerName=document.getElementById("playerName");
const playerEmail=document.getElementById("playerEmail");
const playerStyle=document.getElementById("playerStyle");
const saveProfileBtn=document.getElementById("saveProfileBtn");

const gameSelect=document.getElementById("gameSelect");
const addGameBtn=document.getElementById("addGameBtn");
const customGameInput=document.getElementById("customGameInput");
const customGameStyle=document.getElementById("customGameStyle");
const addCustomGameBtn=document.getElementById("addCustomGameBtn");
const myGamesGrid=document.getElementById("myGamesGrid");

const todayBox=document.getElementById("todayBox");
const dailyTip=document.getElementById("dailyTip");
const tipDetails=document.getElementById("tipDetails");

const adviceGameSelect=document.getElementById("adviceGameSelect");
const adviceInput=document.getElementById("adviceInput");
const adviceBtn=document.getElementById("adviceBtn");
const adviceOutput=document.getElementById("adviceOutput");

const techInput=document.getElementById("techInput");
const techBtn=document.getElementById("techBtn");
const techOutput=document.getElementById("techOutput");

const shopMessage=document.getElementById("shopMessage");

let user=JSON.parse(localStorage.getItem("mentro_user"))||{
  name:"",
  email:"",
  style:"",
  games:[],
  customGames:[],
  liked:[],
  streak:0,
  gems:0,
  lastVisit:"",
  purchases:[]
};

function save(){localStorage.setItem("mentro_user",JSON.stringify(user));}

function page(id){
  pages.forEach(p=>p.classList.remove("active-page"));
  navBtns.forEach(b=>b.classList.remove("active"));
  document.getElementById(id).classList.add("active-page");
  document.querySelector(`[data-page="${id}"]`).classList.add("active");
}

navBtns.forEach(b=>b.onclick=()=>page(b.dataset.page));

function fillSelects(){
  [gameSelect,adviceGameSelect].forEach(sel=>{
    sel.innerHTML='<option value="">בחר משחק</option>';
    gamesInfo.forEach(g=>{
      const o=document.createElement("option");
      o.value=g.id;o.textContent=g.name;
      sel.appendChild(o);
    });
  });
}

function login(){
  const today=new Date().toDateString();
  if(user.lastVisit!==today){
    user.streak++;
    user.lastVisit=today;
    if(user.streak%10===0) user.gems+=50;
    save();
  }
}

function render(){
  helloTitle.textContent=user.name?`שלום ${user.name} 👋`:"שלום 👋";
  streakBox.textContent=user.streak;
  gemsBox.textContent=user.gems;
  shopGems.textContent=user.gems;
  gamesCountBox.textContent=user.games.length+user.customGames.length;

  playerName.value=user.name;
  playerEmail.value=user.email;
  playerStyle.value=user.style;

  renderToday();
  renderTip();
  renderMyGames();
  renderConsole("nintendo","nintendoGrid");
  renderConsole("playstation","playstationGrid");
  renderConsole("xbox","xboxGrid");
  renderConsole("pc","pcGrid");
  renderConsole("mobile","mobileGrid");
}

function allUserGames(){
  return [
    ...user.games.map(id=>gamesInfo.find(g=>g.id===id)).filter(Boolean),
    ...user.customGames
  ];
}

function mainGame(){
  return allUserGames()[0]||null;
}

function renderToday(){
  const g=mainGame();
  todayBox.innerHTML=g
    ? `המשחק הראשי שלך: <b>${g.name}</b><br>הסגנון שלך: ${user.style||"לא הוגדר"}<br>${g.tips[0]}`
    : "עוד לא הוספת משחקים. עבור לעמוד המשחקים והוסף משחק ראשון.";
}

function renderTip(){
  const g=mainGame()||gamesInfo[0];
  const i=new Date().getDate()%g.tips.length;
  dailyTip.textContent=g.tips[i];
  dailyTip.onclick=()=>{
    tipDetails.innerHTML=`<b>אסטרטגיה:</b><br>${g.strategies[i%g.strategies.length]}`;
    tipDetails.classList.toggle("hidden");
  };
}

function card(g){
  const liked=user.liked.includes(g.id);
  return `
    <div class="game-card">
      <div class="game-img">${g.icon||"🎮"}</div>
      <h3>${g.name}</h3>
      <p>${g.summary||""}</p>
      <button class="heart" data-like="${g.id}">${liked?"❤️ אהבתי":"♡ אהבתי"}</button>
      <button data-add="${g.id}">הוסף למשחקים שלי</button>
      ${g.store?`<a class="store-link" href="${g.store}" target="_blank">חנות / אתר</a>`:""}
    </div>
  `;
}

function bindCards(){
  document.querySelectorAll("[data-like]").forEach(btn=>{
    btn.onclick=()=>{
      const id=btn.dataset.like;
      if(user.liked.includes(id)) user.liked=user.liked.filter(x=>x!==id);
      else {user.liked.push(id);user.gems+=2;}
      save();render();
    };
  });

  document.querySelectorAll("[data-add]").forEach(btn=>{
    btn.onclick=()=>{
      const id=btn.dataset.add;
      if(!user.games.includes(id)){user.games.push(id);user.gems+=5;}
      save();render();
    };
  });
}

function renderConsole(platform,gridId){
  const grid=document.getElementById(gridId);
  grid.innerHTML=gamesInfo.filter(g=>g.platforms.includes(platform)).map(card).join("");
  bindCards();
}

function renderMyGames(){
  const list=allUserGames();
  myGamesGrid.innerHTML=list.length?list.map(card).join(""):`<div class="answer">אין עדיין משחקים.</div>`;
  bindCards();
}

saveProfileBtn.onclick=()=>{
  user.name=playerName.value.trim();
  user.email=playerEmail.value.trim();
  user.style=playerStyle.value.trim();
  user.gems+=3;
  save();render();
};

addGameBtn.onclick=()=>{
  const id=gameSelect.value;
  if(id&&!user.games.includes(id)){user.games.push(id);user.gems+=5;}
  save();render();
};

addCustomGameBtn.onclick=()=>{
  const name=customGameInput.value.trim();
  const style=customGameStyle.value.trim();
  if(!name)return;
  user.customGames.push({
    id:"custom_"+Date.now(),
    name,
    icon:"🎮",
    platforms:["custom"],
    styles:style.split(","),
    summary:`משחק אישי שהוספת: ${name}`,
    tips:[`ב-${name}, שחק לפי הסגנון שלך ותבדוק מה עובד.`],
    strategies:[`נסה לזהות במה אתה נתקע ב-${name}, ואז שנה אסטרטגיה.`],
    store:""
  });
  user.gems+=5;
  customGameInput.value="";
  customGameStyle.value="";
  save();render();
};

adviceBtn.onclick=()=>{
  const g=gamesInfo.find(x=>x.id===adviceGameSelect.value)||mainGame();
  const q=adviceInput.value.toLowerCase();
  if(!g){adviceOutput.textContent="בחר או הוסף משחק.";return;}
  let ans=`<b>${g.name}</b><br>`;
  ans+=`לפי הסגנון שלך: ${user.style||"לא הוגדר"}<br><br>`;
  if(q.includes("שווה")||q.includes("לקנות")||q.includes("דמות")) ans+="אל תקנה רק לפי נדירות. בדוק אם זה מתאים לסגנון שלך ולמוד שאתה משחק.<br><br>";
  if(q.includes("חרב")||q.includes("פיקאקס")) ans+="אם אתה חוצב ובונה — פיקאקס. אם אתה נלחם — חרב. אם גם וגם — פיקאקס ואז חרב.<br><br>";
  ans+=`<b>טיפ:</b> ${g.tips[0]}<br><b>אסטרטגיה:</b> ${g.strategies[0]}`;
  adviceOutput.innerHTML=ans;
};

techBtn.onclick=()=>{
  const q=techInput.value.toLowerCase();
  const m=techProblems.find(p=>p.keywords.some(k=>q.includes(k)));
  techOutput.textContent=m?m.answer:"נסה הפעלה מחדש, עדכון משחק, בדיקת אינטרנט, פינוי מקום וחיפוש קוד שגיאה.";
};

document.querySelectorAll("[data-buy]").forEach(btn=>{
  btn.onclick=()=>{
    const prices={crown:80,fire:60,robot:50,wizard:50};
    const item=btn.dataset.buy;
    if(user.purchases.includes(item)){shopMessage.textContent="כבר קנית.";return;}
    if(user.gems<prices[item]){shopMessage.textContent="אין מספיק יהלומים.";return;}
    user.gems-=prices[item];
    user.purchases.push(item);
    save();render();
    shopMessage.textContent="נקנה בהצלחה!";
  };
});

fillSelects();
login();
render();
