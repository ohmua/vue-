<template>
<div class="row">
    <div id="home" class="col-sm-12 text-center">
        <div class="background">
            <h1>欢迎大家品尝pizza</h1>
            <h2>有各种你喜欢的味道</h2>
            <button @click="goTo" class="btn btn-success">Let's go</button>
        </div>
    </div> 
</div>
</template>

<script>
export default {
    methods:{
        goTo(){
            //跳转到上一次浏览页面
            //this.$router.go(-1)
            //指定地址
            //this.$router.replace('/Menu')
            //this.$router.replace({name:'homelink'})
            //常用push压栈
            //this.$router.push({name:'homelink'})
            this.$router.push('/Login')
        }
    }
}
</script>

<style>
#home{
    background: url(../../src/assets/pizza.jpg);
    height: 85vh;
    padding: 10%;
}
h1,h2{
    margin: 6%;
}
.background{
    background: #eee;
    opacity:0.8;
    max-width: 70vw;
    margin: 0 auto;
    padding: 20px 0;
}
</style>
