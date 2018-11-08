/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var context = null;
var canvas = null;

function init() {

    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    canvas.width = 640;
    canvas.height = 480;
}

(function () {

    var player = {
        x: 0,
        y: 0,
        r: 30
    };

    var puk = {
        x: 100,
        y: 100,
        r: 15,
        speed: 0
    };

    function update() {

        requestAnimationFrame(update);
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawMatchfield();

        drawPuk();
        drawPlayer();
        if (PlayerPukColliding()) {
            puk.speed = 150;
            movePukRight(puk.speed);
            puk.speed--;
        } else if (puk.speed > 0) {
            movePukRight(puk.speed);
            puk.speed--;
        }
        if (pukCanvasColliding()) {
            puk.speed = 0;
        }


    }

    function PlayerPukColliding() {
        var dx = player.x - puk.x;
        var dy = player.y - puk.y;
        var radiusSum = player.r + puk.r;


        return dx * dx + dy * dy <= radiusSum * radiusSum;
    }


    function pukCanvasColliding() {
        return 640 <= puk.x;

    }

    function movePukRight(velo) {
        if (velo >= 120) {
            puk.x += 10;
        } else if (velo >= 90) {
            puk.x += 8;
        } else if (velo >= 60) {
            puk.x += 6;
        } else if (velo >= 30) {
            puk.x += 4;
        } else {
            puk.x += 3;
        }


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



    function setCoords(event) {

        var rect = canvas.getBoundingClientRect();
        player.x = event.clientX - rect.left;
        player.y = event.clientY - rect.top;
    }


    document.addEventListener("DOMContentLoaded", function () {
        update();
    });
    window.addEventListener('mousemove', function (e) {
        setCoords(e);
    });
}());
