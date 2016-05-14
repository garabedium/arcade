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

    // Move  enemy
    //this.x = this.x + (this.speed * dt);

    //ctx.drawImage(Resources.get(this.sprite), this)
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
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt){

};

Player.prototype = Object.create(Enemy.prototype);

Player.prototype.handleInput = function(key){

    var moveValue = 40;

    switch(key){
        case 'up':
            this.y -= moveValue;
            break;
        case 'down':
            this.y += moveValue;
            break;
        case 'left':
            this.x -= moveValue;
            break;
    }
    // if (key === 'up'){
    //     this.y -= 40;
    // } else if (key === 'down'){
    //     this.y += 40;
    // } else if (key === 'left'){
    //     this.x -= 40;
    // } else if (key === 'right'){
    //     this.x += 40;
    // }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create enemies loop
var allEnemies = [];

// rows: 60, 140, 220, 310

for (var i = 0; allEnemies.length <= 3; i++) {

    var randomY = Math.random() * (310 - 55) + 55; // generate a random Y coord between 55 and 310
        randomY = Math.round(randomY); // make sure it's a whole number
    var randomSpeed = Math.random() * (260 - 30) + 30;
        randomSpeed = Math.round(randomSpeed);

    allEnemies.push( new Enemy(5, randomY, randomSpeed) );

}

var player = new Player(200,400);


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