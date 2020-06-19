/* eslint-disable @typescript-eslint/interface-name-prefix */
interface ILoadingCtrl {
    open(): void;
    close(): void;
}

/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */
const noop: Function = () => {};

export default class LoadingCtrl implements ILoadingCtrl {

    openCb: Function = noop;

    closeCb: Function = noop;

    constructor(openCb = noop, closeCb = noop) {
        this.openCb = openCb;
        this.closeCb = closeCb;
    }

    open(): void {
        this.openCb();
    }

    close(): void {
        this.closeCb()
    }

}