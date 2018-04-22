$(document).ready(function() {
  
  // Function to generate random number
  function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

  // Getting board width and height
  const boardWidth = prompt("Please enter Board Width ");
  const boardHeight = prompt("Please enter Board Height ");
  
  // Setting game speed (msec)
  const gameSpeed = 300;
  
  // Generate food count with at max 1/10 th of cells
  let foodCount = parseInt((boardWidth * boardHeight) /10);
  
  // Generate random position. 
  

  const startPosition = {
    x: getRandomArbitrary(0, boardWidth),
    y: getRandomArbitrary(0, boardHeight),
  };

  var board = new Array(boardWidth);

  for(var i = 0; i < boardWidth; i++) {
    board[i] = new Array(boardHeight);
  }
  
  // Array containing cells that has food
  const foodCell = [];
  
  // Filling food cell. same cell can be repeated due to random fn.
  for(var i = 0; i < foodCount; i++) {
    const positionX = getRandomArbitrary(0, boardWidth);
    const positionY = getRandomArbitrary(0, boardHeight);
    
    if(!(startPosition.x == positionX && startPosition.y == positionY)) {
      foodCell.push({
        x: positionX,
        y: positionY,
      });
    }
 
  }

  // App container
  let appContainer = $('.appContainer');

  // Make an empty board
  for(var i = 0; i < boardWidth; i++) {
    for(var j = 0; j < boardHeight; j++) {
      board[i][j] = {
        x: i,
        y: j,
        isHavingFood: false,
      }
    }
  }

  foodCount = 0;
  // Assign cells with food
  for(var i = 0; i < foodCell.length; i++) {
    if(!board[foodCell[i].x][foodCell[i].y].isHavingFood) {
      board[foodCell[i].x][foodCell[i].y].isHavingFood = true;
      foodCount = foodCount + 1;
    }
    board[foodCell[i].x][foodCell[i].y].isHavingFood = true;
  }

  // Generate Board content
  let boardContent = "<div class = 'board'>";

  for(var i = 0; i < boardWidth; i++) {
    let rowContent = "<div class = 'row row-" + i + "'>\n";
    for(var j = 0; j < boardHeight; j++) {
      const additionalClass = board[i][j].isHavingFood ? 'food' : '';
      rowContent += "<div class = 'cell " + "row-" + i + " col-" + j + " " + additionalClass + " '" + "></div>" + "\n";
    }
    rowContent += "</div>";
    boardContent += rowContent;
  }

  appContainer.html(boardContent);
  
  let currentPosition = {
    x: startPosition.x,
    y: startPosition.y,
  };
  
  let marioLocationClass = '.row-' + currentPosition.x + '.col-' + currentPosition.y;
  $(marioLocationClass).addClass('mario-location');
  
  // Your Code Here 
  
  let gamePoint = 0;
  let totalMove = 0;
  
  function keyNav(e) {
    e = e || window.event;
    switch(e.keyCode) {
      case 37:
        $(".cell").removeClass('mario-location');
        if(currentPosition.y > 0) {
          totalMove += 1;
          console.log(totalMove);
        }
        currentPosition = {
          x: currentPosition.x,
          y: currentPosition.y <= 0 ? currentPosition.y : currentPosition.y-1
        };
    }
    switch(e.keyCode) {
      case 38:
        $(".cell").removeClass('mario-location');
        if(currentPosition.x > 0) {
          totalMove += 1;
          console.log(totalMove);
        }
        currentPosition = {
          x: currentPosition.x <= 0 ? currentPosition.x : currentPosition.x-1,
          y: currentPosition.y
        };
    }
    switch(e.keyCode) {
      case 39:
        $(".cell").removeClass('mario-location');
        if(currentPosition.y < boardWidth-1) {
          totalMove += 1;
          console.log(totalMove);
        }
        currentPosition = {
          x: currentPosition.x,
          y: currentPosition.y >= boardWidth-1 ? currentPosition.y : currentPosition.y+1
        };
    }
    switch(e.keyCode) {
      case 40:
        $(".cell").removeClass('mario-location');
        if(currentPosition.x < boardHeight-1) {
          totalMove += 1;
          console.log(totalMove);
        }
        currentPosition = {
          x: currentPosition.x >= boardHeight-1 ? currentPosition.x : currentPosition.x+1,
          y: currentPosition.y
        };
    }
    let marioLocationClass = '.row-' + currentPosition.x + '.col-' + currentPosition.y;
    $(marioLocationClass).addClass('mario-location');
    if($('.row-' + currentPosition.x + '.col-' + currentPosition.y).hasClass("food")){
      gamePoint += 1;
      if(gamePoint == foodCount) {
        setTimeout(() => {
          alert("Game over. Total moves to save princess " + totalMove);
        });
      }
      $('.row-' + currentPosition.x + '.col-' + currentPosition.y).removeClass("food");
    }
  }

  document.onkeydown = keyNav;
  
});