var graph;
var graphCtx = document.getElementById("graph").getContext("2d");

function AddData() {
  console.log(graph.data.datasets);
  graph.data.labels.push(iteration);
  for (let i = 0; i < graph.data.datasets.length; i++) {
    graph.data.datasets[i].data.push(pages[i].rank * 100);
  }
  graph.update();
}
let datasets = [];

function ResetData() {
  if (graph != null) {
    graph.destroy();
  }
  datasets = [];
  pages.forEach((page) => {
    datasets.push({
      label: page.name,
      data: [page.rank * 100],
      borderColor: page.color,
      backgroundColor: page.color + "33",
      borderWidth: 1,
      pointRadius: 0,
    });
  });
  graph = new Chart(graphCtx, {
    type: "line",
    data: {
      labels: ["0"],
      color: "rgb(255,255,255)",

      datasets: datasets,
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          labels: {
            color: "rgb(220,220,220)",
          },
        },
        title: {
          display: true,
          text: "Page Rank Graph",
          color: "rgb(240,240,240)",
          font: {
            size: 24,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 100,
          },
        },
      },
    },
  });
}

function toggleGraph() {
  document.getElementById("popup-filter").classList.toggle("hidden");
}
