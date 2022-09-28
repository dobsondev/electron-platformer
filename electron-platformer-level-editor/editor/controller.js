/* KEYCODES =============================================
P:    80        1:    49
G:    71        2:    50
                3:    51
ESC:  27        4:    52
========================================================= */

document.body.addEventListener('keydown', function( event ) {
  if ( event.keyCode == 27 ) {
    placeObjectActivated = false
    document.getElementById('player-img').style.border = 'none'
    document.getElementById('goal-img').style.border = 'none'
    document.getElementById('regular-0-img').style.border = 'none'
    document.getElementById('regular-1-img').style.border = 'none'
    document.getElementById('phased-0-img').style.border = 'none'
    document.getElementById('phased-1-img').style.border = 'none'
  }
  if ( event.keyCode == 80 ) {
    placeObjectKey = "p"
    placeObjectImage.src = "../editor/res/player/player_idle_0.png"
    placeObjectActivated = true
    document.getElementById('player-img').style.border = '1px solid #F00'
    document.getElementById('goal-img').style.border = 'none'
    document.getElementById('regular-0-img').style.border = 'none'
    document.getElementById('regular-1-img').style.border = 'none'
    document.getElementById('phased-0-img').style.border = 'none'
    document.getElementById('phased-1-img').style.border = 'none'
  }
  if ( event.keyCode == 71 ) {
    placeObjectKey = "g"
    placeObjectImage.src = "../editor/res/goal/goal.png"
    placeObjectActivated = true
    document.getElementById('player-img').style.border = 'none'
    document.getElementById('goal-img').style.border = '1px solid #F00'
    document.getElementById('regular-0-img').style.border = 'none'
    document.getElementById('regular-1-img').style.border = 'none'
    document.getElementById('phased-0-img').style.border = 'none'
    document.getElementById('phased-1-img').style.border = 'none'
  }
  if ( event.keyCode == 49 ) {
    placeObjectKey = "1"
    placeObjectImage.src = "../editor/res/tiles/regular_tile_0.png"
    placeObjectActivated = true
    document.getElementById('player-img').style.border = 'none'
    document.getElementById('goal-img').style.border = 'none'
    document.getElementById('regular-0-img').style.border = '1px solid #F00'
    document.getElementById('regular-1-img').style.border = 'none'
    document.getElementById('phased-0-img').style.border = 'none'
    document.getElementById('phased-1-img').style.border = 'none'
  }
  if ( event.keyCode == 50 ) {
    placeObjectKey = "2"
    placeObjectImage.src = "../editor/res/tiles/regular_tile_1.png"
    placeObjectActivated = true
    document.getElementById('player-img').style.border = 'none'
    document.getElementById('goal-img').style.border = 'none'
    document.getElementById('regular-0-img').style.border = 'none'
    document.getElementById('regular-1-img').style.border = '1px solid #F00'
    document.getElementById('phased-0-img').style.border = 'none'
    document.getElementById('phased-1-img').style.border = 'none'
  }
  if ( event.keyCode == 51 ) {
    placeObjectKey = "3"
    placeObjectImage.src = "../editor/res/tiles/phased_tile_0.png"
    placeObjectActivated = true
    document.getElementById('player-img').style.border = 'none'
    document.getElementById('goal-img').style.border = 'none'
    document.getElementById('regular-0-img').style.border = 'none'
    document.getElementById('regular-1-img').style.border = 'none'
    document.getElementById('phased-0-img').style.border = '1px solid #F00'
    document.getElementById('phased-1-img').style.border = 'none'
  }
  if ( event.keyCode == 52 ) {
    placeObjectKey = "4"
    placeObjectImage.src = "../editor/res/tiles/phased_tile_1.png"
    placeObjectActivated = true
    document.getElementById('player-img').style.border = 'none'
    document.getElementById('goal-img').style.border = 'none'
    document.getElementById('regular-0-img').style.border = 'none'
    document.getElementById('regular-1-img').style.border = 'none'
    document.getElementById('phased-0-img').style.border = 'none'
    document.getElementById('phased-1-img').style.border = '1px solid #F00'
  }
})