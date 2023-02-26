const inputs = document.querySelectorAll("input");
const submit = document.querySelector("#submit-login")
const emailInput = inputs[0];
const passwordInput = inputs[1];


submit.addEventListener('click', function () {
    login();
})
function login() {
    
    var user = localStorage.getItem(emailInput.value);

    var userData = JSON.parse(user);

    if (user == null) {
        console.log("wrong email");

    } else if (emailInput.value === userData.email && passwordInput.value === userData.password) {
  
        userData['loggedIn'] = "true";
        localStorage.setItem(emailInput.value, JSON.stringify(userData));
        location.assign("./index.html");
    } else {
        console.log("wrong password");

    }
}