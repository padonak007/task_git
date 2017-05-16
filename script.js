//Adding frame
$("<div/>")
    .addClass("edgeBorder")
    .appendTo($("body"));

//Add div button
$("<button/>")
    .text("Add Div")
    .appendTo($(".edgeBorder"))
    .click(function (event) {
        createDivWithButtons();
    });

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
    createDivWithButtons();
}

$(".buttonClass").appendTo($(".edgeBorder"));
//Adding activation button

function createDivWithButtons() {
    var createdDiv = $("<div/>")
        .addClass("divClass")
        .css("top", randomCoord())
        .css("left", randomCoord())
        .attr("data-active", "false")
        .appendTo($(".edgeBorder"))
    $("<span/>")
        .text("Someshit")
        .appendTo($(createdDiv));
    $("<button/>")
        .text("Activate")
        .addClass("flyingShit")
        .appendTo($(createdDiv))
        .click(function (event) {
            $(".divClass").removeAttr("data-active");
            $(event.target).parent().attr("data-active", "true");
            $(event.target).parent().css({ "box-shadow": "0 0 10px red" })
            $(".buttonClass").removeAttr("disabled");
        });
    $("<button/>")
        .text("Deactivate")
        .addClass("flyingShit")
        .appendTo($(createdDiv))
        .click(function (event) {
            $(".divClass").removeAttr("data-active");
            $(event.target).parent().css({ "box-shadow": "" });
            $(".buttonClass").attr("disabled","");
        });
}

// Move items on button press
$("body").keydown(function (arg) {
    if (checkActiveElement()) {
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
    }
});
// Move items on clicks
$(".buttonClass").click(function (arg) {
    if (checkActiveElement()) {
        switch ($(arg.target).attr("data-buttonDirection")) {
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
    }
});

function moveRight(arg) {
    var currPos = $("[data-active = true]").position().left;
    var newPos = currPos + step;
    $("[data-active = true]").css({ "left": newPos });
}

function moveLeft(arg) {
    var currPos = $("[data-active = true]").position().left;
    var newPos = currPos - step;
    $("[data-active = true]").css({ "left": newPos });
}

function moveUp(arg) {
    var currPos = $("[data-active = true]").position().top;
    var newPos = currPos - step;
    $("[data-active = true]").css({ "top": newPos });

}

function moveDown(arg) {
    var currPos = $("[data-active = true]").position().top;
    var newPos = currPos + step;
    $("[data-active = true]").css({ "top": newPos });
}

function randomCoord() {
    return (Math.random() / 2).toString().substring(2, 5) + "px";
};

//Check for active element

function checkActiveElement() {
    var elementExists = $("[data-active = true]").length != 0;
    if (elementExists) {
        return true;
    }
    //alert("Click 'Activate' on any button");
    return false;

}

function elementActivation(event) {
    alert("Button:" + $(event.target).parent().children("span").text() + " is activated");
    $(".divClass").removeAttr("data-active");
    $(event.target.parentNode).attr("data-active", "true");
};