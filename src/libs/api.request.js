import HttpRequest from '@/libs/axios'
import config from '@/config'
// const baseUrl =
//   process.env.NODE_ENV === 'development' ? '/nypt' : config.baseUrl

// const axios = new HttpRequest(baseUrl)
const axios = new HttpRequest(process.env.NODE_ENV === 'development' ? process.env.VUE_APP_REQ_PROXY : process.env.VUE_APP_SERVER_URL)

export default axios
