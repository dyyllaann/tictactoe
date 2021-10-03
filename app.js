const game = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    running: true,
    round: 1,
    winner: undefined,

    display: function() {
      for (i in this.board) {
        console.log(this.board[i]);
      }
      console.log("");
    }
};

let randomXY = () => { 
    y = Math.floor(Math.random() * 3); 
    x = Math.floor(Math.random() * 3);
    return y,x;
}

let randomMove = (player) => {
    // let checkTaken = () => {
    //     y = Math.floor(Math.random() * 3);
    //     x = Math.floor(Math.random() * 3);

    //     if (game.board[y][x] == null) {
    //         return y, x;
    //     }
    // }

    // checkTaken();
    // console.log(x,y);
    // game.board[y][x] = player;

    randomXY(); 
    
    if (game.board[y][x] == null) {
        return game.board[y][x] = player;
        // console.log(y, x);
    } else {
        if (game.running == true) {
            randomMove(player);
        }
    }
}

// randomMove(1);

const check = (player) => {
    let g = game.board;
    game.running = false;

    // Diagonal check
    if (  
        (g[0][0] == player && g[1][1] == player && g[2][2] == player) ||
        (g[0][1] == player && g[1][1] == player && g[0][2] == player)
    ) {
        game.winner = player;
        return console.log(`Player ${player} wins!`);
    }

    // Horizontal check
    for (row in g) {
        if (g[row][0] == player && g[row][1] == player && g[row][2] == player) {
            game.winner = player;
            return console.log(`Player ${player} wins!`);
        }
    }

    // Vertical check
    for (col in g) {
      if (g[0][col] == player && g[1][col] == player && g[2][col] == player) {
        game.winner = player;
        return console.log(`Player ${player} wins!`);
      }
    }

    // Tie check
    let checker = (arr) => arr.every(v => v != null);
    if (checker(game.board) == true) {
        return console.log(`It's a tie!`);
    }

}

const Player = (player) => {
    const move = (y, x) => {
        if (game.board[y][x] == null) {
            game.board[y][x] = player;
        // } else {
        //     console.log(`Player ${player}: Choose a better spot, dummy!`);
        }
    };

    return { move };
};

const Player1 = Player(1);
const Player2 = Player(0);

let test_1 = () => {
    while (game.running = true) {
      console.log(`ROUND ${game.round}`);

      // Player 1 assigns value to board coordinates
      randomMove(1);

      // Display results
      game.display();

      // Check for winner
      check(1);

      if (game.running == true) {
        // Player 2 assigns value to board coordinates
        randomMove(0);
        // Display results
        game.display();
        // Check for winner
        check(2);
      }

      if (game.winner == undefined) {
        game.round++;
      }
    }
}

let test_2 = () => {
    // Round 1
    console.log("ROUND 1");
    // Player1.move(0, 0);
    //   Player2.move(0, 1);
    randomMove(1);
    randomMove(0);
    game.display();
    check();

    // Round 2
    console.log("ROUND 2");
    // Player1.move(1, 1);
    //   Player2.move(1, 2);
    randomMove(1);
    randomMove(0);
    game.display();
    check();

    // Round 3
    console.log("ROUND 3");
    // Player1.move(2, 2);
    // Player2.move(0, 2);
    randomMove(1);
    randomMove(0);
    game.display();
    check();
}

// test_1();
// test_2();

const tieCheck = () => {
    let g = game.board;
    g[0][0] = 1;
    g[0][1] = 0;
    g[0][2] = 1;
    g[1][0] = 0;
    g[1][1] = 0;
    g[1][2] = 1;
    g[2][0] = 1;
    g[2][1] = 1;
    g[2][2] = 0;

    game.display();
    check(1);
}

tieCheck();

