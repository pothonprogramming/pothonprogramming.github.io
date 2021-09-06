STAY_DOWN.initializers.colliderUtility = () => {

  const Rectangle2D = STAY_DOWN.utilities.Rectangle2D;

  STAY_DOWN.utilities.Collider = {

    collideRectangleWithRectangle(r1, r2) {

      if (Rectangle2D.getLeft(r1) > Rectangle2D.getRight(r2) || Rectangle2D.getTop(r1) > Rectangle2D.getBottom(r2) || Rectangle2D.getRight(r1) < Rectangle2D.getLeft(r2) || Rectangle2D.getBottom(r1) < Rectangle2D.getTop(r2)) return false;

      return true;

    },

    collideTop(rectangle, top) {

      if (Rectangle2D.getBottom(rectangle) > top) {

        Rectangle2D.setBottom(rectangle, top);

        return true;

      } return false;

    },

    collidePlayerWithPlatform(player, platform) {

      if (Rectangle2D.getRight(player) < Rectangle2D.getLeft(platform) || Rectangle2D.getLeft(player) > Rectangle2D.getRight(platform) || Rectangle2D.getBottom(player) < Rectangle2D.getTop(platform) || Rectangle2D.getOldBottom(player) > Rectangle2D.getOldTop(platform)) return false;

      Rectangle2D.setBottom(player, Rectangle2D.getTop(platform));

      return true;

    },

    keepItemInBounds(item, left, right, top, bottom) {

      if (Rectangle2D.getLeft(item) < left) {
        
        item.velocity_x += 1;
        item.rotation += Math.PI;

      } else if (Rectangle2D.getRight(item) > right) {
        
        item.rotation += Math.PI;
        item.velocity_x -= 1;

      }

      if (Rectangle2D.getTop(item) < top) {
        
        item.rotation += Math.PI;
        item.velocity_y += 1;
      
      }  else if (Rectangle2D.getBottom(item) > bottom) {
       
        item.rotation += Math.PI;
        item.velocity_y -= 1;

      }

    },

    keepPlayerInBounds(player, left, right) {

      if (Rectangle2D.getLeft(player) < left) player.velocity_x += 1;
      else if (Rectangle2D.getRight(player) > right) player.velocity_x -= 1;

    }

  };

};