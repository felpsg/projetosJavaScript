let target;

const humanGuessInput = document.getElementById('human-guess');

const roundNumberDisplay = document.getElementById('round-number');

const computerGuessDisplay = document.getElementById('computer-guess');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const targetNumberDisplay = document.getElementById('target-number');
const computerWinsDisplay = document.getElementById('computer-wins');

const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round');

guessButton.addEventListener('click', () => {
  // Gera o valor alvo
  target = generateTarget();
  // Recupera o palpite do jogador
  const currentHumanGuess = humanGuessInput.value;

  const computerGuess = Math.floor(Math.random() * 10);
  // Faça um 'palpite de computador' aleatório
  // Exibe o palpite do computador e o alvo
  computerGuessDisplay.innerText = computerGuess;
  targetNumberDisplay.innerText = target;

  // Determina se o humano ou o computador vence:
  const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target);
  const winner = humanIsWinner ? 'human' : 'computer';

  // Atualize a pontuação correta:
  updateScore(winner);

  // Exibe o vencedor
  if (humanIsWinner) {
    guessButton.innerText = 'VOCÊ GANHOU!!!';
    guessButton.classList.toggle('winning-text');
  } else {
    computerWinsDisplay.innerText = 'Computador Venceu!!!';
  }
  //outra forma de fazer o if
  // winnerDisplay.innerText = humanIsWinner ? 'You win!' : 'Computer wins!';

  // Exibe as pontuações atuais:
  humanScoreDisplay.innerText = humanScore;
  computerScoreDisplay.innerText = computerScore;

  // Define o estado desabilitado correto para os botões
  guessButton.setAttribute('disabled', true);
  nextRoundButton.removeAttribute('disabled');
});

nextRoundButton.addEventListener('click', () => {
  // Aumenta o número da rodada
  advanceRound();
  // Exibe o novo número redondo
  roundNumberDisplay.innerText = currentRoundNumber;

  // Define o estado desabilitado correto para os botões
  nextRoundButton.setAttribute('disabled', true);
  guessButton.removeAttribute('disabled');

  // Redefina a caixa de entrada de palpite e a exibição do número de destino:
  targetNumberDisplay.innerText = '?';
  guessButton.innerText = 'ADIVINHAR';
  humanGuessInput.value = '';
  computerGuessDisplay.innerText = '?';
  computerWinsDisplay.innerText = '';
  guessButton.classList.remove('winning-text');
});

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value + 1;
  handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
  humanGuessInput.value = +humanGuessInput.value - 1;
  handleValueChange(humanGuessInput.value);
});

const handleValueChange = value => {
  if (value > 0 && value <= 9) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } else if (value > 9) {
    addButton.setAttribute('disabled', true);
  } else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
};

humanGuessInput.addEventListener('input', function (e) {
  handleValueChange(e.target.value);
});
