import GameScene from "./gameScene";
import TitleScene from "./titleScene";

// Our game scenes
var gameScene = new GameScene();
var titleScene = new TitleScene();

// * Game Scene * // 
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

};

// Our game Object
var game = new Phaser.Game(config);

// Add both scenes (it does not start them)
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// Start the title scene
game.scene.start('titleScene');