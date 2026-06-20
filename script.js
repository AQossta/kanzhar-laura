const API_URL =
"https://script.google.com/macros/s/AKfycby0o4wLxW6DlGlcP-2assMnnVJrrXr_ldS7QlatqBq2eLqS6XZ1SGtGg7lQSt08N2Ai/exec";


// музыка

const music =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {

    if(music.paused){

        music.play();

        musicBtn.innerText =
        "⏸ Музыканы тоқтату";

    }else{

        music.pause();

        musicBtn.innerText =
        "▶ Музыканы қосу";

    }

});


// супруг

document
.querySelectorAll('input[name="status"]')
.forEach(radio => {

radio.addEventListener("change", () => {

const value =
document.querySelector(
'input[name="status"]:checked'
).value;

document.getElementById(
"spouseBlock"
).style.display =
value === "Жұбыммен келемін"
? "block"
: "none";

});

});


// таймер

const weddingDate =
new Date("2026-08-14T19:00:00");

function updateTimer(){

const now = new Date();

const diff =
weddingDate - now;

const days =
Math.floor(diff/1000/60/60/24);

const hours =
Math.floor(diff/1000/60/60)%24;

const minutes =
Math.floor(diff/1000/60)%60;

const seconds =
Math.floor(diff/1000)%60;

document.getElementById(
"countdown"
).innerHTML =
`${days} : ${hours} : ${minutes} : ${seconds}`;

}

setInterval(updateTimer,1000);

updateTimer();


// отправка

document
.getElementById("guestForm")
.addEventListener("submit", async e => {

e.preventDefault();

const name =
document.getElementById("name").value;

const spouse =
document.getElementById("spouse").value;

const status =
document.querySelector(
'input[name="status"]:checked'
).value;

try{

await fetch(API_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
status,
spouse
})

});

document.getElementById(
"message"
).innerText =
"Рақмет! Жауабыңыз сақталды ❤️";

loadGuests();

e.target.reset();

}catch(err){

document.getElementById(
"message"
).innerText =
"Қате пайда болды";

}

});




// список гостей

async function loadGuests(){

try{

const res =
await fetch(API_URL);

const data =
await res.json();

const list =
document.getElementById(
"guestList"
);

list.innerHTML="";

data.forEach(g=>{

if(
g.status === "Келемін" ||
g.status === "Жұбыммен келемін"
){

const li =
document.createElement("li");

li.innerHTML =
g.spouse
? `✓ ${g.name} + ${g.spouse}`
: `✓ ${g.name}`;

list.appendChild(li);

}

});

}catch(err){
console.log(err);
}

}

loadGuests();

