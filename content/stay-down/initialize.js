(() => {

  const BUFFERS = STAY_DOWN.buffers;
  const IMAGES = STAY_DOWN.images;
  const INITIALIZERS = STAY_DOWN.initializers;
  const TOOLS = STAY_DOWN.tools;

  const Buffer = STAY_DOWN.utilities.Buffer;

  INITIALIZERS.colliderUtility();
  INITIALIZERS.itemUtility();
  INITIALIZERS.platformUtility();
  INITIALIZERS.playerUtility();

  INITIALIZERS.stateManagerTool();

  // I have no need to ever reference this again, so I'm defining it here.
  function resize(event) {

    const display = BUFFERS.display;
    
    const width_ratio = document.documentElement.clientWidth / display.canvas.width;
    const height_ratio = document.documentElement.clientHeight / display.canvas.height;
    
    const scale = width_ratio < height_ratio ? width_ratio : height_ratio;
    
    display.canvas.style.height = Math.floor(display.canvas.width * scale) + 'px';
    display.canvas.style.width = Math.floor(display.canvas.height * scale) + 'px';

  }

  window.addEventListener('resize', resize);

  // load all the images
  TOOLS.loader.loadImages([

    'media/images/diamond.png',
    'media/images/dominique.png',
    'media/images/platform.png',
    'media/images/spike.png',
    'media/images/tile.png',
    'media/images/text.png',
    'media/images/text-box.png'

  ],
  // the callback function to handle the images once they're loaded  
  function(images_) {

    IMAGES.diamond = images_[0];
    IMAGES.dominique = images_[1];
    IMAGES.platform = images_[2];
    IMAGES.spike = images_[3];
    IMAGES.tile = images_[4];
    IMAGES.text = images_[5];
    IMAGES.text_box = images_[6];

    INITIALIZERS.textTool(); // Uses the text image, so must be initialized after loading the text image.

    BUFFERS.background = Buffer.create(256, 256, false, true);
    BUFFERS.display = Buffer.create(256, 256, false, false);
    BUFFERS.spikes = Buffer.create(256, 8, true, true);
    BUFFERS.text = Buffer.create(0, 0, true, true);
    BUFFERS.text_box = Buffer.create(256, 32, false, true);

    // These use the text tool as well as some buffers, so we have to initialize them after the text tool.
    INITIALIZERS.runState();
    INITIALIZERS.pauseState();
    INITIALIZERS.titleState();

    document.body.appendChild(BUFFERS.display.canvas);

    // once we have images, we can set up buffer images
    var buffer = BUFFERS.background;
    var image = IMAGES.tile;

    var x, y;

    for (x = 240; x > -1; x -= 16) for (y = 240; y > -1; y -= 16) {

      var random_x = Math.floor(Math.random() * 3) * 16;

      buffer.drawImage(image, random_x, 0, 16, 16, x, y, 16, 16);

    }

    buffer = BUFFERS.spikes;
    image = IMAGES.spike;

    for (x = 240; x > -1; x -= 16) buffer.drawImage(image, x, 0);

    buffer = BUFFERS.text_box;
    image = IMAGES.text_box;

    buffer.drawImage(image, 32, 0, 16, 28, 240, 0, 16, 28);

    for (x = 224; x > 0; x -= 16) buffer.drawImage(image, 16, 0, 16, 28, x, 0, 16, 28);

    buffer.drawImage(image, 0, 0, 16, 28, 0, 0, 16, 28);

    resize();

    TOOLS.controller.activate();
  
    TOOLS.state_manager.change('title');
  
    TOOLS.engine.start();

  });

})();