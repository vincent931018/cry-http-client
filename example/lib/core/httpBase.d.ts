import { AxiosInstance } from 'axios';
export declare type HttpMethodsTypes = "get" | "post";
export interface HttpHeader {
    [key: string]: string;
}
export interface IHttpClient {
    get(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    post(url: string, pramas: object, options?: HttpCustomOptions): Promise<any>;
    setBaseUrl?(baseUrl: string): boolean;
    setTimeout?(timeout: number): boolean;
}
export interface HttpOptions {
    method: HttpMethodsTypes;
    showLoading: boolean;
    delay: number;
    headers: HttpHeader;
    chainStart: boolean;
    chainFinish: boolean;
    effectMainProcess: boolean;
    loadingMessage: string;
}
export interface AxiosOptions {
    timeout?: number;
    baseUrl?: string;
}
export declare type HttpCustomOptions = Partial<HttpOptions>;
export default class HttpBase implements IHttpClient {
    axios: AxiosInstance;
    setTimeout(timeout: number): boolean;
    setBaseURL(baseURL: string): boolean;
    get(url: string, params: object, options: HttpOptions): Promise<any>;
    post(url: string, params: object, options: HttpOptions): Promise<any>;
}
