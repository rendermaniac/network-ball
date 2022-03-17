let express = require("express");
let socket = require("socket.io");

let ball_posX = 200;
let ball_posY = 200;
let ball_radius = 20;

let ball_speedX = 5;
let ball_speedY = 5;

let app = express();
app.use(express.static("public"))

let server = app.listen(3030, "192.168.1.154");
let io = socket(server);

// runs the function every 16 milliseconds
// ie 60fps 1000 millisconds / 60
setInterval(updateBall, 16);

// updates the ball position and sends it to the sketch
function updateBall() {

    if (ball_posX  + ball_radius >= 400 || ball_posX - ball_radius <= 0)
        ball_speedX *= -1;

    if (ball_posY  + ball_radius >= 400 || ball_posY - ball_radius <= 0)
        ball_speedY *= -1;

    ball_posX += ball_speedX;
    ball_posY += ball_speedY;

    io.sockets.emit("update", {x: ball_posX, y: ball_posY, r: ball_radius });
}

// checks we have a connection
io.sockets.on("connection", newConnection);

function newConnection (socket) {
    console.log("new connection:" + socket.id);
}