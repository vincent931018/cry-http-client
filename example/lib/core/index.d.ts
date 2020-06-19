import { HttpCustomOptions } from './httpBase';
import HttpBase from './httpBase';
export default class HttpClient extends HttpBase {
    version: string;
    constructor();
    setBaseUrl(baseUrl: string): boolean;
    get(url: string, params: object, options: HttpCustomOptions): Promise<any>;
    post(url: string, params: object, options: HttpCustomOptions): Promise<any>;
}
export declare const httpClient: HttpClient;
