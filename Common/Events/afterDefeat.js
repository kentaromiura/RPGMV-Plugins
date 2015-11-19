var dispatchWhenDone = require('../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(BattleManager, 'processDefeat', 'afterDefeat')
}
