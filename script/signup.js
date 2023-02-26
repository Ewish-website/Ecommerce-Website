import { User } from "./user.js";
import { v4 as uuidv4 } from "uuid";

const inputs = document.querySelectorAll("input");
const submit = document.querySelector("#submit-signup")
const firstNameInput = inputs[0];
const lastNameInput = inputs[1];
const emailInput = inputs[2];
const passwordInput = inputs[3];

var regexName = /^[a-zA-Z]{3,10}$/;
var regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

class SignUp {

    constructor() {
        
        submit.addEventListener('click', this.validateNames.bind(this, firstNameInput.value, lastNameInput.value));
        submit.addEventListener('click', this.validateEmail.bind(this, emailInput.value));
        submit.addEventListener('click', this.localStorage);

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
        let users = [];   
        //this.localStorage.setItem('users',[])
        var user = new User(uuidv4(), emailInput.value, passwordInput.value, firstNameInput.value, lastNameInput.value, [], false);
        users = JSON.parse(localStorage.getItem('users'));
        users.push(user);
        // console.log(users);
        
        var json = JSON.stringify(users);
        localStorage.setItem('users', json);
    }
}

let signup = new SignUp();




