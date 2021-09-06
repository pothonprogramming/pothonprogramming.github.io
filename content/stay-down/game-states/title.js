STAY_DOWN.initializers.titleState = () => {

  // buffers
  const background_buffer = STAY_DOWN.buffers.background;
  const display_buffer = STAY_DOWN.buffers.display;
  const text_buffer = STAY_DOWN.buffers.text;

  // images
  const dominique_image = STAY_DOWN.images.dominique;
  const diamond_image = STAY_DOWN.images.diamond;

  // tools
  const controller = STAY_DOWN.tools.controller;
  const state_manager = STAY_DOWN.tools.state_manager;
  const text = STAY_DOWN.tools.text;

  // utilities
  const Buffer = STAY_DOWN.utilities.Buffer;

  function activate(message) {

    Buffer.resize(text_buffer, 256, 256);
    
    text.write(text_buffer, 48, 100, 256, 'stay down by frank poth');
    text.write(text_buffer, 72, 120, 256, 'press p to start');
    text.write(text_buffer, 72, 140, 256, 'press p to pause');

    Buffer.draw(display_buffer, background_buffer.canvas, 0, 0);
    Buffer.draw(display_buffer, dominique_image, 4, 224);
    Buffer.draw(display_buffer, diamond_image, 236, 236);
    Buffer.draw(display_buffer, text_buffer.canvas, 0, 0);

  }

  function deactivate() {}

  function render() {}

  function update() {

    if (controller.getKey('p')) {
      
      controller.setKey('p', false);
      
      state_manager.change('run', 'reset');

    }
  
  }

  STAY_DOWN.states.title = { activate, deactivate, render, update };

};