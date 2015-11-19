var dispatchWhenDone = require('../../dispatchWhenDone')
module.exports = function() {
  return dispatchWhenDone(Window_TitleCommand.prototype, 'makeCommandList', 'commandListMade')
}
