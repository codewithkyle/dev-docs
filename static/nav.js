document.body.querySelectorAll("nav a").forEach((link) => {
    if (link.dataset.slug === location.pathname) {
        link.classList.add("is-active");
    }
});
