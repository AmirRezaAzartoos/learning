var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPatern = []
var start = true
var level = 0

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    start = false
    $("h1").text("level " + level)
    level++
}

$(".btn").on("click", function () {
    userChosenColour = $(this).attr("id")
    userClickedPatern.push(userChosenColour)
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPatern.length - 1)
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(clickedOne) {
    $("#" + clickedOne).addClass("pressed")
    setTimeout(function (_clickedOne = clickedOne) {
        $("#" + _clickedOne).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPatern[currentLevel]) {
        if (gamePattern.length == userClickedPatern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
            userClickedPatern = []
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3")
        audio.play()
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        start = true
        level = 0
        userClickedPatern = []
        gamePattern = []
    }
}

$(document).on("keydown", function () {
    if (start) nextSequence()
})