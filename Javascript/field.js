/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var context = null;
var canvas = null;

var xspeed = 0;
var yspeed = 0;

var playerGoals = 0;
var computerGoals = 0;


var player = {
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

var goal1 = {
    x: 0,
    y1: 160,
    y2: 320

};

var goal2 = {
    x: 0,
    y1: 160,
    y2: 320
};



document.addEventListener("DOMContentLoaded", function () {
    update();
});
window.addEventListener('mousemove', function (e) {
    setCoords(e);

});

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    canvas.width = 640;
    canvas.height = 480;

    puk.x = canvas.width / 2;
    puk.y = canvas.height / 2;

    goal2.x = canvas.width;
}

function reset() {
    puk.x = canvas.width / 2;
    puk.y = canvas.height / 2;
    puk.speed = 0;
    xspeed = 0;
    yspeed = 0;

}

function update() {

    requestAnimationFrame(update);
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawMatchfield();

    drawPuk();
    drawPlayer();
    if (goalOneCollision()) {
        reset();
        computerGoals++;

    }
    if (goalTwoCollision()) {
        reset();
        playerGoals++;

    }

    if (pukCanvasColliding()) {
        puk.speed = 0;
    }


    if (PlayerPukColliding()) {
        puk.speed = 10;

        var dx = puk.x - player.x;
        var dy = puk.y - player.y;
        dx /= 30;
        dy /= 30;
        xspeed = dx * puk.speed;
        yspeed = dy * puk.speed;
    }
    movePuk();
}

function goalOneCollision() {
    return puk.x < goal1.x && puk.y > goal1.y1 && puk.y < goal1.y2
}

function goalTwoCollision() {
    return puk.x > goal2.x && puk.y > goal1.y1 && puk.y < goal1.y2
}




function PlayerPukColliding() {
    var dx = puk.x - player.x;
    var dy = puk.y - player.y;
    var radiusSum = player.r + puk.r;

    return dx * dx + dy * dy <= radiusSum * radiusSum;
}


function pukCanvasColliding() {
    return 640 <= puk.x;

}

function movePuk() {

    puk.x += xspeed;
    puk.y += yspeed;

    xspeed *= 0.99;
    yspeed *= 0.99;



}

function drawPlayer() {
    context.save();
    context.beginPath();
    context.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    context.fillStyle = "#FF0000";
    context.stroke();
    context.fill();
}

function drawPuk() {
    context.save();
    context.beginPath();
    context.arc(puk.x, puk.y, puk.r, 0, 2 * Math.PI);
    context.fillStyle = "#000000";
    context.fill();
}



function drawMatchfield() {

    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = "#FF0000";
    context.stroke();

    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI);
    context.fillStyle = '#FF0000';
    context.fill();

    context.beginPath();
    context.arc(0, canvas.height / 2, 80, 1.5 * Math.PI, 0.5 * Math.PI);
    context.strokeStyle = "#0000FF";
    context.stroke();

    context.beginPath();
    context.arc(canvas.width, canvas.height / 2, 80, 0.5 * Math.PI, 1.5 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 80, 0, 2 * Math.PI);
    context.stroke();
}


function setCoords(event) {

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //left and right
    if (y < player.r && x + player.r > canvas.width / 2) {
        player.x = canvas.width / 2 - player.r;
        player.y = player.r;
    } else if (x < player.r) {
        player.x = player.r;
    } else if (x + player.r > canvas.width / 2) {
        player.x = canvas.width / 2 - player.r;
    } else player.x = x;

    //top and down
    if (x < player.r && y + player.r > canvas.height) {
        player.x = player.r;
        player.y = canvas.height - player.r;
    } else if (y < player.r) {
        player.y = player.r;
    } else if (y + player.r > canvas.height) {
        player.y = canvas.height - player.r;
    } else player.y = y;





}
