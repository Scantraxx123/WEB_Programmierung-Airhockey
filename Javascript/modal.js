/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

/* Popups für das Spiel = Pause, Win, Loose Popup
   Autor: Felix Willrich, Frederik Rieß, Vanessa Traub */

var modal_close = null;
var modal_pause = null;
var modal_loose = null;
var modal_win = null;
var time_text = null;
var highscore_text = null;
var highscore_form = null;
var input_name = null;
var submit_Highscore = null;
var win = false;


/*
Unterscheidung, ob Spieler gewonnen oder verloren hat dementsprechend wird das jeweilige Popup angezeigt
Der Timer wird gestoppt, sowie der letzte Zeitpunkt gezeichnet und danach wird das Spiel angehalten.
win = Boolean, der angibt ob Spieler gewonnen
*/
function popup(win2) {
    if (win2) {
        winPopUp();
    } else {
        modal_loose.style.display = "block";
    }
    win = true;
    pause = true;
    clearInterval(interval);
    drawScore(score, playerGoals, computerGoals, time, appendSeconds, appendTens);
}

/*
Popup wird erweitert, sobald Spieler gewonnen hat
Zeit wird angezeigt und gleichzeitig wird überprüft, ob der Spieler einen Highscore erspielt hat
*/
function winPopUp() {

    time_text.innerHTML = "Glückwunsch! Du hast gewonnen! 😎<br><br>Deine Zeit: " + appendSeconds + ":" + appendTens;
    modal_win.style.display = "block";

    if (isHighscore(parseFloat(appendSeconds + "." + appendTens))) {
        highscore_text.innerHTML = "Deine Zeit wird in die Highscoreliste aufgenommen!";
        highscore_form.style.display = "block";
    } else {
        highscore_text.innerHTML = "Deine Zeit hat nicht für den Highscore gereicht! Versuche es erneut!";
    }

}

/*
Spieler beendet Pause über ESC, Popup wird geschlossen,
Timer gestartet und die Update Methode wieder ausgeführt
*/
function end_pause() {
    if (!win) {
        modal_pause.style.display = "none";
        pause = false;
        clearInterval(interval);
        interval = setInterval(timer, 10);
        update();
    }

}

/*
EventListener für das Pausepopup, Esc um Pause einzuleiten
*/
document.addEventListener('keyup', function (event) {
    if (event.keyCode === 27) {
        if (!win) {
            if (!pause) {
                modal_pause.style.display = "block";
                pause = true;
                clearInterval(interval);
            } else {
                end_pause();
            }
        }
    }
});


/*
Damit die Popups zum Spielbeginn verfügbar sind, werden diese beim Laden des Fensters initalisiert
Die Variablen wurden alle im Methodenkopf angelegt
*/
window.onload = function () {
    modal_pause = document.getElementById('modalPause');
    modal_close = document.getElementsByClassName("close")[0];
    modal_close.onclick = function () {
        end_pause();
    };

    modal_loose = document.getElementById('modalLoose');


    modal_win = document.getElementById('modalWin');
    time_text = document.getElementById('timeText');
    input_name = document.getElementById('inputName');

    submit_Highscore = document.getElementById('submitHighscore');
    submit_Highscore.onclick = function () {
        addEntry(input_name.value, parseFloat(appendSeconds + "." + appendTens));
    };

    highscore_text = document.getElementById('highscoreText');
    highscore_form = document.getElementById('highscoreForm');
    highscore_form.style.display = "none";

};
