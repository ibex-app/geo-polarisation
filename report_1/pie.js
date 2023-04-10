const get_dataset = (dataset, type) => {
  if (type == 'count'){
    pole_a = dataset['Pole A']['count']
    neutral = dataset['Neutral']['count']
    pole_b = dataset['Pole B']['count']
    scale = 0.08
  } else if (type == 'engage'){
    pole_a = dataset['Pole A']['viewCount'] + dataset['Pole A']['favoriteCount'] + dataset['Pole A']['shareCount'] + dataset['Pole A']['loveCount'] + dataset['Pole A']['wowCount'] + dataset['Pole A']['hahaCount'] + dataset['Pole A']['sadCount'] + dataset['Pole A']['angryCount'] + dataset['Pole A']['thankfulCount'] + dataset['Pole A']['careCount'] + dataset['Pole A']['likeCount'] + dataset['Pole A']['commentCount']
    neutral = dataset['Neutral']['viewCount'] + dataset['Neutral']['favoriteCount'] + dataset['Neutral']['shareCount'] + dataset['Neutral']['loveCount'] + dataset['Neutral']['wowCount'] + dataset['Neutral']['hahaCount'] + dataset['Neutral']['sadCount'] + dataset['Neutral']['angryCount'] + dataset['Neutral']['thankfulCount'] + dataset['Neutral']['careCount'] + dataset['Neutral']['likeCount'] + dataset['Neutral']['commentCount']
    pole_b = dataset['Pole B']['viewCount'] + dataset['Pole B']['favoriteCount'] + dataset['Pole B']['shareCount'] + dataset['Pole B']['loveCount'] + dataset['Pole B']['wowCount'] + dataset['Pole B']['hahaCount'] + dataset['Pole B']['sadCount'] + dataset['Pole B']['angryCount'] + dataset['Pole B']['thankfulCount'] + dataset['Pole B']['careCount'] + dataset['Pole B']['likeCount'] + dataset['Pole B']['commentCount']
    scale = 0.00013
  } else if(type == 'pos'){
    pole_a = dataset['Pole A']['favoriteCount']   + dataset['Pole A']['loveCount'] + dataset['Pole A']['wowCount']      + dataset['Pole A']['thankfulCount'] + dataset['Pole A']['careCount'] + dataset['Pole A']['likeCount'] 
    neutral = dataset['Neutral']['favoriteCount']  + dataset['Neutral']['loveCount'] + dataset['Neutral']['wowCount']  + dataset['Neutral']['thankfulCount'] + dataset['Neutral']['careCount'] + dataset['Neutral']['likeCount'] 
    pole_b = dataset['Pole B']['favoriteCount']  + dataset['Pole B']['loveCount'] + dataset['Pole B']['wowCount']    + dataset['Pole B']['thankfulCount'] + dataset['Pole B']['careCount'] + dataset['Pole B']['likeCount']      
    scale = 0.00013
  } else if (type == 'neg'){
    pole_a =    dataset['Pole A']['hahaCount'] + dataset['Pole A']['sadCount'] + dataset['Pole A']['angryCount'] 
    neutral =  dataset['Neutral']['hahaCount'] + dataset['Neutral']['sadCount'] + dataset['Neutral']['angryCount']
    pole_b =   dataset['Pole B']['hahaCount'] + dataset['Pole B']['sadCount'] + dataset['Pole B']['angryCount']
    scale = 0.00015
  }
  return {
    'pole_a': pole_a,
    'neutral': neutral,
    'pole_b': pole_b,
    'scale': scale,
  }
}

