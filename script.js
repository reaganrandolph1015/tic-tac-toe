const board = (() => {
  const gameBoard = [];
  const x = 'x';
  const o = 'o';

  const makeBoard = () => {
    let rows = 3;
    let cols = 3;
    gameContainer.style.setProperty('--grid-rows', rows);
    gameContainer.style.setProperty('--grid-cols', cols);

    for (let i = 0; i < rows * cols; i++) {
      let box = document.createElement('div');
      gameContainer.appendChild(box).className = 'box';
    }
  };
})();

//TODO: make player funct factory
// const playerFact = (x, o) => {};
