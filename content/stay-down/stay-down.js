const STAY_DOWN = {

  constructors:{},
  managers:{},
  states:{},

  display:document.createElement('canvas').getContext('2d', { alpha:false }),
  output:document.createElement('p'),

  resize:function(event) {

    const output = STAY_DOWN.output;
    const rectangle = STAY_DOWN.display.canvas.getBoundingClientRect();



    output.style.top = rectangle.top + 'px';
    output.style.left = rectangle.left + 'px';

  }

};

STAY_DOWN.initialize = function() {

  const { controller, display, engine, output,

    states: { run },

    resize
  
  } = this;

  controller.activate();

  document.body.appendChild(display.canvas);

  document.body.appendChild(output);

  output.innerText = "Hello!";

  engine.setState(run);
  engine.start();

  resize();

  window.addEventListener('resize', resize);

};