export default function displayStatusText(context, game) {
    context.textAlign = "left";
    context.font = "40px Bokor";
    context.fillStyle = "#71EFFE";
    context.fillText(`Score: ${game.score}`, 112, 117);
    context.fillText(`Demons Dodged: ${game.enemiesDodged}`, 112, 157);
    context.fillText(`Demons Vanquished: ${game.enemiesKilled}`, 112, 197);
    context.fillText(`${game.metersTravelled} meters`, 112, game.height - 98);
    context.fillStyle = "#FBFDE4";
    context.fillText(`Score: ${game.score}`, 110, 115);
    context.fillText(`Demons Dodged: ${game.enemiesDodged}`, 110, 155);
    context.fillText(`Demons Vanquished: ${game.enemiesKilled}`, 110, 195);
    context.fillText(`${game.metersTravelled} meters`, 112, game.height - 100);
    if (game.gameOver) {
        context.textAlign = "center";
        context.font = "60px Bokor";
        context.fillStyle = "#042A42";
        context.fillText("GAME OVER, press R to restart!", game.width / 2, game.height / 2);
        context.fillText(`YOUR SCORE: ${game.score}`, game.width / 2 , game.height / 2 + 100);
        context.fillStyle = "#FBFDE4";
        context.fillText("GAME OVER, press R to restart!", game.width / 2 + 2, game.height / 2 + 2);
        context.fillText(`YOUR SCORE: ${game.score}`, game.width / 2 + 2 , game.height / 2 + 102);
    }
}