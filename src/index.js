import Phaser from "phaser";
import Dino from "./dino.js"

const config = {
    width: 640,
    height: 480,
    parent: 'dino',
    backgroundColor: '#202124',
    title: 'Dino',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            }
        }
    },
    scene: [
        Dino
    ]
};

new Phaser.Game(config);