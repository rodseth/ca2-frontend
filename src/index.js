import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade"
import zipFacade from "./zipFacade"
import hobbyFacade from "./hobbyFacade"
import tableFiller from './tableFiller'
let persons = [];


document.getElementById("all-content").style.display = "block"



function hideAllShowOne(idToShow) {
  document.getElementById("home_html").style = "display:none"
  document.getElementById("postnumre_html").style = "display:none"
  document.getElementById("hobbies_html").style = "display:none"
  document.getElementById("personer_html").style = "display:none"
  document.getElementById("administrer_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function makeTableRow(name) {
  const list = name.map(function (name) {
    return `<tr> <td> ${name.email}</td> <td>${name.firstName}</td> <td>${name.lastName}</td></tr>`
  })
  const tableheaders = "<tr><th>email</th><th>firstName</th><th>lastName</th></tr>"
  const joinedResult = list.join("");
  const finishedtable = tableheaders + joinedResult;
  return finishedtable;
}
function makeSingleTableRow(name) {
  const list = `<tr> <td> ${name.email}</td> <td>${name.firstName}</td> <td>${name.lastName}</td></tr>`
  const tableheaders = "<tr><th>email</th><th>firstName</th><th>lastName</th></tr>"
  const finishedtable = tableheaders + list;
  return finishedtable;
}

function makeSingleTableRowForPerson(person) {
  const listPhones1 = person.phonesDTO.map(function (name) {
    return ` ${name.phoneNumber}`;
  })
  const listHobbies1 = person.hobbiesDTO.map(function (name) {
    return ` ${name.name}`;
  })
  const listPhones = listPhones1.join(",");
  const listHobbies = listHobbies1.join(",");
  const list = `<tr> <td> ${person.email}</td> <td>${person.firstName}</td> <td>${person.lastName}</td> <td>${listPhones}</td> <td>${person.addressesDTO.street}</td> <td>${listHobbies}</td> </tr>`
  const tableheaders = "<tr><th>email</th><th>firstName</th><th>lastName</th><th>phones</th><th>streetname</th><th>hobbies</th></tr>"
  const finishedtable = tableheaders + list;
  return finishedtable;
}

function makeTableRowsForZips(name) {
  const list = name.map(function (name) {
    return `<tr> <td> ${name.zip}</td> <td>${name.cityName}</td></tr>`
  })
  const tableheaders = "<tr><th>Zipcode</th><th>City name</th></tr>"
  const joinedResult = list.join("");
  const finishedtable = tableheaders + joinedResult;
  return finishedtable;
}

function getPeople() {
  fetch("http://localhost:8080/ca2/api/persons")
    .then(res => res.json())
    .then(data => {
      document.getElementById("allPersons").innerHTML = makeTableRow(data);
    })
}
function displayAmount(count) {
  return count.count;
}
function getTotalAmountOfPeople() {
  fetch("http://localhost:8080/ca2/api/persons/count")
    .then(res => res.json())
    .then(data => {
      document.getElementById("amountOfUsers").innerText = displayAmount(data);
    })
}

function getAmountOfPeopleWithGivenHobby() {
  let hobby = document.getElementById("amountOfPeopleWithGivenHobby").value;
  fetch("http://localhost:8080/ca2/api/persons/count/" + hobby)
    .then(res => res.json())
    .then(data => {
      document.getElementById("amountOfPeopleWithGivenHobbyResult").innerText = displayAmount(data);
    })
}
function getPersonByID() {
  let id = document.getElementById("personID").value;
  fetch("http://localhost:8080/ca2/api/persons/id/" + id)
    .then(res => res.json())
    .then(data => {
      document.getElementById("personByID").innerHTML = makeSingleTableRow(data);
    })
}

//TODo søg for denne virker med endpoint
function getPersonByPhoneNum() {
  let phoneNumber = document.getElementById("phoneNumber").value;
  fetch("http://localhost:8080/ca2/api/persons/phone/" + phoneNumber)
    .then(res => res.json())
    .then(data => {
      document.getElementById("personByPhoneNumber").innerHTML = makeSingleTableRowForPerson(data);
    })
}




function deletePerson(event) {
  let id = document.getElementById("deletePersonID").value;
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:8080/ca2/api/persons/delete/" + id, true);
  xhttp.send();
  //let id = document.getElementById("personID").value;
  fetch("http://localhost:8080/ca2/api/persons/id/" + id)
    .then(res => res.json())
    .then(data => {
   
        document.getElementById("wasDeletedOrNot").innerHTML = "Deleted person with id: " + id;} 
      
   ).catch(error => {
    document.getElementById("wasDeletedOrNot").innerHTML = "Could not find a person with id: " + id;}
    ) }
  //document.getElementById("wasDeletedOrNot").innerHTML = "Deleted person with id: " + id;



function getPeopleWithHobby() {
  let hobby = document.getElementById("hobbyName").value;
  fetch("http://localhost:8080/ca2/api/persons/hobby/" + hobby)
    .then(res => res.json())
    .then(data => {
      document.getElementById("persons-with-hobby").innerHTML = makeTableRow(data);
    })
}

function getPersonsByZip() {
  let cityName = document.getElementById("cityName").value;
  fetch("http://localhost:8080/ca2/api/persons/city/" + cityName)
    .then(res => res.json())
    .then(data => {
      document.getElementById("personsByZip").innerHTML = makeTableRow(data);
    })
}

function getAllZips() {
  fetch("http://localhost:8080/ca2/api/zipcodes/")
    .then(res => res.json())
    .then(data => {
      document.getElementById("zipCodes").innerHTML = makeTableRowsForZips(data);
    })
}

let cities = [];

function populateCityarray() {
  
  fetch("http://localhost:8080/ca2/api/zipcodes/")
    .then(res => res.json())
    .then(data => {
      cities = makeArray(data);
    })
    
}
function makeArray(cityArr){
  cities = cityArr.map(function(city){
    return `${city.cityName}, ${city.zip}`
  })
  autocomplete(document.getElementById("cityInput"), cities);
}
let hobbies = [];

function populateHobbyarray() {
  
  fetch("http://localhost:8080/ca2/api/hobbies/")
    .then(res => res.json())
    .then(data => {
      hobbies = makeHobbyArray(data);
    })
    
}
function makeHobbyArray(hobbiesArr){
  hobbies = hobbiesArr.map(function(hobby){
    return `${hobby.name}`
  })
  autocomplete(document.getElementById("hobbyInput"), hobbies);
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "postnumre": hideAllShowOne("postnumre_html");

      document.getElementById("personsByZipSearch").onclick = () => getPersonsByZip();
      document.getElementById("getAllZips").onclick = () => getAllZips();

      break

    case "hobbies": hideAllShowOne("hobbies_html");


      document.getElementById("searchByHobby").addEventListener("click", getPeopleWithHobby);

      break

    case "personer": hideAllShowOne("personer_html");

      getPeople();

      getTotalAmountOfPeople();

      document.getElementById("searchHobby").onclick = () => getAmountOfPeopleWithGivenHobby();

      document.getElementById("search").onclick = () => getPersonByID();

      document.getElementById("personByPhoneSearch").onclick = () => getPersonByPhoneNum(); // needs testing !!!!

      break

    case "administrer": hideAllShowOne("administrer_html");

      document.getElementById("deletePerson").onclick = () => deletePerson(onclick)
      
      populateCityarray(); 

      populateHobbyarray();

      break

    default: hideAllShowOne("home_html");
      break
  }
  evt.preventDefault();
}





// function searchClicked(){
//   hideAllShowOne("search_html");
// }

document.getElementById("menu").onclick = menuItemClicked;


// document.getElementById("search").addEventListener("click", hideAllShowOne("search_html"));
hideAllShowOne("home_html");

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
