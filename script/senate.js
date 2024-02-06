fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
  method: "GET",
  headers: {"X-API-Key": "UVVvqCK54Y6JY05Ll0LHPDhRIxd3DWEgPM1zNn9G"}
})
.then(response => response.json()) 
.then(json =>{
    let members = json.results[0].members;
    console.log(members)
    makeTable(members);
} ) 
.catch(err => console.log(err));



const makeTable = (x) => {

  const tbody = document.getElementById("new_tbody");

  for (let i = 0; i < x.length; i++) {

    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const name = tr.insertCell(0);
    name.innerHTML = x[i].first_name + "" + x[i].last_name;

    const party = tr.insertCell(1);
    party.innerHTML = x[i].party;

    const state = tr.insertCell(2);
    state.innerHTML = x[i].state;

    const seniority = tr.insertCell(3);
    seniority.innerHTML = x[i].seniority;

    const loyalty = tr.insertCell(4);
    loyalty.innerHTML = x[i].votes_with_party_pct;

  }

}