const draw_one_pie = (dataset, dom_, party, type) => {
  dataset_ = get_dataset(dataset, type)
  
  pole_a = dataset_['pole_a']
  neutral = dataset_['neutral']
  pole_b = dataset_['pole_b']
  scale = dataset_['scale']
  
  data = {
    labels: [
      'Pole A',
      'Neutral',
      'Pole B'
    ],
    datasets: [{
      label: party,
      data: [pole_a, neutral, pole_b],
      backgroundColor: [
        'rgba(22, 160, 133, .7)',
        'rgb(201, 201, 201)',
        'rgba(192, 57, 43, .7)'
        // 'rgb(162, 217, 206)',
        // 'rgb(230,176,170)'
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
      layout: {
        // padding: 50
      },
      // radiusPercentage:  0.1 + Math.floor(Math.random() * 10)/10,
      // radius: 15 + .0001 * (pole_a + neutral + pole_b),
      radius: 10 + scale * (pole_a + neutral + pole_b),
      // radius: 55,
      maintainAspectRatio: false,
      plugins: {
        legend: false // Hide legend
      },
      elements: {
        arc: {
            borderWidth: .7
        }
      }
    }
  };
  return new Chart(dom_, config);
}

charts = {}

const drow_pie = (party) => {
  // console.log(party)
  charts[party] = []
  dom = document.querySelectorAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie')[0]
  daty_disc_data = pie_data.saakashvili[party]
  charts[party].push(draw_one_pie(daty_disc_data, dom, party, 'count'))


  dom = document.querySelectorAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie')[1]
  daty_disc_data = pie_data.west_vv[party]
  charts[party].push(draw_one_pie(daty_disc_data, dom, party, 'count'))

  dom = document.querySelectorAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie')[2]
  daty_disc_data = pie_data.russ_vv[party]
  charts[party].push(draw_one_pie(daty_disc_data, dom, party, 'count'))

  dom = document.querySelectorAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie')[3]
  daty_disc_data = pie_data.olig_vv[party]
  charts[party].push(draw_one_pie(daty_disc_data, dom, party, 'count'))
}

const updateSinglePie = (dataset, chart, type_) => {
    dataset_ = get_dataset(dataset, type_)
    console.log([dataset_['pole_a'],  dataset_['neutral'], dataset_['pole_b']], 15 + dataset_["scale"] * (dataset_["pole_a"] + dataset_["neutral"] + dataset_["pole_b"]))
    chart.data.datasets[0].data = [dataset_['pole_a'],  dataset_['neutral'], dataset_['pole_b']]
    chart.options.radius = 10 + dataset_["scale"] * (dataset_["pole_a"] + dataset_["neutral"] + dataset_["pole_b"])
    chart.update();
}

const update_pie = (party, type_) => {
  updateSinglePie(pie_data.saakashvili[party], charts[party][0], type_)
  updateSinglePie(pie_data.west_vv[party], charts[party][1], type_)
  updateSinglePie(pie_data.russ_vv[party], charts[party][2], type_)
  updateSinglePie(pie_data.olig_vv[party], charts[party][3], type_)
    
}

Object.keys(pie_data.saakashvili).forEach((party) => {
  dom = document.querySelector('div[data-party="' + party.replaceAll(' ', '_') + '"]')
  dom.innerHTML += '<div><div class="pie-cont"><canvas class="pie"></canvas></div></div>'.repeat(4)
})

Object.keys(pie_data.saakashvili).forEach(drow_pie)

const clearActives = (cur) => {
  document.getElementById('count').classList.remove('active')
  document.getElementById('engage').classList.remove('active')
  document.getElementById('pos').classList.remove('active')
  document.getElementById('neg').classList.remove('active')
  document.getElementById(cur).classList.add('active')
}
document.getElementById('engage').addEventListener('click', () => {
  clearActives('engage')
  Object.keys(pie_data.saakashvili).forEach(party => update_pie(party, 'engage'))  
})
document.getElementById('count').addEventListener('click', () => {
  clearActives('count')
  Object.keys(pie_data.saakashvili).forEach(party => update_pie(party, 'count'))  
})

document.getElementById('pos').addEventListener('click', () => {
  clearActives('pos')
  Object.keys(pie_data.saakashvili).forEach(party => update_pie(party, 'pos'))  
})
document.getElementById('neg').addEventListener('click', () => {
  clearActives('neg')
  Object.keys(pie_data.saakashvili).forEach(party => update_pie(party, 'neg'))  
})


