//Adding random shit
var amountOfShit = 3;
var arrowCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
}
var step = 10;

var buttons = ["&rarr;", "&larr;", "&uarr;", "&darr;"];

//Add div button
$("<button/>")
    .text("Add Div")
    .appendTo($(".controlPanelClass"))
    .click(createDivWithButtons);

$("<button/>")
    .text("Activate all")
    .appendTo($(".controlPanelClass"))
    .click(activateAll);

$("<button/>")
    .text("Deactivate all")
    .appendTo($(".controlPanelClass"))
    .click(deactivateAll);

for (var i = 0; i <= amountOfShit; i++) {
    createDivWithButtons();
}

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
        .appendTo(createdDiv);
    $("<button/>")
        .text("Activate")
        .addClass("flyingShit")
        .appendTo(createdDiv)
        .click(elementActivation);
    $("<button/>")
        .text("Deactivate")
        .addClass("flyingShit")
        .appendTo(createdDiv)
        .click(elementDeactivation);
    var createdLabel = $("<label/>")
        .text("Delay")
            .appendTo(createdDiv);
    $("<input/>")
        .attr("type", "checkbox")
        .attr("checked",false)
        .addClass("checkBoxClass")
        .appendTo(createdLabel);
}

// Move items on button press
$("body").keydown(function (event) {
    if (checkActiveElement()) {
        switch (event.keyCode) {
            //MoveRight
            case arrowCodes.right:
                moveRight(event);
                break;
            //MoveLeft
            case arrowCodes.left:
                moveLeft();
                break;
            //MoveUp
            case arrowCodes.up:
                moveUp();
                break;
            //MoveDown
            case arrowCodes.down:
                moveDown();
                break;
        }
    }
});
// Move items on clicks
$(".buttonClass").click(function (event) {
    if (checkActiveElement()) {
        switch ($(event.target).attr("data-buttonDirection")) {
            //MoveRight
            case "&rarr;":
                moveRight(event);
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

function moveRight(event) {
    var currPos = $(event.target).parent().position().left;
    var newPos = currPos + step;
    $(event.target).parent().css({ "left": newPos });
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
//$(event.target).parent().find(".checkBoxClass").is(":checked")

function checkActiveElement() {
    var elementExists = $("[data-active = true]").length != 0;
    if (elementExists) {
        return true;
    }
    //alert("Click 'Activate' on any button");
    return false;

}

function elementActivation(event) {
    $(event.target).parent().attr("data-active", "true");
    $(event.target).parent().css({ "box-shadow": "0 0 10px red" });
    $(".buttonClass").removeAttr("disabled");
};

function elementDeactivation(event) {
    $(".divClass").removeAttr("data-active");
    $(event.target).parent().css({ "box-shadow": "" });
    $(".buttonClass").attr("disabled", "");
}

function activateAll() {
    $(".divClass").attr("data-active", "true").css({ "box-shadow": "0 0 10px red" });
    $(".buttonClass").removeAttr("disabled");
}

function deactivateAll() {
    $(".divClass").removeAttr("data-active");
    $(".divClass").css({ "box-shadow": "" });
    $(".buttonClass").attr("disabled", "");
}