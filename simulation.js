let pages = [];
function createPage(x, y) {
  var newPage = new Page(x, y, pages.length);

  pages.forEach((page) => {
    newPage.addNewPageToLinks();
    page.addNewPageToLinks();
  });
  newPage.addNewPageToLinks();

  pages.push(newPage);
  return newPage;
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
  console.log(pages);
}

let links = [];

function getLinks() {
  var allLinks = [];
  for (let i = 0; i < pages.length; i++) {
    let currentPageLinks = [];
    for (let j = 0; j < pages.length; j++) {
      currentPageLinks.push(pages[j].getLinkRelevance(i));
    }
    allLinks.push(currentPageLinks);
  }

  return allLinks;
}
function startSimulation() {
  isSimulationWorking = true;
  links = getLinks();

  // put 16 for 60 fps
  setInterval(updateSimulation, 1000);
}

function getOldRanks() {
  var ranks = [];
  for (let i = 0; i < pages.length; i++) {
    const element = pages[i];
    ranks.push(element.rank);
  }
  return ranks;
}

function updateSimulation() {
  var oldRanks = [];
  oldRanks = getOldRanks();
  for (let i = 0; i < pages.length; i++) {
    let newRank = 0;
    for (let j = 0; j < pages.length; j++) {
      newRank += links[i][j] * oldRanks[j];
    }

    pages[i].rank = newRank;
  }
}

//helpers

let isSimulationWorking = false;
let isAdding = false;
let isRemoving = false;
let isConnecting = false;
let addingPage = null;
function addPage() {
  if (isSimulationWorking) return;
  isAdding = true;
  isRemoving = false;
  isConnecting = false;
  addingPage = createPage(10, 10);
  updateCanvas();
}

function removePage() {
  if (isSimulationWorking) return;
  canvas.style.cursor = "not-allowed";
  isRemoving = true;
  isConnecting = false;
  isAdding = false;
}

setInterval(updateCanvas, 16);
