
import axios from 'axios';
import bus from '../public/baseurl'

export const adList= (params) => {
    return axios({
        url:bus.baseUrl+ `app/adver/${bus.tenant}/list`,
        method: 'post',
        data:params
    })
};


export const adDetail = (params) => {
    return axios({
        url:bus.baseUrl+ `app/adver/detail/id/${params}`,
        method: 'get'
    })
};



