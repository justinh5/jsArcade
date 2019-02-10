var maze = [];


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

    //reset HTML table
    $("tr").remove();
    for(let i = 0; i < input; ++i) {

      let data = '';
      for(let j = 0; j < input; ++j) {
        data += ("<td id=" + i + "-" + j + "></td>");
      }

      $("#maze").append("<tr>" + data + "</tr>");
    }
    $("td").css("width", (width/input) + "px");
    $("td").css("height", (width/input) + "px");

    //break down walls
    makePath(0, 0);

  });
});
