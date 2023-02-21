'use strict'
const marks=document.querySelectorAll('.mark-div');
const xPlayerMark=document.querySelector('.x-div');
const oPlayerMark=document.querySelector('.o-div');
const vsPlayer =document.querySelector('.vs-player');
const vsCpu=document.querySelector ('.vs-cpu');
let markChosen=false;

function coloringMark (btn) {
    btn.style.backgroundColor='#A8BFC9';
    btn.style.filter='none';
};

// for (let mark of marks) {
//     mark.addEventListener ('click', function choosingMark() {
//         coloringMark(mark);
//         for (let i=0; i<marks.length; i++) {
//             if (marks[i]!==mark) {
//                 marks[i].removeEventListener('click', choosingMark);
//             }
//         }
//     })
// }
xPlayerMark.addEventListener('click', function choosingXmark(){
    localStorage.setItem("firstPlayer", true);
    coloringMark(xPlayerMark);
    oPlayerMark.classList.add('mark-div-not-active');
    markChosen=true;
})
oPlayerMark.addEventListener('click', function choosing0mark(){
    localStorage.setItem("firstPlayer", false);
    coloringMark(oPlayerMark);
    xPlayerMark.classList.add('mark-div-not-active');
    markChosen=true;
})

vsPlayer.addEventListener('click', function(){
    if(markChosen) {
        window.location.href="./multiplayer.html";
    }
    else{
        alert('please, choose mark - X or 0');
    }
});

vsCpu.addEventListener ('click', function () {
    if (markChosen) {
        window.location.href="./cpu.html";
    }
    else{
        alert('please, choose mark - X or 0');
    }
})