/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var context = null;
var canvas = null;




function prepareCanvas() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    canvas.width = 640;
    canvas.height = 480;

    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = "#FF0000";
    context.stroke();

    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI)
    context.fillStyle = '#FF0000';
    context.fill();

    context.beginPath();
    context.arc(0, canvas.height / 2, 80, 1.5 * Math.PI, 0.5 * Math.PI)
    context.strokeStyle = "#0000FF";
    context.stroke();

    context.beginPath();
    context.arc(canvas.width, canvas.height / 2, 80, 0.5 * Math.PI, 1.5 * Math.PI)
    context.stroke();

    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 80, 0, 2 * Math.PI)
    context.stroke();
}
