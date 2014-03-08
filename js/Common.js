function Common() {}
Common.imgPathCardDir = ["_N", "_NE", "_E", "_SE", "_S", "_SW", "_W", "_NW"];
Common.ext = ".png";
Common.thresh = 3;
Common.level = {
  LEVEL1: 0,
  LEVEL2: 1,
  LEVEL3: 2,
  LEVEL4: 3 
};
Common.player = {
  FIRST_PLAYER: 0,
  SECOND_PLAYER: 1
};
Common.getSpritePath = function(spriteName, numberOfSprites, pathGenerator) {
  if (spriteName == null || pathGenerator == null) {
    gLog.message("Invalid parameters.", Log.option.ERROR, false);
    return;
  }
  var sprites = [];
  for (var i = 0; i < numberOfSprites; ++i) {
    var newSpritePath = pathGenerator(spriteName, i);
    sprites.push(newSpritePath);
  }
  if (sprites.length === 0) {
    gLog.message("Sprite array still empty during init.", Log.option.ERROR, false);
  }
  return sprites;
};
Common.pathGenWithCardinalDirections = function(spriteName, i) {
  return spriteName + Common.imgPathCardDir[i] + Common.ext;
};
Common.pathGenWithNumbers = function(spriteName, i) {
  var nr;
  if (i < 10) {
    nr = "0" + i;
  } else {
    nr = i;
  }
  return spriteName + nr + Common.ext;
};
Common.posIsReached = function(pos, endPos) {
  var x = pos;
  var y = endPos;
  return pos > endPos - Common.thresh && pos < endPos + Common.thresh;
};
Common.posCanvasToBox2D = function(pos, scale) {
  return new Vec2D(pos.x / scale, pos.y / scale);
};
Common.posBox2DToCanvas = function(pos, scale) {
  return new Vec2D(pos.x * scale, pos.y * scale);
};
