// Number guessing game!

// Create a file called number-guessing-game.js.
// In this file, re-write your number guessing game (from the basic javascript workshop) for the command line!
// Instead of using prompt and alert, you will have to use capabilities from NodeJS and any external module. 
// HINT: there is an npm library called prompt that can help you with that :)

// ( Number Guessing Game - The Penniless Gambler
// Generate a random number between 1 and 100. Using the browser functions prompt and alert, 
// ask the user to guess the number. You should give them 4 tries to guess the number. 
// If they guess wrong, tell them if it's higher or lower. If they guess right, congratulate them. 
// Otherwise, give them a message saying what the correct number was, as well as their list of guesses. )

// random number between 1 and 100
var getRandomNumber = Math.floor(Math.random() * (101 - 1) + 1);
console.log(getRandomNumber);

// counter initiation for the function
var counter = 0;

// array that will keep a list of the guesses made by the user
var guesses = [];

function guessNumber() {
    var question = [{
        name: "number",
        description: "Guess a number between 1 and 100"
    }];

    // initiate user prompt
    var prompt = require("prompt");
    prompt.start();
    prompt.get(question, function(err, result) {
        console.log("Your guess is: number " + result.number);
        
        if (Number(result.number) === getRandomNumber) {
            console.log("You have guessed the right number! Congratulations!!! :)");
        } else if (result.number > getRandomNumber && counter < 3) {
            console.log("My number is lower than " + result.number + ". Please try again!");
            counter++;
            guessNumber(); // starts the function over
        } else if (result.number < getRandomNumber && counter < 3) {
            console.log("My number is higher than " + result.number + ". Please try again!");
            counter++;
            guessNumber();
        } else if (counter === 3) {
            console.log("You didn't guess the right number and have reached the limit of tries available. :( The right number was " + getRandomNumber + ". Please start over!");
        } 
        guesses.push(result.number);
        console.log("Your guesses so far: " + guesses);
    });
}

guessNumber();