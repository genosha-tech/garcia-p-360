// create sprites OFF
AFRAME.registerComponent('sprite-animation', {
  schema: {
    // ... Define schema to pass properties from DOM to this component
  },
 remove: function () {
    var self = this.el;
    disposeNode(self);
    var id = self.attributes.id.value;
    var l = document.querySelector('#'+id);
    if (l && l && l.parentNode) {
        l.parentNode.removeChild(l);

    }
  },
  init: function() {
    var self = this.el

    var teleTexture = new THREE.ImageUtils.loadTexture('images/tele.png')
    self.clock = new THREE.Clock()
    self.textureAnimator = new TextureAnimator(teleTexture, 28, 1, 28, 35) // texture, #horiz, #vert, #total, duration.

    var teleMaterial = new THREE.MeshBasicMaterial({
      map: teleTexture,
      side: THREE.DoubleSide,
      transparent: true
    })
    var teleGeometry = new THREE.PlaneGeometry(1, 1, 1, 1)

    var tele = self.getOrCreateObject3D('tele', THREE.Mesh)
    tele.geometry = teleGeometry
    tele.material = teleMaterial
    tele.position.set(1, 1, -10)
    tele.position.normalize()

    function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
      // note: texture passed by reference, will be updated by the update function.

      this.tilesHorizontal = tilesHoriz
      this.tilesVertical = tilesVert
        // how many images does this spritesheet contain?
        //  usually equals tilesHoriz * tilesVert, but not necessarily,
        //  if there at blank tiles at the bottom of the spritesheet.
        this.numberOfTiles = numTiles
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical)

      // how long should each image be displayed?
      this.tileDisplayDuration = tileDispDuration

      // how long has the current image been displayed?
      this.currentDisplayTime = 0

      // which image is currently being displayed?
      this.currentTile = 0

      this.update = function(milliSec) {
        this.currentDisplayTime += milliSec
        while (this.currentDisplayTime > this.tileDisplayDuration) {
          this.currentDisplayTime -= this.tileDisplayDuration
          this.currentTile++
          if (this.currentTile == this.numberOfTiles)
            this.currentTile = 0
          var currentColumn = this.currentTile % this.tilesHorizontal
          texture.offset.x = currentColumn / this.tilesHorizontal
          var currentRow = Math.floor(this.currentTile / this.tilesHorizontal)
          texture.offset.y = currentRow / this.tilesVertical
        }
      }
    }
  },
  tick: function() {
    var self = this.el
    var delta = self.clock.getDelta()

    self.textureAnimator.update(1000 * delta)
  }
})


// create sprites ON
AFRAME.registerComponent('sprite-animation-on', {
  schema: {
    // ... Define schema to pass properties from DOM to this component
  },
  remove: function () {
    var self = this.el;
    disposeNode(self);
    var id = self.attributes.id.value;
    var l = document.querySelector('#'+id);
    if (l && l && l.parentNode) {
        l.parentNode.removeChild(l);

    }
  },
  init: function() {
    var self = this.el

    var teleTexture = new THREE.ImageUtils.loadTexture('images/tele_locker.png')
    self.clock = new THREE.Clock()
    self.textureAnimator = new TextureAnimator(teleTexture, 50, 1, 50, 25) // texture, #horiz, #vert, #total, duration.

    var teleMaterial = new THREE.MeshBasicMaterial({
      map: teleTexture,
      side: THREE.DoubleSide,
      transparent: true
    })
    var teleGeometry = new THREE.PlaneGeometry(1, 1, 1, 1)

    var tele = self.getOrCreateObject3D('tele_on', THREE.Mesh)
    tele.geometry = teleGeometry
    tele.material = teleMaterial
    tele.position.set(1, 1, -10)
    tele.position.normalize()

    function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
      // note: texture passed by reference, will be updated by the update function.

      this.tilesHorizontal = tilesHoriz
      this.tilesVertical = tilesVert
        // how many images does this spritesheet contain?
        //  usually equals tilesHoriz * tilesVert, but not necessarily,
        //  if there at blank tiles at the bottom of the spritesheet.
        this.numberOfTiles = numTiles
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical)

      // how long should each image be displayed?
      this.tileDisplayDuration = tileDispDuration

      // how long has the current image been displayed?
      this.currentDisplayTime = 0

      // which image is currently being displayed?
      this.currentTile = 0

      this.update = function(milliSec) {
        this.currentDisplayTime += milliSec
        while (this.currentDisplayTime > this.tileDisplayDuration) {
          this.currentDisplayTime -= this.tileDisplayDuration
          this.currentTile++
          if (this.currentTile == this.numberOfTiles)
            this.currentTile = 0
          var currentColumn = this.currentTile % this.tilesHorizontal
          texture.offset.x = currentColumn / this.tilesHorizontal
          var currentRow = Math.floor(this.currentTile / this.tilesHorizontal)
          texture.offset.y = currentRow / this.tilesVertical
        }
      }
    }
  },
  tick: function() {
      var self = this.el
    var delta = self.clock.getDelta()

    if (!this.el.stop) {
      self.textureAnimator.update(1000 * delta);
    } else {

    }
  }
})





function disposeNode(node)
{
    node = node.object3D.children[0];
    if (node instanceof THREE.Mesh)
    {
        if (node.geometry)
        {
            node.geometry.dispose();
        }

        if (node.material)
        {
            if (node.material instanceof THREE.MeshFaceMaterial)
            {
                $.each (node.material.materials, function (idx, mtrl)
                {
                    if (mtrl.map)           mtrl.map.dispose();
                    if (mtrl.lightMap)      mtrl.lightMap.dispose();
                    if (mtrl.bumpMap)       mtrl.bumpMap.dispose();
                    if (mtrl.normalMap)     mtrl.normalMap.dispose();
                    if (mtrl.specularMap)   mtrl.specularMap.dispose();
                    if (mtrl.envMap)        mtrl.envMap.dispose();

                    mtrl.dispose();    // disposes any programs associated with the material
                });
            }
            else
            {
                if (node.material.map)          node.material.map.dispose();
                if (node.material.lightMap)     node.material.lightMap.dispose();
                if (node.material.bumpMap)      node.material.bumpMap.dispose();
                if (node.material.normalMap)    node.material.normalMap.dispose();
                if (node.material.specularMap)  node.material.specularMap.dispose();
                if (node.material.envMap)       node.material.envMap.dispose();

                node.material.dispose();   // disposes any programs associated with the material
            }
        }
    }
}   // disposeNode
