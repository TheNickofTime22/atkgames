export default class GameoverScene extends Phaser.Scene {
    constructor() {
            super({ key: 'lobbyScene' });
            this.user;
        }

        preload() {
            this.load.image('background', '/resources/img/lobbyBackground.png');
        }

        init(data) {


        }

        create(){
            var bg = this.add.sprite(0, 0, 'background');
            bg.setOrigin(0, 0);
            bg.displayWidth = this.sys.canvas.width;
            bg.displayHeight = this.sys.canvas.height;

        }

        update(){

        }


}
