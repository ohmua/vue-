//引进路由
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Registe from './components/Registe'
//二级路由
import Contact from './components/about/Contact'
import Deilvery from './components/about/Deilvery'
import History from './components/about/History'
import Order from './components/about/Order'
//三级路由
import PersonName from './components/about/contact/PersonName'
import Phone from './components/about/contact/Phone'

//配置路由
 export const routes=[
  {path:'/',name:"homelink",components:{
      //路由复用
      default:Home,
      'order':Order,
      'deilvery':Deilvery,
      'history':History
  }},
  {path:'/Menu',name:"menulink",component:Menu},
  {path:'/Admin',component:Admin
  // ,beforeEnter:(to,from,next)=>{
  //     //独享守卫
  //     //判断store.gettes.isLogin===false
  //     console.log(to)
  //     if(to.path=='/Login'||to.path=='/Registe'){
  //       next();
  //     }else{
  //       alert("请先登录")
  //       next('/Login')
  //     }
  // }
},
  {path:'/About',redirect:'/about/contact',component:About,children:[
    {path:'/about/contact',name:'contactlink',redirect:'/personname',component:Contact,children:[
      {path:'/phone',name:"phoneNumber",component:Phone},
      {path:'/personname',name:"personName",component:PersonName}
    ]},
    {path:'/about/history',name:'historylink',component:History},
    {path:'/about/order',name:'orderlink',component:Order},
    {path:'/about/deilvery',name:'deilverylink',component:Deilvery}
  ]},
  {path:'/Login',name:"loginlink",component:Login},
  {path:'/Registe',name:"registelink",component:Registe},
  //路径错误时跳转到这
  {path:'*',redirect:'/'}
]