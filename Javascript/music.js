/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

/* Musik Verwaltung
   Autor: Felix Willrich, Frederik Rieß, Vanessa Traub */


var music = null;
var musicOffOn = null;
var boolMusic = true;

var winAudio = new Audio('');
var looseAudio = new Audio('../Music/Loose_Sound.mp3');


/*
Sobald das Spielfeld geladen wird, wird die Funktion aufgerufen um die Musik abzuspielen
Gleichzeitig wird eine Onclick Funktion implementiert um die Musik an und auszuschalten
*/
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


/*
Wenn der Spieler gewonnen oder verloren hat, werden unterschiedliche Sounds zum Ende abgespielt
win = Booleanwert ob der Spieler gewonnen hat
*/
function endGameMusic(win) {
    music.pause();
    if (win) {
        winAudio.play();

    } else {
        looseAudio.play();
    }

}
