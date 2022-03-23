'use strict';

// Variables
const score0Elmnt = document.querySelector('#score--0');
const score1Elmnt = document.getElementById('score--1'); // used for ids, faster then querySelector

const current0Elmn = document.getElementById('current--0');
const current1Elm = document.getElementById('current--1');
const diceImage = document.querySelector('.dice');
const btnDiceRoll = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Game functions
const diceRoll = function () {
  let diceNumber = Math.trunc(Math.random() * 6 + 1);
  return diceNumber;
};
// hiding dice image upon initialization
const diceHidden = function () {
  diceImage.classList.add('hidden');
};
// showing dice image on click event
const diceShown = function () {
  diceImage.classList.remove('hidden');
};
// accessing rolled dice image
const displayDiceImage = function (rolledNumber) {
  diceImage.src = `dice-${rolledNumber}.png`;
};

const playerOneActive = function (activePlayer) {
  playerTwo.classList.toggle('player--active');
  playerOne.classList.toggle('player--active');
  return (activePlayer = activePlayer === 0 ? 1 : 0);
};

const playerTwoActive = function (activePlayer) {
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
  return (activePlayer = activePlayer === 0 ? 1 : 0);
};

const activePlayerTextContent = function (activePlayer, currentScore) {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
};

const gameReset = function (activePlayer) {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  if (playerTwo.classList.contains('player--active')) {
    playerTwo.classList.remove('player--active');
    playerOne.classList.add('player--active');
  }

  initScoreElmntValue();
  diceHidden();
  activePlayerTextContent(activePlayer, currentScore);
};

const initScoreElmntValue = function () {
  score0Elmnt.textContent = 0; // type coercion happens
  score1Elmnt.textContent = 0;
};

initScoreElmntValue();
diceHidden();

// Game logic
btnDiceRoll.addEventListener('click', function () {
  if (playing) {
    let rolledDice = diceRoll();
    console.log(rolledDice);
    displayDiceImage(rolledDice);
    diceShown();
    if (rolledDice !== 1) {
      currentScore += rolledDice;
      activePlayerTextContent(activePlayer, currentScore);
    } else {
      if (activePlayer === 0) {
        scores[activePlayer] += currentScore;
        score0Elmnt.textContent = scores[activePlayer];
        currentScore = 0;

        activePlayerTextContent(activePlayer, currentScore);
        //   console.log(scores);
        activePlayer = playerTwoActive(activePlayer);
        //   activePlayer = activePlayer === 0 ? 1 : 0;
      } else {
        scores[activePlayer] += currentScore;
        score1Elmnt.textContent = scores[activePlayer];
        currentScore = 0;

        activePlayerTextContent(activePlayer, currentScore);
        //   console.log(scores);
        activePlayer = playerOneActive(activePlayer);
        //   activePlayer = activePlayer === 0 ? 1 : 0;
      }
    }
  } else {
    alert('This game has finished. Press new game to restart.');
  }
});

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;

  activePlayerTextContent(activePlayer, currentScore);

  if (scores[activePlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
  } else {
    if (activePlayer === 0) {
      activePlayer = playerTwoActive(activePlayer);
    } else {
      activePlayer = playerTwoActive(activePlayer);
    }
  }
});

btnNewGame.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--winner');
  gameReset(activePlayer);
});
