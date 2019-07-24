//An Entity super class that both the player and enemy will inheret from
class Entity {
  constructor(x, y, hitbox, sprite) {
    this.x = x;
    this.y = y;
    this.hitbox = { ...hitbox }; //hitbox for collision detection
    this.sprite = sprite;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends Entity {
  constructor(x, y, speed) {
    super(x, y, { width: 94, height: 61 }, 'images/enemy-bug.png');
    this.speed = speed;
  }
  update(dt) {
    if (this.x > 510) {
      this.x = -60; // reset the x coordinate after the bug passes the screen
      this.speed = speedRandomizer(); // give it a new random speed
    }
    this.x = this.x + this.speed * dt;
    this.hitbox.x = this.x + 3;
    this.hitbox.y = this.y + 81;
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Entity {
  constructor(x, y) {
    //Hitbox dimensions for the player character
    //Feel free to edit these numbers to your liking :)
    super(x, y, { width: 47, height: 64 }, 'images/char-boy.png');
  }
  update() {
    this.hitbox.x = this.x + 28;
    this.hitbox.y = this.y + 74;
  }

  handleInput(input) {
    //Making sure player never steps out of bounds + win condition for going above water blocks
    const boundries = {
      left: () => {
        if (this.x < 101) return;
        this.x += -101;
      },
      right: () => {
        if (this.x > 404) return;
        this.x += 101;
      },
      down: () => {
        if (this.y > 399) return;
        this.y += +83;
      },
      up: () => {
        if (this.y < 68) return reset(true);
        if (this.y < -14) return;
        this.y += -83;
      }
    };
    boundries[input]();
  }
}

// randomizes speed everytime its called
let speedRandomizer = () => Math.ceil(150 * Math.random()) + 200;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player(200, 400);
let allEnemies = [];
allEnemies.push(new Enemy(-180, 53, speedRandomizer()));
allEnemies.push(new Enemy(-180, 133, speedRandomizer()));
allEnemies.push(new Enemy(-180, 223, speedRandomizer()));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
