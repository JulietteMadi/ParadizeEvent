const formSubmit = document.getElementById("submitButton");
const form = document.querySelector("form");
const elements = form.elements;
const today = new Date();

function submitValidation() {
    for (let element of elements) {
        const helpText = document.getElementById(`${element.id}Help`)
        const tooltip = new bootstrap.Tooltip(element)
        if (element.validity.valid) {
            element.classList.remove("is-invalid")
            element.classList.add("is-valid")
            tooltip.disable();
        } else {
            element.classList.remove("is-valid")
            element.classList.add("is-invalid");
            event.preventDefault();
            helpText.classList.add("text-danger")
            onmouseenter = (event) => { tooltip.show(); };
        }
    }
};


function onChangeValidation() {
    for (let element of elements) {
        const helpText = document.getElementById(`${element.id}Help`)
        const tooltip = new bootstrap.Tooltip(element)
        element.addEventListener('change', event => {
            if (element.validity.valid) {
                element.classList.remove("is-invalid")
                element.classList.add("is-valid")
                helpText.classList.remove("text-danger")
                tooltip.disable();
            } else {
                element.classList.remove("is-valid")
                element.classList.add("is-invalid");
                event.preventDefault();
                helpText.classList.add("text-danger")
                tooltip.enable();
                onmouseover = (event) => { tooltip.show(); };
                console.log("went at the onmouseover")
            }
        })
    }
}

function focusInput() {
    for (let element of elements) {
        if (!element.validity.valid) {
            element.focus();
            break;
        }
    }
}

formSubmit.addEventListener('click', submitValidation);
formSubmit.addEventListener('click', onChangeValidation);
formSubmit.addEventListener('click', focusInput);

const toastTrigger = document.getElementById("submitButton");
const toastEnd = document.getElementById("successToast");
if (toastTrigger) {
    formSubmit.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastEnd)
        toast.show();
    })
}

