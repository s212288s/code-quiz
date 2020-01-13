var timer = document.querySelector("#timer");
var startButton = document.querySelector(".start-button");
var question = document.querySelector(".title");
var optionsField = document.querySelector(".options-field");
var questionsField = document.querySelector(".questions-field");
var endScreen = document.querySelector(".end-screen");
var score = document.querySelector("#score");
var initialsEl = document.querySelector("#initials");
var saveButton = document.querySelector("#save-button");
var viewHighScores = document.querySelector(".view-highscore-button");
var quizTime = 15; 
var questionObject = 0;

// ============= TO-DO LIST TO FINISH THE PROJECT =====================
// ====================================================================

// FUNCTIONALITY:
// *************
// HIDE START-BUTTON WHEN GAME STARTS
// HIDE VIEW HIGHSCORES WHEN GAME STARTS
// BRING BOTH BACK IN THE END, BUT CHANGE TEXT IN START BUTTON TO PLAY AGAIN

// LOCAL STORAGE:
// ************** 
// GET INFO FROM LOCAL STORAGE AND USE THAT TO RENDER END SCREEN

// THE LOOKS:
// **********
// CLEAN UP CODE
// CHECK UX, UI, PLAY WITH THAT COMPUTER IMAGE, PROBABLY INVERT THE COLORS

// when start quiz is clicked set timer and display question
startButton.addEventListener ("click", function(){
    setTimer();
    displayQuestion();
});

function gameOver(){
    timer.textContent = "";
    question.textContent = "";
    optionsField.textContent = "";
    endScreen.classList.remove("hide")
    score.textContent = quizTime;
}


var users = []
users = JSON.parse(localStorage.getItem("users"))
console.log(users)
var user = {
    initials: initials,
    score: quizTime
  };
var currentId = 0;
// capture user's input
var initials = initialsEl.value.trim();



// ============= SAVE BUTTON ===============

saveButton.addEventListener("click", function(){
    initials = initialsEl.value
    user = {
        initials: initials,
        score: quizTime
      };
    users.push(user);
    console.log(users)
    localStorage.setItem("users", JSON.stringify(users));
});

// ========= VIEW HIGH SCORES BUTTON ===========

viewHighScores.addEventListener("click", function(){
    endScreen.textContent = "";
    questionsField.textContent = "";
    // create users <ul> to add user <li> to
    var usersUl = document.createElement("ul");
    endScreen.append(usersUl)
    // create user <li>
    for (var i = 0; i < users.length; i++){
        var li = document.createElement("li");
        li.innerHTML = users[i].initials + " " + users[i].score;
        usersUl.append(li);
        console.log(users[i].initials)
    }
    
    // li.id = users.length;

    
    
    // console.log(users[1].initials)
});

// FIX DELAY BETWEEN 10 AND 9
function setTimer(){
    timer.textContent = quizTime;
    
    var timerInterval = setInterval(function(){
        
        timer.textContent = quizTime--;
        
        if (quizTime < 0){
            quizTime = 0
        }

        if (quizTime <= 0 || !questions[questionObject]) {
            score = quizTime
            console.log(score)
            clearInterval(timerInterval);
            gameOver()
        }
    }, 1000)
}

function displayQuestion(){
    question.textContent = questions[questionObject].title;
    displayChoices();
}

function displayChoices(){
    // var options to store arrays of choices to refer to in the loop so that the code is clearer and easier to write
    var options = questions[questionObject].choices;
     // loop through choices array and place the elements as options in optionsField
    for (var i = 0; i < options.length; i++){
        // options are created as <p> and saved in var option
        var option = document.createElement("p");
        // to each <p> "data" attribute id added and its value is each element in choices array
        option.setAttribute("data", options[i])
        // update display by adding each element of choices array as text of option
        option.textContent = options[i];
        // add option <p> to optionsField <div>
        optionsField.appendChild(option);
    }
}

