/*
 * frogger.config.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js */

/*global frogger */

/**
 * This module provides global configuration values used
 * by the entire application. These values are only read
 * during runtime, never modified.
 *
 * @module frogger/config
 * @type {Object}
 * @readonly
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */
frogger.config = Object.freeze({

    /**
     * Number of rows of the game board.
     *
     * @constant {number}
     * @default
     */
    rowCount: 6,

    /**
     * Number of columns of the game board.
     *
     * @constant {number}
     * @default
     */
    colCount: 5,

    /**
     * Visible height of game field in pixels.
     *
     * @constant {number}
     * @default
     */
    fieldHeight: 83,

    /**
     * Visible width of game field in pixels.
     *
     * @constant {number}
     * @default
     */
    fieldWidth: 101,

    /**
     * Number of seconds indicating how long a gem appears.
     *
     * @constant {number}
     * @default
     */
    gemFrequency: 5,

    /**
     * Minimum speed at which enemy bugs are moving.
     *
     * @constant {number}
     * @default
     */
    minEnemySpeed: 50,

    /**
     * Maximum speed at which enemy bugs are moving.
     *
     * @constant {number}
     * @default
     */
    maxEnemySpeed: 300
});
