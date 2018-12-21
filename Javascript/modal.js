/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var modal = null;
var modal_close = null;
var modal_text = "";



function popup(win) {
    if (win) {
        winPopUp();
    } else {
        loosePopUp();
    }
    modal.style.display = "block";

    pause = true;
    clearInterval(interval);
    drawScore(score, playerGoals, computerGoals, time, appendSeconds, appendTens);
}

function winPopUp() {
    var exitButton = document.createElement("BUTTON");
    exitButton.innerHTML = "Exit";
    exitButton.onclick = function () {
        window.location.replace("../index.html");
    };
    var newGameButton = document.createElement("BUTTON");
    newGameButton.innerHTML = "New Game";
    newGameButton.onclick = function () {
        window.location.replace("field.html");
    };

    modal_text.innerHTML = "Glückwunsch! Du hast gewonnen!<br><br>Deine Zeit: " + appendSeconds + ":" + appendTens;

    if (isHighscore(parseFloat(appendSeconds + "." + appendTens))) {
        var nameInput = document.createElement("INPUT");
        nameInput.setAttribute("type", "text");

        var submitButton = document.createElement("BUTTON");
        submitButton.innerHTML = "Submit!";
        submitButton.onclick = function () {
            addEntry(nameInput.value, parseFloat(appendSeconds + "." + appendTens));
            window.location.replace("highscore.html");
        };

        modal_text.innerHTML += "<br><br>Deine Zeit wird in die Highscoreliste aufgenommen!<br><br>Dein Name: ";
        modal_text.appendChild(nameInput);
        modal_text.innerHTML += "<br><br>";
        modal_text.appendChild(submitButton);
    } else {
        modal_text.innerHTML += "<br><br>Deine Zeit hat nicht gereicht! Versuch es erneut!<br><br>";
    }

    modal_text.appendChild(newGameButton);
    modal_text.appendChild(exitButton);

}

function loosePopUp() {
    var newGameButton = document.createElement("BUTTON");
    newGameButton.innerHTML = "New Game!";
    newGameButton.onclick = function () {
        window.location.replace("field.html");
    };

    var exitButton = document.createElement("BUTTON");
    exitButton.innerHTML = "Exit";
    exitButton.onclick = function () {
        window.location.replace("../index.html");
    };


    modal_text.innerHTML = "Du hast verloren!<br><br>";
    modal_text.appendChild(newGameButton);
    modal_text.appendChild(exitButton);
}


function end_pause() {
    modal.style.display = "none";
    pause = false;
    clearInterval(interval);
    interval = setInterval(timer, 10);
    update();
}


document.addEventListener('keyup', function (event) {
    if (event.keyCode == 27) {
        if (!pause) {
            modal_text.innerHTML = "Pause!";
            modal.style.display = "block";
            pause = true;
            clearInterval(interval);
        } else {
            end_pause();
        }
    }
})

window.onload = function () {
    // Get the modal
    modal = document.getElementById('popup');

    modal_text = document.getElementById('popup_text');

    // Get the <span> element that closes the modal
    modal_close = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    modal_close.onclick = function () {
        end_pause();
    }

}
