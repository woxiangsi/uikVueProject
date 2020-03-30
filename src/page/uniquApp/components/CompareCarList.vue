<template>
    <div class="CompareCarList">
        <UintHeader :title="'对比车辆'"></UintHeader>
        <div class="ListItem">
            <div class="item" v-for="(item,index) in list" :key="index">
                <div class="item-main">
                    <div class="itemM-img">
                        <img :src="item.modelImage" alt=""/>
                    </div>
                    <div class="itemM-content">
                        <div class="itemM-content-title">
                            <span>{{item.modelName}} </span>
                        </div>
                        <div class="itemM-content-content">
                            {{item.remarks}}
                            <!-- <span>具有低油耗、高可靠、高安全适合在总重100吨恶劣路况行驶具有低油耗、高可靠、高高安全具有低油耗、高可靠高安字高安...</span> -->
                        </div>
                        <div class="itemM-content-fun">
                            <span v-for="el in item.labels" :key="el.id"  >{{el.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="item-bottom">
                    <span :class="[item.isActive==true?'addActives fl':'fl']" @click="addComp(index)">{{item.isActive==true?'取消对比':'去对比'}}</span>
                    <span class="fr" @click="deleatComp(index)">删除</span>
                </div>
            </div>
            <!-- <UintBuyCar ref= "UintBuyCar"></UintBuyCar> -->
        </div>
        <div class="UintBottomFun UintBottomTips">
            <div class="fl funContent" v-show="compaerModel">
                <span>{{compareList[0]?compareList[0].modelName:''}}</span>
                <span class="compare_icon"></span>
                <span>{{compareList[1]?compareList[1].modelName:''}}</span>
            </div>
            <div class="fr funBnt">
                <span :class="compareList.length>=2?'color1':'color2'" @click="goCompare">开始对比</span>
            </div>
        </div>
        <UnitDialog ref="UnitDialog"></UnitDialog>
    </div>
</template>

<script>
import Vue from 'vue'
import UintHeader from './UintHeader.vue';
import UnitDialog from './UnitDialog.vue'
var createModel = require("../model/model");
var model = createModel();
// const locationUrl = _util_.getLocation_util() + '/#';
export default{
    name:'',
    components:{UintHeader,UnitDialog},
    data(){
        return{
            compaerModel:false,
            list:[],
            compareList:[]
        }
    },
    mounted(){
        let _self = this;
        this.list = window.sessionStorage.getItem('compareList')?JSON.parse(window.sessionStorage.getItem('compareList')):[];
        this.list.map(function(item){
            if(item.isActive==true){
                _self.compareList.push(item);
                _self.compaerModel = true
            }
        })
    },
    methods:{
        addComp:function(index){
            let list = this.list;
            if(!list[index].isActive|| list[index].isActive==false){
                if(this.compareList&&this.compareList.length>=2){
                    this.$refs.UnitDialog.tipsModel = true;
                    this.$refs.UnitDialog.title = '对比数量提醒';
                    this.$refs.UnitDialog.content = '<p>您好对比车辆一次最多可选2辆车进行对比<span style="color:red">'+this.compareList[0].modelName+','+this.compareList[1].modelName+'</span>若要对比其他车辆请取消当前车辆后进行对比</p>';
                    return
                }
            }
            list[index].isActive = list[index].isActive?!list[index].isActive:true;
            Vue.set(this.list, index, list[index]);
            let compareList = this.compareList?this.compareList:[];
            if(list[index].isActive == true){
                compareList.push(list[index]);
            }else{
                if(compareList){
                    for(var i =0;i<compareList.length;i++){
                        if(compareList[i].modelCode == list[index].modelCode){
                            compareList.splice(i,1);
                            break;
                        }
                    }
                }
            }
            this.compareList = compareList;
            this.compaerModel = compareList.length>0?true:false;
            window.sessionStorage.setItem('compareList',JSON.stringify(list));
        },
        deleatComp:function(index){
            let list = this.list;
            let compareList = this.compareList;
            if(list[index].isActive == true){
                for(var i =0;i<compareList.length;i++){
                    if(compareList[i].modelCode == list[index].modelCode){
                        compareList.splice(i,1);
                        break;
                    }
                }
            }
            this.compareList = compareList;
            list.splice(index,1);
            this.list = list;
            window.sessionStorage.setItem('compareList',JSON.stringify(list));
            // Vue.set(this.list, index, );
        },
        goCompare:function(){
            if(this.compareList&&this.compareList.length>=2){
                let param = [this.compareList[0].modelCode,this.compareList[1].modelCode]
                this.$router.push({
                    path:'/uniquApp/compareResult',
                    query: {
                        modelCode1:this.compareList[0].modelCode,
                        modelCode2:this.compareList[1].modelCode
                        }
                    })
            }
        }
    },
} 
</script>
<style lang="scss" scoped>
    @import '../css/ListItem.scss'; 
    @import '../css/Uint.scss';
    .CompareCarList{
        height: 100%;
        overflow: hidden;
        padding-bottom: 96px;
        box-sizing: border-box;
        position: relative;
        .addActives{
            background: #1987E9!important;
        }
        .item-bottom{
            span:last-child{
                background: #FFF;
                color: #1987E9;
                border: 1px solid #1987E9;
            };
        }
        .compare_icon{
            position: relative;
            display: inline-block;
            width: 31px;
            height: 31px;
            background: url("../img/compare_icon.png") no-repeat;
            background-size: 100% 100%;
            top: 5px;
        }
        .color2{
            background: #BFCEE7;
        }
        
    }
    

</style>