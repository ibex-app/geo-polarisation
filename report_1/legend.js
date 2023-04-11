const get_radius = count => count * .09
const get_radius_log = count => 8 * Math.log(count)

size = 200

const draw_scales = (svg, get_radius, values) => {
    let scalesGroup = svg.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');

    scalesGroup.selectAll("circle")
        .data(values.map(get_radius))
        .enter()
        .append("circle")
        .style("stroke", "rgba(0,0,0,.2)")
        .style("fill", "none")
        .attr("r", d => d)
        .attr("cx", 0)
        .attr("cy", 0);

    skip = true
    scalesGroup.selectAll("text")
        .data(values)
        .enter()
        .append("text")
        .attr("x", d => get_radius(d)-10)
        .attr("y", d => {
            if (skip) {
                skip = !skip
                return -5
            } else {
                skip = !skip
                return 5
            }
        })
        .attr("dy", ".35em")
        .text(d => {
            if (d == 1000) return '1K'
            if (d == 10000) return '10K'
            return d
        });

    return scalesGroup
}

let svg_c1 = d3.select('#pie-doc-counts-1').append('svg').attr('width', size).attr('height', size);
let svg_c2 = d3.select('#pie-doc-counts-2').append('svg').attr('width', size).attr('height', size);
let svg_c3 = d3.select('#pie-doc-counts-3').append('svg').attr('width', size).attr('height', size);
draw_scales(svg_c1, get_radius_log, [10, 100, 1000, 10000])
draw_scales(svg_c2, get_radius_log, [10, 100, 1000, 10000])
draw_scales(svg_c3, get_radius, [250, 500, 750, 1000])

const pie = d3.pie()
    .sort(null)
    .value((d) => d.a);

    
const arc_log = d3.arc()
    .innerRadius((d, i) => get_radius_log(d.data.r)-4)
    .outerRadius((d, i) => get_radius_log(d.data.r)+4);

const arc_ = d3.arc()
    .innerRadius((d, i) => get_radius(d.data.r)-4)
    .outerRadius((d, i) => get_radius(d.data.r)+4);

const colors_ = ['rgb(41 140 172)', 'rgba(167, 170, 181, 1)', 'rgb(213 116 87)']

const colors_d = {pos: colors_[0], neut: colors_[1],neg: colors_[2],}

let countsGroup10 = svg_c1.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
countsGroup10.selectAll('path')
    .data(pie([{r:10, a:135}, {r:10, a:135}, {r:10, a:135}]))
    .enter()
    .append('path')
    .attr('d', arc_log)
    .attr('fill', (d, i) => colors_[i])

let countsGroup1000 = svg_c2.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
countsGroup1000.selectAll('path')
    .data(pie([{r:10000, a:180}, {r:10000, a:90}, {r:10000, a:90}]))
    .enter()
    .append('path')
    .attr('d', arc_log)
    .attr('fill', (d, i) => colors_[i])

let countsGroup100000 = svg_c3.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
countsGroup100000.selectAll('path')
    .data(pie([{r:1000, a:45}, {r:1000, a:270}, {r:1000, a:45}]))
    .enter()
    .append('path')
    .attr('d', arc_)
    .attr('fill', (d, i) => colors_[i])



// Eng descs

let svg_e1 = d3.select('#pie-doc-eng-1').append('svg').attr('width', size).attr('height', size);
let svg_e2 = d3.select('#pie-doc-eng-2').append('svg').attr('width', size).attr('height', size);
let svg_e3 = d3.select('#pie-doc-eng-3').append('svg').attr('width', size).attr('height', size);

const arc = d3.arc()
    .innerRadius((d, i) => d.data.i)
    .outerRadius((d, i) => d.data.o);

const draw_pies = (svg, data, col) => {
    let poleGroup = svg.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
    
    poleGroup.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', col)
        .attr('stroke', 'white');
    
    // poleGroup.selectAll('path')
    //     .data(pie(data))
    //     .enter()
    //     .append('path')
    //     .attr('d', arc1)
    //     .attr('fill', (d, i) => col(i, 'neutral'))
    //     .attr('stroke', 'white');

    // poleGroup.selectAll('path')
    //     .data(pie(data))
    //     .enter()
    //     .append('path')
    //     .attr('d', arc2)
    //     .attr('fill', (d, i) => col(i, 'poleB'))
    //     .attr('stroke', 'white');
}
// poleB: 'rgba(22, 160, 133, .7)',
// neutral: '',
// poleA: 'rgba(192, 57, 43, .7)'
draw_pies(svg_e1, [{r:1000, a:135, i:0, o:25}, {r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:0, o:0}], 'rgba(192, 57, 43, .7)')
draw_pies(svg_e1, [{r:1000, a:135, i:25, o:50}, {r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:0, o:0}], 'rgb(201, 201, 201)')
draw_pies(svg_e1, [{r:1000, a:135, i:50, o:75}, {r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:0, o:0}], 'rgba(22, 160, 133, .7)')

draw_pies(svg_e2, [{r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:0, o:80}, {r:1000, a:135, i:0, o:0}],   'rgba(192, 57, 43, .7)')
draw_pies(svg_e2, [{r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:80, o:80}, {r:1000, a:135, i:0, o:0}],  'rgb(201, 201, 201)')
draw_pies(svg_e2, [{r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:80, o:100}, {r:1000, a:135, i:0, o:0}], 'rgba(22, 160, 133, .7)')

draw_pies(svg_e3, [{r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:0, o:5}], 'rgba(192, 57, 43, .7)')
draw_pies(svg_e3, [{r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:5, o:20}], 'rgb(201, 201, 201)')
draw_pies(svg_e3, [{r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:0, o:0}, {r:1000, a:135, i:20, o:100}], 'rgba(22, 160, 133, .7)')

draw_scales(svg_e1, get_radius_log, [10, 100, 1000, 10000])
draw_scales(svg_e2, get_radius_log, [10, 100, 1000, 10000])
draw_scales(svg_e3, get_radius_log, [10, 100, 1000, 10000])

countsGroup = svg_e1.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
countsGroup.selectAll('path')
    .data(pie([{r:10000, a:135}, {r:10000, a:135}, {r:10000, a:135}]))
    .enter()
    .append('path')
    .attr('d', arc_log)
    .attr('fill', (d, i) => colors_[i])

countsGroup = svg_e2.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
countsGroup.selectAll('path')
    .data(pie([{r:1000, a:135}, {r:1000, a:135}, {r:1000, a:135}]))
    .enter()
    .append('path')
    .attr('d', arc_log)
    .attr('fill', (d, i) => colors_[i])

countsGroup = svg_e3.append('g').attr('transform', 'translate(' + (size/2) + ', ' + (size/2) + ')');
countsGroup.selectAll('path')
    .data(pie([{r:1000, a:135}, {r:1000, a:135}, {r:1000, a:135}]))
    .enter()
    .append('path')
    .attr('d', arc_log)
    .attr('fill', (d, i) => colors_[i])

