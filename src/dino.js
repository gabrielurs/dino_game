import generateAnimations from './animations/index';
import Player from './objects/Player';
import {showScore} from './ui/score';
import {hidePressToPlay, hideGameOver} from './ui/gameState';

class Dino extends Phaser.Scene{
    constructor() {
        super('Dino');

        this.state = {
            started: false,
            gameOver: false,
            UIUpdated: false
        };
    }

    preload(){
        this.load.spritesheet('tiles', './assets/tiles.png',{frameWidth: 16,frameHeight: 16});
        this.load.atlas('atlas','./assets/atlas.png', './assets/atlas.json');

        this.load.on('complete', ()=>{
           generateAnimations(this);
        });
    }

    create(){
        this.player = new Player(this, 25, 460);
        this.inputs = this.input.keyboard.createCursorKeys();
    }

    update(){

        if (this.inputs.space.isDown && !this.state.started && !this.state.gameOver) {
            this.state.started = true;
        }

        if(this.state.started){
            this.player.update(this.inputs, delta);

            if(!this.state.UIUpdated){
                this.updateUI();
            }
        }
    }

    updateUI() {
        hidePressToPlay();
        hideGameOver();

        showScore();

        this.state.UIUpdated = true;
    }
}
export default Dino;