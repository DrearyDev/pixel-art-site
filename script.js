'use strict';

const drawArea = document.querySelector('.draw-area');

const gridLines = document.querySelector('.grid-lines-btn');

let size = 16;
let color = '#000';
let drawing = false;

for (let i = 0; i < (size ** 2); i++){
    const div = document.createElement('div');
    div.classList.add('square');
    div.setAttribute('ondragstart', 'return false');
    div.classList.toggle('grid-lines');

    drawArea.appendChild(div);
};

const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.addEventListener('mousedown', (e) => {
        e.target.style.backgroundColor = color;
    });
});

window.addEventListener('mousedown', () => drawing = true);

window.addEventListener('mouseup', () => drawing = false);

drawArea.addEventListener('mouseover', (e) => {
    if (drawing === true) {
        e.target.style.backgroundColor = color;
    };
});

gridLines.addEventListener('click', () => {
    squares.forEach(div => {
        div.classList.toggle('grid-lines');
    });
});


