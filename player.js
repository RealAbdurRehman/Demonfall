import { Running, Jumping, Falling, Smash, Slash, Death } from "./playerStates.js";

export default class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 140;
        this.spriteHeight = 140;
        this.width = this.spriteWidth * 6;
        this.height = this.spriteHeight * 6;
        this.image = document.getElementById("run");
        this.frameX = 0;
        this.maxFrames = 7;
        this.frameInterval = 50;
        this.timeToNextFrame = 0;
        this.x = 100;
        this.y = -this.height;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
        this.isAttacking = false;
        this.states = [new Running(this), new Jumping(this), new Falling(this), new Smash(this), new Slash(this), new Death(this)];
        this.currentState = this.states[2];
        this.currentState.enter();
        this.hitBoxX = this.x + this.width / 2 - 30;
        this.hitBoxY = this.y + 270;
        this.hitBoxWidth = this.width / 6;
        this.hitBoxHeight = this.height / 3.75;
        this.attackHitBoxX = this.hitBoxX + this.hitBoxWidth;
        this.attackHitBoxY = this.hitBoxY;
        this.attackHitBoxWidth = this.hitBoxWidth;
        this.attackHitBoxHeight = this.hitBoxHeight - 50;
        this.isDead = false;
        this.dustCloud = document.getElementById("dust");
        this.dustCloudSpriteWidth = 80;
        this.dustCloudSpriteHeight = 64;
        this.dustCloudWidth = this.dustCloudSpriteWidth * 2;
        this.dustCloudHeight = this.dustCloudSpriteHeight * 2;
        this.dustCloudFrameX = 0;
        this.showDustCloud = false;
    }
    restart() {
        this.image = document.getElementById("run");
        this.frameX = 0;
        this.x = 100;
        this.y = -this.height;
        this.speed = 0;
        this.vy = 0;
        this.isAttacking = false;
        this.currentState = this.states[2];
        this.currentState.enter();
        this.isDead = false;
        this.dustCloudFrameX = 0;
        this.showDustCloud = false;
    }
    animate(deltaTime) {
        if (this.timeToNextFrame >= this.frameInterval) {
            if ((this.frameX >= this.maxFrames) && this.isDead ) {
                return;
            } else if (this.frameX < this.maxFrames) {
                this.frameX++;
                this.dustCloudFrameX++;
                if (this.dustCloudFrameX > 8) {
                    this.dustCloudFrameX = 0;
                } 
            }
            else {
                this.frameX = 0;
                this.dustCloudFrameX = 0;
            }
            this.timeToNextFrame = 0;
        } else {
            this.timeToNextFrame += deltaTime;
        }
    }
    checkCollision(enemies) {
        if (this.isDead) return;
        enemies.forEach(enemy => {
            if (this.hitBoxX < enemy.hitBoxX + enemy.hitBoxWidth &&
                this.hitBoxX + this.hitBoxWidth > enemy.hitBoxX && 
                this.hitBoxY < enemy.hitBoxY + enemy.hitBoxHeight &&
                this.hitBoxY + this.hitBoxHeight > enemy.hitBoxY
            ) {
                this.isDead = true;
                enemy.playHitAnimation();
                setTimeout(() => {
                    this.game.gameOver = true;
                }, 1200)
            }
        })
    }
    checkHit(enemies) {
        if (this.isDead) return;
        enemies.forEach(enemy => {
            if (this.isAttacking) {
                if (this.attackHitBoxX < enemy.hitBoxX + enemy.hitBoxWidth &&
                    this.attackHitBoxX + this.attackHitBoxWidth > enemy.hitBoxX && 
                    this.attackHitBoxY < enemy.hitBoxY + enemy.hitBoxHeight &&
                    this.attackHitBoxY + this.attackHitBoxHeight > enemy.hitBoxY) 
                {
                    enemy.markedForDeletion = true;
                    this.game.enemiesKilled++;
                    this.game.score += Math.floor(Math.random() * 50 + 25);
                }
            }
        })
    }
    onGround() {
        return this.y >= this.game.height - this.height + 300;
    }
    update(input) {
        this.currentState.handleInput(input);
        this.x += this.speed;
        if (input.includes("ArrowDown") && !this.onGround()) {
            this.game.speed = 1;
            this.game.scoreInterval = 1000;
        } else if (input.includes("f")) {
            this.speed = 1;
            this.game.speed = 0;
            this.game.scoreAmount = 0;
        } else if (input.includes("ArrowRight")) {
            this.speed = 5;
            this.game.speed = 6;
            this.game.scoreInterval = 100;
        } else if (input.includes("ArrowLeft")) {
            this.speed = -5;
            this.game.speed = 4;
            this.game.scoreInterval = 500;
        } else {
            this.speed = 0;
            this.game.speed = 5;
            this.game.scoreAmount = 1;
            this.game.scoreInterval = 250;
        }
        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width;
        if (input.includes("ArrowUp") && this.onGround()) this.vy = -28;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        if (this.y > this.game.height - this.height + 300) this.y = this.game.height - this.height + 300;
        this.hitBoxY = this.y + 270;
        if (!this.onGround()) {
            this.hitBoxX = this.x + this.width / 2 - 100;
        } else {
            this.hitBoxX = this.x + this.width / 2 - 30;
        }
        if (this.currentState.state === "SMASH") {
            this.attackHitBoxWidth = this.hitBoxWidth * 2;
            this.attackHitBoxHeight = this.hitBoxHeight * 2;
            this.attackHitBoxX = this.hitBoxX - this.hitBoxWidth / 2;
            this.attackHitBoxY = this.hitBoxY + 20;
        } else {
            this.attackHitBoxX = this.hitBoxX + this.hitBoxWidth;
            this.attackHitBoxY = this.hitBoxY;
            this.attackHitBoxWidth = this.hitBoxWidth;
            this.attackHitBoxHeight = this.hitBoxHeight - 50;
        }
        if (this.isDead) {
            this.speed = 0;
            this.game.speed = 0;
            this.game.scoreAmount = 0;
        }
    }    
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();  
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        if (this.showDustCloud) context.drawImage(this.dustCloud, this.dustCloudFrameX * this.dustCloudSpriteWidth, 0, this.dustCloudSpriteWidth, this.dustCloudSpriteHeight, this.x + this.width / 2 - 150, this.game.height - this.dustCloudSpriteHeight - 120, this.dustCloudWidth, this.dustCloudHeight);
    }
}