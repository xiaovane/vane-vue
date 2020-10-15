
import axios from 'axios';
import bus from '../public/baseurl'

export const getIndex = () => {
    return axios({
        url:bus.baseUrl+ `app/video/index`,
        method: 'get'
    })
};

export const getLive = () => {
    return axios({
        url:bus.baseUrl+ `app/video/live`,
        method: 'get'
    })
};

export const searchList = (params) => {
    return axios({
        url:bus.baseUrl+ `app/video/search`,
        method: 'post',
        data:params
    })
};

export const detail = (params) => {
    return axios({
        url:bus.baseUrl+ `app/video/detail/id/${params}`,
        method: 'get'
    })
};




