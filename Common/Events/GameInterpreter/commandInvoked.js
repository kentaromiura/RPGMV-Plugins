var dispatchWhenDone = require('../../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(Game_Interpreter.prototype, 'pluginCommand', 'commandInvoked')
}