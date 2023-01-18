var id = 0;
function nextQuestion() {
    // When button is clicked
    // Grab element with current id
    // If answer is correct, go to next question
    // If answer is incorrect, subtract time, then go to next question
    // Increment id
    id = id++
    if (answer === correct) {
        nextQuestion();
    }
}

var timeEL = document.querySelector(".timer");
var goodAnswer = document.querySelector(".correct");
var badAnswer = document.querySelector(".incorrect");



var correct = 0; // count number of correct answers


function nextQuestion() {
    var id = 0; // staring variable for the ids of the question cards
    // Grab next card element with current value of id
    document.getElementById(id).style.display = "block";
    // When button is clicked
    // Add event listeners to buttons?  How do I label them?
    if (goodAnswer) {
        correct = ++ // keep track of correct answers
            nextQuestion();
    } else {
        // If answer is incorrect, subtract time, reset display:none on current id, increment id, then go to next question
        id = ++
            nextQuestion();
    }
}

var secondsLeft = 60; // starting variable for the timer

function startTimer() {
    secondsLeft--;
    timeEL.textContent = "Time remaining: " + secondsLeft;
    // How do I make the 10 second reduction for incorrect answers?
}

// End quiz when all questions answered or time expires

// Add initials to high score list

// Display high score list when link clicked
// Go back button restarts the quiz
// Clear high scores button clears the high score list

startBtn.addEventListener("click", function () {
    document.getElementById("title-card").style.display = "none"; // sets display value of title card to none
    nextQuestion();
});

startBtn.addEventListener("click", startTimer);