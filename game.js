
var gamePattern = [];

var buttonColours = ["red", "blue", " green", "yellow"];

var userClickedPattern = [];

var level = 0;

var highScore = 0;

var started = false;




$(".btn").click(function(event) {

    if(started === true) {
        
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
  
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
}
  });


//   Event listener for go button to start/restart game


  $(".goButton").click(function(event){
    if(started === false){  // runs first time of new game only
      nextSequence(); //  starts sequence;
      started = true;
      $(".goButton").hide();  // hides go button
    }
  });
  

function checkAnswer(currentLevel) {

    

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        

        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        
        playSound("wrong"); // play wrong sound

    animateGameOver(); // animation for game ended

    $("h1").text("Game Over, Press Restart to Play Again");

    $(".goButton").text("Restart"); //change go -> restart

    startOver() //resets game
      }


}

// play specific sound for each button

function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
  }




function nextSequence() {
    userClickedPattern = [];

    level++;

    $("h1").text("Level " + level); //update level

var randomNumber = Math.floor(Math.random() * 4);
    

var randomChosenColour = buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

playPattern();

}


/*
  Plays complete game pattern for user each level
*/

function playPattern() {
    var i = 0;
    const intervalId = setInterval(function() {
    $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
    i += 1;
    if (i === gamePattern.length) {
        clearInterval(intervalId);
    }

    }, 1000);



}

  /*
  Clears levels and gamePattern
*/

function startOver() {
    if(level > highScore) { // Sets highscore
        
      highScore = level -1;
      $("h3").text("High Score: " + highScore);
    }
    level = 0;
    gamePattern = [];
    started = false;
    $(".goButton").show();
  }
  
  /*
    Indicates the game is over to the user
  */

  function animateGameOver() {
    $("body").addClass("game-over");
    setTimeout(function() {

      $("body").removeClass("game-over");
    },200);

  }
  
  /*
    Animates button clicked effect
  */



function animatePress(currentColor) {

   $("#" + currentColor).addClass("pressed");
  
   setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

 