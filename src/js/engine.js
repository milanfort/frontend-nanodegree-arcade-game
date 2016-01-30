
/* requires: config.js logging.js util.js resources.js entity.js enemy.js rock.js gem.js player.js status.js */

/* Engine.js
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

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var win = global.window,
        lastTime,
        allEntities = [],
        //TODO: put initilization code into separate method, call after page has loaded
        gem = frogger.gem.create({}),
        player = frogger.player.create({
            sprite: 'images/char-horn-girl.png'
        });

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
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
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkWaterReached();
        checkGemCollected();
        checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEntities.forEach(function(entity) {
            entity.update(dt);
        });
        gem.update();
        player.update();
    }

    function checkWaterReached() {
        if (player.posY == config.rowCount - 1) {
            gameStatus.increaseLevel();
            var rockCount = Math.min(Math.floor(gameStatus.getLevel() / 2), config.colCount - 1);
            var enemyCount = Math.min(Math.ceil(gameStatus.getLevel() / 2), (config.rowCount - 3) * 2);

            allEntities = [];
            var i;
            for (i = 1; i <= rockCount; i++) {
                logger.debug("Adding rock");
                allEntities.push(frogger.rock.create({
                    column: util.randomInt(0, config.colCount - 1),
                    row: util.randomInt(1, config.rowCount - 3)
                }));
            }

            for (i = 1; i <= enemyCount; i++) {
                logger.debug("Adding enemy");
                allEntities.push(frogger.enemy.create({
                    row: util.randomInt(1, config.rowCount - 3),
                    speed: util.randomInt(config.minEnemySpeed, config.maxEnemySpeed)
                }));
            }

            player.reset();
        }
    }

    function checkGemCollected() {
        if (gem.collidesWith(player.posX, player.posY)) {
            gem.hide();
            gameStatus.increaseGems();
        }
    }

    function checkCollisions() {
        var collision = false;

        allEntities.forEach(function(entity) {
            collision = collision || entity.collidesWith(player.posX, player.posY);
        });

        if (collision) {
            logger.info("Game over; score: %d", gameStatus.getScore());
            reset();
        }
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
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
            numRows = config.rowCount,
            numCols = config.colCount,
            row, col;

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
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        gem.render();

        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEntities.forEach(function(entity) {
            entity.render();
        });

        player.render();
        gameStatus.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        allEntities = [
            frogger.enemy.create({
                row: 2,
                speed: config.minEnemySpeed
            })
        ];
        gameStatus.init();
        gem.hide();
        player.reset();
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
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
    Resources.onReady(init);

    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

    //TODO: figure out a better place for logging initialization
    frogger.logging.init();
    frogger.logging.enable();
    frogger.logging.setLevel(log4javascript.Level.ERROR);
    global.logger = frogger.logging.getLogger();
})(this);
