function handleClick(event) {
    const target = event.currentTarget;
    location.hash = target.id;
}
function handleKeyboard(event) {
    if (event instanceof KeyboardEvent) {
        const key = event.key.toLowerCase();
        if (key === "enter" || key === " ") {
            const target = event.currentTarget;
            location.hash = target.id;
        }
    }
}

document.body.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
    el.innerHTML += `<span>#</span>`;
    el.setAttribute("role", "button");
    el.tabIndex = "0";
    el.addEventListener("click", handleClick);
    el.addEventListener("keyup", handleKeyboard);
});
