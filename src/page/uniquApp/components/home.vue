<template>
    <div class="home touchScroll">
       <div class="wrap">
           <div class="wrap-header"></div>
           <div class="">
               <div class="home-menu" :class="activeMenu==1?'activeMenu':''" @click="goPage(1)">
                   <span>热销推荐</span>
               </div>
               <div class="home-menu" :class="activeMenu==2?'activeMenu':''" @click="goPage(2)">
                   <span>智能选车</span>
               </div>
               <div class="home-menu" :class="activeMenu==3?'activeMenu':''" @click="goPage(3)">
                   <span>个性定制</span>
               </div>
               <div class="home-menu" :class="activeMenu==4?'activeMenu':''" @click="goPage(4)">
                   <span>问卷调查</span>
               </div>
               <div class="home-menu login" :class="activeMenu==5?'activeMenu':''" @click="goPage(5)" >
                   <span>登陆</span>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    name: '',
  	data(){
        return {
            activeMenu:1
        }
    },
    mounted(){

    },
    methods:{
        goPage:function(vl){
            if(vl==1){
                this.$router.push({path:'/uniquApp/listView',query: {id:'1'}})
            }
            if(vl==2){
                this.$router.push({path:'/uniquApp/intelligenceHome',query: {id:'1'}})
            }
            this.activeMenu = vl
			
			// this.router.push()
		}
    },
}
</script>
<style lang="scss" scoped>
     @import '../css/home.scss';
    .authentication{
        font-size: 82px;
        color: red;
    
    }
</style>