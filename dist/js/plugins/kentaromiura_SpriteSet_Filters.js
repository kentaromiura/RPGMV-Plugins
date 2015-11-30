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
* released under MIT, see https://github.com/kentaromiura/RPGMV-Plugins/blob/master/LICENSE
 */
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(b,e,f,c){b('1')();var a=[];function d(b){a.push(new PIXI[b])}c.addEventListener('commandInvoked',function(h){var e=h.detail.args;var f=e[0];var c=e[1];switch(f){case'RemoveSpriteSetFilter':var b=c[0]+'Filter';if(b in PIXI){var g=PIXI[b];a=a.filter(function(a){return!(a instanceof g)})}break;case'RemoveAllSpriteSetFilters':a=[];break;case'AppendSpriteSetFilter':var b=c[0]+'Filter';if(b in PIXI){d(b)}break;case'PrependSpriteSetFilter':var b=c[0]+'Filter';if(b in PIXI){a.unshift(new PIXI[b])}break}if(a.length>0){SceneManager._scene._spriteset.filters=a}else{SceneManager._scene._spriteset.filters=undefined;delete SceneManager._scene._spriteset.filters}})},'1':function(b,c,d,e){var a=b('2');c.exports=function(){return a(Game_Interpreter.prototype,'pluginCommand','commandInvoked')}},'2':function(d,g,h,a){var e=d('3');var f=d('4');var b=a._kenta||(a._kenta={});var c=b.patchedMethods||(b.patchedMethods={});g.exports=function b(b,d,h){var i=f(b);var g=i+':'+h;if(c[g])return b[d];c[g]=true;var j=b[d];b[d]=function(){var b=e(arguments);var c=j.apply(this,b);a.dispatchEvent(new CustomEvent(h,{'detail':{args:b,result:c,context:this}}));return c};return b[d]}},'3':function(b,a,c,d){a.exports=Function.prototype.call.bind(Array.prototype.slice)},'4':function(c,d,f,g){var b=c('5');var a='🍕';function e(c){return c.hasOwnProperty(a)?c[a]:Object.defineProperty(c,a,{enumerable:false,configurable:false,writable:false,value:b()})[a]}d.exports=e},'5':function(c,b,d,e){var a=0;b.exports=Utils.uniqueId||(Utils.uniqueId=function(){return(a++).toString(36)})}},this))