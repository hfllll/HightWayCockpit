import {
  getNowFormatDate,
  setToken
} from '@/libs/util'

import {
  Notice
} from 'view-design'
import axios from 'axios'
import cfg from '../config/index'
import md5 from 'js-md5'
import qs from 'qs'
import router from "../router/index";
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {},
      withCredentials: true,
      transformRequest(data) {
        return qs.stringify(data)
      }
    }
    return config
  }

  getMultipartConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {},
      withCredentials: true
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  // 清除cookie方法
  setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.setTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      this.queue[url] = true
      if (config.sign !== false) {
        if (!config.multipart) {
          let timestamp = getNowFormatDate()
          let signKey = cfg.signKey
          let requestData = JSON.stringify(config.data) || ''
          let sign = md5(signKey + requestData + timestamp + signKey).toUpperCase()
          Object.assign(config, {
            // requestData
            data: {
              sign: sign,
              timestamp: timestamp,
              data: requestData
            }
          })
        } else {
          let formData = new FormData()
          Object.keys(config.data).forEach(key => {
            formData.append(key, config.data[key])
          })
          config.data = formData
        }
      }
      // 防重复接口需要在 header 中添加repeatToken字段
      if (config.repeatToken) {
        config.headers['repeatToken'] = config.repeatToken
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      var {
        data
      } = res
      // 如果包头中含有 token 信息，添加到 data 中
      if (res.headers.repeattoken) {
        data = data || {}
        data.repeatToken = res.headers.repeattoken
      }
      if (data.data === 'token已被顶下线') {
        this.setCookie("token", "", 0);
        router.push({ path: '/login' })
        return
      }
      if (data.success === true) {
        return data
      } else if (data.success === false) {
        Notice.error({
          title: '请求出错',
          desc: data.msg || '服务器出现错误，请稍后重试'
        })
        return Promise.reject(data)
      } else {
        if (data.data === 'token无效') {
          this.setCookie("token", "", 0);
          router.push({ name: 'login' })
        }
        return data
      }
    }, error => {
      const errMsg = error.toString()
      const code = errMsg.substr(errMsg.indexOf('code') + 5)
      
      if (code === '508') {
        setToken('')
        window.location.reload()
      } else if (code === '510') {
        Notice.error({
          title: '请求出错',
          desc: '请勿重复提交！'
        })
        this.destroy(url)
        return Promise.reject(error)
      } else {
        Notice.error({
          title: '请求出错',
          desc: '服务器出现错误，请稍后重试'
        })
        this.destroy(url)
        return Promise.reject(error)
      }
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(options.multipart ? this.getMultipartConfig() : this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
