import HttpClient from '../core/index';

export interface HttpClientPlugin {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    install(data: any): void;
}

/**
 * 使用插件
 * @param plugin
 */
export default (plugin: HttpClientPlugin): void => {
    plugin.install(HttpClient);
};