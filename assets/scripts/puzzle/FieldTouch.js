import Pieces from './Pieces';
import SEPlay from '../core/SEPlay';
import GameFlow from '../core/GameFlow';

cc.Class({
  extends: cc.Component,

  properties: {
    pieces: Pieces,
    marker: cc.Node,
    moveTime: 6,
    timerSprite: cc.Sprite
  },

  // use this for initialization
  onLoad: function () {
    this._registerEvent();
    this._leftBottomPos = cc.p(-this.node.width / 2, -this.node.height / 2);
    this._rightTopPos = cc.p(this.node.width / 2, this.node.height / 2);
    this._touchId = '';
    this._timer = this.moveTime;
    this._isTouch = false;
  },

  onDestroy() {
    this._unregisterEvent();
  },

  _onTouchBegan(event) {
    if (!GameFlow.instance.isTouchTurn) {
      return;
    }
    let location = event.getLocation();
    location = this.node.convertToNodeSpaceAR(location);

    this._touchId = this._getTouchId(location);
    // cc.log(`touch:${this._touchId}`);
    let touchPiece = this.pieces.getTouchStartPiece(this._touchId);

    this.marker.width = this.pieces.pieceW;
    this.marker.height = this.pieces.pieceH;
    this.marker.position = location;
    this.marker.getComponent(cc.Sprite).spriteFrame = touchPiece.pieceSprite.spriteFrame;
    this.marker.color = touchPiece.pieceSprite.node.color;

    this._isTouch = true;
    this._timer = this.moveTime;
  },

  _onTouchMove(event) {
    if (!GameFlow.instance.isTouchTurn) {
      return;
    }
    if (!this._isTouch) {
      return;
    }
    let location = event.getLocation();
    location = this.node.convertToNodeSpaceAR(location);
    location.x = Math.max(this._leftBottomPos.x, Math.min(this._rightTopPos.x, location.x));
    location.y = Math.max(this._leftBottomPos.y, Math.min(this._rightTopPos.y, location.y));
    this.marker.position = location;

    let touchId = this._getTouchId(location);
    if (this._touchId === touchId) {
      return;
    }
    this.pieces.swap(this._touchId, touchId);
    // SEPlay.instance.play('swap');
    this._touchId = touchId;
    // cc.log(location)
  },

  _getTouchId(location) {
    let touchPieceLocation = location.sub(this._leftBottomPos);
    let x = Math.min(this.pieces.xPiece - 1, Math.floor(touchPieceLocation.x / this.pieces.pieceW));
    let y = Math.min(this.pieces.yPiece - 1, Math.floor(touchPieceLocation.y / this.pieces.pieceH));
    return `${x}-${y}`;
  },

  _finishTouch(event) {
    if (!GameFlow.instance.isTouchTurn) {
      return;
    }
    // let location = event.getLocation();
    this.pieces.touchEndPiece(this._touchId);
    this.marker.x = -1000;
    this._isTouch = false;

    // this.pieces.searchMatch();
    GameFlow.instance.nextPhase();
  },
  
  update(dt) {
    if (this._isTouch) {
      this._timer -= dt;
      this.timerSprite.fillRange = this._timer / this.moveTime;
      if (this._timer <= 0) {
        this._finishTouch({});
      }
    }
  },

  _onTouchEnded(event) {
    this._finishTouch(event);
  },

  _onTouchCancel(event) {
    this._finishTouch(event);
  },

  _registerEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
  },

  _unregisterEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
  },
  
});
