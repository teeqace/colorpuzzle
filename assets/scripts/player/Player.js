import Enemy from '../enemy/Enemy';

const FACE = {
  normal: 0,
  attack: 1,
  damage: 2,
  win: 3
};
const CHAIN_RATE = 0.2;

const Player = cc.Class({
  extends: cc.Component,

  properties: {
    faceSprites: {
      default: [],
      type: [cc.SpriteFrame]
    },
    face: cc.Sprite,
    maxHp: 1000,
    attack: 10,
    hpFill: cc.Sprite,
    hpLabel: cc.Label,
    faceAnim: cc.Animation,
    hpAnimLabel: cc.Label,
    hpAnim: cc.Animation
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Player.instance = this;
    this.faceAnim.on('finished', this._animFinish, this);
    this.hpAnim.on('finished', this._animFinish, this);

    this._hp = this.maxHp;
    this._hpDisplay();
  },

  recover(pieces, chain) {
    this.face.spriteFrame = this.faceSprites[FACE.win];
    let rate = 1.0 + CHAIN_RATE * (chain - 1);
    let health = Math.floor(this.attack * pieces * rate);
    this._hp = Math.min(this.maxHp, this._hp + health);
    this._hpDisplay();
    this.hpAnimLabel.string = `+${health}`;
    this.hpAnim.play('HpRecover');
  },

  attackToEnemy(pieces, chain) {
    this.face.spriteFrame = this.faceSprites[FACE.attack];
    this.faceAnim.play('PlayerAttackFace');
    let rate = 1.0 + CHAIN_RATE * (chain - 1);
    let damage = Math.floor(this.attack * pieces * rate);
    Enemy.instance.damage(damage);
  },

  damage(damage) {
    this.face.spriteFrame = this.faceSprites[FACE.damage];
    this.faceAnim.play('PlayerDamageFace');
    this._hp = Math.max(0, this._hp - damage);
    this._hpDisplay();
    this.hpAnimLabel.string = `-${damage}`;
    this.hpAnim.play('HpDamage');
  },

  normalFace() {
    this.face.spriteFrame = this.faceSprites[FACE.normal];
  },

  win() {
    this.face.spriteFrame = this.faceSprites[FACE.win];
    // this._hp = Math.min(this.maxHp, this._hp + this.maxHp / 10);
    // this._hpDisplay();
    // this.hpAnimLabel.string = `+${this.maxHp / 10}`;
    // this.hpAnim.play('HpRecover');
  },
  
  _animFinish(event) {
    // let animName = event.currentTarget.clip.name;
    // if (animName === 'EnemyAttack') {
    //   this._attackTurn = this.maxAttackTurn;
    //   this.turnLabel.string = this._attackTurn;
    //   Player.instance.damage(this.attack);
    //   GameFlow.instance.nextPhase();
    //   this._isOnAttack = false;
    // } else if (animName === 'EnemyDie') {
    //   this._enemyIndex = (this._enemyIndex + 1) % this.enemySprites.length;

    // }
    this.face.spriteFrame = this.faceSprites[FACE.normal];
  },

  _hpDisplay() {
    this.hpFill.fillRange = this._hp / this.maxHp;
    this.hpLabel.string = `HP:${this._hp} / ${this.maxHp}`;
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default Player;