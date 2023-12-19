import CanvasManager from './canvasManager.js';
import Hexagon from './hexagon.js';
import canvasManager from "./canvasManager.js";

const WIDTH = 5;
const HEIGHT = 5;

const HEXAGON_WIDTH = 1.5 * Hexagon.RADIUS;
const HEXAGON_HEIGHT = Math.sqrt(3) * Hexagon.RADIUS;
const VERTICAL_OFFSET = HEXAGON_HEIGHT * 0.5;

const hexagons = Array.from({ length: HEIGHT }, () => new Array(WIDTH));

let xOffset = 50;
let yOffset = 50;

const allColors = []
let currentColor = "";

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setNewColor() {
    currentColor = allColors[Math.floor(Math.random() * allColors.length)];
    const colorDiv = document.getElementById('color');
    colorDiv.style.backgroundColor = currentColor;
}

// TODO: this is not correct!
function setNeighbors() {
    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            const hexagon = hexagons[row][col];
            const evenRow = row % 2 === 0;

            const neighbors = {
                top: row > 0 ? hexagons[row - 1][col] : undefined,
                bottom: row < HEIGHT - 1 ? hexagons[row + 1][col] : undefined,
                topLeft: row > 0 && (evenRow ? col > 0 : true) ? hexagons[row - 1][evenRow ? col - 1 : col] : undefined,
                topRight: row > 0 && (evenRow ? true : col < WIDTH - 1) ? hexagons[row - 1][evenRow ? col : col + 1] : undefined,
                bottomLeft: row < HEIGHT - 1 && (evenRow ? col > 0 : true) ? hexagons[row + 1][evenRow ? col - 1 : col] : undefined,
                bottomRight: row < HEIGHT - 1 && (evenRow ? true : col < WIDTH - 1) ? hexagons[row + 1][evenRow ? col : col + 1] : undefined
            };

            // Setzen der Nachbarn, wenn sie existieren.
            hexagon.setNeighbors(neighbors.top, neighbors.topRight, neighbors.bottomRight, neighbors.bottom, neighbors.bottomLeft, neighbors.topLeft);
        }
    }
}

function getClickedHexagon(clientX, clientY) {
    const rect = canvasManager.canvas.getBoundingClientRect();
    const xClick = clientX - rect.left - xOffset;
    const yClick = clientY - rect.top - yOffset;

    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            const hex = hexagons[row][col];
            // Prüfen, ob der Klick innerhalb der Grenzen dieses Hexagons ist.
            if (hex.isPointInside(xClick, yClick)) {
                return hex;
            }
        }
    }
    return null; // Kein Hexagon wurde angeklickt.
}

function createHexagons() {
    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            const x = col * HEXAGON_WIDTH;
            const y = row * HEXAGON_HEIGHT + (x / HEXAGON_WIDTH % 2) * VERTICAL_OFFSET;
            const color = getRandomColor();
            hexagons[row][col] = new Hexagon(x, y, color);
            allColors.push(color);
        }
    }

    setNeighbors();
}

document.addEventListener('DOMContentLoaded', () => {
    const canvasManager = new CanvasManager('myCanvas');
    createHexagons();

    // Zeichnen aller Hexagone auf dem Canvas.
    hexagons.flat().forEach(hexagon => {
        canvasManager.addHexagon(hexagon);
    });
    canvasManager.draw(xOffset, yOffset);




    // Mouse-Handler für das Canvas.
    canvasManager.canvas.addEventListener('click', (e) => {
        const clickedHexagon = getClickedHexagon(e.clientX, e.clientY);
        if (clickedHexagon) {
            const colorDiv = document.getElementById('color');
            colorDiv.style.backgroundColor = clickedHexagon.color;
        }
    });
});
