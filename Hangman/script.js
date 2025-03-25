let selectedWord = "";
let guessedLetters = [];
let lives = 6;
let currentImageIndex = 0;
let language = 'english';

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

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words[language].length);
    return words[language][randomIndex];
}

function initializeGame() {
    selectedWord = getRandomWord();
    guessedLetters = [];
    lives = 6;
    currentImageIndex = 0;
    updateDisplay();
}

function updateDisplay() {
    let displayWord = selectedWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_').join(' ');

    document.getElementById("word-display").innerText = displayWord;
    document.getElementById("guessed-letters").innerText = guessedLetters.join(', ');
    document.getElementById("lives").innerText = "❤️".repeat(lives);

    updateHangmanImage();
}

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

function guessLetter() {
    let input = document.getElementById("letter-input").value.toLowerCase();
    document.getElementById("letter-input").value = '';

    if (!input || guessedLetters.includes(input) || input.length !== 1) return;

    guessedLetters.push(input);

    let correctGuess = selectedWord.includes(input);

    if (correctGuess) {
        updateDisplay();
        alert("Correct Guess!");
    } else {
        lives--;
        if (lives < 6) {
            currentImageIndex++;
        }
        updateDisplay();
        alert("Wrong Guess!");
    }

    if (lives === 0) {
        showModal("Game Over! The word was: " + selectedWord, "You lost!", lives);
    } else if (!document.getElementById("word-display").innerText.includes("_")) {
        showModal("Congratulations! You guessed the word: " + selectedWord, "You won!", lives);
    }
}

function showModal(message, result, livesLeft) {
    const modal = document.getElementById("result-modal");
    document.getElementById("modal-message").innerText = message;
    document.getElementById("modal-result").innerText = result;
    document.getElementById("lives-left").innerText = `❤️ ${livesLeft}`;
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("result-modal");
    modal.style.display = "none";
}

function resetGame() {
    closeModal();
    openLanguageModal();
}

function openLanguageModal() {
    const modal = document.getElementById("language-modal");
    modal.style.display = "flex";
}

function selectLanguage(selectedLang) {
    language = selectedLang;
    closeLanguageModal();
    initializeGame();
}

function closeLanguageModal() {
    const modal = document.getElementById("language-modal");
    modal.style.display = "none";
}

window.onload = function() {
    const modal = document.getElementById("result-modal");
    modal.style.display = "none";
    openLanguageModal();
};
