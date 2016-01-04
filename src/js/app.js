
/* requires: config.js logging.js resources.js entity.js enemy.js rock.js gem.js player.js */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//var allEntities = [];
//TODO: handle gems separatelly
var allEntities = [new Rock(1, 2), new Gem(), new Enemy(1, 200), new Enemy(2, 150), new Enemy(3, 100)];
var player = new Player();
