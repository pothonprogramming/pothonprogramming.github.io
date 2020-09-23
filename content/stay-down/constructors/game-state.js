STAY_DOWN.constructors.GameState = (function() {

  const GameState = function(activate, deactivate, render, update) {

    this.activate = activate;
    this.deactivate = deactivate;
    this.render = render;
    this.update = update;

  };

  GameState.prototype = {};

  return GameState;

})();