pie_data = {'გირჩი': {'Pole A': 0, 'Pole B': 0, 'Neutral': 24},
'ერი': {'Pole A': 0, 'Pole B': 0, 'Neutral': 0},
'ქართული ოცნება': {'Pole A': 3, 'Pole B': 18, 'Neutral': 20},
'საქართველოსთვის': {'Pole A': 0, 'Pole B': 0, 'Neutral': 3},
'ერთიანი ნაციონალური მოძრაობა': {'Pole A': 171, 'Pole B': 1, 'Neutral': 67},
'ხალხისთვის': {'Pole A': 0, 'Pole B': 0, 'Neutral': 0},
'სტრატეგია აღმაშენებელი': {'Pole A': 12, 'Pole B': 1, 'Neutral': 6},
'მოქალაქეები': {'Pole A': 0, 'Pole B': 0, 'Neutral': 3},
'კონსერვატიული მოძრაობა': {'Pole A': 4, 'Pole B': 6, 'Neutral': 155},
'ხალხის ძალა': {'Pole A': 15, 'Pole B': 59, 'Neutral': 105},
'ევროპული საქართველო - მოძრაობა თავისუფლებისთვის': {'Pole A': 0,
 'Pole B': 0,
 'Neutral': 0},
'პატრიოტთა ალიანსი': {'Pole A': 4, 'Pole B': 2, 'Neutral': 5},
'ლელო': {'Pole A': 1, 'Pole B': 1, 'Neutral': 2},
'გირჩი - მეტი თავისუფლება': {'Pole A': 2, 'Pole B': 1, 'Neutral': 4},
'ლეიბორისტული პარტია': {'Pole A': 1, 'Pole B': 0, 'Neutral': 2},
'დროა': {'Pole A': 3, 'Pole B': 0, 'Neutral': 0}}

const drow_pie = (party) => {
  dom = document.querySelectorAll('div[data-party="'+party.replaceAll(' ', '_')+'"] .pie')[3]
  console.log(dom)

    data = {
      labels: [
        'Pole A',
        'Neutral',
        'Pole B'
      ],
      datasets: [{
        label: party,
        data: [pie_data[party]['Pole A'], pie_data[party]['Neutral'], pie_data[party]['Pole B']],
        backgroundColor: [
          'rgb(162, 217, 206)',
        'rgb(201, 201, 201)',
        'rgb(230,176,170)'
        ],
        hoverOffset: 4,
      //   weight: 1 + Math.floor(Math.random() * 5),
      }]
    };
    // dom.setAttribute('height',  Math.floor(Math.random() * 125))
    config = {
      type: 'pie',
      data: data,
      options: {
          // radiusPercentage:  0.1 + Math.floor(Math.random() * 10)/10,
          radius: 15 + .2*(pie_data[party]['Pole A'] + pie_data[party]['Pole B'] + pie_data[party]['Neutral']),
          // radius: 55,
          maintainAspectRatio: false,
          plugins: {
              legend: false // Hide legend
          },
      }
  };
  var radarChart = new Chart(dom, config);

}

Object.keys(pie_data).forEach(drow_pie)



