import { Info } from "../classes/Info.js";
import { userNameSpan, showRegModal, logoutBtn, logonBtn, loginForm, showAddVoteModalBtn, navMenu } from "../htmlElements/htmlElements.js";
import { errorHandler } from "./errorHandler.js";
import { deleteAccountButton } from "./generators.js";
import { notification } from "./notification.js";
import { readLocalStorage, clearLocalStorage } from "./readLocalStorage.js";

const tokenDecode = () => {
    const tokenFromLocalStorage = readLocalStorage('token');
    if (tokenFromLocalStorage !== null) {
        const arrayOfToken = tokenFromLocalStorage.split('.');
        const decodedToken = JSON.parse(atob(arrayOfToken[1]));
        return decodedToken;
    }
    return null;
};

const login = () => {
    try {
        const decodedToken = tokenDecode();
        if (decodedToken !== null) {
            const deleteAccount = deleteAccountButton();
            navMenu.prepend(deleteAccount);
            // Reset login form;
            loginForm.reset();

            // Show full name of the logged in user in the navbar
            userNameSpan.textContent = `Welcome ${decodedToken.name}`;
            userNameSpan.classList.remove('d-none');

            // hide register button
            showRegModal.classList.add('d-none');

            // Show logout button
            logoutBtn.classList.remove('d-none');

            // Hide logon button
            logonBtn.classList.add('d-none');

            if (decodedToken.role === 'admin') {
                showAddVoteModalBtn.classList.remove('d-none');
            }
            const timestamp = Date.now();
            const logoutTime = decodedToken.exp * 1000 - timestamp;
            setTimeout(logout, logoutTime);
            throw new Info('User logged in');
        }
    }
    catch (error) {
        errorHandler(error);
    }
};

const logout = () => {
    clearLocalStorage();
    const deleteButton = document.getElementById("deleteAccount");
    deleteButton.remove();

    // Hide logout button
    logoutBtn.classList.add('d-none');

    // Show login button
    logonBtn.classList.remove('d-none');

    // Show register button
    showRegModal.classList.remove('d-none');

    // Remove full name of logged in user from the navbar
    userNameSpan.textContent = '';
    userNameSpan.classList.add('d-none');

    showAddVoteModalBtn.classList.add('d-none');

    console.log('logout');
    notification({ name: 'info', message: 'You are logged out!' });
};

export { login, logout, tokenDecode };