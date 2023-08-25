function initiateTable(){

    let guestlist = [];

    fetch('./api/guestInfo', {
        method: 'GET'
    }).then(response => {
        if (response.status === 200){
            response.json()
                .then(data => {
                    data.forEach((guest) => appendGuestElement(guest));
                });
        }
        else if (response.status === 403){
            response.text()
                .then(text => {
                    console.log(text);
                });
        }
    });
}

function appendGuestElement(guest){

    const newRow = document.createElement("div");
    newRow.className = "row";

    const newConfirmation = document.createElement("div");
    newConfirmation.className = "confirmationIndicator";

    if (guest.commited === 1){
        newConfirmation.style.backgroundColor = "#b5dba0";
    }
    else {
        newConfirmation.style.backgroundColor = "indianred";
    }

    const userField = document.createElement("p");
    userField.className = "userField";

    userField.innerText = guest.username;

    const commentField = document.createElement("textarea");
    commentField.className = "commentField";
    commentField.setAttribute('readonly', true);

    commentField.value = guest.comment;

    const emailField = document.createElement("p");
    emailField.className = "emailField";

    if (guest.email !== null){
        emailField.innerText = guest.email;
    }

    newRow.appendChild(newConfirmation);
    newRow.appendChild(userField);
    newRow.appendChild(commentField);
    newRow.appendChild(emailField);

    const parent = document.getElementById('infoTable');
    parent.appendChild(newRow);
}