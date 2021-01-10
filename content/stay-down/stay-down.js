const STAY_DOWN = (function() {

  const buffers = {

    background:document.createElement('canvas').getContext('2d', { alpha:false, desynchronized:true }),
    display:document.createElement('canvas').getContext('2d', { alpha:false }),
    text:document.createElement('canvas').getContext('2d', { alpha:false, desynchronized:true })

  };
  const constructors = {};
  const images = {};
  const states = {};
  const tools = {};

  var controller;
  var engine;
  var loader;
  var state;

  function changeState(name) {

    if (state) state.deactivate();

    state = getState(name);

    state.activate();

    engine.setState(state);

  };

  function getBuffer(name) { return buffers[name]; }
  function getConstructor(name) { return constructors[name]; }
  function getImage(name) { return images[name]; }
  function getState(name) { return states[name]; }

  function getController() { return controller; }
  function getEngine() { return engine; }
  function getLoader() { return loader; }
  function getTool(name) { return tools[name]; }

  function initialize() {

    buffers.display.canvas.width = 256;
    buffers.display.canvas.height = 256;
    buffers.display.imageSmoothingEnabled = false;

    buffers.text.canvas.width = 256;
    buffers.text.canvas.height = 32;
    buffers.text.imageSmoothingEnabled = false;

    loader.loadImages([

      'media/images/diamond.png',
      'media/images/dominique.png',
      'media/images/platform.png',
      'media/images/spike.png',
      'media/images/tile.png',
      'media/images/text.png'

    ],
    
    function(images_) {

      images.diamond = images_[0];
      images.dominique = images_[1];
      images.platform = images_[2];
      images.spike = images_[3];
      images.tile = images_[4];
      images.text = images_[5];

      controller.activate();

      buffers.display.imageSmoothingEnabled = false;

      buffers.background.canvas.width = 256;
      buffers.background.canvas.height = 224;
      buffers.background.imageSmoothingEnabled = false;

      for (var x = 240; x > -1; x -= 16) {

        for (var y = 212; y > -1; y -= 16) {

          var random_x = Math.floor(Math.random() * 3) * 16;

          buffers.background.drawImage(images.tile, random_x, 0, 16, 16, x, y, 16, 16);

        }

      }
  
      document.body.appendChild(buffers.display.canvas);
  
      changeState('run');
  
      engine.start();

    });

  }

  function setConstructor(name, $function) { constructors[name] = $function; }
  function setController(controller_) { controller = controller_; }
  function setEngine(engine_) { engine = engine_; }
  function setLoader(loader_) { loader = loader_; }
  function setState(name, object) { states[name] = object; }
  function setTool(name, object) { tools[name] = object; }

  return {

    changeState,

    getBuffer,
    getConstructor,
    getController,
    getEngine,
    getImage,
    getLoader,
    getState,
    getTool,

    initialize,

    setConstructor,
    setController,
    setEngine,
    setLoader,
    setState,
    setTool
  
  };

})();