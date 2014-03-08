(function() {
  window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function(callback){
              window.setTimeout(callback, 1000 / 60);
           };
  })();
})();
function Game() {
  this.game_objects = [];
  this.dead_objects = [];
}
Game.prototype.init = function() {
  gHandleNextWave.init(Common.level.LEVEL1);
  gGameRendering.init();
  gGamePhysics.init();
  gUserInput.handleUserInput();
  //document.getElementById('background_music').loop = true;
  //document.getElementById('background_music').play();
  $('#aliens').css("color", "red");
};
Game.prototype.run = function() {
  var self = this;
  
  gSpaceObjects.setLevelSpaceDetails(self.game_objects, Common.level.LEVEL1);
  gColisionHandler.handleColision();
  (function mainGameLoop() {
    gUserInput.addTowerObjects(self.game_objects);
    gHandleNextWave.handleWave(self.game_objects, gUserInput.player);
    gGamePhysics.update(self.game_objects);
    gColisionHandler.addColisionObj(self.game_objects);
    gGameRendering.update(self.game_objects);
    //sleep(200);
    requestAnimFrame(mainGameLoop);
  })();
};
function sleep(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate - date < millis);
}
$(function() {
  var gGame = new Game();
  gLog.disable();
  gGame.init();	
  gGame.run();
});

