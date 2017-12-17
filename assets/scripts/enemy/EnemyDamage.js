cc.Class({
  extends: cc.Component,

  properties: {
    damageLabel: cc.Label,
    anim: cc.Animation
  },

  // use this for initialization
  onLoad: function () {
    this.anim.on('finished', this._animFinish, this);
  },

  reuse(damage) {
    this.damageLabel.string = damage;
    this.node.x = -75 + Math.random() * 150;
    this.node.y = -75 + Math.random() * 150;
    this.anim.play();
  },
  
  unuse() {
  },

  _animFinish() {
    this._backToPool();
  },
  
  setPool(pool) {
    this._pool = pool;
  },

  _backToPool(){
    if (this._pool) {
      this._pool.put(this.node);
    }
  }
});
