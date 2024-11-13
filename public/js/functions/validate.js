const validateFullName = (fullName) => {
    const errors = [
        'The full name must be 7 character or over long',
        'The full name must contain only upper- and lowercase letters (a-ö), it must be in the form of John Dove and first and last name length 3 characters or over long'
    ];

    let valid = false;
    const msg = [];
    if (fullName.length < 7) {
        msg.push(errors[0]);
    }
    if (!/^[A-ZÅÄÖ][a-zåäö]{2,}(?<=\w) (?=\w)[A-ZÅÄÖ][a-zåäö-]{2,}$/.test(fullName)) {
        msg.push(errors[1]);
    }
    if (msg.length === 0) {
        valid = true;
    }


    return { valid, msg };
};

const validateUsername = (username) => {
    const errors = [
        'The username must be 3 character or over long',
        'The username must contain only small letters'
    ];

    let valid = false;
    const msg = [];
    if (username.length < 3) {
        msg.push(errors[0]);
    }
    if (!/^[a-z]+$/g.test(username)) {
        msg.push(errors[1]);
    }
    if (msg.length === 0) {
        valid = true;
    }


    return { valid, msg };
};

const validatePassword = (password) => {
    const errors = [
        'The password must be 8 character or over long',
        'The password must contain one or more of the a-z lowercase letter',
        'The password must contain one or more of the A-Z uppercase letter',
        'The password must contain one or more of the following special characters: @.#$!%*?&^',
        'The password must contain one or more of the 0-9 numeric character'
    ];

    let valid = false;
    const msg = [];
    if (password.length < 8) {
        msg.push(errors[0]);
    }
    if (!/^(?=.*[a-z])/.test(password)) {
        msg.push(errors[1]);
    }
    if (!/^(?=.*[A-Z])/.test(password)) {
        msg.push(errors[2]);
    }
    if (!/^(?=.*[@.#$!%*?&^])/.test(password)) {
        msg.push(errors[3]);
    }
    if (!/(?=.*[0-9])/.test(password)) {
        msg.push(errors[4]);
    }
    if (msg.length === 0) {
        valid = true;
    }
    return { valid, msg };
};

const comparePasswords = (pw1, pw2) => {
    let msg = '';
    let match = true;
    if (pw1 !== pw2) {
        match = false;
        msg = 'Passwords do not match!';
    }
    return { match, msg };
};

const validateNewVote = (text) => {
    const msg = [];
    let valid = true;
    if (text.length < 5) {
        msg.push('You need input 5 characters or over');
        valid = false;
    }
    return {valid, msg};
};

const validateNewVoteOption = (text) => {
    const msg = [];
    let valid = true;
    if (text.length < 1) {
        msg.push('You need input 1 characters or over');
        valid = false;
    }
    return {valid, msg};
};

export { validateFullName, validateUsername, validatePassword, comparePasswords, validateNewVote, validateNewVoteOption };