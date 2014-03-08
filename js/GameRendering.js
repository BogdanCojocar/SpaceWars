/**
 * @author Bogdan Cojocar
 */
function GameRendering() {
  this.canvas = null;
  this.context = null;
}
GameRendering.prototype.init = function() {
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext('2d');
  this.canvas.oncontextmenu = function () {
    return false; 
  };
  this.canvas.width = 1950;
  this.canvas.height = 1100;
  gLog.message("Canvas initialized with width: " + this.canvas.width + " and height: " + this.canvas.height,
               Log.option.INFO, false);
  gHandleImage.init();
  gLoadSprites.load();
};
GameRendering.prototype.update = function(game_objects) {
  if (game_objects == null) {
    gLog.message("Invalid argument.", Log.option.ERROR, false);
    return;
  }
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  gGameRendering.drawLevelBackground(Common.level.LEVEL1);
  for (var i = 0; i < game_objects.length; ++i) {
  	var game_object = game_objects[i];
  	if (typeof game_object.s != 'undefined' && game_object.i < 2) {
  	  gGameRendering.context.beginPath();
      gGameRendering.context.moveTo(game_object.s.x, game_object.s.y);
      gGameRendering.context.lineTo(game_object.d.x, game_object.d.y);
      gGameRendering.context.lineWidth = 5;
      gGameRendering.context.strokeStyle = '#ff0000';
      gGameRendering.context.stroke();
      game_object.i++;
      if (game_object.i === 2) {
        var dest = game_object.d.x;
        var source = game_object.s.x;
        game_objects.splice(i, 1);
        for (var j = 0; j < game_objects.length; ++j) {
          var game_object = game_objects[j];
          if (Alien.isAlien(game_object) || Human.isHuman(game_object)) {
            var pos = game_object.body.GetBody().GetPosition();
            if (Common.posIsReached(pos.x, dest)) {
              //game_objects[j].destroy();
              game_objects.splice(j, 1);
            }
          }
          //if (AlienTower.isAlienTower(game_object) || HumanTower.isHumanTower(game_object)) {
            //var pos = game_object.body.GetBody().GetPosition();
            //if (Common.posIsReached(pos.x, source)) {
              //game_objects[j].removeTower();
              //game_objects.splice(j, 1);
            //}
          //}
        }
      }
  	} else
  	if (AlienTower.isAlienTower(game_object) || HumanTower.isHumanTower(game_object)) {
  	  gHandleImage.drawImage(game_object.getNextSprite(), game_object.startPos.x, game_object.startPos.y);
  	} else {
  	  var pos = null;
  	  if (game_object.body == null || typeof game_object.body === "undefined") {
  	    pos = game_object.startPos;
  	  } else {
  	    pos = game_object.body.GetBody().GetPosition();
  	    pos.x *= gGamePhysics.scale;
  	    pos.y *= gGamePhysics.scale;
  	  }
  	  gHandleImage.drawSprite(game_object.getNextSprite(), pos.x, pos.y); 
  	}
  }	
};
GameRendering.prototype.drawLevelBackground = function(level) {
  var imgName = null;
  switch(level) {
    case Common.level.LEVEL1:
      imgName = "level_background1";
      break;
    case Common.level.LEVEL2:
      imgName = "level_background2";
      break;
    case Common.level.LEVEL3:
      imgName = "level_background3";
      break;
    case Common.level.LEVEL4:
      imgName = "level_background4";
      break;
  }	
  if (imgName == null) {
  	gLog("Invalid level option.", Log.option.ERROR, false);
  	return;
  }
  gHandleImage.drawImage(imgName, 0, 0);
};
var gGameRendering = new GameRendering();
