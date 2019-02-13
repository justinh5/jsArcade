

function Board() {
  this.pieces = [];
  this.currentPlayer = 2;
  this.player1score = 0;
  this.player2score = 0;
}

function Piece(row, col, player) {
  this.row = row;
  this.col = col;
  this.player = player;
  this.captured = false;
  this.king = false;
}

Board.prototype.initializePieces = function() {
  let pieces = [];

  //odd cells
  for(let i=0; i<8; i+=2) {
    pieces.push(new Piece(1, i, 1));
    pieces.push(new Piece(5, i, 2));
    pieces.push(new Piece(7, i, 2));
  }
  //even cells
  for(let i=1; i<8; i+=2) {
    pieces.push(new Piece(0, i, 1));
    pieces.push(new Piece(2, i, 1));
    pieces.push(new Piece(6, i, 2));
  }
  return pieces;
}

Board.prototype.reset = function() {
  this.pieces = this.initializePieces();
  this.currentPlayer = 2;
  this.player1score = 0;
  this.player2score = 0;
}

Board.prototype.getPiece = function(row, col) {
  let foundPiece = null;
  this.pieces.forEach(function(piece) {
    if(piece.row === row && piece.col === col && piece.captured === false)
      foundPiece = piece;
  });
  return foundPiece;
}

Board.prototype.currentPiece = function(cell) {
  let row = parseInt(cell.charAt(0));     //cell row
  let column = parseInt(cell.charAt(1));  //cell column
  let piece = this.getPiece(row, column);
  if(piece !== null) {
    return (piece.player === this.currentPlayer);
  }
  return false;
}

Board.prototype.movePiece = function(selectedCell, targetCell) {
  let sr = parseInt(selectedCell.charAt(0));     //cell row
  let sc = parseInt(selectedCell.charAt(1));     //cell column
  let tr = parseInt(targetCell.charAt(0));       //cell row
  let tc = parseInt(targetCell.charAt(1));       //cell column
  let selectedPiece = this.getPiece(sr, sc);
  selectedPiece.row = tr;
  selectedPiece.col = tc;
  let king = false;

  //check for king conversion
  if(selectedPiece.king === false) {
    if(selectedPiece.player === 1 && selectedPiece.row === 7) {
      selectedPiece.king = true;
      king = true;
    }
    else if(selectedPiece.player === 2 && selectedPiece.row === 0){
      selectedPiece.king = true;
      king = true;
    }
  }
  this.updateScores();    //update scores
  this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1;
  return king;
}

Board.prototype.updateScores = function() {
  let player1 = 0;
  let player2 = 0;
  this.pieces.forEach(piece => {
    if(piece.player === 1 && piece.captured === true)  ++player2;
    if(piece.player === 2 && piece.captured === true)  ++player1;
  });
  this.player1score = player1;
  this.player2score = player2;
}


