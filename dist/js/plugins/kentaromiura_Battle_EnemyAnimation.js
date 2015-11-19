/*:
* @plugindesc Such Animation. Very Enemy. Much Alpha. Wow.
* @author Cristian Carlesso <kentaromiura>
*/
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(a,o,n,d){a('1')();a('2')();var b=false;d.addEventListener('battleStarted',function a(){console.log('set battle on');b=true;requestAnimationFrame(c)});function m(){console.log('set battle off');b=false};['battleWon','battleEscaped','afterDefeat'].forEach(function(a){d.addEventListener(a,m)});var h=a('3');var i=a('4');var j=a('5');var k=h([{x:0,y:.18},{x:0,y:1},{x:.16,y:1},{x:.21,y:.45},{x:.26,y:1},{x:.44,y:1},{x:.44,y:.47},{x:.58,y:1},{x:.64,y:1},{x:.72,y:.48},{x:.75,y:1},{x:1,y:1},{x:1,y:.26}],1e-4),f=0,e=40,g=function(a){f=e/2-e*a},l=new i(1e4,k,g),c=function(){$gameTroop.members().forEach(function(a){j(a)._offsetX=f});if(b)requestAnimationFrame(c)};d.addEventListener('gameObjectsCreated',function(){l.loop()})},'1':function(a,b,c,d){b.exports=function b(){a('6')();a('7')();a('8')();a('9')()}},'2':function(b,c,d,e){var a=b('b');c.exports=function(){return a(DataManager,'createGameObjects','gameObjectsCreated')}},'3':function(e,d,f,g){var a=function(g,j,i,h,a){var b=1-a,e=a*a*a,d=3*a*a*b,c=3*a*b*b,f=b*b*b;return h*e+i*d+j*c+g*f};var b=function(a,b,c){if(a<b)return b;if(a>c)return c;return a};var c=function(c,i){if(c.length%3!==1)throw new Error('invalid input');for(var d=0;d<c.length-1;d+=3){var e=c[d],g=c[d+1],h=c[d+2],f=c[d+3];if(d===0)e.x=0;else e.x=b(e.x,0,1);if(d===c.length-4)f.x=1;else f.x=b(f.x,e.x,1);g.x=b(g.x,e.x,f.x);h.x=b(h.x,e.x,f.x)}return function(e){var d,j,k,b;for(var f=0;f<c.length-1;f+=3){d=c[f];j=c[f+1];k=c[f+2];b=c[f+3];if(e>=d.x&&e<=b.x)break}var g=0,l=1,h=e,m;if(e<g)return a(d.y,j.y,k.y,b.y,g);if(e>l)return a(d.y,j.y,k.y,b.y,l);while(g<l){m=a(d.x,j.x,k.x,b.x,h);if(Math.abs(m-e)<i)return a(d.y,j.y,k.y,b.y,h);if(e>m)g=h;else l=h;h=(l-g)*.5+g}return a(d.y,j.y,k.y,b.y,h)}};d.exports=c},'4':function(d,e,f,g){var b=d('a');function c(a,b,c,d){if(!a)throw new Error('no duration given');if(!b)throw new Error('no equation given');if(!c)throw new Error('no onStep given');this.duration=a;this.equation=b;this.onStep=c;this.onEnd=d||function(){};this.step=this.step.bind(this)}function a(a){b(a);return function(){this.elapsed=this.duration}}c.prototype={get paused(){return this.cancel==null&&this.elapsed!=null},get active(){return this.cancel!=null},get idle(){return this.cancel==null&&this.elapsed==null},start:function(){if(this.idle){this.elapsed=0;this.cancel=a(this.step)}return this},step:function(c){this.elapsed+=c-(this.time||c);var b=this.elapsed/this.duration;if(b>1)b=1;if(b!==1){this.time=c;this.cancel=a(this.step)}else{this.cancel=this.time=this.elapsed=null;a(this.onEnd)}var d=this.equation(b);this.onStep(d)},stop:function(){if(this.active){this.cancel();this.elapsed=this.cancel=this.time=null}return this},pause:function(){if(this.active){this.cancel();this.cancel=this.time=null}return this},loop:function(){var a=this;a.onEnd=function(){a.start()};a.start();return{cancel:function(){a.onEnd=function(){};a.cancel()}}},resume:function(){if(this.paused){this.cancel=a(this.step)}return this}};e.exports=c},'5':function(b,a,c,d){a.exports=function a(a){return SceneManager._scene._spriteset._battleField.children.filter(function(b){return b._enemy===a})[0]}},'6':function(b,c,d,e){var a=b('b');c.exports=function(){return a(BattleManager,'processDefeat','afterDefeat')}},'7':function(b,c,d,e){var a=b('b');c.exports=function(){return a(Game_System.prototype,'onBattleStart','battleStarted')}},'8':function(b,c,d,e){var a=b('b');c.exports=function(){return a(Game_System.prototype,'onBattleWin','battleWon')}},'9':function(b,c,d,e){var a=b('b');c.exports=function(){return a(Game_System.prototype,'onBattleEscape','battleEscaped')}},'a':function(c,b,d,a){b.exports=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame||function(a){setTimeout(function(){a(+new Date)},1e3/60)}},'b':function(d,g,h,a){var e=d('c');var f=d('d');var b=a._kenta||(a._kenta={});var c=b.patchedMethods||(b.patchedMethods={});g.exports=function b(b,d,h){var i=f(b);var g=i+':'+h;if(c[g])return b[d];c[g]=true;var j=b[d];b[d]=function(){var b=e(arguments);var c=j.apply(this,b);a.dispatchEvent(new CustomEvent(h,{'detail':{args:b,result:c,context:this}}));return c};return b[d]}},'c':function(b,a,c,d){a.exports=Function.prototype.call.bind(Array.prototype.slice)},'d':function(c,d,f,g){var b=c('e');var a='🍕';function e(c){return c.hasOwnProperty(a)?c[a]:Object.defineProperty(c,a,{enumerable:false,configurable:false,writable:false,value:b()})[a]}d.exports=e},'e':function(c,b,d,e){var a=0;b.exports=Utils.uniqueId||(Utils.uniqueId=function(){return(a++).toString(36)})}},this))