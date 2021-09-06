STAY_DOWN.tools.controller = (() => {

  const Input = () => ({ active:false, state:false });

  const keys = {

    'left':Input(),
    'p':Input(),
    'q':Input(),
    'right':Input(),
    'up':Input()

  }

  function activate() {

    window.addEventListener('keydown', keyDownUp);
    window.addEventListener('keyup', keyDownUp);

  }

  function getKey(name) { return keys[name].active };

  function keyDownUp(event) { event.preventDefault();

    var state = event.type == 'keydown';

    switch(event.keyCode) {

      case 37: trigger(keys.left, state); break;
      case 38: trigger(keys.up, state); break;
      case 39: trigger(keys.right, state); break;
      case 80: trigger(keys.p, state); break;
      case 81: trigger(keys.q, state);

    }
    
  }

  function setKey(name, active) { keys[name].active = active; }

  function trigger(input, state) { if (state !== input.state) input.active = input.state = state; }

  return { activate, getKey, setKey };

})();