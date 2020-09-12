STAY_DOWN.constructors.Item = (function() {

  const Rectangle2D = STAY_DOWN.constructors.Rectangle2D;

  const Item = function(x, y, width, height) {

    Rectangle2D.call(this, x, y, width, height);

  }

  Item.prototype = {

  };

  Object.assign(Item.prototype, Rectangle2D.prototype);

  return Item;

})();