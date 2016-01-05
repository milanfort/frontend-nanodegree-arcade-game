/*
 * status.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/* requires: config.js logging.js */

/*global ctx, config, logger */

var gameStatus = (function () {
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
        ctx.clearRect(0, 0, config.canvasWidth, 48);
        ctx.font = "25px Arial";
        ctx.fillStyle = "orange";
        ctx.fillText("Level: " + currentLevel, 15, 30);
        ctx.fillStyle = "red";
        ctx.fillText("Score: " + getScore(), 200, 30);
        ctx.fillStyle = "orange";
        ctx.fillText("Gems: " + gemCount, 395, 30);
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
