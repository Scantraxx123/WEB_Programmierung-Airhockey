/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

/* Funktionen zum zeichnen der Grafiken
   Autor: Felix Willrich, Frederik Rieß, Vanessa Traub */


function drawMatchfield(backgroundContext, backgroundLayer) {

    backgroundContext.beginPath();
    backgroundContext.moveTo(backgroundLayer.width / 2, 0);
    backgroundContext.lineTo(backgroundLayer.width / 2, backgroundLayer.height);
    backgroundContext.strokeStyle = "#FF0000";
    backgroundContext.stroke();

    backgroundContext.beginPath();
    backgroundContext.arc(backgroundLayer.width / 2, backgroundLayer.height / 2, 10, 0, 2 * Math.PI);
    backgroundContext.fillStyle = '#FF0000';
    backgroundContext.fill();

    backgroundContext.beginPath();
    backgroundContext.arc(0, backgroundLayer.height / 2, 80, 1.5 * Math.PI, 0.5 * Math.PI);
    backgroundContext.strokeStyle = "#0000FF";
    backgroundContext.stroke();

    backgroundContext.beginPath();
    backgroundContext.arc(backgroundLayer.width, backgroundLayer.height / 2, 80, 0.5 * Math.PI, 1.5 * Math.PI);
    backgroundContext.stroke();

    backgroundContext.beginPath();
    backgroundContext.arc(backgroundLayer.width / 2, backgroundLayer.height / 2, 80, 0, 2 * Math.PI);
    backgroundContext.stroke();
    console.log("Spielfeld gezeichnet");
}

function drawPlayer(gameContext, player) {
    gameContext.beginPath();
    gameContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    gameContext.fillStyle = "#FF0000";
    gameContext.stroke();
    gameContext.fill();
    //console.log("Spieler gezeichnet");
}

function drawComputer(gameContext, computer, player) {
    gameContext.beginPath();
    gameContext.arc(computer.x, computer.y, player.r, 0, 2 * Math.PI);
    gameContext.fillStyle = "#FF0000";
    gameContext.stroke();
    gameContext.fill();
    //console.log("CPU gezeichnet");
}

function drawPuk(gameContext, puk) {

    gameContext.beginPath();
    gameContext.arc(puk.x, puk.y, puk.r, 0, 2 * Math.PI);
    gameContext.fillStyle = "#000000";
    gameContext.fill();
    //console.log("Puk gezeichnet");
}

function drawScore(score, playerGoals, computerGoals, time, appendSeconds, appendTens) {
    score.innerHTML = playerGoals + " : " + computerGoals;
    time.innerHTML = appendSeconds + " : " + appendTens;
}
