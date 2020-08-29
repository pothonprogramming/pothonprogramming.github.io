(() => {

  // The display canvas' context. Draw the tile buffer here. It's important not to desynchronize when using CSS to scale.
  const DISPLAY = document.querySelector('canvas').getContext('2d', { alpha:false, desynchronized:false });
  // The tile buffer canvas' context. Draw individual tiles here.
  const BUFFER  = document.createElement('canvas').getContext('2d', { alpha:false, desynchronized:true });

  // This is the width and height for every tile.
  const TILE_SIZE = 16;

  // This image will hold the tile sheet once it is loaded.
  const TILE_SHEET_IMAGE = new Image();

  // The map holds all the info about the map we will be drawing, including the tile indices array.
  const MAP = {

    columns: 16,
    rows:    14,
    height:  14 * TILE_SIZE,
    width:   16 * TILE_SIZE,

    // This is used during image scaling to ensure the rendered image is not skewed.
    width_height_ratio: 16 / 14,

    // The values in this array correspond to the keys in the TILES object.
    tiles:[10,22,22,22,22,22,22,22,22,22,22,22,23,-1, 8,15,
           20, 1, 2, 3, 2, 1, 1, 3, 3, 2, 1, 1, 3,-1, 9,19,
           20,-1, 7, 5, 0, 6, 6,-1,-1,-1,-1,-1, 4, 5, 6,19,
           20,-1, 8,15,16,17,18,-1,-1,-1, 6, 5,15,16,17,10,
           20,-1, 8,19,11,12,23,-1,-1,-1,15,17,10,11,10,10,
           20,-1, 8,19,10,23, 3,-1,-1,-1,21,22,22,22,22,13,
           20,-1, 8,19,20, 2,-1,-1,-1,-1, 3, 2, 1, 1, 2,19,
           20,-1, 8,19,20,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,19,
           20,-1, 8,19,20, 5, 5, 6, 4, 6, 5, 4, 4, 0, 6,19,
           20,-1, 8,19,10,17,16,17,17,16,17,17,17,17,16,10,
           20,-1, 8,21,22,22,22,22,22,22,22,22,22,22,22,10,
           20,-1, 9, 3, 1, 1, 2, 3, 3, 2, 1, 2, 3, 1, 1,19,
           20, 4, 5, 6, 6, 5, 4, 4, 5, 4, 6, 5, 6,-1, 7,19,
           10,16,17,17,16,17,17,17,16,17,17,16,18,-1, 8,19]

  };

  // This will calculate the tile's source position in the tile sheet given the number of columns in the tile sheet and the index of the tile in the tile sheet.
  function calculateTileSourcePosition(tile_index, tile_sheet_columns) {

    return {
      
      x:           tile_index % tile_sheet_columns  * TILE_SIZE,
      y:Math.floor(tile_index / tile_sheet_columns) * TILE_SIZE
    
    };

  }

  // This will render tiles to the buffer.
  function renderTiles() {

    var map_index = 0; // This represents the position in the MAP.tiles array we're getting our tile value from.

    // Increment by the actual TILE_SIZE to avoid having to multiply on every iteration.
    for (var top = 0; top < MAP.height; top += TILE_SIZE) {

      for (var left = 0; left < MAP.width; left += TILE_SIZE) {

        var tile_value = MAP.tiles[map_index]; // Get the tile value from the map.

        map_index ++; // Make sure to increment the map_index so we can get the next tile from the map.

        if (tile_value == -1) continue; // If the tile space is meant to be empty, skip this iteration.
        
        var tile_source_position = calculateTileSourcePosition(tile_value, 6); // Get the specific tile object from the TILES object.

        BUFFER.drawImage(TILE_SHEET_IMAGE, tile_source_position.x, tile_source_position.y, TILE_SIZE, TILE_SIZE, left, top, TILE_SIZE, TILE_SIZE);

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

  // Add the resize event listener.
  window.addEventListener('resize', resize);

  TILE_SHEET_IMAGE.addEventListener('load', function(event) {

    // Draw the individual tiles to the buffer.
    renderTiles();

    // Draw the BUFFER to the DISPLAY canvas.
    renderDisplay();

    // Calling resize forces the DISPLAY canvas to be scaled by the CSS.
    resize();

  }, { once:true });
  
  TILE_SHEET_IMAGE.src = 'better-tile-graphics.png';

})();