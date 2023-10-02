'use strict';

const drawArea = document.querySelector('.draw-area');
const gridLinesToggle = document.querySelector('.grid-lines-btn');
const clearCanvas = document.querySelector('.clear-canvas');
const myRange = document.getElementById('my-range');
const rangeDisplay = document.querySelector('.range-display');
const currentColor = document.querySelector('.current-color');



let size = 16;
myRange.value = size;
let basisPercent = (100/size) + '%'; //percent one square should take up in drawArea
let color = '#000';
let drawing = false;
let squares = [];

function createGrid() {

    if (drawArea.childElementCount !== 0) {
        drawArea.innerHTML = '';
        size = myRange.value;
        basisPercent = (100/size) + '%';
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

};
createGrid();

window.addEventListener('mousedown', () => drawing = true);
window.addEventListener('mouseup', () => drawing = false);

drawArea.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('square')) {
        e.target.style.backgroundColor = color;
    };
});

drawArea.addEventListener('mouseover', (e) => {

    if (drawing === true) {
        if (e.target.classList.contains('square')) {
            e.target.style.backgroundColor = color;
        };
    };
});

gridLinesToggle.addEventListener('click', () => {
    squares.forEach(square => {
        square.classList.toggle('grid-lines');
    });
});

clearCanvas.addEventListener('click', () => {
    squares.forEach(square => {
        square.style.backgroundColor = 'white';
    });
});

myRange.addEventListener('mouseup', () => {
    createGrid();
});

myRange.oninput = (e) => {
    rangeDisplay.textContent = `${e.target.value} x ${e.target.value}`;
};