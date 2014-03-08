function SpaceObjects() {}
SpaceObjects.getNextIndex = function(i, n) {
  if (i < n) {
    return i;
  } else {
    return 0;
  }
};
SpaceObjects.prototype.setLevelSpaceDetails = function(game_objects, level) {
  switch(level) {
    case Common.level.LEVEL1:
      this.createSpaceDetailsLevel1(game_objects);
      break;
    case Common.level.LEVEL2:
      
      break;
    case Common.level.LEVEL3:
      
      break;
    case Common.level.LEVEL4:
      
      break;
  } 
};
SpaceObjects.prototype.createSpaceDetailsLevel1 = function(game_objects) {
 var meteor11 = new Meteorite1(new Vec2D(400, 100));
  meteor11.init();
  var meteor12 = new Meteorite1(new Vec2D(50, 400));
  meteor12.init();
  var meteor21 = new Meteorite2(new Vec2D(1000, 150));
  meteor21.init();
  var meteor31 = new Meteorite3(new Vec2D(300, 500));
  meteor31.init();
  var meteor41 = new Meteorite4(new Vec2D(700, 450));
  meteor41.init();
  var meteor42 = new Meteorite4(new Vec2D(634, 267));
  meteor42.init();
  var meteor51 = new Meteorite5(new Vec2D(1200, 150));
  meteor51.init();
  
  var planet1 = new Planets(new Vec2D(200, 200));
  planet1.setPlanetsSpriteIndex(4);
  var planet2 = new Planets(new Vec2D(1000, 400));
  planet2.setPlanetsSpriteIndex(7);
  
  game_objects.push(meteor11);
  game_objects.push(meteor12);
  game_objects.push(meteor21); 
  game_objects.push(meteor31); 
  game_objects.push(meteor41); 
  game_objects.push(meteor42); 
  game_objects.push(meteor51); 
  game_objects.push(planet1);
  game_objects.push(planet2);
}; 

function Meteorite1(startPos) {
  this.startPos = startPos;
  this.index = 0;
}
Meteorite1.sprites = [];
Meteorite1.prototype.init = function() {
  if (Meteorite1.sprites.length === 0) {
    Meteorite1.sprites = Common.getSpritePath("asteroid_1", 8, Common.pathGenWithCardinalDirections);
  }
};
Meteorite1.prototype.getNextSprite = function() {
  this.index++;
  this.index = SpaceObjects.getNextIndex(this.index, Meteorite1.sprites.length);
  return Meteorite1.sprites[this.index];
};

function Meteorite2(startPos) {
  this.startPos = startPos;
  this.index = 0;
}
Meteorite2.sprites = [];
Meteorite2.prototype.init = function() {
  if (Meteorite2.sprites.length === 0) {
    Meteorite2.sprites = Common.getSpritePath("asteroid_2", 8, Common.pathGenWithCardinalDirections);
  }
};
Meteorite2.prototype.getNextSprite = function() {
  this.index++;
  this.index = SpaceObjects.getNextIndex(this.index, Meteorite1.sprites.length);
  return Meteorite2.sprites[this.index];
};

function Meteorite3(startPos) {
  this.startPos = startPos;
  this.index = 0;
}
Meteorite3.sprites = [];
Meteorite3.prototype.init = function() {
  if (Meteorite3.sprites.length === 0) {
    Meteorite3.sprites = Common.getSpritePath("asteroid_3", 8, Common.pathGenWithCardinalDirections);
  }
};
Meteorite3.prototype.getNextSprite = function() {
  this.index++;
  this.index = SpaceObjects.getNextIndex(this.index, Meteorite1.sprites.length);
  return Meteorite3.sprites[this.index];
};

function Meteorite4(startPos) {
  this.startPos = startPos;
  this.index = 0;
}
Meteorite4.sprites = [];
Meteorite4.prototype.init = function() {
  if (Meteorite4.sprites.length === 0) {
    Meteorite4.sprites = Common.getSpritePath("asteroid_4", 8, Common.pathGenWithCardinalDirections);
  }
};
Meteorite4.prototype.getNextSprite = function() {
  this.index++;
  this.index = SpaceObjects.getNextIndex(this.index, Meteorite1.sprites.length);
  return Meteorite4.sprites[this.index];
};

function Meteorite5(startPos) {
  this.startPos = startPos;
  this.index = 0;
}
Meteorite5.sprites = [];
Meteorite5.prototype.init = function() {
  if (Meteorite5.sprites.length === 0) {
    Meteorite5.sprites = Common.getSpritePath("asteroid_5", 8, Common.pathGenWithCardinalDirections);
  }
};
Meteorite5.prototype.getNextSprite = function() {
  this.index++;
  this.index = SpaceObjects.getNextIndex(this.index, Meteorite1.sprites.length);
  return Meteorite5.sprites[this.index];
};

function Planets(startPos) {
  this.startPos = startPos;
  this.index = 0;
}
Planets.sprites = ["planet1.png",
                   "planet2.png",
                   "planet3.png",
                   "planet4.png",
                   "planet5.png",
                   "planet6.png",
                   "planet7.png",
                   "planet8.png"];
                   
Planets.prototype.setPlanetsSpriteIndex = function(index) {
  this.index = index;
};
Planets.prototype.getNextSprite = function() {
  return Planets.sprites[this.index];
};

var gSpaceObjects = new SpaceObjects();
