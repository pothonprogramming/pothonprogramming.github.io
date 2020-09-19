STAY_DOWN.states.pause = (function() {

  const { controller, engine, states,
  
    constructors:{ GameState }

  } = STAY_DOWN;

  function update() {

    if (controller.getP()) {
      
      controller.setP(false);
      engine.setState(states.run);

      return;

    }
  
  }

  function render() {}

  return new GameState(update, render);

})();