const form = document.querySelector("form");
const elements = form.elements;
var now = new Date();
const toastEnd = document.getElementById("successToast");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const toast = new bootstrap.Toast(toastEnd)
    toast.show();
    document.documentElement.scrollTop = 0;
    form.reset();
    for (let element of elements) {
        element.classList.remove("is-valid");
    }
});

for (let element of elements) {
    const tooltip = new bootstrap.Tooltip(element)
    const helpText = document.getElementById(`${element.id}Help`)
    element.addEventListener("invalid", (event) => {
        event.preventDefault();
        type = element.type;
        if (type != "submit") {
            element.classList.add("is-invalid");
            helpText.classList.add("text-danger")
        }
    })
    element.addEventListener('change', (event) => {
        event.preventDefault();
        type = element.type;
        if (type != "submit") {
            if (element.validity) {
                element.classList.remove("is-invalid")
                element.classList.add("is-valid")
                helpText.classList.remove("text-danger")
                tooltip.disable();
            } else {
                element.classList.remove("is-valid")
                element.classList.add("is-invalid");
                helpText.classList.add("text-danger")
                tooltip.enable();
                onmouseover = (event) => { tooltip.show() };
            }
        }
    })
}

const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
document.getElementById("date").setAttribute("min", today);

