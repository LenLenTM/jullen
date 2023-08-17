class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

function postUserCredentials(){

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    //TODO: validate input. Also on server side.

    let user = new User(username, password);

    initiateSession(user);
}

async function initiateSession(user){

    fetch('./api/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }).then(function (response){
        response.text()
        .then(function (url){
            console.log(url);
            //location.href = url;
        })})

}