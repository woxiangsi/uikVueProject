<template>
    <div class="UintTips" v-show="tipsModel">
        <div class="wrap">
            <div class="close">
                <span class="close_icon" @click="tipsMOdel=false"></span>
            </div>
            <div class="title">
                <span class="title_icon"></span>
                <span>已提交</span>
            </div>
            <div class="content">
                <span>恭喜您，您的需求已提交！后续会有销售人员为您服务请保持您的手机通讯畅通。</span>
            </div>
            <div class="bnt">
                <span  @click="tipsModel=false">知道了</span>
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
            title:"已提交"
        }
    },
    mounted(){

    },
    methods:{
        
    }

}
</script>
