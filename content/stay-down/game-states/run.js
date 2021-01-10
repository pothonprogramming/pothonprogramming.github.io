STAY_DOWN.setState('run', (function() {

  const changeState = STAY_DOWN.changeState;
  const getBuffer = STAY_DOWN.getBuffer;
  const getImage = STAY_DOWN.getImage;

  const text = STAY_DOWN.getTool('text');

  const Item = STAY_DOWN.getConstructor('Item');
  const Player = STAY_DOWN.getConstructor('Player');
  const Platform = STAY_DOWN.getConstructor('Platform');

  const controller = STAY_DOWN.getController();
  const display = STAY_DOWN.getBuffer('display');

  const world_width  = 256;
  const world_height = 256;

  const gravity  = 1;
  const friction = 0.8;

  var item_count = 0;

  const ground_top = world_height - 32;

  const item = new Item(128, 100, 16, 16);

  const player = new Player(2, ground_top - 32);

  const platforms = [];

  function activate() {

    var buffer = getBuffer('text');

    buffer.fillStyle = '#000000';
    buffer.fillRect(0, 0, 256, 32);
    
    text.write(buffer, 0, 6, 248, 'where am i? i need to get out of here! hey, what\'s that diamond thing?');

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

    window.removeEventListener('resize', resize);

  }

  function resize(event) {

    const width_ratio = document.documentElement.clientWidth / display.canvas.width;
    const height_ratio = document.documentElement.clientHeight / display.canvas.height;

    const scale = width_ratio < height_ratio ? width_ratio : height_ratio;

    display.canvas.style.height = Math.floor(display.canvas.width * scale) + 'px';
    display.canvas.style.width = Math.floor(display.canvas.height * scale) + 'px';

    const rectangle = display.canvas.getBoundingClientRect();

  }

  function render() {

    var image = getImage('platform');

    var buffer = getBuffer('background');
    
    display.drawImage(buffer.canvas, 0, 0);

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      display.drawImage(image, platform.x, platform.y);

    }

    display.drawImage(getImage('diamond'), Math.floor(item.x), Math.floor(item.y));

    display.drawImage(getImage('dominique'), Math.floor(player.x), Math.floor(player.y));

    image = getImage('spike');

    for(var x = world_width - 16; x > -1; x -= 16) {

      display.drawImage(image, x, 0);

    }

    buffer = getBuffer('text');

    display.drawImage(buffer.canvas, 0, 224);

    display.fillStyle = '#202830';
    display.fillRect(0, ground_top, world_width, 4);

  }

  function update() {

    // Pause
    if (controller.getP()) {
     
      controller.setP(false);
      
      changeState('pause');

      return;

    }

    if (controller.getLeft())  player.moveLeft();
    if (controller.getRight()) player.moveRight();

    if (controller.getUp()) {

      player.jump();

    }

    if (player.getTop() < 4) {

      var buffer = getBuffer('text');

      buffer.fillStyle = '#000000';
      buffer.fillRect(0, 0, 256, 32);

      if (item_count === 0) text.write(buffer, 0, 6, 248, 'ouch! i need to stay away from those!');
      else text.write(getBuffer('text'), 0, 6, 248, 'oh, snap! i lost my diamonds!!!');

      player.y = player.old_y = ground_top - player.height;
      player.x = 2;

      item_count = 0;

    }

    player.updatePosition(gravity, friction);

    if (collideTop(player, ground_top)) player.ground();

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      platform.moveUp();

      if (platform.y < 0) platform.reset(ground_top);

      if (collidePlayerWithPlatform(player, platform)) player.ground(platform.velocity_y);

    }

    if (collideRectangleWithRectangle(item, player)) {

      item.setLeft(Math.random() * (world_width - item.width));
      item.setTop(Math.random() * (world_height - item.height - (world_height - ground_top)));

      item_count ++;

      var buffer = getBuffer('text');

      buffer.fillStyle = '#000000';
      buffer.fillRect(0, 0, 256, 32);
    
      text.write(buffer, 0, 6, 248, item_count.toString());

    };

  }

  for (let x = world_width - 20; x > 16; x -= 18) {

    platforms.push(new Platform(x, ground_top, 16, 4));

  }

  return { activate, deactivate, render, update };

})());