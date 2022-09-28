game.run = function() {
  var loops = 0,
    skipTicks = 1000 / game.fps,
    maxFrameSkip = 10,
    nextGameTick = (new Date).getTime();
  loops = 0;
  if ( ! gameOver && ! gameSuccess ) {
    game.update()
  }
  game.render()
};