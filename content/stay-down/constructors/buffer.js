STAY_DOWN.setConstructor('Buffer', function(width, height, alpha = false, desynchronized = true) {

  const buffer = document.createElement('canvas').getContext('2d', { alpha, desynchronized });

  buffer.canvas.height = height;
  buffer.canvas.width = width;
  buffer.imageSmoothingEnabled = false;

  return buffer;

});