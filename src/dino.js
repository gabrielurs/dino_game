import generateAnimations from './animations/index'
class Dino extends Phaser.Scene{
    constructor() {
        super('Dino');
    }

    preload(){
        this.load.spritesheet('tiles', './assets/tiles.png',{frameWidth: 16,frameHeight: 16});
        this.load.atlas('atlas','./assets/atlas.png', './assets/atlas.json');
    }

    create(){

    }

    update(time,delta){

    }
}
export default Dino;