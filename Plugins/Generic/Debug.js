/*:
 * @plugindesc Open the chrome devtool
 * @author Cristian Carlesso <kentaromiura>
 * @param debug
 * @desc if true opens chrome inspector for testing
 * @default false
 * @param isOSX
 * @default false
 * @desc if true enable copy/paste for OSX
 */

var getParameters = require('../../Common/getParameters')
var gui = require('nw.gui');
if (getParameters().debug === 'true') gui.Window.get().showDevTools()

global.addEventListener('keydown', function(event) {
  if(event.ctrlKey && event.keyCode == 82) {
    location.reload()
    event.preventDefault()
  }
})

if (getParameters().isOSX === 'true') {
  var mb = new gui.Menu({type:"menubar"})
  mb.createMacBuiltin("DEBUG")
  gui.Window.get().menu = mb
}