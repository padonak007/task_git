//Adding random shit
var amountOfShit = 3,
    step = 10,
    delay = 500;
var arrowCodes = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
};

var buttonCodes = {
    left:"&larr;",
    up:"&uarr;",
    right:"&rarr;",
    down:"&darr;",
};

var direction = {
    up: {
        sign:"-",
        position:"top",
    },
    down: {
        sign:"+",
        position:"top",
    },
    left:{
        sign:"-",
        position:"left",
    },
    right:{
        sign:"+",
        position:"left",
    }
}

//var buttons = ["&rarr;", "&larr;", "&uarr;", "&darr;"];

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
                move(direction.right);
                break;
            //MoveLeft
            case arrowCodes.left:
                move(direction.left);
                break;
            //MoveUp
            case arrowCodes.up:
                move(direction.up);
                break;
            //MoveDown
            case arrowCodes.down:
                move(direction.down);
                break;
        }
    }
});
// Move items on clicks
$(".buttonClass").click(function (event) {
    if (checkActiveElement()) {
        switch ($(event.target).attr("data-buttonDirection")) {
            //MoveRight
            case buttonCodes.right:
                if (checkDelay()) {
                    setTimeout(moveRight, delay);
                } else {
                   move(direction.right);
                }

                break;
            //MoveLeft
            case buttonCodes.left:
                move(direction.left);
                break;
            //MoveUp
            case buttonCodes.up:
                move(direction.up);
                break;
            //MoveDown
            case buttonCodes.down:
                move(direction.down);
                break;
        }
    }
});
//$($("[data-active = true]").get(i)).position().left;

function randomCoord() {
    return (Math.random() / 2).toString().substring(2, 5) + "px";
};

function move (d){
        var i = 0, div = $("[data-active = true]");;
    for (i; i < div.length; i++) {
        var currPos = $(div.get(i)).position();
        currPos = currPos[d.position];
        var newPos = currPos + Number(d.sign+step);
        $(div.get(i)).css(d.position,newPos);
    }
}

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