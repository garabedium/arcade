
'use strict';

// Declare game variables
var score = 0,
    scoreValue = 10,
    gameTitle = "<h1>a <span>bug's</span> strife</h1>",
    scoreText = "<h3>score: <span id='score'></span></h3>",
    speedMax = 240,
    speedMin = 70;

    // var speedMax = 240;
    // var speedMin = 70;

// Show scoreboard
window.onload = function(){
    document.getElementById("score-board").innerHTML=gameTitle + scoreText;
    document.getElementById("score").innerHTML=score;
};

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    var enemyWidth = 95;
    var enemyHeight = 75;

    this.x = x;
    this.y = y;
    this.width = enemyWidth;
    this.height = enemyHeight;
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

    var canvasMax = 500;

    if (this.x > canvasMax){
        this.x = enemyCols[Math.round(Math.random()*(enemyCols.length-1))];
        this.y = enemyRows[Math.round(Math.random()*(enemyRows.length-1))];
        this.speed = Math.random() * (speedMax - speedMin) + speedMin;
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
    var playerWidth = 65;
    var playerHeight = 90;

    this.width = playerWidth;
    this.height = playerHeight;

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt){

    var boundaryMin = 40;
    var boundaryMax = 400;

    // Set player boundaries
    if (this.y < boundaryMin){
        this.reset(1);
    } else if (this.y >= boundaryMax) {
        this.y = boundaryMax;
    }
    if (this.x <= 0){
        this.x = 0;
    } else if (this.x >= boundaryMax){
        this.x = boundaryMax;
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

    var collideOffsetMin = 20;
    var collideOffsetMax = 40;

    allEnemies.forEach(function(enemy){
        if (
            player.x <= enemy.x + enemy.width - collideOffsetMin &&
            player.x + enemy.width >= enemy.x &&
            // player.y + (value) makes it easier to move below enemy
            player.y + collideOffsetMin <= enemy.y + enemy.height &&
            // player.height - (value) makes it easier to move above enemy
            player.y + player.height - collideOffsetMax >= enemy.y
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

    // Start enemy at random X/Y coordinates
    this.y = enemyRows[Math.round(Math.random()*(enemyRows.length-1))];
    this.x = enemyCols[Math.round(Math.random()*(enemyCols.length-1))];

    // Set a random speed for the enemy
    var enemySpeed = Math.random() * (speedMax - speedMin) + speedMin;
        enemySpeed = Math.round(enemySpeed);

    // Add new enemy to allEnemies array
    allEnemies.push( new Enemy(this.x, this.y, enemySpeed) );

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
        console.log("Crash: " + "X: " + this.x + " - Y: " + this.y);
    }

    // Reset to starting coordinates
    this.x = 200;
    this.y = 400;

};

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