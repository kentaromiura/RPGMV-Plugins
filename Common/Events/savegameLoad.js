var dispatchWhenDone = require('../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(DataManager, 'extractSaveContents', 'gameLoad')
}
