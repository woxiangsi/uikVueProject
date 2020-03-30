<template>
    <div class="UnitDialog" v-show="tipsModel">
        <div class="wrap">
            <div class="title">
                <span>{{title}}</span>
                <div class="close_icon" @click="tipsMOdel=false"></div>
            </div>
            <div class="content" v-html="content">
                {{content}}
            </div>
            <div class="bnt">
                <span class="cancel" @click="tipsModel=false">取消</span>
                <span  class="sure" @click="tipsModel=false">确定</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../css/Uint.scss'; 
</style>
<script>
import _util_ from '../../../common/businessUtils/util';
import '../css/Uint.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
export default {
    // props: {
    //     title: {
    //         type: String, //指定传入的类型
    //         default: "热销车型" //这样可以指定默认的值
    //     }
    // },
    data(){
        return{
            tipsModel:false,
            title:"对比数量提醒",
            content: ''
        }
    },
    mounted(){

    },
    methods:{
        
    }

}
</script>
