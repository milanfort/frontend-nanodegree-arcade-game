/*
 * frogger.logging.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js */

/*global log4javascript, frogger */

/**
 * This module allows the application components to log into browser console.
 *
 * @module frogger/logging
 * @type {{init, enable, setLevel, getLogger}}
 *
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */
frogger.logging = (function () {
    'use strict';

    var rootLogger,
        init,
        enable,
        setLevel,
        getLogger;

    /**
     * Initializes this logging module.
     *
     * _This method must be called before the first call to
     * {@link module:frogger/logging~getLogger} method._
     * Other methods in this module have no effect if called before this method.
     */
    init = function () {
        log4javascript.setEnabled(false);
        rootLogger = log4javascript.getRootLogger();
        rootLogger.removeAllAppenders();
        rootLogger.setLevel(log4javascript.Level.TRACE);

        var appender = new log4javascript.BrowserConsoleAppender();
        appender.setThreshold(log4javascript.Level.TRACE);
        appender.setLayout(new log4javascript.NullLayout());
        rootLogger.addAppender(appender);
    };

    /**
     * Enables logging globally for the entire application.
     *
     * By default, logging is disabled. This method must be called to explicitly
     * enable it. Should be only used during development/debugging and not called
     * if the code is supposed to be deployed in production.
     */
    enable = function () {
        log4javascript.setEnabled(true);
    };

    /**
     * Sets the logging level for the entire application.
     *
     * @param {log4javascript.Level} level - The logging level that should
     * be set for the entire application.
     */
    setLevel = function (level) {
        rootLogger.setLevel(level);
    };

    /**
     * Returns the main logger used in the entire application.
     *
     * @return {log4javascript.Logger} The main logger used in the entire application.
     */
    getLogger = function () {
        return rootLogger;
    };

    return {
        init: init,
        enable: enable,
        setLevel: setLevel,
        getLogger: getLogger
    };
}());
