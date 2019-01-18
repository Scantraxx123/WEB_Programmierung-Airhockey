/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var music = null;
var musicOffOn = null;
var boolMusic = true;

var winAudio = new Audio('');
var looseAudio = new Audio('../Music/Loose_Sound.mp3');



function playMusic() {
    musicOffOn = document.getElementById('musicOnOff');
    musicOffOn.onclick = function () {
        if (boolMusic) {
            music.volume = 0.0;
            looseAudio.volume = 0.0;
            winAudio.volume = 0.0;
            musicOffOn.src = "../Images/audio_off.png";
            boolMusic = false;
        } else {
            music.volume = 0.4;
            looseAudio.volume = 0.4;
            winAudio.volume = 0.4;
            musicOffOn.src = "../Images/audio_on.png";
            boolMusic = true;
        }
    };

    music = document.getElementById('myAudio');
    music.volume = 0.4;
    music.play();
}

function endGameMusic(win) {
    music.pause();
    if (win) {
        winAudio.play();

    } else {
        looseAudio.play();
    }

}
