import { HttpClientPlugin } from './use';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface ILoadingCtrl {
    isLoading: boolean;
    open(): void;
    close(): void;
}

// eslint-disable-next-line  no-empty-function, @typescript-eslint/no-empty-function
const noop: Function = () => {};

export default class LoadingCtrl implements ILoadingCtrl, HttpClientPlugin {

    isLoading: boolean;

    openCb: Function;

    closeCb: Function;

    constructor(openCb = noop, closeCb = noop) {
        this.isLoading = false;
        this.openCb = openCb;
        this.closeCb = closeCb;
    }

    install(): void {
        // TODO
    }

    open(): void {
        this.openCb();
    }

    close(): void {
        this.closeCb()
    }

}