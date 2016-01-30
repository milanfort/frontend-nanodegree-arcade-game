/*
 * canvas.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/* requires: frogger.js resources.js */

/*global jQuery, frogger, Resources */

frogger.canvas = (function ($) {
    'use strict';

    var $canvas,
        context,
        init,
        getWidth,
        renderImage,
        renderStatus;

    init = function () {
        $canvas = $('#canvas').get(0);
        context = $canvas.getContext('2d');
    };

    getWidth = function () {
        return $canvas.width;
    };

    renderImage = function (x, y, image) {
        context.drawImage(Resources.get(image), x, y);
    };

    renderStatus = function (level, score, gems) {
        context.clearRect(0, 0, getWidth(), 48);
        context.font = "25px Arial";
        context.fillStyle = "orange";
        context.fillText("Level: " + level, 15, 30);
        context.fillStyle = "red";
        context.fillText("Score: " + score, 200, 30);
        context.fillStyle = "orange";
        context.fillText("Gems: " + gems, 395, 30);
    };

    return {
        init: init,
        getWidth: getWidth,
        renderImage: renderImage,
        renderStatus: renderStatus
    };
}(jQuery));
