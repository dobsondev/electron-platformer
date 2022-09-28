const ipc = require('electron').ipcRenderer
const selectLevelToEditButton = document.getElementById('select-level-to-edit-button')
const editSelectedLevelButton = document.getElementById('edit-selected-level-button')
const createNewLevelButton = document.getElementById('create-new-level-button')
const saveLevelButton = document.getElementById('save-level-button')

var editLevelFilePath = ''
var editLevelData = new Object()

var blankLevelName = "New Level"
var blankLevelAuthor = "Level Author"
var blankLevelStartPoint = "0,0"
var blankLevelGoalPoint = "31,15"
var blankLevelLayout ="0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
var blankLevelPhasedLayout = "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

selectLevelToEditButton.addEventListener('click', function (event) {
  ipc.send('open-file-dialog')
})

ipc.on('get-selected-level-path', function (event, filePath, debugMode) {
  editLevelFilePath = `${filePath}`

  if ( debugMode ) {
    console.log("Level Path :: " + editLevelFilePath)
  }

  // hide the select-level-to-edit-button
  document.getElementById('select-level-to-edit-button').style.display = 'none'
  // show the edit-selected-level-button section
  document.getElementById('edit-selected-level-button').style.display = 'inline-block'

  document.getElementById('selected-level-text').value = editLevelFilePath
})

editSelectedLevelButton.addEventListener('click', function (event) {
  ipc.send('load-level-contents', editLevelFilePath)
})

createNewLevelButton.addEventListener('click', function (event) {
  editLevelData.levelName = blankLevelName
  editLevelData.author = blankLevelAuthor
  editLevelData.startPoint = blankLevelStartPoint
  editLevelData.goalPoint = blankLevelGoalPoint
  editLevelData.layout = blankLevelLayout
  editLevelData.phasedLayout = blankLevelPhasedLayout

  // hide the start-screen-view section
  document.getElementById('start-screen-view').style.display = 'none'
  // show the game-screen-view section
  document.getElementById('editor-screen-view').style.display = 'block'

  startEditor(false)
})

saveLevelButton.addEventListener('click', function (event) {
  // build the level contents for the file
  var levelNameToSave = "Name => " + document.getElementById('level-name-text').value + ";\n"
  var levelAuthorToSave = "Author => " + document.getElementById('level-author-text').value + ";\n"
  var levelStartPointToSave = "Start Point => " + Math.round(playerX / tileSize) + "," + Math.round(playerY / tileSize) + ";\n"
  var levelGoalPointToSave = "Goal Point => " + Math.round(goalX / tileSize) + "," + Math.round(goalY / tileSize) + ";\n"
  var levelLayoutToSave = 'Level Layout => '
  for (var row = 0; row < tileGridHeight; row++) {
    for (var col = 0; col < tileGridWidth; col++) {
      levelLayoutToSave += tileGrid[row][col]
    }
  }
  levelLayoutToSave += ";\n"
  var phasedLayoutToSave = 'Phased Layout => '
  for (var row = 0; row < tileGridHeight; row++) {
    for (var col = 0; col < tileGridWidth; col++) {
      phasedLayoutToSave += phasedTileGrid[row][col]
    }
  }
  phasedLayoutToSave += ";\n"

  var levelContent = levelNameToSave + levelAuthorToSave + levelStartPointToSave + levelGoalPointToSave + levelLayoutToSave + phasedLayoutToSave;

  ipc.send('save-file-contents', levelContent)
})

ipc.on('completed-save-file-contents', function (event, fileName) {
  alert( "Saved File :: " + fileName)
})

/**
 *  Helper function that creates the level data from the level file
 */
function createLevelData(rawData, debugMode) {
  var removeCarriageReturn = rawData.replace(/[\n\r]+/g, '')
  var lineSplit = removeCarriageReturn.split(";")

  editLevelData.levelName = lineSplit[0].split(" => ")[1]
  editLevelData.author = lineSplit[1].split(" => ")[1]
  editLevelData.startPoint = lineSplit[2].split(" => ")[1]
  editLevelData.goalPoint = lineSplit[3].split(" => ")[1]
  editLevelData.layout = lineSplit[4].split(" => ")[1]
  editLevelData.phasedLayout = lineSplit[5].split(" => ")[1]

  if ( debugMode ) {
    console.log(editLevelData)
  }
}

ipc.on('read-level-data', function (event, data, debugMode) {
  var rawEditLevelData = `${data}`

  if ( debugMode ) {
    console.log("Raw Level Data :: " + data)
  }

  // hide the start-screen-view section
  document.getElementById('start-screen-view').style.display = 'none'
  // show the game-screen-view section
  document.getElementById('editor-screen-view').style.display = 'block'

  createLevelData(rawEditLevelData, debugMode)
  startEditor(debugMode)
})

/**
 *  Helper function that creates the level data from the level file
 */
function createBlankLevelData(debugMode) {

  editLevelData.levelName = blankLevelName
  editLevelData.author = blankLevelAuthor
  editLevelData.startPoint = blankLevelStartPoint
  editLevelData.goalPoint = blankLevelGoalPoint
  editLevelData.layout = blankLevelLayout
  editLevelData.phasedLayout = blankLevelPhasedLayout

  if ( debugMode ) {
    console.log(editLevelData)
  }
}