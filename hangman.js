// WIP, not finished yet

var prompt = require("prompt");

// Challenge: Hangman!

// Create a file called hangman.js.
// In this file, write a program that will let the user play hangman. The program should work as follows:
// Choose a random word from a list of words.

// In a loop, do the following:
//      Ask the user to guess a letter
//      If the user guessed a wrong letter, then add one step to the hangman "drawing"
//      Display the current completion of the word next to a hangman ASCII "drawing". 
//      You can get some inspiration from either here or here
// Keep looping until either the word is found or the hangman is hanged!
// Display a message to the user letting them know what happened

var wordsList = ["cats", "javascript", "computer", "internet"];
var randomWord = wordsList[Math.floor(Math.random()*wordsList.length)];
var splitWord = randomWord.split("");
console.log(randomWord);
console.log(splitWord);

var counter = 0; // to know how many wrong tries were made in the game
var guesses = []; // an array that keeps all the letters guessed by the player

// the drawing that appears according to the number of wrong tries
function hangmanDrawing(counter) {
    if (counter === 0) {
        console.log("    ___________");
        console.log("    |         |");
        console.log("    | ");
        console.log("    |  ");
        console.log("    |  ");
        console.log("    |");
        console.log("    |");
    } else if (counter === 1) {
        console.log("    ___________");
        console.log("    |         |");
        console.log("    |         0");
        console.log("    |  ");
        console.log("    |  ");
        console.log("    |");
        console.log("    |");
    } else if (counter === 2) {
        console.log("    ___________");
        console.log("    |         |");
        console.log("    |         0");
        console.log("    |         |");
        console.log("    |  ");
        console.log("    |");
        console.log("    |");
    } else if (counter === 3) {
        console.log("    ___________");
        console.log("    |         |");
        console.log("    |         0");
        console.log("    |        /|");
        console.log("    |  ");
        console.log("    |");
        console.log("    |");
    } else if (counter === 4) {
        console.log("    ___________");
        console.log("    |         |");
        console.log("    |         0");
        console.log("    |        /|\\");
        console.log("    |  ");
        console.log("    |");
        console.log("    |");
    } else if (counter === 5) {
        console.log("    ___________");
        console.log("    |         |");
        console.log("    |         0");
        console.log("    |        /|\\");
        console.log("    |        / ");
        console.log("    |");
        console.log("    |");
    } else if (counter === 6) {
        console.log("    ___________");
        console.log("    |         |");
        console.log("    |         0");
        console.log("    |        /|\\");
        console.log("    |        / \\");
        console.log("    |");
        console.log("    |");
    }
}

// this displays an array of underscores according to the length of the random word during a play
var placeHolder = [];
splitWord.forEach(function(letter){
            placeHolder.push("_");
});
        
function hangman(wordsList) {
    var question = [{
        name: "letter",
        description: "Guess a letter!"
    }];
    
    // initiate user prompt
    prompt.start();
    prompt.get(question, function(err, result) {
        var guessedLetter = result.letter.toLowerCase();
        console.log("Your current guess is: " + guessedLetter);
        
        if (splitWord.indexOf(guessedLetter) > -1) {
            placeHolder.splice(splitWord.indexOf(guessedLetter), 1, splitWord[splitWord.indexOf(guessedLetter)]);
            console.log("You have found the letter " + guessedLetter + " !");
            hangmanDrawing(counter);
            guesses.push(guessedLetter);
            console.log("The secret word so far is: " + placeHolder);
            console.log("Your guesses so far: " + guesses);
            hangman();
        } else if (guessedLetter.length === 0) {
            console.log("You did not enter a letter. Please try again!");
            hangmanDrawing(counter);
            console.log("The secret word so far is: " + placeHolder);
            console.log("Your guesses so far: " + guesses);
            hangman();
        } else if ((splitWord.indexOf(guessedLetter) === -1) && counter < 4 ) {
            console.log("Too bad, " + guessedLetter + " is not in the secret word... Try again!");
            counter++;
            hangmanDrawing(counter);
            guesses.push(guessedLetter);
            console.log("The secret word so far is: " + placeHolder);
            console.log("Your guesses so far: " + guesses);
            hangman();
        } else if ((splitWord.indexOf(guessedLetter) === -1) && counter === 4 ) {
            console.log("Too bad, " + guessedLetter + " is not in the secret word... This is your last chance!");
            counter++;
            hangmanDrawing(counter);
            guesses.push(guessedLetter);
            console.log("The secret word so far is: " + placeHolder);
            console.log("Your guesses so far: " + guesses);
            hangman();
        } else if (counter === 5) {
            console.log("You lost!");
            counter++;
            hangmanDrawing(counter);
            guesses.push(guessedLetter);
            console.log("The secret word so far is: " + placeHolder);
            console.log("Your guesses so far: " + guesses);
            return;
        }
    });
}

hangman(wordsList);