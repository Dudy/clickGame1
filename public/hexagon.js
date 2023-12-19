class Hexagon {

    static RADIUS = 20;

    constructor(x, y, color = 'black') {
        this.x = x;
        this.y = y;
        this.color = color;

        this.top = undefined;
        this.topRight = undefined;
        this.bottomRight = undefined;
        this.bottom = undefined;
        this.bottomLeft = undefined;
        this.topLeft = undefined;
    }

    draw(context, offsetX = 0, offsetY = 0) {
        const numberOfSides = 6;
        const angle = (2 * Math.PI) / numberOfSides;

        context.beginPath();
        context.moveTo(offsetX + this.x + Hexagon.RADIUS * Math.cos(0), offsetY + this.y + Hexagon.RADIUS * Math.sin(0));

        for (let i = 1; i <= numberOfSides; i += 1) {
            context.lineTo(offsetX + this.x + Hexagon.RADIUS * Math.cos(i * angle), offsetY + this.y + Hexagon.RADIUS * Math.sin(i * angle));
        }

        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
        context.stroke();
    }

    setNeighbors(top, topRight, bottomRight, bottom, bottomLeft, topLeft) {
        this.top = top;
        this.topRight = topRight;
        this.bottomRight = bottomRight;
        this.bottom = bottom;
        this.bottomLeft = bottomLeft;
        this.topLeft = topLeft;
    }

    // Methode zum Überprüfen, ob ein Punkt innerhalb des Hexagons ist.
    isPointInside(x, y) {
        // Prüfen Sie hier mit einer geeigneten Methode, ob der Punkt (x, y) im Hexagon liegt.
        // Dies könnte durch Überprüfung der Entfernung des Punktes von den sechs Ecken des Hexagons erfolgen
        // und sicherstellen, dass es innerhalb aller sechs Halbebenen liegt, die durch die Seiten des Hexagons gebildet werden.
        // Für einen einfachen Prototyp könnte man die Entfernung vom Mittelpunkt vergleichen,
        // aber für exakte Ergebnisse ist eine komplexe Punkt-in-Polygon-Logik erforderlich.

        // Platzhalter-Logik: Überprüfen Sie, ob der Punkt näher als der Radius zum Zentrum des Hexagons ist.
        const dx = x - this.x;
        const dy = y - this.y;
        return dx * dx + dy * dy <= Hexagon.RADIUS * Hexagon.RADIUS;
    }
}

export default Hexagon;
