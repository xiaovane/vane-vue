import axios from 'axios';
import md5 from './md5';

// 这里自己获取token
let publickey = getPwd();

// axios 配置
axios.defaults.timeout = 1 * 60 * 1000;
axios.defaults.baseURL = '/';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (publickey) {
            config.headers.Authorization = `${publickey}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

function getPwd () {
    let cur = new Date();
    let y = cur.getFullYear();
    let m = cur.getMonth() + 1;
    let d = cur.getDate();
    let h = cur.getHours();
    let min = cur.getMinutes();
    let timestamp = new Date(`${y}/${m}/${d} ${h}:${min}`).getTime();
    return md5.hexMD5("123456-"+`${timestamp}`)
}

export default axios;