Board.prototype.validate = function(selectedCell, targetCell) {

  //selected
  let sr = parseInt(selectedCell.charAt(0));     //cell row
  let sc = parseInt(selectedCell.charAt(1));     //cell column

  //target
  let tr = parseInt(targetCell.charAt(0));       //cell row
  let tc = parseInt(targetCell.charAt(1));       //cell column

  let selectedPiece = this.getPiece(sr, sc);     // piece to move
  let opponent = (this.currentPlayer === 1) ? 2 : 1;
  let direction = tr-sr;
  let valid = false;

  if(this.getPiece(tr, tc) === null) {  // if empty cell was selected
    //moves in the northern direction
    if (this.currentPlayer === 2 || selectedPiece.king === true) {
      // move without capture
      if((tr === sr-1) && (tc === sc+1 || tc === sc-1)) {
        valid = true;
      }
      // single capture
      else if(tr === sr-2) {
        if(tc === sc+2) {
          if(this.getPiece(sr-1, sc+1).player === opponent) {
            this.getPiece(sr-1, sc+1).captured = true;
            valid = true;
          }
        }
        else if(tc === sc-2) {
          if(this.getPiece(sr-1, sc-1).player === opponent) {
            this.getPiece(sr-1, sc-1).captured = true;
            valid = true;
          }
        }
      }
      // double capture
      else if(tr === sr-4) {
        if(tc === sc+4) {
          let first = this.getPiece(sr-1, sc+1);
          let blankSpace = this.getPiece(sr-2, sc+2);
          let second = this.getPiece(sr-3, sc+3);
          if(first !== null && second !== null && blankSpace === null) {
            if(first.player === opponent && second.player === opponent){
              first.captured = true;
              second.captured = true;
              valid = true;
            }
          }
        }
        else if(tc === sc-4) {
          let first = this.getPiece(sr-1, sc-1);
          let blankSpace = this.getPiece(sr-2, sc-2);
          let second = this.getPiece(sr-3, sc-3);
          if(first !== null && second !== null && blankSpace === null) {
            if(first.player === opponent && second.player === opponent){
              first.captured = true;
              second.captured = true;
              valid = true;
            }
          }
        }
        else if(tc === sc) {
          let firstLeft = this.getPiece(sr-1, sc-1);
          let blankSpaceLeft = this.getPiece(sr-2, sc-2);
          let secondLeft = this.getPiece(sr-3, sc-1);
          let firstRight = this.getPiece(sr-1, sc+1);
          let blankSpaceRight = this.getPiece(sr-2, sc+2);
          let secondRight = this.getPiece(sr-3, sc+1);
          if(firstLeft !== null && secondLeft !== null && blankSpaceLeft === null) {
            if(firstLeft.player === opponent && secondLeft.player === opponent){
              firstLeft.captured = true;
              secondLeft.captured = true;
              valid = true;
            }
          }
          else if(firstRight !== null && secondRight !== null && blankSpaceRight === null) {
            if(firstRight.player === opponent && secondRight.player === opponent){
              firstRight.captured = true;
              secondRight.captured = true;
              valid = true;
            }
          }
        }
      }
    }
    // moves in the southern direction
    if (this.currentPlayer === 1 || selectedPiece.king === true) {
      // move without capture
      if((tr === sr+1) && ((tc === sc-1) || (tc === sc+1))) {
        valid = true;
      }
      // single capture
      else if(tr === sr+2) {
        if(tc === sc-2) {
          if(this.getPiece(sr+1, sc-1).player === opponent) {
            this.getPiece(sr+1, sc-1).captured = true;
            valid = true;
          }
        }
        else if(tc === sc+2) {
          if(this.getPiece(sr+1, sc+1).player === opponent) {
            this.getPiece(sr+1, sc+1).captured = true;
            valid = true;
          }
        }
      }
      // double capture
      else if(tr === sr+4) {
        if(tc === sc+4) {
          let first = this.getPiece(sr+1, sc+1);
          let blankSpace = this.getPiece(sr+2, sc+2);
          let second = this.getPiece(sr+3, sc+3);
          if(first !== null && second !== null && blankSpace === null) {
            if(first.player === opponent && second.player === opponent){
              first.captured = true;
              second.captured = true;
              valid = true;
            }
          }
        }
        else if(tc === sc-4) {
          let first = this.getPiece(sr+1, sc-1);
          let blankSpace = this.getPiece(sr+2, sc-2);
          let second = this.getPiece(sr+3, sc-3);
          if(first !== null && second !== null && blankSpace === null) {
            if(first.player === opponent && second.player === opponent){
              first.captured = true;
              second.captured = true;
              valid = true;
            }
          }
        }
        else if(tc === sc) {
          let firstLeft = this.getPiece(sr+1, sc-1);
          let blankSpaceLeft = this.getPiece(sr+2, sc-2);
          let secondLeft = this.getPiece(sr+3, sc-1);
          let firstRight = this.getPiece(sr+1, sc+1);
          let blankSpaceRight = this.getPiece(sr+2, sc+2);
          let secondRight = this.getPiece(sr+3, sc+1);
          if(firstLeft !== null && secondLeft !== null && blankSpaceLeft === null) {
            if(firstLeft.player === opponent && secondLeft.player === opponent) {
              firstLeft.captured = true;
              secondLeft.captured = true;
              valid = true;
            }
          }
          else if(firstRight !== null && secondRight !== null && blankSpaceRight === null) {
            if(firstRight.player === opponent && secondRight.player === opponent) {
              firstRight.captured = true;
              secondRight.captured = true;
              valid = true;
            }
          }
        }
      }
    }
    // king only moves
    if(selectedPiece.king === true) {
      if(sr === tr) {
        if(tc === sc-4) {  //double horizontal capture west
          let firstUp = this.getPiece(sr-1, sc-1);
          let blankSpaceUp = this.getPiece(sr-2, sc-2);
          let secondUp = this.getPiece(sr-1, sc-3);
          let firstDown = this.getPiece(sr+1, sc-1);
          let blankSpaceDown = this.getPiece(sr+2, sc-2);
          let secondDown = this.getPiece(sr+1, sc-3);
          if(firstUp !== null && secondUp !== null && blankSpaceUp === null) {
            if(firstUp.player === opponent && secondUp.player === opponent){
              firstUp.captured = true;
              secondUp.captured = true;
              valid = true;
            }
          }
          else if(firstDown !== null && secondDown !== null && blankSpaceDown === null) {
            if(firstDown.player === opponent && secondDown.player === opponent) {
              firstDown.captured = true;
              secondDown.captured = true;
              valid = true;
            }
          }
        }
        else if(tc === sc+4) {  //double horizontal capture east
          let firstUp = this.getPiece(sr-1, sc+1);
          let blankSpaceUp = this.getPiece(sr-2, sc+2);
          let secondUp = this.getPiece(sr-1, sc+3);
          let firstDown = this.getPiece(sr+1, sc+1);
          let blankSpaceDown = this.getPiece(sr+2, sc+2);
          let secondDown = this.getPiece(sr+1, sc+3);
          if(firstUp !== null && secondUp !== null && blankSpaceUp === null) {
            if(firstUp.player === opponent && secondUp.player === opponent) {
              firstUp.captured = true;
              secondUp.captured = true;
              valid = true;
            }
          }
          else if(firstDown !== null && secondDown !== null && blankSpaceDown === null) {
            if(firstDown.player === opponent && secondDown.player === opponent) {
              firstDown.captured = true;
              secondDown.captured = true;
              valid = true;
            }
          }
        }
      }
    }
  }
  return valid;
}


