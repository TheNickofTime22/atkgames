import SingleplayerGameScene from "../games/singleplayerGameScene.js";
import GuestTitleScene from "../title/guestTitleScene.js";
import GameoverScene from "../transitionScenes/gameoverScene.js";

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height,
    scale: {
        parent: "gameDiv",
        mode: Phaser.Scale.FIT,
    },
};

// Initialize the game object
const game = new Phaser.Game(config);

// Add all the scenes to the game (without starting them)
game.scene.add("guestTitleScene", new GuestTitleScene());
game.scene.add("singleplayerGameScene", new SingleplayerGameScene());
game.scene.add("gameoverScene", new GameoverScene());

// Start the title scene
game.scene.start("guestTitleScene");
