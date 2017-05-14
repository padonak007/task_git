//Adding frame
$("<div/>")
    .addClass("edgeBorder")
    .appendTo($("body"));

//Adding random shit
var amountOfShit = 3;
var arrows = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
}

var step = 10;

var buttons = ["&rarr;", "&larr;", "&uarr;", "&darr;"];

for (var i = 0; i <= amountOfShit; i++) {
    $("<div/>")
        .addClass("divClass")
        .css("top", randomCoord())
        .css("left", randomCoord())
        .attr("data-active", "false")
        .appendTo($(".edgeBorder"));
    $("<span/>")
        .text("Someshit" + i)
        .appendTo($("[data-active = false]").get(i));
}
//Adding arrow buttons

for (var i = 0; i < buttons.length; i++) {
    $("<button/>")
        .attr("data-buttonDirection", buttons[i])
        .addClass("buttonClass")
        .html(buttons[i])
        .appendTo($(".edgeBorder"));
}

//Adding "Active button"
$("<button/>")
    .text("Activate")
    .addClass("flyingShit")
    .appendTo($(".divClass"));
//Shit activation
$(".flyingShit").click(function (arg) {
    alert("Button:" + $(arg.target).parent().children("span").text() + " is activated");
    $(".divClass").removeAttr("data-active");
    $(arg.target.parentNode).attr("data-active", "true");
});

// Move items on button press
$("body").keydown(function (arg) {
    //var $active = $("[data-active = true]");
    //var pos = $active.position();
    switch (arg.keyCode) {
        //MoveRight
        case arrows.right:
            moveRight();
            break;
        //MoveLeft
        case arrows.left:
            moveLeft();
            break;
        //MoveUp
        case arrows.up:
            moveUp();
            break;
        //MoveDown
        case arrows.down:
            moveDown();
            break;
    }
});
// Move items on clicks
$(".buttonClass").click(function (arg){
    switch ($("[data-buttonDirection]").attr("data-buttonDirection")){
        //MoveRight
        case "&rarr;":
            moveRight();
            break;
        //MoveLeft
        case "&larr;":
            moveLeft();
            break;
        //MoveUp
        case "&uarr;":
            moveUp();
            break;
        //MoveDown
        case "&darr;":
            moveDown();
            break;
    }
});

function moveRight(arg) {
    if ($("[data-active = true]").length == 0){
        alert ("Click 'Activate' on any button")
    } else {
    var currPos = $("[data-active = true]").position().left;
    var newPos = currPos + step;
    $("[data-active = true]").css({ "left": newPos });
    }
}

function moveLeft(arg) {
    if ($("[data-active = true]").length == 0){
        alert ("Click 'Activate' on any button")
    } else {
    var currPos = $("[data-active = true]").position().left;
    var newPos = currPos - step;
    $("[data-active = true]").css({ "left": newPos });
    }
}

function moveUp(arg) {
    if ($("[data-active = true]").length == 0){
        alert ("Click 'Activate' on any button")
    } else {
    var currPos = $("[data-active = true]").position().top;
    var newPos = currPos - step;
    $("[data-active = true]").css({ "top": newPos });
    }
}

function moveDown(arg) {
    if ($("[data-active = true]").length == 0){
        alert ("Click 'Activate' on any button")
    } else {
    var currPos = $("[data-active = true]").position().top;
    var newPos = currPos + step;
    $("[data-active = true]").css({ "top": newPos });
    }
}

function randomCoord() {
    return (Math.random() / 2).toString().substring(2, 5) + "px";
};
