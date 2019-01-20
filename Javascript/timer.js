/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

/* Timer für das Spielfeld
   Autor: Felix Willrich, Frederik Rieß, Vanessa Traub */

var seconds = 0;
var tens = 0;
var appendTens = "";
var appendSeconds = "";

/*
Die Funktion wird immer wieder im Intervall aufgerufen.
Der Intervall wurde in der init Methode bestimmt setInterval(timer, 10).
Der Timer zählt die hunderstel hoch und und speichert diese dann in einem
Integer um die Zeit in der field.html anzuzeigen.
*/
function timer() {
    tens++;

    if (tens < 9) {
        appendTens = "0" + tens;
    }

    if (tens > 9) {
        appendTens = tens;

    }
    if (tens > 99) {
        seconds++;
        appendSeconds = "0" + seconds;
        tens = 0;
        appendTens = "0" + 0;
    }

    if (seconds > 9) {
        appendSeconds = seconds;
    }

}
