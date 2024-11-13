import { notification } from "./notification.js";

const errorHandler = (error, silentError = false) => {
    if (error.message !== undefined && !silentError) {
        if (error.name.toLowerCase() === 'error') {
            notification({ name: 'error', message: error.message });
            return;
        }
        else if (error.name === 'Info') {
            notification({ name: 'info', message: error.message });
        }
    }
    return;
};

export { errorHandler };