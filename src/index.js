import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade"
import zipFacade from "./zipFacade"
import hobbyFacade from "./hobbyFacade"

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

function getPeople(){
  fetch("http://localhost:8080/ca2/api/persons")
        .then(res=>res.json())
        .then(data=> {
            document.getElementById("allPersons").innerHTML=makeTableRow(data);
        })
}


function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "postnumre": hideAllShowOne("postnumre_html"); break
    case "hobbies": hideAllShowOne("hobbies_html"); break
    case "personer": hideAllShowOne("personer_html"); getPeople() ; break
    case "administrer": hideAllShowOne("administrer_html"); break
    default: hideAllShowOne("home_html"); break
  }
  evt.preventDefault();
}





// function searchClicked(){
//   hideAllShowOne("search_html");
// }

document.getElementById("menu").onclick = menuItemClicked;
// document.getElementById("search").addEventListener("click", hideAllShowOne("search_html"));
hideAllShowOne("home_html");



