fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
  method: "GET",
  headers: {"X-API-Key": "UVVvqCK54Y6JY05Ll0LHPDhRIxd3DWEgPM1zNn9G"}
})
.then(response => response.json()) 
.then(json =>{
  let members = json.results[0].members;
  membersArr = [...members];
  atAGlanceTable(membersArr);
  leastEngagedTable(membersArr)
  mostEngagedTable(membersArr);
  }) 
.catch(err => console.log(err));


const atAGlanceTable = (arr) => {

  let nrRepublicans = arr.filter(i => i.party === "R").length;
  let nrDemocrat = arr.filter(i => i.party === "D").length;
  let nrIndependent = arr.filter(i => i.party === "ID").length;

  document.getElementById('republican_reps').innerHTML = nrRepublicans;
  document.getElementById('democrat_reps').innerHTML = nrDemocrat;
  document.getElementById('independent_reps').innerHTML = nrIndependent;

  let repubMissedTotal = 0;
  let demMissedTotal = 0;
  let indyMissedTotal = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].party === "R") {
      repubMissedTotal += arr[i].missed_votes_pct;
    } else if (arr[i].party === "D") {
      demMissedTotal += arr[i].missed_votes_pct;
    } else {
      indyMissedTotal += arr[i].missed_votes_pct;
    }
  }

  let repAvMissed = repubMissedTotal / nrRepublicans;
  let demAvMissed = demMissedTotal / nrDemocrat;
  let indyAvMissed = indyMissedTotal / nrIndependent;

  document.getElementById('republican_missed').innerHTML = Math.round(repAvMissed * 100) / 100;
  document.getElementById('democrat_missed').innerHTML = Math.round(demAvMissed * 100) / 100;
  document.getElementById('independent_missed').innerHTML = Math.round(indyAvMissed * 100) /100;

} 

const leastEngagedTable = (arr) => {

  let sorted = arr.sort((a,b) => (a.missed_votes > b.missed_votes) ? 1: ((b.missed_votes > a.missed_votes) ? -1 : 0));
  let tenPercent = Math.round(arr.length / 10);
  let leastEngaged = [];
  for (let i = sorted.length - 1; i > (sorted.length - 1) - tenPercent; i--) {
    leastEngaged.push(sorted[i]);
  }
  for (let i = (sorted.length - 1) - tenPercent; i >= 0; i--) {
    if (sorted[i].missed_votes === leastEngaged[leastEngaged.length - 1].missed_votes) {
      leastEngaged.push(sorted[i]);
    }
  }

  const tbody = document.getElementById('least_engaged_tbody');
  
  for (let i = 0; i < leastEngaged.length; i++) {
    
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const name = tr.insertCell(0);
    name.innerHTML = leastEngaged[i].first_name + " " + leastEngaged[i].last_name;

    const nrMissedVotes = tr.insertCell(1);
    nrMissedVotes.innerHTML = leastEngaged[i].missed_votes;

    const percentMissed = tr.insertCell(2);
    percentMissed.innerHTML = leastEngaged[i].missed_votes_pct;
  }
}

const mostEngagedTable = (arr) => {

  let sorted = arr.sort((b,a) => (a.missed_votes > b.missed_votes) ? 1: ((b.missed_votes > a.missed_votes) ? -1 : 0));
  let tenPercent = Math.round(arr.length / 10);
  let mostEngaged = [];
  for (let i = sorted.length - 1; i > (sorted.length - 1) - tenPercent; i--) {
    mostEngaged.push(sorted[i]);
  }
  for (let i = (sorted.length - 1) - tenPercent; i >= 0; i--) {
    if (sorted[i].missed_votes === mostEngaged[mostEngaged.length - 1].missed_votes) {
      mostEngaged.push(sorted[i]);
    }
  }

  const tbody = document.getElementById('most_engaged_tbody');

  for (let i = 0; i < mostEngaged.length; i++) {
    
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const name = tr.insertCell(0);
    name.innerHTML = mostEngaged[i].first_name + " " + mostEngaged[i].last_name;

    const nrMissedVotes = tr.insertCell(1);
    nrMissedVotes.innerHTML = mostEngaged[i].missed_votes;

    const percentMissed = tr.insertCell(2);
    percentMissed.innerHTML = mostEngaged[i].missed_votes_pct;
  }
}

