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
function populateCityarrayForZipsearch() {
  
  fetch("http://localhost:8080/ca2/api/zipcodes/")
    .then(res => res.json())
    .then(data => {
      cities = makeArrayForFindingZip(data);
    })
    
}
function makeArray(cityArr){
  cities = cityArr.map(function(city){
    return `${city.cityName}, ${city.zip}`
  })
  autocomplete(document.getElementById("cityInput"), cities);
  autocomplete(document.getElementById("cityInputEdit"), cities);
}
function makeArrayForFindingZip(cityArr){
  cities = cityArr.map(function(city){
    return `${city.cityName}, ${city.zip}`
  })
  autocomplete(document.getElementById("cityName"), cities);
  
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
  autocomplete(document.getElementById("hobbyInputEdit"), hobbies);
  autocomplete(document.getElementById("hobbyName"), hobbies);
  autocomplete(document.getElementById("amountOfPeopleWithGivenHobby"), hobbies);
  autocomplete(document.getElementById("hobbyInputEdit"), hobbies);
  
}

let chosenHobbiesList = [];
let sendHobbies = [];


function addHobbyToList(hobby){
  sendHobbies.push(hobby);
  let newList = [];
  let headers = `<tr> <th>Hobby</th> </tr`;
  if(chosenHobbiesList.length == 0){
  chosenHobbiesList.unshift(headers);
}
  chosenHobbiesList.push(` <tr> <td>${hobby}<td> </tr> `);
  console.log(chosenHobbiesList);
  newList = chosenHobbiesList;
  document.getElementById("addHobbyTable").innerHTML = newList.join("");
}


function hideFields(){
  document.getElementById("nameEditDiv").style.visibility="hidden";
  document.getElementById("emailEditDiv").style.visibility="hidden";
  document.getElementById("cityEditDiv").style.visibility="hidden";
  document.getElementById("addressEditDiv").style.visibility="hidden";
  document.getElementById("phoneEditDiv").style.visibility="hidden";
  document.getElementById("hobbyEditDiv").style.visibility="hidden";
  document.getElementById("submitEditDiv").style.visibility="hidden";
  document.getElementById("phoneEditTableDiv").style.visibility="hidden";
  
  
  
}
let personByPhoneArr = [];

function showFields(phone){
  if(phone!==""){
  document.getElementById("nameEditDiv").style.visibility="visible";
  document.getElementById("emailEditDiv").style.visibility="visible";
  document.getElementById("cityEditDiv").style.visibility="visible";
  document.getElementById("addressEditDiv").style.visibility="visible";
  document.getElementById("phoneEditDiv").style.visibility="visible";
  document.getElementById("hobbyEditDiv").style.visibility="visible";
  document.getElementById("submitEditDiv").style.visibility="visible";
  document.getElementById("phoneEditTableDiv").style.visibility="visible";
  }
 
  fetch("http://localhost:8080/ca2/api/persons/phone/" + phone)
    .then(res => res.json())
    .then(data => {
      personByPhoneArr = fillFieldsWithData(data);
      document.getElementById("phoneEditTable").innerHTML = fetchPhonesForTable(data.phonesDTO);
      document.getElementById("hobbyEditTable").innerHTML = fetchHobbiesForTable(data.hobbiesDTO);
    });
}
let listOfHobbiesForTable=[];
function fetchHobbiesForTable(hobby){
   listOfHobbiesForTable = hobby.map(function (hobby){
      return `<tr> <td>${hobby.name}</td></tr>`;
  });
  let headers = `<tr><th>Hobby</th></tr>`;
  listOfHobbiesForTable.unshift(headers);
  let joinedList = listOfHobbiesForTable.join("");
  
  return joinedList ;
}

let listOfPhonesForTable=[];
function fetchPhonesForTable(phones){
   listOfPhonesForTable = phones.map(function (phone){
      return `<tr> <td>${phone.phoneNumber}</td> <td>${phone.typeOfNumber}</td> </tr>`;
  });

 
  let headers = `<tr><th>Phone</th><th>Type</th></tr>`;
  listOfPhonesForTable.unshift(headers);
  let joinedList = listOfPhonesForTable.join("");
  
  return joinedList ;
}

