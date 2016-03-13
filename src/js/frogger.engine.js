/*
 * frogger.engine.js
 *
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/*require
 frogger.js
 frogger.config.js
 frogger.logging.js
 frogger.resources.js
 frogger.util.js
 frogger.canvas.js
 frogger.status.js
 frogger.enemy.js
 frogger.rock.js
 frogger.gem.js
 frogger.player.js
 */

/*global jQuery, frogger */

/**
 * This module implements the game functionality.
 *
 * Calling the method {@link module:frogger/engine~init|init()} starts the game.
 *
 * @module frogger/engine
 * @type {{init}}
 *
 * @author Udacity, Inc.
 * @author Milan Fort (http://www.milanfort.com/)
 * @version 1.0
 * @since 1.0.0
 */
frogger.engine = (function ($) {
    'use strict';

    var logger,
        lastTime,
        gem,
        player,
        obstacles,
        start,
        reset,
        main,
        update,
        updateEntities,
        checkWaterReached,
        checkGemCollected,
        checkCollisions,
        render,
        renderEntities,
        init;

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    start = function () {
        reset();
        lastTime = Date.now();
        main();
    };

    reset = function () {
        obstacles = [
            frogger.enemy.create({
                row: 2,
                speed: frogger.config.minEnemySpeed
            })
        ];
        frogger.status.init();
        gem.hide();
        player.reset();
    };

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    main = function () {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        window.requestAnimationFrame(main);
    };

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    update = function (dt) {
        updateEntities(dt);
        checkWaterReached();
        checkGemCollected();
        checkCollisions();
    };

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    updateEntities = function (dt) {
        obstacles.forEach(function (entity) {
            entity.update(dt);
        });
        gem.update();
        player.update();
    };

    checkWaterReached = function () {
        var rockCount, enemyCount, i;

        if (player.posY === frogger.config.rowCount - 1) {
            frogger.status.increaseLevel();

            rockCount = Math.min(
                Math.floor(frogger.status.getLevel() / 2),
                frogger.config.colCount - 1
            );

            enemyCount = Math.min(
                Math.ceil(frogger.status.getLevel() / 2),
                (frogger.config.rowCount - 3) * 2
            );

            obstacles = [];
            for (i = 1; i <= rockCount; i++) {
                logger.debug("Adding rock");
                obstacles.push(frogger.rock.create({
                    column: frogger.util.randomInt(0, frogger.config.colCount - 1),
                    row: frogger.util.randomInt(1, frogger.config.rowCount - 3)
                }));
            }

            for (i = 1; i <= enemyCount; i++) {
                logger.debug("Adding enemy");
                obstacles.push(frogger.enemy.create({
                    row: frogger.util.randomInt(1, frogger.config.rowCount - 3),
                    speed: frogger.util.randomInt(
                        frogger.config.minEnemySpeed,
                        frogger.config.maxEnemySpeed
                    )
                }));
            }

            player.reset();
        }
    };

    checkGemCollected = function () {
        if (gem.collidesWith(player.posX, player.posY)) {
            gem.hide();
            frogger.status.increaseGems();
        }
    };

    checkCollisions = function () {
        var collision = false;

        obstacles.forEach(function (entity) {
            collision = collision || entity.collidesWith(player.posX, player.posY);
        });

        if (collision) {
            logger.info("Game Over: Your score is %d", frogger.status.getScore());
            reset();
        }
    };

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    render = function () {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = frogger.config.rowCount,
            numCols = frogger.config.colCount,
            row,
            col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                frogger.canvas.renderImage(col * 101, row * 83, rowImages[row]);
            }
        }

        renderEntities();
    };

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    renderEntities = function renderEntities() {
        gem.render();

        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        obstacles.forEach(function (entity) {
            entity.render();
        });

        player.render();
        frogger.status.render();
    };

    /**
     * Initializes this module and starts the game.
     *
     * @param {log4javascript.Logger} engineLogger - The logger to use for internal logging.
     */
    init = function (engineLogger) {
        logger = engineLogger;

        gem = frogger.gem.create({});

        player = frogger.player.create({
            sprite: 'images/char-horn-girl.png'
        });

        $(document).keyup(function (e) {
            var allowedKeys = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };

            player.handleInput(allowedKeys[e.keyCode]);
        });

        /* Go ahead and load all of the images we know we're going to need to
         * draw our game level. Then set start as the callback method, so that when
         * all of these images are properly loaded our game will start.
         */
        frogger.resources.load([
            'images/stone-block.png',
            'images/water-block.png',
            'images/grass-block.png',
            'images/enemy-bug.png',
            'images/char-boy.png',
            'images/char-horn-girl.png',
            'images/Rock.png',
            'images/default.png',
            'images/gem-blue.png',
            'images/gem-green.png',
            'images/gem-orange.png'
        ]);
        frogger.resources.onReady(start);

        logger.debug("Engine module initialized");
    };

    return {
        init: init
    };
}(jQuery));
