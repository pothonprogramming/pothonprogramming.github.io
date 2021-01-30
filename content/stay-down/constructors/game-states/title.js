STAY_DOWN.setConstructor('TitleState', function(p = STAY_DOWN) {

  // methods
  const getBuffer = p.getBuffer;
  const getImage = p.getImage;
  const getMethod = p.getMethod;
  // tools
  const controller = p.getTool('controller');
  const state = p.getTool('state');
  const text = p.getTool('text');

  function activate(message) {

    var buffer = getBuffer('text');

    getMethod('resizeBuffer')(buffer, 256, 256);
    
    text.write(buffer, 48, 100, 256, 'stay down by frank poth');
    text.write(buffer, 72, 120, 256, 'press p to start');
    text.write(buffer, 72, 140, 256, 'press p to pause');

    buffer = getBuffer('display');

    buffer.drawImage(getBuffer('background').canvas, 0, 0, 256, 256, 0, 0, 256, 256);
    buffer.drawImage(getImage('dominique'), 4, 224);
    buffer.drawImage(getImage('diamond'), 236, 236);
    buffer.drawImage(getBuffer('text').canvas, 0, 0);

  }

  function deactivate() {}

  function render() {}

  function update() {

    if (controller.getKey('p')) {
      
      controller.setKey('p', false);
      
      state.change('run', 'reset');

    }
  
  }

  return { activate, deactivate, render, update };

});