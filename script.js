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

const alphaSlider = document.getElementById('alpha-slider');
const alphaDisplay = document.querySelector('.alpha-display');

const oldColors = document.querySelector('.old-colors');

const randomColorsBtn = document.querySelector('.random-colors');

let size = 16;
myRange.value = size;
let basisPercent = (100/size) + '%'; //percent one square should take up in drawArea
let color = '#000';
let previousColor;
currentColor.style.backgroundColor = color;
newColor.style.backgroundColor = color;
redSlider.value = 0;
greenSlider.value = 0;
blueSlider.value = 0;
alphaSlider.value = 10;
let createNewColor = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 1
};
let drawing = false;
let squares = [];
let oldColorsArray = [];

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
    newColor.style.backgroundColor = `rgba(${createNewColor.red},${createNewColor.green},${createNewColor.blue},${createNewColor.alpha})`;
};

setColor.addEventListener('click', () => {
    handleOldColors(currentColor.style.backgroundColor);
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

alphaSlider.oninput = () => {
    alphaDisplay.textContent = `Alpha Value: ${alphaSlider.value}`;
    createNewColor.alpha = Number(alphaSlider.value / 10);

    updateNewColor(createNewColor);
};

function handleOldColors(oldColor) {
    const div = document.createElement('div');
    div.classList.add('old-color');
    div.setAttribute('ondragstart', 'return false');
    div.style.backgroundColor = oldColor;
    oldColors.appendChild(div);

    // remove overflow old colors
    if (oldColors.children.length > 5) {
        const oldColorsChildren = document.querySelectorAll('.old-color');
        oldColorsChildren[0].remove();
    };
};

oldColors.addEventListener('click', (e) => {
    let rgbString = e.target.style.backgroundColor;

    if (rgbString.indexOf('a') === -1){//if it doesnt exist so its rgb not rgba
        rgbString = rgbString.replace('rgb(', '');
    };

    rgbString = rgbString.replace('rgba(', '');

    rgbString = rgbString.replace(')', '');
    rgbString = rgbString.replaceAll(' ', '');
    rgbString = rgbString.split(',');

    redSlider.value = rgbString[0];
    redDisplay.textContent = `Red Value: ${rgbString[0]}`;
    createNewColor.red = rgbString[0];

    greenSlider.value = rgbString[1];
    greenDisplay.textContent = `Green Value: ${rgbString[1]}`;
    createNewColor.green = rgbString[1];

    blueSlider.value = rgbString[2];
    blueDisplay.textContent = `Blue Value: ${rgbString[2]}`;
    createNewColor.blue = rgbString[2];

    if (rgbString[3] !== undefined) {
        alphaSlider.value = rgbString[3] * 10;
        alphaDisplay.textContent = `Alpha Value: ${rgbString[3] * 10}`;
        createNewColor.alpha = rgbString[3];
    } else {
        alphaSlider.value = 10;
        alphaDisplay.textContent = `Alpha Value: ${10}`;
        createNewColor.alpha = 1;
    };

    updateNewColor(createNewColor);

});

randomColorsBtn.addEventListener('click', () => {
    randomColorsBtn.classList.toggle('toggled-on');
});

function getRandomColor(){
    let r = Math.floor(Math.random() * 255 + 1);
    let g = Math.floor(Math.random() * 255 + 1);
    let b = Math.floor(Math.random() * 255 + 1);
    let a = Math.floor(Math.random() * 10 + 1);

    createNewColor.red = r;
    createNewColor.green = g;
    createNewColor.blue = b;
    createNewColor.alpha = a;

    redSlider.value = r;
    redDisplay.textContent = `Red Value: ${r}`;

    greenSlider.value = g;
    greenDisplay.textContent = `Green Value: ${g}`;

    blueSlider.value = b;
    blueDisplay.textContent = `Blue Value: ${b}`;

    alphaSlider.value = a;
    alphaDisplay.textContent = `Alpha Value: ${a}`;

    updateNewColor(createNewColor);
    currentColor.style.backgroundColor = newColor.style.backgroundColor;
    color = currentColor.style.backgroundColor;
    handleOldColors(color);

    return `rgba(${r},${g},${b},${a})`;
};


window.addEventListener('mousedown', () => drawing = true);
window.addEventListener('mouseup', (e) => {
    if (e.target.classList.contains('square')){
        e.target.classList.add('clicked');
    };
    drawing = false;
});

drawArea.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('square') && !randomColorsBtn.classList.contains('toggled-on')) {
        e.target.style.backgroundColor = color;
    } else if (e.target.classList.contains('square')) {
        e.target.style.backgroundColor = getRandomColor();
    };
});

drawArea.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('square') && !randomColorsBtn.classList.contains('toggled-on')){
        previousColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = color;
    } else if (e.target.classList.contains('square')) {
        previousColor = e.target.style.backgroundColor;
        e.target.style.backgroundColor = getRandomColor()
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
    gridLinesToggle.classList.toggle('toggled-on');
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
    gridLinesToggle.classList.remove('toggled-on');
};