function deleteHobbyFromArray(hobby){
  let arr = [];
  let i =0;
 
  for(i; i<listOfHobbiesForTable.length; i++){
    console.log(hobby);
    if(listOfHobbiesForTable[i].includes(hobby)){
       
    }else{
     arr.push(listOfHobbiesForTable[i]);
    
   
  }
  listOfHobbiesForTable.splice(0,listOfHobbiesForTable.length);
  console.log("after Splice: " + listOfHobbiesForTable);
  listOfHobbiesForTable = arr;
  let newList = listOfHobbiesForTable.join("");
  console.log(newList);
  document.getElementById("hobbyEditTable").innerHTML = newList;
}
}
function addHobbyToTable(hobby){

  listOfHobbiesForTable.push(`<tr> <td>${hobby}</td> </tr>`);
  console.log("list: " + listOfHobbiesForTable);
  let newList = listOfHobbiesForTable.join("");
  document.getElementById("hobbyEditTable").innerHTML = newList;
}


function deletePhoneFromArray(phoneNr){
  let arr = [];
  let i =0;
  if(phoneNr.length<8){
    alert("Phonenumber must be 8 characters or more");
  } else{

  for(i; i<listOfPhonesForTable.length; i++){
    console.log(phoneNr);
    if(listOfPhonesForTable[i].includes(phoneNr)){
       
    }else{
     arr.push(listOfPhonesForTable[i]);
    }
   
  }
  let headers = `<tr><th>Phone</th><th>Type</th></tr>`;
  listOfPhonesForTable.splice(0,listOfPhonesForTable.length);
  console.log("after Splice: " + listOfPhonesForTable);
  listOfPhonesForTable = arr;
  let newList = listOfPhonesForTable.join("");
  console.log(newList);
  document.getElementById("phoneEditTable").innerHTML = newList;
}
}

