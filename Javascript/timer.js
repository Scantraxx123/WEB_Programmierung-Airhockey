/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var seconds = 0;
var tens = 0;
var appendTens = "";
var appendSeconds = "";

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
