$(function(){
  (new Topaz({
    fps:10,
    title:"Test Game!",
    ratio:1.77,
    start:function() {
      this.canvas.css('background-color','gray');
      this.addMob(new Mob({
        position:new Point(0,0),
        size:new Point(.1,.1)
      }));
      this.addMob(new Mob({
        color:'white',
        position:new Point(0,0),
        size:new Point(.05,.05)
      }));
    },
    // main:function() {
    //   console.log("Update!");
    // }
  })).init();
});
