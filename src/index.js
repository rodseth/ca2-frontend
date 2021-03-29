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

function makeTableRow(name){
  const list = name.map(function (name){
      return `<tr> <td> ${name.email}</td> <td>${name.firstName}</td> <td>${name.lastName}</td></tr>`
  })
  const tableheaders = "<tr><th>email</th><th>firstName</th><th>lastName</th></tr>"
  const joinedResult = list.join("");
  const finishedtable = tableheaders+joinedResult;
  return finishedtable;
}
function makeSingleTableRow(name){
  const list = `<tr> <td> ${name.email}</td> <td>${name.firstName}</td> <td>${name.lastName}</td></tr>`
  const tableheaders =  "<tr><th>email</th><th>firstName</th><th>lastName</th></tr>"
  const finishedtable = tableheaders+list;
  return finishedtable;
}


function getPeople(){
  fetch("http://localhost:8080/ca2/api/persons")
        .then(res=>res.json())
        .then(data=> {
            document.getElementById("allPersons").innerHTML=makeTableRow(data);
        })
}
function displayAmount(count){
  return count.count;
}
function getTotalAmountOfPeople(){
  fetch("http://localhost:8080/ca2/api/persons/count")
        .then(res=>res.json())
        .then(data=> {
            document.getElementById("amountOfUsers").innerText=displayAmount(data);
        })
}

function getAmountOfPeopleWithGivenHobby(){
  let hobby = document.getElementById("amountOfPeopleWithGivenHobby").value;
  fetch("http://localhost:8080/ca2/api/persons/count/"+hobby)
  .then(res=>res.json())
  .then(data=> {
      document.getElementById("amountOfPeopleWithGivenHobbyResult").innerText=displayAmount(data);
  })
}
function getPersonByID(){
  let id = document.getElementById("personID").value;
  fetch("http://localhost:8080/ca2/api/persons/id/"+id)
        .then(res=>res.json())
        .then(data=> {
            document.getElementById("personByID").innerHTML=makeSingleTableRow(data);
        })
}

function deletePerson(event){
  let id = document.getElementById("deletePersonID").value;
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "http://localhost:8080/ca2/api/persons/delete/"+id, true);
  xhttp.send();

 document.getElementById("wasDeletedOrNot").innerHTML="Deleted person with id: " + id;
 
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "postnumre": hideAllShowOne("postnumre_html"); 
    break
    
    case "hobbies": hideAllShowOne("hobbies_html");  
    break

    case "personer": hideAllShowOne("personer_html"); 
    
    getPeople() ; 
    
    getTotalAmountOfPeople();
    
    document.getElementById("searchHobby").onclick = () =>getAmountOfPeopleWithGivenHobby();
    
    document.getElementById("search").onclick = () => getPersonByID();
   
   
    break
    
    case "administrer": hideAllShowOne("administrer_html"); 

    document.getElementById("deletePerson").onclick = () => deletePerson(onclick) 

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



