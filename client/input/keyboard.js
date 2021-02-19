import GameState from '../state/global'

export function onKeyDown(e) {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      GameState.upPressed = true
      break
    case "a":
    case "ArrowLeft":
      GameState.leftPressed = true
      break
    case "s":
    case "ArrowDown":
      GameState.downPressed = true
      break
    case "d":
    case "ArrowRight":
      GameState.rightPressed = true
      break
  }
}

export function onKeyUp(e) {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      GameState.upPressed = false
      break
    case "a":
    case "ArrowLeft":
      GameState.leftPressed = false
      break
    case "s":
    case "ArrowDown":
      GameState.downPressed = false
      break
    case "d":
    case "ArrowRight":
      GameState.rightPressed = false
      break
  }
}

export default {
  onKeyDown,
  onKeyUp
}