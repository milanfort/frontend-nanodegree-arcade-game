/*
 * config.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/* requires: frogger.js */

/*global frogger */

frogger.config = Object.freeze({

    rowCount: 6,

    colCount: 5,

    fieldHeight: 83,

    fieldWidth: 101,

    gemFrequency: 5,

    minEnemySpeed: 50,

    maxEnemySpeed: 300
});
