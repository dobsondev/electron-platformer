var gameCanvas = document.getElementById("game")
var context = gameCanvas.getContext("2d")

var game = {}

var playerX = 0
var playerY = 0

var playerSpeed = 1

var playerJumpSpeed = 1
var playerJumpTimer = 60
var playerJumpTimerCount = 0
var playerJumping = false
var playerJumpDescent = false
var playerJumpStartY = 0

var playerAnimation = "idle"
var playerAnimationFrame = 0
var playerAnimationFrameTimer = 3600
var playerAnimationFrameTimerCount = 0

var playerAnimationIdleFrameTop = 1
var playerAnimationIdleImages = new Array(2)
playerAnimationIdleImages[0] = new Image()
playerAnimationIdleImages[0].src = "../game/res/player/player_idle_0.png"
playerAnimationIdleImages[1] = new Image()
playerAnimationIdleImages[1].src = "../game/res/player/player_idle_1.png"

var goalImage = new Image()
goalImage.src = "../game/res/goal/goal.png"

var goalX = 0
var goalY = 0

var gameOver = false
var gameOverOverlayImage = new Image()
gameOverOverlayImage.src = "../game/res/overlays/game_over.png"

var backgroundAudio = new Audio('../game/res/sounds/background_music.wav')
backgroundAudio.vol = 0.3
backgroundAudio.loop = true
var jumpAudio = new Audio('../game/res/sounds/jump.wav')
jumpAudio.vol = 0.65
var goalAudio = new Audio('../game/res/sounds/pickup_coin.wav')
goalAudio.vol = 0.85

var gameSuccess = false

var tileGridWidth = 32
var tileGridHeight = 16

var tileSize = 32

var tileGrid = []
var tileImagesGrid = []

var phasedTileGrid = []
var phasedTileImagesGrid = []

var phased = false

var levelTimer = (new Date()).getTime()
var levelTimerStop = (new Date()).getTime()

function createTileGrid(debugMode) {
  var levelLayout = levelData.layout
  var levelLayoutArray = levelLayout.split('')

  var phasedLevelLayout = levelData.phasedLayout
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
      tileImagesGrid[row][col].src = "../game/res/tiles/regular_tile_" + tileGrid[row][col] + ".png"

      phasedTileImagesGrid[row][col] = new Image()
      phasedTileImagesGrid[row][col].src = "../game/res/tiles/phased_tile_" + phasedTileGrid[row][col] + ".png"
    }
  }

  // set the player's starting point
  var playerStart = levelData.startPoint
  var playerStartCoords = playerStart.split(",")
  playerX = playerStartCoords[0] * tileSize
  playerY = playerStartCoords[1] * tileSize

  // set the player's goal point
  var playerGoal = levelData.goalPoint
  var playerGoalCoords = playerGoal.split(",")
  goalX = playerGoalCoords[0] * tileSize
  goalY = playerGoalCoords[1] * tileSize

  if ( debugMode ) {
    console.log( phasedTileGrid )
  }
} // createTileGrid()

// https://gist.github.com/electricg/4372563
function pad(num, size) {
  var s = "0000" + num;
  return s.substr(s.length - size);
} // pad()

// https://gist.github.com/electricg/4372563
function formatTime(time) {
  var h = m = s = ms = 0;
  var newTime = '';

  h = Math.floor( time / (60 * 60 * 1000) );
  time = time % (60 * 60 * 1000);
  m = Math.floor( time / (60 * 1000) );
  time = time % (60 * 1000);
  s = Math.floor( time / 1000 );
  ms = time % 1000;

  newTime = pad(m, 2) + ' : ' + pad(s, 2) + ' : ' + pad(ms, 2);
  return newTime;
} // formatTime()