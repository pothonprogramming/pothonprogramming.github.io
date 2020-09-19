STAY_DOWN.managers.item_manager = (function() {

  const { constructors: { Item } } = STAY_DOWN;

  return {

    active_items:[],

    createItem(x, y) {

      this.active_items.push(new Item(x, y, 16, 16));

    }

  }

})();