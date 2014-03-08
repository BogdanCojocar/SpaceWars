function GamePhysics() {
  this.world = null;
  this.world_width = 0; // meters
  this.world_height = 10;
  this.scale = 0; // Box2D -> Canvas
}
GamePhysics.FPS = 60;
GamePhysics.prototype.init = function() {
  // Game in space -> no gravity.
  var gravity = new Vec2D(0, 0);
  var sleep = false;
  this.world = new World(gravity, sleep);
  
  // calculate the scale and the world_width dinamically based on the canvas dimensions
  this.scale = gGameRendering.canvas.height / this.world_height;
  this.world_width = gGameRendering.canvas.width / this.scale;
  //this.addColisionDetection();	
};
GamePhysics.prototype.update = function(game_objects) {
  this.move(game_objects);
  //this.removeBodys(game_objects);
  this.world.Step(1 / GamePhysics.FPS, 10, 10);
  this.world.ClearForces();
};
GamePhysics.prototype.addBody = function(x, y, property) {
  var bodyDef = new BodyDef;
  var fixtureDef = new FixtureDef;
  
  bodyDef.position.Set(x / this.scale, y / this.scale);
  bodyDef.type = property.type;
  if (property.linearDamping != null) bodyDef.linearDamping = property.linearDamping;
  if (property.angularDamping != null) bodyDef.angularDamping = property.angularDamping;
  if (property.fixedRotation != null) bodyDef.fixedRotation = property.fixedRotation;
  if (property.gravityScale != null) bodyDef.gravityScale = property.gravityScale;
  
  if (property.density != null) fixtureDef.density = property.density;
  if (property.friction != null) fixtureDef.friction = property.friction;
  if (property.restitution != null) fixtureDef.restitution = property.restitution;
  if (property.userData != null) fixtureDef.userData = property.userData;
  if (property.isSensor != null) fixtureDef.isSensor = property.isSensor;
  circleShape = new CircleShape();
  circleShape.SetLocalPosition(new Vec2D(0, 0));
  circleShape.SetRadius(property.radius);
  fixtureDef.shape = circleShape;
  
  if (this.world === null) {
  	gLog.message("Physics world is not yet initialized.", Log.option.ERROR, false);
  } else {
    return this.world.CreateBody(bodyDef).CreateFixture(fixtureDef);	
  }
};
GamePhysics.prototype.move = function(game_objects) {
  for (var i = 0; i < game_objects.length; ++i) {
    var game_object = game_objects[i];
    if (game_object.body == null || typeof game_object.body === "undefined") {
      continue;
    }
    var body = game_object.body.GetBody();
    var pos = game_object.body.GetBody().GetPosition();
    if (body.GetType() === DynamicBody) {
      body.SetLinearVelocity(game_object.impulse); 
    }
  }
};
GamePhysics.prototype.createImpulse = function(startPos, endPos, speed) {
  delta = new Vec2D(endPos.x - startPos.x, endPos.y - startPos.y); 
  delta.x = delta.x / this.scale;
  delta.y = delta.y / this.scale;
  angle = Math.atan2(delta.y, delta.x);
  direction = new Vec2D(Math.cos(angle), Math.sin(angle));
  return new Vec2D(speed * direction.x, speed * direction.y);
};
GamePhysics.prototype.removeBodys = function(game_objects) {
  for (var i = 0; i < game_objects.length; ++i) {
    var game_object = game_objects[i];
    if (game_object.body == null || typeof game_object.body === "undefined") {
      continue;
    }
    var pos = game_object.body.GetBody().GetPosition(); 
    //pos.x *= this.scale;
    //pos.y *= this.scale;
    if (Common.posIsReached(pos.x, 1) ||
        Common.posIsReached(pos.y, 1) ||
        Common.posIsReached(pos.x, 1400) ||
        Common.posIsReached(pos.x, 700)) {
      game_object.destroy();
      game_objects.splice(i, 1); 
    }
  } 
};
GamePhysics.prototype.convertToPolar = function(x1, y1, x2, y2) {
  var deltaX = x1 - x2;
  var deltaY = y1 - y2;
  var angle = Math.atan2((deltaY / deltaX) * (180 / Math.PI));
  if ((deltaX < 0 && deltaY >= 0) || (deltaX < 0 && deltaY < 0)) {
  	angle += 180;
  } else if (deltaX > 0 && deltaY < 0) {
  	angle += 360;
  }
  return angle;
};
GamePhysics.prototype.getSpriteIndex = function(posObj1X, posObj1Y, posObj2X, posObj2Y) {
  if (typeof posObj1X !== 'number' || typeof posObj1Y !== 'number' ||
      typeof posObj2X !== 'number' || typeof posObj2Y !== 'number') {
    gLog.message("Invalid input.", Log.option.ERROR, false);
    return;
  }
  var angle = this.convertToPolar(posObj1X, posObj1Y, posObj2X, posObj2Y);
  var index = null;
  if (angle >= 67 && angle < 113) { // N
  	index = 0;
  } else if (angle >= 23 && angle < 67) { // NE
  	index = 1;
  } else if ((angle < 23 && angle >= 0) || (angle >= 337 && angle <= 360)) { // E
  	index = 2;
  } else if (angle < 337 && angle >= 293) { // SE
  	index = 3;
  } else if (angle >= 247 && angle < 293) { // S
    index = 4;	
  } else if (angle >= 203 && angle < 247) { // SW
  	index = 5;
  } else if (angle >= 157 && angle < 203) { // W
  	index = 6;
  } else if (angle >= 113 && angle < 157) { // NW
  	index = 7;
  }
  if (index == null) {
  	gLog.message("Something went wrong while converting to polar coordinates.", Log.option.ERROR, false);
  	return;
  }
  return index;
};
GamePhysics.prototype.addColisionDetection = function(callback) {
  var contactListener = new Box2D.Dynamics.b2ContactListener;
  var self = this;
  contactListener.BeginContact = function(contact) {
    var objA = contact.GetFixtureA().GetUserData();
    var objB = contact.GetFixtureB().GetUserData();
    var posA = Common.posBox2DToCanvas(contact.GetFixtureA().GetBody().GetPosition(), self.scale);
    var posB = Common.posBox2DToCanvas(contact.GetFixtureB().GetBody().GetPosition(), self.scale);
    if (Alien.isAlien(objA) && HumanTower.isHumanTower(objB)) {
      callback.startAttackAlien(posA, posB);
    }
    if (Human.isHuman(objA) && AlienTower.isAlienTower(objB)) {
      callback.startAttackHuman(posA, posB);
    }
  };
  this.world.SetContactListener(contactListener);
};
var Vec2D = Box2D.Common.Math.b2Vec2,
    World = Box2D.Dynamics.b2World,
    Body = Box2D.Dynamics.b2Body,
    CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    BodyDef = Box2D.Dynamics.b2BodyDef,
    FixtureDef = Box2D.Dynamics.b2FixtureDef,
    DynamicBody = Box2D.Dynamics.b2Body.b2_dynamicBody,
    StaticBody = Box2D.Dynamics.b2Body.b2_staticBody;
    
var gGamePhysics = new GamePhysics();
