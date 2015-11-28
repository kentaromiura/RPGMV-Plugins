/*:
 * @plugindesc Add a Close game option.
 * @author Cristian Carlesso <kentaromiura>
 * @param quitOption
 * @desc Text to show in the main menu
 * @default Quit
 * released under MIT, see https://github.com/kentaromiura/RPGMV-Plugins/blob/master/LICENSE
 */
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(a,g,h,b){var c=a('1'),f=a('2'),d=c(),e=d.quitOption||'Quit';a('3')();b.addEventListener('commandWindowCreated',function(c){var a=c.detail.context;a._commandWindow.setHandler('Exit',function(){b.close()})});a('4')();b.addEventListener('commandListMade',function(b){var a=b.detail.context;a.addCommand(e,'Exit')})},'1':function(b,c,d,e){var a=b('5');c.exports=function(){return PluginManager.parameters(a())}},'2':function(b,a,c,d){a.exports=Function.prototype.call.bind(Array.prototype.slice)},'3':function(b,c,d,e){var a=b('6');c.exports=function(){return a(Scene_Title.prototype,'createCommandWindow','commandWindowCreated')}},'4':function(b,c,d,e){var a=b('6');c.exports=function(){return a(Window_TitleCommand.prototype,'makeCommandList','commandListMade')}},'5':function(b,a,c,d){a.exports=function(){return/([^\/]+)\.js$/.exec(document.currentScript.src)[1]}},'6':function(d,g,h,a){var e=d('2');var f=d('7');var b=a._kenta||(a._kenta={});var c=b.patchedMethods||(b.patchedMethods={});g.exports=function b(b,d,h){var i=f(b);var g=i+':'+h;if(c[g])return b[d];c[g]=true;var j=b[d];b[d]=function(){var b=e(arguments);var c=j.apply(this,b);a.dispatchEvent(new CustomEvent(h,{'detail':{args:b,result:c,context:this}}));return c};return b[d]}},'7':function(c,d,f,g){var b=c('8');var a='🍕';function e(c){return c.hasOwnProperty(a)?c[a]:Object.defineProperty(c,a,{enumerable:false,configurable:false,writable:false,value:b()})[a]}d.exports=e},'8':function(c,b,d,e){var a=0;b.exports=Utils.uniqueId||(Utils.uniqueId=function(){return(a++).toString(36)})}},this))