$(document).ready(function () {

    // SETUP VARIABLES
    // ===============================================
    var wordBank = {
        animals: ["box jellyfish", "colossal squid", "flower urchin", "barracuda", "textile cone snale", "leopard seal", "stonefish", "blue ringed octopus", "sea snakes", "saltwater crocodile", "sharks"],
        photo: ["box-jelly-fish.720x479.jpg"]
    };

    var maxGuess = 10;
    // Empty array to push guessed letters too when the letter does not match the wordToMatch
    var guessedLetters = [];

    // Empty array to push placeholders too (_) and also letter correctly guessed letters
    var guessingWord = [];
    // Randomly selected word that the player needs to match
    var wordToMatch;
    var wins = 0;
    var losses = 0;

    // FUNCTIONS
    // ===============================================
    // Create function to set up game; function called when start-button pressed
    function setupGame() {

        // Randomly get a word from wordBank
        wordToMatch = wordBank.animals[Math.floor(Math.random() * wordBank.animals.length)];
        console.log(wordToMatch);

        // Reset word arrays
        guessedLetters = [];
        guessingWord = [];
        maxGuess = 10;

        // Reset the guessed word
        // Iterate over length of wordToMatch
        for (var i = 0; i < wordToMatch.length; i++) {
            // Put a space in stead of an underscore between multip word "words"
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push(" _");
            };
        };

        // updateDisplay with these "placeholder" markers matching the format of the wordToMatch
        updateDisplay();

    };

    // Create function to call when you want to updateDisplay
    function updateDisplay() {
        // guessingWord and guessedLetters are both arrays so when we want to display either as a combined string instead of separate (that make up a word / placeholder for the word) we need to use .join("") method.
        document.getElementById("currentWord").innerHTML = "Current Word:<br>" + guessingWord.join("");
        document.getElementById("guessedLetters").innerHTML = "Letters Guessed<br>" + guessedLetters.join(" ");
        document.getElementById("wins-text").innerHTML = wins;
        document.getElementById("losses-text").innerHTML = losses;
        document.getElementById("remainingGuesses").innerHTML = maxGuess;
    }

    // Now that the the game has been setup and displayed, we need to checkForLetter in the wordToMatch. The argument we will run through this function is the letter the player guessed. 
    function checkForLetter(letter) {
        // Create variable to check true/false values
        var foundLetter = false;
        for (var i = 0; i < wordToMatch.length; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter;
                foundLetter = true;
                if (guessingWord.join("") === wordToMatch) {
                    wins++;
                    updateDisplay();
                    $("#start-button").text("Play Again!");
                };
            };
        };

        console.log("foundLetter: " + foundLetter);

        if (!foundLetter) {
            console.log("!foundLetter: " + !foundLetter);
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                console.log(guessedLetters);
                maxGuess--;
            }
            if (maxGuess === 0) {
                guessingWord = wordToMatch.split();
                console.log(guessingWord);
                losses++;
                $("#start-button").text("Try Again?");
            };
        };

        updateDisplay();
    };

    // METHODS
    // ===============================================
    $("#start-button").on("click", function () {
        setupGame();
        $("#start-button").text("Good Luck!");
    });

    document.onkeyup = function (event) {
        //Create variable storing event.key
        var letter = event.key;
        console.log("letter: " + letter);
        checkForLetter(letter);
    };

});
