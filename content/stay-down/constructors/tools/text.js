STAY_DOWN.setConstructor('TextTool', function(p = STAY_DOWN) {

  // constructors
  const Frame = p.getConstructor('Frame');
  // methods
  const getImage = p.getImage;

  const letter_spacing = 1;
  const line_height = 10;
  const space_width = 3;

  const frames = {

    'a':Frame(0,3,6,6,0,3),
    'b':Frame(7,0,5,9),
    'c':Frame(13,4,5,5,0,4),
    'd':Frame(19,0,5,9),
    'e':Frame(25,4,5,5,0,4),
    'f':Frame(31,0,5,9),
    'g':Frame(37,1,5,8,0,4),
    'h':Frame(43,0,5,9),
    'i':Frame(49,2,1,7,0,2),
    'j':Frame(51,0,4,9,-2,2),
    'k':Frame(56,0,5,9),
    'l':Frame(62,0,1,9),
    'm':Frame(64,4,9,5,0,4),
    'n':Frame(74,4,5,5,0,4),
    'o':Frame(80,4,5,5,0,4),
    'p':Frame(86,0,5,9,0,4),
    'q':Frame(92,0,5,9,0,4),
    'r':Frame(98,4,4,5,0,4),
    's':Frame(103,4,5,5,0,4),
    't':Frame(109,0,5,9),
    'u':Frame(115,4,5,5,0,4),
    'v':Frame(121,4,5,5,0,4),
    'w':Frame(127,4,9,5,0,4),
    'x':Frame(137,4,5,5,0,4),
    'y':Frame(143,1,5,8,0,4),
    'z':Frame(149,4,4,5,0,4),
    '0':Frame(154,0,5,9),
    '1':Frame(160,0,3,9),
    '2':Frame(164,0,5,9),
    '3':Frame(170,0,5,9),
    '4':Frame(176,0,4,9),
    '5':Frame(181,0,5,9),
    '6':Frame(187,0,5,9),
    '7':Frame(194,0,5,9),
    '8':Frame(199,0,5,9),
    '9':Frame(205,0,5,9),
    '!':Frame(211,0,1,9),
    '?':Frame(213,1,5,8,0,1),
    '.':Frame(1,3,1,1,0,8),
    "'":Frame(4,4,1,2,0,2),
    ',':Frame(4,4,1,2,0,8)

  };

  function write(context, position_x, position_y, width, string, clear = false) {

    var start_x = position_x;

    if (clear) context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    var image = getImage('text');

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

  return { write };

});