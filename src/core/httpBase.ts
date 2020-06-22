import axios, { AxiosInstance } from 'axios';

export type HttpMethodsTypes = "get" | "post"

export interface HttpHeaders {
    [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IHttpClient {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    get(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    post(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
}

export interface HttpOptions {
    timeout: number; // 接口超时时间
    method: HttpMethodsTypes; // 接口调用方法 post、get
    baseURL: string; // 接口请求链接默认前缀
    delay: number; // 接口延迟调用
	headers: HttpHeaders; // 自定义请求头
}

export interface AxiosOptions {
    timeout?: number;
    baseUrl?: string;
}

export type HttpCustomOptions = Partial<HttpOptions>;

export default class HttpBase implements IHttpClient{

    axios: AxiosInstance = axios;

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async get(url: string, params: object, options: HttpOptions): Promise<any> {
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

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async post(url: string, params: object, options: HttpOptions): Promise<any> {
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

    cancel(): boolean {
        // TODO
        return true;
    }

}