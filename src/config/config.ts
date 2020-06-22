import { HttpOptions } from '../core/httpBase';

export const DEFAULT_HTTP_OPTIONS: HttpOptions = {
    timeout: 1000 * 60,
    delay: 0,
    baseURL: "",
    method: "post",
	headers: {}
};