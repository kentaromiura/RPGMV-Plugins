/*:
* @plugindesc Such Animation. Very Enemy. Much Alpha. Wow.
* @author Cristian Carlesso <kentaromiura>
*/
require('../../Common/addBattleEvents')()
require('../../Common/Events/gameObjectsCreated')()
var inBattle = false

global.addEventListener('battleStarted', function setBattleOn(){
  console.log('set battle on')
  inBattle = true
  requestAnimationFrame(updateEnemiesX)
})

function setBattleOff(){
    console.log('set battle off')
  inBattle = false
}
;['battleWon', 'battleEscaped',  'afterDefeat'].forEach(function(event){
  global.addEventListener(event, setBattleOff)
})

var animation = require('../../Common/kamicane.cubicBezier')
var Transition = require('../../Common/transition')
var getEnemySprite = require('../../Common/getEnemySprite')
var animationFormula = animation([{ x: 0, y: 0.18}, { x: 0, y: 1}, { x: 0.16, y: 1}, { x: 0.21, y: 0.45}, { x: 0.26, y: 1}, { x: 0.44, y: 1}, { x: 0.44, y: 0.47}, { x: 0.58, y: 1}, { x: 0.64, y: 1}, { x: 0.72, y: 0.48}, { x: 0.75, y: 1}, { x: 1, y: 1}, { x: 1, y: 0.26}], 0.0001),
  offsetX = 0,
  MAX_DELTA = 40,
  onTransition = function(_){offsetX = MAX_DELTA /2 - MAX_DELTA * _},
    transition = new Transition(10000, animationFormula, onTransition),
  updateEnemiesX = function(){

    $gameTroop.members().forEach(function(enemy){
      getEnemySprite(enemy)._offsetX = offsetX
    })
    if (inBattle) requestAnimationFrame(updateEnemiesX)
  }

global.addEventListener('gameObjectsCreated', function(){
  transition.loop()
})
