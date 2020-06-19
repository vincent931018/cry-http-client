import axios, { AxiosInstance } from 'axios';

export type HttpMethodsTypes = "get" | "post"

export interface HttpHeader {
    [key: string]: string;
}

/* eslint-disable @typescript-eslint/interface-name-prefix */
export interface IHttpClient {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    get(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    post(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    setBaseUrl?(baseUrl: string): boolean;
    setTimeout?(timeout: number): boolean;
}

export interface HttpOptions {
    method: HttpMethodsTypes; // 接口调用方法 post、get
	showLoading: boolean; // 接口是否显示loading
    delay: number; // 接口延迟调用
	headers: HttpHeader; // 自定义请求头
    chainStart: boolean; // 链式调用开头
    chainFinish: boolean; // 链式调用结尾
	effectMainProcess: boolean; // 是否关键请求 异常跳错误页
	loadingMessage: string;
}

export interface AxiosOptions {
    timeout?: number;
    baseUrl?: string;
}

export type HttpCustomOptions = Partial<HttpOptions>;

const sleep = (delay: number): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, delay)
    })
};

export default class HttpBase implements IHttpClient{

    axios: AxiosInstance = axios;

    public setTimeout(timeout: number): boolean {
        this.axios.defaults.timeout = timeout;
        return true;
    }

    public setBaseURL(baseURL: string): boolean {
        this.axios.defaults.baseURL = baseURL;
        return true;
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    public async get(url: string, params: object, options: HttpOptions): Promise<any> {
        await sleep(options.delay);
        return new Promise((resolve, reject) => {
            this.axios.get(url, {
                params: params,
                headers: options.headers
            }).then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);
            })
        })
    }

    public async post(url: string, params: object, options: HttpOptions): Promise<any> {
        await sleep(options.delay);
        return new Promise((resolve, reject) => {
            this.axios.post(url, params, {
                headers: options.headers
            }).then(res => {
                resolve(res);
            }).catch(e => {
                reject(e);
            })
        })
    }

}