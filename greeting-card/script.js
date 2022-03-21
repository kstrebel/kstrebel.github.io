var canvas;
var ctx;
var ctxCap;
var centerX;
var capX;
var capY;

const colors = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "f", "e", "d", "c", "b", "a", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"
];

var capBase = new Image();
var capTasselL = new Image();
var capTasselR = new Image();
var capWhole = new Image();
var background = new Image();
var throwVelocityX = 0;
var throwVelocityY = 0;
var throwRotation = -10;

var state = "moveTassel";
var time = 0; //in miliseconds
var mousePressed = false;
var userDraggingObject = false;
var mouseX = 0;
var mouseY = 0;

var confetti = null;


start();

function start() {
    console.log("start called");

    canvas = document.getElementById("mainCanvas");
    ctx = canvas.getContext("2d");
    ctxCap = canvas.getContext("2d");

    ctx.canvas.width = innerWidth;
    ctx.canvas.height = innerHeight;

    centerX = canvas.width / 2;
    capX = centerX;
    capY = (canvas.height / 4) * 3;

    if (capY > 750) {
        capY = 750;
    }

    capBase.src = "greeting-card/base.png";
    capTasselL.src = "greeting-card/tassel L.png";
    capTasselR.src = "greeting-card/tassel R.png";
    capWhole.src = "greeting-card/whole cap.png";
    background.src = "greeting-card/background.png";
}

function update() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    switch (state) {
        case "intro":
            intro();
            break;
        case "moveTassel":
            intro();
            drawCapTassel();
            break;
        case "afterTassel":
            afterTassel();
            break;
        case "throwCap":
            readyCapThrow();
            break;
        case "capInAir":
            drawCapThrow();
            break;
        case "confetti":
            end();
            break;
        case "end":
            end();
            break;
    }

    time += 10;
}
setInterval(update, 10);

function intro() {
    ctx.font = "80px Arial";
    ctx.textAlign = "center";

    var gradient = ctx.createLinearGradient(0, 0, 600, 0);
    gradient.addColorStop(0, "#00C716");
    gradient.addColorStop(0.33, "#A1E412");
    gradient.addColorStop(0.66, "#FFBD45");
    gradient.addColorStop(1, "#EB315D");

    ctx.fillStyle = gradient;
    ctx.fillText("Happy Graduation!", capX, 140);

    ctx.lineWidth = 1;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.strokeText("Happy Graduation!", capX, 140);
}

