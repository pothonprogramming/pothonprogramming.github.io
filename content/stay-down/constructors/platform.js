STAY_DOWN.constructors.Platform = (function() {

  const { constructors: { Rectangle2D } } = STAY_DOWN;

  const Platform = function(x, y, width, height) {

    Rectangle2D.call(this, x, y, width, height);

    this.move_force = Math.random() * 0.05 + 0.01;

    this.velocity_y = 0;
    this.velocity_y_max = -Math.random() * 2 - 1;

  }

  Platform.prototype = {

    moveUp() {

      this.velocity_y -= this.move_force;
      
      if (this.velocity_y < this.velocity_y_max) this.velocity_y = this.velocity_y_max;

      this.moveY(this.velocity_y);

    }

  };

  Object.assign(Platform.prototype, Rectangle2D.prototype);

  return Platform;

})();