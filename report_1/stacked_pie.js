const to_num = (n) => {
    if (n > 1000){
        return Math.round(n/1000) + 'K'
    }
    return n
}
    
const draw_numerical = (party, i, data_aggregated) => {
    const sum = data_aggregated.map(k => k.count).reduce((a, b) => a + b)
    const dom = document.querySelector('#numerical div[data-party="' + party.replaceAll(' ', '_') + '"] .pie-cont_.n'+i)
    dom.innerHTML = `
        <div class="num-chart">
        <div class="num-chart-row"><div></div><div>Posts</div> <div>Neg</div> <div>Neut</div> <div>Pos</div></div>
        <div class="num-chart-row"><div>A</div><div>${to_num(data_aggregated[0].count)}</div><div>${to_num(data_aggregated[0].negative)}</div><div>${to_num(data_aggregated[0].neutral)}</div><div>${to_num(data_aggregated[0].positive)}</div></div>
        <div class="num-chart-row"><div>N</div><div>${to_num(data_aggregated[1].count)}</div><div>${to_num(data_aggregated[1].negative)}</div><div>${to_num(data_aggregated[1].neutral)}</div><div>${to_num(data_aggregated[1].positive)}</div></div>
        <div class="num-chart-row"><div>B</div><div>${to_num(data_aggregated[2].count)}</div><div>${to_num(data_aggregated[2].negative)}</div><div>${to_num(data_aggregated[2].neutral)}</div><div>${to_num(data_aggregated[2].positive)}</div></div>
        <div class="num-chart-row"><div>Total:${sum} </div> </div>
        </div>
    `
    // console.log(i, party, 'Tottal:', sum)
    // console.log(i, data_aggregated[0].count, '----', data_aggregated[0].positive, data_aggregated[0].neutral, data_aggregated[0].negative)
    // console.log(i, data_aggregated[1].count, '----', data_aggregated[1].positive, data_aggregated[1].neutral, data_aggregated[1].negative)
    // console.log(i, data_aggregated[2].count, '----', data_aggregated[2].positive, data_aggregated[2].neutral, data_aggregated[2].negative)
}

const tone_colors = {
    neg: 'rgba(192, 57, 43, .7)',
    neut: 'rgb(201, 201, 201)',
    pos: 'rgba(22, 160, 133, .7)'
}

// const colors_ = ['rgba(41, 128, 185, .5)', 'rgba(127, 140, 141, 0.5)', 'rgba(192, 57, 43, .5)']
// const col = (i, tone) => colors_d[tone]
const col_ = (i) => colors_[i]

// const get_radius = count => count * .09
// const get_radius = count => 8 * Math.log(count)

const split_engagement = (data_) => {
    let aggregated = ['Pole A', 'Neutral', 'Pole B'].map(key => ({
        positive: data_[key].wowCount + data_[key].favoriteCount + data_[key].likeCount + data_[key].loveCount + data_[key].careCount + data_[key].thankfulCount,
        neutral: (data_[key].viewCount*.2 + data_[key].shareCount + data_[key].commentCount),
        // neutral: (data_[key].shareCount + data_[key].commentCount),
        negative: data_[key].hahaCount + data_[key].angryCount + data_[key].sadCount,
        count: data_[key].count
    })).map(values => {
        if (values.count == 0) return values

        values.totalEng = values.positive + values.neutral + values.negative

        values.totalMean = values.totalEng / values.count
        values.posMean = values.positive / values.count
        values.neutMean = values.neutral / values.count
        values.negMean = values.negative / values.count

        values.totalScore = values.totalMean / 615

        // values.totalScore = Math.log(values.totalScore)
        // values.totalScore = 1
        values.posScore = values.posMean / 415
        values.neutScore = values.neutMean / 153
        values.negScore = values.negMean / 48

        return values
    }).map(values => {
        if (values.count == 0) return values

        values.posPercLog = values.posScore * .50
        values.neutPercLog = values.neutScore * .28
        values.negPercLog = values.negScore * .22

        values.posPercScaled = values.posPercLog / (values.posPercLog + values.neutPercLog + values.negPercLog)
        values.neutPercScaled = values.neutPercLog / (values.posPercLog + values.neutPercLog + values.negPercLog)
        values.negPercScaled = values.negPercLog / (values.posPercLog + values.neutPercLog + values.negPercLog)

        // console.log('totalScore', values.totalScore)
        // console.log('-----------------')
        // console.log('pos--', Math.round(values.posMean * 100)/100, Math.round(values.posScore * 100)/100,  Math.round(values.posPercLog  * 100)/100, Math.round(values.posPercScaled * 100)/100, )
        // console.log('neu--', Math.round(values.neutMean * 100)/100, Math.round(values.neutScore * 100)/100, Math.round(values.neutPercLog * 100)/100, Math.round(values.neutPercScaled * 100)/100, )
        // console.log('neg--', Math.round(values.negMean * 100)/100, Math.round(values.negScore * 100)/100,  Math.round(values.negPercLog  * 100)/100, Math.round(values.negPercScaled * 100)/100, )
        // console.log('-----------------')


        // console.log('+++++++++=========')
        // console.log('+++++++++=========')
        return values
    })

    return aggregated

}


// const def_shadows = (svg) => {
//     var defs = svg.append("defs");


