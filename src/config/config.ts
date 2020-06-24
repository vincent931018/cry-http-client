import { HttpOptions } from "../core/httpBase";

export const DEFAULT_HTTP_OPTIONS: HttpOptions = {
    timeout: 1000 * 60 * 10,
    delay: 0,
    baseURL: "",
    method: "post",
    headers: {},
    isShowLoading: true,
    chainStart: false,
    chainEnd: false,
    chainReject: false,
    /* eslint-disable @typescript-eslint/no-empty-function */
    openLoadingMethod: () => {},
    closeLoadingMethod: () => {},
    /* eslint-enable @typescript-eslint/no-empty-function */
    loadingMessage: "加载中..."
};
