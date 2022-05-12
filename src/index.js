import Phaser from "phaser";
import Dino from "./dino.js"

const config = {
    width: 1280,
    height: 960,
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