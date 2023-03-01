class GameoverScene extends Phaser.Scene {



    constructor() {
        super({ key: 'gameoverScene' });

    }

    preload() {
        this.load.image('background', '/resources/img/background.png');



    }

    create() {


        var bg = this.add.sprite(0, 0, 'background').setTint('3200000000');
        bg.setOrigin(0, 0);
        bg.displayWidth = this.sys.canvas.width;
        bg.displayHeight = this.sys.canvas.height;

        this.add.text(500, 200, 'Game Over', { font: '132px Bernard', fill: '#FFFFFF' })
        var play_again = this.add.text(510, 500, 'to play again\n  Click Here', { font: '100px Bernard', fill: '#FFFFFF' }).setInteractive();

        //endless_mode.on('pointerdown', () => this.clickButton());
        play_again.on('pointerdown', () => this.clickButton());
    }


    clickButton() {
        this.scene.start('gameScene');
    }

}

export default GameoverScene;