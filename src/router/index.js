import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
Vue.use(Router)
const router = new Router({
  // base: process.env.VUE_WEB_ROUTER_BASE_URL,
  mode: process.env.VUE_APP_ROUTER_MODE,
  // base: process.env.NODE_ENV === 'production' ? '/' : '/',
  routes,
  // mode: 'history'
  // mode: 'hash',
})

const LOGIN_PAGE_NAME = 'sagem'
// const router = new VueRouter({
//   routes:[
//     {path:'/',redirect:'/Login'},
//     {path:'/login',component:Login},
//     {
//       path:'/home',component:Home ,
//       redirect:'/welcome',
//       children:[{path:'/welcome',component:Welcome},
//                 {path:'/userManagement',component:UserManagement},
//                 {path:'/roleManagement',component:RoleManagement},
//               ]
//      }
//   ]
// })
const originalPush = Router.prototype.push

router.beforeEach((to, from, next) => {
  next()
  // if (token && to.name === LOGIN_PAGE_NAME) {
  //   next({
  //     name: 'sagem'
  //   })
  // } else if (token && to.name !== LOGIN_PAGE_NAME) {
  //   next()
  // } else if (!token && to.name !== LOGIN_PAGE_NAME) {
  //   next({
  //     name: "sagem"
  //   })
  // } else if (!token && to.name === LOGIN_PAGE_NAME) {
  //   next()
  // }
  // if (!token && to.name !== LOGIN_PAGE_NAME) {
  //   // 未登录且要跳转的页面不是登录页
  //   next({
  //     name:LOGIN_PAGE_NAME, // 跳转到登录页
  //   })
  // }
  //  else if (!token && to.name === LOGIN_PAGE_NAME) {
  //   // 未登陆且要跳转的页面是登录页
  //   next() // 跳转
  // } else if (token && to.name === LOGIN_PAGE_NAME) {
  //   // 已登录且要跳转的页面是登录页
  //   next({
  //     name: 'home', // 跳转到homeName页
  //   })
  // } else {
  // }
})

export default router
