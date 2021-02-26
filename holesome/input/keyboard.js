import GameState from '../state/global'

export function onKeyDown(e) {
  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      GameState.keyboard.upPressed = true
      break
    case 'a':
    case 'ArrowLeft':
      GameState.keyboard.leftPressed = true
      break
    case 's':
    case 'ArrowDown':
      GameState.keyboard.downPressed = true
      break
    case 'd':
    case 'ArrowRight':
      GameState.keyboard.rightPressed = true
      break
  }
}

export function onKeyUp(e) {
  switch (e.key) {
    case 'w':
    case 'ArrowUp':
      GameState.keyboard.upPressed = false
      break
    case 'a':
    case 'ArrowLeft':
      GameState.keyboard.leftPressed = false
      break
    case 's':
    case 'ArrowDown':
      GameState.keyboard.downPressed = false
      break
    case 'd':
    case 'ArrowRight':
      GameState.keyboard.rightPressed = false
      break
  }
}

export default {
  onKeyDown,
  onKeyUp
}
