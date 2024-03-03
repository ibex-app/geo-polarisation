
// Adjust your data to parse dates
let dataParty = [];
let dataDisco = [];
let dataPoles = [];
let dataPartyDisco = {};
let dataDiscoParty = {};

set_arr = (month_index, count) => {
    let arr = new Array(monthes.length).fill(0);
    arr[month_index] = count;
    return arr;
}

// full_dataset.d.forEach(d => {
//     d.count = d.PoleAPostsCount + d.NeutralPostsCount + d.PoleBPostsCount;
//     month_index = monthes.indexOf(d.month)
//     d.discourse = discourse_name_map[d.discourse]

//     dataParty.find(d_ => d_.label === d.party) 
//         ? dataParty.find(d_ => d_.label === d.party).data[month_index] += d.count
//         : dataParty.push({label: d.party, data: set_arr(month_index, d.count)});

//     dataDisco.find(d_ => d_.label === d.discourse)
//         ? dataDisco.find(d_ => d_.label === d.discourse).data[month_index] += d.count
//         : dataDisco.push({label: d.discourse, data: set_arr(month_index, d.count)});
    
//     if (dataPartyDisco[d.party] === undefined){
//         dataPartyDisco[d.party] = [];
//     }
//     if (dataDiscoParty[d.discourse] === undefined){
//         dataDiscoParty[d.discourse] = [];
//     }
    
//     dataDiscoParty[d.discourse].find(d_ => d_.label === d.party)
//         ? dataDiscoParty[d.discourse].find(d_ => d_.label === d.party).data[month_index] += d.count
//         : dataDiscoParty[d.discourse].push({label: d.party, data: set_arr(month_index, d.count)});

//     dataPartyDisco[d.party].find(d_ => d_.label === d.discourse)
//         ? dataPartyDisco[d.party].find(d_ => d_.label === d.discourse).data[month_index] += d.count
//         : dataPartyDisco[d.party].push({label: d.discourse, data: set_arr(month_index, d.count)});

// });


const getDataAggr = (filterParty, filterDisco) => {
    let aggregatedDataDisco = []
    let aggregatedDataParty = []
    let aggregatedDataEngage = ['Positive Engagement', 'Negative Engagement', 'Neutral Engagement'].map(d => ({
        label: d,
        data: new Array(monthes.length).fill(0)
    }))
    let aggregatedPolesAParty = []
    let aggregatedDataAEngage = ['Positive Engagement', 'Negative Engagement', 'Neutral Engagement'].map(d => ({
        label: d,
        data: new Array(monthes.length).fill(0)
    }))
    let aggregatedDataBEngage = ['Positive Engagement', 'Negative Engagement', 'Neutral Engagement'].map(d => ({
        label: d,
        data: new Array(monthes.length).fill(0)
    }))
    let aggregatedPolesBParty = []

    full_dataset.d.forEach(d => {
        d.count = +d.count
        d.positive_engagement += d.positive_engagement
        d.neutral_engagement += d.neutral_engagement
        d.negatiev_engagement += d.negatiev_engagement
        month_index = monthes.indexOf(d.month)

        if((filterParty.length > 0 && filterParty.indexOf(d.party) == -1) 
            || ( filterDisco.length > 0 && filterDisco.indexOf(d.discourse) == -1)){ 
            return;
        }
        if(filterDisco.length == 1){
            if (d.pole == poles[filterDisco[0]][0]){
                aggregatedPolesAParty.find(d_ => d_.label === d.party)
                    ? aggregatedPolesAParty.find(d_ => d_.label === d.party).data[month_index] += d.count
                    : aggregatedPolesAParty.push({label: d.party, data: set_arr(month_index, d.count)});

                aggregatedDataAEngage.find(d_ => d_.label === 'Positive Engagement').data[month_index] += d.positive_engagement
                aggregatedDataAEngage.find(d_ => d_.label === 'Neutral Engagement').data[month_index]  += d.neutral_engagement
                aggregatedDataAEngage.find(d_ => d_.label === 'Negative Engagement').data[month_index] += d.negative_engagement
            } else if (d.pole == poles[filterDisco[0]][1]){
                aggregatedPolesBParty.find(d_ => d_.label === d.party)
                    ? aggregatedPolesBParty.find(d_ => d_.label === d.party).data[month_index] += d.count
                    : aggregatedPolesBParty.push({label: d.party, data: set_arr(month_index, d.count)});
                
                aggregatedDataBEngage.find(d_ => d_.label === 'Positive Engagement').data[month_index] += d.positive_engagement
                aggregatedDataBEngage.find(d_ => d_.label === 'Neutral Engagement').data[month_index]  += d.neutral_engagement
                aggregatedDataBEngage.find(d_ => d_.label === 'Negative Engagement').data[month_index] += d.negative_engagement
            }
        }

        aggregatedDataEngage.find(d_ => d_.label === 'Positive Engagement').data[month_index] += d.positive_engagement
        aggregatedDataEngage.find(d_ => d_.label === 'Neutral Engagement').data[month_index]  += d.neutral_engagement
        aggregatedDataEngage.find(d_ => d_.label === 'Negative Engagement').data[month_index] += d.negative_engagement

        aggregatedDataDisco.find(d_ => d_.label === d.discourse)
            ? aggregatedDataDisco.find(d_ => d_.label === d.discourse).data[month_index] += d.count
            : aggregatedDataDisco.push({label: d.discourse, data: set_arr(month_index, d.count)});

        aggregatedDataParty.find(d_ => d_.label === d.party)
            ? aggregatedDataParty.find(d_ => d_.label === d.party).data[month_index] += d.count
            : aggregatedDataParty.push({label: d.party, data: set_arr(month_index, d.count)});
    })
    return {aggregatedDataDisco, aggregatedDataParty, aggregatedDataEngage, aggregatedPolesAParty, aggregatedPolesBParty, aggregatedDataAEngage, aggregatedDataBEngage}
}
