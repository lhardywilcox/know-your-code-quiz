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