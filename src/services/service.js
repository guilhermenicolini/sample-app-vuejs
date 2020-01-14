import axios from 'axios';
import LocalStorageService from './local-storage-service';
import router from '../router'

const requestHandler = request => {
    
    const token = LocalStorageService.getToken();
    if (token) {
        request.headers.Authorization = LocalStorageService.getToken();
    }

    return request;
}

const responseHandler = response => {

    // if response receives Authorization token, so we save in local storage
    if (response.headers.authorization) {
        LocalStorageService.setToken(response.headers.authorization);
    }

    // if response receives Location, so we return in object
    let location = null;
    if (response.headers.location) {
        const arr = response.headers.location.split('/');
        location = arr[arr.length - 1];
    }

    return { 
        data: response.data,
        location: location
    };
};

const errorHandler = error => {

    // logoff if unauthorized
    if (error.response.status == 401) {
        LocalStorageService.clear();
        router.push({ name: 'Login' });
        return Promise.resolve();
    }

    return Promise.reject(customError(error));
};

const customError = (errors) => {
    try {
        return errors.response.data.errors.join('<br />')
    } catch {
        return errors.message;
    }
};

export default class Service {

    static _http = undefined;

    static get http() {
        if (!Service._http) {
            Service._http = axios.create({
                baseURL: process.env.VUE_APP_API_URL
            });
            Service._http.interceptors.request.use(
                request => requestHandler(request)
            );
            Service._http.interceptors.response.use(
                response => responseHandler(response),
                error => errorHandler(error)
            );
        }
        return Service._http;
    }
}