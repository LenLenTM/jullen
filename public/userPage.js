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
                    location.href = "https://jullen.at";
                })
        }
    });

    initializeFields();
}

function initializeFields(){

    fetch('./api/getUserConfiguration', {
        method: 'GET'
    }).then(response => response.json())
        .then(data => {
            document.getElementById('comment').value = data.comment;

            if (data.confirmation === 1){
                let button = document.getElementById('confirmation');
                button.style.backgroundColor = '#b5dba0';
                button.color = 'white';
            }
            else {
                let button = document.getElementById('cancellation');
                button.style.backgroundColor = 'indianred';
                button.color = 'white';
            }

            let title;

            if (data.sex === 1){
                title = 'Lieber';
            }
            else title = 'Liebe';

            document.getElementById('headline').innerText = title + " " + data.name + ",";

            if (data.email !== null){
                document.getElementById('email').value = data.email.toString();
            }
        });

    fetch('./api/isAdmin', {
        method: 'GET'
    }).then(response => {
        if (response.status === 200){
            document.getElementById('adminButton').style.display = "inline-block";
        }
    })
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

function showErrorMessage(text){
    var messageBox = document.getElementById('errorMessage');
    messageBox.innerText = text;
    messageBox.className = "show";
    setTimeout(function(){ messageBox.className = messageBox.className.replace("show", ""); }, 3000);
}

function getUsername(){

    fetch('./api/getUsername', {
        method: 'GET'
    }).then(response => {
        if (response.status === 200){
            response.text()
                .then(function (username){
                    console.log(username);
                    return username;
                });
        }
        else if (response.status === 403){
            console.log("Could not get username");
        }
    });
    return 'person not found';
}

//indianred -> mediumvioletred
//#e6e6e6 -> #b3b3b3
//b5dba0 -> forestgreen


function toggleConfirmation(){

    let button = document.getElementById('confirmation');

    if (button.style.backgroundColor !== 'rgb(181, 219, 160)'){
        button.style.backgroundColor = '#b5dba0';
        button.color = 'white';

        document.getElementById('cancellation').style.backgroundColor = '#e6e6e6';

        toggleDatabaseConfirmation(true);
    }
    else {
        button.style.backgroundColor = '#e6e6e6';
        button.color = '#ab97b8';
        toggleDatabaseConfirmation(null);
    }
}

function toggleCancellation(){

    let button = document.getElementById('cancellation');

    if (button.style.backgroundColor !== 'indianred'){
        button.style.backgroundColor = 'indianred';
        button.color = 'white';

        document.getElementById('confirmation').style.backgroundColor = '#e6e6e6';

        toggleDatabaseConfirmation(false);
    }
    else {
        button.style.backgroundColor = '#e6e6e6';
        button.color = '#ab97b8';
        toggleDatabaseConfirmation(null);
    }
}

function toggleDatabaseConfirmation(bool){

    fetch('./api/toggleConfirmation', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"confirmation":bool})
    }).then(response => {
            response.text()
                .then(function (text){
                    console.log(text);
                    showErrorMessage("Zusage/Absage geschickt");
        })});
}

function submitComment(){

    let comment = document.getElementById('comment').value;

    fetch('./api/submitComment', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"comment":comment})
    }).then(response => {
        response.text()
            .then(function (text){
                console.log(text);
                showErrorMessage('Kommentar gesendet');
                location.reload();
            })});
}

function submitEmail(){

    let email = document.getElementById('email').value;

    fetch('./api/submitEmail', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"email":email})
    }).then(response => {
        response.text()
            .then(function (text){
                console.log(text);
                showErrorMessage('Email gesendet');
                location.reload();
            })});
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