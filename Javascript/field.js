/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var backgroundContext = null;
var backgroundLayer = null;
var gameContext = null;
var gameLayer = null;
var time = null;
var score = null;

var xspeed = 0;
var yspeed = 0;

var dx = 0;
var dy = 0;

var playerGoals = 0;
var computerGoals = 0;

var player = {
    x: 0,
    y: 0,
    r: 30
};

var computer = {
    x: 0,
    y: 0,
    r: 30
};

var puk = {
    x: 0,
    y: 0,
    r: 15,
    speed: 0
};

var playerGoal = {
    x: 0,
    y1: 160,
    y2: 320

};

var computerGoal = {
    x: 0,
    y1: 160,
    y2: 320
};



var pause = false;
var appendTens = "";
var appendSeconds = "";
var interval = null;


function init() {

    backgroundLayer = document.getElementById('background-layer');
    backgroundContext = backgroundLayer.getContext("2d");
    gameLayer = document.getElementById('game-layer');
    gameContext = gameLayer.getContext("2d");

    time = document.getElementById('time');
    score = document.getElementById('score');

    backgroundLayer.width = 640;
    backgroundLayer.height = 480;

    drawMatchfield(backgroundContext, backgroundLayer);

    puk.x = gameLayer.width / 2;
    puk.y = gameLayer.height / 2;

    computerGoal.x = gameLayer.width;

    computer.x = 500;
    computer.y = 240;

    interval = setInterval(timer, 10);
}



function update() {
    if (playerGoals == 1) {
        popup(true);
    }
    if (computerGoals == 1) {
        popup(false);
    }
    if (!pause) {
        gameContext.clearRect(0, 0, gameLayer.width, gameLayer.height);
        drawScore(score, playerGoals, computerGoals, time, appendSeconds, appendTens)
        drawPuk(gameContext, puk);
        drawPlayer(gameContext, player);
        drawComputer(gameContext, computer, player);

        checkFieldColliding();

        if (PlayerPukColliding()) {
            puk.speed = 20;

            dx = puk.x - player.x;
            dy = puk.y - player.y;
            dx /= 30;
            dy /= 30;
            xspeed = dx * puk.speed;
            yspeed = dy * puk.speed;
        }
        if (ComputerPukColliding()) {
            puk.speed = 20;

            dx = puk.x - computer.x;
            dy = puk.y - computer.y;
            dx /= 30;
            dy /= 30;
            xspeed = dx * puk.speed;
            yspeed = dy * puk.speed;

        }
        moveComputer();
        movePuk();

        window.requestAnimationFrame(update);
    }
}

function moveComputer() {
    if (computer.y < puk.y) {
        computer.y += 2;
    }
    if (computer.y > puk.y) {
        computer.y -= 2;
    }

}

function setCoords(event) {

    var rect = backgroundLayer.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //left and right
    if (y < player.r && x + player.r > backgroundLayer.width / 2) {
        player.x = backgroundLayer.width / 2 - player.r;
        player.y = player.r;
    } else if (x < player.r) {
        player.x = player.r;
    } else if (x + player.r > backgroundLayer.width / 2) {
        player.x = backgroundLayer.width / 2 - player.r;
    } else player.x = x;

    //top and down
    if (x < player.r && y + player.r > backgroundLayer.height) {
        player.x = player.r;
        player.y = backgroundLayer.height - player.r;
    } else if (y < player.r) {
        player.y = player.r;
    } else if (y + player.r > backgroundLayer.height) {
        player.y = backgroundLayer.height - player.r;
    } else player.y = y;

}

function movePuk() {

    puk.x += xspeed;
    puk.y += yspeed;

    xspeed *= 0.99;
    yspeed *= 0.99;

}

function checkGoal() {

    if (goalOneCollision()) {
        reset();
        computerGoals++;
        return true;
    }
    if (goalTwoCollision()) {
        reset();
        playerGoals++;
        return true;
    }

}

function reset() {
    puk.x = gameLayer.width / 2;
    puk.y = gameLayer.height / 2;
    puk.speed = 0;
    xspeed = 0;
    yspeed = 0;

}

function goalOneCollision() {
    return puk.x - puk.r < playerGoal.x && puk.y > playerGoal.y1 && puk.y < playerGoal.y2
}

function goalTwoCollision() {
    return puk.x + puk.r > computerGoal.x && puk.y > computerGoal.y1 && puk.y < computerGoal.y2
}


function checkFieldColliding() {
    if (puk.x + puk.r > backgroundLayer.width || puk.x < puk.r) {
        if (checkGoal()) {
            return;
        }
        if (puk.x > backgroundLayer.width - puk.r) {
            puk.x = backgroundLayer.width - puk.r;
        } else {
            puk.x = puk.r;
        }
        xspeed = -xspeed;
    }

    if (puk.y + puk.r > backgroundLayer.height || puk.y < puk.r) {

        if (checkGoal()) {
            return;
        }
        if (puk.y > backgroundLayer.height - puk.r) {
            puk.y = backgroundLayer.height - puk.r;
        } else {
            puk.y = puk.r;
        }
        yspeed = -yspeed;
    }
}


function PlayerPukColliding() {
    var dx = puk.x - player.x;
    var dy = puk.y - player.y;
    var radiusSum = player.r + puk.r;

    return dx * dx + dy * dy <= radiusSum * radiusSum;
}

function ComputerPukColliding() {
    var dx = puk.x - computer.x;
    var dy = puk.y - computer.y;
    var radiusSum = computer.r + puk.r;

    return dx * dx + dy * dy <= radiusSum * radiusSum;
}



document.addEventListener("DOMContentLoaded", function () {
    update();
});
window.addEventListener('mousemove', function (e) {
    setCoords(e);

});
