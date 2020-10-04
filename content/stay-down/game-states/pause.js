STAY_DOWN.states.pause = (function() {

  const { states,
  
    constructors:{ GameState },

    changeState

  } = STAY_DOWN;

  const controller = STAY_DOWN.getController();

  function activate() {}

  function deactivate() {}

  function render() {}

  function update() {

    if (controller.getP()) {
      
      controller.setP(false);
      
      changeState(states.run);

    }
  
  }

  return new GameState(activate, deactivate, render, update);

})();