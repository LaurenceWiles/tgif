fetch('/src/pro-congress-116-house-json')
.then(response => response.json()) 
.then(json =>{
  let members = json.results[0].members;
  membersArr = [...members];
  atAGlanceTable(membersArr);
  leastLoyalTable(membersArr);
  mostLoyalTable(membersArr);
  //partiesFilter(members);
  //allEventListener(members);
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

  const leastLoyalTable = (arr) => {

    let sorted = arr.sort((b,a) => (a.votes_with_party_pct > b.votes_with_party_pct) ? 1: ((b.votes_with_party_pct > a.votes_with_party_pct) ? -1 : 0));
    let tenPercent = Math.round(arr.length / 10);
    let leastLoyal = [];
    for (let i = sorted.length - 1; i > (sorted.length - 1) - tenPercent; i--) {
      leastLoyal.push(sorted[i]);
    }
    for (let i = (sorted.length - 1) - tenPercent; i >= 0; i--) {
      if (sorted[i].votes_with_party_pct === leastLoyal[9].votes_with_party_pct) {
        leastLoyal.push(sorted[i]);
      }
    }

    leastLoyal = leastLoyal.slice(0, 10);
  
    const tbody = document.getElementById('least_loyal_tbody')
    for (let i = 0; i < leastLoyal.length; i++) {
      
      const tr = document.createElement("tr");
      tbody.appendChild(tr);
  
      const name = tr.insertCell(0);
      name.innerHTML = leastLoyal[i].first_name + " " + leastLoyal[i].last_name;
  
      const nrPartyVotes = tr.insertCell(1);
      nrPartyVotes.innerHTML = Math.round(leastLoyal[i].total_votes / 100 + leastLoyal[i].votes_with_party_pct) ;
  
      const percentPartyVotes = tr.insertCell(2);
      percentPartyVotes.innerHTML = leastLoyal[i].votes_with_party_pct;
    }

  }

  const mostLoyalTable = (arr) => {

    let sorted = arr.sort((a,b) => (a.votes_with_party_pct > b.votes_with_party_pct) ? 1: ((b.votes_with_party_pct > a.votes_with_party_pct) ? -1 : 0));
    let tenPercent = Math.round(arr.length / 10);
    let mostLoyal = [];
    for (let i = sorted.length - 1; i > (sorted.length - 1) - tenPercent; i--) {
      mostLoyal.push(sorted[i]);
    }
    for (let i = (sorted.length - 1) - tenPercent; i >= 0; i--) {
      if (sorted[i].votes_with_party_pct === mostLoyal[9].votes_with_party_pct) {
        mostLoyal.push(sorted[i]);
      }
    }

    mostLoyal = mostLoyal.slice(0, 10);
  
    const tbody = document.getElementById('most_loyal_tbody')
    for (let i = 0; i < mostLoyal.length; i++) {
      
      const tr = document.createElement("tr");
      tbody.appendChild(tr);
  
      const name = tr.insertCell(0);
      name.innerHTML = mostLoyal[i].first_name + " " + mostLoyal[i].last_name;
  
      const nrPartyVotes = tr.insertCell(1);
      nrPartyVotes.innerHTML = Math.round(mostLoyal[i].total_votes / 100 + mostLoyal[i].votes_with_party_pct) ;
  
      const percentPartyVotes = tr.insertCell(2);
      percentPartyVotes.innerHTML = mostLoyal[i].votes_with_party_pct;
    }
  
  }
