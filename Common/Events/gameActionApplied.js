var dispatchWhenDone = require('../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(Game_Action.prototype, 'apply', 'gameActionApplied')
}
