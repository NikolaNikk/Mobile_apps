let selectedWord = "";
let guessedLetters = [];
let lives = 6;
let currentImageIndex = 0;
let language = "english";
let difficulty = "medium";
let wordsData = {};
let texts = {};  // To store translations

// Load words from JSON
async function loadWords() {
    try {
        const response = await fetch("words.json");
        wordsData = await response.json();
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

// Load translations from JSON
async function loadTranslations() {
    try {
        const response = await fetch("translations.json");
        texts = await response.json();
    } catch (error) {
        console.error("Error loading translations:", error);
    }
}

// Get random word based on selected language & difficulty
function getRandomWord() {
    const wordList = wordsData[language][difficulty];
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
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
    const image = new Image();
    image.src = images[currentImageIndex];
    image.onload = () => {
        const canvas = document.getElementById("hangmanCanvas");
        const ctx = canvas.getContext("2d");
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
        showModal(`${texts[language].loseMessage} ${selectedWord}`, texts[language].youLost, "💔");
    } else if (!document.getElementById("word-display").innerText.includes("_")) {
        showModal(`${texts[language].winMessage} ${selectedWord}`, texts[language].youWon, "🎉");
    }
}

// Show modal popup
function showModal(message, result, icon) {
    document.getElementById("modal-message").innerText = message;
    document.getElementById("modal-result").innerText = result;
    document.getElementById("lives-left").innerText = icon;

    let resultModal = document.getElementById("result-modal");
    resultModal.style.display = "flex";
}

// Close modal and restart game
function resetGame() {
    document.getElementById("result-modal").style.display = "none";
    openLanguageModal();
}

// Open language & difficulty selection modal
function openLanguageModal() {
    document.getElementById("language-modal").style.display = "flex";
    document.getElementById("language-modal-title").innerText = texts[language].chooseLanguage;
}

// Select game language & difficulty
function selectLanguage(selectedLang) {
    language = selectedLang;
    difficulty = document.querySelector('input[name="difficulty"]:checked').value;

    document.getElementById("language-modal").style.display = "none";
    updateLanguageText();
    initializeGame();
}

// Update all UI texts based on selected language
function updateLanguageText() {
    // Update all UI text content dynamically based on language
    document.getElementById("guess-button").innerText = texts[language].guess;
    document.getElementById("letter-input").placeholder = texts[language].letter;
    document.getElementById("guessed-letters-label").innerText = texts[language].guessedLetters;
    document.getElementById("lives").innerText = texts[language].lives;
    document.getElementById("play-again-btn").innerText = texts[language].playAgain;

    document.querySelector('input[value="easy"]').nextElementSibling.innerText = texts[language].easy;
    document.querySelector('input[value="medium"]').nextElementSibling.innerText = texts[language].medium;
    document.querySelector('input[value="hard"]').nextElementSibling.innerText = texts[language].hard;
}

// Load words and translations on page load
window.onload = async function() {
    await loadWords();
    await loadTranslations();
    openLanguageModal();
};