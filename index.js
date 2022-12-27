(function() {

  let player = "X";
  let boardStatus = ["", "", "", "", "", "", "", "", ""];
  const WIN_MESSAGE = () => `Player ${player} has won!`;
  const STATUS = () => `It's ${player}'s turn.`;
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4 ,8],
    [2, 4, 6]
  ]
  window.addEventListener("load", init);


  function init() {
    let statusDisplay = document.querySelector(".status");
    statusDisplay.textContent = STATUS();
    document.getElementById("start").addEventListener('click', startGame);
  }

  function startGame() {
    document.querySelector("article").classList.remove("hidden");
    this.textContent = "Restart Game";
    document.querySelectorAll(".board-cell").forEach(
      cell => cell.textContent = ""
    );
    document.querySelectorAll(".board-cell").forEach(
      cell => cell.addEventListener('click', cellClick)
    );
    boardStatus = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    document.querySelector(".status").textContent = STATUS();
  }

  function cellClick(event) {
    const clicked = event.currentTarget;
    const cellIndex = parseInt(clicked.getAttribute("data-pos-index"));

    if (boardStatus[cellIndex] === "") {
      boardStatus[cellIndex] = player;
      clicked.textContent = player;
      checkWinLose();
    }
  }

  function checkWinLose() {
    let winStatus = false;
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      let condition = WIN_CONDITIONS[i];
      let a = boardStatus[condition[0]];
      let b = boardStatus[condition[1]];
      let c = boardStatus[condition[2]];
      if (!(a === "" || b === "" || c === "") && a === b && b === c) {
        winStatus = true;
        break;
      }
    }

    let statusDisplay = document.querySelector(".status");
    if (winStatus) {
      statusDisplay.textContent = WIN_MESSAGE();
      document.querySelectorAll(".board-cell").forEach(
        cell => cell.removeEventListener('click', cellClick)
      );
    } else if (!boardStatus.includes("")) {
      statusDisplay.textContent = "Draw!";
      document.querySelectorAll(".board-cell").forEach(
        cell => cell.removeEventListener('click', cellClick)
      );
    } else {
      player = (player === "X" ? "O" : "X");
      statusDisplay.textContent = STATUS();
    }
  }


})();