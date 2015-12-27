
/* requires: config.js logging.js resources.js */

/**
 * Enemy the player must avoid.
 * Each enemy is placed on a certain row,
 * denoted by the row constructor parameter.
 * Each enemy moves at a certain speed,
 * denoted by the speed constructor parameter.
 *
 * @param row which row this enemy moves on.
 * @param speed how fast this enemy moves.
 * @constructor
 */
var Enemy = function (row, speed) {
    if (row < 1 || row > config.rowCount - 3) {
        throw new Error("Invalid row: " + row);
    }

    var VERTICAL_ALIGNMENT = 23;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
    this.speed = speed;

    this.x = 0;
    this.y = row * config.fieldHeight - VERTICAL_ALIGNMENT;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if (this.x > config.canvasWidth) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 0;
    this.posX = 2;
    this.posY = 0;
};

Player.prototype.update = function() {
    var VERTICAL_ALIGNMENT = 12;

    this.x = config.fieldWidth * this.posX;
    this.y = config.fieldHeight * (config.rowCount - this.posY - 1) - VERTICAL_ALIGNMENT;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    logger.debug("Moving %s", direction);

    switch (direction) {
        case 'up':
            if (this.posY < config.rowCount - 1) {
                this.posY += 1;
            }
            break;

        case 'down':
            if (this.posY > 0) {
                this.posY -= 1;
            }
            break;

        case 'left':
            if (this.posX > 0) {
                this.posX -= 1;
            }
            break;

        case 'right':
            if (this.posX < config.colCount - 1) {
                this.posX += 1;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var allEnemies = [];
var allEnemies = [new Enemy(1, 100), new Enemy(2, 150), new Enemy(3, 200)];
var player = new Player();
