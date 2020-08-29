STAY_DOWN.constructors.Rectangle2D = (function() {

  const Rectangle2D = function(x, y, width, height) {

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

    setBottom(y) { this.y = y - this.height; },
    setLeft(x) { this.x = x; },
    setRight(x) { this.x = x - this.width; },
    setTop(y) { this.y = y; }
  
  };

  return Rectangle2D;

})();