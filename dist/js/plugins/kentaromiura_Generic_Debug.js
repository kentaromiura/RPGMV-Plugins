/*:
 * @plugindesc Open the chrome devtool
 * @author Cristian Carlesso <kentaromiura>
 * @param debug
 * @desc if true opens chrome inspector for testing
 * @default false
 */
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(b,c,d,e){var a=b('1');if(a().debug==='true')require('nw.gui').Window.get().showDevTools()},'1':function(b,c,d,e){var a=b('2');c.exports=function(){return PluginManager.parameters(a())}},'2':function(b,a,c,d){a.exports=function(){return/([^\/]+)\.js$/.exec(document.currentScript.src)[1]}}},this))