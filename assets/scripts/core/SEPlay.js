const SEPlay = cc.Class({
  extends: cc.Component,

  properties: {},

  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    SEPlay.instance = this;
    this.audioSources = this.node.getComponents(cc.AudioSource);
    this.SElist = {};
    for (let i = 0; i < this.audioSources.length; i++) {
      let clipName = this.audioSources[i].clip
      this.SElist[clipName.substring(clipName.lastIndexOf('/') + 1, clipName.lastIndexOf('.'))] = this.audioSources[i];
    }
  },

  play(soundName) {
    if (this.SElist[soundName].isPlaying) {
      // this.SElist[soundName].stop();
    }
    this.SElist[soundName].play();
  }
})

export default SEPlay;