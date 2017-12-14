import Enemy from '../enemy/Enemy';

const FACE = {
  normal: 0,
  attack: 1,
  damage: 2,
  win: 3
};

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
    faceAnim: cc.Animation
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Player.instance = this;
    this.faceAnim.on('finished', this._animFinish, this);

    this._hp = this.maxHp;
    this.hpFill.fillRange = this._hp / this.maxHp;
  },

  attackToEnemy(pieces) {
    this.face.spriteFrame = this.faceSprites[FACE.attack];
    this.faceAnim.play('PlayerAttackFace');
    let damage = this.attack * pieces;
    Enemy.instance.damage(damage);
  },

  damage(damage) {
    this.face.spriteFrame = this.faceSprites[FACE.damage];
    this.faceAnim.play('PlayerDamageFace');
    this._hp = Math.max(0, this._hp - damage);
    this.hpFill.fillRange = this._hp / this.maxHp;
  },

  normalFace() {
    this.face.spriteFrame = this.faceSprites[FACE.normal];
  },

  win() {
    this.face.spriteFrame = this.faceSprites[FACE.win];
    this._hp = Math.min(this.maxHp, this._hp + this.maxHp / 10);
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

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
});

export default Player;