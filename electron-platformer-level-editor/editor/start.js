function startEditor(debugMode) {
  // create the level tileGrid needed for the editor
  createTileGrid(debugMode)
  // Start the editor loop
  window.setInterval(editor.run, 0)
}