import { HttpOptions, HttpCustomOptions } from './httpBase';
import HttpBase from './httpBase'
import { DEFAULT_HTTP_OPTIONS } from '../config/config'

export default class HttpClient extends HttpBase {

    public version: string

    constructor() {
        super();
        this.version = '__VERSION__';
    }

    public setBaseUrl(baseUrl: string): boolean {
        return super.setBaseURL(baseUrl);
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    public get(url: string, params: object, options: HttpCustomOptions): Promise<any> {
        const optionsFormat: HttpOptions = Object.assign({}, DEFAULT_HTTP_OPTIONS, options) as HttpOptions;
        return super.get(url, params, optionsFormat);
    }

    public post(url: string, params: object, options: HttpCustomOptions): Promise<any> {
        const optionsFormat: HttpOptions = Object.assign({}, DEFAULT_HTTP_OPTIONS, options) as HttpOptions;
        return super.post(url, params, optionsFormat);
    }

}

export const httpClient = new HttpClient();