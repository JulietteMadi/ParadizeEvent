const form = document.querySelector("form");
const elements = form.elements;

for (const element of elements) { // pour les boucles comme ça, on peut utilsier forEach aussi, mais uniquement en utilisant les indices
    const type = element.type
    if (type != "submit") {
        element.addEventListener("invalid", (event) => {
            element.classList.remove("is-valid")
            element.classList.add("is-invalid")
        })
        element.addEventListener("valid", (event) => {
            element.classList.remove("is-invalid")
            element.classList.add("is-valid")
        })
    }
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
})

