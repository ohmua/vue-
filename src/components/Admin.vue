<template>
    <div class="row">
        <div class="col-sm-12 col-md-8">
            <!-- new pizza -->
            <app-newpizza></app-newpizza>
        </div>
        <div class="col-sm-12 col-md-4">
            <!-- 已有菜单 -->
            <h3 class="text-muted my-5">菜单</h3>
            <table class="table">
                <thead class="table-default">
                    <tr>
                        <td>品种</td>
                        <td>删除</td>
                    </tr>
                </thead>
                <tbody v-for="item in getMenuItem">
                    <tr>
                        <td>{{item.name}}</td>
                        <td>
                            <button @click="deleteData(item)" class="btn btn-outline-danger btn-sm">&times;</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import NewPizza from './NewPiaaz.vue'
export default {
    components:{
        "app-newpizza":NewPizza
    },
    data(){
        return {
            name:"ohmua",
            // getMenuItem:[]
        }
    },
    // beforeRouteEnter:(to,from,next)=>{
    //     // alert("hello,"+this.name)，此时获取不到name
    //     // next()
    //     //使用vm时是异步的，所以能获取到name
    //     next(vm=>{
    //         alert("hello,"+vm.name)
    //     })
    // }
    created(){
        fetch("https://wd6296503269ipmamo.wilddogio.com/menu.json")
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            // console.log(data)
            let menuArray=[]
            for (let key in data){
                // console.log(key)
                // console.log(data[key])
                data[key].id=key
                menuArray.push(data[key])
            }
            // this.getMenuItem=menuArray
            //将数据同步到vuex
            this.$store.commit("setMenuItems",menuArray)
        })
    },
    methods:{
        deleteData(item){
            fetch("https://wd6296503269ipmamo.wilddogio.com/menu/"+item.id+"/.json",{
                method:"DELETE",
                headers:{
                    "content-type":'application/json'
                }
            })
            .then(res=>{
                return res.json()
            })
            // .then(data=>this.$router.push({name:'menulink'}))
            .then(data=>{
                this.$store.commit("removeMenuItem",item)
            })
            .catch(err =>console.log(err))
        }
    },
    computed:{
        getMenuItem:{
            get(){
                return this.$store.state.menuItems
            },
            set(){
                
            }
        },
    }
}
</script>
