let socket;

let ball_posX;
let ball_posY;
let ball_radius;

function setup() {
  createCanvas(400, 400);

  socket = io.connect("http://192.168.1.154:3030");
  socket.on("update", update);
}

function update(data) {
  console.log(data);
  ball_posX = data.x;
  ball_posY = data.y;
  ball_radius = data.r;
}

function draw() {
  background(220);

  noStroke();
  fill(255);
  circle(ball_posX, ball_posY, ball_radius * 2.0);


}
