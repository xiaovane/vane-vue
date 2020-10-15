import axios from 'axios';
import bus from '../public/baseurl'

export const list = (params) => {
    return axios({
        url:bus.baseUrl+ `app/news/list/channel/${params}`,
        method: 'get',
    })
};

export const search = (params) => {
    return axios({
        url:bus.baseUrl+ `app/news/search`,
        method: 'post',
        data:params
    })
};

export const detail = (params) => {
    return axios({
        url:bus.baseUrl+ `app/news/detail/id/${params}`,
        method: 'get'
    })
};

export const getChannelList = () => {
    return axios({
        url:bus.baseUrl+ `app/news/channels`,
        method: 'get'
    })
};