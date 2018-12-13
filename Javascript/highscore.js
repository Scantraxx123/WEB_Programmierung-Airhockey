/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";


var highScoreEntries;

function highScoreEntry(name, time) {
    this.name = name;
    this.time = time;
}

function init_highScoreElements() {

    let user = new highScoreEntry("John", 1);
    let user1 = new highScoreEntry("Mat", 4);
    let user2 = new highScoreEntry("Schmidthelm", 3);

    var highScoreEntrys = [user, user1, user2];
    return highScoreEntrys;
}

function myFunction() {
    var highScoreEntries = init_highScoreElements();
    highScoreEntries = localStorage.setItem('highScoreEntries', JSON.stringify(highScoreEntries));
    displayScore();

}


function displayScore() {


    var retrievedObject = localStorage.getItem('highScoreEntries');
    highScoreEntries = JSON.parse(retrievedObject);


    highScoreEntries.sort(function (a, b) {
        return a.time - b.time
    });

    document.getElementById("demo").innerHTML =
        highScoreEntries[0].name + " " + highScoreEntries[0].time + "<br>" +
        highScoreEntries[1].name + " " + highScoreEntries[1].time + "<br>" +
        highScoreEntries[2].name + " " + highScoreEntries[2].time;
}
