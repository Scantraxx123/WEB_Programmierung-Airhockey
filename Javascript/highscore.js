/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

/* Highscore Verwaltung
   Autor: Felix Willrich, Frederik Rieß, Vanessa Traub */

var highScoreEntries;

/* Objekt für einen Highscoireeintrag
name = String Name des Spielers
time = Double Zeit des Speilers */
function HighScoreEntry(name, time) {
    this.name = name;
    this.time = time;
}

//Speichern des Highscores im LocalStorage über JSON mit dem Key highScoreEntries
function setLocalStorage() {
    highScoreEntries = localStorage.setItem('highScoreEntries', JSON.stringify(highScoreEntries));

}

/*
Highscore aus dem LocalStorage holen und den JSON String in die Objektstruktur parsen
Gleichzeitig wird die Liste nach der Zeit sortiert
*/
function getHighscore() {
    var retrievedObject = localStorage.getItem('highScoreEntries');
    highScoreEntries = JSON.parse(retrievedObject);

    if (highScoreEntries !== null) {
        highScoreEntries.sort(function (a, b) {
            return a.time - b.time;
        });
    }

}


/*
Funktion zum anlegen neuer Einträge in der Liste
Liste wird komplett dursucht, ob die Zeit kleiner als eine eingetragene ist
Sollte dies der Fall sein, wird die Zeit dazwischengeschoben und der 11 Eintrag gelöscht, da nur 10 Einträge vorhanden sein sollen
Ist die Liste leer oder hat weniger als 10 Einträge wird es zum Schluss  automatisch hinzugefügt
*/
function addEntry(name, time) {
    getHighscore();
    var newUser = new HighScoreEntry(name, time);
    if (highScoreEntries !== null) {
        var i;
        for (i = 0; i < highScoreEntries.length; i++) {
            if (highScoreEntries[i].time > time) {
                highScoreEntries.splice(i, 0, newUser);
                if (highScoreEntries.length > 10) {
                    highScoreEntries.splice(-1, 1);
                }
                setLocalStorage();
                return;

            }
        }
    }

    if (highScoreEntries === null) {
        highScoreEntries = [];
        highScoreEntries.push(newUser);
    } else if (highScoreEntries.length < 10) {
        highScoreEntries.push(newUser);
    }
    setLocalStorage();

}


/*
Funktion zum checken, ob die Zeit die der Spieler geschafft hat, ein Eintrag wert ist
*/
function isHighscore(time) {
    getHighscore();
    if (highScoreEntries === null || highScoreEntries.length < 10) {
        return true;
    } else {
        var i;
        for (i = 0; i < highScoreEntries.length; i++) {
            if (highScoreEntries[i].time > time) {
                return true;
            }


        }
    }
    return false;
}

/*
Einträge werden aufbereitet um diese in einer Tabellenstruktur darzustellen
*/
function displayScore() {
    getHighscore();
    if (highScoreEntries !== null) {
        var i = 0,
            highscore = "";
        for (i; i < highScoreEntries.length; i++) {
            highscore += i + 1 + ". " + highScoreEntries[i].name + " " + highScoreEntries[i].time;
            if (highScoreEntries.length - 1 !== i) {
                highscore += "<br>";
            }

        }

        document.getElementById("Score").innerHTML = highscore;
    }

}
