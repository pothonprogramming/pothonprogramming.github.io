STAY_DOWN.initializers.playerUtility = () => {

  const Rectangle2D = STAY_DOWN.utilities.Rectangle2D;

  STAY_DOWN.utilities.Player = {

    create(x, y) {

      return {
  
        color:'#ff0000',
        direction:1,
        grounded:false,
        move_force:1,
        jump_force:18,
        velocity_x:0,
        velocity_y:0,
      
        ...Rectangle2D.create(x, y, 16, 32)
      
      }

    },
    
    ground(p, velocity_y = 0) {
        
      p.grounded   = true;
      p.velocity_y = velocity_y;
    
    },

    jump(p) {

      if (p.grounded) {

        p.grounded    = false;
        p.velocity_y -= p.jump_force;

      }

    },

    moveLeft(p) {
      
      p.direction = -1;
      p.velocity_x -= p.move_force;
    
    },

    moveRight(p) {
      
      p.direction = 1;
      p.velocity_x += p.move_force;
    
    },

    updatePosition(p, gravity, friction) {

      p.velocity_x *= friction;
      p.velocity_y += gravity;
      p.velocity_y *= friction;

      p.x += p.velocity_x;
      
      Rectangle2D.moveY(p, p.velocity_y);

    }

  }

};