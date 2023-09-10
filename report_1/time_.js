const getPositive = d => (d.wowCount + d.favoriteCount + d.likeCount + d.loveCount + d.careCount + d.thankfulCount) 
const getNeutral = d => (d.viewCount*.2 + d.shareCount + d.commentCount)
const getNegative = d => (d.hahaCount + d.angryCount + d.sadCount)
const getEngCount = d => getNeutral(d) + getNeutral(d) + getNegative(d)

const get_table_html_time = (week_data, dataArea, index, is_pop) => {
    // const sum = data_aggregated.map(k => k.count).reduce((a, b) => a + b)
    
    // console.log(week_data, dataArea, index)
    poleA = dataArea.find(d => d.week == week_data.week && d.pole == 'poleA').count
    poleN = dataArea.find(d => d.week == week_data.week && d.pole == 'neutral').count
    poleB = dataArea.find(d => d.week == week_data.week && d.pole == 'poleB').count
    const innerHTML = `
        <div class="num-chart ${is_pop ? 'num-chart-pop' : ''}">
        <div class="num-chart-row"><div></div><div>Posts</div> <div>Pos</div> <div>Neut</div> <div>Neg</div></div>
        <div class="num-chart-row ${index != 0 && index != 1 && index != 2 ? 'num-chart-row-inactive' : ''}">
        <div>A</div>
        <div>${poleA}</div>
        <div class="${ index != 0 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.a_pos)}</div>
        <div class="${ index != 1 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.a_neut)}</div>
        <div class="${ index != 2 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.a_neg)}</div></div>
        <div class="num-chart-row ${index != 3 && index != 4 && index != 5 ? 'num-chart-row-inactive' : ''}">
        <div>N</div>
        <div>${poleN}</div>
        <div class="${ index != 3 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.n_pos)}</div>
        <div class="${ index != 4 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.n_neut)}</div>
        <div class="${ index != 5 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.n_neg)}</div></div>
        <div class="num-chart-row ${index != 6 && index != 7 && index != 8 ? 'num-chart-row-inactive' : ''}">
        <div>B</div>
        <div>${poleB}</div>
        <div class="${ index != 6 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.b_pos)}</div>
        <div class="${ index != 7 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.b_neut)}</div>
        <div class="${ index != 8 ?  'num-chart-col-inactive' : ''}" >${to_num(week_data.b_neg)}</div></div>
        <div class="num-chart-row"><div>Total posts:${poleA + poleN + poleB} </div> </div>
        </div>`
        // <div class="num-chart-row"><div>Total:${sum} </div> </div>
    return innerHTML
}

const mouseover_time = (e, d, dataArea, index) => {
    // console.log(i)
    // pieTooltipDom.style("color", colors_font[eng]);
    // pieTooltipDom.style("background-color", colors_op[d.index]);
    
    pieTooltipDom.style("opacity", 1);
    pieTooltipDom.style("visibility", 'visible');
    // html = `Pole: <span style="color:${colors_[d.index]}">${poleName[d.index]}</span><br/>
    // Engagement: <span style="color:${colors_font[eng]}">${eng}</span><br/>
    // Engagement count: ${d.data[eng]}` + get_table_html_time(data_aggregated)
    html = `Week: <span>${d.item.data.week}</span><br/>` + get_table_html_time(d.item.data, dataArea, index, true)
    pieTooltipDom.html(html)
            .style("left", (e.clientX + 10) + "px")
            .style("top", (e.clientY - 15) + "px");
}

const mouseout_time = d => {
    pieTooltipDom.style("opacity", 0);
    pieTooltipDom.style("visibility", 'hidden');
}

