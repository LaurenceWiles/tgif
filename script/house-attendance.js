fetch('/src/pro-congress-116-house-json')
.then(response => response.json()) 
.then(json =>{
  let members = json.results[0].members;
  membersArr = [...members];
  console.log(membersArr);
  atAGlanceTable(membersArr);
  leastEngagedTable(membersArr);
  mostEngagedTable(membersArr);
  } ) 
.catch(err => console.log(err));

const atAGlanceTable = (arr) => {

    let nrRepublicans = arr.filter(i => i.party === "R").length;
    let nrDemocrat = arr.filter(i => i.party === "D").length;
    let nrIndependent = arr.filter(i => i.party === "ID").length;
  
    document.getElementById('republican_reps').innerHTML = nrRepublicans;
    document.getElementById('democrat_reps').innerHTML = nrDemocrat;
    document.getElementById('independent_reps').innerHTML = nrIndependent;
  
    let repubLoyaltyTotal = 0;
    let demLoyaltyTotal = 0;
    let indyLoyaltyTotal = 0;

    let repubNoLoyaltyInfo = 0;
    let demNoLoyaltyInfo = 0;
    let indyNoLoyaltyInfo = 0;
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].party === "R") {
        if (isNaN(arr[i].votes_with_party_pct)) {
            repubNoLoyaltyInfo++;
        } else if (!isNaN(arr[i].votes_with_party_pct)) {
            repubLoyaltyTotal += arr[i].votes_with_party_pct;
        }
        } else if (arr[i].party === "D") {
            if (isNaN(arr[i].votes_with_party_pct)) {
                demNoLoyaltyInfo++
            } else if (!isNaN(arr[i].votes_with_party_pct)) {
            demLoyaltyTotal += arr[i].votes_with_party_pct;
            }
            } else { 
                if (isNaN(arr[i].votes_with_party_pct)) {
                    indyNoLoyaltyInfo++
                } else if (!isNaN(arr[i].votes_with_party_pct)) {
                    indyLoyaltyTotal += arr[i].votes_with_party_pct;
                }
        }
    }

    let repAvLoyalty = repubLoyaltyTotal / (nrRepublicans - repubNoLoyaltyInfo);
    let demAvLoyalty = demLoyaltyTotal / (nrDemocrat - demNoLoyaltyInfo);
    let indyAvLoyalty = indyLoyaltyTotal / (nrIndependent - indyNoLoyaltyInfo);
  
    document.getElementById('republican_loyalty').innerHTML = Math.round(repAvLoyalty * 100) / 100;
    document.getElementById('democrat_loyalty').innerHTML = Math.round(demAvLoyalty * 100) / 100;
    if (nrIndependent === 0) {
        document.getElementById('independent_loyalty').innerHTML = 0;
    } else {
        document.getElementById('independent_loyalty').innerHTML = Math.round(indyAvLoyalty * 100) /100; 
    }
  
  } 

  const leastEngagedTable = (arr) => {

    let sorted = arr.sort((a,b) => (a.missed_votes > b.missed_votes) ? 1: ((b.missed_votes > a.missed_votes) ? -1 : 0));
    let tenPercent = Math.round(arr.length / 10);
    let leastEngaged = [];
    for (let i = sorted.length - 1; i > (sorted.length - 1) - tenPercent; i--) {
        if (sorted[i].missed_votes !== null) {
            leastEngaged.push(sorted[i]);
        }
      }
    for (let i = (sorted.length - 1) - tenPercent; i >= 0; i--) {
      if (sorted[i].missed_votes === leastEngaged[9].missed_votes) {
        leastEngaged.push(sorted[i]);
      }
    }
  
    const tbody = document.getElementById('least_engaged_tbody')
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
      if (sorted[i].missed_votes !== null) {
        mostEngaged.push(sorted[i]);
      }
        
    }
    for (let i = (sorted.length - 1) - tenPercent; i >= 0; i--) {
      if (sorted[i].missed_votes === mostEngaged[9].missed_votes) {
        mostEngaged.push(sorted[i]);
      }
    }
  
    const tbody = document.getElementById('most_engaged_tbody')
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