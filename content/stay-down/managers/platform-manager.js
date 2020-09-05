STAY_DOWN.managers.platform_manager = (function() {

  const Platform = STAY_DOWN.constructors.Platform;

  return {

    active_platforms:[],

    createPlatform(x, y) {

      this.active_platforms.push(new Platform(x, y, 48, 4));

    }

  }

})();