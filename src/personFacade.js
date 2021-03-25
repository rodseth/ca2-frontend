//URL="https://ipwithme.com/ca2/api/persons";
URL = "http://localhost:3333/api/persons";

const personFade = {
    getAllPersons,
    getPersonsWithGivenHobby,
    getPersonsFromGivenZip,
    getPersonsWithHobbyCount,
    addPerson,
    deletePerson,
    editPerson,
    getPersonById,
    getAllHobbies



}

function getAllPersons() {
    const options = makeOptions("GET");
    return fetch(URL, options)
        .then(handleHttpErrors);
}

function getPersonsWithGivenHobby(hobby) {
    const options = makeOptions("GET")
    return fetch(SERVER_URL + "peopByHobby/" + hobby)
        .then(handleHttpErrors)
}

function getPersonsFromGivenZip(zip) {
    const options = makeOptions("GET")
    return fetch(SERVER_URL + "peopleByZip/" + zip)
        .then(handleHttpErrors)

}

function getPersonsWithHobbyCount(hobby) {
    const options = makeOptions("GET")
    return fetch(SERVER_URL + "peopleNumberByHobby/" + hobby)
        .then(handleHttpErrors)

}

function addPerson(person) {
    const options = makeOptions("POST", person)
    return fetch(SERVER_URL, options)
        .then(handleHttpErrors)

}

function deletePerson(id) {
    const options = makeOptions("DELETE")
    return fetch(SERVER_URL + id, options)
        .then(handleHttpErrors)

}

function editPerson(person, id) {
    const options = makeOptions("PUT", person)
    return fetch(SERVER_URL + id, options)
        .then(handleHttpErrors)
}

function getPersonById(id) {
    const options = makeOptions("GET")
    return fetch(SERVER_URL + "id/" + id)
        .then(handleHttpErrors)
}




function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();

}

export default personFade;