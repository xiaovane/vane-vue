
import axios from 'axios';
import bus from '../public/baseurl'

export const login = (params) => {
    return axios({
        url:bus.baseUrl+ `app/membership/login`,
        method: 'post',
        data:params
    })
};

export const save = (params) => {
    return axios({
        url:bus.baseUrl+ `app/membership/save`,
        method: 'put',
        data:params
    })
};

export const detail = (params) => {
    return axios({
        url:bus.baseUrl+ `app/membership/detail/id/${params}`,
        method: 'get'
    })
};

export const message = (params) => {
    return axios({
        url:bus.baseUrl+ `app/membership/message`,
        method: 'post',
        data:params
    })
};

export const messageChcek = (param1,param2) => {
    return axios({
        url:bus.baseUrl+ `app/membership/check/phone/${param1}/code/${param2}`,
        method: 'get'
    })
};



