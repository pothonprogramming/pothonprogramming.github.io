STAY_DOWN.utilities.Rectangle2D = {

  create(x, y, width, height) {
    
    return {
  
      height:height,
      old_y:y,
      width:width,
      x:x,
      y:y
      
    };

  },

  getBottom(r) { return r.y + r.height; },
  getCenterX(r) { return r.x + r.width * 0.5; },
  getCenterY(r) { return r.y + r.height * 0.5; },
  getLeft(r) { return r.x; },
  getRight(r) { return r.x + r.width; },
  getTop(r) { return r.y; },

  getOldBottom(r) { return r.old_y + r.height; },
  getOldTop(r) { return r.old_y; },

  setBottom(r, y) { r.y = y - r.height; },
  setLeft(r, x) { r.x = x; },
  setRight(r, x) { r.x = x - r.width; },
  setTop(r, y) { r.y = y; },

  moveX(r, x) { r.x += x; },
  moveY(r, y) { r.old_y = r.y; r.y += y; }

};