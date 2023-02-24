const inputs = document.querySelectorAll("input");
const submit = document.querySelector("#submit-signup")
const firstNameInput = inputs[0];
const lastNameInput = inputs[1];
const emailInput = inputs[2];
const passwordInput = inputs[3]

var regexName = /^[a-zA-Z]{3,10}$/;
var regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

submit.addEventListener('click', function () {

    validateNames(firstNameInput.value, lastNameInput.value);
    validateEmail(emailInput.value);
    var user = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        loggedIn: 'false'

    };
    var json = JSON.stringify(user);
    localStorage.setItem(emailInput.value, json);
    console.log("user added");

})


function validateNames(first,last) {
    if (regexName.test(first) && regexName.test(last)) {
        console.log("valid names");
    } else {
        console.log("invalid names");
    }
}

function validateEmail(email) {
    console.log(regexEmail.test(email));
}