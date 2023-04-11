// const getPositive = d => (d.wowCount + d.favoriteCount + d.likeCount + d.loveCount + d.careCount + d.thankfulCount) 
//   const getNeutral = d => (d.viewCount*.2 + d.shareCount + d.commentCount)
//   const getNegative = d => (d.hahaCount + d.angryCount + d.sadCount)
//   const getEngCount = d => getNeutral(d) + getNeutral(d) + getNegative(d)
const party_name_map = {
"ქართული_ოცნება": "Georgian Dream",
"ხალხის_ძალა": "People's Power",
"ერთიანი_ნაციონალური_მოძრაობა": "United National Movement",
"გირჩი": "Girchi",
"გირჩი_-_მეტი_თავისუფლება": "Girchi More Freedom",
"ევროპული_საქართველო_-_მოძრაობა_თავისუფლებისთვის": "European Georgia",
"ლელო": "LELO",
"დროა": "DROA",
"საქართველოსთვის": "For Georgia",
"ხალხისთვის": "For People",
"სტრატეგია_აღმაშენებელი": "Strategy Agmashenebeli",
"მოქალაქეები": "Mokalakeebi",
"ლეიბორისტული_პარტია": "Labour Party",
"პატრიოტთა_ალიანსი": "Alliance of Patriots",
"ერი": "ERI",
"კონსერვატიული_მოძრაობა": "Conservative Movement",
}
  const draw_swarm = (discourse) => {

  
  const width = 1220;
  const height = 1000;
  const margin = [50, 60, 180, 200];

  let svg = d3
    .select('.swarm[data-disc="'+discourse+'"]')
    .append("svg")
    .attr("height", height)
    .attr("width", width);

    data = []
    let labels
    let discourse_data = full_dataset_days[discourse]

    Object.keys(discourse_data).forEach(party => {
    labels = discourse_data[party].labels
    labels.forEach((l, i) => {
        let engA = getEngCount(discourse_data[party].poleA[i])
        let engN = getEngCount(discourse_data[party].neutral[i])
        let engB = getEngCount(discourse_data[party].poleB[i])

        // engA = engA ? Math.log(engA) : 0
        // engN = engN ? Math.log(engN) : 0
        // engB  = engB ? Math.log(engB) : 0

        // console.log(engA, engA ? Math.log(engA) : 0)
        data.push({
            "dateIndex": i,
            "total_engagement": engA,
            "party": party_name_map[party.replaceAll(' ', '_')],
            "pole": "A"
        })
        data.push({
            "dateIndex": i,
            "total_engagement": engN,
            "party": party_name_map[party.replaceAll(' ', '_')],
            "pole": "N"
        })
        data.push({
            "dateIndex": i,
            "total_engagement": engB,
            "party": party_name_map[party.replaceAll(' ', '_')],
            "pole": "B"
        })
    })
})

    let parties = Array.from(new Set(data.map((d) => d.party)));
    let ySwarmScale = d3
      .scaleBand()
      .domain(parties)
      .range([height - margin[2], margin[0]]);

    let xSwarmScale = d3
      .scaleLinear()
      .domain(d3.extent(data.map((d) => +d.dateIndex)))
      .range([margin[3], width - margin[1]]);

    const colorArea = {A:'rgba(41, 140, 172, .7)', N:'rgba(127, 140, 141, 0.3)', B:'rgba(213, 116, 87,.7)'}

    let marketcapDomain = d3.extent(data.map((d) => +d.total_engagement));
    let size = d3.scaleSqrt().domain(marketcapDomain).range([0, 25]);

    svg
      .selectAll(".circ")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "circ")
      // .attr("stroke", "black")
      .attr("fill", (d) => colorArea[d.pole])
      .attr("r", (d) => size(d.total_engagement))
      .attr("cx", (d) => xSwarmScale(d.dateIndex))
      .attr("cy", (d) => ySwarmScale(d.party));
    
      const tick = () => {
          d3.selectAll(".circ")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y);
      }

      const simulation = d3.forceSimulation(data)
        .force("x", d3.forceX(d => xSwarmScale(d.dateIndex)).strength(0.1)) // Forces circles toward their x position
        .force("y", d3.forceY((d)  => ySwarmScale(d.party)).strength(0.1)) // Forces circles toward the center on the y-axis
        .force("collide", d3.forceCollide((d) => size(d.total_engagement))) // Prevents overlap; the value (5.1) should be slightly larger than the circle radius
        // .alphaDecay(0) // Controls the rate at which the simulation cools down; a lower value means longer simulation
        // .on("tick", tick); // The 'ticked' function updates the circle positions at each tick

        simulation.stop();
for (let i = 0; i < 500; ++i) simulation.tick();

d3.selectAll(".circ")
.attr("cx", (d) => d.x)
.attr("cy", (d) => d.y);
    const xSwarmAxis = d3.axisBottom(xSwarmScale).ticks(20).tickFormat((d) => labels[d]);;

    const ySwarmAxis = d3.axisRight(ySwarmScale).ticks(13).tickFormat((d) => d.slice(0, 31));;

svg.append('g')
    .attr('color', `gray`)
    .attr("transform", `translate(0, ${height-200})`)
    // .attr('font-size', `6px`)
    .call(xSwarmAxis)

    svg.append('g')
    .attr('color', `gray`)
    .attr("transform", `translate(0, -30)`)
    // .attr('font-size', `6px`)
    .call(ySwarmAxis)
  }