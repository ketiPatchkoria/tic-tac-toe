'use strict'

const boxes=document.querySelectorAll('.boxes');
const restartButton=document.querySelector('.restart-div');
const alertDiv=document.querySelector('.alert-div');
const takesRoundDiv=document.querySelector('.takes-round');
const xImgDiv=document.querySelector('.icon-x-img');
const oImgDiv=document.querySelector('.icon-o-img');
const tiesDiv=document.querySelector('.ties-div');
const quitButton=document.querySelector('.quit-btn');
const nextRoundButton=document.querySelector('.next-round-btn');
let xTurn=true;
let xArray = new Array;
let oArray = new Array;

console.log(localStorage.getItem("firstPlayer"));

const winningCombinations = new Array (
    [1, 2, 3], 
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7], 
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
);

for (let box of boxes) {
    box.addEventListener('mouseover',onMouseHover);
    box.addEventListener ('click', playGame);
}

function onMouseHover () {
    if(this.childNodes.length===0) {
        if(xTurn) {
            this.classList.remove('o-hover');
            this.classList.add('x-hover');
        }
        else{
            this.classList.remove('x-hover');
            this.classList.add('o-hover');
        } 
    }
}

function playGame(){
    displayWhoseTurnIs();
    if (xTurn) {
        playingX(this);
        checkingWinningCombinations(xArray);   
    }
    else {
        playing0(this);
        checkingWinningCombinations(oArray);
    }
    xTurn=!xTurn;
    this.removeEventListener('click', playGame);
    if (checkingWinningCombinations(xArray)===true){
        stopGameAfterWinningX();
    }
    else if (checkingWinningCombinations(oArray)===true){
        stopGameAfterWinning0();
    }
    else if (xArray.length===5) {
        stopGameAfterTies();
    }
}

function playingX (btn) {
    let imgX =document.createElement('img');
    imgX.setAttribute ('src', 'assets/icon-x.svg');
    imgX.classList.add('x-and-0-size');
    btn.appendChild(imgX);
    xArray.push(btn.value);
}

function playing0 (btn) {
    let img0 =document.createElement('img');
    img0.setAttribute ('src', 'assets/icon-o.svg');
    img0.classList.add('x-and-0-size');
    btn.appendChild(img0);
    oArray.push(btn.value);
}

function checkingWinningCombinations (selectedBoxesArray) {
    if(selectedBoxesArray.length>=3) {
       for (let i=0; i<winningCombinations.length; i++) {
            let includesAll = true;
            let winningCombination = winningCombinations[i];
            
            for(let j=0;j<3;j++) {
                if (!selectedBoxesArray.includes(winningCombination[j].toString())) {
                    includesAll = false;
                }  
            }
            if (includesAll === true) {
                return true;
            }
        }
    }
}

function stopGame () {
    restartButton.removeEventListener ('click', refreshGame);
    for (let box of boxes) {
        box.removeEventListener ('click', playGame);
        box.removeEventListener('mouseover',onMouseHover);
    }
}

function displayAfterWin () {
    alertDiv.classList.remove('hidden');
    tiesDiv.classList.add('hidden');
    document.querySelector('.takes-round').classList.remove('hidden');
    document.querySelector('.player-winner').classList.remove('hidden');
}

function IsFirstPlayer() {
    return localStorage.getItem("firstPlayer")===true;
}

function NotifyWinner(winnerName) {
    document.querySelector('.player-winner').firstElementChild.innerHTML=winnerName+" WINS!"; 
}

function stopGameAfterWinningX() {
    stopGame();
    displayAfterWin();
    if (IsFirstPlayer()) {
        NotifyWinner("PLAYER 1");
    }
    else {
        NotifyWinner("PLAYER 2");
    }
    xImgDiv.classList.remove('hidden');
    oImgDiv.classList.add('hidden');
    document.querySelector('.takes-round').lastElementChild.style.color='#31C3BD';
    let xScore=document.querySelector('.x-score').innerHTML;
    document.querySelector('.x-score').innerHTML=Number(xScore)+1;
}

function stopGameAfterWinning0() {
    stopGame();
    displayAfterWin();
    if (!IsFirstPlayer()) {
        NotifyWinner("PLAYER 1");
    }
    else {
        NotifyWinner("PLAYER 2");
    }
    document.querySelector('.takes-round').lastElementChild.style.color='#F2B137';
    oImgDiv.classList.remove('hidden');
    xImgDiv.classList.add('hidden');
    let oScore=document.querySelector('.o-score').innerHTML;
    document.querySelector('.o-score').innerHTML=Number(oScore)+1;
}

function stopGameAfterTies () {
    stopGame();
    alertDiv.classList.remove('hidden');
    tiesDiv.classList.remove('hidden');
    takesRoundDiv.classList.add('hidden');
    document.querySelector('.player-winner').classList.add('hidden');
    let tiesScore=document.querySelector('.ties-score').innerHTML;
    document.querySelector('.ties-score').innerHTML=Number(tiesScore)+1;
}

function displayWhoseTurnIs () {
    if(xTurn) {
        document.querySelector('.turn-span').innerHTML='0';
    }
    else {
        document.querySelector('.turn-span').innerHTML='x';
    }
}

quitButton.addEventListener('click', function quitGame() {
    window.location.href="index.html";
})

function refreshGame () {
    document.querySelector('.turn-span').innerHTML='x';
    xTurn=true;
    xArray.length=0;
    oArray.length=0;
    for(let box of boxes) {
        if (box.hasChildNodes()) {
           // box.removeChild(box.childNodes[0]);
            box.firstChild.remove();
        } 
        box.addEventListener('click', playGame);
        box.addEventListener ('mouseover',onMouseHover); 
    }
}

restartButton.addEventListener ('click', refreshGame);

nextRoundButton.addEventListener('click', function nextRoundGame() {
    alertDiv.classList.add('hidden');
    refreshGame();
})



