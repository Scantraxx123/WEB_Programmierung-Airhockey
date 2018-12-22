/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var modal_close = null;
var modal_pause = null;
var modal_loose = null;
var modal_win = null;
var time_text = null;
var highscore_text = null;
var highscore_form = null;
var input_name = null;
var submit_Highscore = null;



function popup(win) {
    if (win) {
        winPopUp();
    } else {
        modal_loose.style.display = "block";
    }
    pause = true;
    clearInterval(interval);
    drawScore(score, playerGoals, computerGoals, time, appendSeconds, appendTens);
}

function winPopUp() {

    time_text.innerHTML = "Glückwunsch! Du hast gewonnen!<br><br>Deine Zeit: " + appendSeconds + ":" + appendTens;
    modal_win.style.display = "block";

    if (isHighscore(parseFloat(appendSeconds + "." + appendTens))) {
        highscore_text.innerHTML = "Deine Zeit wird in die Highscoreliste aufgenommen!";
        highscore_form.style.display = "block";
    } else {
        highscore_text.innerHTML = "Deine Zeit hat nicht für den Highscore gereicht! Versuche es erneut!";
    }

}


function end_pause() {
    modal_pause.style.display = "none";
    pause = false;
    clearInterval(interval);
    interval = setInterval(timer, 10);
    update();
}


document.addEventListener('keyup', function (event) {
    if (event.keyCode == 27) {
        if (!pause) {
            modal_pause.style.display = "block";
            pause = true;
            clearInterval(interval);
        } else {
            end_pause();
        }
    }
})

window.onload = function () {
    modal_pause = document.getElementById('modalPause');
    modal_close = document.getElementsByClassName("close")[0];
    modal_close.onclick = function () {
        end_pause();
    }

    modal_loose = document.getElementById('modalLoose');


    modal_win = document.getElementById('modalWin');
    time_text = document.getElementById('timeText');
    input_name = document.getElementById('inputName');

    submit_Highscore = document.getElementById('submitHighscore');
    submit_Highscore.onclick = function () {
        addEntry(input_name.value, parseFloat(appendSeconds + "." + appendTens));
    }

    highscore_text = document.getElementById('highscoreText');
    highscore_form = document.getElementById('highscoreForm');
    highscore_form.style.display = "none";

}
