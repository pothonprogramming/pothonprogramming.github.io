STAY_DOWN.states.run = (function() {

  const { states,
  
    images,
    constructors: { GameState, Item, Platform, Player },

    changeState

  } = STAY_DOWN;

  const controller = STAY_DOWN.getController();
  const display = STAY_DOWN.getDisplay();
  const renderer = STAY_DOWN.getRenderer();

  const world_width  = 256;
  const world_height = 256;

  const gravity  = 1;
  const friction = 0.8;

  const output = document.createElement('p');

  var item_count = 0;

  const ground = {

    top:world_height - 32

  }

  const item = new Item(128, 100, 16, 16);

  const player = new Player(2, ground.top - 32);

  const platforms = [];

  function activate() {

    document.body.appendChild(output);

    window.addEventListener('resize', resize);

    output.innerText = "Where am I? I need to get out of here...";

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

    const width_ratio = document.documentElement.clientWidth / display.canvas.width;
    const height_ratio = document.documentElement.clientHeight / display.canvas.height;

    const scale = width_ratio < height_ratio ? width_ratio : height_ratio;

    display.canvas.style.height = Math.floor(display.canvas.width * scale) + 'px';
    display.canvas.style.width = Math.floor(display.canvas.height * scale) + 'px';

    const rectangle = display.canvas.getBoundingClientRect();

    output.style.top = (rectangle.top + rectangle.height - 40) + 'px';
    output.style.left = rectangle.left + 'px';

  }

  function render() {

    display.fillStyle = '#303840';
    display.fillRect(0, 0, world_width, world_height);

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      renderer.drawImage(images.platform, platform.x, platform.y);

    }

    renderer.drawImage(images.diamond, item.x, item.y);

    renderer.drawImage(images.dominique, player.x, player.y);

    for(var x = world_width - 16; x > -1; x -= 16) {

      renderer.drawImage(images.spike, x, 0);

    }

    display.fillStyle = '#202830';
    display.fillRect(0, ground.top, world_width, 4);

  }

  function update() {

    // Pause
    if (controller.getP()) {
     
      controller.setP(false);
      
      changeState(states.pause);

      return;

    }

    if (controller.getLeft())  player.moveLeft();
    if (controller.getRight()) player.moveRight();

    if (controller.getUp()) {

      player.jump();

    }

    if (player.getTop() < 4) {

      if (item_count === 0) output.innerText = "Ouch! Probably shouldn't touch those spikes.";
      else output.innerText = "Ouch! Oh, snap! I lost my diamonds!!!";

      player.y = player.old_y = ground.top - player.height;
      player.x = 2;

      item_count = 0;

    }

    player.updatePosition(gravity, friction);

    if (collideTop(player, ground.top)) player.ground();

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      platform.moveUp();

      if (platform.y < 0) platform.reset(ground.top);

      if (collidePlayerWithPlatform(player, platform)) player.ground(platform.velocity_y);

    }

    if (collideRectangleWithRectangle(item, player)) {

      item.setLeft(Math.random() * (world_width - item.width));
      item.setTop(Math.random() * (world_height - item.height - (world_height - ground.top)));

      item_count ++;

      output.innerText = item_count;

    };

  }

  for (let x = world_width - 20; x > 16; x -= 18) {

    platforms.push(new Platform(x, ground.top, 16, 4));

  }

  display.canvas.width = world_width;
  display.canvas.height = world_height;

  return new GameState(activate, deactivate, render, update);

})();