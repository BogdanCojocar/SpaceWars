function HumanTower() {};
HumanTower.prototype.shot = function() {};
HumanTower.prototype.removeTower = function() {};
HumanTower.isHumanTower = function(humanTower) {
  if (humanTower == null) return false;
  return typeof humanTower.shot == 'function' &&
         typeof humanTower.removeTower == 'function';
};
HumanTower.properties = {
  type: StaticBody,
  userData: new HumanTower(),
  isSensor: false
};

function FirstHumanTower() {
  this.startPos = new Vec2D(0, 0);
  this.properties = null;
  this.body = null;
}
FirstHumanTower.sprite = "human_tower_1.png";
FirstHumanTower.prototype.init = function(startPos) {
  this.properties = $.extend(true, {
                              damage: 2,
                              radius: 0.9
                            }, HumanTower.properties);
  this.startPos = startPos;
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
FirstHumanTower.prototype.shot = function() {
  
};
FirstHumanTower.prototype.removeTower = function() {
  this.body.GetBody().GetWorld().DestroyBody(this.body);
};
FirstHumanTower.prototype.getNextSprite = function() {
  return FirstHumanTower.sprite; 
};

function SecondHumanTower() {
  this.startPos = new Vec2D(0,0);
  this.properties = null;
  this.body = null;
}
SecondHumanTower.sprite = "human_tower_2.png";
SecondHumanTower.prototype.init = function(startPos) {
  this.properties = $.extend(true, {
                              damage: 2,
                              radius: 0.9
                            }, HumanTower.properties);
  this.startPos = startPos;
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
SecondHumanTower.prototype.shot = function() {
  
};
SecondHumanTower.prototype.removeTower = function() {
  this.body.GetBody().GetWorld().DestroyBody(this.body);
};
SecondHumanTower.prototype.getNextSprite = function() {
  return SecondHumanTower.sprite; 
};

function ThirdHumanTower() {
  this.startPos = new Vec2D(0, 0);
  this.properties = null;
  this.body = null;
}
ThirdHumanTower.sprite = "human_tower_3.png";
ThirdHumanTower.prototype.init = function(startPos) {
  this.properties = $.extend(true, {
                              damage: 2,
                              radius: 0.9
                            }, HumanTower.properties);
  this.startPos = startPos;
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
ThirdHumanTower.prototype.shot = function() {
  
};
ThirdHumanTower.prototype.removeTower = function() {
  this.body.GetBody().GetWorld().DestroyBody(this.body);
};
ThirdHumanTower.prototype.getNextSprite = function() {
  return ThirdHumanTower.sprite; 
};

function FourthHumanTower() {
  this.startPos = new Vec2D(0,0);
  this.properties = null;
  this.body = null;
}
FourthHumanTower.sprite = "human_tower_4.png";
FourthHumanTower.prototype.init = function(startPos) {
  this.properties = $.extend(true, {
                              damage: 2,
                              radius: 0.9
                            }, AlienTower.properties);
  this.startPos = startPos;
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
FourthHumanTower.prototype.shot = function() {
  
};
FourthHumanTower.prototype.removeTower = function() {
  this.body.GetBody().GetWorld().DestroyBody(this.body);
};
FourthHumanTower.prototype.getNextSprite = function() {
  return FourthHumanTower.sprite; 
};

