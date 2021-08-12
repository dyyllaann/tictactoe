let gameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// let randomMove = () => {
//     let y = Math.floor(Math.random() * 3);
//     let x = Math.floor(Math.random() * 3);
//     return (y, x);
// }

const displayBoard = () => {
  for (i in gameBoard) {
    console.log(gameBoard[i]);
  }
  console.log("");
};

const check = () => {
    let g = gameBoard;
    for (i in gameBoard) {
      // Horizontal check
      if (g[i][0] == 1 && g[i][1] == 1 && g[i][2] == 1) {
        console.log("Player 1 wins!");
      } else {
        if (g[i][0] == 0 && g[i][1] == 0 && g[i][2] == 0) {
          console.log("Player 2 wins!");
        }
      }

      // Vertical check
      if (g[0][i] == 1 && g[1][i] == 1 && g[2][i] == 1) {
        console.log("Player 1 wins!");
      } else {
        if (g[0][i] == 0 && g[1][i] == 0 && g[2][i] == 0) {
          console.log("Player 2 wins!");
        }
      }
    }
}

const Player = (number) => {
    const move = (y, x) => {
        if (gameBoard[y][x] == null) {
            gameBoard[y][x] = number;
        } else { console.log(`Player ${number}: Choose a better spot, dummy!`) }
    }

    return { move };
};

const Player1 = Player(1);
const Player2 = Player(0);

// Round 1
console.log("ROUND 1");
Player1.move(0, 0);
Player2.move(1, 1);
displayBoard();
check();

// Round 2
console.log("ROUND 2");
Player1.move(1, 0);
Player2.move(1, 2);
displayBoard();
check();

// Round 3
console.log("ROUND 3");
Player1.move(2, 2);
Player2.move(1, 2);
displayBoard();
check();