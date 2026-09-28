const APP="sourabh_v1";
const AVATARS=[
 {id:"default",emoji:"🧑‍💻",name:"Default",min:1},{id:"cyber",emoji:"🕶️",name:"Cyber",min:5},
 {id:"robot",emoji:"🤖",name:"Robot",min:10},{id:"ninja",emoji:"🥷",name:"Ninja",min:20},
 {id:"king",emoji:"👑",name:"King",min:30},{id:"fire",emoji:"🔥",name:"Fire",min:40},
 {id:"galaxy",emoji:"🌌",name:"Galaxy",min:50},{id:"legend",emoji:"⚡",name:"Legend",min:75}
];
const BANNERS=[
 {id:"default",name:"Midnight",css:"linear-gradient(135deg,#2b1d67,#123f54 55%,#0a1122)",min:1},
 {id:"neon",name:"Neon City",css:"linear-gradient(135deg,#43106b,#003b59 55%,#07111f)",min:5},
 {id:"ocean",name:"Ocean",css:"linear-gradient(135deg,#062f49,#087e8b,#07121f)",min:10},
 {id:"sunset",name:"Sunset",css:"linear-gradient(135deg,#5b1d50,#b24b39,#111526)",min:20},
 {id:"gold",name:"Royal Gold",css:"linear-gradient(135deg,#3b2810,#8c681f,#111526)",min:30},
 {id:"aurora",name:"Aurora",css:"linear-gradient(135deg,#123e46,#25307b,#17122d)",min:40},
 {id:"cosmic",name:"Cosmic",css:"linear-gradient(135deg,#120a37,#3c1b75,#061b38)",min:50},
 {id:"legend",name:"Legend",css:"linear-gradient(135deg,#231b0a,#7c4a0a,#17172b)",min:75}
];
function getUsers(){try{return JSON.parse(localStorage.getItem(APP+"_users")||"{}")}catch{return{}}}
function saveUsers(x){localStorage.setItem(APP+"_users",JSON.stringify(x))}
function session(){return localStorage.getItem(APP+"_session")}
function setSession(u){localStorage.setItem(APP+"_session",u)}
function user(){const s=session(),u=getUsers();return s&&u[s]?u[s]:null}
function xpForLevel(l){return (l-1)*100}
function levelFromXp(x){return Math.min(100,Math.floor((Number(x)||0)/100)+1)}
function saveUser(data){const u=getUsers();u[data.username]=data;saveUsers(u)}
function ensureUser(username){
 let u=getUsers()[username]; if(!u)return null;
 u.xp??=0;u.level??=levelFromXp(u.xp);u.name??=username;u.group??="No Group";u.avatar??="default";u.banner??="default";u.mails??=[];
 saveUser(u);return u;
}
function addXP(amount){
 const u=user();if(!u)return;
 const old=u.level;u.xp=(u.xp||0)+amount;u.level=levelFromXp(u.xp);
 if(u.level>old)addMail(u.username,"Level Up 🎉",`Congratulations! You reached Level ${u.level}. New avatars and banners may now be unlocked.`);
 saveUser(u);return u;
}
function addMail(username,title,body){
 const u=ensureUser(username);if(!u)return;
 u.mails??=[];u.mails.unshift({id:Date.now()+Math.random(),title,body,date:new Date().toLocaleString(),read:false});
 saveUser(u);
}
function unreadCount(){const u=user();return u?(u.mails||[]).filter(x=>!x.read).length:0}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function requireLogin(){if(!user()){location.href="login.html";return false}return true}
function initials(name){return (name||"?").slice(0,2).toUpperCase()}
function avatarHTML(u,cls="avatar"){const a=AVATARS.find(x=>x.id===u.avatar)||AVATARS[0];return `<div class="${cls}">${a.emoji}</div>`}
function bannerCSS(u){return (BANNERS.find(x=>x.id===u.banner)||BANNERS[0]).css}
function nav(active){
 const u=user(),mail=unreadCount();
 return `<header class="topbar">
 <a class="brand" href="index.html"><img src="logo.svg" alt="SM"><span>Sourabh Projects</span></a>
 <nav class="nav">
 <a class="${active==="home"?"active":""}" href="index.html">Home</a>
 <a class="${active==="projects"?"active":""}" href="projects.html">Projects</a>
 <a class="${active==="groups"?"active":""}" href="groups.html">Groups</a>
 ${u?`<a class="${active==="mail"?"active":""}" href="mailbox.html">Mailbox${mail?` (${mail})`:""}</a><a class="${active==="profile"?"active":""}" href="profile.html">Profile</a>`:`<a class="${active==="login"?"active":""}" href="login.html">Login</a>`}
 </nav></header>`;
}
function footer(){return `<footer class="footer">Sourabh Projects • 9.26.1 V • Built with HTML, CSS & JavaScript</footer>`}
function bootNav(active){document.getElementById("navMount")?.insertAdjacentHTML("afterbegin",nav(active))}

function getGroups(){try{return JSON.parse(localStorage.getItem(APP+"_groups")||"[]")}catch{return[]}}
function saveGroups(gs){localStorage.setItem(APP+"_groups",JSON.stringify(gs))}
function awardGroupPoints(points){
 const u=user();if(!u||!u.group||u.group==="No Group")return;
 const gs=getGroups(),g=gs.find(x=>x.name===u.group);if(!g)return;
 g.points=(g.points||0)+points;saveGroups(gs);
}
