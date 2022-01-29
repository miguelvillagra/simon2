const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userClickedPattern = new Array();
var level = 0;
var started = false;



$("body").keypress(function(event) {

  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;

  }

});


$("span").click(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;

  }



});





function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  $("#level-title").text("level " + level);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);


  playSound(randomChosenColour);


}

function checkAnswer(currentLevel) {


  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correcto, continua");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }


  } else {
    console.log("incorrecto, gameover");
    wrongAnswer();
  }

}



$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);


});


function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColour) {


  $("#" + currentColour).addClass("pressed");


  setTimeout(function() {

    $("#" + currentColour).removeClass("pressed");

  }, 100);


}


function wrongAnswer() {
  playSound("wrong");

  $('body,html').addClass("game-over");
  $("#level-title").text("Game Over 😜 START again");


  setTimeout(function() {

    $('body,html').removeClass("game-over");

  }, 200);

  startOver();


}


function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}
