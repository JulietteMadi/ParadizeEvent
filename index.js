const submitForm = document.getElementById("submitButton")
const form = document.querySelector("form");
const elements = form.elements;
const now = new Date();
const toastEnd = document.getElementById("successToast");



/* Date Validation */
const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
document.getElementById("date").setAttribute("min", today);


/* Form behavior when submit successfully */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const toast = new bootstrap.Toast(toastEnd);
    toast.show();
    form.reset();
    for (let element of elements) {
        element.classList.remove("is-valid");
    }
});


/* Form behavior to handle valid & invalid input */
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
            let invalidInput = form.querySelector(':invalid')
            invalidInput.focus();
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
                if (element.validity.rangeUnderflow && element.id == "date") {
                    tooltip.setContent({ '.tooltip-inner': 'Doit être égale ou supérieure à aujourd\'hui' })
                } else if (element.validity.rangeUnderflow && element.id == "price") {
                    tooltip.setContent({ '.tooltip-inner': 'Doit être positif' });
                }
            }
        })
    }
};



