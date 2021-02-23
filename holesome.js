import GameState from './state/global'
import { onKeyDown, onKeyUp } from './input/keyboard'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

GameState.positionX = canvas.width / 2
GameState.positionY = canvas.height / 2

const squareSize = 5

function drawUser () {
  const { positionX, positionY } = GameState
  ctx.beginPath()

  ctx.rect(positionX, positionY, squareSize, squareSize)
  ctx.fillStyle = '#0095DD'
  ctx.fill()

  ctx.closePath()
}

function moveBall () {
  const { keyboard: { upPressed, leftPressed, downPressed, rightPressed } } = GameState
  let { positionX: x, positionY: y } = GameState

  const moveBy = 1
  if (upPressed) {
    y = y - moveBy
    if (y < 0) {
      y = 0
    }
  }
  if (leftPressed) {
    x = x - moveBy
    if (x < 0) {
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

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawUser()
  moveBall()

  window.requestAnimationFrame(draw)
}

document.addEventListener('keydown', onKeyDown, false)
document.addEventListener('keyup', onKeyUp, false)

draw()
