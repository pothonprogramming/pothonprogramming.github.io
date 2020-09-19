STAY_DOWN.controller = (function() {

  const Input = function() {

    this.active = false;
    this.state  = false;

  }

  Input.prototype = {

    trigger(state) {

      if (state !== this.state) this.active = this.state = state;

    }

  };

  const left = new Input();
  const right = new Input();
  const up = new Input();
  const p = new Input();

  function keyDownUp(event) { event.preventDefault();

    var state = event.type == 'keydown';

    switch(event.keyCode) {

      case 37: left.trigger(state); break;
      case 38: up.trigger(state); break;
      case 39: right.trigger(state); break;
      case 80: p.trigger(state);

    }

  }

  return {

    getLeft() { return left.active; },
    getRight() { return right.active; },
    getUp() { return up.active; },
    getP() { return p.active; },

    setP(active) { p.active = active; },

    activate() {

      window.addEventListener('keydown', keyDownUp);
      window.addEventListener('keyup', keyDownUp);

    }
  
  };

})();