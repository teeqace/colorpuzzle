const FLOW = [
  'touch',
  'delete',
  // 'enemy'
];

const GameFlow = cc.Class({
  extends: cc.Component,

  properties: {
    phase: {
      visible: false,
      get: function () {
        return this._phase;
      }
    },
    isTouchTurn: {
      get: function () {
        return this._flowIndex === this._flowTOUCH;
      }
    },
    isDeleteTurn: {
      get: function () {
        return this._flowIndex === this._flowDELETE;
      }
    }
  },

  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    GameFlow.instance = this;

    this._flowIndex = 0;
    this._flowCount = FLOW.length;
    this._flowTOUCH = FLOW.indexOf('touch');
    this._flowDELETE = FLOW.indexOf('delete');
    this._flowENEMY = FLOW.indexOf('enemy');
  },

  nextPhase() {
    this._flowIndex = (this._flowIndex + 1) % this._flowCount;
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default GameFlow;