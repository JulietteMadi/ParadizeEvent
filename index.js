const form = document.querySelector("form");
const elements = form.elements;
var now = new Date();
const toastEnd = document.getElementById("successToast");

const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
document.getElementById("date").setAttribute("min", today);

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const toast = new bootstrap.Toast(toastEnd)
    toast.show();
    form.reset();
    for (let element of elements) {
        element.classList.remove("is-valid")
    }
});

for (let element of elements) {
    type = element.type;
    if (type != "submit") {
        const tooltip = new bootstrap.Tooltip(element, { title: "Veuillez renseigner ce champ" });
        const helpText = document.getElementById(`${element.id}Help`);
        element.addEventListener("invalid", (event) => {
            event.preventDefault();
            element.classList.add("is-invalid");
            helpText.classList.add("text-danger");
        })
        element.addEventListener('change', (event) => {
            event.preventDefault();
            if (element.validity.valid) {
                element.classList.remove("is-invalid");
                element.classList.add("is-valid");
                helpText.classList.remove("text-danger");
                tooltip.disable();
            } else {
                element.classList.remove("is-valid");
                element.classList.add("is-invalid");
                helpText.classList.add("text-danger");
                tooltip.enable();
                onmouseenter = (event) => { tooltip.show() };
                if (element.validity.rangeUnderflow && element.id == "date") {
                    tooltip.setContent({ '.tooltip-inner': 'Doit être égale ou supérieure à aujourd\'hui' })
                } else if (element.validity.rangeUnderflow && element.id == "price") {
                    tooltip.setContent({ '.tooltip-inner': 'Doit être positif' })
                }
            }
        })
    };
};



