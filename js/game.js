import GameScene from "./gameScene.js";
import TitleScene from "./titleScene.js";
import GameoverScene from "./gameoverScene.js";

//import * as Phaser from "./phaser.js";

// const GameSceneImport = require('./gameScene.js');

// import * as Phaser from '../phaser.min';

// Our game scenes
var gameScene = new GameScene();
var titleScene = new TitleScene();
var gameoverScene = new GameoverScene();

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
game.scene.add("gameover", gameoverScene);


// Start the title scene
game.scene.start('titleScene');

