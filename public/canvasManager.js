class CanvasManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.hexagons = [];
    }

    addHexagon(hexagon) {
        this.hexagons.push(hexagon);
    }

    draw(offsetX = 0, offsetY = 0) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.hexagons.forEach(hexagon => hexagon.draw(this.context, offsetX, offsetY));
    }
}

export default CanvasManager;
