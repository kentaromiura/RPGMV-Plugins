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
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(d,f,g,e){var b=d('1');var a=require('nw.gui');if(b().debug==='true')a.Window.get().showDevTools();e.addEventListener('keydown',function(a){if(a.ctrlKey&&a.keyCode==82){location.reload();a.preventDefault()}});if(b().isOSX==='true'){var c=new a.Menu({type:'menubar'});c.createMacBuiltin('DEBUG');a.Window.get().menu=c}},'1':function(b,c,d,e){var a=b('2');c.exports=function(){return PluginManager.parameters(a())}},'2':function(b,a,c,d){a.exports=function(){return/([^\/]+)\.js$/.exec(document.currentScript.src)[1]}}},this))