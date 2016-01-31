/*
 * gem.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/* requires: config.js logging.js util.js resources.js entity.js */

/*global jQuery, frogger */

/** Gem that the player can optionally collect. */
frogger.gem = (function ($) {
    'use strict';

    var VERTICAL_ALIGNMENT = 25,
        AVAILABLE_COLORS = ['blue', 'green', 'orange'],
        update,
        collidesWith,
        reset,
        hide,
        proto,
        defaults,
        create;

    update = function () {
        var now = Date.now();
        if (now - this.lastTime > frogger.config.gemFrequency * 1000.0) {
            this.reset();
        }

        this.x = this.column * frogger.config.fieldWidth;
        this.y = this.row * frogger.config.fieldHeight - VERTICAL_ALIGNMENT;
    };

    collidesWith = function (x, y) {
        return this.visible && this.column === x && this.row === frogger.config.rowCount - y - 1;
    };

    reset = function () {
        var newColor = AVAILABLE_COLORS[frogger.util.randomInt(0, AVAILABLE_COLORS.length - 1)];

        this.sprite = 'images/gem-' + newColor + '.png';
        this.lastTime = Date.now();
        this.visible =  !this.visible;
        this.column = frogger.util.randomInt(0, frogger.config.colCount - 1);
        this.row = frogger.util.randomInt(1, frogger.config.rowCount - 3);
    };

    hide = function () {
        this.reset();
        this.visible = false;
    };

    proto = {
        update: update,
        collidesWith: collidesWith,
        reset: reset,
        hide: hide
    };

    defaults = {
        column: 0,
        row: 1,
        visible: false,
        lastTime: 0,
        sprite: 'images/gem-green.png'
    };

    create = function (spec) {
        var parent, newGem;

        parent = frogger.entity.create(spec);

        newGem = $.extend(Object.create(parent), proto, defaults, spec);
        newGem.hide();

        return newGem;
    };

    return {
        create: create
    };
}(jQuery));
