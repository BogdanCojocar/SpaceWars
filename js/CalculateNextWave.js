/**
 * Calculates the next wave of oponents. 
 * @author Bogdan
 */
function HandleNextWave() {
  this.maxNrOfWaves = 100;
  this.currentWave = 0;
  this.newWaveAvailable = false;
  this.nrOfCreaturesForWave = 5;
  this.currentNrOfCreatures = 0;
  this.warpNewThresh = 100;
  this.lastCreatureCreated = null;
  this.startPos = null;
}
HandleNextWave.typeOfAlien = {
  CRAB: 0,
  BIG: 1,
  GREEN: 2,
  INSECT: 3
};
HandleNextWave.typeOfHuman = { 
  LARGE: 0,
  ROUND: 1,
  SQUARE: 2,
  SMALL: 3
};
HandleNextWave.wavePositions = {
  startPos: new Vec2D(0, 0),
  //intermPos: [new Vec2D(200, 200)],
  endPos: new Vec2D(1000, 500)
};
HandleNextWave.prototype.init = function(level) {
  switch (level) {
    case Common.level.LEVEL1:
      HandleNextWave.wavePositions.startPos = new Vec2D(30, 30);
      this.startPos = HandleNextWave.wavePositions.startPos;
      //HandleNextWave.wavePositions.intermPos.push(new Vec2D(300, 150));
      //HandleNextWave.wavePositions.intermPos.push(new Vec2D(700, 400));
      HandleNextWave.wavePositions.endPos = new Vec2D(1200, 550);
      break;
  }
};
HandleNextWave.prototype.handleWave = function(game_objects, player)
{
  var addNewCreature = false;
  if (this.lastCreatureCreated == null) {
    addNewCreature = true;
  } else {
    var pos = this.lastCreatureCreated.body.GetBody().GetPosition();
    //pos.x *= gGamePhysics.scale;
    if (Common.posIsReached(pos.x, this.warpNewThresh)) {
      if (this.currentNrOfCreatures < this.nrOfCreaturesForWave - 1) {
        addNewCreature = true; 
        this.currentNrOfCreatures++;
      } else { // new wave
        this.currentNrOfCreatures = 0;
        this.lastCreatureCreated = null;
        addNewCreature = false;
        if (this.currentWave < this.maxNrOfWaves) {
          this.currentWave++;
        }
        // after four waves we increase the number of creatures for a wave
        if (this.currentWave % 4 === 0) { 
          this.nrOfCreaturesForWave++;
        }
      } 
    }
  }
  if (addNewCreature) {
    addNewCreature = false;
    this.lastCreatureCreated = player === Common.player.FIRST_PLAYER ? 
                               this.getNextAlienCreature() : this.getNextHumanCreature();
    if (this.lastCreatureCreated != null) {
      this.lastCreatureCreated.init();
      this.lastCreatureCreated.move(HandleNextWave.wavePositions.endPos);
      game_objects.push(this.lastCreatureCreated);
    }
  }
  //this.removeFromDest(game_objects);
};
HandleNextWave.prototype.removeFromDest = function(game_objects) {
  var endPos = HandleNextWave.wavePositions.endPos;
  
  for (var i = 0; i < game_objects.length; ++i) {
    var game_object = game_objects[i];
    if (Alien.isAlien(game_object) || Human.isHuman(game_object)) {
      var pos = game_object.body.GetBody().GetPosition();
      //pos.x *= gGamePhysics.scale;
      if (Common.posIsReached(pos.x, endPos.x)) {
        game_objects[i].destroy();
        game_objects.splice(i, 1);
      }
    }
  }
};
HandleNextWave.prototype.getNextAlienCreature = function() {
  nextCreature = null;
  switch(this.currentWave % 4) {
    case HandleNextWave.typeOfAlien.CRAB:
      nextCreature = new CrabAlien(this.startPos);
      break;
    case HandleNextWave.typeOfAlien.BIG:
      nextCreature = new BigAlien(this.startPos);
      break;
    case HandleNextWave.typeOfAlien.GREEN:
      nextCreature = new GreenAlien(this.startPos);
      break;
    case HandleNextWave.typeOfAlien.INSECT:
      nextCreature = new InsectAlien(this.startPos);
      break;
  }
  return nextCreature;
};
HandleNextWave.prototype.getNextHumanCreature = function() { 
  nextCreature = null;
  switch(this.currentWave % 4) {
    case HandleNextWave.typeOfHuman.LARGE:
      nextCreature = new LargeHuman(this.startPos);
      break;
    case HandleNextWave.typeOfHuman.ROUND:
      nextCreature = new RoundHuman(this.startPos);
      break;
    case HandleNextWave.typeOfHuman.SQUARE:
      nextCreature = new SquareHuman(this.startPos);
      break;
    case HandleNextWave.typeOfHuman.SMALL:
      nextCreature = new SmallHuman(this.startPos);
      break;
  }
  return nextCreature;
};

var gHandleNextWave = new HandleNextWave();
