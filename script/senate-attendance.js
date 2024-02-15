fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
  method: "GET",
  headers: {"X-API-Key": "UVVvqCK54Y6JY05Ll0LHPDhRIxd3DWEgPM1zNn9G"}
})
.then(response => response.json()) 
.then(json =>{
  let members = json.results[0].members;
  console.log(members)
  membersArr = [...members]
  console.log(membersArr);
  atAGlanceTable(membersArr);
  
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

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].party === "R") {
      repubLoyaltyTotal += arr[i].votes_with_party_pct;
    } else if (arr[i].party === "D") {
      demLoyaltyTotal += arr[i].votes_with_party_pct;
    } else {
      indyLoyaltyTotal += arr[i].votes_with_party_pct;
    }
  }

  let repAvLoyalty = repubLoyaltyTotal / nrRepublicans;
  let demAvLoyalty = demLoyaltyTotal / nrDemocrat;
  let indyAvLoyalty = indyLoyaltyTotal / nrIndependent;

  document.getElementById('republican_loyalty').innerHTML = Math.round(repAvLoyalty * 100) / 100;
  document.getElementById('democrat_loyalty').innerHTML = Math.round(demAvLoyalty * 100) / 100;
  document.getElementById('independent_loyalty').innerHTML = Math.round(indyAvLoyalty * 100) /100;

} 