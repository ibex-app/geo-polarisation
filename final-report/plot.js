const plot_line = (data_, id) => {
    // create canvas dom, with id
    let canvas = document.createElement('canvas');
    canvas.id = id;
    document.getElementById('content').appendChild(canvas);
    new Chart(
    document.getElementById(id),
    {
      type: 'line',
      options: {
        animation: false,
        plugins: {
          legend: {
            boxWidth: 16,
            position: "right"
          },
          tooltip: {
            enabled: true
          }
        }
      },
      data: {
        labels: monthes,
        datasets: data_.map(d => ({
            label: d.label,
            data: d.data,
        }))
    }
    }
);

}


const plot_bar = (data_, id) => {
  // create canvas dom, with id
  let canvas = document.createElement('canvas');
  canvas.id = id;
  document.getElementById('content').appendChild(canvas);
  new Chart(
  document.getElementById(id),
  {
    type: 'bar',
    options: {
      animation: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      },
      plugins: {
        legend: {
          boxWidth: 16,
          position: "right"
        },
        tooltip: {
          enabled: true
        }
      }
    },
    data: {
      labels: monthes,
      datasets: data_.map(d => ({
          label: d.label,
          data: d.data,
      }))
  }
  }
);
}

const title = (title) => {
  let h1 = document.createElement('h1');
  h1.innerHTML = title;
  document.getElementById('content').appendChild(h1);

}