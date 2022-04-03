//variables
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

//timer
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
//Questions sections
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

//hide
  questionsEl.removeAttribute("class");

//begin timer contdown
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get questions from array on other sheet
  var currentQuestion = questions[currentQuestionIndex];

  // current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // remove old choices
  choicesEl.innerHTML = "";

  // loop through the questions
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // click on the questions
    choiceNode.onclick = questionClick;

    
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // answer validation - wrong:
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 10;

    if (time < 0) {
      time = 0;
    }
   //wrong notice
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "grey";
    feedbackEl.style.fontSize = "200%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "grey";
    feedbackEl.style.fontSize = "200%";
  }

  //  right/wrong notice
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);


  currentQuestionIndex++;

  // make sure time is still counting
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // end timer
  clearInterval(timerId);

  // end of quiz screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // display scores
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update timer
  time--;
  timerEl.textContent = time;

  // if timer runs out - end quiz
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // retrieve scores
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // new scores
    var newScore = {
      score: time,
      initials: initials
    };

    // save the high score
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // here's your score
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  // enter for save the score
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// enter your initials
submitBtn.onclick = saveHighscore;

// begin quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;