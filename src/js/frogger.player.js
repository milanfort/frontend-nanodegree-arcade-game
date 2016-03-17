/*
 * frogger.player.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.config.js frogger.logging.js frogger.entity.js */

/*global jQuery, frogger */

/**
 * This module defines and allows to create _player_ objects.
 *
 * Player object represents the human-controlled entity in the game.
 * In each level, the player is initially placed at the bottom row
 * of the game board. The goal is to reach the watter, i.e. to get
 * to the top row of the board, while avoiding all
 * {@link module:frogger/enemy~enemy|enemies} and
 * {@link module:frogger/rock~rock|rocks}.
 *
 * @module frogger/player
 * @type {{init, create}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see module:frogger/entity~entity
 * @since 1.0.0
 */
frogger.player = (function ($) {
    'use strict';

    var VERTICAL_ALIGNMENT = 12,
        START_POS_X = 2,
        START_POS_Y = 0,
        logger,
        init,
        update,
        reset,
        handleInput,
        proto,
        defaults,
        create;

    /**
     * Player object.
     *
     * @typedef player
     * @see module:frogger/player~interface/player
     * @see module:frogger/player~fields/player
     */

    /**
     * Initializes this module.
     *
     * @memberof module:frogger/player
     *
     * @param {log4javascript.Logger} playerLogger - The logger to use for internal logging.
     */
    init = function (playerLogger) {
        logger = playerLogger;
        logger.debug("Player module initialized");
    };

    /**
     * Puts this player to its initial position on the game board.
     *
     * @memberof module:frogger/player~interface/player
     * @instance
     */
    reset = function () {
        this.posX = START_POS_X;
        this.posY = START_POS_Y;
    };

    /**
     * @inheritdoc
     * @memberof module:frogger/player~interface/player
     * @instance
     * @override
     */
    update = function () {
        this.x = frogger.config.fieldWidth * this.posX;
        this.y = frogger.config.fieldHeight * (frogger.config.rowCount - this.posY - 1)
            - VERTICAL_ALIGNMENT;
    };

    /**
     * Moves the player on the game board one position in the specified direction.
     * Has no effect if the move would place the player outside of the game board.
     *
     * @memberof module:frogger/player~interface/player
     * @instance
     *
     * @param {string} direction - Direction to move; one of up, down, left, or right.
     */
    handleInput = function (direction) {
        logger.debug("Moving %s", direction);

        switch (direction) {
        case 'up':
            if (this.posY < frogger.config.rowCount - 1) {
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
            if (this.posX < frogger.config.colCount - 1) {
                this.posX += 1;
            }
            break;
        }
    };

    /**
     * Public interface of a player.
     *
     * @interface interface/player
     * @extends module:frogger/entity~interface/entity
     */
    proto = {
        reset: reset,
        update: update,
        handleInput: handleInput
    };

    /**
     * Instance variables of each player object with their default values.
     *
     * @name fields/player
     * @type {{posX: number, posY: number, sprite: string}}
     * @extends module:frogger/entity~fields/entity
     * @property {number} posX - The x-coordinate of the logical position of this player.
     * @property {number} posY - The y-coordinate of the logical position of this player.
     * @property {string} sprite - Image representation of this player.
     */
    defaults = {
        posX: 0,
        posY: 1,
        sprite: 'images/char-boy.png'
    };

    /**
     * Creates a new player.
     *
     * @example
     * var player = frogger.player.create({
     *     sprite: 'images/char-horn-girl.png'
     * });
     *
     * @constructs player
     * @memberof module:frogger/player
     *
     * @param {object} spec - Optional constructor parameters.
     * @param {number} [spec.posX=0] - The x-coordinate of the logical position of this player.
     * @param {number} [spec.posY=1] - The y-coordinate of the logical position of this player.
     * @param {string} [spec.sprite=char-boy.png] - Image representation of this player.
     * @return {module:frogger/player~player} A new player.
     */
    create = function (spec) {
        var parent, newPlayer;

        parent = frogger.entity.create(spec);

        newPlayer = $.extend(Object.create(parent), proto, defaults, spec);
        newPlayer.reset();

        return newPlayer;
    };

    return {
        init: init,
        create: create
    };
}(jQuery));
