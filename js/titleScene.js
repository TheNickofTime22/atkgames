
var timer = false;
    
class TitleScene extends Phaser.Scene {
    

    constructor() {
        super({ key: 'titleScene' });
        this.timer = timer;
    }

    
    preload() {
        this.load.image('background', '/resources/img/background.png');
        this.load.image('singleplayer', '/resources/img/singleplayer.png');
        this.load.image('endless', '/resources/img/endless.png');
        this.load.image('time_trial','/resources/img/time trial.png');
        this.load.image('how2Play', '/resources/img/how to play.png');
        this.load.image('space', '/resources/img/space.png');
        this.load.image('wasd', '/resources/img/wasd.png');
        

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
        
        

        
        this.add.image(400, 300, 'singleplayer');
        var endless_mode = this.add.sprite(400, 400, 'endless').setInteractive();
        var time_trial_mode = this.add.sprite(450, 500, 'time_trial').setInteractive();
        var how2Play = this.add.sprite(400, 700, 'how2Play').setInteractive();

        var instructions_box = this.add.container(710, 600);
        instructions_box.add(this.add.text(0, 0, "Controls: Use                             to move the cursor\n\n                Press:                          to swap two blocks.\n\n Make a match of 3 colors in a row to score points.\n\n If any blocks touch the top of the screen, GAME OVER.", {font: '32px Bernard', fill: '#FFFFFF'}));
        instructions_box.add(this.add.image(300, 85, 'space').setScale(1.2));
        instructions_box.add(this.add.image(290, 10, 'wasd'));
        instructions_box.setAlpha(0);
        
        var time_desc = this.add.text(700, 470, 'Get the highest score\n possible within 2 minutes', {font: '32px Bernard', fill: '#FFFFFF'}).setAlpha(0);

        var endless_desc = this.add.text(650, 350, 'Get the highest score\n possible with no time limit,\n as the game gets steadily faster.', {font: '32px Bernard', fill: '#FFFFFF'}).setAlpha(0);

        endless_mode.on('pointerover', function() {
            this.setTint('550000000');
            endless_desc.setAlpha(1);
        });

        endless_mode.on('pointerout', function(){
            this.clearTint();
            endless_desc.setAlpha(0);
        })

        time_trial_mode.on('pointerover', function() {
            this.setTint('150000000');
            time_desc.setAlpha(1);
        });

        time_trial_mode.on('pointerout', function(){
            this.clearTint();
            time_desc.setAlpha(0);
        })

        how2Play.on('pointerover', function() {
            this.setTint('790000000');
            if (instructions_box.alpha == 0){
                instructions_box.setAlpha(1);
            } else if (instructions_box.alpha == 1){
                instructions_box.setAlpha(0);
            }
        });

        how2Play.on('pointerout', function(){
            this.clearTint();
            instructions_box.setAlpha(0);
        })

        endless_mode.on('pointerdown', () => this.endlessMode());
        
        time_trial_mode.on('pointerdown', () => this.timeMode());

        
        
    }

    timeMode(){
        this.scene.start('gameScene', {timer:!this.timer});
    }
    

    endlessMode() {
        
        this.scene.start('gameScene', {timer:this.timer});
    }

}


export default TitleScene;