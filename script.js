//Adding random shit
var amountOfShit = 3,
    step = 10,
    delay = 500;
var arrowCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
}

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
        .attr("checked", false)
        .attr("disabled", true)
        .addClass("checkBoxClass")
        .appendTo(createdLabel);
}

// Move items on button press
$("body").keydown(function (event) {
    if (checkActiveElement()) {
        switch (event.keyCode) {
            //MoveRight
            case arrowCodes.right:
                moveRight();
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
                if (checkDelay()) {
                    setTimeout(moveRight, delay);
                } else {
                    moveRight();
                }

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
//$($("[data-active = true]").get(i)).position().left;

function moveRight(event) {
    var i = 0, div = $("[data-active = true]");
    for (i; i < div.length; i++) {
        var currPos = $(div.get(i)).position().left;
        var newPos = currPos + step;
        $(div.get(i)).css({ "left": newPos });
    }
}

function moveLeft(event) {
    var i = 0, div = $("[data-active = true]");;
    for (i; i < div.length; i++) {
        var currPos = $(div.get(i)).position().left;
        var newPos = currPos - step;
        $(div.get(i)).css({ "left": newPos });
    }
}

function moveUp(event) {
    var i = 0, div = $("[data-active = true]");
    for (i; i < div.length; i++) {
        var currPos = $(div.get(i)).position().top;
        var newPos = currPos - step;
        $(div.get(i)).css({ "top": newPos });
    }
}

function moveDown(event) {
    var i = 0, div = $("[data-active = true]");;
    for (i; i < div.length; i++) {
        var currPos = $(div.get(i)).position().top;
        var newPos = currPos + step;
        $(div.get(i)).css({ "top": newPos });
    }
}

function randomCoord() {
    return (Math.random() / 2).toString().substring(2, 5) + "px";
};

//Check for active element
//$(event.target).parent().find(".checkBoxClass").is(":checked")

function checkActiveElement() {
    var elementExists = $("[data-active = true]") != 0;
    if (elementExists) {
        return true;
    }
    //alert("Click 'Activate' on any button");
    return false;

}

function elementActivation(event) {
    $(event.target)
        .parent()
        .attr("data-active", "true");
    $(event.target)
        .parent()
        .css({ "box-shadow": "0 0 10px red" });
    $(event.target)
        .parent()
        .find(".checkBoxClass")
        .attr("disabled", false);
    $(".buttonClass")
        .removeAttr("disabled");
};

function elementDeactivation(event) {
    $(event.target)
        .parent()
        .removeAttr("data-active");
    $(event.target)
        .parent()
        .css({ "box-shadow": "" });
    $(event.target)
        .parent()
        .find(".checkBoxClass")
        .attr("disabled", true);
    $(".buttonClass")
        .attr("disabled", "");
}

function activateAll() {
    $(".divClass")
        .attr("data-active", "true")
        .css({ "box-shadow": "0 0 10px red" });
    $(".buttonClass")
        .removeAttr("disabled");
    $(".checkBoxClass")
        .attr("disabled", false)
}

function deactivateAll() {
    $(".divClass").removeAttr("data-active");
    $(".divClass").css({ "box-shadow": "" });
    $(".buttonClass").attr("disabled", "");
    $(".checkBoxClass").attr("disabled", true)
}

function checkDelay() {
    return $("[data-active = true]").find(".checkBoxClass").is(":checked");
}