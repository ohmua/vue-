<template>
  <div id="app">
   <app-header></app-header>
   <div class="container">
     <router-view></router-view>
   </div>
   <br>
   <div class="container">
     <div class="row">
       <div class="col-md-4 col-sm-12">
         <router-view name="order"></router-view>
       </div>
       <div class="col-md-4 col-sm-12">
         <router-view name="history"></router-view>
       </div>
       <div class="col-md-4 col-sm-12">
         <router-view name="deilvery"></router-view>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  //注册组件
    components:{
      'app-header':Header
    }
}
</script>

<style>

</style>
