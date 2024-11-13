class Info extends Error {
    constructor(message) {
        super(message);
        this.name = 'Info';
    }
}

export { Info };