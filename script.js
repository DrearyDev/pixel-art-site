'use strict';

const drawArea = document.querySelector('.draw-area');
const gridLinesToggle = document.querySelector('.grid-lines-btn');
const clearCanvas = document.querySelector('.clear-canvas');
const myRange = document.getElementById('my-range');
const rangeDisplay = document.querySelector('.range-display');
const currentColor = document.querySelector('.current-color');
const newColor = document.querySelector('.new-color');
const setColor = document.querySelector('.set-color');

const redSlider = document.getElementById('red-slider');
const redDisplay = document.querySelector('.red-display');
const greenSlider = document.getElementById('green-slider');
const greenDisplay = document.querySelector('.green-display');
const blueSlider = document.getElementById('blue-slider');
const blueDisplay = document.querySelector('.blue-display');

let size = 16;
myRange.value = size;
let basisPercent = (100/size) + '%'; //percent one square should take up in drawArea
let color = '#000';
redSlider.value = 0;
greenSlider.value = 0;
blueSlider.value = 0;
let createNewColor = {
    red: 0,
    green: 0,
    blue: 0
};
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


function updateNewColor(createNewColor) {
    newColor.style.backgroundColor = `rgb(${createNewColor.red},${createNewColor.green},${createNewColor.blue})`;
};

setColor.addEventListener('click', () => {
    currentColor.style.backgroundColor = newColor.style.backgroundColor;
    color = currentColor.style.backgroundColor;
});

redSlider.oninput = () => {
    redDisplay.textContent = `Red Value: ${redSlider.value}`;
    createNewColor.red = Number(redSlider.value);
    updateNewColor(createNewColor);
};

greenSlider.oninput = () => {
    greenDisplay.textContent = `Green Value: ${greenSlider.value}`;
    createNewColor.green = Number(greenSlider.value);
    updateNewColor(createNewColor);
};

blueSlider.oninput = () => {
    blueDisplay.textContent = `Blue Value: ${blueSlider.value}`;
    createNewColor.blue = Number(blueSlider.value);
    updateNewColor(createNewColor);
};





window.addEventListener('mousedown', () => drawing = true);
window.addEventListener('mouseup', (e) => {
    e.target.classList.add('clicked');
    drawing = false;
});

drawArea.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('square')) {
        e.target.style.backgroundColor = color;
    };
});

let previousColor;
drawArea.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('square')){
        previousColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = color;
    };
});

drawArea.addEventListener('mouseout', (e) => {
    if (!drawing && !e.target.classList.contains('clicked')) {
        e.target.style.backgroundColor = previousColor;
        previousColor = null;
    } else if (e.target.classList.contains('clicked')) {
        e.target.classList.remove('clicked');
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