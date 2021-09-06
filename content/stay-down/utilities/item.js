STAY_DOWN.initializers.itemUtility = () => {

  const Rectangle2D = STAY_DOWN.utilities.Rectangle2D;
  
  STAY_DOWN.utilities.Item = {
    
    create(x, y) {

      return {

        r:0,
        velocity_r:0,
        velocity_x:0,
        velocity_y:0,
      
        ...Rectangle2D.create(x, y, 16, 16)

      };

    },

    reset(i, left, top, right, bottom) {

      i.velocity_x = 0;
      i.velocity_y = 0;
      i.x = Math.random() * right;
      i.y = Math.random() * bottom;

    },

    updatePosition(i, x, y, friction) {

      var cx = Rectangle2D.getCenterX(i);
      var cy = Rectangle2D.getCenterY(i);

      var v1_x = cx - x;
      var v1_y = cy - y;
      var v2_x = 1;
      var v2_y = 0;

      var distance = v1_x * v1_x + v1_y * v1_y;

      var cross_product = v1_x * v2_y - v1_y * v2_x;
      var dot_product = v1_x * v2_x + v1_y * v2_y;

      var speed = 1000/distance;

      if (distance < 5000) {

        i.r = Math.atan2(Math.abs(cross_product), dot_product);

        if (cross_product > 0) i.r = Math.PI * 2 - i.r;

      }

      i.velocity_r += Math.random() * 1 - 0.5;

      i.r += i.velocity_r;

      i.velocity_x += Math.cos(i.r) * speed;
      i.velocity_y += Math.sin(i.r) * speed;

      i.velocity_r *= friction;
      i.velocity_x *= friction;
      i.velocity_y *= friction;

      i.x += i.velocity_x;
      i.y += i.velocity_y;

    }

  };

};