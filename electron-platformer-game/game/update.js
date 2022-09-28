game.update = function() {
  // move right
  if ( isKeyPressed( keyCodes['d'] ) || isKeyPressed( keyCodes['right'] ) ) {
    playerX += playerSpeed
  }
  // move left
  if ( isKeyPressed( keyCodes['a'] ) || isKeyPressed( keyCodes['left'] ) ) {
    playerX -= playerSpeed
  }
  // jump
  if ( isKeyPressed( keyCodes['space'] ) && ! playerJumping ) {
    playerJumping = true
    playerJumpStartY = playerY
    jumpAudio.play()
  }

  // player jumping logic
  if ( playerJumping ) {
    if ( ! playerJumpDescent ) {
      // player still jumping up
      playerY -= playerJumpSpeed
      playerJumpTimerCount += 1
    } else {
      // player decending
      playerY += playerJumpSpeed
    }

    if ( playerJumpTimerCount >= playerJumpTimer ) {
      playerJumpTimerCount = 0
      playerJumpDescent = true
    }
  }

  // game border collision detection
  if ( playerX < 0 ) {
    playerX = 0
  }
  if ( playerY < 0 ) {
    playerY = 0
  }
  if ( playerX > ( 1024 - tileSize ) ) {
    playerX = 1024 - tileSize + 1
  }
  if ( playerY > ( 512 - tileSize ) ) {
    playerY = 512 - tileSize
    gameOver = true
    console.log( "GAME OVER" )
    return false
  }

  // collision detection with the actual tiles
  var playerGridX = parseInt( ( playerX + ( tileSize / 2 ) ) / tileSize )
  var playerGridY = parseInt( playerY / tileSize )

  var goalGridX = parseInt( ( goalX + ( tileSize / 2 ) ) / tileSize )
  var goalGridY = parseInt( goalY / tileSize )

  // get a rectangle for the player
  var playerRect = {
    x: playerX,
    y: playerY,
    width: tileSize,
    height: tileSize
  }

  var goalRect = {
    x: goalX,
    y: goalY,
    width: tileSize,
    height: tileSize
  }

  // get the 9 tiles that the player could could possibly be touching
  var fallingRect = {
    x: ( playerGridX * tileSize ) + ( parseInt( tileSize * 0.75 ) ),
    y: ( ( playerGridY + 1 ) * tileSize ) - 1,
    row: playerGridY + 1,
    col: playerGridX,
    width: tileSize,
    height: tileSize + 1
  }

  var topLeftRect = {
    x: ( playerGridX - 1 ) * tileSize,
    y: ( playerGridY - 1 ) * tileSize,
    row: playerGridY - 1,
    col: playerGridX - 1,
    height: tileSize
  }

  var topMiddleRect = {
    x: playerGridX * tileSize,
    y: ( playerGridY - 1 ) * tileSize,
    row: playerGridY - 1,
    col: playerGridX,
    width: tileSize,
    height: tileSize
  }

  var topRightRect = {
    x: ( playerGridX + 1 ) * tileSize,
    y: ( playerGridY - 1 ) * tileSize,
    row: playerGridY - 1,
    col: playerGridX + 1,
    width: tileSize,
    height: tileSize
  }

  var middleLeftRect = {
    x: ( playerGridX - 1 ) * tileSize,
    y: playerGridY * tileSize,
    row: playerGridY,
    col: playerGridX - 1,
    width: tileSize,
    height: tileSize
  }

  var middleMiddleRect = {
    x: playerGridX * tileSize,
    y: playerGridY * tileSize,
    row: playerGridY,
    col: playerGridX,
    width: tileSize,
    height: tileSize
  }

  var middleRightRect = {
    x: ( playerGridX + 1 ) * tileSize,
    y: playerGridY * tileSize,
    row: playerGridY,
    col: playerGridX + 1,
    width: tileSize,
    height: tileSize
  }

  var bottomLeftRect = {
    x: ( playerGridX - 1 ) * tileSize,
    y: ( playerGridY + 1 ) * tileSize,
    row: playerGridY + 1,
    col: playerGridX - 1,
    width: tileSize,
    height: tileSize
  }

  var bottomMiddleRect = {
    x: playerGridX * tileSize,
    y: ( playerGridY + 1 ) * tileSize,
    row: playerGridY + 1,
    col: playerGridX,
    width: tileSize,
    height: tileSize
  }

  var bottomRightRect = {
    x: ( playerGridX + 1 ) * tileSize,
    y: ( playerGridY + 1 ) * tileSize,
    row: ( playerGridY + 1 ),
    col: ( playerGridX + 1 ),
    width: tileSize,
    height: tileSize
  }

  // try to detect collisions with blocks
  if ( ! phased ) {

    if ( fallingRect.row === 16 ) {
      gameOver = true
      return false
    }

    // player should be falling
    if ( ! playerJumping &&
        tileGrid[parseInt(fallingRect.row)][parseInt(fallingRect.col)] == 0 &&
        fallingRect.x < playerRect.x + playerRect.width &&
        fallingRect.x + fallingRect.width > playerRect.x &&
        fallingRect.y < playerRect.y + playerRect.width &&
        fallingRect.y + fallingRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Player Should Be Falling")
      playerY += playerSpeed
    }

    if ( topLeftRect.row !== -1 && topLeftRect.col !== -1 &&
        tileGrid[parseInt(topLeftRect.row)][parseInt(topLeftRect.col)] == 1 &&
        topLeftRect.x < playerRect.x + playerRect.width &&
        topLeftRect.x + topLeftRect.width > playerRect.x &&
        topLeftRect.y < playerRect.y + playerRect.width &&
        topLeftRect.y + topLeftRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Top Left")
      playerX += playerSpeed
    }

    if ( topMiddleRect.row !== -1 && topMiddleRect.col !== -1 &&
        tileGrid[parseInt(topMiddleRect.row)][parseInt(topMiddleRect.col)] == 1 &&
        topMiddleRect.x < playerRect.x + playerRect.width &&
        topMiddleRect.x + topMiddleRect.width > playerRect.x &&
        topMiddleRect.y < playerRect.y + playerRect.width &&
        topMiddleRect.y + topMiddleRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Top Middle")
      playerY += playerSpeed
    }

    if ( topRightRect.row !== -1 && topRightRect.col !== -1 &&
        tileGrid[parseInt(topRightRect.row)][parseInt(topRightRect.col)] == 1 &&
        topRightRect.x < playerRect.x + playerRect.width &&
        topRightRect.x + topRightRect.width > playerRect.x &&
        topRightRect.y < playerRect.y + playerRect.width &&
        topRightRect.y + topRightRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Top Right")
      playerX -= playerSpeed
    }

    if ( middleLeftRect.row !== -1 && middleLeftRect.col !== -1 &&
        tileGrid[parseInt(middleLeftRect.row)][parseInt(middleLeftRect.col)] == 1 &&
        middleLeftRect.x < playerRect.x + playerRect.width &&
        middleLeftRect.x + middleLeftRect.width > playerRect.x &&
        middleLeftRect.y < playerRect.y + playerRect.width &&
        middleLeftRect.y + middleLeftRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Middle Left")
      playerX += playerSpeed
    }

    // if ( tileGrid[parseInt(middleMiddleRect.row)][parseInt(middleMiddleRect.col)] == 1 &&
    //     middleMiddleRect.x < playerRect.x + playerRect.width &&
    //     middleMiddleRect.x + middleMiddleRect.width > playerRect.x &&
    //     middleMiddleRect.y < playerRect.y + playerRect.width &&
    //     middleMiddleRect.y + middleMiddleRect.height > playerRect.y ) {
    //   // collision detected
    //   console.log("Collision Detected :: Middle Middle")
    //   playerX -= playerSpeed
    // }

    if ( middleRightRect.row !== -1 && middleRightRect.col !== -1 &&
        tileGrid[parseInt(middleRightRect.row)][parseInt(middleRightRect.col)] == 1 &&
        middleRightRect.x < playerRect.x + playerRect.width &&
        middleRightRect.x + middleRightRect.width > playerRect.x &&
        middleRightRect.y < playerRect.y + playerRect.width &&
        middleRightRect.y + middleRightRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Middle Right")
      playerX -= playerSpeed
    }

    if ( bottomLeftRect.row !== -1 && bottomLeftRect.col !== -1 &&
        tileGrid[parseInt(bottomLeftRect.row)][parseInt(bottomLeftRect.col)] == 1 &&
        bottomLeftRect.x < playerRect.x + playerRect.width &&
        bottomLeftRect.x + bottomLeftRect.width > playerRect.x &&
        bottomLeftRect.y < playerRect.y + playerRect.width &&
        bottomLeftRect.y + bottomLeftRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Bottom Left")
      playerX += playerSpeed
    }

    if ( bottomMiddleRect.row !== -1 && bottomMiddleRect.col !== -1 &&
        tileGrid[parseInt(bottomMiddleRect.row)][parseInt(bottomMiddleRect.col)] == 1 &&
        bottomMiddleRect.x < playerRect.x + playerRect.width &&
        bottomMiddleRect.x + bottomMiddleRect.width > playerRect.x &&
        bottomMiddleRect.y < playerRect.y + playerRect.width &&
        bottomMiddleRect.y + bottomMiddleRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Bottom Middle")
      playerY -= playerSpeed
      if ( playerJumpDescent ) {
        playerY == playerJumpStartY
        playerJumping = false
        playerJumpDescent = false
      }
    }

    if ( bottomRightRect.row !== -1 && bottomRightRect.col !== -1 &&
        tileGrid[parseInt(bottomRightRect.row)][parseInt(bottomRightRect.col)] == 1 &&
        bottomRightRect.x < playerRect.x + playerRect.width &&
        bottomRightRect.x + bottomRightRect.width > playerRect.x &&
        bottomRightRect.y < playerRect.y + playerRect.width &&
        bottomRightRect.y + bottomRightRect.height > playerRect.y ) {
      // collision detected
      console.log("Collision Detected :: Bottom Right")
      playerX -= playerSpeed
    }

  } else {

    if ( fallingRect.row === 16 ) {
      gameOver = true
      return false
    }

    // player should be falling
    if ( ! playerJumping &&
        phasedTileGrid[parseInt(fallingRect.row)][parseInt(fallingRect.col)] == 0 &&
        fallingRect.x < playerRect.x + playerRect.width &&
        fallingRect.x + fallingRect.width > playerRect.x &&
        fallingRect.y < playerRect.y + playerRect.width &&
        fallingRect.y + fallingRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Player Should Be Falling")
      playerY += playerSpeed
    }

    if ( topLeftRect.row !== -1 && topLeftRect.col !== -1 &&
        phasedTileGrid[parseInt(topLeftRect.row)][parseInt(topLeftRect.col)] == 1 &&
        topLeftRect.x < playerRect.x + playerRect.width &&
        topLeftRect.x + topLeftRect.width > playerRect.x &&
        topLeftRect.y < playerRect.y + playerRect.width &&
        topLeftRect.y + topLeftRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Top Left")
      playerX += playerSpeed
    }

    if ( topMiddleRect.row !== -1 && topMiddleRect.col !== -1 &&
        phasedTileGrid[parseInt(topMiddleRect.row)][parseInt(topMiddleRect.col)] == 1 &&
        topMiddleRect.x < playerRect.x + playerRect.width &&
        topMiddleRect.x + topMiddleRect.width > playerRect.x &&
        topMiddleRect.y < playerRect.y + playerRect.width &&
        topMiddleRect.y + topMiddleRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Top Middle")
      playerY += playerSpeed
    }

    if ( topRightRect.row !== -1 && topRightRect.col !== -1 &&
        phasedTileGrid[parseInt(topRightRect.row)][parseInt(topRightRect.col)] == 1 &&
        topRightRect.x < playerRect.x + playerRect.width &&
        topRightRect.x + topRightRect.width > playerRect.x &&
        topRightRect.y < playerRect.y + playerRect.width &&
        topRightRect.y + topRightRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Top Right")
      playerX -= playerSpeed
    }

    if ( middleLeftRect.row !== -1 && middleLeftRect.col !== -1 &&
        phasedTileGrid[parseInt(middleLeftRect.row)][parseInt(middleLeftRect.col)] == 1 &&
        middleLeftRect.x < playerRect.x + playerRect.width &&
        middleLeftRect.x + middleLeftRect.width > playerRect.x &&
        middleLeftRect.y < playerRect.y + playerRect.width &&
        middleLeftRect.y + middleLeftRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Middle Left")
      playerX += playerSpeed
    }

    // if ( phasedTileGrid[parseInt(middleMiddleRect.row)][parseInt(middleMiddleRect.col)] == 1 &&
    //     middleMiddleRect.x < playerRect.x + playerRect.width &&
    //     middleMiddleRect.x + middleMiddleRect.width > playerRect.x &&
    //     middleMiddleRect.y < playerRect.y + playerRect.width &&
    //     middleMiddleRect.y + middleMiddleRect.height > playerRect.y ) {
    //   // collision detected
    //   console.log("Phased Collision Detected :: Middle Middle")
    //   playerX -= playerSpeed
    // }

    if ( middleRightRect.row !== -1 && middleRightRect.col !== -1 &&
        phasedTileGrid[parseInt(middleRightRect.row)][parseInt(middleRightRect.col)] == 1 &&
        middleRightRect.x < playerRect.x + playerRect.width &&
        middleRightRect.x + middleRightRect.width > playerRect.x &&
        middleRightRect.y < playerRect.y + playerRect.width &&
        middleRightRect.y + middleRightRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Middle Right")
      playerX -= playerSpeed
    }

    if ( bottomLeftRect.row !== -1 && bottomLeftRect.col !== -1 &&
        phasedTileGrid[parseInt(bottomLeftRect.row)][parseInt(bottomLeftRect.col)] == 1 &&
        bottomLeftRect.x < playerRect.x + playerRect.width &&
        bottomLeftRect.x + bottomLeftRect.width > playerRect.x &&
        bottomLeftRect.y < playerRect.y + playerRect.width &&
        bottomLeftRect.y + bottomLeftRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Bottom Left")
      playerX += playerSpeed
    }

    if ( bottomMiddleRect.row !== -1 && bottomMiddleRect.col !== -1 &&
        phasedTileGrid[parseInt(bottomMiddleRect.row)][parseInt(bottomMiddleRect.col)] == 1 &&
        bottomMiddleRect.x < playerRect.x + playerRect.width &&
        bottomMiddleRect.x + bottomMiddleRect.width > playerRect.x &&
        bottomMiddleRect.y < playerRect.y + playerRect.width &&
        bottomMiddleRect.y + bottomMiddleRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Bottom Middle")
      playerY -= playerSpeed
      if ( playerJumpDescent ) {
        playerY == playerJumpStartY
        playerJumping = false
        playerJumpDescent = false
      }
    }

    if ( bottomRightRect.row !== -1 && bottomRightRect.col !== -1 &&
        phasedTileGrid[parseInt(bottomRightRect.row)][parseInt(bottomRightRect.col)] == 1 &&
        bottomRightRect.x < playerRect.x + playerRect.width &&
        bottomRightRect.x + bottomRightRect.width > playerRect.x &&
        bottomRightRect.y < playerRect.y + playerRect.width &&
        bottomRightRect.y + bottomRightRect.height > playerRect.y ) {
      // collision detected
      console.log("Phased Collision Detected :: Bottom Right")
      playerX -= playerSpeed
    }

  }

  // check if the player has found the goal
  if ( goalRect.x < playerRect.x + playerRect.width &&
      goalRect.x + goalRect.width > playerRect.x &&
      goalRect.y < playerRect.y + playerRect.width &&
      goalRect.y + goalRect.height > playerRect.y ) {
    // collision detected
    console.log("Collision Detected :: Player Found Goal")
    levelTimerStop = (new Date()).getTime()
    goalAudio.play()
    gameSuccess = true
    return true
  }

};