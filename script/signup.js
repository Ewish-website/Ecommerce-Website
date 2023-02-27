import { User } from "./user.js";
import { v4 as uuidv4 } from "uuid";

const inputs = document.querySelectorAll("input");
const submit = document.querySelector("#submit-signup")
const firstNameInput = inputs[0];
const lastNameInput = inputs[1];
const emailInput = inputs[2];
const passwordInput = inputs[3];
const wrongEmail = document.querySelector('.wrongEmail');
const wrongPassword = document.querySelector('.wrongPassword');
const wrongFname = document.querySelector('.wrongFname');
const wrongLname = document.querySelector('.wrongLname');

var regexName = /^[a-zA-Z]{3,10}$/;
var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class SignUp {
    user;
    constructor() {

        //submit.addEventListener('click', this.validateNames.bind(this, firstNameInput.value, lastNameInput.value));
        //submit.addEventListener('click', this.validateEmail.bind(this, emailInput.value));
        //submit.addEventListener('click', this.validatePassword.bind(this, passwordInput.value));
        submit.addEventListener('click', this.localStorage.bind(this));
        submit.addEventListener('click', function (e) {
            e.preventDefault();
        })

    }
    validateNames(firstName, lastNAme) {
        if (!regexName.test(firstName)) {
            wrongFname.style.display = "block";
        } else if (!regexName.test(lastNAme)) {
            wrongLname.style.display = "block";
        } else {
            wrongFname.style.display = "none";
            wrongLname.style.display = "none";
            return true;
        }

    }
    validateEmail(email) {
        if (regexEmail.test(email)) {
            wrongEmail.style.display = "none";
            return true;
        } else {
            wrongEmail.style.display = "block";

        }

    }
    validatePassword(password) {
        if (password.length < 6) {
            wrongPassword.style.display = "block";
        } else {
            wrongPassword.style.display = "none";
            return true;
        }
    }

    localStorage() {
        if (this.validateNames(firstNameInput.value, lastNameInput.value) && this.validateEmail(emailInput.value) && this.validatePassword(passwordInput.value)) {
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
            location.assign('./log-in.html');
        } 

    }
}

let signup = new SignUp();

