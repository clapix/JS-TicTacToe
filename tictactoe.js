const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winningMessageTextElement = document.querySelector("[data-win-message-txt]")
const restartButton = document.getElementById("restartButton")
const winningMessageElement = document.getElementById("winningMessage")
let circleTurn

startGame()

restartButton.addEventListener("click", startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener("click", handleClick)
    cell.addEventListener("click", handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove("show")
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  // placeMark // Check For Win // Check For Draw
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    // Switch Turns
    swapTurns()
    setBoardHoverClass()
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = `Draw!`
  } else {
    winningMessageTextElement.innerText = `Point to ${circleTurn ? "O" : "X"}!`
  }
  winningMessageElement.classList.add("show")
}
