/*
 * frogger.entity.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js frogger.canvas.js */

/*global jQuery, frogger */

/** Common superclass for all entities in the game. */
frogger.entity = (function ($) {
    'use strict';

    var update,
        render,
        proto,
        defaults,
        create;

    /**
     * Update the position/state of this entity.
     * Any movement must be multiplied by the dt parameter
     * to ensure the game runs at the same speed for all computers.
     *
     * @param dt a time delta between ticks.
     */
    update = function (dt) {
        return dt; //trick to bypass jslint unused warning
    };

    /** Draw this entity on the screen. */
    render = function () {
        if (this.visible) {
            frogger.canvas.renderImage(this.x, this.y, this.sprite);
        }
    };

    proto = {
        update: update,
        render: render
    };

    defaults = {
        x: 0,
        y: 0,
        visible: true,
        sprite: 'images/default.png'
    };

    /**
     *
     * @param spec constructor parameters; see defaults for a complete
     * list of named parameters with their corresponding default values.
     */
    create = function (spec) {
        return $.extend(Object.create(proto), defaults, spec);
    };

    return {
        create: create
    };
}(jQuery));
