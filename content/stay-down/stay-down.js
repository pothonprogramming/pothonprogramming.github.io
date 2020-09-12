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

  this.controller.activate();

  document.body.appendChild(this.display.canvas);

  document.body.appendChild(this.output);

  this.output.innerText = "Hello!";

  this.engine.setState(this.states.run);
  this.engine.start();

  this.resize();

  window.addEventListener('resize', this.resize);

};