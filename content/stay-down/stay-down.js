const STAY_DOWN = (function() {

  const display = document.createElement('canvas').getContext('2d', { alpha:false });

  var controller;
  var engine;
  var state;

  return {

    constructors:{},
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

    initialize() {

      const {

        states: { run },

        changeState
      
      } = STAY_DOWN;
    
      controller.activate();
    
      document.body.appendChild(display.canvas);
    
      changeState(run);
    
      engine.start();

    },

    setController(controller_) { controller = controller_; },

    setEngine(engine_) { engine = engine_; }
  
  };

})();