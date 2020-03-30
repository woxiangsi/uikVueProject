
<template>
    <div class="UintBuyCar" v-show="num>0" @click="goCompareCar">
        <span class="num">{{num}}</span>
        <span class="title">车辆对比</span>
    </div>
</template>
<script>
import _util_ from '../../../common/businessUtils/util';
import '../css/Uint.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
export default {
    name: '',
  	data(){
        return {
            num:0
        }
    },
    computed:{
        
    },
    mounted(){
        this.getComputerNum()
    },
    methods:{
        getComputerNum:function(){
            let compareList = window.sessionStorage.getItem('compareList')?JSON.parse(window.sessionStorage.getItem('compareList')):[];
            this.num = compareList.length?compareList.length:0;
        },
        goCompareCar:function(){
            this.$router.push({path:'/uniquApp/compareCarList',query: {}})
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../css/Uint.scss';
</style>
