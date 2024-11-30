export default function restartGame(game, animate) {
    game.speed = 5;
    game.gameOver = false;
    game.enemies = [];
    game.explosions = [];
    game.score = 0;
    game.enemiesDodged = 0;
    game.enemiesKilled = 0;
    game.metersTravelled = 0;
    game.topLayer.restart();
    game.background.restart();
    game.player.restart();
    animate(0);
}