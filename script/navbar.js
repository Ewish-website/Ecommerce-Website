const header = document.querySelector(".header-container");
const nav = document.querySelector("nav");


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



const user = document.querySelector("#user")

// check if their is a user logged in?
//user logged in? show small pop up window on hover with user name
//no user logged in? redirect to signup/login