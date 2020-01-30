const config = {
  type: Phaser.WEBGL,
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

function preload() { 
  this.load.image('background', 'assets/images/background.png');
  this.load.image('tiles', 'assets/tilesets/newtileset.png');
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/testfinal.json'); }

function create() { 
  const backgroundImage = this.add.image(0, 0,'background').setOrigin(0.5, 0);
  backgroundImage.setScale(2, 0.8);
 
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('newtileset', 'tiles');
  const platforms = map.createStaticLayer('Calque 1', tileset, 0, 200);

  
  this.cameras.main.centerOn(0,config.height/2)

  
}

function update() { }