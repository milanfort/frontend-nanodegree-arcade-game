/*
 * player.js
 *
 * Created by Milan Fort <http://www.milanfort.com/>.
 */

/*jslint
 browser: true, continue: true, indent  : 4,
 maxerr : 50,   maxlen  : 100,  plusplus: true,
 regexp : true, todo    : true
 */

/* requires: config.js logging.js resources.js entity.js */

/*global logger, config, Entity */

/**
 * Player in the game. The goal for the player
 * is to get to the other side of the board.
 *
 * @constructor
 */
var Player = function () {
    'use strict';

    Entity.call(this, 'images/char-boy.png', 0, 0);
    this.reset();
};

Player.VERTICAL_ALIGNMENT = 12;

Player.START_POS_X = 2;

Player.START_POS_Y = 0;

Player.prototype = Object.create(Entity.prototype);

Player.prototype.constructor = Player;

Player.prototype.reset = function () {
    'use strict';

    this.posX = Player.START_POS_X;
    this.posY = Player.START_POS_Y;
};

Player.prototype.update = function () {
    'use strict';

    this.x = config.fieldWidth * this.posX;
    this.y = config.fieldHeight * (config.rowCount - this.posY - 1) - Player.VERTICAL_ALIGNMENT;
};

Player.prototype.handleInput = function (direction) {
    'use strict';

    logger.debug("Moving %s", direction);

    switch (direction) {
    case 'up':
        if (this.posY < config.rowCount - 1) {
            this.posY += 1;
        }
        break;

    case 'down':
        if (this.posY > 0) {
            this.posY -= 1;
        }
        break;

    case 'left':
        if (this.posX > 0) {
            this.posX -= 1;
        }
        break;

    case 'right':
        if (this.posX < config.colCount - 1) {
            this.posX += 1;
        }
        break;
    }
};
