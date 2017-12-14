import GameFlow from '../core/GameFlow';
import Player from '../player/Player';

const Enemy = cc.Class({
  extends: cc.Component,

  properties: {
    isDead: {
      visible: false,
      get: function () {
        return this._isDead;
      }
    },
    enemySprites: {
      default: [],
      type: [cc.SpriteFrame]
    },
    enemySprite: cc.Sprite,
    maxAttackTurn: 3,
    maxHp: 1000,
    attack: 50,
    hpFill: cc.Sprite,
    turnLabel: cc.Label,
    anim: cc.Animation
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Enemy.instance = this;
    this.anim.on('finished', this._animFinish, this);
    this._enemyIndex = 0;
    this._enemyReset();
  },

  _enemyReset() {
    this._isOnAttack = false;
    this._isDead = false;

    this.enemySprite.spriteFrame = this.enemySprites[this._enemyIndex];
    // this.enemySprite.node.setScale(1);
    // this.enemySprite.node.opacity = 255;

    this._attackTurn = this.maxAttackTurn;
    this.turnLabel.string = this._attackTurn;

    this._hp = this.maxHp;
    this.hpFill.fillRange = this._hp / this.maxHp;
  },

  turnElapse() {
    this._attackTurn -= 1;
    if (this._attackTurn <= 0 && !this._isDead) {
      this._isOnAttack = true;
      this.anim.play('EnemyAttack');
    } else {
      GameFlow.instance.nextPhase();
    }
    this.turnLabel.string = this._attackTurn;
  },

  damage(damage) {
    this.anim.play('EnemyDamage');
    this._hp = Math.max(0, this._hp - damage);
    this.hpFill.fillRange = this._hp / this.maxHp;
    if (this._hp <= 0) {
      this._isDead = true;
    }
  },

  die() {
    Player.instance.win();
    this.anim.play('EnemyDie');
  },

  _animFinish(event) {
    let animName = event.currentTarget.clip.name;
    if (animName === 'EnemyAttack') {
      this._attackTurn = this.maxAttackTurn;
      this.turnLabel.string = this._attackTurn;
      Player.instance.damage(this.attack);
      GameFlow.instance.nextPhase();
      this._isOnAttack = false;
    } else if (animName === 'EnemyDie') {
      this._enemyIndex = (this._enemyIndex + 1) % this.enemySprites.length;
      this._enemyReset();
      Player.instance.normalFace();
      this.anim.play('EnemyAppear');
    }
  },

  update(dt) {
    if (!GameFlow.instance.isEnemyTurn) {
      return;
    }
    if (this._isOnAttack) {
      return;
    }
    this.turnElapse();
  }
});

export default Enemy;