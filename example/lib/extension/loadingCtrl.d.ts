interface ILoadingCtrl {
    setOpenCb(cb: Function): void;
    setCloseCb(cb: Function): void;
    open(): void;
    close(): void;
}
export default class LoadingCtrl implements ILoadingCtrl {
    openCb: Function;
    closeCb: Function;
    setOpenCb(cb: Function): void;
    setCloseCb(cb: Function): void;
    open(): void;
    close(): void;
}
export {};
