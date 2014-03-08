function Explosion() {}

function ShipExplosion(startPos) {
  this.index = 0;
  this.startPos = startPos;
}
ShipExplosion.sprites = [];
ShipExplosion.prototype.init = function() {
  // Sprite names are loaded only once.
  if (ShipExplosion.sprites.length === 0){
    ShipExplosion.sprites = Common.getSpritePath("expl_01_00", 24, Common.pathGenWithNumbers);
  }
};
ShipExplosion.prototype.getNextSprite = function() {
  var numberOfSprites = ShipExplosion.sprites.length;
  if (numberOfSprites === 0) {
    return null;
  }
  if (this.spriteIndex === numberOfSprites) {
    this.spriteIndex = 0;
  }
  return ShipExplosion.sprites[this.spriteIndex++];
};