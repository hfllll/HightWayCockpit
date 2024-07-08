import axios from '@/libs/api.request'


// 获取点位温湿度
export const getWHList = (data) => {
  return axios.request({
    url: '/sdk/Info/getList',
    params:data,
    method: 'get',
 
  })
}
export const accessToken = (data) => {
  return axios.request({
    url: '/api/lapp/token/get',
    params:data,
    method: 'post',
  
  })
}

//获取所有数据
export const getAllList = (data) => {
  return axios.request({
    url: '/sdk/Info/getInfo',
    params:data,
    method: 'get',
 
  })
}

//获取所有点位信息
export const getDeviceList = () => {
  return axios.request({
    url: '/sdk/Device/getDeviceList',
    // params:data,
    method: 'get',
 
  })
}