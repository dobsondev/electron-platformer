const ipc = require('electron').ipcRenderer
const selectFileButton = document.getElementById('select-level-button')
const playLevelButton = document.getElementById('play-level-button')

var levelFilePath = ''
var levelData = new Object()

var backgroundMusic = document.getElementById('background-music')
var volumeLevel = document.getElementById('volume-level-text')

selectFileButton.addEventListener('click', function (event) {
  ipc.send('open-file-dialog')
})

ipc.on('get-selected-level-path', function (event, filePath, debugMode) {
  levelFilePath = `${filePath}`

  if ( debugMode ) {
    console.log("Level Path :: " + levelFilePath)
  }
  document.getElementById('selected-level').value = levelFilePath
})

playLevelButton.addEventListener('click', function (event) {
  ipc.send('load-level-contents', levelFilePath)
})

/**
 *  Helper function that creates the level data from the level file
 */
function createLevelData(rawData, debugMode) {
  var removeCarriageReturn = rawData.replace(/[\n\r]+/g, '')
  var lineSplit = removeCarriageReturn.split(";")

  levelData.levelName = lineSplit[0].split(" => ")[1]
  levelData.author = lineSplit[1].split(" => ")[1]
  levelData.startPoint = lineSplit[2].split(" => ")[1]
  levelData.goalPoint = lineSplit[3].split(" => ")[1]
  levelData.layout = lineSplit[4].split(" => ")[1]
  levelData.phasedLayout = lineSplit[5].split(" => ")[1]

  if ( debugMode ) {
    console.log(levelData)
  }
}

ipc.on('read-level-data', function (event, data, debugMode) {
  var rawLevelData = `${data}`

  if ( debugMode ) {
    console.log("Raw Level Data :: " + data)
  }

  // hide the start-screen-view section
  document.getElementById('start-screen-view').style.display = 'none'
  // show the game-screen-view section
  document.getElementById('game-screen-view').style.display = 'block'
  // add the level file path to the menu
  var levelName = levelFilePath.split("/")
  document.getElementById('menu-level-name').innerHTML = "Current Level :: <strong>" + levelName[levelName.length - 1] + "</strong>"

  createLevelData(rawLevelData, debugMode)
  startGame(debugMode)
})