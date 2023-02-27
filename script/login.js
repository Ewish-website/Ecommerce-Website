const inputs = document.querySelectorAll("input");
const submit = document.querySelector("#submit-login")
const emailInput = inputs[0];
const passwordInput = inputs[1];
const wrongPassOrEmail = document.querySelector('.wrongPassOrEmail');


export class Login {

    constructor() {
        submit.addEventListener('click', this.login.bind(this))

    }

    login() {

        var users = localStorage.getItem('users');
        var userData = JSON.parse(users);
        userData.forEach(element => {
            element.active = false;
            if (element.email == emailInput.value && element.password == passwordInput.value) {
                element.active = true;
                location.assign('./index.html')

            
            } else {
                wrongPassOrEmail.style.display = "block";
            }

        });
        var json = JSON.stringify(userData);
        localStorage.setItem('users', json);

    }



}

let login = new Login();

