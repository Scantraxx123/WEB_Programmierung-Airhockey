/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";


var highScoreEntries = [];

function highScoreEntry(name, time) {
    this.name = name;
    this.time = time;
}

function setLocalStorage() {
    highScoreEntries = localStorage.setItem('highScoreEntries', JSON.stringify(highScoreEntries));

}

function addEntry(name, time) {
    getHighscore();
    var newUser = new highScoreEntry(name, time);
    var i;
    for (i = 0; i < highScoreEntries.length; i++) {
        if (highScoreEntries[i].time > time) {
            highScoreEntries.splice(i, 0, newUser);
            if (highScoreEntries.length >= 10) {
                highScoreEntries.splice(-1, 1);
            }
            break;
        }
    }
    if (highScoreEntries.length < 10) {
        highScoreEntries.push(newUser);
    }
    setLocalStorage();



}

function getHighscore() {
    var retrievedObject = localStorage.getItem('highScoreEntries');
    highScoreEntries = JSON.parse(retrievedObject);


    highScoreEntries.sort(function (a, b) {
        return a.time - b.time
    });

}


function displayScore() {
    getHighscore();
    var i;
    var highscore = "";
    for (i = 0; i < highScoreEntries.length; i++) {
        highscore += i + 1 + " " + highScoreEntries[i].name + " " + highScoreEntries[i].time;
        if (highScoreEntries.length - 1 != i) {
            highscore += "<br>";
        }

    }
    document.getElementById("demo").innerHTML = highscore;

}
