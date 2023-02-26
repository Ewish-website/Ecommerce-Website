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

    if (isUserLoggedIn()) {
        let user = isUserLoggedIn();
        let firstName = user.firstName;
        let lastName = user.lastName;
        userBoxName.innerText = `${firstName} ${lastName}`;
        if (userBox.style.display === "none") {
            userBox.style.display = "block";

        } else {
            userBox.style.display = "none";
        }
    } else {
        location.assign('./log-in.html');
    }


}
)

//check if thier is a user logged in when pressed on cart
cart.addEventListener('click', function () {
    if (isUserLoggedIn()) {
        location.assign('./cart.html');
    } else {
        location.assign('./log-in.html');
    }
})


logOut.addEventListener('click', function () {

    var users = localStorage.getItem('users');
    var userData = JSON.parse(users);
    userData.forEach(element => {
        console.log(element);
        if (element.active === true) {
            element.active = false;
        }

    });

    var json = JSON.stringify(userData);
    localStorage.setItem('users', json);

})

function isUserLoggedIn() {
    let loggedInUser;
    var users = localStorage.getItem('users');
    var userData = JSON.parse(users);
    userData.forEach(element => {
        if (element.active === true) {
            loggedInUser = element;
        }

    });

    return loggedInUser;
}
