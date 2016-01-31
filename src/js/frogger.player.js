/*
 * frogger.player.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.config.js frogger.logging.js frogger.entity.js */

/*global jQuery, frogger */

/**
 * Player in the game. The goal for the player
 * is to get to the other side of the board.
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

    init = function (playerLogger) {
        logger = playerLogger;
        logger.debug("Player module initialized");
    };

    reset = function () {
        this.posX = START_POS_X;
        this.posY = START_POS_Y;
    };

    update = function () {
        this.x = frogger.config.fieldWidth * this.posX;
        this.y = frogger.config.fieldHeight * (frogger.config.rowCount - this.posY - 1)
            - VERTICAL_ALIGNMENT;
    };

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

    proto = {
        reset: reset,
        update: update,
        handleInput: handleInput
    };

    defaults = {
        posX: 0,
        posY: 1,
        sprite: 'images/char-boy.png'
    };

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
