editor.render = function() {
  context.clearRect(0, 0, editorCanvas.width, editorCanvas.height)

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
  context.drawImage(playerImage, playerX, playerY, tileSize, tileSize)

  // render the goal
  context.drawImage(goalImage, goalX, goalY, tileSize, tileSize)

  if ( placeObjectActivated ) {
    context.drawImage(placeObjectImage, Math.round(mouseX / tileSize) * tileSize, Math.round(mouseY/ tileSize) * tileSize, tileSize, tileSize)
    context.strokeStyle = 'red'
    context.strokeRect(Math.round(mouseX / tileSize) * tileSize, Math.round(mouseY/ tileSize) * tileSize, tileSize, tileSize)
  }
}