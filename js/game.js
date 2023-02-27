import GameScene from "./gameScene.js";
import TitleScene from "./titleScene.js";
//import * as Phaser from "./phaser.js";

// const GameSceneImport = require('./gameScene.js');

// import * as Phaser from '../phaser.min';

// Our game scenes
var gameScene = new GameScene();
var titleScene = new TitleScene();

// * Game Scene * // 
var config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },

};

// Our game Object
var game = new Phaser.Game(config);

// Add both scenes (it does not start them)
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);


// Start the title scene
game.scene.start('titleScene');




// var config = {
//     type: Phaser.AUTO, 
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 200 }
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create
//     }
// };

// var game = new Phaser.Game(config);

// function preload() {
//     this.load.setBaseURL('http://labs.phaser.io');

//     this.load.image('sky', 'assets/skies/space3.png');
//     this.load.image('logo', 'assets/sprites/phaser3-logo.png');
//     this.load.image('red', 'assets/particles/red.png');
// }

// function create() {
//     this.add.image(400, 300, 'sky');

//     var particles = this.add.particles('red');

//     var emitter = particles.createEmitter({
//         speed: 100,
//         scale: { start: 1, end: 0 },
//         blendMode: 'ADD'
//     });

//     var logo = this.physics.add.image(400, 100, 'logo');

//     logo.setVelocity(100, 200);
//     logo.setBounce(1, 1);
//     logo.setCollideWorldBounds(true);

//     emitter.startFollow(logo);
// }
