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
  if (page.prevSize - page.rank > 0.01) return page.prevSize - 0.001;
  else if (page.prevSize - page.rank < -0.01) return page.prevSize + 0.001;
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
