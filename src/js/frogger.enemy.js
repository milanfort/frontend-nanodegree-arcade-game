/*
 * frogger.enemy.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.config.js frogger.logging.js frogger.canvas.js frogger.entity.js */

/*global jQuery, frogger */

/**
 * This module defines and allows to create _enemy_ objects.
 *
 * Enemy objects represent dynamic hindrances in the game.
 * Each enemy object is placed on a particular row of the game board,
 * and moves at a defined constant speed along this row, from left to right.
 * If a {@link module:frogger/player~player|player} moves to a field occupied
 * by an enemy, the game is over and the score is reset.
 *
 * @module frogger/enemy
 * @type {{init, create}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see module:frogger/entity~entity
 * @since 1.0.0
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

    /**
     * Enemy object.
     *
     * @typedef enemy
     * @see module:frogger/enemy~interface/enemy
     * @see module:frogger/enemy~fields/enemy
     */

    /**
     * Initializes this module.
     *
     * @memberof module:frogger/enemy
     *
     * @param {log4javascript.Logger} enemyLogger - The logger to use for internal logging.
     */
    init = function (enemyLogger) {
        logger = enemyLogger;
        logger.debug("Enemy module initialized");
    };

    /**
     * @inheritdoc
     * @memberof module:frogger/enemy~interface/enemy
     * @instance
     * @override
     */
    update = function (dt) {
        this.x += this.speed * dt;

        if (this.x > frogger.canvas.getWidth()) {
            this.x = -frogger.config.fieldWidth;
        }
    };

    /**
     * @inheritdoc
     * @memberof module:frogger/enemy~interface/enemy
     * @instance
     * @override
     */
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

    /**
     * Public interface of an enemy.
     *
     * @interface interface/enemy
     * @extends module:frogger/entity~interface/entity
     */
    proto = {
        update: update,
        collidesWith: collidesWith
    };

    /**
     * Instance variables of each enemy object with their default values.
     *
     * @name fields/enemy
     * @type {{row: number, speed: number, sprite: string}}
     * @extends module:frogger/entity~fields/entity
     * @property {number} row - The row where this enemy is placed.
     * @property {number} speed - The speed at which this enemy moves.
     * @property {string} sprite - Image representation of this enemy.
     */
    defaults = {
        row: 1,
        speed: 100,
        sprite: 'images/enemy-bug.png'
    };

    /**
     * Creates a new enemy.
     *
     * @example
     * var enemy = frogger.enemy.create({
     *     row: 2,
     *     speed: frogger.config.minEnemySpeed
     * });
     *
     * @constructs enemy
     * @memberof module:frogger/enemy
     *
     * @param {object} spec - Optional constructor parameters.
     * @param {number} [spec.row=1] - The row where this enemy will be placed.
     * @param {number} [spec.speed=100] - The speed at which this enemy will move.
     * @param {string} [spec.sprite=enemy-bug.png] - Image representation of this enemy.
     * @return {module:frogger/enemy~enemy} A new enemy.
     * @throws {Error} If spec.row is present but invalid.
     */
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
