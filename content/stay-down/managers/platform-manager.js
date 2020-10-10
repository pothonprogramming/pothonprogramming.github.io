STAY_DOWN.managers.platform_manager = (function() {

  const { constructors: { Platform } } = STAY_DOWN;

  return {

    active_platforms:[],

    createPlatform(x, y) {

      this.active_platforms.push(new Platform(x, y, 16, 4));

    }

  }

})();