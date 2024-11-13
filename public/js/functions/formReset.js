import { newVoteOptionsDiv, newVoteAddOptionBtn, addNewVoteSubmitBtn, newVoteTitle, regSubmitBtn, regFullName, regUsername, regPassword1, regPassword2 } from "../htmlElements/htmlElements.js";
import { generateNewVoteOptionField } from "./generators.js";

const addVoteFormFieldReset = () => {
    newVoteTitle.removeAttribute('disabled');
    newVoteTitle.value = '';
    newVoteTitle.classList.remove('is-valid', 'is-invalid');
    const errorFields = newVoteTitle.nextElementSibling;
    if (errorFields !== null) {
        errorFields.remove();
    }
    newVoteOptionsDiv.innerHTML = '';
    for (let index = 1; index < 3; index++) {
        const optionField = generateNewVoteOptionField(index);
        optionField.children[1].setAttribute('disabled', '');
        newVoteOptionsDiv.appendChild(optionField);
    }
    newVoteAddOptionBtn.setAttribute('disabled', '');
    addNewVoteSubmitBtn.setAttribute('disabled', '');
};

const regFormFieldReset = () => {
    regSubmitBtn.setAttribute('disabled', '');
    const elements = [regFullName, regUsername, regPassword1, regPassword2];
    for (const [index, element] of elements.entries()) {
        if (index === 0) {
            element.removeAttribute('disabled');
        }
        else {
            element.setAttribute('disabled', '');
        }
        element.value = '';
        element.classList.remove('is-valid');
    }
};

export { addVoteFormFieldReset, regFormFieldReset };