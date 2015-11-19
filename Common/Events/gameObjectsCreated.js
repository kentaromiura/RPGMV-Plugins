// all the $* variable get set after DataManager.createGameObjects, any plugin though runs before that call.

var dispatchWhenDone = require('../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(DataManager, 'createGameObjects', 'gameObjectsCreated')
}
