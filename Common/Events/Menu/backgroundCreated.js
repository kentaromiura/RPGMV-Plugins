var dispatchWhenDone = require('../../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(Scene_MenuBase.prototype, 'createBackground', 'backgroundCreated')
}
