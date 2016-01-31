/*
 * frogger.enemy.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.config.js frogger.logging.js frogger.canvas.js frogger.entity.js */

/*global jQuery, frogger */

/**
 * Enemy the player must avoid.
 * Each enemy is placed on a certain row,
 * and moves at a certain speed.
 */
frogger.enemy = (function ($) {
    'use strict';

    var VERTICAL_ALIGNMENT = 23,
        HIT_THRESHOLD = 0.1,
        init,
        logger,
        update,
        collidesWith,
        proto,
        defaults,
        create;

    init = function (enemyLogger) {
        logger = enemyLogger;
        logger.debug("Enemy module initialized");
    };

    update = function (dt) {
        this.x += this.speed * dt;

        if (this.x > frogger.canvas.getWidth()) {
            this.x = -frogger.config.fieldWidth;
        }
    };

    collidesWith = function (x, y) {
        var collisionRow = frogger.config.rowCount - y - 1,
            approxColumn = Math.ceil((this.x / frogger.config.fieldWidth) * 10) / 10;

        logger.debug("(%d, %d) vs. [%f, %d]", x, collisionRow, approxColumn, this.row);

        if (this.row === collisionRow) {
            if (Math.floor(approxColumn + HIT_THRESHOLD) === x
                    || Math.ceil(approxColumn - HIT_THRESHOLD) === x) {
                logger.debug("Hit enemy in row %d", this.row);
                return true;
            }
        }

        return false;
    };

    proto = {
        update: update,
        collidesWith: collidesWith
    };

    /**
     * @param row which row this enemy moves on.
     * @param speed how fast this enemy moves.
     * @type {{row: number, speed: number, sprite: string}}
     */
    defaults = {
        row: 1,
        speed: 100,
        sprite: 'images/enemy-bug.png'
    };

    create = function (spec) {
        var parent, newEnemy;

        if (spec.row && (spec.row < 1 || spec.row > frogger.config.rowCount - 3)) {
            throw new Error("Invalid row: " + spec.row);
        }

        parent = frogger.entity.create(spec);

        newEnemy = $.extend(Object.create(parent), proto, defaults, spec);
        newEnemy.y = newEnemy.row * frogger.config.fieldHeight - VERTICAL_ALIGNMENT;

        return newEnemy;
    };

    return {
        init: init,

        create: create
    };
}(jQuery));
