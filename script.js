// player factory function
const playerFact = (name, choice) => {
  return { name, choice };
};

// gameboard module
const board = (() => {
  // generate board array
  const gameBoard = [];
  for (let i = 0; i < 9; i++) {
    gameBoard.push('X');
  }

  let boxes = document.querySelector('.boxes');

  gameBoard.forEach((item, index) => {
    const box = document.createElement('div');
    box.className = 'box';
    boxes.appendChild(box);
  });
  //TODO finish player choice on click
  Array.from(boxes.children).forEach((box, index) => {
    box.addEventListener('click', () => {
      // display active player choice
      box.classList.add(game.activePlayer.choice);
      box.setAttribute('data', game.activePlayer.choice);
      // update array val
      gameBoard[index] = game.activePlayer.choice;
      box.style.pointerEvents = 'none';
      game.remainingSpots -= 1;

      game.checkWinner();

      // check remaining spots
      if (game.winnerDeclared == false) {
        if (game.remainingSpots > 0) {
          game.alertNext();
          game.nextPlayer();
        } else if (game.remainingSpots == 0) {
          game.declareTie();
        }
      }
    });
  });

  return { gameBoard };
})();

const game = (() => {
  // player declarations
  const playerOne = playerFact('Player 1', 'X');
  const playerTwo = playerFact('Player 2', 'O');

  // default settings
  let activePlayer = playerOne;
  let winnerDeclared = false;
  let remainingSpots = 9;

  // selectors
  let subtext = document.querySelector('.subtext'); // for winner/tie display
  let playerName = document.querySelector('.playerName'); // alerts player turn

  // win cons
  const winningAxes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // check winner
  function checkWinner() {
    winningAxes.forEach((item, index) => {
      if (
        board.gameBoard[item[0]] === this.activePlayer.choice &&
        board.gameBoard[item[1]] === this.activePlayer.choice &&
        board.gameBoard[item[2]] === this.activePlayer.choice
      ) {
        console.log('checkWinner() ran');
        subtext.innerHTML = `<b>${this.activePlayer.name} wins!</b>`;
        this.winnerDeclared = true;
      }
    });
  }

  // alert next player's turn
  function alertNext() {
    this.activePlayer === playerOne
      ? (playerName.textContent = 'Player 2')
      : (playerName.textContent = 'Player 1');
  }

  function nextPlayer() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
    console.log('nextPlayer() ran');
    console.log('active player: ' + activePlayer.name);
  }

  function declareTie() {
    subtext.innerHTML = '<b>Tie game!</b>';
  }

  return {
    activePlayer,
    remainingSpots,
    checkWinner,
    alertNext,
    nextPlayer,
    declareTie,
    winnerDeclared,
  };
})();
