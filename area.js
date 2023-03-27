// var ctx = document.getElementById("area").getContext("2d");

ctxes = [...document.getElementsByClassName("area")];

is_first = true
ctxes.forEach(dom => {
    
    new Chart(dom, {
        type: 'line',
        data: {
          labels:Array.from(new Array(40),(val,index)=> "Week " + index ),
          datasets: [
            {
              label: 'Pro-West',
                data: Array.from({length: 40}, () => 20 + Math.floor(Math.random() * 80)),
                // borderColor: 'rgb(22, 160, 133)',
                backgroundColor: 'rgba(22, 160, 133, .4)',
                fill: 'origin'
            },
            {
              label: 'Neutral',
              data: Array.from({length: 40}, () => Math.floor(Math.random() * 40)),
                // borderColor: 'rgb(52, 152, 219)',
                backgroundColor: 'rgba(52, 152, 219, .4)',
                fill: 'origin'
            },
            {
                label: 'Anti-West',
                data: Array.from({length: 40}, () => Math.floor(Math.random() * 100)),
                //   borderColor: 'rgb(192, 57, 43)',
                  backgroundColor: 'rgba(192, 57, 43, .4)',
                  fill: 'origin'
              }

          ]
        },
        options: {
            scales: {
                y: {
                  // look at this setting
                  stacked: true,
                }
              },
            plugins: {
                legend: is_first // Hide legend
            },
        }
      });
      is_first = false
});