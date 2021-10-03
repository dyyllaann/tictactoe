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
      console.log('');
    }
};

let randomMove = (player) => {
    let randomXY = () => {
      y = Math.floor(Math.random() * 3);
      x = Math.floor(Math.random() * 3);
      return y, x;
    };

    randomXY(); 
    
    if (game.board[y][x] == null) {
        return game.board[y][x] = player;
    } else {
        if (game.running == true) {
            randomMove(player);
        }
    }
}

const check = (player) => {
    let g = game.board;

    // Pause game
    game.running = false;

    // Diagonal check
    if (  
        (g[0][0] == player && g[1][1] == player && g[2][2] == player) ||
        (g[0][2] == player && g[1][1] == player && g[2][0] == player)
    ) {
        game.winner = player;
        return console.log(`Player ${player} wins!\n`);
    }

    // Horizontal check
    for (row in g) {
        if (g[row][0] == player && g[row][1] == player && g[row][2] == player) {
            game.winner = player;
            return console.log(`Player ${player} wins!\n`);
        }
    }

    // Vertical check
    for (col in g) {
      if (g[0][col] == player && g[1][col] == player && g[2][col] == player) {
        game.winner = player;
        return console.log(`Player ${player} wins!\n`);
      }
    }

    // Tie check
    let tie = (arr) => arr.every(v => v != null);
    if (tie(g[0]) == true && tie(g[1]) == true && tie(g[2]) == true) {
        return console.log(`It's a tie!\n`);
    }

    // Resume game
    game.running = true;
}

const Player = (player) => {
    const move = (y, x) => {
        if (game.board[y][x] == null) {
            game.board[y][x] = player;
        // } else {
            // console.log(`Player ${player}: Choose a better spot, dummy!`);
        }
    };

    return { move };
};

const Player1 = Player(1);
const Player2 = Player(0);

let test_ai = () => {
    while (game.running == true) {
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
        check(0);
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

const testCheck = {
    horizontal: function() {
        game.board = [
            [1,0,1],
            [0,null,1],
            [1,1,1]            
        ]
        console.log(`HORIZONTAL CHECK:`)
        game.display();
        check(1);
    },

    vertical: function() {
        game.board = [
            [1,0,1],
            [1,null,1],
            [1,1,0]            
        ]
        console.log(`VERTICAL CHECK:`)
        game.display();
        check(1);
    },

    diagonal: function() {
        game.board = [
            [1,0,1],
            [0,1,1],
            [1,0,0]            
        ]
        console.log(`DIAGONAL CHECK:`)
        game.display();
        check(1);
    },

    tie: function() {
        game.board = [
            [1,0,1],
            [0,0,1],
            [1,1,0]
        ]
        console.log(`TIE CHECK:`)
        game.display();
        check(1);
    }
}

// testCheck.horizontal();
// testCheck.vertical();
// testCheck.diagonal();
// testCheck.tie();
test_ai();
