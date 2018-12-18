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

var dx = 0;
var dy = 0;

function init() {

    backgroundLayer = document.getElementById('background-layer');
    backgroundContext = backgroundLayer.getContext("2d");
    gameLayer = document.getElementById('game-layer');
    gameContext = gameLayer.getContext("2d");

    time = document.getElementById('time');
    score = document.getElementById('score');


    backgroundLayer.width = 640;
    backgroundLayer.height = 480;

    drawMatchfield();


    puk.x = gameLayer.width / 2;
    puk.y = gameLayer.height / 2;

    goal2.x = gameLayer.width;

    computer.x = 500;
    computer.y = 240;

    interval = setInterval(timer, 10);
}



function update() {
    if (playerGoals == 10) {
        popup(true);
    }
    if (computerGoals == 10) {
        popup(false);
    }

    if (!pause) {
        gameContext.clearRect(0, 0, gameLayer.width, gameLayer.height);
        drawScore();
        drawPuk();
        drawPlayer();
        drawComputer();

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
    return puk.x - puk.r < goal1.x && puk.y > goal1.y1 && puk.y < goal1.y2
}

function goalTwoCollision() {
    return puk.x + puk.r > goal2.x && puk.y > goal1.y1 && puk.y < goal1.y2
}


function checkFieldColliding() {
    if (puk.x + puk.r > backgroundLayer.width || puk.x < puk.r) {

        if (checkGoal())
            return;

        if (puk.x > backgroundLayer.width - puk.r) {
            puk.x = backgroundLayer.width - puk.r;
        } else {
            puk.x = puk.r;
        }

        xspeed = -xspeed;
    }

    if (puk.y + puk.r > backgroundLayer.height || puk.y < puk.r) {

        if (checkGoal())
            return;

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

function movePuk() {

    puk.x += xspeed;
    puk.y += yspeed;

    xspeed *= 0.99;
    yspeed *= 0.99;

}

function drawPlayer() {
    gameContext.beginPath();
    gameContext.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    gameContext.fillStyle = "#FF0000";
    gameContext.stroke();
    gameContext.fill();
}

function drawComputer() {
    gameContext.beginPath();
    gameContext.arc(computer.x, computer.y, player.r, 0, 2 * Math.PI);
    gameContext.fillStyle = "#FF0000";
    gameContext.stroke();
    gameContext.fill();
}

function drawPuk() {

    gameContext.beginPath();
    gameContext.arc(puk.x, puk.y, puk.r, 0, 2 * Math.PI);
    gameContext.fillStyle = "#000000";
    gameContext.fill();
}



function drawMatchfield() {

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




}

function drawScore() {
    score.innerHTML = playerGoals + " : " + computerGoals;
    time.innerHTML = appendSeconds + " : " + appendTens;
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



function popup(win) {
    if (win) {
        var input = document.createElement("INPUT");
        var para = document.createElement("P");
        var time = document.createTextNode("Deine Zeit: " + appendSeconds + ":" + appendTens);
        var name = document.createTextNode("Dein Name: ");
        var mybr = document.createElement('br');
        var btn = document.createElement("BUTTON");
        btn.innerHTML = "Submit!";
        btn.onclick = function () {
            addEntry(input.value, parseFloat(appendSeconds + "." + appendTens));
            window.location.replace("highscore.html");
        };


        input.setAttribute("type", "text");

        modal_text.innerHTML = "Glückwunsch! Du hast gewonnen!";
        modal_text.appendChild(mybr);
        para.appendChild(time);
        modal_text.appendChild(para);
        modal_text.appendChild(mybr);
        modal_text.appendChild(name);
        modal_text.appendChild(input);
        modal_text.appendChild(mybr);
        modal_text.appendChild(btn);
    } else {
        modal_text.innerHTML = "Sie haben verloren!";
        var btn = document.createElement("BUTTON");
        btn.innerHTML = "New Game!";
        btn.onclick = function () {
            window.location.replace("field.html");
        };
        modal_text.appendChild(btn);
        var btn1 = document.createElement("BUTTON");
        btn1.innerHTML = "Exit!";
        btn1.onclick = function () {
            window.location.replace("../index.html");
        };
        modal_text.appendChild(btn1);
    }


    modal.style.display = "block";

    pause = true;
    clearInterval(interval);
    drawScore();

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

function end_pause() {
    modal.style.display = "none";
    pause = false;
    clearInterval(interval);
    interval = setInterval(timer, 10);
    update();
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
