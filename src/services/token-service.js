import jwt from 'jwt-decode';
import LocalStorageService from './local-storage-service';

export default class TokenService {

    static getName() {
        const token = LocalStorageService.getToken();
        return token ? jwt(token).name : '';
    }
}