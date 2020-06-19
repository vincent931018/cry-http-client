import { HttpOptions, AxiosOptions } from '../core/httpBase';

export const DEFAULT_HTTP_OPTIONS: HttpOptions = {
    method: "post", // 接口调用方法 post、get
	showLoading: true, // 接口是否显示loading
    delay: 0, // 接口延迟调用
	headers: {}, // 自定义请求头
    chainStart: false, // 链式调用开头
    chainFinish: false, // 链式调用结尾
	effectMainProcess: false, // 是否关键请求 异常跳错误页
	loadingMessage: "加载中..."
};

export const DEFAULT_AXIOS_OPTIONS: AxiosOptions = {
    timeout: (1000 * 10),
    baseUrl: "",
};