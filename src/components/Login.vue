<template>
    <div class="row mt-3">
        <div class="col-md-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <img src="../../src/assets/logo_w.jpg" alt="" class="mx-auto d-block">
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="email">邮箱</label>
                            <input type="email" class="form-control" v-model="email">
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" v-model="password">
                        </div>
                        <button type="submit" class="btn btn-block btn-success">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            email:"",
            password:""
        }
    },
    //组件内守卫
    beforeRouteEnter:(to, from, next)=>{
        next(vm => {
            vm.$store.dispatch("setUser",null)
            // vm.$store.dispatch('setLogin', false)
            })
    },
    methods:{
        onSubmit:function(){
            axios.get('/users.json')
             .then(res => {
              //  console.log(res.data)
              const data = res.data
              const users = []
              for(let key in data){
                const user = data[key]
                // console.log(user)
                users.push(user)
              }

              // console.log(users)

              // 实现过滤
              let result = users.filter((user) => {
                return user.email === this.email && user.password === this.password
              })

              // console.log(result)
              // 判断result的长度是否大于0
              if(result != null && result.length > 0){
                  //dispath用在action的
                this.$store.dispatch("setUser",result[0].email)
                this.$router.push({name:"homelink"})
                // this.$store.dispatch('setLogin', true)

              }else{
                alert("账号或密码错误!")
                this.$store.dispatch("setUser",null)
                // this.$store.dispatch('setLogin', false)
              }
             }) 
        }
    }
}
</script>