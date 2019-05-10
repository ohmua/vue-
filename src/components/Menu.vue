<template>
<div class="row">
    <div class="col-sm-12 col-md-8">
        <!-- 菜单 -->
        <table class="table">
            <thead class="thead-default">
                <tr>
                    <th>尺寸</th>
                    <th>价格</th>
                    <th>加入</th>
                </tr>
            </thead>
            <tbody v-for="item in getMenuItems" :key="item.name">
                <tr>
                    <td><strong>{{item.name}}</strong></td>
                </tr>
                <tr v-for="option in item.options" :key="option.size">
                    <td>{{option.size}}</td>
                    <td>{{option.price}}</td>
                    <td><button
                    @click="addToBasket(item,option)"
                    class="btn btn-sm btn-outline-success">+</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- 购物车 -->
    <div class="col-md-4 col-sm-12">
        <div v-if="baskets.length>0">
        <table class="table">
            <thead class="thead-default">
                <tr>
                    <td>数量</td>
                    <td>品种</td>
                    <td>价格</td>
                </tr>
            </thead>
            <tbody v-for="item in baskets">
                <tr>
                    <td>
                        <button @click="decreaseQuantity(item)" class="btn btn-sm">-</button>
                        <span>{{item.quantity}} </span>
                        <button @click="increaseQuantity(item)" class="btn btn-sm">+</button>
                    </td>
                    <td>{{item.name}}{{item.size}}</td>
                    <td>{{item.price*item.quantity}}</td>
                </tr>
            </tbody>
        </table>
        <p>总价: {{total + "RMB"}}</p>
        <button class="btn btn-success btn-block">提交</button>
        </div>
        <div v-else>
            {{basketText}}
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            baskets:[],
            basketText:"购物车没有任何商品",
            // getMenuItems:{}
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        fetchData(){
            // fetch("https://wd6296503269ipmamo.wilddogio.com/menu.json")
            // .then(res=>{
            // return res.json()
            // })
            // .then(data =>{
            //     this.getMenuItems=data
            // })
            //用axios发包，需先import
            // axios.get("menu.json")
            //     .then(res=>this.getMenuItems=res.data)
            //将请求的数据存储到store
            axios.get("menu.json")
                //给vuex的mutations赋值前面变量为方法，第二个为值
                .then(res=>this.$store.commit("setMenuItems",res.data))

        },
        addToBasket(item,option){
            //添加商品
            let basket={
                name:item.name,
                size:option.size,
                price:option.price,
                quantity:1
            }
            //过滤
            if(this.baskets.length>0){
                // 筛选重复商品个数，并过滤重复的
                let result=this.baskets.filter((basket)=>{
                    return (basket.name===item.name && basket.price===option.price)
                })
                if (result!=null &&result.length>0){
                    //重复商品第一个累加
                    result[0].quantity++
                }else{
                    this.baskets.push(basket)
                }

            }else{
                this.baskets.push(basket)
            }
        },
        decreaseQuantity(item){
            item.quantity--
            if(item.quantity<=0){
                this.removeFromBastets(item)
            }
        },
        increaseQuantity(item){
            item.quantity++
        },
        removeFromBastets(item){
            this.baskets.splice(this.baskets.indexOf(item),1)
        }
    },
    computed:{
        // getMenuItems(){
        //     //在vuex中获取数据
        //     // return this.$store.state.menuItems
             
        // },
        //把方法变为属性，里面有get和set的方法解决未找到setter的报错
        getMenuItems:{
            get(){
                // return this.$store.state.menuItems
                return this.$store.getters.getMenu
            },
            set(){
                
            }
        },
        total(){
            let totalCost=0
            for(let index in this.baskets){
                let individualItem=this.baskets[index]
                totalCost+=individualItem.quantity * individualItem.price
            }
            return totalCost
        }
    }
}
</script>
