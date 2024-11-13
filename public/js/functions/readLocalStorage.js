import { Info } from "../classes/Info.js";
import { errorHandler } from "./errorHandler.js";
import { tokenDecode } from "./logInAndLogOut.js";

const checkLocalStorage = () => {
    if (localStorage.getItem('VotingApp') === null) return false;
    const item = JSON.parse(localStorage.getItem('VotingApp'));
    if (item === null) return false;
    return item;
};

const clearLocalStorage = () => {
    localStorage.removeItem('VotingApp');
    return true;
};

const readTokenFromLocalStorage = () => {
    try {
        const token = readLocalStorage('token');
        if (!token) {
            throw new Error('You need login!');
        }
        return token;
    }
    catch (error) {
        errorHandler(error);
    }
};

const checkUserRoleFromLocalStorage = (roles, silentError = false) => {
    try {
        const decodedToken = tokenDecode();
        if (decodedToken === null) throw new Info('You need login!');

        if (roles.includes(decodedToken.role)) {
            return decodedToken;
        }
        else {
            throw new Error('You did not have permission!');
        }
    }
    catch (error) {
        errorHandler(error, silentError);
    }
};

const readLocalStorage = (key) => {
    const item = checkLocalStorage();
    if (!item || item[key] === null) return null;
    return item[key];
};

const writeLocalStorageUserInfo = (userInfo) => {
    clearLocalStorage();
    localStorage.setItem('VotingApp', JSON.stringify(userInfo));
};


export { readTokenFromLocalStorage, checkUserRoleFromLocalStorage, readLocalStorage, writeLocalStorageUserInfo, clearLocalStorage };