'use strict';

const drawArea = document.querySelector('.draw-area');
const gridLines = document.querySelector('.grid-lines-btn');
const myRange = document.getElementById('my-range');

let size = 16;
myRange.value = size;
let basisPercent = (100/size) + '%'; //percent one square should take up in drawArea
let color = '#000';
let drawing = false;
let squares = [];

function createGrid() {

    if (drawArea.childElementCount !== 0) {
        drawArea.innerHTML = '';
    };

    for (let i = 0; i < (size ** 2); i++){
        const div = document.createElement('div');
        div.classList.add('square');
        div.setAttribute('ondragstart', 'return false');
        div.classList.add('grid-lines');
        div.style.flexBasis = basisPercent;
        drawArea.appendChild(div);
    };

    squares = [...drawArea.children];
    squares.forEach(square => {
        square.addEventListener('mousedown', (e) => {
            e.target.style.backgroundColor = color;
        });
    });


};
createGrid();


window.addEventListener('mousedown', () => drawing = true);
window.addEventListener('mouseup', () => drawing = false);
drawArea.addEventListener('mouseover', (e) => {
    if (drawing === true) {
        e.target.style.backgroundColor = color;
    };
});

gridLines.addEventListener('click', () => {
    squares.forEach(square => {
        square.classList.toggle('grid-lines');
    });
});

myRange.addEventListener('click', (e) => {
    console.log(e.target.value);
    size = e.target.value;
    basisPercent = (100/size) + '%';
    createGrid();
});