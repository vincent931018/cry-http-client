/**
 * 睡眠函数
 * @param delay 延迟毫秒值
 */
export const sleep = (delay: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
};

/**
 * 合并函数
 */
interface Obj {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
export const merger = function (...rest: Obj[]): Obj {
    const args = [].slice.call(rest);
    const after = args.reduce((cur, next) => {
        return Object.assign({}, cur, next);
    }, {});
    return after;
};
