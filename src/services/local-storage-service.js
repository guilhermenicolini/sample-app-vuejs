const CONSTANTS = {
    TOKEN: 'token'
}

export default class LocalStorageService {

    static getToken() {
        return localStorage.getItem(CONSTANTS.TOKEN);
    }

    static setToken(token) {
        localStorage.setItem(CONSTANTS.TOKEN, token);
    }

    static clear() {
        localStorage.clear();
    }
}