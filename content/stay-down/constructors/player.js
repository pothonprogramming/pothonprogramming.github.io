STAY_DOWN.constructors.Player = (function() {

  const { constructors: { Rectangle2D } } = STAY_DOWN;

  const Player = function(x, y) {

    this.color = '#ff0000';
  
    this.grounded = false;
  
    this.move_force = 1;
    this.jump_force = 18;
  
    this.velocity_x = 0;
    this.velocity_y = 0;
  
    Rectangle2D.call(this, x, y, 32, 32);
  
  };
  
  Player.prototype = {
  
    ground(velocity_y = 0) {
      
      this.grounded   = true;
      this.velocity_y = velocity_y;
    
    },
  
    jump() {
  
      if (this.grounded) {
  
        this.grounded    = false;
        this.velocity_y -= this.jump_force;
  
      }
  
    },
  
    moveLeft() { this.velocity_x -= this.move_force; },
  
    moveRight() { this.velocity_x += this.move_force; },
  
    updatePosition(gravity, friction) {
  
      this.velocity_x *= friction;
      this.velocity_y += gravity;
      this.velocity_y *= friction;
  
      this.x += this.velocity_x;
      this.moveY(this.velocity_y);
  
    }
  
  };
  
  Object.assign(Player.prototype, Rectangle2D.prototype);

  return Player;

})();