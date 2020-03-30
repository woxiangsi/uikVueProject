<template>
    <div class="UintBottomFun">
        <div class="fl funContent">
            <span>参考价：¥{{price}}万</span>
        </div>
        <div class="fr funBnt">
            <span class="color1" v-show="comperMode">加入对比</span>
            <span class="color2" @click="getPrice()">获取底价</span>
        </div>
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
    props:{
        comperMode:{
            type:Boolean,
            default: false //这样可以指定默认的值
        },
        price:{
            // type:Number,
            default: 0.00
        }
    },
  	data(){
        return {

        }
    },
    mounted(){

    },
    methods:{
        getPrice: function(){
            this.$emit('fun')
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../css/Uint.scss';
    
</style>