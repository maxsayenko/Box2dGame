//var box2d = require("ti.box2d");

var animation = require('alloy/animation');

// function doClick(e) {  
    // alert($.label.text);
// }
// 




// var window = Ti.UI.createWindow();
// var view = Ti.UI.createView();
// window.add(view);
// window.open();

$.index.open();

// load the module
var Box2D = require('ti.box2d');

// create the world, using view as the surface
var world = Box2D.createWorld($.index);


// create a block
var redBlock = Ti.UI.createView({
	backgroundColor: "red",
	width: 50,
	height: 50,
	top: 0
});

var blueBall = Ti.UI.createView({
	backgroundColor: "blue",
	borderRadius: 15,
	width: 30,
	height: 30,
	top: 10
});


var greyLine = Ti.UI.createView({
	backgroundColor: "black",
	width: 200,
	height: 5,
	top: 300,
	left: 0
});



//$.index.add(redBlock);


redBlock.addEventListener('click', function(e){
	//alert("boo");
	//animation.shake(redBlock);
	
	 // var matrix = Ti.UI.create2DMatrix()
  // matrix = matrix.rotate(180);
  // matrix = matrix.scale(2, 2);
  // var a = Ti.UI.createAnimation({
    // transform : matrix,
    // duration : 2000,
    // autoreverse : true,
    // repeat : 3
  // });
  // redBlock.animate(a);
  
   var t1 = Ti.UI.create3DMatrix();
  t1 = t1.translate(0, 100, 200);
  t1.m34 = 1.0/-90;
  var a1 = Ti.UI.createAnimation();
  a1.transform = t1;
  a1.duration = 800;
  redBlock.animate(a1);
  
});

// add the block body to the world
var redBodyRef = world.addBody(redBlock, {
	density: 12.0,
	friction: 0.3,
	restitution: 0.4,
	type: "dynamic"
});

// add the ball body to the world
// var blueBodyRef = world.addBody(blueBall, {
	// radius: 15,
	// density: 12.0,
	// friction: 0.3,
	// restitution: 0.4,
	// type: "static"
// });


var ground = world.addBody(greyLine, {
	density: 12.0,
	friction: 0.3,
	restitution: 0.4,
	type: "static"
});



function setAngle()
{
	ground.setAngle(85);
	
	//add the ball body to the world
	var blueBodyRef = world.addBody(blueBall, {
		radius: 15,
		density: 50.0,
		friction: 0.3,
		restitution: 0.4,
		type: "dynamic"
	});
	
	world.setGravity(0, 1);
}


Ti.Gesture.addEventListener('orientationchange', function(e) {
if (e.orientation == Titanium.UI.LANDSCAPE_LEFT) {
world.setGravity(9.91, 0);
} else if (e.orientation == Titanium.UI.LANDSCAPE_RIGHT) {
world.setGravity(-9.91, 0);
} else if (e.orientation == Titanium.UI.UPSIDE_PORTRAIT) {
world.setGravity(0, 9.91);
} else if (e.orientation == Titanium.UI.PORTRAIT) {
world.setGravity(0, -9.91);
}
});

world.addEventListener("collision", function(e) {
if ((e.a == redBodyRef || e.b == redBodyRef) && e.phase == "begin") {
Ti.API.info("the red block collided with something");

Ti.API.info(JSON.stringify(e));
Ti.Media.vibrate();
}
});

// start the world
world.start();
