function createRandomColor() {
  let color = Math.floor(Math.random() * 16777215).toString(16);
  color = "#" + ("000000" + color).slice(-6);
  return color;
}

class Page {
  constructor(x, y, id) {
    this.id = id;
    this.color = createRandomColor();
    this.x = x;
    this.y = y;
    this.rank = 0.25;
    this.prevSize = 0;
    this.linkToOthers = [];
    this.numberOfLinkToOthers = 0;
  }
  move(x, y) {
    this.x = x;
    this.y = y;
  }

  removeFromLinks(id) {
    if (this.linkToOthers[id] != 0) this.numberOfLinkToOthers--;

    this.linkToOthers.splice(id, 1);
  }
  addNewPageToLinks() {
    this.linkToOthers.push(0);
  }

  linkToOtherPage(position) {
    this.numberOfLinkToOthers++;
    this.linkToOthers[position] = 1;
  }
  unlinkToOtherPage(position) {
    this.numberOfLinkToOthers--;
    this.linkToOthers[position] = 0;
  }
  getLinkRelevance(position) {
    return this.linkToOthers[position] / this.numberOfLinkToOthers;
  }
}
