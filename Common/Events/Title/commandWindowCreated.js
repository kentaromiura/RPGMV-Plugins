var dispatchWhenDone = require('../../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(Scene_Title.prototype, 'createCommandWindow', 'commandWindowCreated')
}
