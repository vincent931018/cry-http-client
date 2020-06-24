import { HttpOptions } from "../core/httpBase";

export interface LoadingOption {
    openLoadingMethod(): void;
    closeLoadingMethod(): void;
    loadingMessage: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Function = (): void => {};

class LoadingPlugin {
    public openLoadingMethod: Function;

    public closeLoadingMethod: Function;

    private apiCount: number;

    private loadingMessage: string;

    constructor(options: LoadingOption) {
        if (typeof options.openLoadingMethod !== "function" || typeof options.closeLoadingMethod !== "function") {
            throw new Error("loadingMethod must be function!");
        }
        this.openLoadingMethod = options.openLoadingMethod || noop;
        this.closeLoadingMethod = options.closeLoadingMethod || noop;
        this.loadingMessage = options.loadingMessage;
        this.apiCount = 0;
    }

    handlePreRequest(apiOptions: HttpOptions): void {
        if (apiOptions.isShowLoading && apiOptions.openLoadingMethod) {
            this.apiCount ++;
            this.openLoadingMethod();
        }
    }

    handleAftrtRequest(apiOptions: HttpOptions): void {
        if (apiOptions.isShowLoading) {
            this.apiCount --;
        }
        if (this.apiCount === 0) {
            this.closeLoadingMethod();
        }
    }
}

export default LoadingPlugin;
