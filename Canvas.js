let canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000; // equals window dimension
canvas.height = 500;

function createCircle(x, y, rank, color, page) {
  page.prevSize = updateSize(page);
  ctx.beginPath();
  ctx.arc(x, y, startingRadius * page.prevSize, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function updateSize(page) {
  if (page.prevSize - page.rank > 0.01) return page.prevSize - 0.002;
  else if (page.prevSize - page.rank < -0.01) return page.prevSize + 0.002;
  else return page.rank;
}

function createConnection(startX, startY, endX, endY, color, page) {
  page.prevSize = updateSize(page);
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth * page.prevSize;
  ctx.setLineDash([4, 2]);
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function updateCanvas() {
  ctx.clearRect(0, 0, 1000, 500);

  if (isConnecting) {
    createConnection(
      pageConnectingFrom.x,
      pageConnectingFrom.y,
      mouseXPos,
      mouseYPos,
      pageConnectingFrom.color,
      pageConnectingFrom
    );
  }
  if (isAdding && addingPage != null) {
    addingPage.move(mouseXPos, mouseYPos);
  }

  pages.forEach((page) => {
    createCircle(page.x, page.y, page.rank, page.color, page);

    for (let index = 0; index < page.linkToOthers.length; index++) {
      if (page.linkToOthers[index] != 0) {
        createConnection(
          page.x,
          page.y,
          pages[index].x,
          pages[index].y,
          page.color,
          page
        );
      }
    }
  });
}
var mouseXPos = 0;
var mouseYPos = 0;

canvas.addEventListener("mousemove", function (e) {
  var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
  mouseXPos = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas
  mouseYPos = Math.round(e.clientY - cRect.top); // from the X/Y positions to make
});

canvas.addEventListener("click", function (e) {
  var cRect = canvas.getBoundingClientRect(); // Gets CSS pos, and width/height
  mouseXPos = Math.round(e.clientX - cRect.left); // Subtract the 'left' of the canvas
  mouseYPos = Math.round(e.clientY - cRect.top); // from the X/Y positions to make

  //TODO: CHECK if there's any page that was clicked on
  if (isAdding) {
    isAdding = false;
    addingPage = null;
  } else if (isRemoving) {
    canvas.style.cursor = "auto";
    var clicked = pages.filter(function (value, index, arr) {
      return (
        Math.abs(value.x - mouseXPos) < 15 && Math.abs(value.y - mouseYPos) < 15
      );
    });
    if (clicked.length != 0) removeFromPages(clicked.sort(sortByDistance)[0]);
  } else if (!isSimulationWorking && !isConnecting) {
    var clickedOn = pages.filter(function (value, index, arr) {
      return (
        Math.abs(value.x - mouseXPos) < 15 && Math.abs(value.y - mouseYPos) < 15
      );
    });

    if (clickedOn.length != 0)
      startConnecting(clickedOn.sort(sortByDistance)[0]);
  } else if (isConnecting) {
    var connection = pages.filter(function (value, index, arr) {
      return (
        Math.abs(value.x - mouseXPos) < 15 && Math.abs(value.y - mouseYPos) < 15
      );
    });

    if (connection.length != 0)
      finishConnection(connection.sort(sortByDistance)[0]);
  }
});

function sortByDistance(x, y) {
  return Math.abs(x - mouseXPos) + Math.abs(y - mouseXPos);
}
function removeFromPages(pageToDelete) {
  console.log(pages);
  pages.forEach((page) => {
    page.removeFromLinks(pageToDelete.id);
  });
  pages.splice(pageToDelete.id, 1);
}

var pageConnectingFrom = null;
function startConnecting(page) {
  isConnecting = true;
  pageConnectingFrom = page;
}

function finishConnection(page) {
  console.log("hey");
  isConnecting = false;

  pageConnectingFrom.linkToOtherPage(page.id);
}
