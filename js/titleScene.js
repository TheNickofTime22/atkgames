class TitleScene extends Phaser.Scene {

    

    constructor() {
        super({ key: 'titleScene' });
    }

    preload() {
        this.load.image('background', '/resources/img/background.png');
    }

    create() {
        // let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'map')
        // let scaleX = this.cameras.main.width / image.width
        // let scaleY = this.cameras.main.height / image.height
        // let scale = Math.max(scaleX, scaleY)
        // image.setScale(scale).setScrollFactor(0)


        var bg = this.add.sprite(0, 0, 'background');
        bg.setOrigin(0, 0);
        bg.displayWidth = this.sys.canvas.width;
        bg.displayHeight = this.sys.canvas.height;
        this.scene.switch('gameScene');
        

        var text = this.add.text(0,0, 'Welocome to my game! this is the titlescreen');
        text.setInteractive({ useHandCursor: true });
        text.on('pointerdown', () => this.clickButton());
    }

    clickButton() {
        this.scene.switch('gameScene');
    }

}

export default TitleScene;