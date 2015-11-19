module.exports = function addBattleEvents(){
  require('./Events/afterDefeat')()
  require('./Events/battleStarted')()
  require('./Events/battleWon')()
  require('./Events/battleEscaped')()
}