/**
 * @author Bogdan
 */
function Human() {}
Human.prototype.init = function() {};
Human.prototype.fly = function() {};
Human.prototype.fire = function() {};
Human.isHuman = function(human) {
  return typeof human.init == 'function' &&
         typeof human.fly == 'function' &&
         typeof human.fire == 'function';
};
Human.properties = {
  type: DynamicBody,
  linearDamping: 0,
  gravityScale: 0,
  density: 10,
  friction: 0,
  restitution: 0,
  userData: new Human(),
  isSensor: false
};

function LargeHuman(startPos) {
  this.startPos = startPos;
  this.properties = null;
  this.body = null; 
  this.impulse = null;
}
LargeHuman.sprites = [];
LargeHuman.prototype.init = function() {
  this.properties = $.extend(true, {
                              life: 5,
                              speed: 0.7,
                              damage: 1,
                              radius: 0.1 
                             }, Human.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
  if (LargeHuman.sprites.length === 0) {
    LargeHuman.sprites = Common.getSpritePath("ship_1", 8, Common.pathGenWithCardinalDirections);
  }
};
LargeHuman.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
LargeHuman.prototype.destroy = function()
{
  if (this.body == null) {
    return;
  } 
  this.body.GetBody().GetWorld().DestroyBody(this.body);
  this.body = null;
};
LargeHuman.prototype.getNextSprite = function() {
  return LargeHuman.sprites[0];
};
LargeHuman.prototype.fly = function() {};
LargeHuman.prototype.fire = function() {};

function RoundHuman(startPos) {
  this.startPos = startPos;
  this.properties = null;
  this.body = null; 
  this.impulse = null;
}
RoundHuman.sprites = [];
RoundHuman.prototype.init = function() {
  this.properties = $.extend(true, {
                              life: 3,
                              speed: 0.5,
                              damage: 1,
                              radius: 0.1 
                             }, Human.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
  if (RoundHuman.sprites.length === 0) {
    RoundHuman.sprites = Common.getSpritePath("ship_2", 8, Common.pathGenWithCardinalDirections);
  }
};
RoundHuman.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
RoundHuman.prototype.destroy = function()
{
  if (this.body == null) {
    return;
  } 
  this.body.GetBody().GetWorld().DestroyBody(this.body);
  this.body = null;
};
RoundHuman.prototype.getNextSprite = function() {
  return RoundHuman.sprites[0];
};
RoundHuman.prototype.fly = function() {};
RoundHuman.prototype.fire = function() {};

function SquareHuman(startPos) {
  this.startPos = startPos;
  this.properties = null;
  this.body = null; 
  this.impulse = null;
}
SquareHuman.sprites = [];
SquareHuman.prototype.init = function() {
  this.properties = $.extend(true, {
                              life: 2,
                              speed: 0.7,
                              damage: 1,
                              radius: 0.12 
                             }, Human.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
  if (SquareHuman.sprites.length === 0) {
    SquareHuman.sprites = Common.getSpritePath("ship_3", 8, Common.pathGenWithCardinalDirections);
  }
};
SquareHuman.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
SquareHuman.prototype.destroy = function()
{
  if (this.body == null) {
    return;
  } 
  this.body.GetBody().GetWorld().DestroyBody(this.body);
  this.body = null;
};
SquareHuman.prototype.getNextSprite = function() {
  return SquareHuman.sprites[0];
};
SquareHuman.prototype.fly = function() {};
SquareHuman.prototype.fire = function() {};

function SmallHuman(startPos) {
  this.startPos = startPos;
  this.properties = null;
  this.body = null; 
  this.impulse = null;
}
SmallHuman.sprites = [];
SmallHuman.prototype.init = function() {
  this.properties = $.extend(true, {
                              life: 1,
                              speed: 1,
                              damage: 1,
                              radius: 0.13
                             }, Human.properties);
  this.body = gGamePhysics.addBody(this.startPos.x, this.startPos.y, this.properties);
  if (SmallHuman.sprites.length === 0) {
    SmallHuman.sprites = Common.getSpritePath("ship_4", 8, Common.pathGenWithCardinalDirections);
  }
};
SmallHuman.prototype.move = function(endPos) {
  this.impulse = gGamePhysics.createImpulse(this.startPos, endPos, this.properties.speed);
  this.startPos = endPos;
};
SmallHuman.prototype.destroy = function()
{
  if (this.body == null) {
    return;
  } 
  this.body.GetBody().GetWorld().DestroyBody(this.body);
  this.body = null;
};
SmallHuman.prototype.getNextSprite = function() {
  return SmallHuman.sprites[0];
};
SmallHuman.prototype.fly = function() {};
SmallHuman.prototype.fire = function() {};