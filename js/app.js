// Global function generating a number
var numGen = function(base, range){
    return base + Math.floor(Math.random()*range);
}
// Circular array
var newY = [1, 2, 0];
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // initial location of the objects
    this.x = -600 + 300 * numGen(0, 3);
    this.y = 60 + 83 * numGen(0, 3);
    this.velocity = 20 + 30 * numGen(0, 10);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x =this.x + this.velocity* dt;
    if(this.x >= 505) {
        this.x = -200;
        var temp = (this.y - 60)/83;
        this.y = 60 + 83*newY[temp];
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    // load character image
    this.sprite = 'images/char-boy.png';
    // initial locations
    this.x = 101 * 2;
    this.y = 321 + 83 * 1;
}
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function(key){
    if(key === 'left'){
        if(this.x > 0)
            this.x = this.x - 101;
    } else if(key === 'right'){
        if(this.x < 404)
            this.x += 101;
    } else if(key === 'up'){
        if(this.y > 0)
            this.y -= 83;
    } else if(key === 'down'){
        if(this.y < 404)
            this.y += 83;
    }
}
Player.prototype.reset = function(){
    this.x = 101 * 2;
    this.y = 321 + 83 * 1;
}
Player.prototype.update = function(){
    // gameStatus variable to denote current state
    var gameStatus = 0;
    var rowY = (this.y - 72)/83;
    for(var i = 0; i < allEnemies.length; i++) {
        var enemyY = (allEnemies[i].y - 60)/83;
        if(rowY === enemyY){
            if(this.x > allEnemies[i].x - 50 && this.x < allEnemies[i].x + 80){
                gameStatus = -1;
            }
        }
    }
    if(rowY < 0)
        gameStatus = 1;
    return gameStatus;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var num = numGen(5, 3);
for(var i = 0; i < num; i++){
    var enemyObj = new Enemy();
    // keep object seperate from the baseline
    if(enemyObj.x === 0){
        for(var j=0; j < i; j++){
            if(enemyObj.y === allEnemies[j].y){
                enemyObj.x = enemyObj.x - 100;
            }
        }
    }
    allEnemies.push(enemyObj);
}
var player = new Player();

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
