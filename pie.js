pies = [...document.getElementsByClassName('pie')]

pies.forEach(element => {
    data = {
        labels: [
          'Pole A',
          'Neutral',
          'Pole B'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
          backgroundColor: [
            'rgba(22, 160, 133, .4)',
            'rgba(52, 152, 219, .4)',
            'rgba(192, 57, 43, .4)'
          ],
          hoverOffset: 4,
        //   weight: 1 + Math.floor(Math.random() * 5),
        }]
      };
    element.setAttribute('height',  Math.floor(Math.random() * 125))
    config = {
        type: 'pie',
        data: data,
        options: {
            radiusPercentage:  0.1 + Math.floor(Math.random() * 10)/10,
            radius: 10 + Math.floor(Math.random() * 45),
            // radius: 55,
            maintainAspectRatio: false,
            plugins: {
                legend: false // Hide legend
            },
        }
    };
    var radarChart = new Chart(element, config);
});