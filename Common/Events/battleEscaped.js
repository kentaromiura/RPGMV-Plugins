var dispatchWhenDone = require('../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(Game_System.prototype, 'onBattleEscape', 'battleEscaped')
}
