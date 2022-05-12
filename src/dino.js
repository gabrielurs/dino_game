import Player from './objects/Player'
import Cactus from './objects/Cactus'
import Star from './objects/Star'

import { showScore, resetScore } from './ui/score'
import { hidePressToPlay, hideGameOver } from './ui/gameState'

import generateAnimations from './animations/index'

class Dino extends Phaser.Scene {

    constructor() {
        super('Dino');

        this.state = {
            score: 0,
            highScore: 0,
            speed: 1.5,
            started: false,
            UIUpdated: false,
            gameOver: false,
            cactuses: [],
            numberOfStars: 3,
            cactusDistance: 2000,
            timer: {
                speedLoop: 0,
                cactusSpawnLoop: 0
            }
        };
    }

    preload() {
        this.load.spritesheet('tiles', './assets/tiles.png', { frameWidth: 16, frameHeight: 16 });
        this.load.atlas('atlas', './assets/atlas.png', './assets/atlas.json');

        this.load.on('complete', () => {
            generateAnimations(this);
        });
    }

    create() {
        this.player = new Player(this, 25, 460);

        for (let index = 0; index < this.state.numberOfStars; index++) {
            new Star(this);
        }

        this.inputs = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        this.state.timer.speedLoop += delta;
        this.state.timer.cactusSpawnLoop += delta;

        if (this.inputs.space.isDown && !this.state.started && !this.state.gameOver) {
            this.state.started = true;
        }

        if (this.state.started) {
            this.player.update(this.inputs, delta);

            if (!this.state.UIUpdated) {
                this.updateUI();
            }

            if (this.state.timer.cactusSpawnLoop > this.state.cactusDistance) {
                this.state.cactusDistance = Phaser.Math.Between(5000 / this.state.speed, 1000 / this.state.speed);
                this.state.cactuses.push(new Cactus(this));
                this.state.timer.cactusSpawnLoop = 0;
            }

            if (this.state.timer.speedLoop > 10000) {
                this.state.timer.speedLoop = 0;
                this.state.speed += .50;
            }
        }

        if (this.state.gameOver) {
            this.state.cactuses.forEach(cactus => cactus.stop());
        }

        if (this.inputs.space.isDown && this.state.gameOver) {
            this.restartGame();
        }
    }

    updateUI() {
        hidePressToPlay();
        hideGameOver();
        showScore();
        this.state.UIUpdated = true;
    }

    restartGame() {
        hideGameOver();
        resetScore(this.state);
        this.state.started = true;
        this.state.gameOver = false;
        this.state.speed = 1.5;
        this.state.cactuses.forEach(cactus => cactus.sprite.destroy());
        this.state.cactuses = [];

        this.player.isDead = false;
    }
}
export default Dino;