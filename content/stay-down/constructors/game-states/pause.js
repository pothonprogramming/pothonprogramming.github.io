STAY_DOWN.setConstructor('PauseState', function(p = STAY_DOWN) {

  // methods
  const getBuffer = p.getBuffer;
  const getMethod = p.getMethod;
  // tools
  const controller = p.getTool('controller');
  const state = p.getTool('state');
  const text = p.getTool('text');

  function activate(message) {

    var buffer = getBuffer('text');

    getMethod('resizeBuffer')(buffer, 256, 256);
    
    text.write(buffer, 8, 20, 256, 'paused');
    text.write(buffer, 8, 40, 256, 'press p to play');
    text.write(buffer, 8, 60, 256, 'press q to quit');

    buffer = getBuffer('display');

    buffer.drawImage(getBuffer('text').canvas, 0, 0);

  }

  function deactivate() {}

  function render() {}

  function update() {

    if (controller.getKey('p')) {
      
      controller.setKey('p', false);
      
      state.change('run');

    } else if (controller.getKey('q')) {

      controller.setKey('q', false);

      state.change('title');

    }
  
  }

  return { activate, deactivate, render, update };

});