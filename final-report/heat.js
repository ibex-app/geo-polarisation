const simpleNum = number => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return number.toString();
    }
  }
  
  
heatData = parties.map(p => ({
    label: p, 
    poleAPos:new Array(discourses.length).fill(0), 
    poleANeg:new Array(discourses.length).fill(0), 
    poleBPos:new Array(discourses.length).fill(0), 
    poleBNeg:new Array(discourses.length).fill(0), 
    poleAcount:new Array(discourses.length).fill(0),
    poleBcount:new Array(discourses.length).fill(0),
}))

full_dataset.d.forEach(d => {
    // Assuming d.count, d.positive_engagement, d.neutral_engagement, and d.negative_engagement are strings that need to be converted to numbers.
    d.count = +d.count;
    d.positive_engagement = +d.positive_engagement;
    d.neutral_engagement = +d.neutral_engagement;
    d.negative_engagement = +d.negative_engagement; // Corrected typo here

    const partyHeatData = heatData.find(h => h.label === d.party);
    const discourseIndex = discourses.indexOf(d.discourse);

    if(d.pole == poles[d.discourse][0]){
        partyHeatData.poleAPos[discourseIndex] += d.positive_engagement;
        partyHeatData.poleANeg[discourseIndex] += d.negative_engagement;
        partyHeatData.poleAcount[discourseIndex] += d.count;
    } else if(d.pole == poles[d.discourse][1]){
        partyHeatData.poleBPos[discourseIndex] += d.positive_engagement;
        partyHeatData.poleBNeg[discourseIndex] += d.negative_engagement;
        partyHeatData.poleBcount[discourseIndex] += d.count;
    }
});


const maxPositive = Math.max(...heatData.flatMap(h => [...h.poleAPos, ...h.poleBPos]));
const maxNegative = Math.max(...heatData.flatMap(h => [...h.poleANeg, ...h.poleBNeg]));

const maxCount = Math.max(...heatData.flatMap(h => [...h.poleAcount, ...h.poleBcount]));




console.log("Max Positive Engagement:", maxPositive);
console.log("Max Negative Engagement:", maxNegative);

const plotHeat = (eng, parties) => {
    d = document.createElement('div')
    d.className = 'heat'+ (!eng ? ' heat-c' : '')
    document.getElementById("content").appendChild(d)

    header = document.createElement('div')
    empty = document.createElement('div')
    header.appendChild(empty)
    discourses.forEach((disco, i) => {
        titleLabel = document.createElement('div')
        titleLabel.innerHTML = disco
        header.appendChild(titleLabel)
    })
    d.appendChild(header)

    header = document.createElement('div')
    empty = document.createElement('div')
    header.appendChild(empty)
    discourses.forEach((disco, i) => {

        titleLabel = document.createElement('div')
        titleLabel.innerHTML = '<div>' + poles[disco][0] + '</div><div>' + poles[disco][1] + '</div>'
        header.appendChild(titleLabel)
    })
    d.appendChild(header)
    heatData.forEach(h => {
        if(parties.length > 0 && parties.indexOf(h.label) == -1){
            return;
        }
        row = document.createElement('div')
        rowLabel = document.createElement('div')
        rowLabel.innerHTML = h.label
        row.appendChild(rowLabel)
        h.poleAPos.forEach((pos, i) => {
            cell = document.createElement('div')
            if(eng){

                cell.innerHTML = '<div style="background:rgba(24, 223, 59, ' + h.poleAPos[i]/maxPositive + ')">' +simpleNum(pos)+ '</div><div style="background:rgba(24, 223, 59, ' + h.poleBPos[i]/maxPositive + ')">' + simpleNum(h.poleBPos[i])+ '</div><div style="background:rgba(236, 97, 74, ' + h.poleANeg[i]/maxNegative + ')">' + simpleNum(h.poleANeg[i])+ '</div><div style="background:rgba(236, 97, 74, ' + h.poleBNeg[i]/maxNegative + ')">' + simpleNum(h.poleBNeg[i])+ '</div>'
            } else {
                colA = h.poleAcount[i]/maxCount > 0.5 ? 'white': 'black'
                colB = h.poleBcount[i]/maxCount > 0.5 ? 'white': 'black'
                cell.innerHTML = '<div style="color: ' + colA+'; background:rgba(0, 0, 0, ' + h.poleAcount[i]/maxCount + ')">' + simpleNum(h.poleAcount[i])+ '</div><div style="color: ' + colB+';background:rgba(0, 0, 0, ' + h.poleBcount[i]/maxCount + ')">' + simpleNum(h.poleBcount[i])+ '</div>' 
            }
                
                row.appendChild(cell)
        })
        d.appendChild(row)
    })

}

