class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}



function loadPage(){
    fetch('./api/verifyUser', {
        method: 'GET'
    }).then(response => {
        if (response.status === 403){
            response.text()
                .then(function (text){
                    console.log(text);
                })
        }
        else if (response.status === 200) {
            changeUserIcon();
        }
    });
}

function login(){

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    //TODO: validate input. Also on server side.

    let user = new User(username, password);

    initiateSession(user);
}

function logout(){
    fetch('/api/logout', {
        method: 'GET'
    }).then(response => {
        if (response.status === 200){
            console.log("Logged out");
            location.href = "https://jullen.at";
        }
        else {
            console.log("Error logging out");
        }
    });
}

async function initiateSession(user){

    fetch('./api/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (response.status === 403){
            response.text()
                .then(function (text){
                document.getElementById('credentialStatus').innerText = text;
                document.getElementById('credentialStatus').style.display = "inline-block";
            })
        }
        else {
            location.reload();
        }
    })
}

function clickUser(){

    fetch('./api/verifyUser', {
        method: 'GET'
    }).then(response => {
        if (response.status === 200){
            if (document.getElementById("userMenu").style.display.toString() === ""){
                document.getElementById("userMenu").style.display = "block";
            }
            else {
                document.getElementById("userMenu").style.display = "";
            }
        }
        else {
            if (document.getElementById("loginPopUp").style.display.toString() === ""){
                document.getElementById("loginPopUp").style.display = "block";
            }
            else {
                closeForm()
            }
        }
    });
}

function closeForm(){
    document.getElementById("loginPopUp").style.display = "";
    document.getElementById('credentialStatus').style.display = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function changeUserIcon(){

    if (document.getElementById('menu-user-icon').classList.contains('menu-icons-user')){
        document.getElementById('menu-user-icon').classList.remove('menu-icons-user');
        document.getElementById('menu-user-icon').classList.add('menu-icons');
    }
    else {
        document.getElementById('menu-user-icon').classList.remove('menu-icons');
        document.getElementById('menu-user-icon').classList.add('menu-icons-user');
    }
}

function showErrorMessage(text){
    var messageBox = document.getElementById('errorMessage');
    messageBox.innerText = text;
    messageBox.className = "show";
    setTimeout(function(){ messageBox.className = messageBox.className.replace("show", ""); }, 3000);
}