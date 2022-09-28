editor.update = function() {

  document.getElementById('mouse-coords').innerHTML = "( X : " + parseInt( mouseX / tileSize ) + " / Y : " + parseInt( mouseY / tileSize ) + " )"
}