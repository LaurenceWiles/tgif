fetch('/src/pro-congress-116-house-json')
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
      makeStatesDropdown(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

fetchStates()

console.log('hola')

const makeMemberRows = (arr) => {
  
    let check = Array.from(checkboxes).filter(i => i.checked).map(i => i.value);
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
  
  if (arr.length === 0) {
    if (check.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Please select a party</td></tr>';
    } else {
      tbody.innerHTML = '<tr><td colspan="5">There are currently no representatives that match your search criteria</td></tr>'
    }
    
  }
  
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
   let check = Array.from(checkboxes).filter(i => i.checked).map(i => i.value); 
   let state = selector.value; 
   let filterarr = []; 
   if (check.length == 0 ) {
     filterarr = [];
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
  