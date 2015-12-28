
/* requires: config.js logging.js resources.js */

/**
 * Common superclass for all entities in the game.
 *
 * @constructor
 */
var Entity = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

/**
 * Update the position/state of this entity.
 * Any movement must be multiplied by the dt parameter
 * to ensure the game runs at the same speed for all computers.
 *
 * @param dt a time delta between ticks.
 */
Entity.prototype.update = function(dt) {};

/**
 * Draw this entity on the screen.
 */
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
    Entity.call(this, 'images/enemy-bug.png', 0, row * config.fieldHeight - VERTICAL_ALIGNMENT);
    this.row = row;
    this.speed = speed;
};

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > config.canvasWidth) {
        this.x = 0;
    }
};

/**
 * Player in the game. The goal for the player
 * is to get to the other side of the board.
 *
 * @constructor
 */
var Player = function() {
    Entity.call(this, 'images/char-boy.png', 0, 0);
    this.posX = 2;
    this.posY = 0;
};

Player.prototype = Object.create(Entity.prototype);

Player.prototype.constructor = Player;

Player.prototype.update = function() {
    var VERTICAL_ALIGNMENT = 12;

    this.x = config.fieldWidth * this.posX;
    this.y = config.fieldHeight * (config.rowCount - this.posY - 1) - VERTICAL_ALIGNMENT;
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
