import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { version } from './package.json';

export default {
    input: "./src/index.ts",
    output: [{
        file: './dist/index.js',
        name: 'httpClient',
        format: 'umd',
        sourcemap: false
    }, {
        file: './example/lib/index.js',
        name: 'httpClient',
        format: 'umd',
        sourcemap: true
    }],
    plugins: [
        typescript({
            exclude: 'node_modules/**',
            typescript: require('typescript'),
        }),
        replace({
            __VERSION__: version
        }),
        // 配合 commnjs 解析第三方模块
        resolve({
            browser: true
        }),
        // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
        commonjs({
            'axios': ['axios'],
        }),
        json()
    ],
};