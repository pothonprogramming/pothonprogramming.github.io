STAY_DOWN.states.pause = (function(controller, engine, states, GameState) {

  function update() {

    if (controller.getP()) {
      
      controller.setP(false);
      engine.setState(states.run);

      return;

    }
  
  }

  function render() {}

  return new GameState(update, render);

})(STAY_DOWN.controller, STAY_DOWN.engine, STAY_DOWN.states, STAY_DOWN.constructors.GameState);