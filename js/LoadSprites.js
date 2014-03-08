function LoadSprites() {
  this.path = "sprites/sprites.json";
  this.sprites = {};
  this.loadFinished = false;
}
LoadSprites.prototype.load = function() {
  var self = this;
  $.ajaxSetup( { "async": false } );
  $.getJSON(this.path, function(data) {
  	gLog.message(data, Log.option.DEBUG, false);
  })
  .done(function(data) {
  	self.parseJsonData(data.frames);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
  	gLog.message("Error while parsing the JSON sprites file: " + textStatus, Log.option.ERROR, false);
  });
};
LoadSprites.prototype.parseJsonData = function(jsonData) {
  for (index in jsonData) {
    var parsedData = {
      x: 0,
	    y: 0,
	    cx: 0,
	    cy: 0,
	    width: 0,
	    height: 0
    };
  	var spriteData = jsonData[index];
  	
  	parsedData.x = spriteData.frame.x;
  	parsedData.y = spriteData.frame.y;
  	parsedData.width = spriteData.frame.w;
  	parsedData.height = spriteData.frame.h;
  	// Calculate the center of the sprite
  	if (spriteData.trimmed) {
  	  parsedData.cx = spriteData.spriteSourceSize.x - (spriteData.sourceSize.w * 0.5);
  	  parsedData.cy = spriteData.spriteSourceSize.y - (spriteData.sourceSize.h * 0.5);	
  	} else {
  	  parsedData.cx = -parsedData.width * 0.5;
      parsedData.cy = -parsedData.height * 0.5;
  	}
  	this.sprites[spriteData.filename] = parsedData;
  }
  gLog.message(this.sprites, Log.option.DEBUG, false);
};
var gLoadSprites = new LoadSprites();
