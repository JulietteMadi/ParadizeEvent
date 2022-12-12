const formSubmit = document.getElementById("submitButton");
const form = document.querySelector("form");
const elements = form.elements;
var now = new Date();
const toastEnd = document.getElementById("successToast");


const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
document.getElementById("date").setAttribute("min", today);


function submitValidation() {
    for (let element of elements) {
        const helpText = document.getElementById(`${element.id}Help`)
        const tooltip = new bootstrap.Tooltip(element)
        if (element.validity.valid) {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
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

function toastOfSuccess() {
    const toast = new bootstrap.Toast(toastEnd)
    toast.show();
}

formSubmit.addEventListener('click', event => {
    submitValidation();
    onChangeValidation();
    focusInput();
    //toastOfSuccess();
});

form.addEventListener('submit', toastOfSuccess)


