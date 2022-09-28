game.render = function() {
  context.clearRect(0, 0, gameCanvas.width, gameCanvas.height)

  // render the level's tiles
  for (var row = 0; row < tileGridHeight; row++) {
    for (var col = 0; col < tileGridWidth; col++) {
      if ( phased ) {
        context.drawImage(phasedTileImagesGrid[row][col], col * tileSize, row * tileSize, tileSize, tileSize)
      } else {
        context.drawImage(tileImagesGrid[row][col], col * tileSize, row * tileSize, tileSize, tileSize)
      }
    }
  }

  // render the player
  if ( playerAnimation == "idle" ) {
    context.drawImage(playerAnimationIdleImages[playerAnimationFrame], playerX, playerY, tileSize, tileSize)
    // Reset the animation to the start if its at the top frame, otherwise increase
    // the animation frame to the next one
    if ( playerAnimationFrame == playerAnimationIdleFrameTop ) {
      playerAnimationFrame = 0
    } else {
      playerAnimationFrame++
    }
  }

  // render the goal
  context.drawImage(goalImage, goalX, goalY, tileSize, tileSize)

  if ( gameOver ) {
    context.drawImage(gameOverOverlayImage, 0, 0, gameCanvas.width, gameCanvas.height)
    context.font = "48px Helvetica";
    context.fillText("Game Over", gameCanvas.width / 6, gameCanvas.height / 3);
    context.font = "36px Helvetica";
    context.fillText("Press R to restart", gameCanvas.width / 6, (gameCanvas.height / 3) + 52);
  }

  if ( gameSuccess ) {
    context.font = "48px Helvetica";
    context.fillText("Goal Reached!", gameCanvas.width / 6, gameCanvas.height / 3);
    context.font = "36px Helvetica";
    context.fillText("Press Enter to Load a New Level", gameCanvas.width / 6, (gameCanvas.height / 3) + 52);
    var levelTimeResult = levelTimerStop - levelTimer
    context.fillText("Time: " + formatTime(levelTimeResult), gameCanvas.width / 6, (gameCanvas.height / 3) + 52 + 38);
  }
}