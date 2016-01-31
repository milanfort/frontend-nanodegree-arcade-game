/*
 * rock.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/* requires: config.js logging.js resources.js entity.js */

/*global jQuery, frogger */

/**
 * Rock that the player must avoid.
 * Each rock is placed on a specific column and row.
 */
frogger.rock = (function ($) {
    'use strict';

    var VERTICAL_ALIGNMENT = 25,
        collidesWith,
        proto,
        defaults,
        create;

    collidesWith = function (x, y) {
        return this.column === x && this.row === frogger.config.rowCount - y - 1;
    };

    proto = {
        collidesWith: collidesWith
    };

    /**
     * @param column which column this rock is placed on.
     * @param row which row this this rock is placed on.
     * @type {{column: number, row: number, sprite: string}}
     */
    defaults = {
        column: 0,
        row: 1,
        sprite: 'images/Rock.png'
    };

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
