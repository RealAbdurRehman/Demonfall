export class Layer {
    constructor(game, image, speedModifier, width, height) {
        this.game = game;
        this.gameSpeed = this.game.speed;
        this.speedModifier = speedModifier;
        this.speed = this.gameSpeed * this.speedModifier;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.image = image;
    }
    restart() {
        this.x = 0;
    }
    update() {
        this.speed = this.game.speed * this.speedModifier;
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width - 10, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1920;
        this.height = 1080;
        this.layer1Image = document.getElementById("layer1");
        this.layer2Image = document.getElementById("layer2");
        this.layer3Image = document.getElementById("layer3");
        this.layer4Image = document.getElementById("layer4");
        this.layer5Image = document.getElementById("layer5");
        this.layer6Image = document.getElementById("layer6");
        this.layer7Image = document.getElementById("layer7");
        this.layer8Image = document.getElementById("layer8");
        this.layer1 = new Layer(this.game, this.layer1Image, 0.2, this.width, this.height);
        this.layer2 = new Layer(this.game, this.layer2Image, 0.4, this.width, this.height);
        this.layer3 = new Layer(this.game, this.layer3Image, 0.8, this.width, this.height);
        this.layer4 = new Layer(this.game, this.layer4Image, 1.0, this.width, this.height);
        this.layer5 = new Layer(this.game, this.layer5Image, 1.2, this.width, this.height);
        this.layer6 = new Layer(this.game, this.layer6Image, 1.4, this.width, this.height);
        this.layer7 = new Layer(this.game, this.layer7Image, 1.6, this.width, this.height);
        this.layer8 = new Layer(this.game, this.layer8Image, 1.8, this.width, this.height);
        this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, this.layer7, this.layer8];
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        })
    }
    restart() {
        this.x = 0;
    }
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        })
    }
}