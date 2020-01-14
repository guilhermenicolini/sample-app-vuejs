import Service from './service';

const BASE_URL = '/beers'

export default class BeerService {

    static list() {
        return Service.http
            .get(`${BASE_URL}`);
    }

    static get(id) {
        return Service.http
            .get(`${BASE_URL}/${id}`);
    }

    static update(beer) {
        return Service.http
            .put(`${BASE_URL}/${beer.id}`, BeerService.format(beer));
    }

    static create(beer) {
        return Service.http
            .post(`${BASE_URL}`, BeerService.format(beer));
    }

    static remove(id) {
        return Service.http
            .delete(`${BASE_URL}/${id}`);
    }

    static format = (beer) => {
        const tmp = { ...beer };
        tmp.sampled = new Date(beer.sampled).getTime();
        return tmp;
    }
}