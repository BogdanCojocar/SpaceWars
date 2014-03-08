function Laser() {}
Laser.prototype.init = function() {};
Laser.prototype.move = function() {};
Laser.prototype.moveToAttack = function() {};
Laser.properties = {
  type: DynamicBody,
  linearDamping: 0.001,
  density: 10,
  friction: 0.001,
  restitution: 0.1,
  life: 1,
  speed: 2,
  radius: 1
};
Laser.isLaser = function(laser) {
  if (laser == null) return false;
  return typeof laser.init == 'function' &&
         typeof laser.moveToAttack == 'function';
};

function AlienLaser(startPos) {
  this.startPos = startPos;
  this.body = null;
  this.impulse = null;
  this.properties = null;
};
AlienLaser.sprite = "alien_laser.png";
AlienLaser.prototype.init = function() {
  this.properties = $.extend(true, {
                             damage: 1
                            }, Laser.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
AlienLaser.prototype.moveToAttack = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
AlienLaser.prototype.getNextSprite = function() {
  return AlienLaser.sprite;
};

function HumanLaser(startPos) {
  this.startPos = startPos;
  this.body = null;
  this.impulse = null;
  this.properties = null;
};
HumanLaser.sprite = "human_laser.png";
HumanLaser.prototype.init = function() {
  this.properties = $.extend(true, {
                             damage: 1
                            }, Laser.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
};
HumanLaser.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
HumanLaser.prototype.moveToAttack = function(damage) {
  this.properties.damage = damage;
};
HumanLaser.prototype.getNextSprite = function() {
  return HumanLaser.sprite;
};