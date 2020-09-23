const STAY_DOWN = (function() {

  var state;

  return {

    constructors:{},
    managers:{},
    states:{},
  
    display:document.createElement('canvas').getContext('2d', { alpha:false }),

    changeState(state_) {

      if (state) state.deactivate();

      state = state_;

      state.activate();

      this.engine.setState(state);

    },

    initialize() {

      const { controller, display, engine,

        states: { run }
      
      } = this;
    
      controller.activate();
    
      document.body.appendChild(display.canvas);
    
      this.changeState(run);
    
      engine.start();

    }
  
  };

})();