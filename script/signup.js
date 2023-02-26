import { User } from "./user.js";
import { v4 as uuidv4 } from "uuid";

const inputs = document.querySelectorAll("input");
const submit = document.querySelector("#submit-signup");
const firstNameInput = inputs[0];
const lastNameInput = inputs[1];
const emailInput = inputs[2];
const passwordInput = inputs[3];

var regexName = /^[a-zA-Z]{3,10}$/;
var regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

class SignUp {
    user;
    constructor() {

        // submit.addEventListener('click', this.validateNames.bind(this, firstNameInput.value, lastNameInput.value));
        // submit.addEventListener('click', this.validateEmail.bind(this, emailInput.value));
        submit.addEventListener('click', this.localStorage.bind(this));

    }
    validateNames(first, last) {
        if (regexName.test(first) && regexName.test(last)) {
            console.log("valid names");
        } else {
            console.log("invalid names");
        }
    }

    validateEmail(email) {
        console.log(regexEmail.test(email));
    }

    localStorage() {
        this.validateNames
        let users = [];
        if (JSON.parse(localStorage.getItem('users'))) {
            users = JSON.parse(localStorage.getItem('users'));
            this.user = new User(uuidv4(), emailInput.value, passwordInput.value, firstNameInput.value, lastNameInput.value, [], false);
            users.push(this.user);
            var json = JSON.stringify(users);
            localStorage.setItem('users', json);
        } else {
            this.user = new User(uuidv4(), emailInput.value, passwordInput.value, firstNameInput.value, lastNameInput.value, [], false);
            users.push(this.user);
            var json = JSON.stringify(users);
            localStorage.setItem('users', json);

        }

    }
}

let signup = new SignUp();




