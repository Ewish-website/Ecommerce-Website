const contactForm = document.querySelector(".content-contact-form");
const nav = document.querySelector("nav");

console.log(contactForm);
console.log(nav);
const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');

}
const contactObserver = new IntersectionObserver(stickyNav,
    {
        root: null,
        threshold: 1
    }
);


contactObserver.observe(contactForm)