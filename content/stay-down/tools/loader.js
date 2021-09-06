STAY_DOWN.tools.loader = (() => {

  function loadImages(urls, callback) {

    var images = [];
    var counter = urls.length;

    function resolve(event) {

      var image = event.target;

      image.removeEventListener('load', resolve);
      image.removeEventListener('error', resolve);

      counter --;

      if (counter === 0) callback(images);

    }

    for (var index = urls.length - 1; index > -1; index --) {

      var image = images[index] = new Image();

      image.addEventListener('load', resolve);
      image.addEventListener('error', resolve);

      image.src = urls[index];

    }
    
  }

  return { loadImages };

})();