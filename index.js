const form = document.querySelector("form");
const elements = form.elements;
const now = new Date();
const toastEnd = document.getElementById("successToast");

/* Date Validation */
const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
document.getElementById("date").setAttribute("min", today);

function elementValidStyle(element, helpText) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    helpText.classList.remove("text-danger");
    helpText.classList.add("text-success");
}

function elementInvalidStyle(input, helpText) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    helpText.classList.add("text-danger");
    helpText.classList.remove("text-success");
}

function tooltipMessage(element, tooltip) {
    if (element.validity.rangeUnderflow && element.id == "date") {
        tooltip.setContent({ '.tooltip-inner': 'Doit être égale ou supérieure à aujourd\'hui' });
    } else if (element.validity.rangeUnderflow && element.id == "price") {
        tooltip.setContent({ '.tooltip-inner': 'Doit être positif' });
    }
}


function focusOnInvalid() {
    const invalidInput = form.querySelector(':invalid')
    invalidInput.focus();
}


/* Form behavior when submit successfully */
form.addEventListener("submit", (event) => {
    event.preventDefault();
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
        const helpText = document.getElementById(`${element.id}Help`);
        const tooltip = new bootstrap.Tooltip(element, { title: "Veuillez renseigner ce champ" });
        tooltip.disable();

        element.addEventListener("invalid", (event) => {
            event.preventDefault();
            elementInvalidStyle(element, helpText);
            focusOnInvalid();
            tooltip.enable();
        });

        element.addEventListener('change', (event) => {
            event.preventDefault();
            if (element.validity.valid) {
                elementValidStyle(element, helpText);
                tooltip.disable();
            } else {
                elementInvalidStyle(element, helpText);
            };
            if (element.className.includes("is-invalid")) {
                tooltip.enable();
                tooltipMessage(element, tooltip);
            }
        });
    };
};



