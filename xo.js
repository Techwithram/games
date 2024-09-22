let player1 = "X";
let player2 = "O";
let currPlayer = player1;
let rows = 3;
let columns = 3;
let board;
let gameOver = false;
window.onload = function () {
  setGame();
};
function setGame() {
  board = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      let box = document.createElement("div");
      box.id = r.toString() + "-" + c.toString();
      box.classList.add("box");
      //box.addEventListener("click", setPiece);
      document.getElementById("board").append(box);
      box.addEventListener("click", setPiece);
    }
    board.push(row);
  }
}
function setPiece() {
  if (gameOver) {
    return;
  }
  let coord = this.id.split("-");
  let r = parseInt(coord[0]);
  let c = parseInt(coord[1]);

  if (r < 0) {
    return;
  }
  board[r][c] = currPlayer;
  let box = document.getElementById(r.toString() + "-" + c.toString());
  if (currPlayer == player1) {
    box.classList.add("X");
    currPlayer = player2;
  } else {
    box.classList.add("O");
    currPlayer = player1;
  }
  checkWinner();
}
function checkWinner() {
  for (let r = 0; r < rows; r++) {
    if (
      board[r][0] != " " &&
      board[r][0] == board[r][1] &&
      board[r][1] == board[r][2]
    ) {
      setWinner(r, 0);
      return;
    }
  }
  for (let c = 0; c < columns; c++) {
    if (
      board[0][c] != " " &&
      board[0][c] == board[1][c] &&
      board[1][c] == board[2][c]
    ) {
      setWinner(0, c);
      return;
    }
  }
  // Check diagonals
  if (
    board[0][0] != " " &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  ) {
    setWinner(0, 0);
    return;
  }
  if (
    board[0][2] != " " &&
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0]
  ) {
    setWinner(0, 2);
    return;
  }
  let isTie = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == " ") {
        isTie = false;
        break;
      }
    }
  }
  if (isTie) {
    setTie();
  }
}
function setWinner(r, c) {
  if (board[r][c] == player1) {
    let winner = document.getElementById("winnerd");
    winner.innerText = "PLAYER X won the game";
    winner.style.backgroundColor = "teal";
  } else if (board[r][c] == player2) {
    let winner = document.getElementById("winnerd");
    winner.innerText = "PLAYER O won the game";
    winner.style.backgroundColor = "teal";
  }

  gameOver = true;
}
function reset() {
  window.location.reload();
}
function setTie() {
  let winner = document.getElementById("winnerd");
  winner.innerText = "Game Tied";
  winner.style.backgroundColor = "teal";
}
