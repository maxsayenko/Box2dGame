function Controller() {
    function setAngle() {
        ground.setAngle(85);
        world.addBody(blueBall, {
            radius: 15,
            density: 50,
            friction: .3,
            restitution: .4,
            type: "dynamic"
        });
        world.setGravity(0, 1);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Hello, World",
        id: "label"
    });
    $.__views.index.add($.__views.label);
    $.__views.angleBtn = Ti.UI.createButton({
        title: "Change Angle",
        id: "angleBtn",
        top: "0",
        left: "0"
    });
    $.__views.index.add($.__views.angleBtn);
    setAngle ? $.__views.angleBtn.addEventListener("click", setAngle) : __defers["$.__views.angleBtn!click!setAngle"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy/animation");
    $.index.open();
    var Box2D = require("ti.box2d");
    var world = Box2D.createWorld($.index);
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
    redBlock.addEventListener("click", function() {
        var t1 = Ti.UI.create3DMatrix();
        t1 = t1.translate(0, 100, 200);
        t1.m34 = 1 / -90;
        var a1 = Ti.UI.createAnimation();
        a1.transform = t1;
        a1.duration = 800;
        redBlock.animate(a1);
    });
    var redBodyRef = world.addBody(redBlock, {
        density: 12,
        friction: .3,
        restitution: .4,
        type: "dynamic"
    });
    var ground = world.addBody(greyLine, {
        density: 12,
        friction: .3,
        restitution: .4,
        type: "static"
    });
    Ti.Gesture.addEventListener("orientationchange", function(e) {
        e.orientation == Titanium.UI.LANDSCAPE_LEFT ? world.setGravity(9.91, 0) : e.orientation == Titanium.UI.LANDSCAPE_RIGHT ? world.setGravity(-9.91, 0) : e.orientation == Titanium.UI.UPSIDE_PORTRAIT ? world.setGravity(0, 9.91) : e.orientation == Titanium.UI.PORTRAIT && world.setGravity(0, -9.91);
    });
    world.addEventListener("collision", function(e) {
        if ((e.a == redBodyRef || e.b == redBodyRef) && "begin" == e.phase) {
            Ti.API.info("the red block collided with something");
            Ti.API.info(JSON.stringify(e));
            Ti.Media.vibrate();
        }
    });
    world.start();
    __defers["$.__views.angleBtn!click!setAngle"] && $.__views.angleBtn.addEventListener("click", setAngle);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;