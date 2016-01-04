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

/* requires: config.js logging.js resources.js entity.js */

/*global config, Entity */

/**
 * Gem that the player can optionally collect.
 *
 * @constructor
 */
var Gem = function () {
    'use strict';

    Entity.call(this, 'images/gem-green.png', 0, 0);
    this.reset();
    this.visible = false;
};

Gem.VERTICAL_ALIGNMENT = 25;

Gem.AVAILABLE_COLORS = ['blue', 'green', 'orange'];

/** Returns a random integer between min (inclusive) and max (inclusive). */
//TODO: put into separate util module
Gem.randomInt = function (min, max) {
    'use strict';

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Gem.prototype = Object.create(Entity.prototype);

Gem.prototype.constructor = Gem;

Gem.prototype.reset = function () {
    'use strict';

    var newColor = Gem.AVAILABLE_COLORS[Gem.randomInt(0, Gem.AVAILABLE_COLORS.length - 1)];

    this.sprite = 'images/gem-' + newColor + '.png';
    this.lastTime = Date.now();
    this.visible =  !this.visible;
    this.column = Gem.randomInt(0, config.colCount - 1);
    this.row = Gem.randomInt(1, config.rowCount - 3);
};

Gem.prototype.update = function () {
    'use strict';

    var now = Date.now();
    if (now - this.lastTime > config.gemFrequency * 1000.0) {
        this.reset();
    }

    this.x = this.column * config.fieldWidth;
    this.y = this.row * config.fieldHeight - Gem.VERTICAL_ALIGNMENT;
};

Gem.prototype.isVisible = function () {
    'use strict';

    return this.visible;
};

Gem.prototype.collidesWith = function (x, y) {
    'use strict';

    return this.isVisible() && this.column === x && this.row === config.rowCount - y - 1;
};
