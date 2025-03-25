let selectedWord = "";
let guessedLetters = [];
let lives = 6;
let currentImageIndex = 0;

const words = ["apple", "banana", "grape", "orange", "melon"];
const images = [
    "images/pole.png", "images/head.png", "images/body.png", 
    "images/arm1.png", "images/arm2.png", "images/leg1.png", "images/leg2.png"
];

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function initializeGame() {
    selectedWord = getRandomWord();
    guessedLetters = [];
    lives = 6;
    currentImageIndex = 0;
    updateDisplay();
    closeModal();
}

function updateDisplay() {
    const displayWord = selectedWord.split('').map(letter => 
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
        const ctx = document.getElementById("hangmanCanvas").getContext("2d");
        ctx.clearRect(0, 0, 200, 200);
        ctx.drawImage(image, 0, 0, 200, 200);
    };
}

function guessLetter() {
    const input = document.getElementById("letter-input").value.toLowerCase();
    document.getElementById("letter-input").value = '';

    if (!input || guessedLetters.includes(input) || input.length !== 1) return;

    guessedLetters.push(input);
    const correctGuess = selectedWord.includes(input);

    if (correctGuess) {
        updateDisplay();
        alert("Correct Guess!");
    } else {
        lives--;
        if (lives < 6) currentImageIndex++;
        updateDisplay();
        alert("Wrong Guess!");
    }

    if (lives === 0) {
        showModal("Game Over! The word was: " + selectedWord, "You lost!", lives);
        resetGame();
    } else if (!document.getElementById("word-display").innerText.includes("_")) {
        showModal("Congratulations! You guessed the word: " + selectedWord, "You won!", lives);
        resetGame();
    }
}

function showModal(message, result, livesLeft) {
    document.getElementById("modal-message").innerText = message;
    document.getElementById("modal-result").innerText = result;
    document.getElementById("lives-left").innerText = `❤️ ${livesLeft}`;
    document.getElementById("result-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("result-modal").style.display = "none";
}

function resetGame() {
    setTimeout(() => initializeGame(), 3000);
}

initializeGame();
