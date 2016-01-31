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

frogger.util = (function () {
    'use strict';

    var randomInt;

    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     *
     * @param min interval lower bound.
     * @param max interval upper bound.
     * @returns a random integer between min (inclusive) and max (inclusive).
     */
    randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        randomInt: randomInt
    };
}());
