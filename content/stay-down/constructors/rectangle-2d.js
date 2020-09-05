STAY_DOWN.constructors.Rectangle2D = (function() {

  const Rectangle2D = function(x, y, width, height) {

    this.old_y = y;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  
  };
  
  Rectangle2D.prototype = {
  
    getBottom() { return this.y + this.height; },
    getLeft() { return this.x; },
    getRight() { return this.x + this.width; },
    getTop() { return this.y; },

    getOldBottom() { return this.old_y + this.height; },
    getOldTop() { return this.old_y; },

    setBottom(y) { this.y = y - this.height; },
    setLeft(x) { this.x = x; },
    setRight(x) { this.x = x - this.width; },
    setTop(y) { this.y = y; },

    moveX(x) { this.x += x; },
    moveY(y) { this.old_y = this.y; this.y += y; }
  
  };

  return Rectangle2D;

})();