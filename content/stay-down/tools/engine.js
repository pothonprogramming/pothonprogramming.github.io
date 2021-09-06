STAY_DOWN.tools.engine = (() => {

  var running = false;

  var raf_handle;

  var accumulated_time = 0;
  var current_time = 0;
  var time_step = 1000/60;

  var state;
  
  function cycle(time_stamp) {
  
    raf_handle = window.requestAnimationFrame(cycle);
  
    accumulated_time += time_stamp - current_time;
    current_time = time_stamp;
  
    var updated = false;
  
    if (accumulated_time > 60) accumulated_time = time_step;
  
    while(accumulated_time >= time_step) {
  
      state.update();
  
      updated = true;
  
      accumulated_time -= time_step;
  
    }
  
    if (updated) state.render();
  
  }

  function start() {
  
    running = true;
    raf_handle = window.requestAnimationFrame(cycle);
  
  }

  function stop() {
    
    running = false;
    window.cancelAnimationFrame(raf_handle);
  
  }

  function setState(state_) { state = state_; }

  return { start, stop, setState };

})();