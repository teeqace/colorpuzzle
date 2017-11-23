import PrefabNodePool from '../core/PrefabNodePool';
import GameFlow from '../core/GameFlow';

const DELETE_COUNT = 3;

const Pieces = cc.Class({
  extends: cc.Component,

  properties: {
    piecePrefab: cc.Prefab,
    pieceDeletePrefab: cc.Prefab,
    pieceDeleteNode: cc.Node,
    xPiece: {
      default: 7,
      range: [1, 9, 1]
    },
    yPiece: {
      default: 7,
      range: [1, 9, 1]
    },
    colors: {
      default: [],
      type: cc.Color
    },
    pieceW: {
      visible: false,
      get: function () {
        return this._pieceW;
      }
    },
    pieceH: {
      visible: false,
      get: function () {
        return this._pieceH;
      }
    },
    deleteInterval: 0.5
  },

  statics: {
    instance: null,
  },

  // use this for initialization
  onLoad: function () {
    Pieces.instance = this;
    this.piecePool = new PrefabNodePool(this.piecePrefab, this.xPiece * this.yPiece, 10, 'Piece');
    this.pieceDeletePool = new PrefabNodePool(this.pieceDeletePrefab, 20, 10, 'PieceDelete');
    this._pieceW = this.node.width / this.xPiece;
    this._pieceH = this.node.height / this.yPiece;
    this._basePos = cc.p(-(this.xPiece - 1) * this._pieceW / 2, -(this.yPiece - 1) * this._pieceH / 2);
    this._colorCount = this.colors.length;
    this._spawnColorTable = [];
    this._createSpawnColorTable();

    this._checkedList = [];
    this._deleteTimer = 0;
    this._nextPieceYAdj = [];
    this._deletedIDList = [];
    for (let y = 0; y < this.yPiece; y++) {
      this._nextPieceYAdj.push(0);
    }
    this._specialPieceCheckList = [];

    this._pieces = {};
    this._fieldInit();
  },

  _createSpawnColorTable() {
    for (let i = 0; i < this._colorCount; i++) {
      let table = [];
      for (let j = 0; j < this._colorCount; j++) {
        if (i === j) {
          continue;
        }
        table.push(j);
      }
      this._spawnColorTable.push(table);
    }
  },

  _fieldInit() {
    for (let y = 0; y < this.yPiece; y++) {
      for (let x = 0; x < this.xPiece; x++) {
        if (x < DELETE_COUNT - 1 || y < DELETE_COUNT - 1) {

        }
        let type = this._getType(x, y);
        let piece = this._spawn(x, y, type, true);
        this._pieces[`${x}-${y}`] = piece;
      }
    }
  },

  _getType(x, y) {
    let ngTypeX = -1;
    let ngTypeY = -1;
    if (x >= DELETE_COUNT - 1) {
      if (this._pieces[`${x-1}-${y}`].colorType === this._pieces[`${x-2}-${y}`].colorType) {
        ngTypeX = this._pieces[`${x-1}-${y}`].colorType;
      }
    }
    if (y >= DELETE_COUNT - 1) {
      if (this._pieces[`${x}-${y-1}`].colorType === this._pieces[`${x}-${y-2}`].colorType) {
        ngTypeY = this._pieces[`${x}-${y-1}`].colorType;
      }
    }
    let colorTable = [];
    for (let i = 0; i < this._colorCount; i++) {
      if (i === ngTypeX || i === ngTypeY) {
        continue;
      }
      colorTable.push(i);
    }
    return colorTable[Math.floor(Math.random() * colorTable.length)];
  },

  _spawn(x, y, type, init) {
    let piece = this.piecePool.get({
      x: x,
      y: y,
      w: this._pieceW,
      h: this._pieceH,
      init: init,
      basePos: this._basePos,
      type: type,
      color: this.colors[type]
    });
    piece.parent = this.node;
    piece.on('onFallEnd', this.fallEndCount, this);
    return piece.getComponent('Piece');
  },

  getTouchStartPiece(id) {
    this._pieces[id].node.opacity = 127;
    return this._pieces[id];
  },

  touchEndPiece(id) {
    this._deleteCheckStart = true;
    this._deleteTimer = this.deleteInterval;
    this._pieces[id].node.opacity = 255;
  },

  swap(id1, id2) {
    // cc.log(`swap:${id1}---${id2}`);
    let piece1 = this._pieces[id1];
    let piece2 = this._pieces[id2];
    piece1.moveTo(id2);
    piece2.moveTo(id1);

    this._pieces[id1] = piece2;
    this._pieces[id2] = piece1;

    this.searchMatch();
    // this._checkForSpecialPiece(id1, id2);
  },

  searchMatch() {
    this._checkedList = [];
    let deleteIDList = [];
    let id = '';
    let currentType = -1;
    let checkType = -1;
    let checkList = [];
    // check in horizontal
    for (let y = 0; y < this.yPiece; y++) {
      checkType = -1;
      currentType = -1;
      checkList = [];
      for (let x = 0; x < this.xPiece; x++) {
        id = `${x}-${y}`;
        currentType = this._pieces[id].colorType;
        this._pieces[id].deleteMarkOff();
        if (checkType !== currentType) {
          if (checkList.length >= 3) {
            this._checkedList.push([checkList]);
            deleteIDList = deleteIDList.concat(checkList);
            for (let z = 0; z < checkList.length; z++) {
              this._pieces[checkList[z]].deleteMarkOn();
            }
          }
          checkType = currentType;
          checkList = [];
        }
        checkList.push(id);
        if (x === this.xPiece - 1 && checkList.length >= 3) {
          this._checkedList.push([checkList]);
          deleteIDList = deleteIDList.concat(checkList);
          for (let z = 0; z < checkList.length; z++) {
            this._pieces[checkList[z]].deleteMarkOn();
          }
        }
      }
    }
    // check in vertical
    for (let x = 0; x < this.xPiece; x++) {
      checkType = -1;
      currentType = -1;
      checkList = [];
      for (let y = 0; y < this.yPiece; y++) {
        id = `${x}-${y}`;
        currentType = this._pieces[id].colorType;
        if (checkType !== currentType) {
          if (checkList.length >= 3) {
            this._checkedList.push([checkList]);
            deleteIDList = deleteIDList.concat(checkList);
            for (let z = 0; z < checkList.length; z++) {
              this._pieces[checkList[z]].deleteMarkOn();
            }
          }
          checkType = currentType;
          checkList = [];
        }
        checkList.push(id);
        if (y === this.yPiece - 1 && checkList.length >= 3) {
          this._checkedList.push([checkList]);
          deleteIDList = deleteIDList.concat(checkList);
          for (let z = 0; z < checkList.length; z++) {
            this._pieces[checkList[z]].deleteMarkOn();
          }
        }
      }
    }

    // merge xList, yList
    deleteIDList.sort();
    let tmpList = [];
    for (let i = 0; i < deleteIDList.length; i++) {
      if (i > 0 && deleteIDList[i-1] === deleteIDList[i]) {
        tmpList = [];
        for (let j = 0; j < this._checkedList.length; j++) {
          
          for (let k = 0; k < this._checkedList[j].length; k++) {
            if (this._checkedList[j][k].indexOf(deleteIDList[i]) >= 0) {
              tmpList = tmpList.concat(this._checkedList[j]);
              this._checkedList.splice(j, 1);
              j -= 1;
              break;
            }
          }
        }
        this._checkedList.push(tmpList);
      }
    }

    for (let ii = 0; ii < this._checkedList.length; ii++) {
      for (let jj = 0; jj < this._checkedList[ii].length; jj++) {

      }
    }
    // cc.log(this._checkedList);
  },

  _spawnPieceDelete(x, y, type) {
    let pieceDelete = this.pieceDeletePool.get({
      color: this.colors[type]
    });
    pieceDelete.parent = this.node;
    pieceDelete.position = cc.p(this._basePos.x + this._pieceW * x, this._basePos.y + this._pieceH * y);
  },

  update(dt) {
    if (!GameFlow.instance.isDeleteTurn) {
      return;
    }
    if (this._deleteCheckStart) {
      this._deleteTimer += dt;
      if (this._deleteTimer < this.deleteInterval) {
        return;
      }
      this._deleteTimer = 0;
      if (this._checkedList.length <= 0) {
        this.fall();
        return;
      }
      let deleteList = this._checkedList[0];
      let deleteIDList = [];
      let id = '';
      for (let i = 0; i < deleteList.length; i++) {
        deleteIDList = deleteList[i];
        for (let j = 0; j < deleteIDList.length; j++) {
          id = deleteIDList[j];
          if (this._deletedIDList.indexOf(id) >= 0) {
            continue;
          }
          this._deletedIDList.push(id);
          let xy = this.getXYfromID(id);
          this._spawnPieceDelete(xy[0], xy[1], this._pieces[id].colorType);
          
          let newType = Math.floor(Math.random() * this.colors.length);
          this._pieces[id].deleteUp(this._basePos.y, this.yPiece + this._nextPieceYAdj[xy[0]], newType, this.colors[newType]);
          this._nextPieceYAdj[xy[0]] += 1;
        }
      }
      this._checkedList.splice(0, 1);
    }
  },

  fall() {
    this._deleteCheckStart = false;
    if (this._deletedIDList.length === 0) {
      this.fallEnd(false);
      return;
    }
    this._deletedIDList.sort();
    let newPieces = {};
    this._fallCount = 0;
    for (let x = 0; x < this.xPiece; x++) {
      let newY = 0;
      let fallStart = false;
      let deleteYList = [];
      for (let y = 0; y < this.yPiece; y++) {
        let id = `${x}-${y}`;
        let deleteIndex = this._deletedIDList.indexOf(id);
        if (deleteIndex >= 0) {
          this._deletedIDList.splice(deleteIndex, 1);
          deleteYList.push(id);
          fallStart = true;
        } else {
          let newId = `${x}-${newY}`;
          newPieces[newId] = this._pieces[id];
          if (fallStart) {
            newPieces[newId].fall(newId);
            this._fallCount += 1;
          }
          newY += 1;
        }
      }

      for (let yy = 0; yy < deleteYList.length; yy++) {
        let newId2 = `${x}-${newY + yy}`;
        this._pieces[deleteYList[yy]].setDeletedPosition(x, this.yPiece + yy, this._basePos.y);
        newPieces[newId2] = this._pieces[deleteYList[yy]];
        newPieces[newId2].fall(newId2);
        this._fallCount += 1;
      }
    }
    this._pieces = newPieces;
  },

  fallEndCount() {
    if (this._fallCount > 0) {
      this._fallCount -= 1;
      if (this._fallCount <= 0) {
        this.fallEnd(true);
      }
    }
  },

  fallEnd(research) {
    for (let x = 0; x < this._nextPieceYAdj.length; x++) {
      this._nextPieceYAdj[x] = 0;
    }
    if (research) {
      this.searchMatch();
      this._deleteTimer = this.deleteInterval;
      this._deleteCheckStart = true;
    } else {
      GameFlow.instance.nextPhase();
    }
    this._specialPieceCheckList = [];
  },

  getXYfromID(id) {
    let xy = id.split('-');
    xy[0] = Number(xy[0]);
    xy[1] = Number(xy[1]);
    return xy;
  }
});

export default Pieces;