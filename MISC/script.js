let selectedWord = "";
let guessedLetters = [];
let lives = 6;
let currentImageIndex = 0;
let language = "english";

const words = {
    english: ["apple", "banana", "grape", "orange", "melon"],
    bulgarian: ["ябълка", "банан", "грозде", "портокал", "диня"]
};

const images = [
    "images/pole.png",
    "images/head.png",
    "images/body.png",
    "images/arm1.png",
    "images/arm2.png",
    "images/leg1.png",
    "images/leg2.png"
];

// Get random word based on selected language
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

// Update game display
function updateDisplay() {
    let displayWord = selectedWord.split("").map(letter => 
        guessedLetters.includes(letter) ? letter : "_").join(" ");

    document.getElementById("word-display").innerText = displayWord;
    document.getElementById("guessed-letters").innerText = guessedLetters.join(", ");
    document.getElementById("lives").innerText = "❤️".repeat(lives);

    updateHangmanImage();
}

// Update the hangman drawing
function updateHangmanImage() {
    const canvas = document.getElementById("hangmanCanvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    
    image.src = images[currentImageIndex];
    image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, 200, 200);
    };
}

// Handle letter guesses
function guessLetter() {
    let input = document.getElementById("letter-input").value.toLowerCase().trim();
    document.getElementById("letter-input").value = "";

    if (!input || guessedLetters.includes(input) || input.length !== 1) return;

    guessedLetters.push(input);

    if (selectedWord.includes(input)) {
        updateDisplay();
    } else {
        lives--;
        if (lives < 6) {
            currentImageIndex++;
        }
        updateDisplay();
    }

    checkGameStatus();
}

// Check game status (win or lose)
function checkGameStatus() {
    if (lives === 0) {
        showModal(`Game Over! The word was: ${selectedWord}`, "You lost!", "💔");
    } else if (!document.getElementById("word-display").innerText.includes("_")) {
        showModal(`Congratulations! You guessed the word: ${selectedWord}`, "You won!", "🎉");
    }
}

// Show modal popup
function showModal(message, result, icon) {
    document.getElementById("modal-message").innerText = message;
    document.getElementById("modal-result").innerText = result;
    document.getElementById("lives-left").innerText = icon;

    let resultModal = new bootstrap.Modal(document.getElementById("result-modal"));
    resultModal.show();
}

// Close modal and restart game
function resetGame() {
    let resultModal = bootstrap.Modal.getInstance(document.getElementById("result-modal"));
    if (resultModal) resultModal.hide();

    openLanguageModal();
}

// Open language selection modal
function openLanguageModal() {
    let languageModal = new bootstrap.Modal(document.getElementById("language-modal"));
    languageModal.show();
}

// Select game language
function selectLanguage(selectedLang) {
    language = selectedLang;
    let languageModal = bootstrap.Modal.getInstance(document.getElementById("language-modal"));
    if (languageModal) languageModal.hide();

    initializeGame();
}

// Load the game on window start
window.onload = function() {
    openLanguageModal();
};