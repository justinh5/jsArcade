// require('normalize.css/normalize.css');
require('@/styles/main.css');
require('@/styles/labyrinth.css');
import up from '../assets/img/up.gif';
import down from '../assets/img/down.gif';
import left from '../assets/img/left.gif';
import right from '../assets/img/right.gif';
import $ from 'jquery';

var maze = [];
var player = [0, 0];


function neighbor(row, col) {

  let neighbors = [];
  if(row + 1 < maze.length) {
    if(maze[row + 1][col] === 0) {
      neighbors.push([(row + 1), col, "bottom"]);
    }
  }
  if(row - 1 > -1) {
    if(maze[row - 1][col] === 0) {
      neighbors.push([(row - 1), col, "top"]);
    }
  }
  if (col + 1 < maze[0].length) {
    if (maze[row][col + 1] === 0) {
      neighbors.push([row, (col+1), "right"]);
    }
  }
  if (col - 1 > -1) {
    if (maze[row][col - 1] === 0) {
      neighbors.push([row, (col-1), "left"]);
    }
  }
  return neighbors;
}

function makePath(row, col) {

  maze[row][col] = 1;

  let neighbors = true;
  while(neighbors === true) {
    let neighborList = neighbor(row, col);
    if(neighborList.length > 0) {
      let neighbor = neighborList[Math.floor(Math.random() * neighborList.length)];
      let tr = neighbor[0];
      let tc = neighbor[1];
      removeWall(row, col, neighbor[2]);
      makePath(tr, tc);
    }
    else {
      neighbors = false;
    }
  }
  return;
}


function removeWall(row, col, direction) {

  switch(direction) {
    case "right":
      $("#" + row + "-" + col).addClass("no-right");
      if(col < maze[0].length-1) $("#" + row + "-" + (col+1)).addClass("no-left");
      break;
    case "left":
      $("#" + row + "-" + col).addClass("no-left");
      if(col > 0) $("#" + row + "-" + (col-1)).addClass("no-right");
      break;
    case "top":
      $("#" + row + "-" + col).addClass("no-top");
      if(row > 0) $("#" + (row-1) + "-" + col).addClass("no-bottom");
      break;
    case "bottom":
      $("#" + row + "-" + col).addClass("no-bottom");
      if(row < maze.length-1) $("#" + (row+1) + "-" + col).addClass("no-top");
      break;
  }
}


$(document).ready(function() {

  $("#generate").click(function() {

    var width = $("#maze").width();

    // Reset maze array
    maze = [];
    let input = parseInt($("#size").val());
    for(var i = 0; i < input; ++i) {
      let arr = [];
      for(var j = 0; j < input; ++j) {
        arr.push(0);
      }
      maze.push(arr);
    }

    // reset HTML table
    $("tr").remove();
    for(let i = 0; i < input; ++i) {

      let data = '';
      for(let j = 0; j < input; ++j) {
        data += ("<td id=" + i + "-" + j + "></td>");
      }

      $("#maze").append("<tr>" + data + "</tr>");
    }

    // break down walls
    makePath(0, 0);

    // remove start and finish walls and set player at starting point
    $("#0-0").addClass("no-top");
    $("#" + (maze.length-1) + "-" + (maze[0].length-1)).addClass("no-right");
    $("#0-0").html("<div class=square><img id='player' src=" + "../assets/img/down.gif" + "></div>");
    $("#player-img").html("<img id='player' src=" + "../assets/img/down.gif" + ">");
    $("#steps").text("0");
    $("#finish").show();
    player = [0, 0];
  });
});


$(document).keydown(function(e) {
    if(maze.length > 0) {
      let current = $("#" + player[0] + "-" + player[1]);
      let img = null, steps = parseInt($("#steps").text());
      switch(e.which) {
        case 37: // left
          if(player[1] > 0 && current.css("border-left-width") === "0px") {
            $("#" + player[0] + "-" + player[1]).empty();
            img = "left";
            --player[1];
          }
          break;
        case 38: // up
          if(player[0] > 0 && current.css("border-top-width") === "0px") {
            $("#" + player[0] + "-" + player[1]).empty();
            img = "up";
            --player[0];
          }
          break;
        case 39: // right
          if(player[1] < maze[0].length-1 && current.css("border-right-width") === "0px") {
            $("#" + player[0] + "-" + player[1]).empty();
            img = "right";
            ++player[1];
          }
          break;
        case 40: // down
          if(player[0] < maze.length-1 && current.css("border-bottom-width") === "0px") {
            $("#" + player[0] + "-" + player[1]).empty();
            img = "down";
            ++player[0];
          }
          break;
        default: return; // exit this handler for other keys
      }
      if(img) {
        $("#player-img").html("<img id='player' src=" + "../assets/img/"+img+".gif" + ">");
        $("#" + player[0] + "-" + player[1]).html("<div class=square><img id='player' src=" + "../assets/img/"+img+".gif" + "></div>");
        $("#steps").text(++steps);
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    }
});
