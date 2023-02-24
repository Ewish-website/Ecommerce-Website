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
