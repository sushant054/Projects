let gameSeq = [];
let userSeq =[];
let started =false;
let level =0;
let h2= document.querySelector("h2");
let btns=["yellow","red","purple","green"];
document.addEventListener("keypress", function() {
 if(started==false){
    console.log("game started!");
    started = true;
    levelUp();
}
});
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    //select any random button...
    let randomIdx=Math.floor(Math.random()*3);
    let randColor =btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);//printing gamesequence..
    gameFlash(randBtn);
}

 
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function checkAns(idx){
   // console.log("curr level:",level);
   // let idx = level-1;
    if(userSeq[idx] === gameSeq[idx]){
      //console.log("same value");
     if(userSeq.length == gameSeq.length){
        setTimeout(levelUp,1000);
        //levelUp();
     }   
 }
    else 
    {
     h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
     document.querySelector("body").style.backgroundColor =" red";
    // setTimeout(function (){
    //    document.querySelector("body").style.backgroundColor ="white";
    // },150);
    // setTimeout();
     setTimeout(function (){
        reset();
    },2000);
     
    }
 }

function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userColor);
    checkAns(userSeq.length-1);
  
}

let allBtns= document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started =false;
     gameSeq = [];
     userSeq =[];
     level =0;
     document.querySelector("body").style.backgroundColor ="white";
}
//change heading color using callbacks nesting is also known as callback hell
h1=document.querySelector("h1");
function changeColor(color, delay, nextColorChange){
    setTimeout(()=> {
        h1.style.color=color;
        if(nextColorChange)nextColorChange();

    },delay);
}

changeColor("red",500,()=>{
    changeColor("orange",2000,()=>{
        changeColor("green",1000,()=>{
            changeColor("black",1000)
        });
    });
});



