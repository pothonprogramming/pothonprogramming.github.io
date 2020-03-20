(() => {

  const context = document.querySelector('canvas').getContext('2d', { alpha:false });

  const world = {

    columns:10,
    map:[],
    rows:10

  };

  const viewport = {

    height:100,
    width:100

  };

  function resize(event) {

    context.canvas.height = document.documentElement.clientHeight;
    context.canvas.width  = document.documentElement.clientWidth;

  }

  window.addEventListener('resize', resize);

})();