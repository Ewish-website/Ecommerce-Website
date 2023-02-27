import { Cart } from "./cart.js";
import { User } from "./user.js";

var userAccount = new User();
let loggedInUser = userAccount.isUserLoggedIn();

const user = document.querySelector("#user");
const cart = document.querySelector("#cart");
const userBoxName = document.querySelector('.user-content p');
const userBox = document.querySelector(".user-container");
const header = document.querySelector(".header-container");
const nav = document.querySelector("nav");
const logOut = document.querySelector("#logOut");

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');

}
const headerObserver = new IntersectionObserver(stickyNav,
    {
        root: null,
        threshold: 1
    }
);


headerObserver.observe(header)

///when pressed on user card checks if their is a user logged in 
user.addEventListener('click', function () {
    console.log(loggedInUser)
    if (loggedInUser) {
        let firstName = loggedInUser.firstName;
        let lastName = loggedInUser.lastName;
        userBoxName.innerText = `${firstName} ${lastName}`;
        if (userBox.style.display === "none") {
            userBox.style.display = "block";

        } else {
            userBox.style.display = "none";
        }
    } else {
        location.assign('./log-in.html');
    }
})

//check if thier is a user logged in when pressed on cart
cart.addEventListener('click', function () {
    if (loggedInUser.active) {
        let cart = new Cart();
    } else {
        location.assign('./log-in.html');
    }
})


logOut.addEventListener('click', function () {
    loggedInUser.active = false;
    userAccount.updateUser(loggedInUser);
    window.location.replace("log-in.html");
})


