STAY_DOWN.utilities.Buffer = {

  create(width, height, alpha = false, desynchronized = true) {

    const buffer = document.createElement('canvas').getContext('2d', { alpha, desynchronized });
  
    buffer.canvas.height = height;
    buffer.canvas.width = width;
    buffer.imageSmoothingEnabled = false;
  
    return buffer;
  
  },

  draw(b, image, x, y) {

    b.drawImage(image, Math.floor(x), Math.floor(y));

  },

  drawFlippedX(b, image, x, y, scale_x) {

    if (scale_x === -1) {
      
      b.scale(-1, 1);
      b.drawImage(image, Math.floor(-Math.floor(x) - image.width), Math.floor(y));
      b.scale(-1, 1);

    } else b.drawImage(image, Math.floor(x), Math.floor(y));

  },

  resize(b, width, height, smoothing = false) {

    b.canvas.width = width;
    b.canvas.height = height;
    b.imageSmoothingEnabled = smoothing;

  }
  
};