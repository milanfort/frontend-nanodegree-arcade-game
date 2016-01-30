/*
 * frogger.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*global log4javascript */

var frogger = (function () {
    'use strict';

    var init = function () {
        var logger;

        frogger.logging.init();
        frogger.logging.enable();
        frogger.logging.setLevel(log4javascript.Level.INFO);

        frogger.canvas.init();

        logger = frogger.logging.getLogger();
        frogger.enemy.init(logger);
        frogger.player.init(logger);

        logger.info("Starting Frogger");
    };

    return { init: init };
}());
