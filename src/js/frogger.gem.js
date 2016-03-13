/*
 * frogger.gem.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.config.js frogger.util.js frogger.entity.js */

/*global jQuery, frogger */

/**
 * This module defines and allows to create _gem_ objects.
 *
 * Gem objects appear and disappear at various random positions on the game board.
 * A {@link module:frogger/player~player|player} can collect a gem to increase the game score.
 * To collect a gem, a player must step on the field where a gem is currently placed
 * while the gem is visible.
 *
 * Note that there is currently only one gem in each level of the game.
 *
 * @module frogger/gem
 * @type {{create}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see module:frogger/entity~entity
 * @see module:frogger/config~gemFrequency
 * @see module:frogger/util
 * @since 1.0.0
 */
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

    /**
     * Gem object.
     *
     * @typedef gem
     * @see module:frogger/gem~interface/gem
     * @see module:frogger/gem~fields/gem
     */

    /**
     * @inheritdoc
     * @memberof module:frogger/gem~interface/gem
     * @instance
     * @override
     */
    update = function () {
        var now = Date.now();
        if (now - this.lastTime > frogger.config.gemFrequency * 1000.0) {
            this.reset();
        }

        this.x = this.column * frogger.config.fieldWidth;
        this.y = this.row * frogger.config.fieldHeight - VERTICAL_ALIGNMENT;
    };

    /**
     * @inheritdoc
     * @memberof module:frogger/gem~interface/gem
     * @instance
     * @override
     */
    collidesWith = function (x, y) {
        return this.visible && this.column === x && this.row === frogger.config.rowCount - y - 1;
    };

    /**
     * Resets this gem by placing it at a random position on the game board.
     *
     * @memberof module:frogger/gem~interface/gem
     * @instance
     */
    reset = function () {
        var newColor = AVAILABLE_COLORS[frogger.util.randomInt(0, AVAILABLE_COLORS.length - 1)];

        this.sprite = 'images/gem-' + newColor + '.png';
        this.lastTime = Date.now();
        this.visible = !this.visible;
        this.column = frogger.util.randomInt(0, frogger.config.colCount - 1);
        this.row = frogger.util.randomInt(1, frogger.config.rowCount - 3);
    };

    /**
     * Hides this gem.
     *
     * @memberof module:frogger/gem~interface/gem
     * @instance
     */
    hide = function () {
        this.reset();
        this.visible = false;
    };

    /**
     * Public interface of a gem.
     *
     * @interface interface/gem
     * @extends module:frogger/entity~interface/entity
     */
    proto = {
        update: update,
        collidesWith: collidesWith,
        reset: reset,
        hide: hide
    };

    /**
     * Instance variables of each gem object with their default values.
     *
     * @name fields/gem
     * @type {{column: number, row: number, visible: boolean, lastTime: number, sprite: string}}
     * @extends module:frogger/entity~fields/entity
     * @property {number} column - The column where this gem is placed.
     * @property {number} row - The row where this rock is placed.
     * @property {boolean} visible - Indicates whether this gem is visible or not.
     * @property {number} lastTime - Indicates the last time when this gem was reset.
     * @property {string} sprite - Image representation of this gem.
     */
    defaults = {
        column: 0,
        row: 1,
        visible: false,
        lastTime: 0,
        sprite: 'images/gem-green.png'
    };

    /**
     * Creates a new gem.
     *
     * @example
     * frogger.gem.create({});
     *
     * @constructs gem
     * @memberof module:frogger/gem
     *
     * @param {object} spec - Optional constructor parameters.
     * @return {module:frogger/gem~gem} A new gem.
     */
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
