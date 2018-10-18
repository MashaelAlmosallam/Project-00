console.log("JS Connected");

function startGame() {
  for (i = 0; i < 9; i++) { // restart the game
    replay(i);
  }
  //Declare variables
  document.currentPlayer = "X";
  document.winner = null;
}
// function to check the next clikc is not the same as the previous one x,o,x,o
function nextMove(box) { // checking error when click on filled box or want to continue the game when someone had already won 
  if (document.winner !== null) {
    declareMessage(document.currentPlayer + " have won the game");
  }
  else if (this.innerText === "") {
    this.innerText = document.currentPlayer; // when X invoke starts
    // to call the next player O or X
    if (document.currentPlayer === "X") {
      this.style.color = "red";

    } else {
      this.style.color = "orange";
    }
    switchPlayer();
  }
  else {
    declareMessage("Pick an Empty box!!");
  }
}

function switchPlayer() {
  if (checkWinner(document.currentPlayer)) {
    declareMessage("Congratulation " + document.currentPlayer + ", you have won the game!!");
    document.winner = document.currentPlayer;
  }
  else if (checkForDraw()) { // calls the check draw function
    declareMessage("IT IS A DRAW!")
  }
  else if (document.currentPlayer === "X") {
    document.currentPlayer = "O"// switch message to O's turn
    declareMessage(document.currentPlayer + "'s turn now! ");
  }
  else {
    document.currentPlayer = "X";// switch message to X's turn
    declareMessage(document.currentPlayer + "'s turn now! ");
  }

}

// click event listener on the boxes
var cells = document.querySelectorAll("td");
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", nextMove);
}

// check for draw if all boxes are filled and there are no winners checkWinner then we return false
function checkForDraw() {
  var tds = document.querySelectorAll("td");
  var isAllTaken = true;
  for (var i = 0; i < tds.length; i++) {
    if (tds[i].innerHTML === "") {
      isAllTaken = false;
    }
  }
  return isAllTaken;
}

// check the row
function checkRow(a, b, c, move) {
  var result = false;
  if (getBoxValue(a) === move && getBoxValue(b) === move && getBoxValue(c) === move) {
    result = true;
  }
  return result;
}

// calls the function checkRow for the winning combination 
function checkWinner(move) {
  var result = false;
  if (checkRow(0, 1, 2, move)) {
    result = true;
  }
  else if (checkRow(3, 4, 5, move)) {
    result = true;
  }
  else if (checkRow(0, 3, 6, move)) {
    result = true;
  } else if (checkRow(6, 7, 8, move)) {
    result = true;
  }
  else if (checkRow(2, 5, 8, move)) {
    result = true;
  }
  else if (checkRow(1, 4, 7, move)) {
    result = true;
  }
  else if (checkRow(2, 4, 6, move)) {
    result = true;
  }
  else if (checkRow(0, 4, 8, move)) {
    result = true;
  }
  return result;
}

// get the box id
function getBoxValue(number) {
  // return the value of the element X or O
  return document.getElementById(number).innerText;
}


// function to declare a message who won/lost game
function declareMessage(text) {
  document.getElementById("message").innerText = text;
}

function replay(number) {
  document.getElementById(number).innerText = "";
}
