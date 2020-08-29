STAY_DOWN.constructors.Platform = (function() {

  const Rectangle2D = STAY_DOWN.constructors.Rectangle2D;

  const Platform = function(x, y, width, height) {

    Rectangle2D.call(this, x, y, width, height);

    this.move_force = 1;

  }

  Platform.prototype = {

    moveUp() {

      this.y -= this.move_force;

    }

  };

  Object.assign(Platform.prototype, Rectangle2D.prototype);

  return Platform;

})();