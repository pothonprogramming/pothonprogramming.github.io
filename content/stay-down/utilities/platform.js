STAY_DOWN.initializers.platformUtility = () => {

  const Rectangle2D = STAY_DOWN.utilities.Rectangle2D;

  STAY_DOWN.utilities.Platform = {

    create(x, y) {

      return {

        move_force:Math.random() * 0.05 + 0.01,
        velocity_y:0,
        velocity_y_max:-Math.random() * 2 - 1,
      
        ...Rectangle2D.create(x, y, 16, 16)
      
      };

    },

    moveUp(p) {

      p.velocity_y -= p.move_force;
      
      if (p.velocity_y < p.velocity_y_max) p.velocity_y = p.velocity_y_max;
  
      Rectangle2D.moveY(p, p.velocity_y);
  
    },
  
    reset(p, y) {
  
      p.velocity_y = 0;
      p.velocity_y_max = -Math.random() * 2 - 1;
      Rectangle2D.setTop(p, y);
  
    }

  };

};