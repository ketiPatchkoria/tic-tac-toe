'use strict'

const boxes=document.querySelectorAll('.boxes');
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