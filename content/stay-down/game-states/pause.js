STAY_DOWN.states.pause = (function() {

  const { controller, engine, states,
  
    constructors:{ GameState }

  } = STAY_DOWN;

  function activate() {}

  function deactivate() {}

  function render() {}

  function update() {

    if (controller.getP()) {
      
      controller.setP(false);
      
      STAY_DOWN.changeState(states.run);

    }
  
  }

  return new GameState(activate, deactivate, render, update);

})();