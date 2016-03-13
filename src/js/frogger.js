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

/**
 * @namespace frogger
 * @description The only global variable in the entire application is __frogger__.
 */

/**
 * Main module responsible for initializing the application.
 *
 * @module frogger
 * @variation module
 * @type {{init}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @see File index.html where this module is used after the page was loaded.
 * @since 1.0.0
 */
var frogger = (function () {
    'use strict';

    /**
     * Initializes the entire application.
     *
     * @memberof module:frogger(module)
     */
    var init = function () {
        var logger;

        frogger.logging.init();
        frogger.logging.enable();
        frogger.logging.setLevel(log4javascript.Level.INFO);

        frogger.canvas.init();

        logger = frogger.logging.getLogger();
        frogger.enemy.init(logger);
        frogger.player.init(logger);
        frogger.engine.init(logger);

        logger.info("Starting Frogger");
    };

    return {
        init: init
    };
}());
