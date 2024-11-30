import { DustCloud } from "./explosion.js";

const states = {
    RUNNING: 0,
    JUMPING: 1,
    FALLING: 2,
    SMASH: 3,
    SLASH: 4,
    DEATH: 5
}

export class Running {
    constructor(player) {
        this.player = player;
        this.state = "RUNNING";
    }
    enter() {
        this.player.weight = 1;
        this.player.isAttacking = false;
        this.player.image = document.getElementById("run");
        this.player.frameX = 0;
        this.player.maxFrames = 7;
        this.player.showDustCloud = true;
    }
    handleInput(input) {
        if (this.player.isDead) {
            this.player.setState(states.DEATH)
        } else if (input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING);
        } else if (input.includes("f")) {
            this.player.setState(states.SLASH);
        }
    }
}

export class Jumping {
    constructor(player) {
        this.player = player;
        this.state = "JUMPING";
    }
    enter() {
        this.player.isAttacking = false;
        this.player.image = document.getElementById("jump");
        this.player.frameX = 0;
        this.player.maxFrames = 3;
        this.player.showDustCloud = false;
    }
    handleInput(input) {
        if (this.player.isDead) {
            this.player.setState(states.DEATH)
        } else if (this.player.vy >= 0) {
            this.player.setState(states.FALLING);
        }
    }
}

export class Falling {
    constructor(player) {
        this.player = player;
        this.state = "FALLING";
    }
    enter() {
        this.player.image = document.getElementById("fall");
        this.player.frameX = 0;
        this.player.maxFrames = 3;
        this.player.showDustCloud = false;
    }
    handleInput(input) {
        if (this.player.isDead) {
            this.player.setState(states.DEATH)
        } else if (this.player.onGround()) {
            this.player.setState(states.RUNNING);
        } else if (input.includes("ArrowDown")) {
            this.player.setState(states.SMASH);
        }
    }
}

export class Smash {
    constructor(player) {
        this.player = player;
        this.state = "SMASH";
    }
    enter() {
        this.player.weight = 20;
        this.player.isAttacking = true;
        setTimeout(() => {
            this.player.game.explosions.push(new DustCloud(this.player.x, this.player.width, this.player.game));
        }, 80)
        this.player.showDustCloud = false;
    }
    handleInput(input) {
        if (this.player.isDead) {
            this.player.setState(states.DEATH)
        } else if (this.player.onGround()) {
            this.player.setState(states.RUNNING);
        }
    }
}

export class Slash {
    constructor(player) {
        this.player = player;
        this.state = "SLASH";
    }
    enter() {
        setTimeout(() => {
            this.player.isAttacking = true;
        }, 300)
        this.player.image = document.getElementById("attack");
        this.player.frameX = 0;
        this.player.maxFrames = 5;
        this.player.showDustCloud = false;
    }
    handleInput(input) {
        if (this.player.isDead) {
            this.player.setState(states.DEATH)
        } else if (!input.includes("f")) {
            this.player.setState(states.RUNNING);
        } else if (input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING);
        }
    }
}

export class Death {
    constructor(player) {
        this.player = player;
        this.state = "DEATH";
    }
    enter() {
        this.player.speed = 0;
        this.player.frameX = 0;
        this.player.maxFrames = 8;
        this.player.isAttacking = false;
        this.player.image = document.getElementById("death");
        this.player.showDustCloud = false;
    }
    handleInput(input) {
        return;
    }
}