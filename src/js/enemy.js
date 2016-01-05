/*
 * enemy.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/* requires: config.js logging.js resources.js entity.js */

/*global logger, config, Entity */

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
    'use strict';

    if (row < 1 || row > config.rowCount - 3) {
        throw new Error("Invalid row: " + row);
    }

    Entity.call(
        this,
        'images/enemy-bug.png',
        0,
        row * config.fieldHeight - Enemy.VERTICAL_ALIGNMENT
    );
    this.row = row;
    this.speed = speed;
};

Enemy.VERTICAL_ALIGNMENT = 23;

Enemy.HIT_THRESHOLD = 0.1;

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function (dt) {
    'use strict';

    this.x += this.speed * dt;

    if (this.x > config.canvasWidth) {
        this.x = -config.fieldWidth;
    }
};

Enemy.prototype.collidesWith = function (x, y) {
    'use strict';

    var collisionRow = config.rowCount - y - 1,
        approxColumn = Math.ceil((this.x / config.fieldWidth) * 10) / 10;

    logger.debug("(%d, %d) vs. [%f, %d]", x, collisionRow, approxColumn, this.row);

    if (this.row === collisionRow) {
        if (Math.floor(approxColumn + Enemy.HIT_THRESHOLD) === x
                || Math.ceil(approxColumn - Enemy.HIT_THRESHOLD) === x) {
            logger.debug("Hit enemy in row %d", this.row);
            return true;
        }
    }

    return false;
};
