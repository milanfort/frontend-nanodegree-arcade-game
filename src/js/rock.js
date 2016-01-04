/*
 * rock.js
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
 * Rock that the player must avoid.
 * Each rock is placed on a specific column and row.
 *
 * @param column which column this rock is placed on.
 * @param row which row this this rock is placed on.
 * @constructor
 */
var Rock = function (column, row) {
    'use strict';

    if (column < 0 || column > config.colCount - 1) {
        throw new Error("Invalid column: " + column);
    }

    if (row < 1 || row > config.rowCount - 3) {
        throw new Error("Invalid row: " + row);
    }

    Entity.call(
        this,
        'images/Rock.png',
        column * config.fieldWidth,
        row * config.fieldHeight - Rock.VERTICAL_ALIGNMENT
    );

    this.column = column;
    this.row = row;
};

Rock.VERTICAL_ALIGNMENT = 25;

Rock.prototype = Object.create(Entity.prototype);

Rock.prototype.constructor = Rock;

Rock.prototype.collidesWith = function (x, y) {
    'use strict';

    return this.column === x && this.row === config.rowCount - y - 1;
};