const draw_time = (initial_data, selector, max_count, max_eng) => {
    // console.log(selector)
    const margin = { top: 25, right: 25, bottom: 50, left: 50 };

    const width = 700 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3.select(selector)
      .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);



    let  dataArea = []
    initial_data.labels.forEach((label, i) => {
        dataArea.push({
            week: label,
            pole: 'poleA',
            count: initial_data.poleA[i].count
        })
        dataArea.push({
            week: label,
            pole: 'neutral',
            count: initial_data.neutral[i].count
        })
        dataArea.push({
            week: label,
            pole: 'poleB',
            count: initial_data.poleB[i].count
        })
    })
    

      // group the data: one array for each value of the X axis.
      const sumstat = d3.group(dataArea, d => d.week);
    
      // Stack the data: each group will be represented on top of each other
      const mygroups = ["poleA", "neutral", "poleB" ] // list of group names
      const mygroup = mygroups.map((count, i) => i)
      
    //   console.log(data, sumstat)

      const stackedDataArea = d3.stack()
        .keys(mygroup)
        .value((d, key) => d[1][key].count)
        (sumstat)

    //   console.log(stackedData)

    //   console.log(4444, d3.extent(dataArea, d => d.week))
      // Add X axis --> it is a date format
      const xArea = d3.scaleLinear()
        .domain(d3.extent(dataArea, d => d.week))
        .range([ 0, width ]);
    //   svg.append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x).ticks(5));

    //   // Add Y axis
      const yArea = d3.scaleLinear()
        .domain([0, max_count ])
        .range([ height, 0 ]);
    //   svg.append("g")
    //     .call(d3.axisLeft(y));
    
      // color palette


      const yAreaAxis = d3.axisRight(yArea).ticks(5);

    svg.append('g')
        .attr('color', `gray`)
        // .attr('font-size', `6px`)
        .call(yAreaAxis)

    const colorArea = ['rgba(41, 140, 172, .7)', 'rgba(127, 140, 141, 0.3)', 'rgba(213, 116, 87,.7)']
    
      const area = d3.area()
                .x((d, i) =>  {
                    // console.log('x', d.data[0])
                    return i*46
                    return  xArea(i)
                })
                .y0((d) =>  {
                    // console.log('y0', d[0])
                    return yArea(d[0])
                })
                .y1((d) =>  {
                    // console.log('y1', d[1])
                    return yArea(d[1])
                })
                // .curve(d3.curveCardinal.tension(.6))
      // Show the areas
      svg
        .selectAll("staked-area")
        .data(stackedDataArea)
        .join("path")
        .style("fill", (d, i) => colorArea[i])
        .attr("d", d => {
            k = area(d)
            // console.log(d, k)
            return k
        })


    // const getPositive = d => Math.log(d.wowCount + d.favoriteCount + d.likeCount + d.loveCount + d.careCount + d.thankfulCount) 
    // const getNeutral = d => Math.log(d.viewCount*.2 + d.shareCount + d.commentCount)
    // const getNegative = d => Math.log(d.hahaCount + d.angryCount + d.sadCount)


    

    data = initial_data.labels.map((label,i) => {
        poleAdata = initial_data.poleA[i]
        neutraldata = initial_data.neutral[i]
        poleBdata = initial_data.poleB[i]

        return {
            week: label,
            a_pos:getPositive(poleAdata),
            a_neut:getNeutral(poleAdata),
            a_neg:getNegative(poleAdata),
            n_pos:getPositive(neutraldata),
            n_neut:getNeutral(neutraldata),
            n_neg:getNegative(neutraldata),
            b_pos:getPositive(poleBdata),
            b_neut:getNeutral(poleBdata),
            b_neg:getNegative(poleBdata)
        }

    })
    const keys = Object.keys(data[0]).filter(k => k != 'week');
    data = data.map(d => {
        d.total = keys.map(k => d[k]).reduce((a, b) => a + b)
        return d
    })
    const months = Array.from(new Set(data.map(d => d.week))).sort(d3.ascending);

    const stackedData = d3.stack()
        .keys(keys)
        .value((d, key) => d[key] ?? 0)
        (data);

    // scales

    const x = d3.scaleBand()
        .domain(months)
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, max_eng * 1.2])
        .range([height, 0]);

        
    const colors_ = ['rgba(41,140,172, 1)', 'rgb(100 168 190)', 'rgb(140 188 201)',                
                    'rgb(180,180,180, 1)', 'rgb(197 196 195)', 'rgb(197 196 195)',
                    'rgba(213,116,87, 1)', 'rgb(221 151 130)', 'rgb(226 176 159)']
    // const colors_ = ['rgba(22, 160, 133, 1)', 'rgb(201, 201, 201)', '#e29d89',  
    //                  'rgba(22, 160, 133, 1)', 'rgb(201, 201, 201)', '#e29d89',  
    //                  'rgba(22, 160, 133, 1)', 'rgb(201, 201, 201)', '#e29d89',  ]
    const color = d3.scaleOrdinal()
        .domain(keys)
        .range(colors_);
    // axes

    const xAxis = d3.axisBottom(x).tickFormat(function(d) {
                return d % 1 ? null : d;
            });;

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .attr('color', `gray`)
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "2.8em")
        .attr("dy", ".95em")
        .attr('transform', `rotate(30)`)

    const yAxis = d3.axisLeft(y).ticks(5);

    svg.append('g')
        .attr('color', `gray`)
        // .attr('font-size', `6px`)
        .call(yAxis)

    // draw bars

    const groups = svg.append('g')
      .selectAll('g')
      .data(stackedData)
      .join('g')
        .attr('fill', d => color(d.key));

    groups.selectAll('rect')
        .data(d => d.map((item, index) => ({ item, index })))
        .join('rect')
            .attr('x', d => x(d.item.data.week))
            .attr('y', d => y(d.item[1]))
            // .attr('width', x.bandwidth())
            .attr('width', 15)
            .attr('height', d => y(d.item[0]) - y(d.item[1]))
            .on('mouseover', (e,d,i) => {
                const nodes = e.target.parentNode.parentNode.childNodes;
                const index = [...nodes].indexOf(e.target.parentNode);
                mouseover_time(e,d,dataArea,index)
            })
            .on('mouseout',  mouseout_time)
        // .attr('stroke', 'rgba(255, 255, 255, .3)')
        // .attr('stroke-width', .3)
        
        


    let data_poles = data.map(d => ({
        total:d.total,
        week:d.week,
        poleA: d.a_pos + d.a_neut + d.a_neg,
        poleN: d.n_pos + d.n_neut + d.n_neg,
        poleB: d.b_pos + d.b_neut + d.b_neg,
    }))

    const poleKeys = Object.keys(data_poles[0]).filter(k => k != 'week' & k != 'total');
    const poleColors = ['rgb(41,140,172)', 'rgb(205,207,204)','rgb(213,116,87)']
    
    const poleColorR = d3.scaleOrdinal()
        .domain(poleKeys)
        .range(poleColors);
    
    const stackedPoleData = d3.stack()
        .keys(poleKeys)
        .value((d, key) => d[key] ?? 0)
        (data_poles);
    
    const poleGroups = svg.append('g')
      .selectAll('g')
      .data(stackedPoleData)
      .join('g')
        .attr('fill', d => poleColorR(d.key));

    poleGroups.selectAll('rect')
      .data(d => d)
      .join('rect')
        .attr('x', d => x(d.data.week) - 0)
        .attr('y', d => y(d[1]))
        .attr('width', 3)
        .attr('height', d => y(d[0]) - y(d[1]));

                    // const poleGroupsBorder = svg.append('g')
                    //   .selectAll('g')
                    //   .data(stackedPoleData)
                    //   .join('g')
                    //     .attr('fill', d => 'rgba(255, 255, 255, .4)');

                    //     poleGroupsBorder.selectAll('rect')
                    //   .data(d => d)
                    //   .join('rect')
                    //     .attr('x', d => x(d.data.week) - 0)
                    //     .attr('y', d => y(d[1]))
                    //     .attr('width', 1)
                    //     .attr('height', d => y(d[0]) - y(d[1]));
    // Line chart
    // const dataCounts = data.map(d => ({
    //     week: d.week,
    //     // count: d.total + Math.random(199)*10000 - 500,
    //     count: d.total
    // }))

    // const yCount = d3.scaleLinear()
    //     .domain([0, d3.max(dataCounts, d => d.count)])
    //     .range([height, 0]);

    // svg.append("path")
    //   .datum(dataCounts)
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 1.5)
    //   .attr("d", d3.line()
    //     .x(d => x(d.week) + 15 )
    //     // .y(d => yCount(d.count))
    //     .y(d => yCount(d.count) ).curve(d3.curveMonotoneX)
    //     )

    //     svg.selectAll(".circle-uk")
    // .data(dataCounts)
    // .join("circle") // enter append
    //   .attr("class", "circle-uk")
    //   .attr("r", "3") // radius
    // //   .attr("fill", "rgba(255, 255, 255, 1)") // radius
    //   .attr("fill", "steelblue") // radius
    
    // //   .attr("stroke", "steelblue") // radius
    // //   .attr("stroke-width", 2.5)
    //   .attr("cx", d=> x(d.week) + 15)   // center x passing through your xScale
    //   .attr("cy", d=> yCount(d.count))  // center y through your yScale
}

