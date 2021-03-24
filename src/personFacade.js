//URL="https://ipwithme.com/ca2/api/persons";
URL = "http://localhost:3333/api/persons";

const personFade = {
    getAllPersons
}

function getAllPersons() {
    const options = makeOptions("GET");
    return fetch(URL, options)
        .then(handleHttpErrors);
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