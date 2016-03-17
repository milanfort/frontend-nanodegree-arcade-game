/*
 * frogger.entity.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.canvas.js */

/*global jQuery, frogger */

/**
 * This module defines and allows to create _entity_ objects.
 *
 * All objects that represent different entities in the game
 * such as enemies, rocks, gems, and players inherit from these
 * entity objects.
 *
 * @module frogger/entity
 * @type {{create}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see {@link http://javascript.crockford.com/prototypal.html|Prototypal Inheritance in JavaScript}
 * @see module:frogger/enemy~enemy
 * @see module:frogger/rock~rock
 * @see module:frogger/player~player
 * @see module:frogger/gem~gem
 * @since 1.0.0
 */
frogger.entity = (function ($) {
    'use strict';

    var collidesWith,
        update,
        render,
        proto,
        defaults,
        create;

    /**
     * Entity object.
     *
     * @typedef entity
     * @see module:frogger/entity~interface/entity
     * @see module:frogger/entity~fields/entity
     */

    /**
     * Returns _true_ iff this entity occupies the same logical position
     * on the game board as specified by the input parameters.
     *
     * @memberof module:frogger/entity~interface/entity
     * @instance
     *
     * @param {number} x - The x-coordinate of the logical board position.
     * @param {number} y - The y-coordinate of the logical board position.
     * @return {boolean} _true_ iff this entity occupies the same logical
     * position on the game board as specified by the input parameters.
     */
    collidesWith = function (x, y) {
        return false;
    };

    /**
     * Update the position/state of this entity.
     * Any movement must be multiplied by the _dt_ parameter
     * to ensure the game runs at the same speed for all computers.
     *
     * @memberof module:frogger/entity~interface/entity
     * @instance
     *
     * @param {number} dt - A time delta between ticks.
     */
    update = function (dt) {
        return dt; //trick to bypass jslint unused warning
    };

    /**
     * Draw this entity on the screen.
     *
     * @memberof module:frogger/entity~interface/entity
     * @instance
     */
    render = function () {
        if (this.visible) {
            frogger.canvas.renderImage(this.x, this.y, this.sprite);
        }
    };

    /**
     * Public interface of an entity.
     *
     * @interface interface/entity
     */
    proto = {
        collidesWith: collidesWith,
        update: update,
        render: render
    };

    /**
     * Instance variables of each entity object with their default values.
     *
     * @name fields/entity
     * @type {{x: number, y: number, visible: boolean, sprite: string}}
     * @property {number} x - The x-coordinate, in pixels, of the position of this entity.
     * @property {number} y - The y-coordinate, in pixels, of the position of this entity.
     * @property {boolean} visible - Indicates whether this entity is visible or not.
     * @property {string} sprite - Image representation of this entity.
     */
    defaults = {
        x: 0,
        y: 0,
        visible: true,
        sprite: 'images/default.png'
    };

    /**
     * Creates a new entity.
     *
     * @constructs entity
     * @memberof module:frogger/entity
     *
     * @param {object} spec - Optional constructor parameters.
     * @param {number} [spec.x=0] - The x-coordinate, in pixels, of the position of this entity.
     * @param {number} [spec.y=0] - The y-coordinate, in pixels, of the position of this entity.
     * @param {boolean} [spec.visible=true] - Indicates whether this entity is visible or not.
     * @param {string} [spec.sprite] - Image representation of this entity.
     * @return {module:frogger/entity~entity} A new entity.
     */
    create = function (spec) {
        return $.extend(Object.create(proto), defaults, spec);
    };

    return {
        create: create
    };
}(jQuery));
