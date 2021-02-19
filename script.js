//declare global vars **try and organize these later**
let turn = 0;
let winner = null;

// make boardArr inside gameBoard object
const gameBoard = (() => {
  boardArr = ["", "", "", "", "", "", "", "", ""];
  return { boardArr };
})();

//factory function to make player objects
const player = (name, peice) => {
  return { name, peice };
};

// (multi) pressing and entering name in player btns auto-creates new player
const playBtn = document.getElementById("playBtnMulti");
playBtn.addEventListener("click", function () {
  let playerName1 = document.getElementById("player1Name").value;
  let playerName2 = document.getElementById("player2Name").value;
  player1 = player(playerName1, "x");
  player2 = player(playerName2, "O");
  gameTrack.start();
  return player1, player2;
});

// (solo-easy) entering name and pressing play makes new players and starts game
const easyBtnSolo = document.getElementById("easyBtnSolo");
easyBtnSolo.addEventListener("click", function () {
  let player1Name = document.getElementById("soloName").value;
  player1 = player(player1Name, "X");
  player2 = player("The Computer", "O");
  soloPlay.soloStart();
  return player1, player2;
});

// (solo-hard) entering name and pressing play makes new players and starts game
const hardBtnSolo = document.getElementById("hardBtnSolo");
hardBtnSolo.addEventListener("click", function () {
  let player1Name = document.getElementById("soloName").value;
  // player1 = player(player1Name, "X");
  // player2 = player("The Computer", "O");
  // soloPlay.soloHardStart();
  // return player1, player2;
  alert("Hard mode is currently under repair. Sorry for the inconvienence!!");
});

// tracks user clicks
const gameBoardContainer = document.getElementById("gameboard-container");

//object containing all functions/vars for game starting, and score-keeping
const gameTrack = {
  //function to start game
  start: function () {
    turn = 1;
    this.turnPlay();
    this.plOneTurn();
    this.createScoreBoard();
    return turn;
  },

  //changes btns to scoreboard area
  btnDiv: document.getElementById("player-btn-container"),
  scoreDiv: document.createElement("div"),
  createScoreBoard: function () {
    this.scoreDiv.className = "mb-4 text-center score-board";
    this.scoreDiv.id = "score-board";
    this.btnDiv.replaceWith(this.scoreDiv);
    return this.scoreDiv;
  },

  //changes scoreboard based on turn
  plOneTurn: function () {
    this.scoreDiv.innerText = `It's ${player1.name}'s turn!`;
  },

  plTwoTurn: function () {
    this.scoreDiv.innerText = `It's ${player2.name}'s turn!`;
  },
  //places x or o marker on board and in array based on turn #
  turnPlay: function () {
    gameBoardContainer.onclick = function (event) {
      let target = event.target;
      let x = target.id;
      if (target.innerText == "") {
        if (turn % 2 != 0) {
          target.innerText = "X";
          boardArr[x] = "X";
          turn++;
          gameTrack.plTwoTurn();
          gameTrack.checkWinner();
        } else if (turn % 2 == 0) {
          target.innerText = "O";
          boardArr[x] = "O";
          turn++;
          gameTrack.plOneTurn();
          gameTrack.checkWinner();
        } else return;
      }
    };
  },

  // checks if three arr props are equal and not eqaul to " "
  equalCheck(x, y, z) {
    return x === y && y === z && x !== "";
  },

  // checks arr.props to see if win condition is met
  checkWinner: function () {
    //check for left to right diaganol
    if (this.equalCheck(boardArr[0], boardArr[4], boardArr[8]))
      winner = boardArr[0];
    //check for right to left diagonal
    if (this.equalCheck(boardArr[6], boardArr[4], boardArr[2]))
      winner = boardArr[6];
    //check for vertical win
    if (this.equalCheck(boardArr[0], boardArr[3], boardArr[6]))
      winner = boardArr[0];
    else if (this.equalCheck(boardArr[1], boardArr[4], boardArr[7])) {
      winner = boardArr[1];
    } else if (this.equalCheck(boardArr[2], boardArr[5], boardArr[8])) {
      winner = boardArr[2];
    }
    //check for horizontal win
    if (this.equalCheck(boardArr[0], boardArr[1], boardArr[2]))
      winner = boardArr[0];
    else if (this.equalCheck(boardArr[3], boardArr[4], boardArr[5])) {
      winner = boardArr[3];
    } else if (this.equalCheck(boardArr[6], boardArr[7], boardArr[8])) {
      winner = boardArr[6];
    }
    if (winner != null) {
      this.gameWon(winner);
    } else if (winner == null) {
      this.gameTie(winner);
    }
  },

  //checks if game is a statemate / tie
  gameTie: function () {
    let tieCheck = 0;
    for (i = 0; i < boardArr.length; i++) {
      if (boardArr[i] == "X" || boardArr[i] == "O") {
        tieCheck++;
      }
    }
    if (winner == null && tieCheck == 9) {
      gameBoardContainer.onclick = "";
      this.scoreDiv.innerText = `This game a tie!`;
      winner = "tie";
    }
  },

  //removes onclick from gameboard and announces the winner
  gameWon: function () {
    gameBoardContainer.onclick = "";
    if (winner === "X") {
      this.scoreDiv.innerText = `${player1.name} won!!`;
    } else if (winner === "O") {
      this.scoreDiv.innerText = `${player2.name} won!!`;
    } else return;
  },
};

