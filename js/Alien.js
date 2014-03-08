/**
 * @author Bogdan
 */
function Alien() {};
Alien.prototype.init = function() {};
Alien.prototype.move = function() {};
Alien.prototype.destroy = function() {};
Alien.isAlien = function(alien) {
  if (alien == null) return false;
  return typeof alien.init == 'function' &&
         typeof alien.move == 'function' &&
         typeof alien.destroy == 'function';
};    
Alien.properties = {
  type: DynamicBody,
  linearDamping: 0,
  gravityScale: 0,
  density: 10,
  friction: 0,
  restitution: 0,
  userData: new Alien(),
  isSensor: false
};

function CrabAlien(startPos) {
  this.startPos = startPos;
  this.properties = null;
  this.body = null; 
  this.impulse = null;
}
CrabAlien.sprites = [];
CrabAlien.prototype.init = function() {
  this.properties = $.extend(true, {
                              life: 3,
                              speed: 1,
                              damage: 1,
                              radius: 0.1 
                             }, Alien.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
  if (CrabAlien.sprites.length === 0) {
    CrabAlien.sprites = Common.getSpritePath("alien_1", 8, Common.pathGenWithCardinalDirections);
  }
};
CrabAlien.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  //this.startPos = endPos;
};
CrabAlien.prototype.destroy = function()
{
  if (this.body == null) {
  	return;
  }	
  this.body.GetBody().GetWorld().DestroyBody(this.body);
  this.body = null;
};
CrabAlien.prototype.getNextSprite = function() {
  return CrabAlien.sprites[0];
};

function BigAlien (startPos) {
  this.startPos = startPos;
  this.properties = null;
  this.body = null; 
  this.impulse = null;
}
BigAlien.sprites = [];
BigAlien.prototype.init = function() {
  this.properties = $.extend(true, {
                              life: 5,
                              speed: 1,
                              damage: 0.7,
                              radius: 0.12 
                             }, Alien.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
  if (BigAlien.sprites.length === 0) {
    BigAlien.sprites = Common.getSpritePath("alien_2", 8, Common.pathGenWithCardinalDirections);
  }
};
BigAlien.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
BigAlien.prototype.destroy = function()
{
  if (this.body == null) {
    return;
  } 
  this.body.GetBody().GetWorld().DestroyBody(this.body);
  this.body = null;
};
BigAlien.prototype.getNextSprite = function() {
  return BigAlien.sprites[4];
};

function GreenAlien(startPos) {
  this.startPos = startPos;
  this.properties = null;
  this.body = null; 
  this.impulse = null;
}
GreenAlien.sprites = [];
GreenAlien.prototype.init = function() {
  this.properties = $.extend(true, {
                              life: 2,
                              speed: 0.7,
                              damage: 0.7,
                              radius: 0.12 
                             }, Alien.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
  if (GreenAlien.sprites.length === 0) {
    GreenAlien.sprites = Common.getSpritePath("alien_3", 8, Common.pathGenWithCardinalDirections);
  }
};
GreenAlien.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
GreenAlien.prototype.destroy = function()
{
  if (this.body == null) {
    return;
  } 
  this.body.GetBody().GetWorld().DestroyBody(this.body);
  this.body = null;
};
GreenAlien.prototype.getNextSprite = function() {
  return GreenAlien.sprites[4];
};

function InsectAlien(startPos) {
  this.startPos = startPos;
  this.properties = null;
  this.body = null; 
  this.impulse = null;
}
InsectAlien.sprites = [];
InsectAlien.prototype.init = function() {
  this.properties = $.extend(true, {
                              life: 1,
                              speed: 1,
                              damage: 0.8,
                              radius: 0.2 
                             }, Alien.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
  if (InsectAlien.sprites.length === 0) {
    InsectAlien.sprites = Common.getSpritePath("alien_4", 8, Common.pathGenWithCardinalDirections);
  }
};
InsectAlien.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
InsectAlien.prototype.destroy = function()
{
  if (this.body == null) {
    return;
  } 
  this.body.GetBody().GetWorld().DestroyBody(this.body);
  this.body = null;
};
InsectAlien.prototype.getNextSprite = function() {
  return InsectAlien.sprites[4];
};
