STAY_DOWN.initializers.pauseState = () => {

  // buffers
  const display_buffer = STAY_DOWN.buffers.display;
  const text_buffer = STAY_DOWN.buffers.text;

  // tools
  const controller = STAY_DOWN.tools.controller;
  const state_manager = STAY_DOWN.tools.state_manager;
  const text = STAY_DOWN.tools.text;

  // utilities
  const Buffer = STAY_DOWN.utilities.Buffer;

  function activate(message) {

    Buffer.resize(text_buffer, 256, 256);
    
    text.write(text_buffer, 8, 20, 256, 'paused');
    text.write(text_buffer, 8, 40, 256, 'press p to play');
    text.write(text_buffer, 8, 60, 256, 'press q to quit');

    Buffer.draw(display_buffer, text_buffer.canvas, 0, 0);

  }

  function deactivate() {}

  function render() {}

  function update() {

    if (controller.getKey('p')) {
      
      controller.setKey('p', false);
      
      state_manager.change('run');

    } else if (controller.getKey('q')) {

      controller.setKey('q', false);

      state_manager.change('title');

    }
  
  }

  STAY_DOWN.states.pause = { activate, deactivate, render, update };

};