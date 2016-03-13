/*
 * frogger.status.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.canvas.js */

/*global frogger */

/**
 * This module encapsulates the status of the game.
 * It keeps track of the current level, score, and the number of collected gems.
 *
 * @module frogger/status
 * @type {{init, getLevel, getScore, increaseLevel, increaseGems, render}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */
frogger.status = (function () {
    'use strict';

    var currentLevel,
        gemCount,
        init,
        getLevel,
        getScore,
        increaseLevel,
        increaseGems,
        render;

    /**
     * Initializes this module.
     *
     * _This method must be called before the first call
     * to any other method in this module._
     */
    init = function () {
        currentLevel = 1;
        gemCount = 0;
    };

    /**
     * Returns the current game level.
     *
     * @returns {number} The current game level.
     */
    getLevel = function () {
        return currentLevel;
    };

    /**
     * Returns the current game score.
     *
     * @returns {number} The current game score.
     */
    getScore = function () {
        return (currentLevel - 1) * 10 + gemCount;
    };

    /** Increases the current level by one. */
    increaseLevel = function () {
        currentLevel += 1;
    };

    /** Increases the number of collected gems by one. */
    increaseGems = function () {
        gemCount += 1;
    };

    /** Displays the game status on canvas. */
    render = function () {
        frogger.canvas.renderStatus(currentLevel, getScore(), gemCount);
    };

    return {
        init: init,
        getLevel: getLevel,
        getScore: getScore,
        increaseLevel: increaseLevel,
        increaseGems: increaseGems,
        render: render
    };
}());
