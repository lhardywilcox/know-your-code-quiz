var startBtn = document.querySelector(".start");
var highScoreLink = document.querySelector("#high-score-link");
var secondsLeft = 60;
var questionNumberIdx = 0;
var questionCard = document.querySelector("#q1");
var score = 0;
var initials = document.querySelector(".initials");
var submitBtn = document.querySelector(".submitbtn");
var goBackBtn = document.querySelector(".goback");
var clearScoreBtn = document.querySelector(".clear");
var timeEl = document.querySelector(".timer");
var titleCard = document.querySelector("#title-card");
var scoreCard = document.querySelector("#score");
var highScoreCard = document.querySelector(".high-score-card");
var userScore = document.querySelector("#user-score");

var questionEl = document.querySelector(".question");
var answer1El = document.querySelector(".answer-1");
var answer2El = document.querySelector(".answer-2");
var answer3El = document.querySelector(".answer-3");
var answer4El = document.querySelector(".answer-4");

var correctOrWrong = document.querySelector(".correctOrWrong");

var highScoreList = [];

// Array of Question Objects
const questions = [
    // Object for Question 1
    {
        question: "Question 1",
        //         a    b    c    d
        options: ["1", "2", "3", "4"],
        answer: "a"
    },
    // Object for Question 2
    {
        question: "Question 2",
        //         a    b    c    d
        options: ["a", "b", "c", "d"],
        answer: "b"
    },
    // Object for Question 3
    {
        question: "Question 3",
        //         a    b    c    d
        options: ["A", "B", "C", "D"],
        answer: "c"
    },
    // Object for Question 4
    {
        question: "Question 4",
        //         a    b    c    d
        options: ["!", "@", "#", "$"],
        answer: "d"
    }
]

startBtn.addEventListener("click", function () {
    console.log("Started!");
    startTimer();
    showQuestion();
});

function startTimer() {
    // Countdown from 60 seconds
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time remaining: " + secondsLeft;
        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to score question
            scoreQuestion();
        }
    }, 1000);
}

function showQuestion() {

    if (questionNumberIdx === questions.length) {
        console.log("Index cannot go up the length!");
        return scoreQuestion();
    }
    console.log("Hi");
    // Hide the titleCard
    titleCard.style.display = "none";
    // Display question Block
    questionCard.style.display = "block";
    // Display Question
    questionEl.innerHTML = questions[questionNumberIdx].question;
    // Display Options
    answer1El.innerHTML = questions[questionNumberIdx].options[0];
    answer2El.innerHTML = questions[questionNumberIdx].options[1];
    answer3El.innerHTML = questions[questionNumberIdx].options[2];
    answer4El.innerHTML = questions[questionNumberIdx].options[3];
}

function showNextQuestion(option) {
    // if answer is right
    if (option === questions[questionNumberIdx].answer) {
        correctOrWrong.innerHTML = "Correct!";
        score++;
        console.log(score);
    }
    // if answer is wrong 
    else {
        correctOrWrong.innerHTML = "Wrong!";
        secondsLeft = secondsLeft - 10;
        console.log(secondsLeft);
    }
    // Increment the index of the questions
    questionNumberIdx++;
    showQuestion();
    setTimeout(function () {
        correctOrWrong.innerHTML = "";
    }, 1000);
}

function scoreQuestion() {
    timeEl.style.display = "none";
    questionCard.style.display = "none";
    scoreCard.style.display = "block";
    userScore.innerHTML = "Your final score is: " + score;
    endGame();
}

function endGame() {

    // input initials
    // save initials and score to local storage
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var newScoreEntry = {
            initials: initials.value,
            score: score
        };

        highScoreList.push(newScoreEntry);

        console.log(highScoreList);

        localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
    });

    console.log("Ending game!");

    // reset browser window after 10 second delay

    setTimeout(() => {
        document.location.reload();
    }, 10000);
}

highScoreLink.addEventListener("click", function () {
    showHighScores();
});

function showHighScores() {
    titleCard.style.display = "none";
    highScoreCard.style.display = "block";

    // get list of scores from local storage
    JSON.parse(localStorage.getItem("highScoreList"));

    if (highScoreList !== null) {
        document.querySelector("#high-scores").textContent = highScoreList.initials + " - " + highScoreList.score
    };
    console.log("See the scores?");
}

goBackBtn.addEventListener("click", function () {
    document.location.reload();
});

clearScoreBtn.addEventListener("click", function () {
    localStorage.clear();
    console.log("All clear!");
    document.location.reload();
});

