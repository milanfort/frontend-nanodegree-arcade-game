/*
 * frogger.canvas.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.resources.js */

/*global jQuery, frogger */

/**
 * This module provides a facade for working with the HTML5 canvas.
 *
 * @module frogger/canvas
 * @type {{init, getWidth, renderImage, renderStatus}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see {@link http://www.w3schools.com/html/html5_canvas.asp|HTML5 Canvas}
 * @since 1.0.0
 */
frogger.canvas = (function ($) {
    'use strict';

    var $canvas,
        context,
        init,
        getWidth,
        renderImage,
        renderStatus;

    /**
     * Initializes this module.
     *
     * _This method must be called before the first call
     * to any other method in this module._
     */
    init = function () {
        $canvas = $('#canvas').get(0);
        context = $canvas.getContext('2d');
    };

    /**
     * Returns the width of the canvas element in pixels.
     *
     * @returns {number} The width of the canvas element in pixels.
     */
    getWidth = function () {
        return $canvas.width;
    };

    /**
     * Draws the specified image on the canvas at the specified position.
     *
     * @param x - The x-coordinate, in pixels, where to draw the specified image.
     * @param y - The y-coordinate, in pixels, where to draw the specified image.
     * @param image - The image to draw at the specified position.
     */
    renderImage = function (x, y, image) {
        context.drawImage(frogger.resources.get(image), x, y);
    };

    /**
     * Displays the game status on the canvas.
     *
     * @param level {number} - The game level to display.
     * @param score {number} - The game score to display.
     * @param gems {number} - The number of collected gems to display.
     */
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
