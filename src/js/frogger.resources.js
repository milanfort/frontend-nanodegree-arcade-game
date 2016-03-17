/*
 * frogger.resources.js
 *
 * Copyright 2016 Milan Fort (http://www.milanfort.com/). All rights reserved.
 *
 * Portions copyright 2014 Udacity, Inc.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require frogger.js */

/*global frogger */

/**
 * This module provides helper functions for working with image resources.
 *
 * It implements a simple caching layer so it will reuse cached images
 * if we attempt to load the same image multiple times.
 *
 * @module frogger/resources
 * @type {{load, get, onReady}}
 *
 * @author Udacity, Inc.
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */
frogger.resources = (function () {
    'use strict';

    var resourceCache = {},
        readyCallbacks = [],
        loadResource,
        isReady,
        load,
        get,
        onReady;

    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    loadResource = function (url) {
        if (!resourceCache[url]) {

            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function () {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if (isReady()) {
                    readyCallbacks.forEach(function (func) {
                        func();
                    });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the images src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    };

    /* This function determines if all of the images that have been requested
     * for loading have in fact been completed loaded.
     */
    isReady = function () {
        var ready = true,
            k;

        for (k in resourceCache) {
            if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                ready = false;
                break;
            }
        }

        return ready;
    };

    /* Public API Methods */

    /**
     * Loads the specified image resource(s).
     *
     * It accepts an array of strings pointing to image files or a string for a single image.
     *
     * @param urlOrArr {string|string[]} - array of strings of image resource paths
     * or a single string image resource path.
     */
    load = function (urlOrArr) {
        if (urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function (url) {
                loadResource(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            loadResource(urlOrArr);
        }
    };

    /**
     * Returns the image object corresponding to the specified resource path
     * iff the image was previously loaded; _undefined_ otherwise.
     *
     * @param {string} url - The string resource path for the image to load.
     * @return {Image} The image object corresponding to the specified resource path
     * iff the image was previously loaded; _undefined_ otherwise.
     */
    get = function (url) {
        return resourceCache[url];
    };

    /**
     * Adds the specified function to the callback stack that is called
     * when all requested images are properly loaded.
     *
     * @param {function} func - function to add to the callback stack.
     */
    onReady = function (func) {
        readyCallbacks.push(func);
    };

    return {
        load: load,
        get: get,
        onReady: onReady
    };
}());
