import Vue from 'vue';

export default class NotificationService {

    static error(message) {
        Vue.notify({
            title: 'Error',
            type: 'error',
            text: message
        })
    }

    static success(message) {
        Vue.notify({
            title: 'Success',
            type: 'success',
            text: message
        })
    }
}