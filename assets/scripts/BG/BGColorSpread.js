import {
  messagePipeline
} from 'MessagePipeline'

const BG_COLORS = [
  '#44BCFF',
  '#4462FF',
  '#8F44FF',
  '#E144FF',
  '#FF448F',
  '#FF4444',
  '#FF7144',
  '#FFAD44',
  '#FFE144',
  '#E9FF44',
  '#C3FF44',
  '#78FF44',
  '#44FF8F',
  '#44FFE9'
]
const BG_COLORS3 = [
  ['#4abdac', '#fc4a1a', '#f78733'],
  ['#ffce00', '#0375b4', '#007849'],
  ['#e37222', '#07889b', '#66b9bf'],
  ['#004445', '#2c7873', '#6fb98f'],
  ['#d7c3c7', '#76323f', '#c09f80'],
  ['#e24e42', '#e9b000', '#008f95'],
  ['#94618e', '#49274a', '#f4decb'],
  ['#4484ce', '#f9cf00', '#f19f4d'],
  ['#0b3c5d', '#328cc1', '#d9b310'],
  ['#286da8', '#cd5360', '#438496'],
  ['#ec576b', '#4ec5c1', '#e5e338'],
  ['#77c9d4', '#57bc90', '#015249'],
  ['#f7882f', '#f7c331', '#dcc7aa'],
  ['#6e3667', '#88d317', '#cf6766'],
  ['#fedc3d', '#01abaa', '#fea680'],
  ['#b56357', '#b4dbc0', '#a7b3a5'],
  ['#f81b84', '#f5ce28', '#43c0f6'],
  ['#4cdef5', '#a4d555', '#ff5992'],
  ['#841983', '#99d3df', '#88bbd6'],
  ['#fa7c92', '#6ec4db', '#fff7c0'],
  ['#6bbaa7', '#fba100', '#6c648b'],
  ['#66ab8c', '#b6a19e', '#a9b7c0'],
  ['#cccbc6', '#efd9c1', '#c7d8c6'],
  ['#945d60', '#626e60', '#af473c'],
  ['#67aeca', '#e52a6f', '#5f0f4e'],
  ['#4d6e9c', '#99ced4', '#eeb6b7'],
  ['#ccdfcb', '#ff6a5c', '#056571'],
  ['#eab126', '#f24c4e', '#1b7b34'],
  ['#155765', '#57652a', '#ab9353'],
  ['#d48cf8', '#0e8044', '#b5e582'],
]

cc.Class({
  extends: cc.Component,

  properties: {
    BGColor1: cc.Node,
    BGColor2: cc.Node,
    BGColor3: cc.Node,
    BGColorSpread1: cc.Node,
    BGColorSpread2: cc.Node,
    BGColorSpread3: cc.Node,
    anim: cc.Animation
  },

  // use this for initialization
  onLoad: function () {
    this.colorIndex = 0
    messagePipeline.on('onLevelUp', this._onLevelUp, this)
    messagePipeline.on('onGameOver', this._onGameOver, this)
    messagePipeline.on('onReset', this._onReset, this)

    messagePipeline.on('onBeat', this._onBeat, this)
    messagePipeline.on('onBar', this._onBar, this)
    this.onBeatAnim = cc.sequence(cc.scaleTo(0, 0.6), cc.scaleTo(1, 0.5))
    this.onBarAnim = cc.sequence(cc.scaleTo(0, 0.6), cc.scaleTo(4, 0.5))
  },

  _onReset() {
    // this.BGColorSpread.setScale(0)
    this.BGColor1.color = cc.hexToColor(BG_COLORS3[this.colorIndex][0])
    this.BGColor2.color = cc.hexToColor(BG_COLORS3[this.colorIndex][1])
    this.BGColor3.color = cc.hexToColor(BG_COLORS3[this.colorIndex][2])
    this.anim.play('BGColorGameStart')
  },

  _onLevelUp(event) {
    this.colorIndex = (this.colorIndex + 1) % BG_COLORS.length

    this.BGColorSpread1.color = cc.hexToColor(BG_COLORS3[this.colorIndex][0])
    this.BGColorSpread2.color = cc.hexToColor(BG_COLORS3[this.colorIndex][1])
    this.BGColorSpread3.color = cc.hexToColor(BG_COLORS3[this.colorIndex][2])

    this.anim.play('BGColorSpread')
    // this.enemySpawnInterval = Math.max(1 - 0.05 * (level - 1), 0.1)
    // this.enemySpeedBase = Math.min(200, this.enemySpeedBase + 5)
  },

  _onBGColorSpread() {
    this.BGColorSpread1.setScale(0)
    this.BGColor1.color = cc.hexToColor(BG_COLORS3[this.colorIndex][0])
    this.BGColor2.color = cc.hexToColor(BG_COLORS3[this.colorIndex][1])
    this.BGColor3.color = cc.hexToColor(BG_COLORS3[this.colorIndex][2])
  },
  _onGameOver(event) {
    this.anim.play('BGGameOver')
    // this.enemySpawnInterval = Math.max(1 - 0.05 * (level - 1), 0.1)
    // this.enemySpeedBase = Math.min(200, this.enemySpeedBase + 5)
  },
  
  _onBeat() {
    this.BGColor3.runAction(this.onBeatAnim)
  },

  _onBar() {
    this.BGColor2.runAction(this.onBarAnim)
  }
  
});