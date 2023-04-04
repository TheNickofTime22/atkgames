class BaseBlock extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.setInteractive();
    }


    get texture() {
        return this._texture;
    }

    set texture(value) {
        this._texture = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    logAttributes() {
        console.log(`Color: ${this.texture.key}, X: ${this.x}, Y: ${this.y}`);
    }

    shake() {
        let duration = 1000;
        let distance = 5;
        this.scene.tweens.add({
            targets: this,
            rotation: -Phaser.Math.DegToRad(distance),
            duration: duration / 4,
            ease: 'Power2',
            yoyo: true,
            repeat: 2
        });
        this.scene.tweens.add({
            targets: this,
            rotation: Phaser.Math.DegToRad(distance * 2),
            duration: duration / 4,
            ease: 'Power2',
            yoyo: true,
            repeat: 2
        });
        this.scene.tweens.add({
            targets: this,
            rotation: 0,
            duration: duration / 4,
            ease: 'Power2'
        });
    }

    spinToDisappear() {
        const originalScaleX = this.scaleX;
        const originalScaleY = this.scaleY;
        const originalRotation = this.rotation;

        const shrinkTween = this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            duration: 1000,
            onComplete: () => {


            }
        });

        this.scene.tweens.add({
            targets: this,
            angle: 360,
            duration: 1000,
            repeat: 0,
            ease: 'Linear',
            onUpdate: () => {
                this.rotation = Phaser.Math.DegToRad(this.angle);
            },
            onComplete: () => {
                console.log('completed');

                this.setScale(originalScaleX, originalScaleY);
                this.setRotation(originalRotation);
                this.setAlpha(1);

            }
        });
    }


}
export { BaseBlock };
