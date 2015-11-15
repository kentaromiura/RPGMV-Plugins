var getCurrentFileName = require('./getCurrentFileName')

module.exports = function(){
  return PluginManager.parameters(getCurrentFileName())
}