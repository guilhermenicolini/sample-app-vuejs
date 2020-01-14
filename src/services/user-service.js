import Service from './service';
import LocalStorageService from './local-storage-service';

const BASE_URL = '/users'

export default class UserService {

    static signIn(user) {
        return Service.http
            .post(`${BASE_URL}`, user);
    }

    static logout() {
        LocalStorageService.clear();
    }
}