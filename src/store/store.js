import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store=new Vuex.Store({
    state:{
        //设置属性
        menuItems:{},
        //用户登录设置
        currentUser:null,
        isLogin:false
    },
    getters:{
        //获取属性的状态
        //自定义取值
        getMenu:state=>state.menuItems,
        currentUser:state=>state.currentUser,
        isLogin:state=>state.isLogin
    },
    mutations:{
        //改变属性的状态，得先有这个属性
        //state是属性状态，data形参
        setMenuItems(state,data){
            state.menuItems=data
        },
        //将匹配到的对象在数组中删除
        removeMenuItem(state,data){
            state.menuItems.forEach((item,index) => {
                if(item==data){
                    state.menuItems.splice(index,1)
                }
            });
        },
        pushToMenuItems(state,data){
            state.menuItems.push(data)
        },
        //更改用户状态信息
        userStatus(state,user){
            if(user){
                state.currentUser=user
                state.isLogin=true
            }else{
                state.currentUser=null
                state.isLogin=false
            }
        }
    },
    actions:{
        //应用matations
        setUser({commit},user){
            commit("userStatus",user)
        }
    }
})