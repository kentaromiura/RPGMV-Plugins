module.exports = function getEnemySprite(enemy){
  return SceneManager._scene._spriteset._battleField.children.filter(function(sprite){
    return sprite._enemy === enemy
  })[0]
}
