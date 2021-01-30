STAY_DOWN.setConstructor('StateTool', function(p = STAY_DOWN) {

  // methods
  const getState = p.getState;
  const getTool = p.getTool;

  var state;

  function change(name, message) {

    if (state) state.deactivate();

    state = getState(name);

    state.activate(message);

    getTool('engine').setState(state);

  };

  return { change };

});