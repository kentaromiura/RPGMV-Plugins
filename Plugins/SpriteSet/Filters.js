/*:
 * @plugindesc Applies pixi filter to the spriteset
 * @author Cristian Carlesso <kentaromiura>
 * Alpha, use at your risk
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin allows you to apply some predefined filters
 * to the spriteset.
 * The filters will only be visible in environment supporting a webGL context,
 * where this is not avaiable they will simply not show.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Plugin Command
 *   RemoveSpriteSetFilter $filter Removes the specif filter if exists
 *   RemoveAllSpriteSetFilters Removes any filter applied
 *   AppendSpriteSetFilter $filter Adds a filter at the end of the list
 *   PrependSpriteSetFilter $filter Adds a filter at the begin of the list
 *
 * where $filter can be any of the following:
 * Blur, BlurX, BlurY, ColorMatrix, ColorStep, CrossHatch, DotScreen, Gray,
 * Invert, Pixelate, RGBSplit, Sepia, Twist
 * ============================================================================
*/

require('../../Common/Events/GameInterpreter/commandInvoked')()

var filterList = []

function addToFilter(filter){
  filterList.push(new PIXI[filter])
}

global.addEventListener('commandInvoked', function(event){
  var args = event.detail.args
  var command = args[0]
  var parameters = args[1]
  switch (command){
    case 'RemoveSpriteSetFilter':
    var filterType = parameters[0] + 'Filter'
    if (filterType in PIXI){
      var filterTypeToRemove = PIXI[filterType]
      filterList = filterList.filter(function(filter){
        return ! (filter instanceof filterTypeToRemove)
      })
    }
    break
    case 'RemoveAllSpriteSetFilters':
      filterList = []
    break
    case 'AppendSpriteSetFilter':
      var filterType = parameters[0] + 'Filter'
      if (filterType in PIXI){
        addToFilter(filterType)
      }
    break
    case 'PrependSpriteSetFilter':
      var filterType = parameters[0] + 'Filter'
      if (filterType in PIXI){
        filterList.unshift(new PIXI[filterType])
      }
    break
  }
  
  if (filterList.length > 0) {
	  SceneManager._scene._spriteset.filters = filterList
  } else {
	  SceneManager._scene._spriteset.filters = undefined
	  delete SceneManager._scene._spriteset.filters //?
  }
})
