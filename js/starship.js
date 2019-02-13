

var ctx;
var ship = new Image();
var enemyShip = new Image();
const GREEN = '#09f749';
const RED = '';
const BASEY = window.innerHeight-130;
const VX = 10;
const SW = 10;  // shot width
const SH = 20;  // shot height
const SY = 8;   // change in y direction for a shot
const MINSPEED = 0.2;  //minimum change in x
const EW = 50; // enenmy width in pixels
const EH = 91; // enemy height in pixels
const EY = 3;  // change in y for an enemy ship

var player = {
  x: window.innerWidth/2,
  vx: 0,
  s: 0.95,
  w: 100
};

var score = 0;    // player score
var shots = [];   // shots fired
var enemies = []; // enemies on the field



function init() {
  ship.src = '../img/starship/player.png';
  enemyShip.src = '../img/starship/enemy.png';
  draw();
}


function draw() {
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.fillStyle = GREEN;

  // Any shots fired
  shots.forEach(function(shot) {
    ctx.rect(shot.x, shot.y, SW, SH);
    ctx.stroke();
    ctx.fill();
    shot.y -= SY;
  });

  // Player
  ctx.drawImage(ship, player.x, BASEY);

  // going in the left direction
  if(player.vx < 0) {
    if((player.x + player.vx) > 0) {
      player.x += player.vx;
    }
  }
  else {  // going in the right direction
    if((player.x + player.vx) < (window.innerWidth - player.w)) {
      player.x += player.vx;
    }
  }

  // decrease the speed if it is greater than the minimum speed
  if(Math.abs(player.vx) > MINSPEED) {
    player.vx *= player.s;
  }
  else {
    player.vx = 0;
  }

  // Enemies
  enemies.forEach(function(enemy) {
    ctx.drawImage(enemyShip, enemy.x, enemy.y);
    enemy.y += EY;
  });

  collisions();    // check if any shots collide with enemy ships
  removeObjects(); // remove shots and enemies that moved out of the window

  //setTimeout(draw,1000/60);

  window.requestAnimationFrame(draw);
}

function collisions() {

  shots.forEach(function(shot, index, object) {
    enemies.forEach(function(enemy, index, object) {
      if(shot.y < enemy.y + EH && shot.y > enemy.y) {
        if(shot.x > enemy.x && shot.x < enemy.x + EW) {
          shot.collide = true;
          enemy.hit = true;
          ++score;
          document.getElementById('score').textContent=score;
        }
      }
    });
  });
}

// Remove objects that are outside the window
function removeObjects() {
  shots.forEach(function(shot, index, object) {
    if(shot.y < 0 || shot.collide === true) {
      object.splice(index, 1);
    }
  });
  enemies.forEach(function(enemy, index, object) {
    if(enemy.y > window.innerHeight || enemy.hit === true) {
      object.splice(index, 1);
    }
  });
}




// Keyboard event listener
window.addEventListener('keydown', playerCommand, false);

function playerCommand(e) {
    switch(e.keyCode) {
        case 32:   //spacebar
          shots.push({
            x: player.x + (player.w/2),
            y: BASEY,
            collide: false
           });
          break;
        case 37:   // left arrow
          player.vx = -VX;
          break;
        case 39:   // right arrow
          player.vx = VX;
          break;
    }
}


// Generate a wave of enemies every 10 seconds
window.setInterval(function() {
  let total = Math.floor(Math.random() * 3) + 3;
  for(let i=0; i<total; ++i) {
    let x = Math.floor(Math.random() * (window.innerWidth - player.w)) + 10;
    enemies.push({
      x: x,
      y: 0,
      hit: false
    });
  }

}, 10000);

window.onload = function () {
  ctx = document.getElementById('game').getContext('2d');
  init();
}
