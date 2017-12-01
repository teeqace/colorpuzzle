const SWAP_TIME = 0.1;

cc.Class({
  extends: cc.Component,

  properties: {
    testLabel: cc.Label,
    id: {
      visible: false,
      get: function () {
        return this._id;
      },
      set: function (id) {
        this._id = id;
      }
    },
    colorType: {
      visible: false,
      get: function () {
        return this._colorType;
      }
    },
    pieceSprites: {
      default: [],
      type: [cc.SpriteFrame]
    },
    pieceType: {
      visible: false,
      get: function () {
        return this._pieceType;
      }
    },
    pieceSprite: cc.Sprite,
    deleteMark: cc.Node,
    anim: cc.Animation
  },

  // use this for initialization
  onLoad: function () {
  },

  reuse(data) {
    if (data.init) {
      this.pieceSprite.node.width = data.w;
      this.pieceSprite.node.height = data.h;
    }
    this._id = `${data.x}-${data.y}`;
    this.testLabel.string = this._id;
    this.node.x = data.basePos.x + data.w * data.x;
    this.node.y = data.basePos.y + data.h * data.y;
    this._colorType = data.type;
    this.pieceSprite.node.color = data.color;
    this._pieceType = 0;
    this.pieceSprite.spriteFrame = this.pieceSprites[this._pieceType];
    this._moveCues = [];
  },

  unuse() {
  },

  deleteMarkOn() {
    this.deleteMark.active = true;
  },

  deleteMarkOff() {
    this.deleteMark.active = false;
  },
  
  moveTo(id, isFall) {
    this._getMoveAction(id, isFall);

    this._id = id;
    this.testLabel.string = this._id;
  },
  
  _getMoveAction(id, isFall) {
    let fromXY = this._id.split('-');
    let toXY = id.split('-');
    let fromXYv = new cc.p(Number(fromXY[0]), Number(fromXY[1]));
    let toXYv = new cc.p(Number(toXY[0]), Number(toXY[1]));
    toXYv.subSelf(fromXYv);
    // cc.log(toXYv);

    let time = SWAP_TIME;
    if (isFall) {
      time = Math.abs(SWAP_TIME * toXYv.y);
    }
    let action = cc.moveBy(time, toXYv.x * this.pieceSprite.node.width, toXYv.y * this.pieceSprite.node.height);
    if (isFall) {
      action = cc.sequence(action, cc.callFunc(() => {
        this.node.emit('onFallEnd');
      }, this));
    }
    this.node.runAction(action);
  },

  deleteUp(baseY, y, type, color) {
    this._colorType = type;
    this.pieceSprite.node.color = color;
    this.node.y = baseY + this.pieceSprite.node.height * y;
    if (this._pieceType !== 0) {
      this.changePieceType(0, false);
    }
    this.deleteMarkOff();
  },

  setDeletedPosition(x, y, baseY) {
    this._id = `${x}-${y}`;
    this.node.y = baseY + this.pieceSprite.node.height * y;
  },

  fall(id) {
    this.moveTo(id, true);
  },

  changePieceType(type, isColorBomb) {
    this._pieceType = type;
    this.pieceSprite.spriteFrame = this.pieceSprites[this._pieceType];
    if (this._pieceType !== 0) {
      this.anim.play('PieceSpecialAppear');
    }
    this.deleteMarkOff();
    // if (isColorBomb) {
    //   this.pieceSprite.node.color = cc.hexToColor('#FFFFFF');
    // }
  },

  // update(dt) {
  // },

  setPool(pool) {
    this._pool = pool;
  },

  _backToPool(){
    if (this._pool) {
      this._pool.put(this.node);
    }
  }
});
