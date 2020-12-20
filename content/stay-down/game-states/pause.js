STAY_DOWN.setState('pause', (function() {

  const changeState = STAY_DOWN.changeState;

  const controller = STAY_DOWN.getController();

  function activate() {}

  function deactivate() {}

  function render() {}

  function update() {

    if (controller.getP()) {
      
      controller.setP(false);
      
      changeState('run');

    }
  
  }

  return { activate, deactivate, render, update };

})());