export default class InputHandler {
    constructor(game, animate, restartGame) {
        this.game = game;
        this.keys = [];
        window.addEventListener("keydown", event => {
            if ((event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "f") && !this.keys.includes(event.key)) {
                this.keys.push(event.key);
            } else if ((event.key === "r" || event.key === "R" || event.key === "Enter") && this.game.gameOver) {
                restartGame(this.game, animate);
            }
        })
        window.addEventListener("keyup", event => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "f") {
                this.keys.splice(this.keys.indexOf(event.key), 1);
            }
        })
    }
}