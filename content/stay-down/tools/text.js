STAY_DOWN.initializers.textTool = () => {

  const image = STAY_DOWN.images.text;
  const Frame = STAY_DOWN.utilities.Frame;

  const letter_spacing = 1;
  const line_height = 10;
  const space_width = 3;
  
  const frames = {
  
    'a':Frame.create(0,3,6,6,0,3),
    'b':Frame.create(7,0,5,9),
    'c':Frame.create(13,4,5,5,0,4),
    'd':Frame.create(19,0,5,9),
    'e':Frame.create(25,4,5,5,0,4),
    'f':Frame.create(31,0,5,9),
    'g':Frame.create(37,1,5,8,0,4),
    'h':Frame.create(43,0,5,9),
    'i':Frame.create(49,2,1,7,0,2),
    'j':Frame.create(51,0,4,9,-2,2),
    'k':Frame.create(56,0,5,9),
    'l':Frame.create(62,0,1,9),
    'm':Frame.create(64,4,9,5,0,4),
    'n':Frame.create(74,4,5,5,0,4),
    'o':Frame.create(80,4,5,5,0,4),
    'p':Frame.create(86,0,5,9,0,4),
    'q':Frame.create(92,0,5,9,0,4),
    'r':Frame.create(98,4,4,5,0,4),
    's':Frame.create(103,4,5,5,0,4),
    't':Frame.create(109,0,5,9),
    'u':Frame.create(115,4,5,5,0,4),
    'v':Frame.create(121,4,5,5,0,4),
    'w':Frame.create(127,4,9,5,0,4),
    'x':Frame.create(137,4,5,5,0,4),
    'y':Frame.create(143,1,5,8,0,4),
    'z':Frame.create(149,4,4,5,0,4),
    '0':Frame.create(154,0,5,9),
    '1':Frame.create(160,0,3,9),
    '2':Frame.create(164,0,5,9),
    '3':Frame.create(170,0,5,9),
    '4':Frame.create(176,0,4,9),
    '5':Frame.create(181,0,5,9),
    '6':Frame.create(187,0,5,9),
    '7':Frame.create(194,0,5,9),
    '8':Frame.create(199,0,5,9),
    '9':Frame.create(205,0,5,9),
    '!':Frame.create(211,0,1,9),
    '?':Frame.create(213,1,5,8,0,1),
    '.':Frame.create(1,3,1,1,0,8),
    "'":Frame.create(4,4,1,2,0,2),
    ',':Frame.create(4,4,1,2,0,8)
  
  };
  
  function write(context, position_x, position_y, width, string, clear = false) {
  
    var start_x = position_x;
  
    if (clear) context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  
    var length = string.length;
  
    for (var i = 0; i < length; i ++) {
  
      var char = string.charAt(i);
  
      if (char === ' ') { position_x += space_width; continue; }
  
      var frame = frames[char];
  
      if (!frame) continue;
  
      context.drawImage(image, frame.x, frame.y, frame.width, frame.height, position_x + frame.offset_x, position_y + frame.offset_y, frame.width, frame.height);
  
      position_x += frame.width + letter_spacing;
  
      if (position_x > width) {
  
        position_x = start_x;
        position_y += line_height;
  
      }
  
    }
  
  }

  STAY_DOWN.tools.text = { write };

};