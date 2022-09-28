/* KEYCODES =============================================
Left:  37       Space: 32       W: 87
Up:    38       R:     82       A: 65
Right: 39       P:     80       S: 83
Down:  40                       D: 68
========================================================= */
var pressed = {}

var validKeys = {
  37: 'left', // left
  39: 'right', // right
  40: 'down', // down
  38: 'jump', // up

  65: 'left', // a
  68: 'right', // d
  83: 'down', // s
  32: 'jump', // space
  80: 'p', // p
  12: 'enter' // enter
}

var keyCodes = {
  'left': 37,
  'right': 39,
  'down': 40,
  'up': 38,
  'a': 65,
  'd': 68,
  's': 83,
  'space': 32,
  'r': 82,
  'p': 80,
  'enter': 13,
}

function isKeyPressed( keyCode ) {
  return pressed[ keyCode ]
}

document.body.addEventListener('keydown', function( event ) {
  if ( typeof validKeys[ event.keyCode ] != 'undefined' ) {
    pressed[ event.keyCode ] = true
  }
})

document.body.addEventListener('keyup', function( event ) {
  if ( typeof validKeys[ event.keyCode ] != 'undefined' ) {
    pressed[ event.keyCode ] = false
  }
})

// the phased button will be done as event listener because it does
// not need the responsive control type of the movement keys
document.body.addEventListener('keydown', function( event ) {
  // if the phased button is pressed
  if ( event.keyCode == 82 || event.keyCode == 80 ) {
    if ( ! gameOver ) {
      phased = !phased
    }
  }

  if ( gameOver || gameSuccess ) {
    if ( event.keyCode == 82 ) {
      startGame( false )
    }
  }

  if ( gameSuccess ) {
    if ( event.keyCode == 13 ) {
      window.location.reload(false);
    }
  }
})