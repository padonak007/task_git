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

for (var i = 0; i <= amountOfShit; i++) {
    $("<div/>")
        .addClass("divClass")
        .css("top", randomCoord())
        .css("left", randomCoord())
        .text("Someshit" + i)
        .attr("data-active", "false")
        .appendTo($(".edgeBorder"));
}
//Adding arrow buttons
var buttons = ["&rarr;", "&larr;", "&uarr;", "&darr;"];
for (var i = 0; i < buttons.length; i++) {
    $("<button/>")
        .attr("id", "buttonRight")
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
    alert("Button:" + event.target.parentElement.innerText + " is activated");
    $(".divClass").removeAttr("data-active");
    $(event.target.parentNode).attr("data-active", "true");
});

$("body").keydown(function (arg) {
    var $active = $("[data-active = true]");
    switch (arg.keyCode) {
        //MoveRight
        case arrows.right:
            var currPos = $active.position().left;
            var newPos = (currPos + step);
            $active.css({ "left": newPos });
            break;
        //MoveLeft
        case arrows.left:
            var currPos = $active.position().left;
            var newPos = (currPos - step);
            $active.css({ "left": newPos });
            break;
        //MoveUp
        case arrows.up:
            var currPos = $active.position().top;
            var newPos = (currPos - step);
            $active.css({ "top": newPos });
            break;
        //MoveDown
        case arrows.down:
            var currPos = $active.position().top;
            var newPos = (currPos + step);
            $active.css({ "top": newPos });
            break;
    }
});

function randomCoord() {
    return (Math.random() / 2).toString().substring(2, 5) + "px";
}