function updateQuestion(){
    questionObject++
    if (questions[questionObject]){
        question.textContent = questions[questionObject].title;
        optionsField.textContent = ""
        displayChoices();
    }
    else {
        gameOver()
    } 
}

optionsField.addEventListener("click", function(event){
    // score = quizTime
    // console.log(score)
    // clear question and options
    function clearQuestionAndOptions(){
        question.textContent = "";
        optionsField.textContent = "";
    }
    if (event.target.matches("p")){
        var userChoice = event.target.attributes.data.value
        var answer = questions[questionObject].answer
        if(userChoice === answer){
            clearQuestionAndOptions()
           // display correct
            var correct = document.createElement("h3");
            correct.textContent = "Correct!"
            optionsField.appendChild(correct);
            // display next question in 1 second
            setTimeout(function(){
                if (quizTime > 0) {
                    updateQuestion()
                    quizTime++
                }
            }, 1000);
        }
        else {
            // if (quizTime > 3) {
                quizTime -= 3
            // }


            clearQuestionAndOptions()
            // display incorrect
            var incorrect = document.createElement("h3");
            incorrect.textContent = "Incorrect:("
            optionsField.appendChild(incorrect);
            // display next question in 1 second
            setTimeout(function(){
                if (quizTime > 0) {
                    updateQuestion()
                    quizTime++
                }
            }, 1000);
        }    
    }
     
})



// var gameover = document.createElement("h3");
//     gameover.textContent = "You finished the quiz!"
//     optionsField.appendChild(gameover);
//     var scoreEl = document.createElement("h3");
//     scoreEl.textContent = "Your score is " + quizTime
//     optionsField.appendChild(scoreEl);
//     var inputEl = document.createElement("input");
//     inputEl.setAttribute("placeholder", "enter your initials here")
//     inputEl.setAttribute("class", "initials")
//     optionsField.appendChild(inputEl);
//     // var userInitials = initialsEl.value
//     // console.log(initialsEl)
//     var save = document.createElement("div");
//     save.textContent = "save";
//     save.setAttribute("class", "save-btn")
//     optionsField.appendChild(save);
//     var saveBtn = document.querySelector("save-btn")
//     saveBtn.addEventListener("click", function(){
//         console.log("save is clicked")
//     })
    







// when start quiz is cliked creates the choices again

// function to input initials

// function to create end UI

// start at 100 pass the game in 50 sec, get remainder seconds as your score

// subtract from timer when answer is wrong





// need to go through questions array while 
// var result = "";
// do {
//     questionObject++
//     result = result + questionObject;
//   } while (questionObject < 3);
  
//   console.log(result);
//   // expected result: "12345"

// OLD DISPLAY ANSWER
// function displayAnswer(event){

//     // console.log(event.target.value)    

//     if(event.toElement.innerText === questions[questionObject].answer){
//         question.textContent = "";
//         optionsField.textContent = "";
//         var correct = document.createElement("h3");
//         correct.textContent = "Correct!"
//         optionsField.appendChild(correct);
//         var next = document.createElement("p");
//         next.textContent = "next"
//         optionsField.appendChild(next);
//         next.addEventListener("click", function(){
//             updateQuestion();
//         });  
//     }
//     if (event.toElement.innerText !== questions[questionObject].answer){
//         question.textContent = "";
//         optionsField.textContent = "";
//         var incorrect = document.createElement("h3");
//         incorrect.textContent = "Incorrect:("
//         optionsField.appendChild(incorrect);
//         // displayNextButton();
//         // subtract from timer when answer is wrong
//     }
    
// }

// THIS FOR LOOP HAS CONSOLE.DIR TO BE SAVED FOR REFERENCE

// //  for(var i = 0; i < allChoices.length; i++){
//     //     allChoices[i].addEventListener("click", function(event){
//     //         console.dir(event.target.attributes.data.value)
//     //     //    displayAnswer(event)
//     //     })
//     // }