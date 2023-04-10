// var ctx = document.getElementById("area").getContext("2d");

// ctxes = [...document.getElementsByClassName("area")];



Object.keys(full_dataset).forEach(disc => {

    dataset = full_dataset[disc]
    is_first = true
    Object.keys(dataset).forEach(party => {
      dom = document.querySelector('div[data-disc="'+disc+'"] div[data-party="' + party.replaceAll(' ', '_') + '"] .area')
      dom.parentElement.parentElement.style.display = 'flex'
      let max = Math.max(...Object.keys(dataset).map(k => Math.max(Math.max(...dataset[k].neutral), Math.max(...dataset[k].poleA), Math.max(...dataset[k].poleB))))
      new Chart(dom, {
        type: 'line',
        data: {
          labels: dataset[party].labels,
          datasets: [
            {
              label: 'Pole A',
              data: dataset[party].poleA,
              // borderColor: 'rgb(22, 160, 133)',
              backgroundColor: 'rgb(162, 217, 206)',
              fill: 'origin'
            },
            {
              label: 'Neutral',
              data: dataset[party].neutral,
              // borderColor: 'rgb(52, 152, 219)',
              backgroundColor: 'rgb(201, 201, 201)',
              fill: 'origin'
            },
            {
              label: 'Pole B',
              data: dataset[party].poleB,
              //   borderColor: 'rgb(192, 57, 43)',
              backgroundColor: 'rgb(230,176,170)',
              fill: 'origin'
            }
    
          ]
        },
        options: {
          scales: {
            y: {
              // look at this setting
              stacked: true,
              min: 0,
              max: max + max*0.25,
            }
          },
          plugins: {
            legend: false//is_first // Hide legend
          },
        }
      });
      is_first = false
    })
    })
    