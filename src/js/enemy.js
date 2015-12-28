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

/*global config, Entity */

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

    var VERTICAL_ALIGNMENT = 23;
    Entity.call(this, 'images/enemy-bug.png', 0, row * config.fieldHeight - VERTICAL_ALIGNMENT);
    this.row = row;
    this.speed = speed;
};

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function (dt) {
    'use strict';

    this.x += this.speed * dt;

    if (this.x > config.canvasWidth) {
        this.x = 0;
    }
};
