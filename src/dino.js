import generateAnimations from './animations/index';
import Player from './objects/Player';
import {showScore} from './ui/score';
import {hidePressToPlay, hideGameOver} from './ui/gameState';
import Star from "./objects/Star";
import Cactus from "./objects/Cactus";

class Dino extends Phaser.Scene{
    constructor() {
        super('Dino');

        this.state = {
            started: false,
            gameOver: false,
            UIUpdated: false,
            numberOfStars: 3,
            cactuses : [],
            cactusDistance: 2000,
            timer: {
                cactusSpawnLoop: 0
            }
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
        for(let index = 0; index < this.state.numberOfStars; index++){
            new Star(this);
        }

        this.inputs = this.input.keyboard.createCursorKeys();
    }

    update(time, delta){

        if (this.inputs.space.isDown && !this.state.started && !this.state.gameOver) {
            this.state.started = true;
        }

        if(this.state.started){
            this.player.update(this.inputs, delta);

            if(!this.state.UIUpdated){
                this.updateUI();

                if (this.state.timer.cactusSpawnLoop > this.state.cactusDistance) {
                    this.state.cactusDistance = Phaser.Math.Between(5000, 1000);
                    this.state.cactuses.push(new Cactus(this));
                    this.state.timer.cactusSpawnLoop = 0;
                }
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