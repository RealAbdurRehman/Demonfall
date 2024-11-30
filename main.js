import Player from "./player.js";
import InputHandler from "./input.js";
import restartGame from "./restartGame.js";
import { BlueDemon, RedDemon } from "./enemies.js";
import { Background, Layer } from "./background.js";
import displayStatusText from "./displayStatusText.js";
import { BlueExplosion, RedExplosion } from "./explosion.js";

window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = canvas.width = 1920;
    const CANVAS_HEIGHT = canvas.height = 1080;
    const bezel = document.getElementById("bezel");
    const backgroundMusic = new Audio();
    backgroundMusic.src = "./Public/Audio/background.mp3";
    backgroundMusic.loop = true;
    
    window.addEventListener("keydown", function() {
        backgroundMusic.play();
    })

    class Game {
        constructor(gameWidth, gameHeight) {
            this.speed = 5;
            this.width = gameWidth;
            this.height = gameHeight;
            this.gameOver = false;
            this.enemies = [];
            this.enemyTypes = ["bluedemon", "reddemon"];
            this.explosions = [];
            this.timeToNewEnemy = 0;
            this.enemyInterval = 2500;
            this.player = new Player(this);
            this.input = new InputHandler(this, animate, restartGame);
            this.background = new Background(this);
            this.topLayer = new Layer(this, document.getElementById("layer9"), 2.0, 1920, 1080)
            this.deltaTime = 0;
            this.score = 0;
            this.scoreAmount = 1;
            this.scoreInterval = 250;
            this.timeToScoreIncrement = 0;
            this.enemiesDodged = 0;
            this.enemiesKilled = 0;
            this.metersTravelled = 0;
        }
        update(deltaTime) {
            this.deltaTime = deltaTime;
            if (this.timeToScoreIncrement >= this.scoreInterval) {
                this.score += this.scoreAmount;
                this.metersTravelled++;
                this.timeToScoreIncrement = 0;
            } else {
                this.timeToScoreIncrement += this.deltaTime;
            }
            this.enemies.forEach(enemy => {
                if (enemy.markedForDeletion && enemy.type === "bluedemon") this.explosions.push(new BlueExplosion(enemy.x, enemy.y, enemy.width, this));
                else if (enemy.markedForDeletion && enemy.type === "reddemon") this.explosions.push(new RedExplosion(enemy.x, enemy.y, enemy.width, this));
            })
            this.enemies.forEach(enemy => {
                if (enemy.markedForDeletion && enemy.type === "reddemon") {
                    this.speed = 0;
                    this.frameX = 0;
                    this.maxFrames = 5;
                    enemy.image = document.getElementById("enemy2-death");
                }
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);
            this.player.animate(this.deltaTime);
            this.player.checkCollision(this.enemies);
            this.player.checkHit(this.enemies);
            this.timeToNewEnemy += this.deltaTime;
            if (this.timeToNewEnemy >= this.enemyInterval) {
                this.#addNewEnemy();
                this.timeToNewEnemy = 0;
                this.enemyInterval = Math.random() * 1000 + 500;
            }
            this.topLayer.update();
            this.background.update();
            this.player.update(this.input.keys);
            this.enemies.forEach(enemy => enemy.update(this.deltaTime));
            this.explosions.forEach(explosion => explosion.update(this.deltaTime));
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => enemy.draw(context));
            this.explosions.forEach(explosion => explosion.draw(context));
            this.topLayer.draw(context);
        }
        #addNewEnemy() {
            const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            if (randomEnemy === "reddemon") this.enemies.push(new RedDemon(this));
            else if (randomEnemy === "bluedemon") this.enemies.push(new BlueDemon(this));
        }
    }

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);

    let lastTime = 0;
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        game.draw(ctx);
        game.update(deltaTime, ctx);
        ctx.drawImage(bezel, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        displayStatusText(ctx, game);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})