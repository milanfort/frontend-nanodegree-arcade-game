/*
 * logging.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*global log4javascript */

var logging = (function () {
    'use strict';

    var rootLogger,
        init,
        enable,
        setLevel,
        getLogger;

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

    enable = function () {
        log4javascript.setEnabled(true);
    };

    setLevel = function (level) {
        rootLogger.setLevel(level);
    };

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
