// Main framewor
function Topaz(data) {
  for (var key in data) this[key] = data[key];
  if(this.title) document.title = this.title;
  if(!this.ratio) this.ratio = 1;
  if(!this.fps) this.fps = 30;
  this.height = $(window).height();
  this.width = this.height*this.ratio;
  this.canvas = $('<canvas>');
  this.canvas.attr('width',this.width);
  this.canvas.attr('height',this.height);
  this.cv = this.canvas[0].getContext('2d');
  this.cv.translate(this.width/2,this.height/2);
  this.cv.globalCompositeOperation = 'source-over';
  this.mobs = new Array();
  this.key = new Array();
  this.sleep = 1000/this.fps;
}
Topaz.prototype.init = function() {
  var game = this;
  $(this.canvas).on({ keydown:function(e){ game.key[e.keyCode] = true; }, keyup:function(e){ game.key[e.keyCode] = false; }, });
  this.id = setInterval(function(){ game.update(); game.draw(); }, this.sleep);
  if(this.start) this.start();
  $('body').html(this.canvas);
}
Topaz.prototype.update = function() {
  if(this.main) this.main();
  for(var i in this.mobs) if(this.mobs[i].update) this.mobs[i].update();
}
Topaz.prototype.draw = function() {
  this.cv.clearRect(-this.width/2,-this.height/2,this.width,this.height);
  for(var i in this.mobs) this.mobs[i].draw(this.cv,this.height);
}
Topaz.prototype.addMob = function(mob) { this.mobs.push(mob); }
// Mob!
function Mob(data) {
  for (var key in data) this[key] = data[key];
  if(!this.position) this.position = new XY(0,0);
  if(!this.size) this.size = new XY(0,0);
}
Mob.prototype.draw = function(cv,unit) {
  if(this.color) cv.fillStyle = this.color;
  else cv.fillStyle = "black";
  cv.fillRect(this.position.x*unit-this.size.x*unit/2,this.position.y*unit-this.size.y*unit/2,this.size.x*unit,this.size.y*unit);
}
// XY!
function XY(x,y) { this.x = x; this.y = y; }
XY.prototype.getArray = function() { return [this.x,this.y]; }
XY.prototype.toString = function(){ return "("+this.x+","+this.y+")"; }
