import HttpClient from "./export";
import { HttpOptions } from "./core/httpBase";
import { DEFAULT_HTTP_OPTIONS } from "./config/config";
import { HttpClientInstance } from "./core/index";

const createInstanse = function (options: HttpOptions): HttpClientInstance {
    const instance = new HttpClient(options);
    return instance;
};

const httpClient = createInstanse(DEFAULT_HTTP_OPTIONS);

export default httpClient;
