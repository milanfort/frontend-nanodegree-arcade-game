/*
 * frogger.rock.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.config.js frogger.entity.js */

/*global jQuery, frogger */

/**
 * This module defines and allows to create _rock_ objects.
 *
 * Rock objects represent static hindrances in the game. Each rock is placed
 * on a specific column and row, i.e. on a single field.
 * If a {@link module:frogger/player~player|player} moves to a field occupied
 * by a rock, the game is over and the score is reset.
 *
 * @module frogger/rock
 * @type {{create}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see module:frogger/entity~entity
 * @see module:frogger/util
 * @since 1.0.0
 */
frogger.rock = (function ($) {
    'use strict';

    var VERTICAL_ALIGNMENT = 25,
        collidesWith,
        proto,
        defaults,
        create;

    /**
     * Rock object.
     *
     * @typedef rock
     * @see module:frogger/rock~interface/rock
     * @see module:frogger/rock~fields/rock
     */

    /**
     * @inheritdoc
     * @memberof module:frogger/rock~interface/rock
     * @instance
     * @override
     */
    collidesWith = function (x, y) {
        return this.column === x && this.row === frogger.config.rowCount - y - 1;
    };

    /**
     * Public interface of a rock.
     *
     * @interface interface/rock
     * @extends module:frogger/entity~interface/entity
     */
    proto = {
        collidesWith: collidesWith
    };

    /**
     * Instance variables of each rock object with their default values.
     *
     * @name fields/rock
     * @type {{column: number, row: number, sprite: string}}
     * @extends module:frogger/entity~fields/entity
     * @property {number} column - The column where this rock is placed.
     * @property {number} row - The row where this rock is placed.
     * @property {string} sprite - Image representation of this rock.
     */
    defaults = {
        column: 0,
        row: 1,
        sprite: 'images/Rock.png'
    };

    /**
     * Creates a new rock.
     *
     * @example
     * frogger.rock.create({column: 2, row: 3})
     *
     * @constructs rock
     * @memberof module:frogger/rock
     *
     * @param {object} spec - Optional constructor parameters.
     * @param {number} [spec.column=0] - The column where this rock will be placed.
     * @param {number} [spec.row=1] - The row where this rock will be placed.
     * @param {string} [spec.sprite=Rock.png] - Image representation of this rock.
     * @return {module:frogger/rock~rock} A new rock.
     * @throws {Error} If spec.column or spec.row is present but invalid.
     */
    create = function (spec) {
        var parent, newRock;

        if (spec.column && (spec.column < 0 || spec.column > frogger.config.colCount - 1)) {
            throw new Error("Invalid column: " + spec.column);
        }

        if (spec.row && (spec.row < 1 || spec.row > frogger.config.rowCount - 3)) {
            throw new Error("Invalid row: " + spec.row);
        }

        parent = frogger.entity.create(spec);

        newRock = $.extend(Object.create(parent), proto, defaults, spec);
        newRock.x = newRock.column * frogger.config.fieldWidth;
        newRock.y = newRock.row * frogger.config.fieldHeight - VERTICAL_ALIGNMENT;

        return newRock;
    };

    return {
        create: create
    };
}(jQuery));
