import { HttpOptions, HttpCustomOptions, HttpMethodsTypes } from "./httpBase";
import { DEFAULT_HTTP_OPTIONS } from "../config/config";
import HttpBase from "./httpBase";
import { sleep } from "../common/utils";

let uid = 0;
export interface HttpClientInstance {
    version: string;
    pendingApis: HttpOptions[];
    defaultOptions: HttpOptions;
    customOptions: HttpCustomOptions;
}

interface HttpOptionsWithid extends HttpOptions {
    id: number;
}

export default class HttpClient extends HttpBase {
    /**
     * httpClient 版本号
     */
    public version: string;

    /**
     * 当前请求中的 apis 集合
     */
    public pendingApis: HttpOptionsWithid[];

    /**
     * 整合后的请求配置
     */
    private clientOptions: HttpOptions;

    /**
     * 默认请求配置
     */
    public defaultOptions: HttpOptions;

    /**
     * 自定义的请求配置
     */
    public customOptions: HttpCustomOptions;

    constructor(options?: HttpOptions) {
        super();
        this.version = "__VERSION__";
        this.pendingApis = [];
        this.clientOptions = DEFAULT_HTTP_OPTIONS;
        this.defaultOptions = DEFAULT_HTTP_OPTIONS;
        this.customOptions = options ? options : DEFAULT_HTTP_OPTIONS;
    }

    /**
     * 用自定义配置创建实例
     * @param options 自定义请求配置参数
     */
    public create(options: HttpCustomOptions): HttpClientInstance {
        const optionsFromat: HttpOptions = (options
            ? options
            : Object.assign({}, options, DEFAULT_HTTP_OPTIONS)) as HttpOptions;
        return new HttpClient(optionsFromat);
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async preHandle(options: HttpOptions): Promise<number> {
        const sleepVal = options.delay;
        const id = uid ++;
        const httpOptionsWithUid: HttpOptionsWithid = Object.assign({}, options, {
            id
        });
        this.pendingApis.push(httpOptionsWithUid);
        await sleep(sleepVal);
        return id;
    }

    public cancelOthers(): boolean {
        // TODO
        return true;
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    private async doMethod(
        method: HttpMethodsTypes,
        url: string,
        params: object,
        options: HttpCustomOptions
    ): Promise<any> {
        const optionsFromat: HttpOptions = (options
            ? options
            : Object.assign({}, options, DEFAULT_HTTP_OPTIONS)) as HttpOptions;
        const apiId: number = await this.preHandle(optionsFromat);
        try {
            await super[method](url, params, optionsFromat);
        } catch (error) {
            return Promise.reject(error);
        } finally {
            this.pendingApis = this.pendingApis.filter(item => item.id !== apiId);
        }
    }
    /* eslint-enable */

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async post(url: string, params: object, options: HttpCustomOptions): Promise<any> {
        try {
            await this.doMethod("post", url, params, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async get(url: string, params: object, options: HttpCustomOptions): Promise<any> {
        try {
            await this.doMethod("get", url, params, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
