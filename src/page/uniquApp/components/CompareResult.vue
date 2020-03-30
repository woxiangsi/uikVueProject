<template>
<div class="CompareResult">
    <UintHeader :title="'对比车辆'"></UintHeader>
    <div class="wrap" v-if="pageModel">
        <div class="wrap-top">
            <div class="slide1">
                <div class="compareTitle">
                    <span>车型信息</span>
                </div>
                <div class="commonMolde" @click="commonModel=!commonModel">
                    <span class='commonMolde_icon'>
                        <span :class="commonModel==true?'commonMoldeActive_icon':''"></span>
                    </span>
                    <span>隐藏相同项</span>
                </div>
            </div>
            <div class="slide2">
                <div class="carImg">
                    <img :src="carData.modelImage" alt="">
                </div>
                <div class="carTitle">
                    <span>{{carData.modelName}}</span>
                </div>
                <div class="carFun">
                    <span v-for="(item , index) in carData.labels" :key="item.id">{{item.name}}{{index+1>=carData.labels.length?'':'/'}}</span>
                    <!-- <span>安全 / 可靠 / 高效</span>  -->
                </div>
            </div>
            <div class="slide3">
                <div class="carImg">
                    <img :src="carData1.modelImage" alt="">
                </div>
                <div class="carTitle">
                    <span>{{carData1.modelName}}</span>
                </div>
                <div class="carFun">
                    <span v-for="(item , index) in carData1.labels" :key="item.id">{{item.name}}{{index+1>=carData1.labels.length?'':'/'}}</span>
                    <!-- <span>安全 / 可靠 / 高效</span>  -->
                </div>
            </div>
        </div>
        <div class="wrap-main">
            <div class="wrapM-li" >
                <div class="slide1">
                    <span>车型对比</span>
                </div>
                <div class="slide2">
                    <span>{{carData.modelCode}}</span>
                </div>
                <div class="slide3">
                    <span>{{carData1.modelCode}}</span>
                </div>
            </div>
            <div class="wrapM-li" >
                <div class="slide1">
                    <span>参考价格</span>
                </div>
                <div class="slide2">
                    <span>{{(carData.price/10000).toFixed(2)}}万</span>
                </div>
                <div class="slide3">
                    <span>{{(carData1.price/10000).toFixed(2)}}万</span>
                </div>
            </div>
        </div>
        <div class="" v-for="(item ,index) in carData.packages" :key="item.id">
            <div class="wrap-center">
                <div class="slide1">
                    <div class="compareTitle">
                        <span>{{item.groupName}}</span>
                    </div>
                </div>
                <div class="slide2">
                </div>
                <div class="slide3">
                </div>
            </div>
            <div class="wrap-main">
                <div class="wrapM-li" v-for="(el,index1) in item.components" :key="el.id" v-show="commonModel==false || (el.options?el.options[0].optionName:'') != (carData1.packages[index].components[index1].options?carData1.packages[index].components[index1].options[0].optionName:'')">
                    <div class="slide1">
                        <span :title="el.componentName">{{el.componentName}}</span>
                    </div>
                    <div class="slide2">
                        <span>{{el.options?el.options[0].optionName:''}}</span>
                    </div>
                    <div class="slide3">
                        <span>{{carData1.packages[index].components[index1].options?carData1.packages[index].components[index1].options[0].optionName:''}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap-fun">
            <div class="slide1">
            </div>
            <div class="slide2">
                <div class="checkCar" @click="goDetails(carData.modelCode)">选择此车</div>
            </div>
            <div class="slide3">
                <div class="checkCar" @click="goDetails(carData1.modelCode)">选择此车</div>
            </div>
        </div>
    </div>
        
</div>
</template>
<script>
import UintHeader from './UintHeader.vue';
import carIcon from '../img/car_icon.png'
var createModel = require("../model/model");
var model = createModel();
// const locationUrl = _util_.getLocation_util() + '/#';
export default {
    components:{UintHeader},
    name: '',
  	data(){
        return {
            carIcon:carIcon,
            carData: {
                labels:[]
            },
            carData1: {},
            commonModel:false,
            pageModel:false,
            
        }
    },
    created(){
        let query =  this.$route.query;
        let param = {
            modelCode:query.modelCode1
        }
        let param1 = {
            modelCode:query.modelCode2
        }
        this.getModelInfo(param,1)
        this.getModelInfo(param1,2)
    },
    mounted(){
        
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
                        _self.pageModel = true;
                    }
                    
                    
                }
            })
        },
        goDetails:function(val){
            let param = {
                path:'/uniquApp/carDetails',
                query:{modelCode:val}
            }
            this.$router.push(param)
        }
    },
}
</script>
<style lang="scss" scoped>
     @import '../css/CompareResult.scss';
    .CompareResult{
        height: 100%;
        overflow: hidden;
        padding-bottom: 96px;
        box-sizing: border-box;
    
    }
</style>