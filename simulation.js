let pages = [];
function createPage(x, y) {
  var newPage = new Page(x, y);
  pages.forEach((page) => {
    page.addNewPageToLinks();
    newPage.addNewPageToLinks();
  });

  pages.push(newPage);
}

function setup() {
  createPage(100, 100);
  createPage(100, 200);
  createPage(200, 100);
  createPage(200, 200);
  setupStartingConnections();
  updateCanvas();
}

function setupStartingConnections() {
  //Not cool code but necessary
  pages[0].linkToOtherPage(1);

  pages[1].linkToOtherPage(0);
  pages[1].linkToOtherPage(2);
  pages[1].linkToOtherPage(3);

  pages[2].linkToOtherPage(0);
  pages[2].linkToOtherPage(3);

  pages[3].linkToOtherPage(0);
  pages[3].linkToOtherPage(1);
}
