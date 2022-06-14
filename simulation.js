let pages = [];
function createPage(x, y) {
  var name = "";
  if (names.length != 0) {
    name = names[Math.floor(Math.random() * names.length)][1];
  }
  var newPage = new Page(x, y, pages.length, name);

  pages.forEach((page) => {
    newPage.addNewPageToLinks();
    page.addNewPageToLinks();
  });
  newPage.addNewPageToLinks();

  pages.push(newPage);
  updateTableRank();
  return newPage;
}

function setup() {
  createPage(400, 150);
  createPage(400, 250);
  createPage(500, 150);
  createPage(500, 250);
  setupStartingConnections();
  updateCanvas();
  updateTableRank();
  ResetData();
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
  if (isSimulationWorking) return;

  ResetData();

  isSimulationWorking = true;
  links = getLinks();
  updateTableRank();
  // put 16 for 60 fps
  simInterval = setInterval(updateSimulation, 1000);
}
var simInterval = null;
function getOldRanks() {
  var ranks = [];
  for (let i = 0; i < pages.length; i++) {
    const element = pages[i];
    ranks.push(element.rank);
  }
  return ranks;
}

function updateSimulation() {
  iteration++;
  var oldRanks = [];
  oldRanks = getOldRanks();
  for (let i = 0; i < pages.length; i++) {
    let newRank = 0;
    for (let j = 0; j < pages.length; j++) {
      newRank += links[i][j] * oldRanks[j];
    }
    pages[i].rankOverTime.push(pages[i].rank);
    pages[i].rank = newRank;
  }
  document.getElementById("counter").innerHTML = "Round: " + iteration;
  updateTableRank();
  AddData();
}
function Reset() {
  restartSimulation();
  pages = [];
  setup();
}
function restartSimulation() {
  isSimulationWorking = false;
  pages.forEach((page) => {
    page.rank = 0.25;
  });
  clearInterval(simInterval);
  updateTableRank();
  iteration = 0;
}
//helpers
var iteration = 0;
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
let names = [];
function fetchNames() {
  fetch("websites.json")
    .then((res) => res.json())
    .then((res) => {
      names = res["aaData"];
      setup();
    });
}

var tableRank = document.getElementById("elements");
function updateTableRank() {
  tableRank.innerHTML = `<tr>
  <th>Id</th>
  <th>Rank Pos</th>
  <th>Url</th>
  <th>%</th>
</tr>`;
  var ordered = [...pages];
  ordered.sort((a, b) => b.rank - a.rank);
  var i = 1;
  ordered.forEach((element) => {
    let rank = element.rank * 100;

    tableRank.innerHTML +=
      `<tr>
              <td  style="color:` +
      element.color +
      `;">` +
      element.id +
      `</td>
              <td  style="color:` +
      element.color +
      `;">` +
      i +
      `</td>
              <td  style="color:` +
      element.color +
      `;">` +
      element.name +
      `</td>
              <td  style="color:` +
      element.color +
      `;">` +
      Math.round((rank + Number.EPSILON) * 1000) / 1000 +
      `%</td>
            </tr>`;
    i++;
  });
}

function toggleSimulation() {
  if (!isSimulationWorking) {
    document.getElementById("toggle-sim-btn").innerHTML = "Stop  Simulation";

    startSimulation();
  } else {
    restartSimulation();
    document.getElementById("toggle-sim-btn").innerHTML = "Start Simulation";
  }
}
