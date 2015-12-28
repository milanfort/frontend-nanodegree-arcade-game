/*
 * entity.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/* requires: config.js logging.js resources.js */

/*global ctx, Resources */

/**
 * Common superclass for all entities in the game.
 *
 * @constructor
 */
var Entity = function (sprite, x, y) {
    'use strict';

    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

/**
 * Update the position/state of this entity.
 * Any movement must be multiplied by the dt parameter
 * to ensure the game runs at the same speed for all computers.
 *
 * @param dt a time delta between ticks.
 */
Entity.prototype.update = function (dt) {
    'use strict';

    return dt; //trick to bypass jslint unused warning
};

/**
 * Draw this entity on the screen.
 */
Entity.prototype.render = function () {
    'use strict';

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
