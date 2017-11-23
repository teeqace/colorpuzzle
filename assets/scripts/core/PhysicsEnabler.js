cc.Class({
  extends: cc.Component,

  properties: {
    enabledDebugDraw: true,
    enabledDrawBoundingBox: true
  },

  // use this for initialization
  onLoad: function () {
    cc.director.getPhysicsManager().enabled = true
    let collisionManager = cc.director.getCollisionManager()
    collisionManager.enabled = this.enabled
    collisionManager.enabledDebugDraw = this.enabledDebugDraw
    collisionManager.enabledDrawBoundingBox = this.enabledDrawBoundingBox
  }

  // called every frame, uncomment this function to activate update callback
  // update: function (dt) {

  // },
})
