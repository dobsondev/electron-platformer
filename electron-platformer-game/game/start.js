function startGame(debugMode) {
  playerJumpTimerCount = 0
  playerJumping = false
  playerJumpDescent = false
  playerJumpStartY = 0

  playerAnimation = "idle"
  playerAnimationFrame = 0
  playerAnimationFrameTimerCount = 0

  gameOver = false
  gameSuccess = false
  phased = false
  // create the level tileGrid needed to play the game
  createTileGrid(debugMode)
  // start background music
  backgroundAudio.play()
  // start timer
  levelTimer = (new Date()).getTime()
  // Start the game loop
  window.setInterval(game.run, 0)
}