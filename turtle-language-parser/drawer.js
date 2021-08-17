
const lineSizeMult = 2;
const lineLengthMult = 10;

class Drawer {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

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
        const finalLength = this.getFinalLength(lineLength);

        // We always draw towards right, so first we need to go left
        this.x = this.x - finalLength;
        this.drawLineIfPenDown(finalLength, this.getFinalSize(this.size));
    }

    doDrawEast(lineLength) {
        console.info(`Drawing east for ${lineLength}`);
        const finalLength = this.getFinalLength(lineLength);

        // We always draw towards right, so first draw the line, then go to the end
        this.drawLineIfPenDown(finalLength, this.getFinalSize(this.size));
        this.x = this.x + finalLength;
    }

    doDrawSouth(lineLength) {
        console.info(`Drawing south for ${lineLength}`);
        const finalLength = this.getFinalLength(lineLength);

        // We always draw towards bottom, so first draw the line, then go to the end
        this.drawLineIfPenDown(this.getFinalSize(this.size), finalLength);
        this.y = this.y + finalLength;
    }

    doDrawNorth(lineLength) {
        console.info(`Drawing north for ${lineLength}`);
        const finalLength = this.getFinalLength(lineLength);

        // We always draw towards bottom, so first we need to go down
        this.y = this.y - finalLength;
        this.drawLineIfPenDown(this.getFinalSize(this.size), finalLength);
    }

    drawLineIfPenDown(width, height) {
        if (this.penDown === false)
            return;

        this.ctx.fillRect(this.x, this.y, width, height);
    }

    getFinalLength(length) {
        return length * lineLengthMult
    }

    getFinalSize(size) {
        return size * lineSizeMult
    }
}

export default Drawer;