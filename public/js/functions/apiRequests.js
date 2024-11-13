import { checkUserRoleFromLocalStorage, readTokenFromLocalStorage } from "./readLocalStorage.js";
import { errorHandler } from "./errorHandler.js";
import { Info } from "../classes/Info.js";

const backEndUrl = '/api';

const fetchRequest = async (request) => {
    try {
        const response = await fetch(request);
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            if (contentType && contentType.includes('application/json')) {
                const errorObj = await response.json();
                if (errorObj.error !== undefined) {
                    if (errorObj.error === 'expected `username` to be unique') {
                        throw new Error('The username is already exist!');
                    }
                    else {
                        throw new Error(errorObj.error, { cause: 'fetchRequest' });
                    }
                }
                else if (errorObj.message !== undefined) {
                    throw new Info(errorObj.message);
                }
            }
            // If ContentType is not application/json
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        else if (response.status === 204) {
            return response;
        }
        else {
            const obj = await response.json();
            return obj;
        }
    } catch (error) {
        errorHandler(error);
    }
};

const getAllVotes = async () => {
    const request = new Request(backEndUrl + '/votes', {
        method: 'GET'
    });
    const response = await fetchRequest(request);
    return response;
};

const postNewVote = async (data) => {
    checkUserRoleFromLocalStorage(['admin']);
    const token = readTokenFromLocalStorage();

    const request = new Request(backEndUrl + "/vote", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const response = await fetchRequest(request);
    return response;
};

const getVote = async (voteId) => {
    checkUserRoleFromLocalStorage(['admin', 'user']);
    const token = readTokenFromLocalStorage();
    const request = new Request(backEndUrl + `/vote/${voteId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    const response = await fetchRequest(request);
    return response;
};

const deleteVote = async (voteId) => {
    checkUserRoleFromLocalStorage(['admin']);
    const token = readTokenFromLocalStorage();
    const request = new Request(backEndUrl + `/vote/${voteId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    const response = await fetchRequest(request);
    return response;

};

const votingVote = async (voteId, voteOptionId) => {
    checkUserRoleFromLocalStorage(['admin', 'user']);
    const token = readTokenFromLocalStorage();
    const request = new Request(backEndUrl + `/voting/${voteId} `, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token} `,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "voteOptionId": voteOptionId })
    });
    const response = await fetchRequest(request);
    return response;
};

const regNewUser = async (data) => {
    const request = new Request(backEndUrl + "/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const response = await fetchRequest(request);
    return response;
};

const loginUser = async (data) => {
    const request = new Request(backEndUrl + "/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(data),
    });
    const response = await fetchRequest(request);
    return response;
};

const deleteAccount = async () => {
    checkUserRoleFromLocalStorage(['admin', 'user']);
    const token = readTokenFromLocalStorage();
    const request = new Request(backEndUrl + '/users/', {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    const response = await fetchRequest(request);
    return response;

};

export { getAllVotes, postNewVote, getVote, deleteVote, votingVote, regNewUser, loginUser, deleteAccount };