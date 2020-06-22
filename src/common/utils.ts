
/**
 * 睡眠函数
 * @param delay 延迟毫秒值
 */
export const sleep = (delay: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delay)
    })
};