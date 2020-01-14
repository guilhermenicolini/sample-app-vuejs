import { Subject } from 'rxjs';

export default class SplSpinnerService {

    static subject = undefined;
    static threads = undefined;

    static get _spinner() {
        if (!SplSpinnerService.subject) {
            SplSpinnerService.subject = new Subject();
        }
        return SplSpinnerService.subject;
    }

    static get _threads() {
        if (!SplSpinnerService.threads) {
            SplSpinnerService.threads = 0;
        }
        return SplSpinnerService.threads;
    }

    static set _threads(value) {
        SplSpinnerService.threads = value;
    }

    static subscribe(callback) {
        return SplSpinnerService._spinner.subscribe(callback);
    }

    static on() {
        SplSpinnerService._threads += 1;
        SplSpinnerService._spinner.next({ show: SplSpinnerService._threads > 0 });
    }

    static off() {
        SplSpinnerService._threads -= 1;
        SplSpinnerService._spinner.next({ show: SplSpinnerService._threads > 0 });
    }

}