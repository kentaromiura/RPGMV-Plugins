/*:
 * @plugindesc Add a Close game option.
 * @author Cristian Carlesso <kentaromiura>
 * @param quitOption
 * @desc Text to show in the main menu
 * @default Quit
 */
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(b,g,h,f){var c=b('1'),a=b('2'),d=c(),e=d.quitOption||'Quit';Scene_Title.prototype.createCommandWindow=function(b){return function(){b.apply(this,a(arguments));this._commandWindow.setHandler('Exit',function(){f.close()})}}(Scene_Title.prototype.createCommandWindow);Window_TitleCommand.prototype.makeCommandList=function(b){return function(){b.apply(this,a(arguments));this.addCommand(e,'Exit')}}(Window_TitleCommand.prototype.makeCommandList)},'1':function(b,c,d,e){var a=b('3');c.exports=function(){return PluginManager.parameters(a())}},'2':function(b,a,c,d){a.exports=Function.prototype.call.bind(Array.prototype.slice)},'3':function(b,a,c,d){a.exports=function(){return/([^\/]+)\.js$/.exec(document.currentScript.src)[1]}}},this))