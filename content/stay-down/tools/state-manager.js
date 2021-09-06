STAY_DOWN.initializers.stateManagerTool = () => {

  const ENGINE = STAY_DOWN.tools.engine;
  const STATES = STAY_DOWN.states;
  
  var state;
  
  function change(name, message) {
  
    if (state) state.deactivate();
  
    state = STATES[name];
  
    state.activate(message);
  
    ENGINE.setState(state);
  
  };

  STAY_DOWN.tools.state_manager = { change };

};