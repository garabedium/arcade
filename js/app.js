// Keep score
var score = 0,
    scoreValue = 10,
    gameTitle = "<h1>a <span>bug's</span> strife</h1>",
    scoreText = "<h3>score: <span id='score'></span></h3>";

window.onload = function(){
    document.getElementById("score-board").innerHTML=gameTitle + scoreText;
    document.getElementById("score").innerHTML=score;
}

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = x;
    this.y = y;
    this.width = 95;
    this.height = 75;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Enemy movement loop
    // If enemy is off-canvas, start over at -80
    if (this.x > 500){
        this.x = enemyCols[Math.round(Math.random()*(enemyRows.length-1))];
        this.y = enemyRows[Math.round(Math.random()*(enemyRows.length-1))];
        this.speed = Math.random() * (240 - 70) + 70;
    } else {
       this.x = this.x += (this.speed * dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

    // Set player width-height for collision detection
    this.width = 65;
    this.height = 90;

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt){

    // Set player boundaries
    if (this.y < 40){
        player.reset(1);
    } else if (this.y >= 400) {
        this.y = 400;
    }
    if (this.x <= 0){
        this.x = 0;
    } else if (this.x >= 400){
        this.x = 400;
    }

};

Player.prototype.handleInput = function(key){

    var playerMove = 40;

    switch(key){
        case 'up':
            this.y -= playerMove;
            break;
        case 'down':
            this.y += playerMove;
            break;
        case 'left':
            this.x -= playerMove;
            break;
        case 'right':
            this.x += playerMove;
            break;
    }

};

// Check if player x-y position is equal to enemy x-y + enemy's dimensions (height-width)
// Reset game if bug hits player
function checkCollisions () {
    allEnemies.forEach(function(enemy){
        if (
            player.x <= enemy.x + enemy.width - 20 &&
            player.x + enemy.width >= enemy.x &&
            // player.y + (value) makes it easier to move below enemy
            player.y + 20 <= enemy.y + enemy.height &&
            // player.height - (value) makes it easier to move above enemy
            player.y + player.height - 40 >= enemy.y
        ){
            player.reset(0);
        }
    });
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Enemy array
var allEnemies = [];

// Confine enemy movement to these Y coordinates / rows
var enemyRows = [60, 140, 220, 300];
var enemyCols = [-65, -80, -100];

// Create enemies, push to allEnemies array
for (var i = 0; allEnemies.length <= 6; i++) {

    // Randomize X/Y position
    var enemyRowRandom = enemyRows[Math.round(Math.random()*(enemyRows.length-1))];
    var enemyColRandom = enemyCols[Math.round(Math.random()*(enemyRows.length-1))];

    // Start enemy on random enemyRows value
    this.y = enemyRowRandom;
    this.x = enemyColRandom;

    // Start enemy on random X value

    // Set a random speed for the enemy
    var enemySpeed = Math.random() * (240 - 70) + 70;
        enemySpeed = Math.round(enemySpeed);

    // Add new enemy to allEnemies array
    allEnemies.push( new Enemy(-100, this.y, enemySpeed) );

}

var player = new Player(200,400);

// Player reset function
Player.prototype.reset = function(status){

    // If player reaches water, success, else, hit by bug.
    if (status === 1){
        score += scoreValue;
        document.getElementById("score").innerHTML=score;
        alert("Nice hoppin' chappie! Your score: " + score + "!");
    } else {
        if (score > 0){
            score -= scoreValue;
            document.getElementById("score").innerHTML=score;
            alert("Agh! Avoid the bugs! You lose " + scoreValue + " points." + "\n" +
                  "Your score: " + score);
        } else {
             alert("Agh! Avoid the bugs! Your score: " + score);
        }
        console.log("Crash: " + "X: " + player.x + " - Y: " + player.y);
    }

    // Reset to starting coordinates
    player.x = 200;
    player.y = 400;

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});