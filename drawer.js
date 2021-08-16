
const lineSizeMult = 5;
const lineLengthMult = 10;

class Drawer {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        console.log(this.canvas);

        this.x = 250;
        this.y = 250;
        this.ctx.moveTo(this.x, this.y);
        this.size = 0;
        this.penDown = false;
    }

    doTakePen(size) {
        console.info(`Taking pen of size ${size}`);
        this.size = size;
    }

    doLowerPen() {
        console.info(`Lowering pen`);
        this.penDown = true;
    }

    doRaisePen() {
        console.info(`Raising pen`);
        this.penDown = false;
    }

    doDrawWest(lineLength) {
        console.info(`Drawing west for ${lineLength}`);
        const finalLength = lineLength * lineLengthMult;
        this.x = this.x - finalLength;
        this.ctx.fillRect(this.x, this.y, finalLength, this.size * lineSizeMult);

    }

    doDrawEast(lineLength) {
        console.info(`Drawing east for ${lineLength}`);
    }

    doDrawSouth(lineLength) {
        console.info(`Drawing south for ${lineLength}`);
    }

    doDrawNorth(lineLength) {
        console.info(`Drawing north for ${lineLength}`);
    }
}

export default Drawer;