//functions & vars for solo play
const soloPlay = {
  availArr: [],
  z: 0,

  //starts solo game (easyMode)
  soloStart: function () {
    turn = 1;
    this.soloTurnPlay();
    gameTrack.plOneTurn();
    gameTrack.createScoreBoard();
    return turn;
  },

  // next 2 functions are for when minimax is added to hard mode

  // //starts solo game (hardMode)
  // soloHardStart: function () {
  //   turn = 1;
  //   this.soloTurnPlayHard();
  //   gameTrack.plOneTurn();
  //   gameTrack.createScoreBoard();
  //   return turn;
  // },

  // soloTurnPlayHard: function () {
  //   gameBoardContainer.onclick = function (event) {
  //     let target = event.target;
  //     let x = target.id;
  //     if (target.innerText == "") {
  //       if (turn % 2 != 0) {
  //         target.innerText = "X";
  //         boardArr[x] = "X";
  //         turn++;
  //         gameTrack.plTwoTurn();
  //         gameTrack.checkWinner();
  //       } else return;
  //     }
  //   };
  // },

  //comp find empty spots in array
  availableSpots: function () {
    this.availArr = [];
    for (let i = 0; i <= boardArr.length; i++) {
      if (boardArr[i] === "") {
        this.availArr.push(i);
      }
    }
  },

  //comp randomly pics on of availArr
  pickSpot: function () {
    let random = Math.floor(Math.random() * this.availArr.length);
    console.log(this.availArr[random]);
    this.z = this.availArr[random];
    return this.z;
  },

  compSelection: function () {
    this.pickSpot();
    boardArr[this.z] = "O";
    document.getElementById(this.z).innerText = "O";
  },

  // comp selects and plays spot on its turn
  compTurnEasy: function () {
    if (winner == null) {
      setTimeout(function () {
        soloPlay.availableSpots();
        soloPlay.compSelection();
        turn++;
        gameTrack.plOneTurn();
        gameTrack.checkWinner();
      }, 700);
    } else return;
  },

  //lets user pick spot on their turn
  soloTurnPlay: function () {
    gameBoardContainer.onclick = function (event) {
      let target = event.target;
      let x = target.id;
      if (target.innerText == "") {
        if (turn % 2 != 0) {
          target.innerText = "X";
          boardArr[x] = "X";
          turn++;
          gameTrack.plTwoTurn();
          gameTrack.checkWinner();
          soloPlay.compTurnEasy();
        } else return;
      }
    };
  },
};

//object containing functions to restart game
const gameRestart = {
  //clears array props (boardArr and availArr)
  clearArr: function () {
    for (let i = 0; i < boardArr.length; i++) {
      boardArr[i] = "";
    }
    soloPlay.availArr = [];
  },

  //clears board
  clearBoard: function () {
    for (let j = 0; j <= 8; j++) {
      document.getElementById(j).innerText = "";
    }
  },

  clearScore: function () {
    gameTrack.scoreDiv.replaceWith(gameTrack.btnDiv);
  },

  clearPlayerInput: function () {
    player1 = null;
    player2 = null;
    document.getElementById("player1Name").value = "";
    document.getElementById("player2Name").value = "";
    document.getElementById("soloName").value = "";
  },
};

//functions and vars for keeping track of multiple rounds
const roundTracking = {
  //vars to keep track of player scores
  pl1Score: 0,
  pl2Score: 0,

  //dom nodes for changing scoreboard
  ruleHead: document.getElementById("rules-head"),
  ruleBody: document.getElementById("rules-text"),
  scoreHead: document.createElement("h3"),
  scoreText: document.createElement("p"),

  //changes rules to scoreboard
  makeScore: function () {
    this.scoreHead.className = "text-center rules-header m-2";
    this.scoreText.className = "rules-text text-center mb-2";
    //replaces rules with scoreboard
    this.ruleBody.replaceWith(this.scoreText);
    this.ruleHead.replaceWith(this.scoreHead);
    //adds text to scoreboard
    this.scoreHead.innerText = "Scoreboard";
    this.scoreText.innerHTML = `${player1.name}'s score = ${this.pl1Score} <br> 
    ${player2.name}'s score = ${this.pl2Score}`;
  },

  //function to keep track of player scores
  scoreTrack: function () {
    if (winner === "X") {
      this.pl1Score++;
    } else if (winner === "O") {
      this.pl2Score++;
    }
    winner = null;
  },

  // sets scores back to 0 and brings back rules
  eraseScore: function () {
    this.pl1Score = 0;
    this.pl2Score = 0;
    this.scoreHead.replaceWith(this.ruleHead);
    this.scoreText.replaceWith(this.ruleBody);
  },
};

//restart function attached to restart btn
restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", function () {
  winner = null;
  gameRestart.clearArr();
  gameRestart.clearBoard();
  gameRestart.clearScore();
  gameRestart.clearPlayerInput();
  roundTracking.eraseScore();
});

//next round function attached to next round btn
nextBtn = document.getElementById("next-round-btn");
nextBtn.addEventListener("click", function () {
  if (winner == null) {
    alert("FINISH THIS GAME YOU FUCK");
  } else {
    gameRestart.clearArr();
    gameRestart.clearBoard();
    roundTracking.scoreTrack(winner);
    roundTracking.makeScore();
    winner = null;
    turn = 0;
    if (player2.name === "The Computer") {
      soloPlay.soloStart();
    } else {
      gameTrack.start();
    }
  }
});

// will add after implementing ai to play user
// const soloBtn = document.getElementById("soloBtn");
// soloBtn.addEventListener("click", function () {});
