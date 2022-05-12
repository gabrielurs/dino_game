class Player{
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x,y,'atlas')
            .setScale(2)
            .setImmovable()
            .setCollideWorldBounds();
        this.isDead = false;
        return this;
    }
    update(input){
        if (!this.isDead && this.sprite.body.onFloor()) {
            this.sprite.play('run', true);
        }

        if ((input.space.isDown && this.sprite.body.onFloor())) {
            this.sprite.setVelocityY(-500);
            this.sprite.play('idle', true);
        }
    }
}

export default Player;