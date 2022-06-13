let canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000; // equals window dimension
canvas.height = 500;

function createCircle(x, y, rank, color) {
  ctx.beginPath();
  ctx.arc(x, y, startingRadius * rank, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function createConnection(startX, startY, endX, endY, color) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 5]);
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function updateCanvas() {
  console.log(pages);
  pages.forEach((page) => {
    createCircle(page.x, page.y, page.rank, page.color);

    for (let index = 0; index < page.linkToOthers.length; index++) {
      if (page.linkToOthers[index] != 0) {
        console.log("hey");
        createConnection(
          page.x,
          page.y,
          pages[index].x,
          pages[index].y,
          page.color
        );
      }
    }
  });
}
// setInterval(setup, 16);
