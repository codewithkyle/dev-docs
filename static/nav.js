document.body.querySelectorAll("nav a").forEach((link) => {
    if (link.dataset.slug === location.pathname) {
        link.classList.add("is-active");
        const span = link.querySelector("span");
        const title = document.title;
        document.title = `${span.innerHTML.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())} - ${title}`;
    }
});
