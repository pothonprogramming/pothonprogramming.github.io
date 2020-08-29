const STAY_DOWN = {

  constructors:{},
  managers:{},
  states:{},

  display:document.createElement('canvas').getContext('2d', { alpha:false })

};

STAY_DOWN.initialize = function() {

  this.controller.activate();

  document.body.appendChild(this.display.canvas);

  this.engine.setState(this.states.run);
  this.engine.start();

};