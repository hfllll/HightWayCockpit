//获取当天日期
export const getNowDate = () => {
  return axios.request({
    url: 'https://www.niuqihealth.com/sdk/Info/getHistory',
    method: 'get',
  })
}