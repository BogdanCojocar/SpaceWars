function HandleImage() {
}
HandleImage.imagePath = ["sprites/sprites.png",
                         "sprites/level_background1.png",
                         "sprites/level_background2.png",
                         "sprites/level_background3.png",
                         "sprites/level_background4.png",
                         "sprites/alien_tower_1.png",
                         "sprites/alien_tower_2.png",
                         "sprites/alien_tower_3.png",
                         "sprites/alien_tower_4.png",
                         "sprites/human_tower_1.png",
                         "sprites/human_tower_2.png",
                         "sprites/human_tower_3.png",
                         "sprites/human_tower_4.png"];
HandleImage.imageCache = {};
HandleImage.prototype.init = function() {
  for (index in HandleImage.imagePath) {
    this.loadImage(HandleImage.imagePath[index]);
  }
  gLog.message("The images are loaded in HandleImage.", Log.option.INFO, false);
  gLog.message(HandleImage.imageCache, Log.option.DEBUG, false);
};
HandleImage.prototype.loadImage = function(imgName) {
  if (HandleImage.imageCache[imgName] != null) {
  	HandleImage.imageCache[imgName];
  }
  var img = new Image();
  img.src = imgName;
  HandleImage.imageCache[imgName] = img;
};
HandleImage.prototype.drawSprite = function(spriteName, posX, posY) {
  var sprite = gLoadSprites.sprites[spriteName];
  if (sprite == null || typeof sprite === undefined) {
  	gLog.message("Invalid sprite name.", Log.option.ERROR, false);
  	return; 
  }
  if(posX < 0 || posX > gGameRendering.canvas.width || posY < 0 || posY > gGameRendering.canvas.height) {
  	gLog.message("Invalid positions.", Log.option.ERROR, false);
  	return;
  }
  gGameRendering.context.drawImage(HandleImage.imageCache[HandleImage.imagePath[0]], sprite.x, sprite.y, sprite.width, 
  	                            sprite.height, posX + sprite.cx, posY + sprite.cy, 
  	                            sprite.width, sprite.height);
};
HandleImage.prototype.drawImage = function(imgName, posX, posY) {
  var realImageName = null;
  for (var i = 0; i < HandleImage.imagePath.length; ++i) {
    if (HandleImage.imagePath[i].indexOf(imgName) !== -1) {
      realImageName = HandleImage.imagePath[i];	
      break;
    }
  }
  //gLog.message(realImageName, Log.option.INFO, false);
  if (realImageName == null) {
  	gLog.message("Invalid image name.", Log.option.ERROR, false);
  	return;
  }
  if(posX < 0 || posX > gGameRendering.canvas.width || posY < 0 || posY > gGameRendering.canvas.height) {
  	gLog.message("Invalid positions.", Log.option.ERROR, false);
  	return;
  }
  var img = HandleImage.imageCache[realImageName];
  gGameRendering.context.drawImage(img, posX, posY);// img.width, img.height, posX, posY, 
  	                               //gGameRendering.canvas.width, gGameRendering.canvas.height);
};
var gHandleImage = new HandleImage();
