import GameState from './state/global'
import { onKeyDown, onKeyUp } from './input/keyboard'

const canvas = document.getElementById("holesome")
const ctx = canvas.getContext("2d")

GameState.positionX = canvas.width / 2
GameState.positionY = canvas.height / 2

const squareSize = 5
const moveBy = 1

function drawBall() {
  ctx.beginPath()

  ctx.rect(GameState.positionX, GameState.positionY, squareSize, squareSize)
  ctx.fillStyle = "#0095DD"
  ctx.fill()

  ctx.closePath()
}

function moveBall() {
  const { upPressed, leftPressed, downPressed, rightPressed } = GameState
  let { positionX: x, positionY: y } = GameState

  if (upPressed) {
    y = y - moveBy
    if (y - squareSize < 0) {
      y = 0
    }
  }
  if (leftPressed) {
    x = x - moveBy
    if (x - squareSize < 0) {
      x = 0
    }
  }
  if (downPressed) {
    y = y + moveBy
    if (y + squareSize > canvas.height) {
      y = canvas.height - squareSize
    }
  }
  if (rightPressed) {
    x = x + moveBy
    if (x + squareSize > canvas.width) {
      x = canvas.width - squareSize
    }
  }

  GameState.positionX = x
  GameState.positionY = y
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawBall()
  moveBall()
}

document.addEventListener('keydown', onKeyDown, false)
document.addEventListener('keyup', onKeyUp, false)

setInterval(draw, 10)