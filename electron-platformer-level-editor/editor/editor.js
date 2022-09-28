var editorCanvas = document.getElementById("editor")
var context = editorCanvas.getContext("2d")

var editor = {}

var mouseX
var mouseY

var playerX
var playerY

var playerImage = new Image()
playerImage.src = "../editor/res/player/player_idle_0.png"

var goalX
var goalY

var goalImage = new Image()
goalImage.src = "../editor/res/goal/goal.png"

var tileGridWidth = 32
var tileGridHeight = 16
var tileSize = 32

var tileGrid = []
var tileImagesGrid = []

var phasedTileGrid = []
var phasedTileImagesGrid = []

var phased = false

var placeObjectActivated = false
var placeObjectKey = "p"
var placeObjectImage = new Image()
placeObjectImage.src = "../editor/res/player/player_idle_0.png"

function createTileGrid(debugMode) {
  var levelLayout = editLevelData.layout
  var levelLayoutArray = levelLayout.split('')

  var phasedLevelLayout = editLevelData.phasedLayout
  var phasedLevelLayoutArray = phasedLevelLayout.split('')

  // we have to set the dimensions of the 2D array before we can fill it
  tileGrid = new Array(tileGridHeight)
  phasedTileGrid = new Array(tileGridHeight)
  tileImagesGrid = new Array(tileGridHeight)
  phasedTileImagesGrid = new Array(tileGridHeight)
  for (var y = 0; y < tileGridHeight; y++) {
    tileGrid[y] = new Array(tileGridWidth)
    phasedTileGrid[y] = new Array(tileGridWidth)
    tileImagesGrid[y] = new Array(tileGridHeight)
    phasedTileImagesGrid[y] = new Array(tileGridHeight)
  }

  // now we can fill the 2D array with the tile values
  for (var row = 0; row < tileGridHeight; row++) {
    for (var col = 0; col < tileGridWidth; col++) {
      tileGrid[row][col] = levelLayoutArray[(row * tileGridWidth) + col]
      phasedTileGrid[row][col] = phasedLevelLayoutArray[(row * tileGridWidth) + col]

      tileImagesGrid[row][col] = new Image()
      tileImagesGrid[row][col].src = "../editor/res/tiles/regular_tile_" + tileGrid[row][col] + ".png"

      phasedTileImagesGrid[row][col] = new Image()
      phasedTileImagesGrid[row][col].src = "../editor/res/tiles/phased_tile_" + phasedTileGrid[row][col] + ".png"
    }
  }

  // set the player's starting point
  var playerStart = editLevelData.startPoint
  var playerStartCoords = playerStart.split(",")
  playerX = playerStartCoords[0] * tileSize
  playerY = playerStartCoords[1] * tileSize

  // set the player's goal point
  var playerGoal = editLevelData.goalPoint
  var playerGoalCoords = playerGoal.split(",")
  goalX = playerGoalCoords[0] * tileSize
  goalY = playerGoalCoords[1] * tileSize

  if ( debugMode ) {
    console.log(phasedTileGrid)
  }
} // createTileGrid()