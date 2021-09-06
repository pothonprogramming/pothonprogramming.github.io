STAY_DOWN.initializers.runState = () => {

  // buffers
  const background_buffer = STAY_DOWN.buffers.background;
  const display_buffer = STAY_DOWN.buffers.display;
  const spikes_buffer = STAY_DOWN.buffers.spikes;
  const text_box_buffer = STAY_DOWN.buffers.text_box;
  const text_buffer = STAY_DOWN.buffers.text;

  // images
  const dominique_image = STAY_DOWN.images.dominique;
  const diamond_image = STAY_DOWN.images.diamond;
  const platform_image = STAY_DOWN.images.platform;
  
  // tools
  const controller = STAY_DOWN.tools.controller;
  const state_manager = STAY_DOWN.tools.state_manager;
  const text = STAY_DOWN.tools.text;
  
  // Utilities
  const Buffer = STAY_DOWN.utilities.Buffer;
  const Collider = STAY_DOWN.utilities.Collider;
  const Item = STAY_DOWN.utilities.Item;
  const Platform = STAY_DOWN.utilities.Platform;
  const Player = STAY_DOWN.utilities.Player;
  const Rectangle2D = STAY_DOWN.utilities.Rectangle2D;

  const friction = 0.8;
  const gravity  = 1;
  const world_width  = 256;
  const world_height = 256;

  const ground_top = world_height - 32;

  const item = Item.create(128, 100);
  const player = Player.create(2, ground_top - 32);

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

  for (let x = world_width - 19; x > 0; x -= 18) { platforms.push(Platform.create(x, ground_top, 16, 4)); }

  function activate(message) {

    Buffer.resize(text_buffer, 250, 24);

    if (message === 'reset') reset();
    else text.write(text_buffer, 0, 0, 250, 'why do i suddenly feel like i was frozen in time?');

  }

  function deactivate() {}

  function render() {

    Buffer.draw(display_buffer, background_buffer.canvas, 0, 0);

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      Buffer.draw(display_buffer, platform_image, platform.x, platform.y);

    }

    Buffer.draw(display_buffer, diamond_image, item.x, item.y);

    Buffer.drawFlippedX(display_buffer, dominique_image, player.x, player.y, player.direction);
    
    Buffer.draw(display_buffer, spikes_buffer.canvas, 0, 0);
    Buffer.draw(display_buffer, text_box_buffer.canvas, 0, 228);
    Buffer.draw(display_buffer, text_buffer.canvas, 3, 230);

    display_buffer.fillStyle = '#202830';
    display_buffer.fillRect(0, ground_top, world_width, 4);

  }

  function reset() {

    Rectangle2D.setLeft(player, 2);

    Rectangle2D.setBottom(player, ground_top);

    for (var p = platforms.length - 1; p > -1; -- p) Platform.reset(platforms[p], ground_top);

    item_count = 0;
    
    text.write(text_buffer, 0, 0, 250, 'where am i? i need to get out of here! hey, is that a diamond?', true);

  }

  function update() {

    // Pause
    if (controller.getKey('p')) {
     
      controller.setKey('p', false);
      
      state_manager.change('pause');

      return;

    }

    if (controller.getKey('left'))  Player.moveLeft(player);
    if (controller.getKey('right')) Player.moveRight(player);

    if (controller.getKey('up')) Player.jump(player);

    if (Rectangle2D.getTop(player) < 4) {

      if (item_count === 0) text.write(text_buffer, 0, 0, 250, 'ouch! i need to stay away from those!', true);
      else text.write(text_buffer, 0, 0, 250, 'oh, snap! i lost my diamonds!!! also, that was incredibly painful!', true);

      player.y = player.old_y = ground_top - player.height;
      player.x = 2;

      item_count = 0;

    }

    Player.updatePosition(player, gravity, friction);
    Collider.keepPlayerInBounds(player, 0, 256);

    Item.updatePosition(item, Rectangle2D.getCenterX(player), Rectangle2D.getCenterY(player), friction);
    Collider.keepItemInBounds(item, 0, 256, 8, 232);

    if (Collider.collideTop(player, ground_top)) Player.ground(player);

    for (var index = platforms.length - 1; index > -1; -- index) {

      var platform = platforms[index];

      Platform.moveUp(platform);

      if (platform.y < 0) Platform.reset(platform, ground_top);

      if (Collider.collidePlayerWithPlatform(player, platform)) Player.ground(player, platform.velocity_y);

    }

    if (Collider.collideRectangleWithRectangle(item, player)) {

      Item.reset(item, 0, 0, world_width, world_height);

      item_count ++;

      if (item_count === 1) text.write(text_buffer, 0, 0, 250, 'hey, it is a diamond! i should get more of these!', true);
      else {
       
        var message = hype_words[Math.floor(Math.random() * hype_words.length)];

        message = message.replace('$', item_count);

        text.write(text_buffer, 0, 0, 250, message, true);

      }

    };

  }

  STAY_DOWN.states.run = { activate, deactivate, render, update };

};