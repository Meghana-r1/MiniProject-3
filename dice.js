
'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentscore = 0;
const scores = [0, 0];
let activePlayer = 0;
let playing = true;

function switchPlayer() {
  currentscore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentscore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function checkWinner() {
  if (scores[0] >= 20 || scores[1] >= 20) {
    playing = false;
    diceEl.classList.add('hidden');

    if (scores[0] > scores[1]) {
      document.getElementById('score--0').textContent = 'Winner!';
      document.getElementById('score--1').textContent = 'Loser!';
      player0El.classList.add('player--winner');
      player1El.classList.remove('player--winner');
    } else if (scores[1] > scores[0]) {
      document.getElementById('score--1').textContent = 'Winner!';
      document.getElementById('score--0').textContent = 'Loser!';
      player1El.classList.add('player--winner');
      player0El.classList.remove('player--winner');
    } else {
      document.getElementById('score--0').textContent = 'Draw!';
      document.getElementById('score--1').textContent = 'Draw!';
      player0El.classList.remove('player--winner');
      player1El.classList.remove('player--winner');
    }
  }
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentscore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    checkWinner();
    if (playing){
    switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  scores[0] = 0;
  scores[1] = 0;
  currentscore = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  diceEl.classList.add('hidden');
});
