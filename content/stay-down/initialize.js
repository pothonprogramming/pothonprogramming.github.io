(function(p = STAY_DOWN) {

  // constructors
  const Buffer = p.getConstructor('Buffer');
  // methods
  const getBuffer = p.getBuffer;
  const getImage = p.getImage;
  const getTool = p.getTool;
  const setBuffer = p.setBuffer;
  const setImage = p.setImage;
  const setState = p.setState;
  const setTool = p.setTool;

  setBuffer('background', Buffer(256, 256, false, true));
  setBuffer('display', Buffer(256, 256, false, false));
  setBuffer('spikes', Buffer(256, 8, true, true));
  setBuffer('text', Buffer(0, 0, true, true));
  setBuffer('text-box', Buffer(256, 32, false, true));

  setTool('controller', p.getConstructor('ControllerTool')());
  setTool('engine', p.getConstructor('EngineTool')());
  setTool('loader', p.getConstructor('LoaderTool')());
  setTool('state', p.getConstructor('StateTool')());
  setTool('text', p.getConstructor('TextTool')());

  // States have to be set last because they require tools, buffers, etc. to be defined.
  setState('pause', p.getConstructor('PauseState')());
  setState('run', p.getConstructor('RunState')());
  setState('title', p.getConstructor('TitleState')());

  document.body.appendChild(getBuffer('display').canvas);

  // I have no need to ever reference this again, so I'm defining it here.
  function resize(event) {

    const display = getBuffer('display');
    
    const width_ratio = document.documentElement.clientWidth / display.canvas.width;
    const height_ratio = document.documentElement.clientHeight / display.canvas.height;
    
    const scale = width_ratio < height_ratio ? width_ratio : height_ratio;
    
    display.canvas.style.height = Math.floor(display.canvas.width * scale) + 'px';
    display.canvas.style.width = Math.floor(display.canvas.height * scale) + 'px';

  }

  window.addEventListener('resize', resize);

  resize();

  // load all the images
  getTool('loader').loadImages([

    'media/images/diamond.png',
    'media/images/dominique.png',
    'media/images/platform.png',
    'media/images/spike.png',
    'media/images/tile.png',
    'media/images/text.png',
    'media/images/text-box.png'

  ],
  // the callback function to handle the images once they're loaded  
  function(images) {

    setImage('diamond', images[0]);
    setImage('dominique', images[1]);
    setImage('platform', images[2]);
    setImage('spike', images[3]);
    setImage('tile', images[4]);
    setImage('text', images[5]);
    setImage('text-box', images[6]);

    // once we have images, we can set up buffer images
    var buffer = getBuffer('background');
    var image = getImage('tile');

    var x, y;

    for (x = 240; x > -1; x -= 16) for (y = 240; y > -1; y -= 16) {

      var random_x = Math.floor(Math.random() * 3) * 16;

      buffer.drawImage(image, random_x, 0, 16, 16, x, y, 16, 16);

    }

    buffer = getBuffer('spikes');
    image = getImage('spike');

    for(x = 240; x > -1; x -= 16) buffer.drawImage(image, x, 0);

    buffer = getBuffer('text-box');
    image = getImage('text-box');

    buffer.drawImage(image, 32, 0, 16, 28, 240, 0, 16, 28);

    for (x = 224; x > 0; x -= 16) buffer.drawImage(image, 16, 0, 16, 28, x, 0, 16, 28);

    buffer.drawImage(image, 0, 0, 16, 28, 0, 0, 16, 28);

    getTool('controller').activate();
  
    getTool('state').change('title');
  
    getTool('engine').start();

  });

})();