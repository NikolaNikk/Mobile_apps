let selectedWord = "";
let guessedLetters = [];
let lives = 6;
let currentImageIndex = 0;
let language = 'english';  // Default language is English

// Words list for English and Bulgarian
const words = {
    english: ["apple", "banana", "grape", "orange", "melon"],
    bulgarian: ["ябълка", "банан", "грозде", "портокал", "диня"]
};

// Hangman images for the game
const images = [
    "images/pole.png",  
    "images/head.png",  
    "images/body.png",
    "images/arm1.png",
    "images/arm2.png",
    "images/leg1.png",
    "images/leg2.png"
];

// Function to get a random word from the selected language's word list
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words[language].length);
    return words[language][randomIndex];
}

// Initialize the game
function initializeGame() {
    selectedWord = getRandomWord();
    guessedLetters = [];
    lives = 6;
    currentImageIndex = 0;
    updateDisplay();
}

// Update the game UI
function updateDisplay() {
    const displayWord = selectedWord.split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');

    document.getElementById("word-display").innerText = displayWord;
    document.getElementById("guessed-letters").innerText = guessedLetters.join(', ');
    document.getElementById("lives").innerText = "❤️".repeat(lives);

    updateHangmanImage();
}

// Update the hangman image based on the number of wrong guesses
function updateHangmanImage() {
    const image = new Image();
    image.src = images[currentImageIndex];
    image.onload = () => {
        const canvas = document.getElementById("hangmanCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, 200, 200);
    };
}

// Handle letter guessing
function guessLetter() {
    let input = document.getElementById("letter-input").value.toLowerCase();
    document.getElementById("letter-input").value = '';

    if (!input || guessedLetters.includes(input) || input.length !== 1) return;

    guessedLetters.push(input);

    if (selectedWord.includes(input)) {
        updateDisplay();
        alert("Correct Guess!");
    } else {
        lives--;
        if (lives < 6) currentImageIndex++;
        updateDisplay();
        alert("Wrong Guess!");
    }

    checkGameStatus();
}

// Check game status (win or lose)
function checkGameStatus() {
    if (lives === 0) {
        showModal(`Game Over! The word was: ${selectedWord}`, "You lost!", lives);
    } else if (!document.getElementById("word-display").innerText.includes("_")) {
        showModal(`Congratulations! You guessed the word: ${selectedWord}`, "You won!", lives);
    }
}

// Show the end game modal
function showModal(message, result, livesLeft) {
    const modal = document.getElementById("result-modal");
    document.getElementById("modal-message").innerText = message;
    document.getElementById("modal-result").innerText = result;
    document.getElementById("lives-left").innerText = `❤️ ${livesLeft}`;
    modal.style.display = "flex";  // Show the result modal
}

// Close the modal
function closeModal() {
    const modal = document.getElementById("result-modal");
    modal.style.display = "none";
}

// Reset the game and show language selection modal
function resetGame() {
    closeModal();  // Close the result modal
    openLanguageModal();  // Show the language selection modal again
}

// Show language selection modal
function openLanguageModal() {
    const modal = document.getElementById("language-modal");
    modal.style.display = "flex";
}

// Select language and start the game
function selectLanguage(selectedLang) {
    language = selectedLang;
    closeLanguageModal();  // Close the language modal after selection
    initializeGame();  // Start the game after selecting the language
}

// Close the language selection modal
function closeLanguageModal() {
    const modal = document.getElementById("language-modal");
    modal.style.display = "none";
}

// Start the game when the page loads
window.onload = function() {
    // Hide the result modal initially
    const modal = document.getElementById("result-modal");
    modal.style.display = "none";  // Ensure the result modal is hidden on page load

    openLanguageModal();  // Show the language selection modal when the page loads
};
