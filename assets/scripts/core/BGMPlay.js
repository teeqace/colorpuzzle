import {
  messagePipeline
} from 'MessagePipeline'

cc.Class({
  extends: cc.Component,

  properties: {
    BPM: 126,
    beat: 4,
    minBeat: 4
  },

  // use this for initialization
  onLoad: function () {
    this.tmpTimer = 0
    this.tmpTotalTimer = 0
    this.musicStartTime = 0.0

    this._audioScore = this.getComponent(cc.AudioSource)
    this.minBeatCount = 0
    this.nextMinBeatTime = 0
    this.minBeatTime = 60 / this.BPM / this.minBeat
    this.isOnMinBeat = false
    this.inOnBeat = false
    this.isOnBar = false
    messagePipeline.on('onReset', this.playBGM, this)
    messagePipeline.on('onGameOver', this.stopBGM, this)
  },

  playBGM() {
    if (this._audioScore) {
      this._audioScore.play()
      this.tmpTimer = 0
      this.tmpTotalTimer = 0
      this.minBeatCount = 0
      this.nextMinBeatTime = 0
      this.isOnMinBeat = false
      this.inOnBeat = false
      this.isOnBar = false
    }
  },
  
  stopBGM() {
    if (this._audioScore) {
      this._audioScore.stop()
    }
  },

  update(dt) {
    if (!this._audioScore || !this._audioScore.isPlaying) {
      return
    }
    let time = this._audioScore.getCurrentTime()
    this.tmpTotalTimer += dt
    if (this.tmpTotalTimer < this.musicStartTime) {
      return
    }
    this.tmpTimer += dt 
    if (time - this.tmpTotalTimer >= 0.05) {
      this.tmpTimer += 0.05
      this.tmpTotalTimer += 0.05
    } else if (time - this.tmpTotalTimer <= -0.05) {
      this.tmpTimer -= 0.05
      this.tmpTotalTimer -= 0.05
    }
    // if (time >= this.nextMinBeatTime && !this.isOnMinBeat) {
    if (this.minBeatCount === 0 || this.tmpTimer >= this.minBeatTime && !this.isOnMinBeat) {
      if (this.minBeatCount !== 0) {
        this.tmpTimer -= this.minBeatTime
      }
      this.isOnMinBeat = true
      if (this.minBeatCount % this.minBeat === 0) {
        this.inOnBeat = true
      // } else {
      //   this.inOnBeat = false
      }
      if (this.minBeatCount % (this.minBeat * this.beat)  === 0) {
        this.isOnBar = true
      // } else {
      //   this.isOnBar = false
      }
      this.minBeatCount += 1
      // this.nextMinBeatTime = this.minBeatTime * this.minBeatCount
    } else {
      this.isOnMinBeat = false
      this.inOnBeat = false
      this.isOnBar = false
    }
    if (this.isOnMinBeat) {
      messagePipeline.sendMessage('onMinBeat', this.minBeatCount)
    }
    if (this.inOnBeat) {
      messagePipeline.sendMessage('onBeat', this)
    }
    if (this.isOnBar) {
      messagePipeline.sendMessage('onBar', this)
    }
  }
})
