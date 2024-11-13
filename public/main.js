'use strict';

import { fullNameEventHandler, usernameEventHandler, passwordEventHandler, regSubmitEventHandler, loginEventHandler, logoutEventHandler, newVoteEventHandler, voteEventHandler, addNewVoteEventHandler, deleteVoteEventHandler } from "./js/events/eventHandlers.js";
import * as htmlElements from "./js/htmlElements/htmlElements.js";
import { notification } from "./js/functions/notification.js";
import { comparePasswords } from "./js/functions/validate.js";
import { generateVoteCardMap } from "./js/functions/votesMap.js";
import { generateNewVoteOptionField } from "./js/functions/generators.js";
import { getAllVotes } from "./js/functions/apiRequests.js";
import { login } from "./js/functions/logInAndLogOut.js";
import { showNoVotesText } from "./js/functions/votesMap.js";
import { addVoteFormFieldReset, regFormFieldReset } from "./js/functions/formReset.js";

let syncInterval = null;

const autoSyncData = async () => {
    console.log('Auto sync data');
    const response = await getAllVotes();
    //console.log(response);
    if (response === undefined) {
        htmlElements.mainContentDiv.innerHTML = '';
        htmlElements.errorDiv.append(htmlElements.noBackendConnectionError);
        htmlElements.mainContentDiv.appendChild(htmlElements.errorDiv);
        return;
    }
    if (response.status === 204) {
        showNoVotesText();
    }
    else if (response) {
        generateVoteCardMap(response);
        notification({ name: 'info', message: 'Auto refresh done!' });
    }
    if (!syncInterval) {
        console.log('setInterval');
        syncInterval = setInterval(autoSyncData, 30000);
    }

    return response;
};

htmlElements.regFullName.addEventListener('input', (event) => {
    const result = fullNameEventHandler(event);
    if (result) {
        htmlElements.regUser.removeAttribute('disabled');
    }
    else {
        htmlElements.regUser.setAttribute('disabled', '');
    }
    htmlElements.regSubmitBtn.setAttribute('disabled', '');
});

htmlElements.regUser.addEventListener('input', (event) => {
    const result = usernameEventHandler(event);
    if (result) {
        htmlElements.regPassword1.removeAttribute('disabled');
    }
    else {
        htmlElements.regPassword1.setAttribute('disabled', '');
    }

});

htmlElements.regPassword1.addEventListener('input', (event) => {
    htmlElements.regUser.setAttribute('disabled', '');
    htmlElements.regFullName.setAttribute('disabled', '');
    const result = passwordEventHandler(event);
    htmlElements.regPassword2.value = '';
    if (result) {
        htmlElements.regPassword2.removeAttribute('disabled');
    }
    else {
        htmlElements.regSubmitBtn.setAttribute('disabled', '');
        htmlElements.regPassword2.setAttribute('disabled', '');
    }
    if (event.target.value.length === 0) {
        htmlElements.regUser.removeAttribute('disabled');
        htmlElements.regFullName.removeAttribute('disabled');
    }
});

htmlElements.regPassword2.addEventListener('input', (event) => {
    const result = comparePasswords(htmlElements.regPassword1.value, event.target.value);
    let span = event.target.nextElementSibling;
    if (span === null) {
        span = document.createElement('span');
    }
    span.classList.add('text-danger');
    span.textContent = result.msg;
    event.target.after(span);

    if (result.match) {
        htmlElements.regSubmitBtn.removeAttribute('disabled');
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
    }
    else {
        htmlElements.regSubmitBtn.setAttribute('disabled', '');
        event.target.classList.remove('is-valid');
        event.target.classList.add('is-invalid');
    }
});

htmlElements.regSubmitBtn.addEventListener('click', (event) => {
    regSubmitEventHandler(event);
});

htmlElements.loginSubmitBtn.addEventListener('click', (event) => {
    loginEventHandler(event);
});

htmlElements.voteDeleteBtn.addEventListener('click', (event) => { deleteVoteEventHandler(event); });

htmlElements.newVoteTitle.addEventListener('input', (event) => {
    const result = newVoteEventHandler(event);
    if (result) {
        for (const field of htmlElements.newVoteOptionsDiv.childNodes) {
            field.children[1].removeAttribute('disabled');
        }
        htmlElements.newVoteAddOptionBtn.removeAttribute('disabled');
    }
    else {
        htmlElements.addNewVoteSubmitBtn.setAttribute('disabled', '');
        for (const field of htmlElements.newVoteOptionsDiv.childNodes) {
            field.children[1].setAttribute('disabled', '');
        }
        htmlElements.newVoteAddOptionBtn.setAttribute('disabled', '');
    }
});

htmlElements.newVoteAddOptionBtn.addEventListener('click', () => {
    htmlElements.addNewVoteSubmitBtn.setAttribute('disabled', '');
    const newField = generateNewVoteOptionField(htmlElements.newVoteOptionsDiv.childElementCount + 1);
    htmlElements.newVoteOptionsDiv.appendChild(newField);
});

htmlElements.addNewVoteSubmitBtn.addEventListener('click', (event) => addNewVoteEventHandler(event));

htmlElements.logoutBtn.addEventListener('click', logoutEventHandler);

htmlElements.voteSubmitBtn.addEventListener('click', (event) => { voteEventHandler(event); });

htmlElements.addVoteModal.addEventListener('hide.bs.modal', () => {
    addVoteFormFieldReset();
});

htmlElements.regModal.addEventListener('hide.bs.modal', () => {
    regFormFieldReset();
});

htmlElements.logonModal.addEventListener('hide.bs.modal', () => {
    htmlElements.loginForm.reset();
});

htmlElements.logonModal.addEventListener('hide.bs.modal', () => {
    htmlElements.loginForm.reset();
});

htmlElements.addVoteModal.addEventListener('show.bs.modal', () => {
    addVoteFormFieldReset();
});

login();
autoSyncData();
