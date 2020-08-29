STAY_DOWN.states.run = (function() {

  const display          = STAY_DOWN.display;
  const controller       = STAY_DOWN.controller;
  const engine           = STAY_DOWN.engine;
  const states           = STAY_DOWN.states;
  const platform_manager = STAY_DOWN.managers.platform_manager;
  const GameState        = STAY_DOWN.constructors.GameState;
  const Player           = STAY_DOWN.constructors.Player;

  const world_width  = 480;
  const world_height = 480;

  const gravity  = 1;
  const friction = 0.9;

  const player = new Player(100, 100);

  const document_element = document.documentElement;

  const ground = {

    top:world_height - 32

  }

  function collideTop(rectangle, top) {

    if (rectangle.getBottom() > top) {

      rectangle.setBottom(top);

      return true;

    } return false;

  }

  function collidePlatform(player_, platform) {

    if (player_.getRight() < platform.getLeft() || player_.getLeft() > platform.getRight() || player_.getTop() > platform.getBottom() || player_.getBottom() < platform.getTop()) return false;

    player.setBottom(platform.getTop());

    return true;

  }

  function update() {

    // Pause
    if (controller.getP()) {
     
      controller.setP(false);
      engine.setState(states.pause);

      return;

    }

    if (controller.getLeft())  player.moveLeft();
    if (controller.getRight()) player.moveRight();

    if (controller.getUp()) {

      player.jump();

    }

    player.updatePosition(gravity, friction);

    if (collideTop(player, ground.top)) player.ground();

    var platforms = platform_manager.active_platforms;

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      platform.moveUp();

      if (platform.y < 300) platform.y = world_height;

      if (collidePlatform(player, platform)) player.ground();

    }

  }

  function render() {

    display.fillStyle = '#303840';
    display.fillRect(0, 0, world_width, world_height);

    display.fillStyle = '#202830';
    
    display.fillRect(0, ground.top, world_width, 4);

    display.fillStyle = '#0090f0';

    var platforms = platform_manager.active_platforms;

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      display.fillRect(platform.x, platform.y, platform.width, platform.height);

    }

    display.fillStyle = player.color;
    display.fillRect(player.x, player.y, player.width, player.height);

  }

  platform_manager.createPlatform(64, ground.top);

  display.canvas.width = world_width;
  display.canvas.height = world_height;

  return new GameState(update, render);

})();