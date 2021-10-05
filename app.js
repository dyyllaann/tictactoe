let sfxPlayer1 = new Audio(
  "https://freesound.org/data/previews/388/388046_7284354-lq.mp3"
);

let sfxPlayer2 = new Audio(
  "https://freesound.org/data/previews/388/388047_7284354-lq.mp3"
);

let sfxCredits = new Audio(
  "https://freesound.org/data/previews/344/344696_6212127-lq.mp3"
);

const game = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  running: true,
  round: 1,
  winner: undefined,

  display: function () {
    for (i in this.board) {
      console.log(this.board[i]);
    }
    console.log("");
  },

  draw: function () {
    for (y in this.board) {
      for (x in this.board[y]) {
        if (this.board[y][x] == 1) {
          document.getElementById(`${y}-${x}`).classList.add("x");
        } else if (this.board[y][x] == 2) {
          document.getElementById(`${y}-${x}`).classList.add("o");
        }
      }
    }
  },

  erase: function () {
    for (y in this.board) {
      for (x in this.board[y]) {
        document.getElementById(`${y}-${x}`).classList.remove("x");
        document.getElementById(`${y}-${x}`).classList.remove("o");
      }
    }
    document.getElementById(`banner`).innerHTML = "";
  },

  check: function (player) {
    let g = this.board;
    let message = "";

    // Pause game
    this.running = false;

    // Diagonal check
    if (
      (g[0][0] == player && g[1][1] == player && g[2][2] == player) ||
      (g[0][2] == player && g[1][1] == player && g[2][0] == player)
    ) {
      this.winner = player;
      message = `Player ${player} wins!\n`;
      document.getElementById("banner").innerHTML = message;
      return console.log(message);
    }

    // Horizontal check
    for (row in g) {
      if (g[row][0] == player && g[row][1] == player && g[row][2] == player) {
        this.winner = player;
        message = `Player ${player} wins!\n`;
        document.getElementById("banner").innerHTML = message;
        return console.log(message);
      }
    }

    // Vertical check
    for (col in g) {
      if (g[0][col] == player && g[1][col] == player && g[2][col] == player) {
        this.winner = player;
        message = `Player ${player} wins!\n`;
        document.getElementById("banner").innerHTML = message;
        return console.log(message);
      }
    }

    // Tie check
    let tie = (arr) => arr.every((v) => v != null);
    if (tie(g[0]) == true && tie(g[1]) == true && tie(g[2]) == true) {
      message = `It's a tie!\n`;
      document.getElementById("banner").innerHTML = message;
      return console.log(message);
    }

    // Resume game
    this.running = true;
  },
};

const reset = () => {
  game.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  game.running = true;
  game.round = 1;
  game.winner = undefined;

  game.erase();
};

let randomMove = (player) => {
  let randomXY = () => {
    y = Math.floor(Math.random() * 3);
    x = Math.floor(Math.random() * 3);
    return y, x;
  };

  randomXY();

  if (game.board[y][x] == null) {
    return (game.board[y][x] = player);
  } else {
    if (game.running == true) {
      randomMove(player);
    }
  }
};

const Player = (player) => {
  const move = (y, x) => {
    if (game.running == true) {
      // console.log(`ROUND ${game.round}`);

      if (game.board[y][x] == null) {
        game.board[y][x] = player;
        sfxPlayer1.play();
        // game.display();
        game.draw();
        game.check(1);
      }
    }

    if (game.running == true) {
      randomMove(2);
      setTimeout(() => {
        game.check(2);
        sfxPlayer2.play();
        // game.display();
        game.draw();
      }, 1000);
    }

    if (game.winner == undefined) {
      game.round++;
    }
  };
  return { move };
};

const Player1 = Player(1);
const Player2 = Player(2);

let test_ai = () => {
  while (game.running == true) {
    console.log(`ROUND ${game.round}`);

    // Player 1 assigns value to board coordinates
    randomMove(1);

    // Display results
    game.display();

    // Draw results
    game.draw();

    // Check for winner
    game.check(1);

    if (game.running == true) {
      // Player 2 assigns value to board coordinates
      randomMove(2);

      // Display results
      game.display();

      // Draw results
      game.draw();

      // Check for winner
      game.check(2);
    }

    if (game.winner == undefined) {
      game.round++;
    }
  }
};

const testCheck = {
  horizontal: function () {
    game.board = [
      [1, 0, 1],
      [0, null, 1],
      [1, 1, 1],
    ];
    console.log(`HORIZONTAL CHECK:`);
    game.display();
    game.check(1);
  },

  vertical: function () {
    game.board = [
      [1, 0, 1],
      [1, null, 1],
      [1, 1, 0],
    ];
    console.log(`VERTICAL CHECK:`);
    game.display();
    game.check(1);
  },

  diagonal: function () {
    game.board = [
      [1, 0, 1],
      [0, 1, 1],
      [1, 0, 0],
    ];
    console.log(`DIAGONAL CHECK:`);
    game.display();
    game.check(1);
  },

  tie: function () {
    game.board = [
      [1, 0, 1],
      [0, 0, 1],
      [1, 1, 0],
    ];
    console.log(`TIE CHECK:`);
    game.display();
    game.check(1);
  },
};

// testCheck.horizontal();
// testCheck.vertical();
// testCheck.diagonal();
// testCheck.tie();
// test_ai();
// console.log(randomChoice());

let getUserInput = (element) => {
  let coordinates = element.id.split("-");
  let y = coordinates[0];
  let x = coordinates[1];

  Player1.move(y, x);
};
