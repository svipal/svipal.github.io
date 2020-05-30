const config = {
  type: Phaser.CANVAS,
  parent: 'game',
  width: 800,
  height: 640,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: true,
    },
  }
};

const game = new Phaser.Game(config);

var map;  
var tileset;
var layer;
var controls;
var selectedTile;

function preload() { 
  this.load.image('background', 'assets/images/background.png');
  this.load.image('tiles', 'assets/tilesets/newtileset.png');
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/testfinal.json'); }


function create() { 
  const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
  backgroundImage.setScale(2, 0.8);
 
  map = this.make.tilemap({ key: 'map' });
  tileset = map.addTilesetImage('newtileset', 'tiles');
  const layer = map.createStaticLayer('Calque 1', tileset, 0, 200);
  layer.skipCull = true
  console.log("lel",layer)
  
  marker = this.add.graphics();
  marker.lineStyle(2, 0x000000, 1);
  marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

  
  this.cameras.main.centerOn(0,config.height/2)

  var cursors = this.input.keyboard.createCursorKeys();
  var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5
  };
  controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

  shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)

  ctrlKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL)

  altKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT)
}

function update(time,delta) {
  controls.update(delta);

  var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

  // Rounds down to neare st tile
  var pointerTile = map.worldToTileXY(worldPoint.x,worldPoint.y,true);
 
  // Snap to tile coordinates, but in world space
  markerP = map.tileToWorldXY(pointerTile.x,pointerTile.y);
 
  if (shiftKey.isDown) {
    console.log(pointerTile)
    console.log(" tw", markerP)
  }
  marker.x = markerP.x
  marker.y = markerP.y
  if (this.input.manager.activePointer.isDown) {
    if (shiftKey.isDown) {
      selectedTile = map.getTileAt(pointerTile.x, pointerTile.y)
      // console.log("tile position : ",pointerTile.x, pointerTile.y)
      // console.log(selectedTile)
    } else if (ctrlKey.isDown) {
      var dtile = map.removeTileAt(pointerTile.x, pointerTile.y)
      // console.log("deleted tile", dtile)
    } else if (altKey.isDown) {
      console.log(map.getTileAt(pointerTile.x, pointerTile.y))
    } else if (selectedTile) {
      // console.log("trying to put at ", pointerTile.x, pointerTile.y)
      map.putTileAt(selectedTile, pointerTile.x, pointerTile.y)
    }
  }

 }

