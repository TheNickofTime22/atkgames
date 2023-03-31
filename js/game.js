import GameScene from "./gameScene.js";
import DuoGameScene from "./duoGameScene.js";
import TitleScene from "./titleScene.js";
import GameoverScene from "./gameoverScene.js";
import GuestTitleScene from "./guestTitleScene.js";


//import * as Phaser from "./phaser.js";

// const GameSceneImport = require('./gameScene.js');

// import * as Phaser from '../phaser.min';

// Our game scenes
var gameScene = new GameScene();
var titleScene = new TitleScene();
var gameoverScene = new GameoverScene();
var guestTitleScene = new GuestTitleScene();
var duoGameScene = new DuoGameScene();

// * Game Scene * //
var config = {
    type: Phaser.AUTO,
    width: ((screen.width)),
    height: ((screen.height)),

    scale: {
        parent: 'gameDiv',
        mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH,

    },

};

// Our game Object
var game = new Phaser.Game(config);

// Add both scenes (it does not start them)
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);
game.scene.add("gameover", gameoverScene);
game.scene.add("guestTitleScene", guestTitleScene);
game.scene.add("duoGameScene", duoGameScene);


// Start the title scene
game.scene.start('titleScene');

