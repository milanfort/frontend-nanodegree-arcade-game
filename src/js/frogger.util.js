/*
 * frogger.util.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js */

/*global frogger */

/**
 * This module provides various utility methods.
 *
 * @module frogger/util
 * @type {{randomInt}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */
frogger.util = (function () {
    'use strict';

    var randomInt;

    /**
     * Returns a random integer from interval between min (inclusive) and max (inclusive).
     *
     * @param {number} min - The interval's lower bound.
     * @param {number} max - The interval's upper bound.
     * @return {number} A random integer from interval between min (inclusive) and max (inclusive).
     */
    randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        randomInt: randomInt
    };
}());
