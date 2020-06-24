import axios, { AxiosInstance } from "axios";

export type HttpMethodsTypes = "get" | "post" | "put" | "delete" | "head" | "patch";

export interface HttpHeaders {
    [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IHttpClient {
    setAxiosInstance(options: AxiosOptions): boolean;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    get(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    post(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    delete(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    put(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    head(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    patch(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    /* eslint-enable  @typescript-eslint/no-explicit-any */
    cancel(): boolean;
}

export interface HttpOptions {
    timeout: number; // 接口超时时间
    method: HttpMethodsTypes; // 接口调用方法 post、get
    baseURL: string; // 接口请求链接默认前缀
    delay: number; // 接口延迟调用
    headers: HttpHeaders; // 自定义请求头
    isShowLoading: boolean; // 请求时是否显示loading
    chainStart: boolean; // 标识链式请求开始 loading防抖
    chainEnd: boolean; // 标识链式请求结束 loading防抖
    chainReject: boolean; // 链式调用是否取消下传
    openLoadingMethod(): void; // 打开loading回调
    closeLoadingMethod(): void; // 关闭loading回调
    loadingMessage: string; // loading加载文案
}

export interface AxiosOptions {
    timeout?: number;
    baseURL?: string;
    headers?: HttpHeaders;
}

export type HttpCustomOptions = Partial<HttpOptions>;

export default class HttpBase implements IHttpClient {
    axiosInstance: AxiosInstance = axios;

    public setAxiosInstance(options: AxiosOptions): boolean {
        this.axiosInstance = axios.create(options);
        return true;
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async get(url: string, params: object, options: HttpOptions): Promise<any> {
        return this.axiosInstance.get(url, {
            params: params,
            headers: options.headers
        });
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async post(url: string, params: object, options: HttpOptions): Promise<any> {
        return this.axiosInstance.post(url, params, {
            headers: options.headers
        });
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async delete(url: string, params: object, options: HttpOptions): Promise<any> {
        return this.axiosInstance.delete(url, {
            params: params,
            headers: options.headers
        });
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async head(url: string, params: object, options: HttpOptions): Promise<any> {
        return this.axiosInstance.head(url, {
            params: params,
            headers: options.headers
        });
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async put(url: string, params: object, options: HttpOptions): Promise<any> {
        return this.axiosInstance.put(url, params, options);
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async patch(url: string, params: object, options: HttpOptions): Promise<any> {
        return this.axiosInstance.patch(url, params, options);
    }

    cancel(): boolean {
        // TODO
        return true;
    }
}
