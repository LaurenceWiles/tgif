fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
  method: "GET",
  headers: {"X-API-Key": "UVVvqCK54Y6JY05Ll0LHPDhRIxd3DWEgPM1zNn9G"}
})
.then(response => response.json()) 
.then(json =>{
  let members = json.results[0].members;
  partiesFilter(members);
  allEventListener(members);
  
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

let selector =document.getElementById('selectState');

const partiesFilter = (arr) => {
   let check = Array.from(checkboxes).filter(i => i.checked) .map(i => i.value); 
   let state = selector.value; 
   let filterarr = []; 
   if (check.length == 0 && state =="") {
     filterarr = arr;
   } else {
     arr.forEach(element => {
      if (check.length !== 0 && state == "All states") {
        if (check.includes(element.party)) {
          filterarr.push(element);
        }
      }  else {
         if (check.includes(element.party) && element.state == state) {
          filterarr.push(element);
         }
       }
     }); 
   }
    return makeMemberRows(filterarr);
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

function allEventListener(arr){
  
  let value = "";
  selector.addEventListener('change',(event)=>{
  value =  event.target.value;
  let midArr = arr.filter(element=>element.state===value);
  return  partiesFilter(arr)
  });

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      return  partiesFilter(arr);
    });
  });
}

/*
const statesDropdown = document.getElementById("states_dropdown");
const stateA = document.createElement("a");
stateA.textContent = "hello";
const stateLi = document.createElement("li");
stateLi.appendChild(stateA);
statesDropdown.appendChild(stateLi);

let  enabledSettings = Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                              .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                              .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

    


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












