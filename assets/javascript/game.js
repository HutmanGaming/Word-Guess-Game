var solutions = [
	"JAZZ",
	"HANGMAN",
	"CODING",
	"TEACHER",
	"STUDENT",
	"DEVELOPER",
	"SON",
	"MOTHER",
	"FATHER",
	"SON",
	"DAUGHTER",
	"NOTHING",
	"EVERYTHING",
	"AMAZING"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let wins = 0;
let losses = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = solutions[Math.floor(Math.random() * solutions.length)];
}

function generateButtons() {
  let buttonsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = 'assets/images/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Saved The Hangman!!!';
    wins++;
    updatewins();
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lose, Poor Hangman. Start a new game and try to save him this time!';
    losses++;
    updatelosses();
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
function updatewins() {
  document.getElementById('wins').innerHTML = wins;
}
function updatelosses() {
  document.getElementById('losses').innerHTML = losses;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'assets/images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
