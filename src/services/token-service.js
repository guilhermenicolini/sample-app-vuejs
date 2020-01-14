import jwt from 'jwt-decode';
import LocalStorageService from './local-storage-service';

export default class TokenService {

    static token;
    static get _token() {
        if (!TokenService.token) {
            try {
                TokenService.token = jwt(LocalStorageService.getToken());
            } catch(error) {
                console.log(error);
            }
        }
        return TokenService.token;
    }

    static getName() {
        return TokenService._token.name;
    }
}