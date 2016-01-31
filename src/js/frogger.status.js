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

    init = function () {
        currentLevel = 1;
        gemCount = 0;
    };

    getLevel = function () {
        return currentLevel;
    };

    getScore = function () {
        return (currentLevel - 1) * 10 + gemCount;
    };

    increaseLevel = function () {
        currentLevel += 1;
    };

    increaseGems = function () {
        gemCount += 1;
    };

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
