async function register(){

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let secret = document.getElementById('secret').value;

    fetch('./api/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"username":username, "password":password, "secret":secret})
    }).then(function (response){
        response.text()
            .then(function (url){
                console.log(url);
                //location.href = url;
            })})

}