STAY_DOWN.setRenderer((function() {

  const display = STAY_DOWN.getDisplay();

  return {

    drawImage(image, x, y) {

      display.drawImage(image, 0, 0, image.width, image.height, Math.floor(x), Math.floor(y), image.width, image.height);

    }


  };

})());