function fillFieldsWithData(data){
  console.log(data);
  document.getElementById("personFirstNameEdit").value =  `${data.firstName}`;
  document.getElementById("personLastNameEdit").value =  `${data.lastName}`;
  document.getElementById("personEmailEdit").value =  `${data.email}`;
  document.getElementById("cityInputEdit").value =  `${data.addressesDTO.cityInfoDto.cityName}, ${data.addressesDTO.cityInfoDto.zip}`;
  document.getElementById("addressInputEdit").value =  `${data.addressesDTO.street}`;
  document.getElementById("addressNumberInputEdit").value =  `${data.addressesDTO.additionalInfo}`;
  //document.getElementById("phoneEditTable").value =  `${data.addressesDTO.additionalInfo}`; // Laves tabel
  //document.getElementById("hobbyEditTable").value =  `${data.addressesDTO.additionalInfo}`; // Laves tabel


}
function addPhoneToTable(phoneNumber, typeOfNumber1, typeofNr2){
  if(phoneNumber.length<8){
    alert("Phonenumber must be 8 characters or more");
  } else{
  let typeOfNumber;
  if(typeOfNumber1!==undefined){
    typeOfNumber = typeOfNumber1;
  } else if(typeofNr2!==undefined){
    typeOfNumber = typeofNr2;
  }else{
    alert("Please select type of phone")
  }
  listOfPhonesForTable.push(`<tr> <td>${phoneNumber}</td> <td>${typeOfNumber}</td> </tr>`);
  console.log("list: " + listOfPhonesForTable);
  let newList = listOfPhonesForTable.join("");
  document.getElementById("phoneEditTable").innerHTML = newList;
}
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "postnumre": hideAllShowOne("postnumre_html");
      populateCityarrayForZipsearch(); 
      document.getElementById("personsByZipSearch").onclick = () => getPersonsByZip();
      document.getElementById("getAllZips").onclick = () => getAllZips();

      break

    case "hobbies": hideAllShowOne("hobbies_html");
      populateHobbyarray();

      document.getElementById("searchByHobby").addEventListener("click", getPeopleWithHobby);

      break

    case "personer": hideAllShowOne("personer_html");

      getPeople();

      getTotalAmountOfPeople();

      populateHobbyarray();
      

      document.getElementById("searchHobby").onclick = () => getAmountOfPeopleWithGivenHobby();

      document.getElementById("search").onclick = () => getPersonByID();

      document.getElementById("personByPhoneSearch").onclick = () => getPersonByPhoneNum(); // needs testing !!!!

      break

    case "administrer": hideAllShowOne("administrer_html");

      hideFields();

      document.getElementById("findEditPerson").onclick = () => showFields(document.getElementById("editPersonPhone").value)

      document.getElementById("deletePerson").onclick = () => deletePerson(onclick)
      
      populateCityarray(); 

      populateHobbyarray();

      document.getElementById("addHobbyBtn").onclick = () => addHobbyToList(document.getElementById("hobbyInput").value);
      
      document.getElementById("addPhoneForEditBtn").onclick = () => addPhoneToTable(document.getElementById("phoneNrInputEdit").value);

      document.getElementById("removePhoneForEditBtn").onclick = () => deletePhoneFromArray(document.getElementById("phoneNrInputEdit").value);
      
      document.getElementById("addPhoneForEditBtn").onclick = () => addPhoneToTable(document.getElementById("phoneNrInputEdit").value, document.getElementById("homeRadio").value,  document.getElementById("mobileRadio").value);
      document.getElementById("addHobbyBtnEdit").onclick = () => addHobbyToTable(document.getElementById("hobbyInputEdit").value);
      document.getElementById("removeHobbyBtnEdit").onclick = () => deleteHobbyFromArray(document.getElementById("hobbyInputEdit").value);

 let finalHobbyList;
        function makeFinalArray(data){ 
          let string = data
          finalHobbyList = string;
          return finalHobbyList;
        }

      document.getElementById("creeateUserBtn").onclick = (event) => {
        event.preventDefault;
        
        let someString = document.getElementById("cityInput").value;
        let index = someString.indexOf(" ");  // Gets the first index where a space occours
        let city = someString.substr(0, index); // Gets the first part
        let zip = someString.substr(index + 1);
        let mobileType;
         if(document.getElementById("homeRadioEdit").value=="home"){
          mobileType= "home"
        } else {
          mobileType = "mobile"
        }

        let options;
        makeFinalAddHobbyArray();
        function makeFinalAddHobbyArray(){
          let arr = sendHobbies.join(",");
          console.log(arr);
          fetch("http://localhost:8080/ca2/api/hobbies/"+arr)
          .then(res => res.json())
          .then(data => {
            console.log("Retrieved following hobbies: " + data);
            makeFinalArray(data);
            options = {
              method: "POST",
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
                          },
            body: JSON.stringify({ 
              email: document.getElementById("personEmail").value,
                        firstName:  document.getElementById("personFirstName").value,
                        lastName: document.getElementById("personLastName").value,
                        addressesDTO: {
                            street: document.getElementById("addressInput").value,
                            additionalInfo: document.getElementById("addressNumberInput").value
                             },
                             
                        phonesDTO: [
                                {
                            phoneNumber: document.getElementById("phoneNrInput").value,
                            typeOfNumber: mobileType
                            }
                        ],
                        hobbiesDTO: 
                         finalHobbyList,  
                        cityInfoDTO: {
                          zip: zip,
                          cityName: city
                        }
                      
                            }).replace()
            }
            console.log(options);
              fetch("http://localhost:8080/ca2/api/persons/create/", options)
              .then(response => response.json())
              .then(json =>console.log("hej",json))
              .catch(err=>console.log(err));

          })
          
          
          
        }
       
       
       
         
       
    }; 
      
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

document.getElementById("createPerson").onclick =  () => (function post(){
 
}
)