//     var dropShadowFilter = defs.append('svg:filter')
//     .attr('id', 'drop-shadow')
//     .attr('filterUnits', "userSpaceOnUse")
//     .attr('width', '250%')
//     .attr('height', '250%');
//     dropShadowFilter.append('svg:feGaussianBlur')
//     .attr('in', 'SourceGraphic')
//     .attr('stdDeviation', 2)
//     .attr('result', 'blur-out');
//     dropShadowFilter.append('svg:feColorMatrix')
//     .attr('in', 'blur-out')
//     .attr('type', 'hueRotate')
//     .attr('values', 180)
//     .attr('result', 'color-out');
//     dropShadowFilter.append('svg:feOffset')
//     .attr('in', 'color-out')
//     .attr('dx', 3)
//     .attr('dy', 3)
//     .attr('result', 'the-shadow');
//     dropShadowFilter.append('svg:feBlend')
//     .attr('in', 'SourceGraphic')
//     .attr('in2', 'the-shadow')
//     .attr('mode', 'normal');
// }

const draw_eng_pie = (init_data, party, i) => {
    //      Mean  LogMean  LogMeanPrec
    //pos   415   6        40
    //neut  153   5        34
    //neg   48    3.9      26


    var pie = d3.pie()
        .sort(null)
        .value((d) => 360 * d.count / sum);


    const data_aggregated = split_engagement(init_data)
    // const engage_sum = data_aggregated.map(k => k.positive + k.negative + k.neutral).reduce((a, b) => a + b)
    const sum = data_aggregated.map(k => k.count).reduce((a, b) => a + b)
    
    draw_numerical(party, i, data_aggregated)
    
    var pieData = pie(data_aggregated);
    //  x - 
    
    let radius = get_radius_log(sum)

    
    // console.log(d3.selectAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie-cont')[0][i])
    let size = 350
    let svg = d3.select('#stacked-pie div[data-party="' + party.replaceAll(' ', '_') + '"] .pie-cont_.n'+i).append('svg').attr('width', size).attr('height', size);
    // def_shadows(svg)
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius((d, i) => d.data.count == 0 ? 0 : radius * d.data.totalScore * d.data.posPercScaled);

    const arc1 = d3.arc()
        .innerRadius((d, i) => d.data.count == 0 ? 0 : radius * d.data.totalScore * d.data.posPercScaled)
        .outerRadius((d, i) => d.data.count == 0 ? 0 : radius * d.data.totalScore * (d.data.posPercScaled + d.data.neutPercScaled));

    const arc2 = d3.arc()
        .innerRadius((d, i) => d.data.count == 0 ? 0 : radius * d.data.totalScore * (d.data.posPercScaled + d.data.neutPercScaled))
        .outerRadius((d, i) => d.data.count == 0 ? 0 : radius * d.data.totalScore);


    const arc3 = d3.arc()
        .innerRadius((d, i) => d.data.count == 0 ? 0 : radius - 1)
        .outerRadius((d, i) => d.data.count == 0 ? 0 : radius + 3);

    

    // First pie chart group
    let poleAGroup = svg.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
    let neutralGroup = svg.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
    let poleBGroup = svg.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
    let countsGroup = svg.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
    let scalesGroup = svg.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
    
    poleAGroup.selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', tone_colors.pos)
        .attr('stroke', 'white');
    
    neutralGroup.selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc1)
        .attr('fill', tone_colors.neut)
        .attr('stroke', 'white');

    poleBGroup.selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc2)
        .attr('fill', tone_colors.neg)
        .attr('stroke', 'white');

    countsGroup.selectAll('path')
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc3)
        .attr('fill', (d, i) => col_(i))
        // .attr('stroke', 'white');
        // .style("filter", "url(#drop-shadow)")
    

    // scalesGroup.selectAll('circle')
    //     .data(pieData)
    //     .enter()
    //     .append('path')
    //     .attr('d', arc3)
    //     .attr('fill', (d, i) => col_(i))

    scalesGroup.selectAll("circle")
        .data([10, 100, 1000, 10000].map(get_radius_log))
        .enter()
        .append("circle")
        .style("stroke", "rgba(0,0,0,.08)")
        .style("fill", "none")
        .attr("r", d => d)
        .attr("cx", 0)
        .attr("cy", 0)
}


const drow_pie = (party) => {
    // console.log(party)
    // charts[party] = []
    // dom = document.querySelectorAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie')[0]
    daty_disc_data = pie_data.saakashvili[party]
    draw_eng_pie(daty_disc_data, party, 0)
  
  
    // dom = document.querySelectorAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie')[1]
    daty_disc_data = pie_data.west_vv[party]
    draw_eng_pie(daty_disc_data, party, 1)
  
    // dom = document.querySelectorAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie')[2]
    daty_disc_data = pie_data.russ_vv[party]
    draw_eng_pie(daty_disc_data, party, 2)
  
    // dom = document.querySelectorAll('div[data-party="' + party.replaceAll(' ', '_') + '"] .pie')[3]
    daty_disc_data = pie_data.olig_vv[party]
    draw_eng_pie(daty_disc_data, party, 3)
  }

Object.keys(pie_data.saakashvili).forEach((party) => {
    dom = document.querySelector('#stacked-pie div[data-party="' + party.replaceAll(' ', '_') + '"]')
    arr = [...Array(4).keys()]
    arr.forEach(i => {
        dom.innerHTML += '<div class="pie-cont_ n'+i+'"></div>'
    })

    dom = document.querySelector('#numerical div[data-party="' + party.replaceAll(' ', '_') + '"]')
    arr = [...Array(4).keys()]
    arr.forEach(i => {
        dom.innerHTML += '<div class="pie-cont_ n'+i+'"></div>'
    })
    // dom.innerHTML += '<div><div class="pie-cont"></div></div>'.repeat(4)
})
  
Object.keys(pie_data.saakashvili).forEach(drow_pie)



// R - 1000