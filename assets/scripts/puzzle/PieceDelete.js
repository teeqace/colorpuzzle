cc.Class({
  extends: cc.Component,

  properties: {
    anim: cc.Animation,
    nodes: {
      default: [],
      type: [cc.Node]
    }
  },

  // use this for initialization
  onLoad: function () {
    this.anim.on('finished', this._finished, this);
  },
  
  reuse(data) {
    this.nodes.forEach(element => {
      element.color = data.color;
    });
    this.node.rotation = Math.random() * 360;
    this.anim.play();
  },

  unuse() {
  },

  _finished() {
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
