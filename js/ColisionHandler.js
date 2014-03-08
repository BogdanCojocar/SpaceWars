function ColisionHandler() {}
ColisionHandler.h = 0;
ColisionHandler.a = 0;
ColisionHandler.colision_obj = [];
ColisionHandler.isColisionObj = function(obj) {
  return typeof obj.handleColision == 'function;';
};
ColisionHandler.callback = {
  startAttackAlien: function(dest, source) {
    var x = {
      s: source,
      d: dest,
      i: 0
    };
    ColisionHandler.h++;
    $('#score2').text(ColisionHandler.h);
    ColisionHandler.colision_obj.push(x);
  },
  startAttackHuman: function(dest, source) {
    var x = {
      s: source,
      d: dest,
      i: 0
    };
    ColisionHandler.a++;
    $('#score1').text(ColisionHandler.a);
    ColisionHandler.colision_obj.push(x);
  }
};
ColisionHandler.prototype.handleColision = function() {
  gGamePhysics.addColisionDetection(ColisionHandler.callback);
};
ColisionHandler.prototype.addColisionObj = function(game_objects) {
  if (ColisionHandler.colision_obj.length > 0) {
    game_objects.push.apply(game_objects, ColisionHandler.colision_obj);
    ColisionHandler.colision_obj.length = 0; 
  }
};
var gColisionHandler = new ColisionHandler();
