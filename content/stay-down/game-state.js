STAY_DOWN.constructors.GameState = (function() {

  const GameState = function(update, render) {

    this.update = update;
    this.render = render;

  };

  GameState.prototype = {};

  return GameState;

})();