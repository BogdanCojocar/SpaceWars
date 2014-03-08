function AlienTower() {};
AlienTower.prototype.attack = function() {};
AlienTower.prototype.removeTower = function() {};
AlienTower.isAlienTower = function(alienTower) {
  if (alienTower == null) return false;
  return typeof alienTower.attack == 'function' &&
         typeof alienTower.removeTower == 'function';
};
AlienTower.properties = {
  type: StaticBody,
  userData: new AlienTower(),
  isSensor: false
};

function FirstAlienTower() {
  this.startPos = new Vec2D(0,0);
  this.properties = null;
  this.body = null;
}
FirstAlienTower.sprite = "alien_tower_1.png";
FirstAlienTower.prototype.init = function(startPos) {
  this.properties = $.extend(true, {
                              damage: 2,
                              radius: 0.9
                            }, AlienTower.properties);
  this.startPos = startPos;
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
FirstAlienTower.prototype.attack = function() {
  
};
FirstAlienTower.prototype.removeTower = function() {
  this.body.GetBody().GetWorld().DestroyBody(this.body);
};
FirstAlienTower.prototype.getNextSprite = function() {
  return FirstAlienTower.sprite; 
};

function SecondAlienTower() {
  this.startPos = new Vec2D(0,0);
  this.properties = null;
  this.body = null;
}
SecondAlienTower.sprite = "alien_tower_2.png";
SecondAlienTower.prototype.init = function(startPos) {
  this.properties = $.extend(true, {
                              damage: 2,
                              radius: 0.9
                            }, AlienTower.properties);
  this.startPos = startPos;
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
SecondAlienTower.prototype.attack = function() {
  
};
SecondAlienTower.prototype.removeTower = function() {
  this.body.GetBody().GetWorld().DestroyBody(this.body);
};
SecondAlienTower.prototype.getNextSprite = function() {
  return SecondAlienTower.sprite; 
};

function ThirdAlienTower() {
  this.startPos = new Vec2D(0, 0);
  this.properties = null;
  this.body = null;
}
ThirdAlienTower.sprite = "alien_tower_3.png";
ThirdAlienTower.prototype.init = function(startPos) {
  this.properties = $.extend(true, {
                              damage: 2,
                              radius: 0.9
                            }, AlienTower.properties);
  this.startPos = startPos;
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
ThirdAlienTower.prototype.attack = function() {
  
};
ThirdAlienTower.prototype.removeTower = function() {
  this.body.GetBody().GetWorld().DestroyBody(this.body);
};
ThirdAlienTower.prototype.getNextSprite = function() {
  return ThirdAlienTower.sprite; 
};

function FourthAlienTower() {
  this.startPos = new Vec2D(0,0);
  this.properties = null;
  this.body = null;
}
FourthAlienTower.sprite = "alien_tower_4.png";
FourthAlienTower.prototype.init = function(startPos) {
  this.properties = $.extend(true, {
                              damage: 2,
                              radius: 0.9
                            }, AlienTower.properties);
  this.startPos = startPos;
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
FourthAlienTower.prototype.attack = function() {
  
};
FourthAlienTower.prototype.removeTower = function() {
  this.body.GetBody().GetWorld().DestroyBody(this.body);
};
FourthAlienTower.prototype.getNextSprite = function() {
  return FourthAlienTower.sprite; 
};