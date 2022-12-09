const formSubmit = document.getElementById("submitButton");
const form = document.querySelector("form");
const elements = form.elements;
const notFirstTrial = false;

/* const toastTrigger = document.getElementById("submitButton");
const toastEnd = document.getElementById("successToast");
if (toastTrigger) {
    toastTrigger.addEventListener('submit', () => {
        const toast = new bootstrap.Toast(toastEnd)
        toast.show();
    })
} */

function formValidation() {
    for (let element of elements) {
        if (element.validity.valid) {
            element.classList.remove("is-invalid")
            element.classList.add("is-valid")
        } else {
            element.classList.remove("is-valid")
            element.classList.add("is-invalid");
            event.preventDefault();
            const tooltip = new bootstrap.Tooltip(element, { boundary: document.body })
            onmouseover = (event) => { tooltip.show(); };
        }
    }
};

function inputValidation() {
    for (let element of elements) {
        element.addEventListener('change', event => {
            if (element.validity.valid) {
                element.classList.remove("is-invalid")
                element.classList.add("is-valid")
            } else {
                element.classList.remove("is-valid")
                element.classList.add("is-invalid");
                event.preventDefault();
                const tooltip = new bootstrap.Tooltip(element, { boundary: document.body })
                onmouseover = (event) => { tooltip.show(); };
            }
        })
    }
}



formSubmit.addEventListener('click', formValidation);
formSubmit.addEventListener('click', inputValidation);



