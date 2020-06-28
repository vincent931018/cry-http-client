import { HttpOptions } from "../core/httpBase";

export interface LoadingOption {
    openLoadingMethod(): void;
    closeLoadingMethod(): void;
    loadingMessage: string;
}

class LoadingPlugin {
    public openLoadingMethod: Function;

    public closeLoadingMethod: Function;

    private apiCount: number;

    private loadingMessage: string;

    constructor(options: LoadingOption) {
        if (typeof options.openLoadingMethod !== "function" || typeof options.closeLoadingMethod !== "function") {
            throw new Error("loadingMethod must be function!");
        }
        this.openLoadingMethod = options.openLoadingMethod;
        this.closeLoadingMethod = options.closeLoadingMethod;
        this.loadingMessage = options.loadingMessage;
        this.apiCount = 0;
    }

    handlePreRequest(apiOptions: HttpOptions): void {
        if (apiOptions.isShowLoading) {
            this.apiCount ++;
            apiOptions.openLoadingMethod ? apiOptions.openLoadingMethod() : this.openLoadingMethod();
        }
    }

    handleAftrtRequest(apiOptions: HttpOptions): void {
        if (apiOptions.isShowLoading) {
            this.apiCount --;
        }
        if (this.apiCount === 0) {
            apiOptions.closeLoadingMethod ? apiOptions.closeLoadingMethod() : this.closeLoadingMethod;
        }
    }
}

export default LoadingPlugin;
