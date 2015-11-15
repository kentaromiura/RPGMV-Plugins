/*:
 * @plugindesc Display HP of enemies
 * @author Cristian Carlesso <kentaromiura>
 * @param showHPBar
 * @desc if true shows the hp bar
 * @default true
 * @param animate
 * @desc if true animates the hp bar
 * @default true
 * @param maxAnimationHeight
 * @desc the amount of pixel the bar will move upwards
 * @default 40
 * @param showHP
 * @desc if true show the HP
 * @default true
 * @param padding
 * @desc the distance between the sprite and the bar
 * @default 20
 */

var dispatchWhenDone = require('../../Common/dispatchWhenDone')
var animation = require('../../Common/kamicane.cubicBezier')
var Transition = require('../../Common/transition')
var getParameters = require('../../Common/getParameters')
var PARAMETERS = getParameters()

function getEnemySprite(enemy){
  return SceneManager._scene._spriteset._battleField.children.filter(function(sprite){
    return sprite._enemy === enemy
  })[0]
}

function addBattleEvents(){
  BattleManager.processDefeat = dispatchWhenDone(BattleManager.processDefeat, 'afterDefeat')

  var events = ['battleStarted', 'battleWon', 'battleEscaped']
  
  ;['onBattleStart', 'onBattleWin', 'onBattleEscape'].forEach(function(event, i){
    $gameSystem[event] = dispatchWhenDone($gameSystem[event], events[i])
  })
}

// all the $* variable get set after DataManager.createGameObjects, the plugin though runs before that call.
DataManager.createGameObjects = dispatchWhenDone(
  DataManager.createGameObjects,
  'gameObjectsCreated'
)

var animationFormula = animation([
  { x: 0, y: 0.89},
  { x: 0.15, y: -0.3},
  { x: 0.25, y: 0.02},
  { x: 0.52, y: 0.26},
  { x: 0.8, y: 0.02},
  { x: 0.85, y: -0.31},
  { x: 1, y: 0.88}
], 0.0001),
  deltaY = 0,
  MAX_DELTA = PARAMETERS.maxAnimationHeight - 0,
  FONT_SIZE = 32,
  PADDING = PARAMETERS.padding - 0,
  onTransition = function(_){deltaY = MAX_DELTA * _},
  transition = new Transition(2000, animationFormula, onTransition),
  onGameObjectsCreated = function(){
    addBattleEvents()
    
    if (PARAMETERS.animate === 'true') {
      transition.loop()
    }
    
    var inBattle = false,
        updateEnemyHP = function(){
          $gameTroop.members().forEach(function(enemy){
  
            enemy._height = enemy._height || (enemy._height = getEnemySprite(enemy).height)
    
            var hpSprite = enemy._hpSprite || (enemy._hpSprite = new Sprite_Base())
            var hpBar = enemy._hpBar || (enemy._hpBar = new Sprite_Base())
            var hp = '' + enemy._hp
            var maxHP = enemy._maxHP || (enemy._maxHP = $dataEnemies[enemy._enemyId].params[0])
    
            var textWidth = hp.length * FONT_SIZE
    
            hpSprite.bitmap = new Bitmap(textWidth, FONT_SIZE)
            hpSprite.bitmap.fontSize = FONT_SIZE
            var textHeight = FONT_SIZE
    
            var realTextWidth = hpSprite.bitmap.measureTextWidth(hp)
            hpSprite.bitmap.drawText(hp, 0, 0, textWidth, FONT_SIZE, 'left')  
            hpSprite.x = enemy.screenX() - realTextWidth/2
    
            var currentY = Math.max(
              enemy.screenY() - (enemy._height + textHeight + PADDING + deltaY),
              textHeight + PADDING + MAX_DELTA - deltaY
            )
    
            hpSprite.y = currentY
            hpBar.bitmap = new Bitmap(100, 10)
            hpBar.bitmap.fillAll('rgba(0,0,0,0.3)')
            hpBar.bitmap.gradientFillRect(
              0,
              0,
              100 * enemy._hp/maxHP,
              10,
              'rgba(0,255,0,0.3)',
              'rgba(0,100,0,0.3)'
            )
    
            hpBar.x = enemy.screenX() - 50
            hpBar.y = currentY + textHeight
    
            if (hp === '0') {
              hpSprite.hide()
              hpBar.hide()
            }
    
            if (PARAMETERS.showHPBar === 'true') SceneManager._scene.addChild(hpBar)
            if (PARAMETERS.showHP === 'true') SceneManager._scene.addChild(hpSprite)
          })
  
        if (inBattle) requestAnimationFrame(updateEnemyHP)
      },
      setBattleOn = function(){
        inBattle = true
        requestAnimationFrame(updateEnemyHP)
      },
      setBattleOff = function(){
        inBattle = false
      }
  
    global.addEventListener('battleStarted', setBattleOn)
    
    ;['battleWon', 'battleEscaped',  'afterDefeat'].forEach(function(event){
      global.addEventListener(event, setBattleOff)
    })
  }

global.addEventListener('gameObjectsCreated', onGameObjectsCreated)

// TODO: add customizable colors
// TODO: make it show via a `known` flag (scan-like functionality)
