const form = document.querySelector("form");
const elements = form.elements;
const now = new Date();
const toastEnd = document.getElementById("successToast");



/* Date Validation */
const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
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

        const helpText = document.getElementById(`${element.id}Help`);

        function elementValid() {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
            helpText.classList.remove("text-danger");
            helpText.classList.add("text-success")
            tooltip.disable();
        }

        function elementInvalid() {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
            helpText.classList.add("text-danger");
            helpText.classList.remove("text-success")
            tooltip.enable();
        }

        function invalidFocus() {
            const invalidInput = form.querySelector(':invalid')
            invalidInput.focus();
        }

        const tooltip = new bootstrap.Tooltip(element, { title: "Veuillez renseigner ce champ" });
        function tooltipMessage() {
            if (element.validity.rangeUnderflow && element.id == "date") {
                tooltip.setContent({ '.tooltip-inner': 'Doit être égale ou supérieure à aujourd\'hui' });
            } else if (element.validity.rangeUnderflow && element.id == "price") {
                tooltip.setContent({ '.tooltip-inner': 'Doit être positif' });
            };
        }


        element.addEventListener("invalid", (event) => {
            event.preventDefault();
            elementInvalid();
            tooltipMessage();
        });

        element.addEventListener('change', (event) => {
            event.preventDefault();
            invalidFocus();
            if (element.validity.valid) {
                elementValid();
            } else {
                elementInvalid();
                tooltipMessage();
            };
        });
    };
};



