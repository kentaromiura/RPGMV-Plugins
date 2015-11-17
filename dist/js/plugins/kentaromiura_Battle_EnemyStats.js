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
(function(c,d){var a={},b=function(f){var e=a[f];if(!e){e=a[f]={};var g=e.exports={};c[f].call(g,b,e,g,d)}return e.exports};b('0')}({'0':function(e,v,u,d){var b=e('1');var m=e('2');var o=e('3');var q=e('4');var a=q();var g=a.displayAfterAbility==='false';function j(a){$dataEnemies[a]._isKnown=true}if(!g){Game_Action.prototype.apply=b(Game_Action.prototype.apply,'gameActionApplied');d.addEventListener('gameActionApplied',function(c){if(c.detail.context.item().name===a.abilityName){var b=c.detail.args[0];if(b.result().isHit())j(b._enemyId)}});DataManager.makeSaveContents=function(a){return function(){var b=a();b.knownEnemies=$dataEnemies.filter(function(a){return a&&a._isKnown}).map(function(a){return a.id});return b}}(DataManager.makeSaveContents);DataManager.extractSaveContents=b(DataManager.extractSaveContents,'gameLoad');d.addEventListener('gameLoad',function(a){a.detail.args[0].knownEnemies.forEach(j);n()})}function t(a){return SceneManager._scene._spriteset._battleField.children.filter(function(b){return b._enemy===a})[0]}function n(){var a=['battleStarted','battleWon','battleEscaped'];;['onBattleStart','onBattleWin','onBattleEscape'].forEach(function(c,d){$gameSystem[c]=b($gameSystem[c],a[d])})}function s(){BattleManager.processDefeat=b(BattleManager.processDefeat,'afterDefeat');n()}DataManager.createGameObjects=b(DataManager.createGameObjects,'gameObjectsCreated');var p=m([{x:0,y:.89},{x:.15,y:-.3},{x:.25,y:.02},{x:.52,y:.26},{x:.8,y:.02},{x:.85,y:-.31},{x:1,y:.88}],1e-4),f=0,i=a.maxAnimationHeight-0,c=32,h=a.padding-0,r=function(a){f=i*a},l=new o(2e3,p,r),k=function(){s();if(a.animate==='true'){l.loop()}var b=false,e=function(){$gameTroop.members().forEach(function(b){var p=$dataEnemies[b._enemyId];var r=g||p._isKnown;b._height=b._height||(b._height=t(b).height);var d=b._hpSprite||(b._hpSprite=new Sprite_Base);var e=b._hpBar||(b._hpBar=new Sprite_Base);var j=''+b._hp;var u=b._maxHP||(b._maxHP=p.params[0]);var o=j.length*c;d.bitmap=new Bitmap(o,c);d.bitmap.fontSize=c;var m=c;var s=d.bitmap.measureTextWidth(j);d.bitmap.drawText(j,0,0,o,c,'left');d.x=b.screenX()-s/2;var q=Math.max(b.screenY()-(b._height+m+h+f),m+h+i-f);d.y=q;e.bitmap=new Bitmap(100,10);e.bitmap.fillAll(a.backgroundHPBar);var k=100*b._hp/u,n=a.normalHPColorStart,l=a.normalHPColorEnd;if(k<a.warnThreshold){n=a.warnHPColorStart;l=a.warnHPColorEnd}if(k<a.criticalThreshold){n=a.criticalHPColorStart;l=a.criticalHPColorEnd}e.bitmap.gradientFillRect(0,0,k,10,n,l);e.x=b.screenX()-50;e.y=q+m;if(j==='0'){d.hide();e.hide()}if(r&&a.showHPBar==='true')SceneManager._scene.addChild(e);if(r&&a.showHP==='true')SceneManager._scene.addChild(d)});if(b)requestAnimationFrame(e)},j=function(){b=true;requestAnimationFrame(e)},k=function(){b=false};d.addEventListener('battleStarted',j);;['battleWon','battleEscaped','afterDefeat'].forEach(function(a){d.addEventListener(a,k)})};d.addEventListener('gameObjectsCreated',k)},'1':function(b,c,e,d){var a=b('5');c.exports=function b(b,c){return function(){var e=a(arguments);var f=b.apply(this,e);d.dispatchEvent(new CustomEvent(c,{'detail':{args:e,result:f,context:this}}));return f}}},'2':function(e,d,f,g){var a=function(g,j,i,h,a){var b=1-a,e=a*a*a,d=3*a*a*b,c=3*a*b*b,f=b*b*b;return h*e+i*d+j*c+g*f};var b=function(a,b,c){if(a<b)return b;if(a>c)return c;return a};var c=function(c,i){if(c.length%3!==1)throw new Error('invalid input');for(var d=0;d<c.length-1;d+=3){var e=c[d],g=c[d+1],h=c[d+2],f=c[d+3];if(d===0)e.x=0;else e.x=b(e.x,0,1);if(d===c.length-4)f.x=1;else f.x=b(f.x,e.x,1);g.x=b(g.x,e.x,f.x);h.x=b(h.x,e.x,f.x)}return function(e){var d,j,k,b;for(var f=0;f<c.length-1;f+=3){d=c[f];j=c[f+1];k=c[f+2];b=c[f+3];if(e>=d.x&&e<=b.x)break}var g=0,l=1,h=e,m;if(e<g)return a(d.y,j.y,k.y,b.y,g);if(e>l)return a(d.y,j.y,k.y,b.y,l);while(g<l){m=a(d.x,j.x,k.x,b.x,h);if(Math.abs(m-e)<i)return a(d.y,j.y,k.y,b.y,h);if(e>m)g=h;else l=h;h=(l-g)*.5+g}return a(d.y,j.y,k.y,b.y,h)}};d.exports=c},'3':function(d,e,f,g){var b=d('7');function c(a,b,c,d){if(!a)throw new Error('no duration given');if(!b)throw new Error('no equation given');if(!c)throw new Error('no onStep given');this.duration=a;this.equation=b;this.onStep=c;this.onEnd=d||function(){};this.step=this.step.bind(this)}function a(a){b(a);return function(){this.elapsed=this.duration}}c.prototype={get paused(){return this.cancel==null&&this.elapsed!=null},get active(){return this.cancel!=null},get idle(){return this.cancel==null&&this.elapsed==null},start:function(){if(this.idle){this.elapsed=0;this.cancel=a(this.step)}return this},step:function(c){this.elapsed+=c-(this.time||c);var b=this.elapsed/this.duration;if(b>1)b=1;if(b!==1){this.time=c;this.cancel=a(this.step)}else{this.cancel=this.time=this.elapsed=null;a(this.onEnd)}var d=this.equation(b);this.onStep(d)},stop:function(){if(this.active){this.cancel();this.elapsed=this.cancel=this.time=null}return this},pause:function(){if(this.active){this.cancel();this.cancel=this.time=null}return this},loop:function(){var a=this;a.onEnd=function(){a.start()};a.start();return{cancel:function(){a.onEnd=function(){};a.cancel()}}},resume:function(){if(this.paused){this.cancel=a(this.step)}return this}};e.exports=c},'4':function(b,c,d,e){var a=b('6');c.exports=function(){return PluginManager.parameters(a())}},'5':function(b,a,c,d){a.exports=Function.prototype.call.bind(Array.prototype.slice)},'6':function(b,a,c,d){a.exports=function(){return/([^\/]+)\.js$/.exec(document.currentScript.src)[1]}},'7':function(c,b,d,a){b.exports=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame||function(a){setTimeout(function(){a(+new Date)},1e3/60)}}},this))