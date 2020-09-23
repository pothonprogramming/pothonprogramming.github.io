STAY_DOWN.states.run = (function() {

  const { display, controller, engine, states,
  
    constructors: { GameState, Player },
    managers:{ item_manager, platform_manager }

  } = STAY_DOWN;


  const world_width  = 480;
  const world_height = 480;

  const gravity  = 1;
  const friction = 0.9;

  const output = document.createElement('p');
  output.innerText = "Hello!";

  const player = new Player(100, 100);

  var item_count = 0;

  const ground = {

    top:world_height - 32

  }

  function activate() {

    document.body.appendChild(output);

    window.addEventListener('resize', resize);

    resize();

  }

  function collideRectangleWithRectangle(rectangle1, rectangle2) {

    if (rectangle1.getLeft() > rectangle2.getRight() || rectangle1.getTop() > rectangle2.getBottom() || rectangle1.getRight() < rectangle2.getLeft() || rectangle1.getBottom() < rectangle2.getTop()) return false;

    return true;

  }

  function collideTop(rectangle, top) {

    if (rectangle.getBottom() > top) {

      rectangle.setBottom(top);

      return true;

    } return false;

  }

  function collidePlayerWithPlatform(player_, platform) {

    if (player_.getRight() < platform.getLeft() || player_.getLeft() > platform.getRight() || player_.getBottom() < platform.getTop() || player_.getOldBottom() > platform.getOldTop()) return false;

    player_.setBottom(platform.getTop());

    return true;

  }

  function deactivate() {

    document.body.removeChild(output);

    window.removeEventListener('resize', resize);

  }

  function resize(event) {
  
    const rectangle = display.canvas.getBoundingClientRect();

    output.style.top = rectangle.top + 'px';
    output.style.left = rectangle.left + 'px';

    const width_ratio = document.documentElement.clientWidth / display.canvas.width;
    const height_ratio = document.documentElement.clientHeight / display.canvas.height;

    const scale = width_ratio < height_ratio ? width_ratio : height_ratio;

    display.canvas.style.height = Math.floor(display.canvas.width * scale) + 'px';
    display.canvas.style.width = Math.floor(display.canvas.height * scale) + 'px';

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

    display.fillStyle = '#f09000';

    var items = item_manager.active_items;

    for (index = items.length - 1; index > -1; -- index) {

      var item = items[index];

      display.beginPath();
      display.moveTo(item.getCenterX(), item.getTop() - 5);
      display.lineTo(item.getRight() + 5, item.getCenterY());
      display.lineTo(item.getCenterX(), item.getBottom() + 5);
      display.lineTo(item.getLeft() - 5, item.getCenterY());

      display.fill();

    }

    display.fillStyle = player.color;
    display.fillRect(player.x, player.y, player.width, player.height);

  }

  function update() {

    // Pause
    if (controller.getP()) {
     
      controller.setP(false);
      
      STAY_DOWN.changeState(states.pause);

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

      if (platform.y < 32) platform.y = world_height;

      if (collidePlayerWithPlatform(player, platform)) player.ground(platform.velocity_y);

    }

    var items = item_manager.active_items;

    for (index = items.length - 1; index > -1; -- index) {

      var item = items[index];

      if (collideRectangleWithRectangle(item, player)) {

        item.setLeft(Math.random() * (world_width - item.width));
        item.setTop(Math.random() * (world_height - item.height - (world_height - ground.top)));

        item_count ++;

        output.innerText = item_count;

      };

    }

  }

  item_manager.createItem(100, Math.random() * (world_height - 16 - (world_height - ground.top)));

  for (let x = world_width - 50; x > 0; x -= 50) {

    platform_manager.createPlatform(x, ground.top);

  }

  display.canvas.width = world_width;
  display.canvas.height = world_height;

  return new GameState(activate, deactivate, render, update);

})();