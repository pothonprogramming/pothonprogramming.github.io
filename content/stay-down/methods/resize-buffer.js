STAY_DOWN.setMethod('resizeBuffer', function(buffer, width, height, smoothing = false) {

  buffer.canvas.width = width;
  buffer.canvas.height = height;
  buffer.imageSmoothingEnabled = smoothing;

});