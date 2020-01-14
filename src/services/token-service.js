import jwt from 'jwt-decode';
import LocalStorageService from './local-storage-service';

export default class TokenService {

    static token;
    static get _token() {
        if (!TokenService.token) {
            TokenService.token = jwt(LocalStorageService.getToken());
        }
        return TokenService.token;
    }

    static getName() {
        return TokenService._token.name;
    }
}