import GameFlow from '../core/GameFlow';
import Player from '../player/Player';
import PrefabNodePool from '../core/PrefabNodePool';

// export const messagePipeline = new MessagePipeline()
const PATH_JSON = 'json/enemy';
// const ENEMY_STATUS = [
//   {
//     spriteIndex: 0,
//     hp: 700,
//     attack: 200,
//     turn: 3
//   },
//   {
//     spriteIndex: 1,
//     hp: 1000,
//     attack: 160,
//     turn: 2
//   },
//   {
//     spriteIndex: 2,
//     hp: 1200,
//     attack: 500,
//     turn: 5
//   },
//   {
//     spriteIndex: 3,
//     hp: 1500,
//     attack: 400,
//     turn: 3
//   },
//   {
//     spriteIndex: 4,
//     hp: 2300,
//     attack: 800,
//     turn: 8
//   }
// ];
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
    attack: 100,
    hpFill: cc.Sprite,
    hpLabel: cc.Label,
    turnLabel: cc.Label,
    attackLabel: cc.Label,
    anim: cc.Animation,
    enemyDamagePrefab: cc.Prefab
  },
  
  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Enemy.instance = this;
    
    this.damagePool = new PrefabNodePool(this.enemyDamagePrefab, 3, 2, 'EnemyDamage');
    this.anim.on('finished', this._animFinish, this);
    this._enemyIndex = 0;

    
    this.loadEnemyJson()
    .then((data) => {
      this._enemyStatus = data;
      this._enemyReset();
    });

  },

  loadEnemyJson() {
    return new Promise((resolve, reject) => {
      cc.loader.loadRes(`${PATH_JSON}`, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  _enemyReset() {
    this._isOnAttack = false;
    this._isDead = false;

    let enemyStatus = this._enemyStatus[this._enemyIndex];
    this.enemySprite.spriteFrame = this.enemySprites[enemyStatus.spriteIndex];
    this.maxHp = enemyStatus.hp;
    this.attack = enemyStatus.attack;
    this.maxAttackTurn = enemyStatus.turn;

    this._attackTurn = this.maxAttackTurn;
    this.turnLabel.string = this._attackTurn;
    this.attackLabel.string = `ATK:${this.attack}`;

    this._hp = this.maxHp;
    this._hpDisplay();
    this.anim.play('EnemyAppear');
  },
  
  _hpDisplay() {
    this.hpFill.fillRange = this._hp / this.maxHp;
    this.hpLabel.string = `HP:${this._hp} / ${this.maxHp}`;
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
    
    let damageAnim = this.damagePool.get(damage);
    damageAnim.parent = this.node;
    this._hp = Math.max(0, this._hp - damage);
    this._hpDisplay();
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
      this._enemyIndex = (this._enemyIndex + 1) % this._enemyStatus.length;
      this._enemyReset();
      Player.instance.normalFace();
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