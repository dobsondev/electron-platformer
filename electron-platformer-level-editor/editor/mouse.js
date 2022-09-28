var regularViewLink = document.getElementById('regular-layout-view-link')
var phasedViewLink = document.getElementById('phased-layout-view-link')
var mainMenuLink = document.getElementById('main-menu-link')


// figure out where the mouse is on the canvas
editorCanvas.addEventListener('mousemove', function( event ) {
  var rect = editorCanvas.getBoundingClientRect()
  mouseX = Math.round( ( event.clientX - rect.left ) / ( rect.right - rect.left ) * editorCanvas.width )
  mouseY = Math.round( ( event.clientY-rect.top ) / ( rect.bottom - rect.top ) * editorCanvas.height )
})

editorCanvas.addEventListener('click', function( event ) {
  if ( placeObjectActivated ) {
    if ( placeObjectKey == "p" ) {
      playerX = Math.round( mouseX / tileSize ) * tileSize
      playerY = Math.round( mouseY / tileSize ) * tileSize
    }
    if ( placeObjectKey == "g" ) {
      goalX = Math.round( mouseX / tileSize ) * tileSize
      goalY = Math.round( mouseY / tileSize ) * tileSize
    }
    if ( placeObjectKey == "1" ) {
      var col = Math.round( mouseX / tileSize )
      var row = Math.round( mouseY / tileSize )
      console.log( "Placing at ( X : " + col + " / Y : " + row + " )")
      tileGrid[row][col] = 0
      tileImagesGrid[row][col].src = "../editor/res/tiles/regular_tile_0.png"
    }
    if ( placeObjectKey == "2" ) {
      var col = Math.round( mouseX / tileSize )
      var row = Math.round( mouseY / tileSize )
      console.log( "Placing at ( X : " + col + " / Y : " + row + " )")
      tileGrid[row][col] = 1
      tileImagesGrid[row][col].src = "../editor/res/tiles/regular_tile_1.png"
    }
    if ( placeObjectKey == "3" ) {
      var col = Math.round( mouseX / tileSize )
      var row = Math.round( mouseY / tileSize )
      console.log( "Placing at ( X : " + col + " / Y : " + row + " )")
      phasedTileGrid[row][col] = 0
      phasedTileImagesGrid[row][col].src = "../editor/res/tiles/phased_tile_0.png"
    }
    if ( placeObjectKey == "4" ) {
      var col = Math.round( mouseX / tileSize )
      var row = Math.round( mouseY / tileSize )
      console.log( "Placing at ( X : " + col + " / Y : " + row + " )")
      phasedTileGrid[row][col] = 1
      phasedTileImagesGrid[row][col].src = "../editor/res/tiles/phased_tile_1.png"
    }
  }
})

regularViewLink.onclick = function( event ) {
  phased = false
}

phasedViewLink.onclick = function( event ) {
  phased = true
}

mainMenuLink.onclick = function( event ) {
  window.location.reload(false);
}