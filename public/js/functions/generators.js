import { newVoteOptionEventHandler, deleteAccountEventHandler } from "../events/eventHandlers.js";
import { addNewVoteSubmitBtn } from "../htmlElements/htmlElements.js";

const generateProgressBars = (options) => {
    let progressBars = "";

    for (const value of options) {
        progressBars += `
            <span>${value.option}</span>
            <span class="float-end voteCounter">${value.voteCount}</span>
            <div class="progress voteProgress" role="progressbar" aria-label="Vote progress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: 0%"></div>
            </div>`;
    }
    return progressBars;
};

const generateVoteForm = (options, voteId) => {
    let inputs = `<form id='formVote${voteId}'>`;
    for (const value of options) {
        inputs += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="voteRadios" id="vote${value.id}Radios" value="${value.option}">
                <label class="form-check-label" for="vote${value.id}Radios">${value.option}</label>
            </div>`;
    }
    inputs += `</form`;
    return inputs;
};

const deleteAccountButton = () => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-danger');
    button.setAttribute('type', 'button');
    button.innerText = 'Delete account';
    button.id = 'deleteAccount';
    button.addEventListener('click', deleteAccountEventHandler);
    return button;
};

const generateNewVoteOptionField = (optionId) => {
    const div = document.createElement('div');
    div.classList.add('form-group');
    const label = document.createElement('label');
    label.setAttribute('for', `newVoteOption${optionId}`);
    label.innerText = `Option ${optionId}`;
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', `Vote option ${optionId}`);
    input.classList.add('form-control');
    input.id = `newVoteOption${optionId}`;
    input.addEventListener('input', (event) => {
        const result = newVoteOptionEventHandler(event);
        if (result && optionId > 1) {
            addNewVoteSubmitBtn.removeAttribute('disabled');
        }
        else {
            addNewVoteSubmitBtn.setAttribute('disabled', '');
        }
    });
    div.appendChild(label);
    div.appendChild(input);
    return div;
};


export { generateProgressBars, generateVoteForm, generateNewVoteOptionField, deleteAccountButton };