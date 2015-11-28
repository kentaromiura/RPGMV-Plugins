/*:
 * @plugindesc Applies pixi filter to the background of menus
 * @author Cristian Carlesso <kentaromiura>

 * @param Blur
 * @desc applies the blur filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param BlurX
 * @desc applies the blur x filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param BlurY
 * @desc applies the blur y filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param ColorMatrix
 * @desc applies the color matrix filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param ColorStep
 * @desc applies the color step filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param CrossHatch
 * @desc applies the cross hatch filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param DotScreen
 * @desc applies the dot screen filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Gray
 * @desc applies the gray filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Invert
 * @desc applies the invert filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Pixelate
 * @desc applies the pixelate filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param RGBSplit
 * @desc applies the rgb split filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Sepia
 * @desc applies the sepia filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0
 * @param Twist
 * @desc applies the twist filter, (0 = disabled, 1 or more = order in which is applied)
 * @default 0

 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This plugin allows you to apply some predefined filters
 * to your menu background.
 * The filters can be placed in any order,
 * just set the preferred order in the parameter configuration
 *
 * The filters will only be visible in environment supporting a webGL context,
 * where this is not avaiable they will simply not show.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Sometimes you may want to change the filters applied to the background
 * for this the following plugin commands are available:
 *
 * Plugin Command
 *   RemoveMenuBackgroundFilter $filter Removes the specif filter if exists
 *   RemoveAllMenuBackgroundFilters Removes any filter applied
 *   AppendMenuBackgroundFilter $filter Adds a filter at the end of the list
 *   PrependMenuBackgroundFilter $filter Adds a filter at the begin of the list
 *
 * where $filter can be any of the following:
 * Blur, BlurX, BlurY, ColorMatrix, ColorStep, CrossHatch, DotScreen, Gray,
 * Invert, Pixelate, RGBSplit, Sepia, Twist
 * ============================================================================
*/

require('../../Common/Events/Menu/backgroundCreated')()
require('../../Common/Events/GameInterpreter/commandInvoked')()

var getParameters = require('../../Common/getParameters')
var PARAMETERS = getParameters()

var filterList = []

function addToFilter(filter){
  filterList.push(new PIXI[filter])
}

Object.keys(PARAMETERS).reduce(function(enabledFilters, possible){
  var possibleFilter = possible + 'Filter'
  if (possibleFilter in PIXI){
    var order = PARAMETERS[possible] - 0
    if (!isNaN(order) && order > 0) {
      enabledFilters.push(order + ':' + possibleFilter)
    }
  }
  return enabledFilters
}, []).sort().forEach(function(filter){
  addToFilter(filter.split(':')[1])
})

global.addEventListener('backgroundCreated', function(event){
  var window = event.detail.context
  if (filterList.length){
    window._backgroundSprite.filters = filterList
  } else {
    if (window._backgroundSprite.filters && window._backgroundSprite.filters.length === 0){
      delete window._backgroundSprite.filters;
    }
  }
})

global.addEventListener('commandInvoked', function(event){
  var args = event.detail.args
  var command = args[0]
  var parameters = args[1]
  switch (command){
    case 'RemoveMenuBackgroundFilter':
    var filterType = parameters[0] + 'Filter'
    if (filterType in PIXI){
      var filterTypeToRemove = PIXI[filterType]
      filterList = filterList.filter(function(filter){
        return ! (filter instanceof filterTypeToRemove)
      })
    }
    break
    case 'RemoveAllMenuBackgroundFilters':
      filterList = []
    break
    case 'AppendMenuBackgroundFilter':
      var filterType = parameters[0] + 'Filter'
      if (filterType in PIXI){
        addToFilter(filterType)
      }
    break
    case 'PrependMenuBackgroundFilter':
      var filterType = parameters[0] + 'Filter'
      if (filterType in PIXI){
        filterList.unshift(new PIXI[filterType])
      }
    break
  }
})
