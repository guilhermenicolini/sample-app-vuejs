import Service from './service';

const BASE_URL = '/auth'

export default class AuthService {

    static login(user) {
        return Service.http
            .post(`${BASE_URL}/login`, user);
    }
}