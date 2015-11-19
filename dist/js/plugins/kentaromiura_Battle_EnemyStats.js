/*:
 * @plugindesc Display HP of enemies
 * @author Cristian Carlesso <kentaromiura>
 * @param showHP
 * @desc if true show the HP
 * @default true
 * @param showHPBar
 * @desc if true shows the hp bar
 * @default true
 * @param padding
 * @desc the distance between the sprite and the bar
 * @default 30
 * @param ===================
 * @param animate
 * @desc if true animates the hp bar
 * @default true
 * @param maxAnimationHeight
 * @desc the amount of pixel the bar will move upwards
 * @default 40
 * @param ===================
 * @param displayAfterAbility
 * @desc if true will only display after a particular ability succeed
 * @default false
 * @param abilityName
 * @desc the name of the ability we look for
 * @default Scan
 * @param ===================
 * @param backgroundHPBar
 * @desc the backgroundColor of the enemy HP Bar
 * @default rgba(255,255,255,0.3)
 * @param normalHPColorStart
 * @desc the start gradient color of the normal enemy HP Bar
 * @default rgba(0,255,0,1)
 * @param normalHPColorEnd
 * @desc the end gradient color of the normal enemy HP Bar
 * @default rgba(0,255,0,0.3)
 * @param warnThreshold
 * @desc the warn % threshold
 * @default 55
 * @param warnHPColorStart
 * @desc the start gradient color of the critical enemy HP Bar
 * @default rgba(255,180,0,1)
 * @param warnHPColorEnd
 * @desc the end gradient color of the critical enemy HP Bar
 * @default rgba(255,180,0,0.3)
 * @param criticalThreshold
 * @desc the critical % threshold
 * @default 30
 * @param criticalHPColorStart
 * @desc the start gradient color of the critical enemy HP Bar
 * @default rgba(255,0,0,1)
 * @param criticalHPColorEnd
 * @desc the end gradient color of the critical enemy HP Bar
 * @default rgba(255,0,0,0.3)
 *
 */
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(b,s,r,d){var o=b('1');var p=b('2');var q=b('3');var i=b('4');b('5')();var a=q();var f=a.displayAfterAbility==='false';function l(a){$dataEnemies[a]._isKnown=true}if(!f){b('6')();d.addEventListener('gameActionApplied',function(c){if(c.detail.context.item().name===a.abilityName){var b=c.detail.args[0];if(b.result().isHit())l(b._enemyId)}});DataManager.makeSaveContents=function(a){return function(){var b=a();b.knownEnemies=$dataEnemies.filter(function(a){return a&&a._isKnown}).map(function(a){return a.id});return b}}(DataManager.makeSaveContents);b('7')();d.addEventListener('savegameLoad',function(a){a.detail.args[0].knownEnemies.forEach(l)})}var m=o([{x:0,y:.89},{x:.15,y:-.3},{x:.25,y:.02},{x:.52,y:.26},{x:.8,y:.02},{x:.85,y:-.31},{x:1,y:.88}],1e-4),e=0,g=a.maxAnimationHeight-0,c=32,h=a.padding-0,k=function(a){e=g*a},j=new p(2e3,m,k),n=function(){b('8')();if(a.animate==='true'){j.loop()}var k=false,l=function(){$gameTroop.members().forEach(function(b){var q=$dataEnemies[b._enemyId];var s=f||q._isKnown;b._height=b._height||(b._height=i(b).height);var d=b._hpSprite||(b._hpSprite=new Sprite_Base);var j=b._hpBar||(b._hpBar=new Sprite_Base);var k=''+b._hp;var u=b._maxHP||(b._maxHP=q.params[0]);var p=k.length*c;d.bitmap=new Bitmap(p,c);d.bitmap.fontSize=c;var n=c;var t=d.bitmap.measureTextWidth(k);d.bitmap.drawText(k,0,0,p,c,'left');d.x=b.screenX()-t/2;var r=Math.max(b.screenY()-(b._height+n+h+e),n+h+g-e);d.y=r;j.bitmap=new Bitmap(100,10);j.bitmap.fillAll(a.backgroundHPBar);var l=100*b._hp/u,o=a.normalHPColorStart,m=a.normalHPColorEnd;if(l<a.warnThreshold){o=a.warnHPColorStart;m=a.warnHPColorEnd}if(l<a.criticalThreshold){o=a.criticalHPColorStart;m=a.criticalHPColorEnd}j.bitmap.gradientFillRect(0,0,l,10,o,m);j.x=b.screenX()-50;j.y=r+n;if(k==='0'){d.hide();j.hide()}if(s&&a.showHPBar==='true')SceneManager._scene.addChild(j);if(s&&a.showHP==='true')SceneManager._scene.addChild(d)});if(k)requestAnimationFrame(l)},m=function(){k=true;requestAnimationFrame(l)},n=function(){k=false};d.addEventListener('battleStarted',m);;['battleWon','battleEscaped','afterDefeat'].forEach(function(a){d.addEventListener(a,n)})};d.addEventListener('gameObjectsCreated',n)},'1':function(e,d,f,g){var a=function(g,j,i,h,a){var b=1-a,e=a*a*a,d=3*a*a*b,c=3*a*b*b,f=b*b*b;return h*e+i*d+j*c+g*f};var b=function(a,b,c){if(a<b)return b;if(a>c)return c;return a};var c=function(c,i){if(c.length%3!==1)throw new Error('invalid input');for(var d=0;d<c.length-1;d+=3){var e=c[d],g=c[d+1],h=c[d+2],f=c[d+3];if(d===0)e.x=0;else e.x=b(e.x,0,1);if(d===c.length-4)f.x=1;else f.x=b(f.x,e.x,1);g.x=b(g.x,e.x,f.x);h.x=b(h.x,e.x,f.x)}return function(e){var d,j,k,b;for(var f=0;f<c.length-1;f+=3){d=c[f];j=c[f+1];k=c[f+2];b=c[f+3];if(e>=d.x&&e<=b.x)break}var g=0,l=1,h=e,m;if(e<g)return a(d.y,j.y,k.y,b.y,g);if(e>l)return a(d.y,j.y,k.y,b.y,l);while(g<l){m=a(d.x,j.x,k.x,b.x,h);if(Math.abs(m-e)<i)return a(d.y,j.y,k.y,b.y,h);if(e>m)g=h;else l=h;h=(l-g)*.5+g}return a(d.y,j.y,k.y,b.y,h)}};d.exports=c},'2':function(d,e,f,g){var b=d('9');function c(a,b,c,d){if(!a)throw new Error('no duration given');if(!b)throw new Error('no equation given');if(!c)throw new Error('no onStep given');this.duration=a;this.equation=b;this.onStep=c;this.onEnd=d||function(){};this.step=this.step.bind(this)}function a(a){b(a);return function(){this.elapsed=this.duration}}c.prototype={get paused(){return this.cancel==null&&this.elapsed!=null},get active(){return this.cancel!=null},get idle(){return this.cancel==null&&this.elapsed==null},start:function(){if(this.idle){this.elapsed=0;this.cancel=a(this.step)}return this},step:function(c){this.elapsed+=c-(this.time||c);var b=this.elapsed/this.duration;if(b>1)b=1;if(b!==1){this.time=c;this.cancel=a(this.step)}else{this.cancel=this.time=this.elapsed=null;a(this.onEnd)}var d=this.equation(b);this.onStep(d)},stop:function(){if(this.active){this.cancel();this.elapsed=this.cancel=this.time=null}return this},pause:function(){if(this.active){this.cancel();this.cancel=this.time=null}return this},loop:function(){var a=this;a.onEnd=function(){a.start()};a.start();return{cancel:function(){a.onEnd=function(){};a.cancel()}}},resume:function(){if(this.paused){this.cancel=a(this.step)}return this}};e.exports=c},'3':function(b,c,d,e){var a=b('f');c.exports=function(){return PluginManager.parameters(a())}},'4':function(b,a,c,d){a.exports=function a(a){return SceneManager._scene._spriteset._battleField.children.filter(function(b){return b._enemy===a})[0]}},'5':function(b,c,d,e){var a=b('a');c.exports=function(){return a(DataManager,'createGameObjects','gameObjectsCreated')}},'6':function(b,c,d,e){var a=b('a');c.exports=function(){return a(Game_Action.prototype,'apply','gameActionApplied')}},'7':function(b,c,d,e){var a=b('a');c.exports=function(){return a(DataManager,'extractSaveContents','gameLoad')}},'8':function(a,b,c,d){b.exports=function b(){a('b')();a('c')();a('d')();a('e')()}},'9':function(c,b,d,a){b.exports=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame||function(a){setTimeout(function(){a(+new Date)},1e3/60)}},'a':function(d,g,h,a){var e=d('g');var f=d('h');var b=a._kenta||(a._kenta={});var c=b.patchedMethods||(b.patchedMethods={});g.exports=function b(b,d,h){var i=f(b);var g=i+':'+h;if(c[g])return b[d];c[g]=true;var j=b[d];b[d]=function(){var b=e(arguments);var c=j.apply(this,b);a.dispatchEvent(new CustomEvent(h,{'detail':{args:b,result:c,context:this}}));return c};return b[d]}},'b':function(b,c,d,e){var a=b('a');c.exports=function(){return a(BattleManager,'processDefeat','afterDefeat')}},'c':function(b,c,d,e){var a=b('a');c.exports=function(){return a(Game_System.prototype,'onBattleStart','battleStarted')}},'d':function(b,c,d,e){var a=b('a');c.exports=function(){return a(Game_System.prototype,'onBattleWin','battleWon')}},'e':function(b,c,d,e){var a=b('a');c.exports=function(){return a(Game_System.prototype,'onBattleEscape','battleEscaped')}},'f':function(b,a,c,d){a.exports=function(){return/([^\/]+)\.js$/.exec(document.currentScript.src)[1]}},'g':function(b,a,c,d){a.exports=Function.prototype.call.bind(Array.prototype.slice)},'h':function(c,d,f,g){var b=c('i');var a='🍕';function e(c){return c.hasOwnProperty(a)?c[a]:Object.defineProperty(c,a,{enumerable:false,configurable:false,writable:false,value:b()})[a]}d.exports=e},'i':function(c,b,d,e){var a=0;b.exports=Utils.uniqueId||(Utils.uniqueId=function(){return(a++).toString(36)})}},this))