const max_count_per_party = (discourse, party) => {
    let counts_sum_party = full_dataset[discourse][party].poleB.map((k, idx) => full_dataset[discourse][party].poleA[idx].count + full_dataset[discourse][party].neutral[idx].count + full_dataset.west_vv[party].poleB[idx].count)
    let max_count_party = Math.max(...counts_sum_party)
    // console.log(discourse, party, max_count_party)
    return max_count_party
}

const max_eng_per_party = (discourse, party) => {
    let counts_sum_party = full_dataset[discourse][party].poleB.map((k, idx) => getEngCount(full_dataset[discourse][party].poleA[idx]) + getEngCount(full_dataset[discourse][party].neutral[idx]) + getEngCount(full_dataset.west_vv[party].poleB[idx]))
    let max_count_party = Math.max(...counts_sum_party)
    // console.log(discourse, party, max_count_party)
    return max_count_party
}

Object.keys(full_dataset).forEach(discourse => {
    max_count =  Object.keys(full_dataset[discourse]).map(party => max_count_per_party(discourse, party))
    // console.log(max_count)
    max_count = Math.max(...max_count)

    max_eng = Object.keys(full_dataset[discourse]).map(party => max_eng_per_party(discourse, party))
    max_eng = Math.max(...max_eng)
    // max_eng = 100
    // console.log(max_count, max_eng)
    Object.keys(full_dataset[discourse]).forEach(party => {
        let selector = 'div[data-disc="'+discourse+'"] div[data-party="'+party.replaceAll(' ', '_')+'"] div:last-child'
        document.querySelector(selector).parentElement.style.display = 'flex'
        draw_time(full_dataset[discourse][party], selector, max_count, max_eng)
    })
})
