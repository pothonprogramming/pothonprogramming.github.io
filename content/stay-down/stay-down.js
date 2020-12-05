const STAY_DOWN = (function() {

  const display = document.createElement('canvas').getContext('2d', { alpha:false });

  var controller;
  var engine;
  var loader;
  var renderer;
  var state;

  return {

    constructors:{},
    images: {

      diamond:undefined,
      dominique:undefined,
      platform:undefined

    },
    managers:{},
    states:{},

    changeState(state_) {

      if (state) state.deactivate();

      state = state_;

      state.activate();

      engine.setState(state);

    },

    getController() { return controller; },
    getDisplay() { return display; },
    getEngine() { return engine; },
    getLoader() { return loader; },
    getRenderer() { return renderer; },

    initialize() {

      const {

        images,
        states: { run },

        changeState
      
      } = STAY_DOWN;

      loader.loadImages([

        'media/images/diamond.png',
        'media/images/dominique.png',
        'media/images/platform.png',
        'media/images/spike.png'

      ],
      
      function(images_) {

        images.diamond = images_[0];
        images.dominique = images_[1];
        images.platform = images_[2];
        images.spike = images_[3];

        controller.activate();
    
        document.body.appendChild(display.canvas);
    
        changeState(run);
    
        engine.start();

      });

    },

    setController(controller_) { controller = controller_; },

    setEngine(engine_) { engine = engine_; },
    setLoader(loader_) { loader = loader_; },
    setRenderer(renderer_) { renderer = renderer_; }
  
  };

})();