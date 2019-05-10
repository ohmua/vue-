import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import axios from 'axios'
//应用vuex，引入之后在实例中调用
import {store} from './store/store.js'
Vue.use(VueRouter)

//配置默认根url
axios.defaults.baseURL='https://wd6296503269ipmamo.wilddogio.com/'

//配置全局axios的vue原型，在任何组件使用时不用import,http是自定义
Vue.prototype.http=axios

//实例化
const router=new VueRouter({
  routes,
  mode:'history',
  // scrollBehavior(to,from,savedPosition){
  //   //跳转到指定位置
  //   // return {x:0,y:100}
  //   if(savedPosition){//浏览器的前进后退控制
  //     return savedPosition
  //   }else {
  //     return {x:0,y:0}
  //   }
  // }
})


new Vue({
  el: '#app',
  router,//使用
  store,
  render: h => h(App)
})

//全局守卫
// router.beforeEach((to,from,next)=>{
//   // alert("请先登录")
//   //判断store.gettes.isLogin===false
//   console.log(to)
//   if(to.path=='/Login'||to.path=='/Registe'){
//     next();
//   }else{
//     alert("请先登录")
//     next('/Login')
//   }
// })

//后置钩子
// router.afterEach((to,from)=>{

// })