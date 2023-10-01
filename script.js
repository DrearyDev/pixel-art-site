'use strict';

const drawArea = document.querySelector('.draw-area');

let size = 16;
let color = '#000';
let drawing = false;

for (let i = 0; i < (size ** 2); i++){
    const div = document.createElement('div');
    div.classList.add('square');
    div.setAttribute('ondragstart', 'return false');
    // console.log((100/size).toFixed(2));
    // div.style.flexBasis = (100/size).toFixed(2);
    drawArea.appendChild(div);
};

const squares = document.querySelectorAll('.square');
squares.forEach(square => {
    square.addEventListener('mousedown', (e) => {
        e.target.style.backgroundColor = color;
    });
});

window.addEventListener('mousedown', () => {
    drawing = true;
});

window.addEventListener('mouseup', () => {
    drawing = false;
});

drawArea.addEventListener('mouseover', (e) => {
    if (drawing === true) {
        e.target.style.backgroundColor = color;
    };
});


