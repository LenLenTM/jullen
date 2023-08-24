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

function clickUser(){

    /*fetch('./api/verifyUser', {
        method: 'GET'
    }).then(function (res){
        res.text()
            .then(function (text) {
                if (text === "true"){
                    window.location.replace("https://jullen.at/userPage");
                }
                else {
                    if (document.getElementById("loginPopUp").style.display.toString() === "none"){
                        document.getElementById("loginPopUp").style.display = "flex";
                    }
                    else {
                        document.getElementById("loginPopUp").style.display = "none";
                    }
                }
            })
    });*/


    if (document.getElementById("loginPopUp").style.display.toString() === ""){
        document.getElementById("loginPopUp").style.display = "flex";
    }
    else {
        document.getElementById("loginPopUp").style.display = "";
    }
}

function closeForm(){
    document.getElementById("loginPopUp").style.display = "";
}