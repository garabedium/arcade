var score = 0,
    scoreBoard = 'div',
    scoreValue = 10;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // X/Y location variables
    this.x = x;
    this.y = y;
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
    if (this.x > 500){ // If enemy is off-canvas, start over at -80
        this.x = -80;
        this.y = enemyRows[Math.round(Math.random()*(enemyRows.length-1))];
        //this.y = 220;
        this.speed = Math.random() * (240 - 60) + 60;
    } else {
       this.x = this.x += (this.speed * dt);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset game if player hits bug
// Check if player x-position is before / after bug x-pos, and on same y-pos.
function checkCollisions () {
    allEnemies.forEach(function(enemy){
        if (
            // player.x <= enemy.x - 10 &&
            // player.y <= enemy.y - 10
            player.x + 10 <= enemy.x &&
            player.y <= enemy.y + 20

        ){
            //console.log("Crash behind: " + player.x + " - " + player.y);
            console.log("Crash front: " + player.x + " - " + player.y);
            player.reset();
            // player.x = 200;
            // player.y = 400;

        }
        //  else if (
        //     player.x >= enemy.x + 10 &&
        //     player.y + 80 <= enemy.y
        // ) {
        //     console.log("Crash front: " + player.x + " - " + player.y);
        //     player.x = 200;
        //     player.y = 400;
        // }
    });
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    // this.score = 0; // keep player score
    // this.scoreValue = 10;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt){

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

    // Set player boundaries & score
    if (this.y < 40){
        player.reset();
        //this.score += this.scoreValue;
        score += scoreValue;
        alert("Nice hoppin' chappie! Your score: " + score + "!");
    } else if (this.y >= 400) {
        this.y = 400;
    }
    if (this.x <= 0){
        this.x = 0;
    } else if (this.x >= 400){
        this.x = 400;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Enemy array
var allEnemies = [];

// Confine enemy movement to these Y coordinates / rows
var enemyRows = [60,140,220,300];

// Create 4 enemies
for (var i = 0; allEnemies.length <= 3; i++) {

    var enemyRowRandom = enemyRows[Math.round(Math.random()*(enemyRows.length-1))];

    // Start enemy on a random Y whole coordinate betw: 55 - 310
   this.y = enemyRowRandom;

    // Set a random speed for the enemy betw: 60 - 240
    var enemySpeed = Math.random() * (240 - 60) + 60;
        enemySpeed = Math.round(enemySpeed);

    // Add new enemy to allEnemies array
    allEnemies.push( new Enemy(-150, this.y, enemySpeed) );

}

var player = new Player(200,400);

// Player reset function
Player.prototype.reset = function(){
    player.x = 200;
    player.y = 400;
}

//scoreBoard.html("Test");

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