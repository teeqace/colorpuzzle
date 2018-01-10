require=function e(t,i,s){function n(c,a){if(!i[c]){if(!t[c]){var h="function"==typeof require&&require;if(!a&&h)return h(c,!0);if(o)return o(c,!0);var r=new Error("Cannot find module '"+c+"'");throw r.code="MODULE_NOT_FOUND",r}var l=i[c]={exports:{}};t[c][0].call(l.exports,function(e){var i=t[c][1][e];return n(i||e)},l,l.exports,e,t,i,s)}return i[c].exports}for(var o="function"==typeof require&&require,c=0;c<s.length;c++)n(s[c]);return n}({BGColorSpread:[function(e,t,i){"use strict";cc._RF.push(t,"629658a9MJEvY5dNlft0zwY","BGColorSpread");var s=e("MessagePipeline"),n=["#44BCFF","#4462FF","#8F44FF","#E144FF","#FF448F","#FF4444","#FF7144","#FFAD44","#FFE144","#E9FF44","#C3FF44","#78FF44","#44FF8F","#44FFE9"],o=[["#4abdac","#fc4a1a","#f78733"],["#ffce00","#0375b4","#007849"],["#e37222","#07889b","#66b9bf"],["#004445","#2c7873","#6fb98f"],["#d7c3c7","#76323f","#c09f80"],["#e24e42","#e9b000","#008f95"],["#94618e","#49274a","#f4decb"],["#4484ce","#f9cf00","#f19f4d"],["#0b3c5d","#328cc1","#d9b310"],["#286da8","#cd5360","#438496"],["#ec576b","#4ec5c1","#e5e338"],["#77c9d4","#57bc90","#015249"],["#f7882f","#f7c331","#dcc7aa"],["#6e3667","#88d317","#cf6766"],["#fedc3d","#01abaa","#fea680"],["#b56357","#b4dbc0","#a7b3a5"],["#f81b84","#f5ce28","#43c0f6"],["#4cdef5","#a4d555","#ff5992"],["#841983","#99d3df","#88bbd6"],["#fa7c92","#6ec4db","#fff7c0"],["#6bbaa7","#fba100","#6c648b"],["#66ab8c","#b6a19e","#a9b7c0"],["#cccbc6","#efd9c1","#c7d8c6"],["#945d60","#626e60","#af473c"],["#67aeca","#e52a6f","#5f0f4e"],["#4d6e9c","#99ced4","#eeb6b7"],["#ccdfcb","#ff6a5c","#056571"],["#eab126","#f24c4e","#1b7b34"],["#155765","#57652a","#ab9353"],["#d48cf8","#0e8044","#b5e582"]];cc.Class({extends:cc.Component,properties:{BGColor1:cc.Node,BGColor2:cc.Node,BGColor3:cc.Node,BGColorSpread1:cc.Node,BGColorSpread2:cc.Node,BGColorSpread3:cc.Node,anim:cc.Animation},onLoad:function(){this.colorIndex=0,s.messagePipeline.on("onLevelUp",this._onLevelUp,this),s.messagePipeline.on("onGameOver",this._onGameOver,this),s.messagePipeline.on("onReset",this._onReset,this),s.messagePipeline.on("onBeat",this._onBeat,this),s.messagePipeline.on("onBar",this._onBar,this),this.onBeatAnim=cc.sequence(cc.scaleTo(0,.6),cc.scaleTo(1,.5)),this.onBarAnim=cc.sequence(cc.scaleTo(0,.6),cc.scaleTo(4,.5))},_onReset:function(){this.BGColor1.color=cc.hexToColor(o[this.colorIndex][0]),this.BGColor2.color=cc.hexToColor(o[this.colorIndex][1]),this.BGColor3.color=cc.hexToColor(o[this.colorIndex][2]),this.anim.play("BGColorGameStart")},_onLevelUp:function(e){this.colorIndex=(this.colorIndex+1)%n.length,this.BGColorSpread1.color=cc.hexToColor(o[this.colorIndex][0]),this.BGColorSpread2.color=cc.hexToColor(o[this.colorIndex][1]),this.BGColorSpread3.color=cc.hexToColor(o[this.colorIndex][2]),this.anim.play("BGColorSpread")},_onBGColorSpread:function(){this.BGColorSpread1.setScale(0),this.BGColor1.color=cc.hexToColor(o[this.colorIndex][0]),this.BGColor2.color=cc.hexToColor(o[this.colorIndex][1]),this.BGColor3.color=cc.hexToColor(o[this.colorIndex][2])},_onGameOver:function(e){this.anim.play("BGGameOver")},_onBeat:function(){this.BGColor3.runAction(this.onBeatAnim)},_onBar:function(){this.BGColor2.runAction(this.onBarAnim)}}),cc._RF.pop()},{MessagePipeline:"MessagePipeline"}],BGMPlay:[function(e,t,i){"use strict";cc._RF.push(t,"2d5b2JU2+xKj48M1Tqd5Mq4","BGMPlay");var s=e("MessagePipeline");cc.Class({extends:cc.Component,properties:{BPM:126,beat:4,minBeat:4},onLoad:function(){this.tmpTimer=0,this.tmpTotalTimer=0,this.musicStartTime=0,this._audioScore=this.getComponent(cc.AudioSource),this.minBeatCount=0,this.nextMinBeatTime=0,this.minBeatTime=60/this.BPM/this.minBeat,this.isOnMinBeat=!1,this.inOnBeat=!1,this.isOnBar=!1,s.messagePipeline.on("onReset",this.playBGM,this),s.messagePipeline.on("onGameOver",this.stopBGM,this)},playBGM:function(){this._audioScore&&(this._audioScore.play(),this.tmpTimer=0,this.tmpTotalTimer=0,this.minBeatCount=0,this.nextMinBeatTime=0,this.isOnMinBeat=!1,this.inOnBeat=!1,this.isOnBar=!1)},stopBGM:function(){this._audioScore&&this._audioScore.stop()},update:function(e){if(this._audioScore&&this._audioScore.isPlaying){var t=this._audioScore.getCurrentTime();this.tmpTotalTimer+=e,this.tmpTotalTimer<this.musicStartTime||(this.tmpTimer+=e,t-this.tmpTotalTimer>=.05?(this.tmpTimer+=.05,this.tmpTotalTimer+=.05):t-this.tmpTotalTimer<=-.05&&(this.tmpTimer-=.05,this.tmpTotalTimer-=.05),0===this.minBeatCount||this.tmpTimer>=this.minBeatTime&&!this.isOnMinBeat?(0!==this.minBeatCount&&(this.tmpTimer-=this.minBeatTime),this.isOnMinBeat=!0,this.minBeatCount%this.minBeat==0&&(this.inOnBeat=!0),this.minBeatCount%(this.minBeat*this.beat)==0&&(this.isOnBar=!0),this.minBeatCount+=1):(this.isOnMinBeat=!1,this.inOnBeat=!1,this.isOnBar=!1),this.isOnMinBeat&&s.messagePipeline.sendMessage("onMinBeat",this.minBeatCount),this.inOnBeat&&s.messagePipeline.sendMessage("onBeat",this),this.isOnBar&&s.messagePipeline.sendMessage("onBar",this))}}}),cc._RF.pop()},{MessagePipeline:"MessagePipeline"}],DisplayStats:[function(e,t,i){"use strict";cc._RF.push(t,"1ef03rgJXtNCo7KqS4X0LiM","DisplayStats"),cc.Class({extends:cc.Component,properties:{displayStats:!0},onLoad:function(){cc.director.setDisplayStats(this.displayStats)}}),cc._RF.pop()},{}],EnemyDamage:[function(e,t,i){"use strict";cc._RF.push(t,"4e99btS0u1K771JrAk9fubc","EnemyDamage"),cc.Class({extends:cc.Component,properties:{damageLabel:cc.Label,anim:cc.Animation},onLoad:function(){this.anim.on("finished",this._animFinish,this)},reuse:function(e){this.damageLabel.string=e,this.node.x=150*Math.random()-75,this.node.y=150*Math.random()-75,this.anim.play()},unuse:function(){},_animFinish:function(){this._backToPool()},setPool:function(e){this._pool=e},_backToPool:function(){this._pool&&this._pool.put(this.node)}}),cc._RF.pop()},{}],Enemy:[function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"7f7cef6WkZP/4v1YtBKlq0P","Enemy"),Object.defineProperty(i,"__esModule",{value:!0});var n=s(e("../core/GameFlow")),o=s(e("../player/Player")),c=s(e("../core/PrefabNodePool")),a=cc.Class({extends:cc.Component,properties:{isDead:{visible:!1,get:function(){return this._isDead}},enemySprites:{default:[],type:[cc.SpriteFrame]},enemySprite:cc.Sprite,maxAttackTurn:3,maxHp:1e3,attack:100,hpFill:cc.Sprite,hpLabel:cc.Label,turnLabel:cc.Label,attackLabel:cc.Label,anim:cc.Animation,enemyDamagePrefab:cc.Prefab},statics:{instance:null},onLoad:function(){var e=this;a.instance=this,this.damagePool=new c.default(this.enemyDamagePrefab,3,2,"EnemyDamage"),this.anim.on("finished",this._animFinish,this),this._enemyIndex=0,this.loadEnemyJson().then(function(t){e._enemyStatus=t,e._enemyReset()})},loadEnemyJson:function(){return new Promise(function(e,t){cc.loader.loadRes("json/enemy",function(i,s){i?t(i):e(s)})})},_enemyReset:function(){this._isOnAttack=!1,this._isDead=!1;var e=this._enemyStatus[this._enemyIndex];this.enemySprite.spriteFrame=this.enemySprites[e.spriteIndex],this.maxHp=e.hp,this.attack=e.attack,this.maxAttackTurn=e.turn,this._attackTurn=this.maxAttackTurn,this.turnLabel.string=this._attackTurn,this.attackLabel.string="ATK:"+this.attack,this._hp=this.maxHp,this._hpDisplay(),this.anim.play("EnemyAppear")},_hpDisplay:function(){this.hpFill.fillRange=this._hp/this.maxHp,this.hpLabel.string="HP:"+this._hp+" / "+this.maxHp},turnElapse:function(){this._attackTurn-=1,this._attackTurn<=0&&!this._isDead?(this._isOnAttack=!0,this.anim.play("EnemyAttack")):n.default.instance.nextPhase(),this.turnLabel.string=this._attackTurn},damage:function(e){this.anim.play("EnemyDamage"),this.damagePool.get(e).parent=this.node,this._hp=Math.max(0,this._hp-e),this._hpDisplay(),this._hp<=0&&(this._isDead=!0)},die:function(){o.default.instance.win(),this.anim.play("EnemyDie")},_animFinish:function(e){var t=e.currentTarget.clip.name;"EnemyAttack"===t?(this._attackTurn=this.maxAttackTurn,this.turnLabel.string=this._attackTurn,o.default.instance.damage(this.attack),n.default.instance.nextPhase(),this._isOnAttack=!1):"EnemyDie"===t&&(this._enemyIndex=(this._enemyIndex+1)%this._enemyStatus.length,this._enemyReset(),o.default.instance.normalFace())},update:function(e){n.default.instance.isEnemyTurn&&(this._isOnAttack||this.turnElapse())}});i.default=a,t.exports=i.default,cc._RF.pop()},{"../core/GameFlow":"GameFlow","../core/PrefabNodePool":"PrefabNodePool","../player/Player":"Player"}],FieldTouch:[function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"a0d97stdatL6aHGOgxXtmk/","FieldTouch");var n=s(e("./Pieces")),o=(s(e("../core/SEPlay")),s(e("../core/GameFlow")));cc.Class({extends:cc.Component,properties:{pieces:n.default,marker:cc.Node,moveTime:6,timerSprite:cc.Sprite},onLoad:function(){this._registerEvent(),this._leftBottomPos=cc.p(-this.node.width/2,-this.node.height/2),this._rightTopPos=cc.p(this.node.width/2,this.node.height/2),this._touchId="",this._timer=this.moveTime,this._isTouch=!1},onDestroy:function(){this._unregisterEvent()},_onTouchBegan:function(e){if(o.default.instance.isTouchTurn){var t=e.getLocation();t=this.node.convertToNodeSpaceAR(t),this._touchId=this._getTouchId(t);var i=this.pieces.getTouchStartPiece(this._touchId);this.marker.width=this.pieces.pieceW,this.marker.height=this.pieces.pieceH,this.marker.position=t,this.marker.getComponent(cc.Sprite).spriteFrame=i.pieceSprite.spriteFrame,this.marker.color=i.pieceSprite.node.color,this._isTouch=!0,this._timer=this.moveTime}},_onTouchMove:function(e){if(o.default.instance.isTouchTurn&&this._isTouch){var t=e.getLocation();(t=this.node.convertToNodeSpaceAR(t)).x=Math.max(this._leftBottomPos.x,Math.min(this._rightTopPos.x,t.x)),t.y=Math.max(this._leftBottomPos.y,Math.min(this._rightTopPos.y,t.y)),this.marker.position=t;var i=this._getTouchId(t);this._touchId!==i&&(this.pieces.swap(this._touchId,i),this._touchId=i)}},_getTouchId:function(e){var t=e.sub(this._leftBottomPos);return Math.min(this.pieces.xPiece-1,Math.floor(t.x/this.pieces.pieceW))+"-"+Math.min(this.pieces.yPiece-1,Math.floor(t.y/this.pieces.pieceH))},_finishTouch:function(e){o.default.instance.isTouchTurn&&(this.pieces.touchEndPiece(this._touchId),this.marker.x=-1e3,this._isTouch=!1,o.default.instance.nextPhase())},update:function(e){this._isTouch&&(this._timer-=e,this.timerSprite.fillRange=this._timer/this.moveTime,this._timer<=0&&this._finishTouch({}))},_onTouchEnded:function(e){this._finishTouch(e)},_onTouchCancel:function(e){this._finishTouch(e)},_registerEvent:function(){this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)},_unregisterEvent:function(){this.node.off(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.off(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this),this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)}}),cc._RF.pop()},{"../core/GameFlow":"GameFlow","../core/SEPlay":"SEPlay","./Pieces":"Pieces"}],GameFlow:[function(e,t,i){"use strict";cc._RF.push(t,"f6ca3+ROBZE24u1h6XUgFOv","GameFlow"),Object.defineProperty(i,"__esModule",{value:!0});var s=["touch","delete","enemy"],n=cc.Class({extends:cc.Component,properties:{phase:{visible:!1,get:function(){return this._phase}},isTouchTurn:{get:function(){return this._flowIndex===this._flowTOUCH}},isDeleteTurn:{get:function(){return this._flowIndex===this._flowDELETE}},isEnemyTurn:{get:function(){return this._flowIndex===this._flowENEMY}}},statics:{instance:null},onLoad:function(){n.instance=this,this._flowIndex=0,this._flowCount=s.length,this._flowTOUCH=s.indexOf("touch"),this._flowDELETE=s.indexOf("delete"),this._flowENEMY=s.indexOf("enemy")},nextPhase:function(){this._flowIndex=(this._flowIndex+1)%this._flowCount}});i.default=n,t.exports=i.default,cc._RF.pop()},{}],MessagePipeline:[function(e,t,i){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}cc._RF.push(t,"cf771H+nwxPKaA6R6epNabN","MessagePipeline"),Object.defineProperty(i,"__esModule",{value:!0});var c=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}(),a=function(e){function t(){return s(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,cc.EventTarget),c(t,[{key:"sendMessage",value:function(e,t){cc.log("dispatch system notification "+e),this.emit(e,t)}}]),t}();i.messagePipeline=new a;cc._RF.pop()},{}],Mochi:[function(e,t,i){"use strict";cc._RF.push(t,"c8b96VRd6FDm5LsyllTzY43","Mochi");var s=e("MessagePipeline");cc.Class({extends:cc.Component,properties:{nextLevel:10},onLoad:function(){this.currentSize=1,this.currentLevel=1,this.black=0,s.messagePipeline.on("onReset",this._onReset,this)},update:function(e){},_onReset:function(){this.currentSize=1,this.currentLevel=1,this.black=0;var e=this.scaling(),t=this.coloring();this.node.runAction(cc.spawn(e,t))},eat:function(e){if(this.currentSize+=e/100,this.currentSize>=this.nextLevel){this.currentSize=1,this.currentLevel+=1,this.black=Math.floor(this.black/2),s.messagePipeline.sendMessage("onBlacken",this.black);var t=this.scaling(),i=this.coloring();this.node.runAction(cc.spawn(t,i)),s.messagePipeline.sendMessage("onLevelUp",this.currentLevel),s.messagePipeline.sendMessage("SOUND_PLAY","levelup")}else{var n=cc.scaleTo(.1,this.currentSize);this.node.runAction(n)}s.messagePipeline.sendMessage("SOUND_PLAY","eat")},blacken:function(){if(this.black<100){this.black=Math.min(100,this.black+this.currentLevel),s.messagePipeline.sendMessage("onBlacken",this.black),this.black>=100&&s.messagePipeline.sendMessage("onGameOver",this.currentLevel);var e=this.coloring();this.node.runAction(e)}},scaling:function(){return cc.scaleTo(.1,this.currentSize)},coloring:function(){var e=2.25*this.black;return cc.tintTo(.1,255-e,255-e,255-e)}}),cc._RF.pop()},{MessagePipeline:"MessagePipeline"}],NewScript:[function(e,t,i){"use strict";cc._RF.push(t,"783ceRISx1KGYRFNs2bEI6S","NewScript"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){}}),cc._RF.pop()},{}],PhysicsEnabler:[function(e,t,i){"use strict";cc._RF.push(t,"0d7cb/KZYRMqLIrJQbkcpKx","PhysicsEnabler"),cc.Class({extends:cc.Component,properties:{enabledDebugDraw:!0,enabledDrawBoundingBox:!0},onLoad:function(){cc.director.getPhysicsManager().enabled=!0;var e=cc.director.getCollisionManager();e.enabled=this.enabled,e.enabledDebugDraw=this.enabledDebugDraw,e.enabledDrawBoundingBox=this.enabledDrawBoundingBox}}),cc._RF.pop()},{}],PieceDelete:[function(e,t,i){"use strict";cc._RF.push(t,"8b877KhiUBPfKwOyKK069Bg","PieceDelete"),cc.Class({extends:cc.Component,properties:{anim:cc.Animation,nodes:{default:[],type:[cc.Node]}},onLoad:function(){this.anim.on("finished",this._finished,this)},reuse:function(e){this.nodes.forEach(function(t){t.color=e.color}),this.node.rotation=360*Math.random(),this.anim.play()},unuse:function(){},_finished:function(){this._backToPool()},setPool:function(e){this._pool=e},_backToPool:function(){this._pool&&this._pool.put(this.node)}}),cc._RF.pop()},{}],PiecesDelete:[function(e,t,i){"use strict";cc._RF.push(t,"43ea9zCDXZIOpKUSStzIaF8","PiecesDelete"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){}}),cc._RF.pop()},{}],Pieces:[function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}cc._RF.push(t,"9c9ccDE1H9AWawcxciSryQo","Pieces"),Object.defineProperty(i,"__esModule",{value:!0});var n=s(e("../core/PrefabNodePool")),o=s(e("../core/GameFlow")),c=s(e("../player/Player")),a=s(e("../enemy/Enemy")),h=cc.Class({extends:cc.Component,properties:{piecePrefab:cc.Prefab,pieceDeletePrefab:cc.Prefab,pieceDeleteNode:cc.Node,xPiece:{default:7,range:[1,9,1]},yPiece:{default:7,range:[1,9,1]},colors:{default:[],type:cc.Color},pieceW:{visible:!1,get:function(){return this._pieceW}},pieceH:{visible:!1,get:function(){return this._pieceH}},deleteInterval:.5},statics:{instance:null},onLoad:function(){h.instance=this,this.piecePool=new n.default(this.piecePrefab,this.xPiece*this.yPiece,10,"Piece"),this.pieceDeletePool=new n.default(this.pieceDeletePrefab,20,10,"PieceDelete"),this._pieceW=this.node.width/this.xPiece,this._pieceH=this.node.height/this.yPiece,this._basePos=cc.p(-(this.xPiece-1)*this._pieceW/2,-(this.yPiece-1)*this._pieceH/2),this._colorCount=this.colors.length,this._spawnColorTable=[],this._createSpawnColorTable(),this._checkedList=[],this._deleteTimer=0,this._nextPieceYAdj=[],this._deletedIDList=[],this._deletingSpecialPieceIDList=[];for(var e=0;e<this.yPiece;e++)this._nextPieceYAdj.push(0);this._deletingSpecialPieceIDList=[],this._chain=0,this._pieces={},this._fieldInit()},_createSpawnColorTable:function(){for(var e=0;e<this._colorCount;e++){for(var t=[],i=0;i<this._colorCount;i++)e!==i&&t.push(i);this._spawnColorTable.push(t)}},_fieldInit:function(){for(var e=0;e<this.yPiece;e++)for(var t=0;t<this.xPiece;t++){var i=this._getType(t,e),s=this._spawn(t,e,i,!0);this._pieces[t+"-"+e]=s}},_getType:function(e,t){var i=-1,s=-1;e>=2&&this._pieces[e-1+"-"+t].colorType===this._pieces[e-2+"-"+t].colorType&&(i=this._pieces[e-1+"-"+t].colorType),t>=2&&this._pieces[e+"-"+(t-1)].colorType===this._pieces[e+"-"+(t-2)].colorType&&(s=this._pieces[e+"-"+(t-1)].colorType);for(var n=[],o=0;o<this._colorCount;o++)o!==i&&o!==s&&n.push(o);return n[Math.floor(Math.random()*n.length)]},_spawn:function(e,t,i,s){var n=this.piecePool.get({x:e,y:t,w:this._pieceW,h:this._pieceH,init:s,basePos:this._basePos,type:i,color:this.colors[i]});return n.parent=this.node,n.on("onFallEnd",this.fallEndCount,this),n.getComponent("Piece")},getTouchStartPiece:function(e){return this._pieces[e].node.opacity=127,this._pieces[e]},touchEndPiece:function(e){this._deleteCheckStart=!0,this._deleteTimer=this.deleteInterval,this._pieces[e].node.opacity=255},swap:function(e,t){var i=this._pieces[e],s=this._pieces[t];i.moveTo(t),s.moveTo(e),this._pieces[e]=s,this._pieces[t]=i,this.searchMatch()},searchMatch:function(){this._checkedList=[];for(var e=[],t="",i=-1,s=-1,n=[],o=0;o<this.yPiece;o++){s=-1,i=-1,n=[];for(var c=0;c<this.xPiece;c++){if(t=c+"-"+o,i=this._pieces[t].colorType,this._pieces[t].deleteMarkOff(),s!==i){if(n.length>=3){this._checkedList.push([n]),e=e.concat(n);for(var a=0;a<n.length;a++)this._pieces[n[a]].deleteMarkOn()}s=i,n=[]}if(n.push(t),c===this.xPiece-1&&n.length>=3){this._checkedList.push([n]),e=e.concat(n);for(var h=0;h<n.length;h++)this._pieces[n[h]].deleteMarkOn()}}}for(var r=0;r<this.xPiece;r++){s=-1,i=-1,n=[];for(var l=0;l<this.yPiece;l++){if(t=r+"-"+l,i=this._pieces[t].colorType,s!==i){if(n.length>=3){this._checkedList.push([n]),e=e.concat(n);for(var p=0;p<n.length;p++)this._pieces[n[p]].deleteMarkOn()}s=i,n=[]}if(n.push(t),l===this.yPiece-1&&n.length>=3){this._checkedList.push([n]),e=e.concat(n);for(var u=0;u<n.length;u++)this._pieces[n[u]].deleteMarkOn()}}}e.sort();for(var f=[],d=0;d<e.length;d++)if(d>0&&e[d-1]===e[d]){f=[];for(var _=0;_<this._checkedList.length;_++)for(var m=0;m<this._checkedList[_].length;m++)if(this._checkedList[_][m].indexOf(e[d])>=0){f=f.concat(this._checkedList[_]),this._checkedList.splice(_,1),_-=1;break}this._checkedList.push(f)}for(var y=0;y<this._checkedList.length;y++)for(var P=0;P<this._checkedList[y].length;P++);},_spawnPieceDelete:function(e,t,i){var s=this.pieceDeletePool.get({color:this.colors[i]});s.parent=this.node,s.position=cc.p(this._basePos.x+this._pieceW*e,this._basePos.y+this._pieceH*t)},update:function(e){if(o.default.instance.isDeleteTurn&&this._deleteCheckStart){if(this._deleteTimer+=e,this._deleteTimer<this.deleteInterval)return;if(this._deleteTimer=0,this._checkedList.length<=0)return void this.fall();for(var t=this._checkedList[0],i=[],s="",n=0,a=0;a<t.length;a++)n<t[a].length&&(n=t[a].length);var h=0;if(n>=5)h=4;else if(t.length>1)h=3;else if(4===n){var r=this.getXYfromID(t[0][0]),l=this.getXYfromID(t[0][1]);h=r[0]===l[0]?1:2}for(var p="",u=0,f=!1,d=0;d<t.length;d++){i=t[d];for(var _=0;_<i.length;_++)s=i[_],f=5===this._pieces[s].colorType,0!==d||0!==_||0===h?s!==p&&(0===this._pieces[s].pieceType?(this.deleteOnePiece(s),u+=1):this._deletingSpecialPieceIDList.push(s)):(this._pieces[s].changePieceType(h,4===h),p=s)}this._chain+=1,f?c.default.instance.recover(u,this._chain):c.default.instance.attackToEnemy(u,this._chain),this._checkedList.splice(0,1)}},fall:function(){if(this._deleteCheckStart=!1,0!==this._deletedIDList.length){this._deletedIDList.sort();var e={};this._fallCount=0;for(var t=0;t<this.xPiece;t++){for(var i=0,s=!1,n=[],o=0;o<this.yPiece;o++){var c=t+"-"+o,a=this._deletedIDList.indexOf(c);if(a>=0)this._deletedIDList.splice(a,1),n.push(c),s=!0;else{var h=t+"-"+i;if(e[h]=this._pieces[c],s){e[h].fall(h),this._fallCount+=1;var r=this._deletingSpecialPieceIDList.indexOf(c);r>=0&&(this._deletingSpecialPieceIDList[r]=h)}i+=1}}for(var l=0;l<n.length;l++){var p=t+"-"+(i+l);this._pieces[n[l]].setDeletedPosition(t,this.yPiece+l,this._basePos.y),e[p]=this._pieces[n[l]],e[p].fall(p),this._fallCount+=1}}this._pieces=e}else this.fallEnd(!1)},fallEndCount:function(){this._fallCount>0&&(this._fallCount-=1,this._fallCount<=0&&this.fallEnd(!0))},fallEnd:function(e){for(var t=this,i=0;i<this._nextPieceYAdj.length;i++)this._nextPieceYAdj[i]=0;this._deletingSpecialPieceIDList.length>0?(this._specialPieceDeleteStart=!0,setTimeout(function(){t.specialPieceEffect()},1e3*this.deleteInterval)):e?(this.searchMatch(),this._deleteTimer=this.deleteInterval,this._deleteCheckStart=!0):(a.default.instance.isDead&&a.default.instance.die(),o.default.instance.nextPhase(),this._chain=0)},specialPieceEffect:function(){this.nextSpecialPieces=[];for(var e=0;e<this._deletingSpecialPieceIDList.length;e++){var t=this._deletingSpecialPieceIDList[e],i=5===this._pieces[t].colorType,s=this.getXYfromID(t),n=0;if(1===this._pieces[t].pieceType)for(var o=0;o<this.xPiece;o++)this.deleteOnePieceBySpecialPiece(t,o,s[1]),n+=1;else if(2===this._pieces[t].pieceType)for(var a=0;a<this.yPiece;a++)this.deleteOnePieceBySpecialPiece(t,s[0],a),n+=1;else if(3===this._pieces[t].pieceType)for(var h=Math.max(0,s[0]-1),r=Math.min(this.xPiece-1,s[0]+1),l=Math.max(0,s[1]-1),p=Math.min(this.yPiece-1,s[1]+1),u=h;u<=r;u++)for(var f=l;f<=p;f++)this.deleteOnePieceBySpecialPiece(t,u,f),n+=1;else{if(4!==this._pieces[t].pieceType)continue;for(var d=this._pieces[t].colorType,_=0;_<this.xPiece;_++)for(var m=0;m<this.yPiece;m++)this._pieces[_+"-"+m].colorType===d&&(this.deleteOnePieceBySpecialPiece(t,_,m),n+=1)}this.deleteOnePiece(t),n+=1,this._chain+=1,i?c.default.instance.recover(n,this._chain):c.default.instance.attackToEnemy(n,this._chain)}this._deletingSpecialPieceIDList=this.nextSpecialPieces,this.fall()},deleteOnePieceBySpecialPiece:function(e,t,i){var s=t+"-"+i;e!==s&&(0===this._pieces[s].pieceType?this.deleteOnePiece(s):this.nextSpecialPieces.push(s))},deleteOnePiece:function(e){if(!(this._deletedIDList.indexOf(e)>=0)){this._deletedIDList.push(e);var t=this.getXYfromID(e);this._spawnPieceDelete(t[0],t[1],this._pieces[e].colorType);var i=Math.floor(Math.random()*this.colors.length);this._pieces[e].deleteUp(this._basePos.y,this.yPiece+this._nextPieceYAdj[t[0]],i,this.colors[i]),this._nextPieceYAdj[t[0]]+=1}},getXYfromID:function(e){var t=e.split("-");return t[0]=Number(t[0]),t[1]=Number(t[1]),t}});i.default=h,t.exports=i.default,cc._RF.pop()},{"../core/GameFlow":"GameFlow","../core/PrefabNodePool":"PrefabNodePool","../enemy/Enemy":"Enemy","../player/Player":"Player"}],Piece:[function(e,t,i){"use strict";cc._RF.push(t,"a8bfdKZBLNGR5oNYGMR/+ZR","Piece");cc.Class({extends:cc.Component,properties:{testLabel:cc.Label,id:{visible:!1,get:function(){return this._id},set:function(e){this._id=e}},colorType:{visible:!1,get:function(){return this._colorType}},pieceSprites:{default:[],type:[cc.SpriteFrame]},pieceType:{visible:!1,get:function(){return this._pieceType}},pieceSprite:cc.Sprite,deleteMark:cc.Node,anim:cc.Animation},onLoad:function(){},reuse:function(e){e.init&&(this.pieceSprite.node.width=e.w,this.pieceSprite.node.height=e.h),this._id=e.x+"-"+e.y,this.testLabel.string=this._id,this.node.x=e.basePos.x+e.w*e.x,this.node.y=e.basePos.y+e.h*e.y,this._colorType=e.type,this.pieceSprite.node.color=e.color,this._pieceType=0,this.pieceSprite.spriteFrame=this.pieceSprites[this._pieceType],this._moveCues=[]},unuse:function(){},deleteMarkOn:function(){this.deleteMark.active=!0},deleteMarkOff:function(){this.deleteMark.active=!1},moveTo:function(e,t){this._getMoveAction(e,t),this._id=e,this.testLabel.string=this._id},_getMoveAction:function(e,t){var i=this,s=this._id.split("-"),n=e.split("-"),o=new cc.p(Number(s[0]),Number(s[1])),c=new cc.p(Number(n[0]),Number(n[1]));c.subSelf(o);var a=.1;t&&(a=Math.abs(.1*c.y));var h=cc.moveBy(a,c.x*this.pieceSprite.node.width,c.y*this.pieceSprite.node.height);t&&(h=cc.sequence(h,cc.callFunc(function(){i.node.emit("onFallEnd")},this))),this.node.runAction(h)},deleteUp:function(e,t,i,s){this._colorType=i,this.pieceSprite.node.color=s,this.node.y=e+this.pieceSprite.node.height*t,0!==this._pieceType&&this.changePieceType(0,!1),this.deleteMarkOff()},setDeletedPosition:function(e,t,i){this._id=e+"-"+t,this.node.y=i+this.pieceSprite.node.height*t},fall:function(e){this.moveTo(e,!0)},changePieceType:function(e,t){this._pieceType=e,this.pieceSprite.spriteFrame=this.pieceSprites[this._pieceType],0!==this._pieceType&&this.anim.play("PieceSpecialAppear"),this.deleteMarkOff()},setPool:function(e){this._pool=e},_backToPool:function(){this._pool&&this._pool.put(this.node)}}),cc._RF.pop()},{}],Player:[function(e,t,i){"use strict";cc._RF.push(t,"fa5f0JOtd1LSo9QnvkrRNQM","Player"),Object.defineProperty(i,"__esModule",{value:!0});var s=function(e){return e&&e.__esModule?e:{default:e}}(e("../enemy/Enemy")),n={normal:0,attack:1,damage:2,win:3},o=cc.Class({extends:cc.Component,properties:{faceSprites:{default:[],type:[cc.SpriteFrame]},face:cc.Sprite,maxHp:1e3,attack:10,hpFill:cc.Sprite,hpLabel:cc.Label,faceAnim:cc.Animation,hpAnimLabel:cc.Label,hpAnim:cc.Animation},statics:{instance:null},onLoad:function(){o.instance=this,this.faceAnim.on("finished",this._animFinish,this),this.hpAnim.on("finished",this._animFinish,this),this._hp=this.maxHp,this._hpDisplay()},recover:function(e,t){this.face.spriteFrame=this.faceSprites[n.win];var i=1+.2*(t-1),s=Math.floor(this.attack*e*i);this._hp=Math.min(this.maxHp,this._hp+s),this._hpDisplay(),this.hpAnimLabel.string="+"+s,this.hpAnim.play("HpRecover")},attackToEnemy:function(e,t){this.face.spriteFrame=this.faceSprites[n.attack],this.faceAnim.play("PlayerAttackFace");var i=1+.2*(t-1),o=Math.floor(this.attack*e*i);s.default.instance.damage(o)},damage:function(e){this.face.spriteFrame=this.faceSprites[n.damage],this.faceAnim.play("PlayerDamageFace"),this._hp=Math.max(0,this._hp-e),this._hpDisplay(),this.hpAnimLabel.string="-"+e,this.hpAnim.play("HpDamage")},normalFace:function(){this.face.spriteFrame=this.faceSprites[n.normal]},win:function(){this.face.spriteFrame=this.faceSprites[n.win],this._hp=Math.min(this.maxHp,this._hp+this.maxHp/10),this._hpDisplay(),this.hpAnimLabel.string="+"+this.maxHp/10,this.hpAnim.play("HpRecover")},_animFinish:function(e){this.face.spriteFrame=this.faceSprites[n.normal]},_hpDisplay:function(){this.hpFill.fillRange=this._hp/this.maxHp,this.hpLabel.string="HP:"+this._hp+" / "+this.maxHp}});i.default=o,t.exports=i.default,cc._RF.pop()},{"../enemy/Enemy":"Enemy"}],PrefabNodePool:[function(e,t,i){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}cc._RF.push(t,"47ce8L0i5xPjpkhWhpT41Mv","PrefabNodePool"),Object.defineProperty(i,"__esModule",{value:!0});var c=function(){function e(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,i,s){return i&&e(t.prototype,i),s&&e(t,s),t}}(),a=function e(t,i,s){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,i);if(void 0===n){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,i,s)}if("value"in n)return n.value;var c=n.get;if(void 0!==c)return c.call(s)},h=function(e){function t(e,i,o,c){s(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,c));return a._handler=c,a._prefab=e,a._capacity=i,a._increase=o,a._peak=0,a._toBePutBackToPool=[],a}return o(t,cc.NodePool),c(t,[{key:"init",value:function(){for(var e=0;e<this._capacity;e++){var i=this._createNode();a(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,i)}}},{key:"_createNode",value:function(){var e=cc.instantiate(this._prefab);if(this._handler){var t=e.getComponent(this._handler);t&&t.setPool(this)}return e}},{key:"get",value:function(e){if(0===this.size()){for(var i=0;i<this._increase;i++){var s=this._createNode();a(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,s)}this._capacity+=this._increase}var n=a(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"get",this).call(this,e);return this._peak=Math.max(this.countInUse,this._peak),n}},{key:"put",value:function(e){a(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"put",this).call(this,e)}},{key:"update",value:function(){}},{key:"countInUse",get:function(){return this._capacity-this.size()}},{key:"countPeak",get:function(){return this._peak}}]),t}();i.default=h,t.exports=i.default,cc._RF.pop()},{}],SEPlay:[function(e,t,i){"use strict";cc._RF.push(t,"132b92D0ChFHpuNjkDle2qU","SEPlay"),Object.defineProperty(i,"__esModule",{value:!0});var s=cc.Class({extends:cc.Component,properties:{},statics:{instance:null},onLoad:function(){s.instance=this,this.audioSources=this.node.getComponents(cc.AudioSource),this.SElist={};for(var e=0;e<this.audioSources.length;e++){var t=this.audioSources[e].clip;this.SElist[t.substring(t.lastIndexOf("/")+1,t.lastIndexOf("."))]=this.audioSources[e]}},play:function(e){this.SElist[e].isPlaying,this.SElist[e].play()}});i.default=s,t.exports=i.default,cc._RF.pop()},{}],TouchInput:[function(e,t,i){"use strict";cc._RF.push(t,"ebbbaGZgelHMo+XOSruDJ7R","TouchInput"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this._registerEvent()},onDestroy:function(){this._unregisterEvent()},_registerEvent:function(){this.node.on(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.on(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)},_unregisterEvent:function(){this.node.off(cc.Node.EventType.TOUCH_START,this._onTouchBegan,this),this.node.off(cc.Node.EventType.TOUCH_END,this._onTouchEnded,this),this.node.off(cc.Node.EventType.TOUCH_CANCEL,this._onTouchCancel,this),this.node.off(cc.Node.EventType.TOUCH_MOVE,this._onTouchMove,this)},_onTouchBegan:function(e){e.getLocation()},_onTouchMove:function(e){e.getLocation()},_onTouchEnded:function(e){this._finishTouch(e)},_onTouchCancel:function(e){this._finishTouch(e)},_finishTouch:function(e){e.getLocation()}}),cc._RF.pop()},{}]},{},["NewScript","BGColorSpread","Mochi","BGMPlay","DisplayStats","GameFlow","MessagePipeline","PhysicsEnabler","PrefabNodePool","SEPlay","TouchInput","Enemy","EnemyDamage","Player","FieldTouch","Piece","PieceDelete","Pieces","PiecesDelete"]);