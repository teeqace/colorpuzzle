cc.Class({
  extends: cc.Component,

  properties: {
  },

  // use this for initialization
  onLoad() {
    this._registerEvent();
  },

  onDestroy() {
    this._unregisterEvent();
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

  _onTouchBegan(event) {
    let location = event.getLocation()
    // cc.log('_onTouchBegan')
    // cc.log(location)

  },

  _onTouchMove(event) {
    let location = event.getLocation()
    // cc.log(location)
  },

  _onTouchEnded(event) {
    this._finishTouch(event)
  },

  _onTouchCancel(event) {
    this._finishTouch(event)
  },

  _finishTouch(event) {
    let location = event.getLocation()
  },



})