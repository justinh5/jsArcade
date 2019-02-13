

var ctx;
const GREEN = '#09f749';

var ball = {
  x: 50,
  y: 100,
  vx: 12,
  vy: 8,
  hw: 20,
  hw2: 10
};

var left = {
  y: 100,
  vy: 8,
  h: 100,
  h2: 50,
  w: 20
};

var right = {
  y: 100,
  vy: 8,
  h: 100,
  h2: 50,
  w: 20
};


function init() {

  draw();
}


function draw() {
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, 300, 300); // clear canvas

  // Pong ball
  ctx.lineWidth = 0.1;
  ctx.rect(ball.x, ball.y, ball.hw, ball.hw);
  ctx.stroke();
  ctx.fillStyle = GREEN;
  ctx.fill();

  // Ball
  if (ball.x - ball.hw2 + ball.vx < 0) {
    ball.vx = -ball.vx;
    left.vy = 0;
    right.vy = 8;
  }
  else if(ball.x + ball.hw2 + ball.vx > window.innerWidth - right.w) {
    ball.vx = -ball.vx;
    right.vy = 0;
    left.vy = 8;
  }
  if (ball.y + ball.hw2 + ball.vy > window.innerHeight || ball.y - ball.hw2 + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  ball.x += ball.vx;   // change in x direction
  ball.y += ball.vy;   // change in y direction


  // Left paddle
  ctx.rect(0, left.y, left.w, left.h);
  ctx.stroke();
  ctx.fill();
  if (left.y + left.h + ball.vy > window.innerHeight) {
    left.vy = -left.vy;
    left.y = window.innerHeight - left.h;
  }
  else if (left.y + left.vy < 0) {
    left.vy = -left.vy;
    left.y = 0;
  }
  if ((left.y + left.h2) > ball.y && left.vy > 0 || (left.y + left.h2) < ball.y && left.vy < 0) {
    left.vy = -left.vy;
  }
  left.y += left.vy;


  // Right paddle
  ctx.rect(window.innerWidth-20, right.y, right.w, right.h);
  ctx.stroke();
  ctx.fill();

  if (right.y + right.h + ball.vy > window.innerHeight) {
    right.vy = -right.vy;
    right.y = window.innerHeight - right.h;
  }
  else if (right.y + right.vy < 0) {
    right.vy = -right.vy;
    right.y = 0;
  }
  if ((right.y + right.h2) > ball.y && right.vy > 0 || (right.y + right.h2) < ball.y && right.vy < 0) {
    right.vy = -right.vy;
  }
  right.y += right.vy;

  //setTimeout(draw,1000/60);

  window.requestAnimationFrame(draw);
}

window.onload = function () {
  ctx = document.getElementById('pong').getContext('2d');
  init();
}
