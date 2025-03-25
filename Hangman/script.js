let selectedWord = "";
let guessedLetters = [];
let lives = 6;
let currentImageIndex = 0; // To track which hangman image to show

// Words list (local)
const words = ["apple", "banana", "grape", "orange", "melon"];

// Images for the hangman game
const images = [
    "images/pole.png",  // Default image (pole)
    "images/head.png",  // First wrong guess (head)
    "images/body.png",
    "images/arm1.png",
    "images/arm2.png",
    "images/leg1.png",
    "images/leg2.png"
];

// Function to get a random word from the words list
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Initialize the game
function initializeGame() {
    selectedWord = getRandomWord();
    guessedLetters = []; // Reset guessed letters
    lives = 6; // Reset lives
    currentImageIndex = 0; // Reset image index
    updateDisplay(); // Update the display
    closeModal(); // Close the modal when starting a new game
}

// Update the game UI
function updateDisplay() {
    let displayWord = selectedWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_').join(' ');

    document.getElementById("word-display").innerText = displayWord;
    document.getElementById("guessed-letters").innerText = guessedLetters.join(', ');
    document.getElementById("lives").innerText = "❤️".repeat(lives);

    // Update the hangman image based on wrong guesses
    updateHangmanImage();
}

// Update hangman image based on wrong guesses
function updateHangmanImage() {
    const image = new Image();
    image.src = images[currentImageIndex];
    image.onload = () => {
        const canvas = document.getElementById("hangmanCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
        ctx.drawImage(image, 0, 0, 200, 200); // Draw new image
    };
}

// Handle letter guessing
function guessLetter() {
    let input = document.getElementById("letter-input").value.toLowerCase();
    document.getElementById("letter-input").value = '';

    // Validate the input
    if (!input || guessedLetters.includes(input) || input.length !== 1) return;

    guessedLetters.push(input);

    let correctGuess = selectedWord.includes(input);

    if (correctGuess) {
        // Correct guess: update the display word
        updateDisplay();
        alert("Correct Guess!");  // Inform the player about the correct guess
    } else {
        // Wrong guess: lose a life and update the image
        lives--;
        if (lives < 6) { // Start showing images after the first wrong guess
            currentImageIndex++; 
        }
        updateDisplay();
        alert("Wrong Guess!");  // Inform the player about the wrong guess
    }

    // Check for game over or win conditions (after display updates)
    if (lives === 0) {
        showModal("Game Over! The word was: " + selectedWord, "You lost!", lives);
        resetGame(); // Reset the game after a loss
    } else if (!document.getElementById("word-display").innerText.includes("_")) {
        showModal("Congratulations! You guessed the word: " + selectedWord, "You won!", lives);
        resetGame(); // Reset the game after a win
    }
}

// Show the modal with the game result
function showModal(message, result, livesLeft) {
    const modal = document.getElementById("result-modal");
    document.getElementById("modal-message").innerText = message;
    document.getElementById("modal-result").innerText = result;
    document.getElementById("lives-left").innerText = `❤️ ${livesLeft}`;
    modal.style.display = "flex"; // Use flex to center modal
}

// Close the modal
function closeModal() {
    const modal = document.getElementById("result-modal");
    modal.style.display = "none";
}

// Reset game state and start a new round
function resetGame() {
    setTimeout(() => {
        initializeGame(); // Start a new game after the round ends
    }, 3000); // Delay before starting a new game
}

// Start the game when the page loads
initializeGame();
