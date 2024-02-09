fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
  method: "GET",
  headers: {"X-API-Key": "UVVvqCK54Y6JY05Ll0LHPDhRIxd3DWEgPM1zNn9G"}
})
.then(response => response.json()) 
.then(json =>{
  let members = json.results[0].members;
  makeMemberRows(members);
  filter(members)
  } ) 
.catch(err => console.log(err));


const makeMemberRows = (arr) => {

  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {

    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const link = document.createElement("a");
    link.textContent = arr[i].first_name + " " + arr[i].last_name;
    link.setAttribute("href", arr[i].url)
    tr.insertCell(0).append(link);

    const party = tr.insertCell(1);
    party.innerHTML = arr[i].party;

    const state = tr.insertCell(2);
    state.innerHTML = arr[i].state;

    const seniority = tr.insertCell(3);
    seniority.innerHTML = arr[i].seniority;

    const loyalty = tr.insertCell(4);
    loyalty.innerHTML = arr[i].votes_with_party_pct;

  }
}

  const getCheckedCheckboxes = () => {
    
    const checkboxInput = document.querySelectorAll('input[type="checkbox"]');
    const checkedCheckboxes = [];
  
    checkboxInput.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCheckboxes.push(checkbox.value);
      }
    });
  
    return checkedCheckboxes;
  }

  const checkboxes = document.querySelectorAll('input[type="checkbox"]')
  let selected = [];

  const filter = (arr) => {

  for (let i = 0; i < checkboxes.length; i++) {

      checkboxes[i].addEventListener("change", function (e) {
      
      selected = getCheckedCheckboxes();

      let filterArr = arr.filter((element) => selected.includes(element.party));
      makeMemberRows(filterArr);
      
    });
  }
}










