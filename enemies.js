class Enemy {
    constructor(game) {
        this.game = game;
        this.frameX = 0;        
        this.x = this.game.width;
        this.timeToNewFrame = 0;
        this.frameInterval = 100;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        if (this.x < -this.width * 2) {
            this.markedForDeletion = true;
            this.game.enemiesDodged++;
            this.game.score += Math.floor(Math.random() * 10 + 5);
        }
        if (this.timeToNewFrame >= this.frameInterval) {
            this.frameX++;
            if (this.frameX >= this.maxFrames) {
                this.frameX = 0;
            }
            this.timeToNewFrame = 0;
        } else {
            this.timeToNewFrame += deltaTime;
        }  
        this.x -= this.speed;
    }
}

export class BlueDemon extends Enemy {
    constructor(game) {
        super(game);
        this.type = "bluedemon";
        this.speed = Math.random() * 5 + 5;
        this.spriteWidth = 131;
        this.spriteHeight = 61;
        this.width = this.spriteWidth * 5;
        this.height = this.spriteHeight * 5;
        this.maxFrames = 4;
        this.y = this.game.height - this.height - 50;
        this.frameY = 3;
        this.image = document.getElementById("enemy1");
        this.hitBoxX = this.x + 400;
        this.hitBoxY = this.y + 35;
        this.hitBoxWidth = this.width / 3;
        this.hitBoxHeight = this.height;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.hitBoxX = this.x + 400;
        this.hitBoxY = this.y + 45;
    }
    playHitAnimation() {
        this.speed = 0;
        this.frameX = 0;
        this.frameY = 1;
        this.maxFrames = 8;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export class RedDemon extends Enemy {
    constructor(game) {
        super(game);
        this.game = game;
        this.type = "reddemon";
        this.speed = Math.random() * 7 + 8;
        this.spriteWidth = 81;
        this.spriteHeight = 71;
        this.width = this.spriteWidth * 1.75;
        this.height = this.spriteHeight * 1.75;
        this.maxFrames = 3;
        this.angle = Math.random() * Math.PI * 2;
        this.curve = Math.random() * 2 + 1;
        this.frequency = Math.random() * 0.05 + 0.02;
        this.randomMovementTimer = 0;
        this.randomY = 0;
        this.y = this.baseY;
        this.baseY = Math.floor(Math.random() * (550 - 475 + 1)) + 475;
        this.image = document.getElementById("enemy2-fly");
        this.hitBoxX = this.x + 20;
        this.hitBoxY = this.y + this.height / 3;
        this.hitBoxWidth = this.width / 2;
        this.hitBoxHeight = this.height / 2;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.y = this.baseY + Math.sin(this.angle) * this.curve * 20;
        this.angle += this.frequency;
        this.randomMovementTimer += deltaTime;
        if (this.randomMovementTimer > 1000) {
            this.randomY = Math.random() * 30 - 15;
            this.randomMovementTimer = 0;
        }
        this.y += this.randomY;
        this.y = Math.max(0, Math.min(this.y, this.game.height - this.height));
        this.hitBoxX = this.x + 20;
        this.hitBoxY = this.y + this.height / 3;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    playHitAnimation() {
        this.speed = 0;
        this.frameX = 0;
        this.maxFrames = 8;
        this.image = document.getElementById("enemy2-attack");
    }
}