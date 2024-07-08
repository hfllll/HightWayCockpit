import axios from '@/libs/api.request'


export const getAllDigital = () => {
    return axios.request({
      url: '/digital/getAllDigital',
      method: 'get',
    })
} 

export const getTop = (data) => {
    return axios.request({
      url: '/digital/getTop',
      params:data,
      method: 'get',
    })
} 