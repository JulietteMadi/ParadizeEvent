const form = document.querySelector("form");
const elements = form.elements;
const toastEnd = document.getElementById("successToast");
const now = new Date();


/* Date Validation */
const today = now.toISOString();
document.getElementById("date").setAttribute("min", today.slice(0, 10));

function elementValidStyle(element) {
    const helpText = document.getElementById(`${element.id}Help`);
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    helpText.classList.remove("text-danger");
    helpText.classList.add("text-success");
}

function elementInvalidStyle(element) {
    const helpText = document.getElementById(`${element.id}Help`);
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    helpText.classList.add("text-danger");
    helpText.classList.remove("text-success");
}

function tooltipMessage(element, tooltip) {
    if (!(element.validity.valueMissing))
        if (element.validity.rangeUnderflow && element.id == "date") {
            tooltip.setContent({ '.tooltip-inner': 'Doit être égale ou supérieure à aujourd\'hui' });
        } else if (element.validity.rangeUnderflow && element.id == "price") {
            tooltip.setContent({ '.tooltip-inner': 'Doit être positif' });
        } else {
            tooltip.setContent({ '.toolip-inner': 'Ce champ est obligatoire' })
        };

}

function focusOnInvalid() {
    const invalidInput = form.querySelector(':invalid')
    invalidInput.focus();
}


/* Form behavior when submit successfully */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("has been submitted")
    const toast = new bootstrap.Toast(toastEnd);
    toast.show();
    form.reset();
    for (let element of elements) {
        const helpText = document.getElementById(`${element.id}Help`);
        element.classList.remove('is-invalid');
        element.classList.remove('is-valid');
        helpText.classList.remove("text-danger");
        helpText.classList.remove("text-success")
    }
});


/* Form behavior to handle valid & invalid input */
for (let element of elements) {

    type = element.type;
    if (type != "submit") {
        element.addEventListener("invalid", (event) => {
            event.preventDefault();
            tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            elementInvalidStyle(element);
            focusOnInvalid();
            tooltip.enable();
        });

        element.addEventListener('change', (event) => {
            event.preventDefault();
            tooltip = bootstrap.Tooltip.getOrCreateInstance(element);
            if (element.validity.valid) {
                elementValidStyle(element);
                tooltip.hide();
                tooltip.disable();
            } else {
                elementInvalidStyle(element);
                tooltip.enable();
                tooltipMessage(element, tooltip);
            };
        });
    };
};



