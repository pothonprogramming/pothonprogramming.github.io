(() => {

  // The display canvas' context. Draw the tile buffer here.
  const DISPLAY = document.querySelector('canvas').getContext('2d', { alpha:false, desynchronized:false });
  // The tile buffer canvas' context. Draw individual tiles here.
  const BUFFER  = document.createElement('canvas').getContext('2d', { alpha:false, desynchronized:true });

  // This is the width and height for every tile.
  const TILE_SIZE = 16;

  // The TILES object contains "tile" objects with keys that correspond to the map values.
  // Each tile object has a color.
  const TILES = {

    0: { color:'#d8f4f4' }, // sky
    1: { color:'#ffffff' }, // cloud
    2: { color:'#3e611e' }, // grass
    3: { color:'#412823' }  // dirt

  }

  // The map holds all the info about the map we will be drawing, including the tile indices array.
  const MAP = {

    columns: 16,
    rows:    14,
    height:  14 * TILE_SIZE,
    width:   16 * TILE_SIZE,

    // This is used during image scaling to ensure the rendered image is not skewed.
    width_height_ratio: 16 / 14,

    // The values in this array correspond to the keys in the TILES object.
    tiles:[1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,
           0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,
           0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,
           0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,
           0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
           0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,
           0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,
           2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,
           3,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,
           3,3,3,3,3,3,3,0,0,0,3,3,3,3,3,3]

  };

  // This will render tiles to the buffer.
  function renderTiles() {

    var map_index = 0; // This represents the position in the MAP.tiles array we're getting our tile value from.

    // Increment by the actual TILE_SIZE to avoid having to multiply on every iteration.
    for (var top = 0; top < MAP.height; top += TILE_SIZE) {

      for (var left = 0; left < MAP.width; left += TILE_SIZE) {

        var tile_value = MAP.tiles[map_index]; // Get the tile value from the map.
        
        var tile = TILES[tile_value]; // Get the specific tile object from the TILES object.

        BUFFER.fillStyle = tile.color; // Now that we have the tile we can access its properties.

        BUFFER.fillRect(left, top, TILE_SIZE, TILE_SIZE); // Draw the tile at the left, top position and TILE_SIZE.

        map_index ++; // Make sure to increment the map_index so we can get the next tile from the map.

      }

    }

  }

  // Render the buffer to the display.
  // If this example required a game loop or repeated draws, this would be your main rendering function.
  // The benefit of this approach is that you only make 1 drawImage call here instead of 1 call for every tile.
  function renderDisplay() {

    DISPLAY.drawImage(BUFFER.canvas, 0, 0);

  }

  // This function resizes the CSS width and height of the DISPLAY canvas to force it to scale to fit the window.
  function resize(event) {

    // Get the height and width of the window
    var height = document.documentElement.clientHeight;
    var width  = document.documentElement.clientWidth;

    // This makes sure the DISPLAY canvas is resized in a way that maintains the MAP's width / height ratio.
    if (width / height < MAP.width_height_ratio) height = Math.floor(width  / MAP.width_height_ratio);
    else                                         width  = Math.floor(height * MAP.width_height_ratio);

    // This sets the CSS of the DISPLAY canvas to resize it to the scaled height and width.
    DISPLAY.canvas.style.height = height + 'px';
    DISPLAY.canvas.style.width  = width  + 'px';

  }

  // Set the initial width and height of the BUFFER and the DISPLAY canvases.
  BUFFER.canvas.width  = DISPLAY.canvas.width  = MAP.width;
  BUFFER.canvas.height = DISPLAY.canvas.height = MAP.height;

  // To ensure there is no anti-aliasing when drawing to the canvas, set image smoothing to false on both canvases.
  BUFFER.imageSmoothingEnabled = DISPLAY.imageSmoothingEnabled = false;

  // Draw the individual tiles to the buffer.
  renderTiles();

  // Draw the BUFFER to the DISPLAY canvas.
  renderDisplay();

  // Add the resize event listener.
  window.addEventListener('resize', resize);

  // Calling resize forces the DISPLAY canvas to be scaled by the CSS.
  resize();

})();