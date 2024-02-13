fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
  method: "GET",
  headers: {"X-API-Key": "UVVvqCK54Y6JY05Ll0LHPDhRIxd3DWEgPM1zNn9G"}
})
.then(response => response.json()) 
.then(json =>{
  let members = json.results[0].members;
  makeMemberRows(members);
  partiesFilter(members);
  stateFilter()
  
  } ) 
.catch(err => console.log(err));


const fetchStates = async () => {
  try {
    const response = await fetch('/src/states_hash.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const states = data;
    console.log(data,'data')
  
    makeStatesDropdown(states)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  
};

fetchStates();


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

const checkboxes = document.querySelectorAll('input[type="checkbox"]')




  const getCheckedCheckboxes = () => {
    
    const checkedCheckboxes = [];
  
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCheckboxes.push(checkbox.value);
      }
    });
    

   
  
    return checkedCheckboxes;
  }

  let selectedState = [];

  const partiesFilter = (arr) => {
  
    for (let i = 0; i < checkboxes.length; i++) {

      checkboxes[i].addEventListener("change", function (e) {
      selected = getCheckedCheckboxes();
      let partyFilter = arr.filter((element) =>  selected.includes(element.party) );
      console.log(stateFilter())
      if(stateFilter()!==undefined){
        console.log('ciao')
        partyFilter=partyFilter.filter(el=>el.state==stateFilter)
        console.log(partyFilter)
      }

      makeMemberRows(partyFilter)
     
   });
  }
}

function stateFilter(){
  statesDropdown.addEventListener('change', function(e) {
   console.log(e.target.value)
    console.log(this.value)
     
     return this.value
    
     });
}

let statesDropdown = document.getElementById("selectState");

const makeStatesDropdown = (obj) => {

const selectState = document.createElement("option");
selectState.textContent = "Select a state";
selectState.setAttribute("value", "");
statesDropdown.appendChild(selectState);

Object.entries(obj).forEach(([code, name]) => {
  let stateOptions = document.createElement('option');
  stateOptions.value = `${code}`;
  stateOptions.innerHTML =  `${name}`;
  statesDropdown.appendChild(stateOptions);
});

}




/*
const statesDropdown = document.getElementById("states_dropdown");
const stateA = document.createElement("a");
stateA.textContent = "hello";
const stateLi = document.createElement("li");
stateLi.appendChild(stateA);
statesDropdown.appendChild(stateLi);

    


/*fetch('https://gist.github.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_hash.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(json => {
    let states = json;
    console.log(states);
  })
  .catch(err => console.error('Error fetching data:', err));

  /src/states_hash.json

*/