function drawCapTassel() {
    ctx.drawImage(capBase, capX - 226, capY - 109);

    //user not yet dragging obj and clicks obj
    //currently also lets user drag clicked mouse over obj to grab it, but that's fine
    if (mousePressed && !userDraggingObject && (capX + 63 < mouseX && mouseX < capX + 128) && (capY - 12 < mouseY && mouseY < capY + 96)) {
        userDraggingObject = true;
        time = 0;
    }
    //user dragging obj within acceptable zone
    else if (mousePressed && userDraggingObject && (capX - 250 < mouseX && mouseX < capX + 250) && (capY - 120 < mouseY && mouseY < capY + 120)) {
        //flip tassel based on what side of the cap it's on
        if (mouseX < capX - 40) {
            ctx.beginPath();
            ctx.lineWidth = 20;
            ctx.strokeStyle = "black";
            ctx.moveTo(capX - 19, capY - 33);
            ctx.lineTo(mouseX + 19, mouseY - 42);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#FFC807";
            ctx.moveTo(capX - 19, capY - 33);
            ctx.lineTo(mouseX + 19, mouseY - 42);
            ctx.stroke();

            ctx.drawImage(capTasselL, mouseX - 45, mouseY - 57);
        } else {
            ctx.beginPath();
            ctx.lineWidth = 20;
            ctx.strokeStyle = "black";
            ctx.moveTo(capX - 19, capY - 33);
            ctx.lineTo(mouseX - 32, mouseY - 44);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.strokeStyle = "#ffc807";
            ctx.moveTo(capX - 19, capY - 33);
            ctx.lineTo(mouseX - 32, mouseY - 44);
            ctx.stroke();

            ctx.drawImage(capTasselR, mouseX - 45, mouseY - 57);
        }
    }
    //user is dragging obj and just released click within acceptable zone
    else if (!mousePressed && userDraggingObject && (capX - 240 < mouseX && mouseX < capX - 115) && (capY + 16 < mouseY && mouseY < capY + 123)) {
        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.strokeStyle = "black";
        ctx.moveTo(capX - 19, capY - 33);
        ctx.lineTo(mouseX + 19, mouseY - 42);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#FFC807";
        ctx.moveTo(capX - 19, capY - 33);
        ctx.lineTo(mouseX + 19, mouseY - 42);
        ctx.stroke();

        ctx.drawImage(capTasselL, capX - 197, capY + 30);
        console.log("here");
        userDraggingObject = false;

        //tassel move completed; change state
        state = "afterTassel";
    }
    //catch-all for resetting dragging obj
    else if (userDraggingObject && state == "moveTassel") {
        userDraggingObject = false;
        ctx.drawImage(capTasselR, (capX + 63), capY - 12);
    }
    //draw tassel in original place
    else {
        //give user hint to move tassel
        if (time > 2000) {
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;

            ctx.fillText("Move the tassel to the right.", capX, capY + 140);

            //ctx.lineWidth = 5;
            var index = Math.round(time / 80) % 32;
            //console.log(`#${colors[index]}${colors[index]}${colors[index]}`);

            ctx.fillStyle = `#${colors[index]}${colors[index]}${colors[index]}`;
            ctx.beginPath();
            ctx.moveTo(capX + 208, capY - 13);
            ctx.lineTo(capX + 219, capY + 22);
            ctx.lineTo(capX + 319, capY - 7);
            ctx.lineTo(capX + 331, capY + 30);
            ctx.lineTo(capX + 230, capY + 60);
            ctx.lineTo(capX + 240, capY + 96);
            ctx.lineTo(capX + 170, capY + 57);
            ctx.lineTo(capX + 208, capY - 13);
            ctx.fill();
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.strokeStyle = "black";
        ctx.moveTo(capX - 19, capY - 33);
        ctx.lineTo(capX + 75, capY);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#ffc807";
        ctx.moveTo(capX - 19, capY - 33);
        ctx.lineTo(capX + 75, capY);
        ctx.stroke();

        ctx.drawImage(capTasselR, (capX + 63), capY - 12);
    }

    //put button over tassel
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(capX - 19, capY - 33, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "#333333";
    ctx.arc(capX - 19, capY - 33, 3, 0, 2 * Math.PI);
    ctx.fill();
}

function afterTassel() {
    state = "throwCap";
}

function readyCapThrow() {
    //user not yet dragging obj and clicks obj
    //currently also lets user drag clicked mouse over obj to grab it, but that's fine
    if (mousePressed && !userDraggingObject && (capX - 227 < mouseX && mouseX < capX + 227) && (capY - 109 < mouseY && mouseY < capY + 109)) {
        capX = mouseX;
        capY = mouseY;

        userDraggingObject = true;
    }
    //user dragging obj within acceptable zone
    else if (mousePressed && userDraggingObject && (capX - 250 < mouseX && mouseX < capX + 250) && (capY - 120 < mouseY && mouseY < capY + 120)) {
        capX = mouseX;
        capY = mouseY;
    }
    //user is dragging obj and just released click within acceptable zone
    else if (!mousePressed && userDraggingObject && (capX - 250 < mouseX && mouseX < capX + 250) && (capY - 120 < mouseY && mouseY < capY + 120)) {
        throwVelocityX = 2 * (mouseX - capX); //lower value so it's easier to throw straight up
        throwVelocityY = -4 * (mouseY - capY);

        console.log("here");
        userDraggingObject = false;

        //tassel move completed; change state
        state = "capInAir";
        time = 0;
    }
    //catch-all for resetting dragging obj; draw obj in original place
    else {
        userDraggingObject = false;

        capX = centerX;
        capY = (canvas.height / 4) * 3;

        if (capY > 750) {
            capY = 750;
        }

        //give user hint to move tassel
        if (time > 2000) {
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;

            ctx.fillText("Throw it in the air - you've graduated!", capX, capY + 140);

            //ctx.lineWidth = 5;
            var index = Math.round(time / 80) % 32;
            console.log(`#${colors[index]}${colors[index]}${colors[index]}`);

            ctx.fillStyle = `#${colors[index]}${colors[index]}${colors[index]}`;
            ctx.beginPath();
            ctx.moveTo(capX - 57, capY - 265);
            ctx.lineTo(capX, capY - 321);
            ctx.lineTo(capX + 57, capY - 265);
            ctx.lineTo(capX + 20, capY - 265);
            ctx.lineTo(capX + 20, capY - 162);
            ctx.lineTo(capX - 20, capY - 162);
            ctx.lineTo(capX - 20, capY - 265);
            ctx.lineTo(capX - 57, capY - 265);
            ctx.fill();
            ctx.stroke();
        }
    }

    ctx.drawImage(capWhole, capX - capWhole.width / 2, capY - capWhole.height / 2);
}

function drawCapThrow() {
    var x, y, t;
    t = time / 100;
    x = throwVelocityX * t + capX;
    y = -1 * (-capY + throwVelocityY * t + (-9.8 * t * t) / 2);
    var rotTotal = Math.PI / 180 * (throwRotation * t); //+= 5);

    ctxCap.save();
    ctxCap.translate(x, y);
    ctxCap.rotate(rotTotal);
    ctxCap.drawImage(capWhole, 0 - capWhole.width / 2, 0 - capWhole.height / 2);
    ctxCap.restore();

    console.log(throwVelocityY);

    if (y > canvas.height + 400) {
        state = "end";
    }
}

function rainConfetti() {
    if (confetti == null) {
        
    }
}

function end() {
    ctx.font = "80px Arial";
    ctx.textAlign = "center";

    var point = Math.round(time / 80) % 100;
    console.log(point);

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    //gradient.addColorStop(point / 100 - 0.33, "#5B5DFB");

    gradient.addColorStop(point / 100, "#00C716");
    try {
        gradient.addColorStop(point / 100 + 0.25, "#A1E412");
    } catch {
        gradient.addColorStop(0, "#A1E412");
        gradient.addColorStop(point / 100 + 0.25 - 1, "#A1E412");
    }
    try {
        gradient.addColorStop(point / 100 + 0.50, "#EB315D");
    } catch {
        gradient.addColorStop(0, "#EB315D");
        gradient.addColorStop(point / 100 + 0.50 - 1, "#EB315D");
    }
    try {
        gradient.addColorStop(point / 100 + 0.75, "#5B5DFB");
    } catch {
        gradient.addColorStop(0, "#5B5DFB");
        gradient.addColorStop(point / 100 + 0.75 - 1, "#5B5DFB");
    }

    ctx.fillStyle = gradient;
    ctx.fillText("Congratulations!", capX, 140);

    ctx.lineWidth = 1;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.strokeText("Congratulations!", capX, 140);
}

function onMousedown() {
    mousePressed = true;
}

function onMouseup() {
    mousePressed = false;
}

function onMousemove(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    //console.log(mouseX, mouseY);
}

canvas.addEventListener("mousedown", onMousedown);
canvas.addEventListener("mouseup", onMouseup);
canvas.addEventListener("mousemove", onMousemove);