function setBoard(pieces) {

  // first clear the board
  $(".red").remove();
  $(".blue").remove();

  pieces.forEach(function(piece) {
    if(piece.captured === false) {
      let cell = $("#" + piece.row + piece.col);
      let king = (piece.king === true) ? "king" : "";

      switch(piece.player) {
        case 1:
        cell.html("<div class='piece red " + king + "'>");
        break;
        case 2:
        cell.html("<div class='piece blue " + king + "'>");
        break;
      }
    }
  });
}

function displayTurn(board) {

  $("#player1-turn").css("visibility", "hidden");
  $("#player2-turn").css("visibility", "hidden");

  if(board.currentPlayer === 1) {
    $("#player1-turn").css("visibility", "visible");
  }
  else {
    $("#player2-turn").css("visibility", "visible");
  }

  //update scores
  $("#player1score").text(board.player1score);
  $("#player2score").text(board.player2score);
}


$(document).ready(function() {

  // Initialize board
  var selected = false;
  var selectedCell = '';
  var board = new Board();
  board.reset();
  setBoard(board.pieces);
  displayTurn(board);

  $("#board td").click(function(e) {
    var cell = $(this).attr("id");          //clicked cell

    // Highlight piece if it belongs to the current player
    if(board.currentPiece(cell) === true) {
      $(".piece").removeClass("selected");
      $(this).children(":first").addClass("selected");
      selected = true;
      selectedCell = cell;
    }

    // Move a selected piece
    if(selected === true && board.validate(selectedCell, cell)) {
      board.movePiece(selectedCell, cell);
      setBoard(board.pieces);
      displayTurn(board);
      selected = false;
    }
  });

  $("#reset").click(function() {
    board.reset();
    setBoard(board.pieces);
    displayTurn(board);
  });


});
