import {
  messagePipeline
} from 'MessagePipeline'

cc.Class({
  extends: cc.Component,

  properties: {
    nextLevel: 10
  },

  // use this for initialization
  onLoad: function () {
    this.currentSize = 1
    this.currentLevel = 1
    this.black = 0
    messagePipeline.on('onReset', this._onReset, this)
  },

  // called every frame, uncomment this function to activate update callback
  update: function (dt) {},

  _onReset() {
    this.currentSize = 1
    this.currentLevel = 1
    this.black = 0
    let anim1 = this.scaling()
    let anim2 = this.coloring()
    this.node.runAction(cc.spawn(anim1, anim2))
  },

  eat(size) {
    this.currentSize += size / 100
    if (this.currentSize >= this.nextLevel) {
      this.currentSize = 1
      this.currentLevel += 1
      this.black = Math.floor(this.black / 2)
      messagePipeline.sendMessage('onBlacken', this.black)
      let anim1 = this.scaling()
      let anim2 = this.coloring()
      this.node.runAction(cc.spawn(anim1, anim2))

      messagePipeline.sendMessage('onLevelUp', this.currentLevel)
      messagePipeline.sendMessage('SOUND_PLAY', 'levelup')
    } else {
      let anim = cc.scaleTo(0.1, this.currentSize)
      this.node.runAction(anim)
    }
    messagePipeline.sendMessage('SOUND_PLAY', 'eat')
  },

  blacken() {
    if (this.black < 100) {
      this.black = Math.min(100, this.black + this.currentLevel)
      messagePipeline.sendMessage('onBlacken', this.black)
      if (this.black >= 100) {
        messagePipeline.sendMessage('onGameOver', this.currentLevel)
      }
      let anim = this.coloring()
      this.node.runAction(anim)
    }
  },

  scaling() {
    let anim = cc.scaleTo(0.1, this.currentSize)
    return anim
  },

  coloring() {
    let color = 2.25 * this.black
    let anim = cc.tintTo(0.1, 255 - color, 255 - color, 255 - color)
    return anim
  }
});