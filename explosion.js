class Explosion {
    constructor() {
        this.spriteWidth = 64;
        this.spriteHeight = 64;
        this.frameX = 1;
        this.timeToNewFrame = 0;
        this.frameInterval = 100;
        this.markedForDeletion = false;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class DustCloud extends Explosion {
    constructor(x, width, game) {
        super(width);
        this.game = game;
        this.x = x + width / 3;
        this.y = this.game.height - 300;
        this.maxFrames = 11;
        this.width = this.spriteWidth * 5;
        this.height = this.spriteHeight * 5;
        this.image = document.getElementById(`dust${this.frameX}`);
    }
    update(deltaTime) {
        this.x -= this.game.speed;
        if (this.timeToNewFrame >= this.frameInterval) {
            this.frameX++;
            if (this.frameX >= this.maxFrames) {
                this.markedForDeletion = true;
            }
            this.image = document.getElementById(`dust${this.frameX}`);
            this.timeToNewFrame = 0;
        } else {
            this.timeToNewFrame += deltaTime;
        }
    }
}

export class BlueExplosion extends Explosion {
    constructor(x, y, width, game) {
        super(y, width);
        this.game = game;
        this.x = x + width / 2;
        this.y = y;
        this.maxFrames = 12;
        this.width = this.spriteWidth * 5;
        this.height = this.spriteHeight * 5;
        this.image = document.getElementById(`blue${this.frameX}`);
    }
    update(deltaTime) {
        this.x -= this.game.speed;
        if (this.timeToNewFrame >= this.frameInterval) {
            this.frameX++;
            if (this.frameX >= this.maxFrames) {
                this.markedForDeletion = true;
            }
            this.image = document.getElementById(`blue${this.frameX}`);
            this.timeToNewFrame = 0;
        } else {
            this.timeToNewFrame += deltaTime;
        }
    }
}

export class RedExplosion extends Explosion {
    constructor(x, y, width, game) {
        super(width);
        this.game = game;
        this.x = x - 100;
        this.y = y - 100; 
        this.maxFrames = 10;
        this.width = this.spriteWidth * 3;
        this.height = this.spriteHeight * 3;
        this.image = document.getElementById(`red${this.frameX}`);
    }
    update(deltaTime) {
        this.x -= this.game.speed;
        if (this.timeToNewFrame >= this.frameInterval) {
            this.frameX++;
            if (this.frameX >= this.maxFrames) {
                this.markedForDeletion = true;
            }
            this.image = document.getElementById(`red${this.frameX}`);
            this.timeToNewFrame = 0;
        } else {
            this.timeToNewFrame += deltaTime;
        }
    }
}