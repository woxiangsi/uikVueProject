<template>
<div class="CompareResult CarDetails">
    <UintHeader :title="'配置小节'"></UintHeader>
    <div class="wrap">
        <div class="" v-for="(item ,index) in carData.packages" :key="item.id">
            <div class="wrap-center">
                <!-- <div class="slide1"> -->
                    <div class="compareTitle">
                        <span>{{item.groupName}}</span>
                    </div>
                <!-- </div> -->
            </div>
            <div class="wrap-main">
                <div class="wrapM-li" v-for="(el) in item.components" :key="el.id">
                    <div class="slide1">
                        <span :title="el.componentName">{{el.componentName}}</span>
                    </div>
                    <div class="slide2">
                        <span>{{el.options?el.options[0].optionName:''}}</span>
                    </div>
                    <div class="detalTips" @click="tipsModel=true,tipsId=el.options[0].id">
                        <div class="detalTips_content" v-show="tipsModel&&tipsId==el.options[0].id" v-html="el.options?el.options[0].optionDescription:''">{{el.options?el.options[0].optionDescription:''}}</div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <UintBottomFun :price="(carData.price/10000).toFixed(2)" @fun="setPrice"></UintBottomFun>
    <ConsultationPrice ref="ConsultationPrice" :data="carData"></ConsultationPrice>
</div>
    
</template>
<script>
import UintHeader from './UintHeader.vue';
import UintBottomFun from './UintBottomFun';
import ConsultationPrice from './ConsultationPrice';
import carIcon from '../img/car_icon.png'
var createModel = require("../model/model");
var model = createModel();
// const locationUrl = _util_.getLocation_util() + '/#';
export default {
    components:{UintHeader,UintBottomFun,ConsultationPrice},
    name: '',
  	data(){
        return {
            carIcon:carIcon,
            carData: {
                labels:[]
            },
            carData1: {},
            commonModel:false,
            tipsModel:false,
            tipsId:''
            
        }
    },
    created(){
        let query =  this.$route.query;
        let param = {
            modelCode:query.modelCode
        }
        this.getModelInfo(param,1)
        // this.getModelInfo(param1,2)
    },
    mounted(){
        let _self = this;
        document.addEventListener('click',function(e){
            if(e.target.className!='detalTips'){
                _self.tipsModel=false;
            }
        })
    },
    methods:{
        getModelInfo:function(param,key){
            let _self = this;
            model.getModelInfo(param,function(res){
                if(res.code == 200){
                    if(key == 1){
                        _self.carData = res.data
                    }
                    if(key == 2){
                        _self.carData1 = res.data
                    }
                    
                }
            })
        },
        setPrice:function(){
            this.$refs.ConsultationPrice.showModel = true;
            this.$refs.ConsultationPrice.carData = this.carData
        }
    },
}
</script>
<style lang="scss" scoped>
     @import '../css/CompareResult.scss';
    .CarDetails{
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding-bottom: 200px;
        .wrap-center{
            padding-left: 17px;
        }
        .slide1{
            flex: 0.4;
        }
        .slide2{
            border-right: none;
            flex: 0.6;
        }
        .wrapM-li{
            position: relative;
            padding-right: 15px;
            box-sizing: border-box;
        }
        
        .detalTips{
            padding: 0px!important;
            width: 21px;
            height: 21px;
            box-sizing: border-box;
            position: absolute;
            right: 14px;
            background: url('../img/detalTips_icon.png')no-repeat;
            background-size: 100% 100%;
            top: 50%;
            margin-top: -10.5px;
            .detalTips_content{
                // display: none;
                width: 355px;
                padding: 14px;
                position: absolute;
                left: -392px;
                background: #FFF;
                // background: red;
                box-shadow:0 0 20px rgba(0, 0, 0, 0.3);
                z-index: 3;

            }
        }
        // .detalTips:hover{
        //     .detalTips_content{
        //         display: block;
        //     }
        // }
    }
</style>