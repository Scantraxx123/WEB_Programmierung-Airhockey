/*jslint browser: true */
/* eslint-env browser */
/* global window */
"use strict";

var fieldContext = null;
var fieldCanvas = null;

var scoreCanvas = null;
var scoreContext = null;

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

var modal = null;
var modal_close = null;
var modal_text = "";

var pause = false;

var seconds = 0;
var tens = 0;
var appendTens = "";
var appendSeconds = "";
var interval = null;


function init() {

    fieldCanvas = document.getElementById('field');
    fieldContext = fieldCanvas.getContext("2d");

    fieldCanvas.width = 640;
    fieldCanvas.height = 480;

    puk.x = fieldCanvas.width / 2;
    puk.y = fieldCanvas.height / 2;

    goal2.x = fieldCanvas.width;

    scoreCanvas = document.getElementById('score');
    scoreContext = scoreCanvas.getContext("2d");

    scoreCanvas.width = fieldCanvas.width;

    interval = setInterval(timer, 10);
}

function reset() {
    puk.x = fieldCanvas.width / 2;
    puk.y = fieldCanvas.height / 2;
    puk.speed = 0;
    xspeed = 0;
    yspeed = 0;

}


function update() {
    if (playerGoals == 10) {
        var input = document.createElement("INPUT");
        var para = document.createElement("P");
        var time = document.createTextNode("Deine Zeit: " + appendSeconds + ":" + appendTens);
        var name = document.createTextNode("Dein Name: ");
        var mybr = document.createElement('br');
        var btn = document.createElement("BUTTON");
        var t = document.createTextNode("CLICK ME");
        btn.appendChild(t);

        input.setAttribute("type", "text");

        modal_text.innerHTML = "Glückwunsch! Du hast gewonnen!";
        modal_text.appendChild(mybr);
        para.appendChild(time);
        modal_text.appendChild(para);
        modal_text.appendChild(mybr);
        modal_text.appendChild(name);
        modal_text.appendChild(input);
        modal_text.appendChild(btn);


        modal.style.display = "block";

        pause = true;
        clearInterval(interval);
        scoreContext.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
        drawMatchfield();
    }
    if (!pause) {

        requestAnimationFrame(update);
        fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
        scoreContext.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
        drawMatchfield();
        drawPuk();
        drawPlayer();


        checkFieldColliding();

        if (PlayerPukColliding()) {
            puk.speed = 20;

            var dx = puk.x - player.x;
            var dy = puk.y - player.y;
            dx /= 30;
            dy /= 30;
            xspeed = dx * puk.speed;
            yspeed = dy * puk.speed;
        }
        movePuk();
    }
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

function checkFieldColliding() {
    if (puk.x + puk.r > fieldCanvas.width || puk.x < puk.r) {

        if (checkGoal())
            return;

        if (puk.x > fieldCanvas.width - puk.r) {
            puk.x = fieldCanvas.width - puk.r;
        } else {
            puk.x = puk.r;
        }

        xspeed = -xspeed;
    }

    if (puk.y + puk.r > fieldCanvas.height || puk.y < puk.r) {

        if (checkGoal())
            return;

        if (puk.y > fieldCanvas.height - puk.r) {
            puk.y = fieldCanvas.height - puk.r;
        } else {
            puk.y = puk.r;
        }
        yspeed = -yspeed;
    }
}

function goalOneCollision() {
    return puk.x - puk.r < goal1.x && puk.y > goal1.y1 && puk.y < goal1.y2
}

function goalTwoCollision() {
    return puk.x + puk.r > goal2.x && puk.y > goal1.y1 && puk.y < goal1.y2
}


function PlayerPukColliding() {
    var dx = puk.x - player.x;
    var dy = puk.y - player.y;
    var radiusSum = player.r + puk.r;

    return dx * dx + dy * dy <= radiusSum * radiusSum;
}

function movePuk() {

    puk.x += xspeed;
    puk.y += yspeed;

    xspeed *= 0.99;
    yspeed *= 0.99;



}

function drawPlayer() {
    fieldContext.save();
    fieldContext.beginPath();
    fieldContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    fieldContext.fillStyle = "#FF0000";
    fieldContext.stroke();
    fieldContext.fill();
}

function drawPuk() {
    fieldContext.save();
    fieldContext.beginPath();
    fieldContext.arc(puk.x, puk.y, puk.r, 0, 2 * Math.PI);
    fieldContext.fillStyle = "#000000";
    fieldContext.fill();
}



function drawMatchfield() {



    fieldContext.beginPath();
    fieldContext.moveTo(fieldCanvas.width / 2, 0);
    fieldContext.lineTo(fieldCanvas.width / 2, fieldCanvas.height);
    fieldContext.strokeStyle = "#FF0000";
    fieldContext.stroke();

    fieldContext.beginPath();
    fieldContext.arc(fieldCanvas.width / 2, fieldCanvas.height / 2, 10, 0, 2 * Math.PI);
    fieldContext.fillStyle = '#FF0000';
    fieldContext.fill();

    fieldContext.beginPath();
    fieldContext.arc(0, fieldCanvas.height / 2, 80, 1.5 * Math.PI, 0.5 * Math.PI);
    fieldContext.strokeStyle = "#0000FF";
    fieldContext.stroke();

    fieldContext.beginPath();
    fieldContext.arc(fieldCanvas.width, fieldCanvas.height / 2, 80, 0.5 * Math.PI, 1.5 * Math.PI);
    fieldContext.stroke();

    fieldContext.beginPath();
    fieldContext.arc(fieldCanvas.width / 2, fieldCanvas.height / 2, 80, 0, 2 * Math.PI);
    fieldContext.stroke();



    scoreContext.font = '60pt Timew New Roman';
    scoreContext.fillStyle = 'white';
    scoreContext.fillText(playerGoals, fieldCanvas.width / 2 - 90, 120, 50);
    scoreContext.fillText(":", fieldCanvas.width / 2 - 10, 120);
    scoreContext.fillText(computerGoals, fieldCanvas.width / 2 + 40, 120);

    scoreContext.font = '40pt Timew New Roman';
    scoreContext.fillText(appendSeconds + ":" + appendTens, fieldCanvas.width / 2 - 100, 50);



}




function setCoords(event) {

    var rect = fieldCanvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //left and right
    if (y < player.r && x + player.r > fieldCanvas.width / 2) {
        player.x = fieldCanvas.width / 2 - player.r;
        player.y = player.r;
    } else if (x < player.r) {
        player.x = player.r;
    } else if (x + player.r > fieldCanvas.width / 2) {
        player.x = fieldCanvas.width / 2 - player.r;
    } else player.x = x;

    //top and down
    if (x < player.r && y + player.r > fieldCanvas.height) {
        player.x = player.r;
        player.y = fieldCanvas.height - player.r;
    } else if (y < player.r) {
        player.y = player.r;
    } else if (y + player.r > fieldCanvas.height) {
        player.y = fieldCanvas.height - player.r;
    } else player.y = y;

}

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



document.addEventListener("DOMContentLoaded", function () {
    update();
});
window.addEventListener('mousemove', function (e) {
    setCoords(e);

});

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

function end_pause() {
    modal.style.display = "none";
    pause = false;
    clearInterval(interval);
    interval = setInterval(timer, 10);
    update();

}
