module.exports = {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '翊阳erp系统',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description api请求基础路径
   */
  baseUrl: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_REQ_PROXY : process.env.VUE_APP_SERVER_URL,

  // 贷款登记文件下载地址
  fileUrl: process.env.VUE_APP_SERVER_URL,
  // 地图图层加载地址
  mapUrl: "https://www.changshanlsbank.cn:8081",
  // mapUrl: process.env.NODE_ENV === 'development' ? "http://szny.agri.hangzhou.gov.cn:8077" : "https://www.changshanlsbank.cn:8081",
  // 文件上传地址
  uploadAction: 'uploaddown/upload.action',
  // 站点所属类别
  owner_type: '3',
  // 密码3DES加密
  DESKey: '7A6A6863736F667431333233323332317A6A6863736F6674',
  DESIv: '0102030405060708',
  // axios请求加密
  signKey: 'zzsoftBase',
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {},
  // 分页默认每页条数
  DEFAULT_PAGE_SIZE: 10,
  // 表格按钮样式,可配置ButtonGroup
  tableBtnsStyle: 'ButtonGroup',

  // 大屏地址
  // jiashicangURL: process.env.NODE_ENV === 'development' ? 'http://61.153.188.179:8082/csyn/#/home/zyzl' : 'https://www.changshanlsbank.cn/csyn/#/home/zyzl',
  jiashicangURL: process.env.NODE_ENV === 'development' ? 'http://36.40.72.13:8081/mxyn/#/home/zyzl' : 'http://36.40.72.13:8081/mxyn/#/home/zyzl',
}
