/*:
 * @plugindesc Add a Close game option.
 * @author Cristian Carlesso <kentaromiura>
 * @param quitOption
 * @desc Text to show in the main menu
 * @default Quit
 */

!function(global){
  function getFileName(){
    var srcParts = document.currentScript.src.split('/')
    return srcParts[srcParts.length-1].replace('.js', '')
  }

  var slice = Function.prototype.call.bind(Array.prototype.slice),
    parameters = PluginManager.parameters(getFileName()),
    quitOption = parameters.quitOption || 'Quit'

  Scene_Title.prototype.createCommandWindow = function(_){
    return function(){
      _.apply(this, slice(arguments))
      this._commandWindow.setHandler('Exit', function(){
        global.close()
      })
    }
  }(Scene_Title.prototype.createCommandWindow)

  Window_TitleCommand.prototype.makeCommandList = function(_){
    return function(){
      _.apply(this, slice(arguments))
      this.addCommand(quitOption, 'Exit')
    }
  }(Window_TitleCommand.prototype.makeCommandList)

}(Function('return this')())
