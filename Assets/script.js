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
var highScores = document.querySelector("#high-scores");

var questionEl = document.querySelector(".question");
var answer1El = document.querySelector(".answer-1");
var answer2El = document.querySelector(".answer-2");
var answer3El = document.querySelector(".answer-3");
var answer4El = document.querySelector(".answer-4");

var correctOrWrong = document.querySelector(".correctOrWrong");

// Array of Question Objects
const questions = [
    // Object for Question 1
    {
        question: "What is an example of a relative path to link a css file?",
        //         a    b    c    d
        options: ["./assets/css/style.css", "#css/style", "file>style.css", "You don't need to link a css file."],
        answer: "a"
    },
    // Object for Question 2
    {
        question: "What is the default behavior called that is used to move declarations to the top of the current scope?",
        //         a    b    c    d
        options: ["jumping", "sorting", "hoisting", "arranging"],
        answer: "c"
    },
    // Object for Question 3
    {
        question: "#FFFF00 is an example of a color shown in what kind of value?",
        //         a    b    c    d
        options: ["RGB Value", "Decimal Value", "Color Value", "Hex Value"],
        answer: "d"
    },
    // Object for Question 4
    {
        question: "What is the format that is used for storing and transmitting data called?",
        //         a    b    c    d
        options: ["Font", "Syntax", "HTML", "JSON"],
        answer: "d"
    },
    // Object for Question 5
    {
        question: "What is the element that will continue to run a block of code as long as the specified condition is TRUE?",
        //         a    b    c    d
        options: ["Debugger", "Loop", "Clone", "Repeater"],
        answer: "b"
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
    storeScores();
}

function storeScores() {
    // input initials
    // save initials and score to local storage
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var highScoreList = JSON.parse(localStorage.getItem("highScoreList")) || [];

        var newScoreEntry = {
            initials: initials.value,
            score: score
        };

        if (highScoreList === null) {
            highScoreList.push(newScoreEntry);
        } else {
            highScoreList.push(newScoreEntry)
        };

        localStorage.setItem("highScoreList", JSON.stringify(highScoreList));

        console.log(highScoreList);
        console.log("See the scores?");
    });
    // reset browser window after 12 second delay
    setTimeout(() => {
        document.location.reload();
    }, 12000);

};

highScoreLink.addEventListener("click", function () {
    scoreCard.style.display = "none";
    showHighScores();
});

function showHighScores() {
    scoreCard.style.display = "none";
    titleCard.style.display = "none";
    highScoreCard.style.display = "block";

    // get list of scores from local storage
    var scoreList = JSON.parse(localStorage.getItem("highScoreList")) || [];

    console.log(scoreList);
    // changes object into array of strings, turns them into list items, inserts those list items into the HTML
    highScores.innerHTML = scoreList
        .map(score => {
            return `<li class="score">${score.initials} - ${score.score}</li>`;
        })
        .join("");

}
// reloads browser window so quiz can restart, hides highScoreCard
goBackBtn.addEventListener("click", function () {
    document.location.reload();
    highScoreCard.style.display = "none";
});
// clears High Score list from local storage, reloads browser window, hides highScoreCard
clearScoreBtn.addEventListener("click", function () {
    localStorage.clear();
    console.log("All clear!");
    document.location.reload();
    highScoreCard.style.display = "none";
});
