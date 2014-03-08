function Log() {
  this.enable = true;	
}
Log.option = {
  INFO: 0,
  DEBUG: 1,
  ERROR: 2	
};
Log.prototype.message = function(str, type, trace) {
  if (str == null || type == null || trace == null) {
  	return;
  }
  if (this.enable === true) {
  	switch(type)
  	{
  	case Log.option.INFO:
  	  console.info(str);
  	  break;
  	case Log.option.DEBUG:
  	  console.debug(str);
  	  break;
  	case Log.option.ERROR:
  	  console.error(str);
  	  break;
  	}
  	if (trace === true) {
  	  console.trace();
  	}
  }
};
Log.prototype.enable = function() {
	this.enable = true;
};
Log.prototype.disable = function() {
	this.enable = false;
};
gLog = new Log();
