/*:
 * @plugindesc Display HP of enemies
 * @author Cristian Carlesso <kentaromiura>
 * @param showHP
 * @desc if true show the HP
 * @default true
 * @param showHPBar
 * @desc if true shows the hp bar
 * @default true
 * @param padding
 * @desc the distance between the sprite and the bar
 * @default 30
 * @param ===================
 * @param animate
 * @desc if true animates the hp bar
 * @default true
 * @param maxAnimationHeight
 * @desc the amount of pixel the bar will move upwards
 * @default 40
 * @param ===================
 * @param displayAfterAbility
 * @desc if true will only display after a particular ability succeed
 * @default false
 * @param abilityName
 * @desc the name of the ability we look for
 * @default Scan
 * @param ===================
 * @param backgroundHPBar
 * @desc the backgroundColor of the enemy HP Bar
 * @default rgba(255,255,255,0.3)
 * @param normalHPColorStart
 * @desc the start gradient color of the normal enemy HP Bar
 * @default rgba(0,255,0,1)
 * @param normalHPColorEnd
 * @desc the end gradient color of the normal enemy HP Bar
 * @default rgba(0,255,0,0.3)
 * @param warnThreshold
 * @desc the warn % threshold
 * @default 55
 * @param warnHPColorStart
 * @desc the start gradient color of the critical enemy HP Bar
 * @default rgba(255,180,0,1)
 * @param warnHPColorEnd
 * @desc the end gradient color of the critical enemy HP Bar
 * @default rgba(255,180,0,0.3)
 * @param criticalThreshold
 * @desc the critical % threshold
 * @default 30
 * @param criticalHPColorStart
 * @desc the start gradient color of the critical enemy HP Bar
 * @default rgba(255,0,0,1)
 * @param criticalHPColorEnd
 * @desc the end gradient color of the critical enemy HP Bar
 * @default rgba(255,0,0,0.3)
 *
 */

var dispatchWhenDone = require('../../Common/dispatchWhenDone')
var animation = require('../../Common/kamicane.cubicBezier')
var Transition = require('../../Common/transition')
var getParameters = require('../../Common/getParameters')
var PARAMETERS = getParameters()
var alwaysDisplay = PARAMETERS.displayAfterAbility === 'false'

function setAsKnown(id){
  $dataEnemies[id]._isKnown = true
}

if(!alwaysDisplay){
  Game_Action.prototype.apply = dispatchWhenDone(Game_Action.prototype.apply, 'gameActionApplied')

  global.addEventListener('gameActionApplied', function(event){
    if(event.detail.context.item().name === PARAMETERS.abilityName){
      var target = event.detail.args[0]
      if(target.result().isHit()) setAsKnown(target._enemyId)
    }
  })
  // implement save
  DataManager.makeSaveContents = function(_){
    return function(){
      var contents = _()
      contents.knownEnemies = $dataEnemies.filter(function(enemy){
        return enemy && enemy._isKnown
      }).map(function(enemy){
        return enemy.id
      })
      return contents
    }
  }(DataManager.makeSaveContents)

  // implement load
  DataManager.extractSaveContents = dispatchWhenDone(DataManager.extractSaveContents, 'gameLoad')
  global.addEventListener('gameLoad', function(event){
    event.detail.args[0].knownEnemies.forEach(setAsKnown)
    makeCurrentGameSystemNotify()
  })
}

function getEnemySprite(enemy){
  return SceneManager._scene._spriteset._battleField.children.filter(function(sprite){
    return sprite._enemy === enemy
  })[0]
}

function makeCurrentGameSystemNotify(){
  var events = ['battleStarted', 'battleWon', 'battleEscaped']

  ;['onBattleStart', 'onBattleWin', 'onBattleEscape'].forEach(function(event, i){
    $gameSystem[event] = dispatchWhenDone($gameSystem[event], events[i])
  })
}
function addBattleEvents(){
  BattleManager.processDefeat = dispatchWhenDone(BattleManager.processDefeat, 'afterDefeat')
  makeCurrentGameSystemNotify()
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
            var dataEnemy = $dataEnemies[enemy._enemyId]
            var shouldDisplay = alwaysDisplay || dataEnemy._isKnown
            enemy._height = enemy._height || (enemy._height = getEnemySprite(enemy).height)

            var hpSprite = enemy._hpSprite || (enemy._hpSprite = new Sprite_Base())
            var hpBar = enemy._hpBar || (enemy._hpBar = new Sprite_Base())
            var hp = '' + enemy._hp
            var maxHP = enemy._maxHP || (enemy._maxHP = dataEnemy.params[0])

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
            hpBar.bitmap.fillAll(PARAMETERS.backgroundHPBar)
            var percent = 100 * enemy._hp/maxHP,
                colorStart =  PARAMETERS.normalHPColorStart,
                colorEnd =  PARAMETERS.normalHPColorEnd

            if (percent < PARAMETERS.warnThreshold){
              colorStart = PARAMETERS.warnHPColorStart
              colorEnd = PARAMETERS.warnHPColorEnd
            }

            if (percent < PARAMETERS.criticalThreshold){
              colorStart = PARAMETERS.criticalHPColorStart
              colorEnd = PARAMETERS.criticalHPColorEnd
            }

            hpBar.bitmap.gradientFillRect(
              0,
              0,
              percent,
              10,
              colorStart,
              colorEnd
            )

            hpBar.x = enemy.screenX() - 50
            hpBar.y = currentY + textHeight

            if (hp === '0') {
              hpSprite.hide()
              hpBar.hide()
            }

            if (shouldDisplay && PARAMETERS.showHPBar === 'true') SceneManager._scene.addChild(hpBar)
            if (shouldDisplay && PARAMETERS.showHP === 'true') SceneManager._scene.addChild(hpSprite)
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
  };

global.addEventListener('gameObjectsCreated', onGameObjectsCreated)
