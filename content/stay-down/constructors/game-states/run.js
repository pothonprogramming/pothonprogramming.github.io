STAY_DOWN.setConstructor('RunState', function(p = STAY_DOWN) {

  // constructors
  const Item = p.getConstructor('Item');
  const Player = p.getConstructor('Player');
  const Platform = p.getConstructor('Platform');
  // methods
  const getBuffer = p.getBuffer;
  const getImage = p.getImage;
  const getMethod = p.getMethod;
  // tools
  const controller = p.getTool('controller');
  const state = p.getTool('state');
  const text = p.getTool('text');

  const display = getBuffer('display');

  const friction = 0.8;
  const gravity  = 1;
  const world_width  = 256;
  const world_height = 256;

  const ground_top = world_height - 32;

  const item = new Item(128, 100, 16, 16);
  const player = new Player(2, ground_top - 32);

  const platforms = [];

  const hype_words = ['oooooh, yeah!!! i got $ diamonds!',
  'that\'s right, $ diamonds!',
  'that makes $ diamonds.',
  'hey, now! i just got $ diamonds!!!',
  '$ diamonds!!!',
  'how am i fitting these massive diamonds on my person?',
  '$ diamonds! i wonder if something will happen if i get enough of these...',
  'got another one, that\'s $.'];

  var item_count = 0;

  for (let x = world_width - 20; x > 16; x -= 18) { platforms.push(new Platform(x, ground_top, 16, 4)); }

  function activate(message) {

    getMethod('resizeBuffer')(getBuffer('text'), 250, 27);

    if (message === 'reset') reset();
    else text.write(getBuffer('text'), 0, 0, 248, 'why do i suddenly feel like i was frozen in time?');

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

  function deactivate() {}

  function render() {
    
    display.drawImage(getBuffer('background').canvas, 0, 0, 256, 240, 0, 0, 256, 240);

    var image = getImage('platform');

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      display.drawImage(image, Math.floor(platform.x), Math.floor(platform.y));

    }

    display.drawImage(getImage('diamond'), Math.floor(item.x), Math.floor(item.y));
    display.drawImage(getImage('dominique'), Math.floor(player.x), Math.floor(player.y));
    display.drawImage(getBuffer('spikes').canvas, 0, 0);
    display.drawImage(getBuffer('text-box').canvas, 0, 228);
    display.drawImage(getBuffer('text').canvas, 3, 230);

    display.fillStyle = '#202830';
    display.fillRect(0, ground_top, world_width, 4);

  }

  function reset() {

    player.setLeft(2);
    player.setBottom(ground_top);

    for (var p = platforms.length - 1; p > -1; -- p) platforms[p].reset(ground_top);

    item_count = 0;
    
    text.write(getBuffer('text'), 0, 0, 248, 'where am i? i need to get out of here! hey, is that a diamond?', true);

  }

  function update() {

    // Pause
    if (controller.getKey('p')) {
     
      controller.setKey('p', false);
      
      state.change('pause');

      return;

    }

    if (controller.getKey('left'))  player.moveLeft();
    if (controller.getKey('right')) player.moveRight();

    if (controller.getKey('up')) player.jump();

    if (player.getTop() < 4) {

      if (item_count === 0) text.write(getBuffer('text'), 0, 0, 248, 'ouch! i need to stay away from those!', true);
      else text.write(getBuffer('text'), 0, 0, 248, 'oh, snap! i lost my diamonds!!! also, that was incredibly painful!', true);

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

      if (item_count === 1) text.write(getBuffer('text'), 0, 0, 248, 'hey, it is a diamond! i should get more of these!', true);
      else {
       
        var message = hype_words[Math.floor(Math.random() * hype_words.length)];

        message = message.replace('$', item_count);

        text.write(getBuffer('text'), 0, 0, 248, message, true);

      }

    };

  }

  return { activate, deactivate, render, update };

});