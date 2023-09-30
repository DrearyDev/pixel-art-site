'use strict';

const drawArea = document.querySelector('.draw-area');

function createGrid() {
    let size = 16;

    for (let i = 0; i < (size ** 2); i++){
        const div = document.createElement('div');
        drawArea.appendChild(div);
    };
};

createGrid();