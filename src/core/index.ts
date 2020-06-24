import { HttpOptions, HttpCustomOptions, HttpMethodsTypes } from "./httpBase";
import { DEFAULT_HTTP_OPTIONS } from "../config/config";
import HttpBase from "./httpBase";
import { sleep, merger } from "../common/utils";
import LoadingPlugin from "../plugins/loading";

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
     * httpClient 版本号
     */
    public debug: boolean;

    /**
     * 当前请求中的 apis 集合
     */
    public pendingApis: HttpOptionsWithid[];

    /**
     * 默认请求配置
     */
    public defaultOptions: HttpOptions;

    /**
     * 自定义的请求配置
     */
    public customOptions: HttpCustomOptions;

    /**
     * loading控制器
     */
    public loadingCtrl: LoadingPlugin;

    constructor(options: HttpOptions) {
        super();
        this.debug = false;
        this.version = "__VERSION__";
        this.pendingApis = [];
        super.setAxiosInstance({
            baseURL: options.baseURL,
            timeout: options.timeout,
            headers: options.headers
        });
        this.customOptions = options ? options : DEFAULT_HTTP_OPTIONS;
        this.defaultOptions = merger({}, DEFAULT_HTTP_OPTIONS, this.customOptions) as HttpOptions;
        this.loadingCtrl = new LoadingPlugin({
            loadingMessage: this.defaultOptions.loadingMessage,
            openLoadingMethod: this.defaultOptions.openLoadingMethod,
            closeLoadingMethod: this.defaultOptions.closeLoadingMethod
        });
    }

    /**
     * 用自定义配置创建实例
     * @param options 自定义请求配置参数
     */
    public create(options: HttpCustomOptions): HttpClientInstance {
        const optionsFromat: HttpOptions = (options
            ? options
            : merger({}, options, DEFAULT_HTTP_OPTIONS)) as HttpOptions;
        return new HttpClient(optionsFromat);
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async preHandle(options: HttpOptions): Promise<number> {
        const sleepVal = options.delay;
        const id = uid ++;
        const httpOptionsWithUid: HttpOptionsWithid = merger({}, options, {
            id
        }) as HttpOptionsWithid;
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
            : merger({}, options, DEFAULT_HTTP_OPTIONS)) as HttpOptions;
        this.loadingCtrl.handlePreRequest(optionsFromat);
        const apiId: number = await this.preHandle(optionsFromat);
        // eslint-disable-next-line no-console
        this.debug &&
            console.info(`request: ${optionsFromat.baseURL} ${url} start \n options: ${JSON.stringify(optionsFromat)}`);
        try {
            const res = await super[method](url, params, optionsFromat);
            // eslint-disable-next-line no-console
            this.debug &&
                console.info(
                    `request: ${optionsFromat.baseURL} ${url} start \n result: ${JSON.stringify(res || null)}`
                );
        } catch (error) {
            // eslint-disable-next-line no-console
            this.debug &&
                console.info(`request: ${optionsFromat.baseURL} ${url} start \n error: ${JSON.stringify(error)}`);
            return Promise.reject(error);
        } finally {
            this.pendingApis = this.pendingApis.filter(item => item.id !== apiId);
            this.loadingCtrl.handleAftrtRequest(optionsFromat);
            // eslint-disable-next-line no-console
            this.debug && console.info(`request: ${optionsFromat.baseURL} ${url} start \n end`);
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

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async head(url: string, params: object, options: HttpCustomOptions): Promise<any> {
        try {
            await this.doMethod("get", url, params, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async delete(url: string, params: object, options: HttpCustomOptions): Promise<any> {
        try {
            await this.doMethod("get", url, params, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async put(url: string, params: object, options: HttpCustomOptions): Promise<any> {
        try {
            await this.doMethod("get", url, params, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    public async patch(url: string, params: object, options: HttpCustomOptions): Promise<any> {
        try {
            await this.doMethod("get", url, params, options);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
