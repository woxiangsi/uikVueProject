<template>
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
                    <div class="itemM-content-content" v-html="item.remarks">
                        {{item.remarks}}
                        <!-- <span>具有低油耗、高可靠、高安全适合在总重100吨恶劣路况行驶具有低油耗、高可靠、高高安全具有低油耗、高可靠高安字高安...</span> -->
                    </div>
                    <div class="itemM-content-fun">
                        <span v-for="el in item.labels" :key="el.id"  >{{el.name}}</span>
                    </div>
                </div>
            </div>
            <div class="item-bottom">
                <span :class="[item.activeCompare==true?'addActive fl':'fl']" @click="addComp(index)">{{item.activeCompare?'已加入对比':'加入对比'}}</span>
                <span class="fr" @click="goDetail(item)">查看详情</span>
            </div>
        </div>
        <UintBuyCar ref= "UintBuyCar"></UintBuyCar>
    </div>
    
</template>
<style lang="scss" scoped>
     @import '../css/ListItem.scss';
</style>
<script>
import Vue from 'vue'
import UintBuyCar from './UintBuyCar';
import _util_ from '../../../common/businessUtils/util';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
import carIcon from '../img/car_icon.png'
export default {
    name: 'ListItem',
    components: {UintBuyCar},
  	data(){
        return {
            title:"热销车型",
            salesPriority:0,
            industryId:'',
            driverId:'',
            list:[],
            compareList:[]
        }
    },
    mounted(){
        this.compareList = window.sessionStorage.getItem('compareList')?JSON.parse(window.sessionStorage.getItem('compareList')):[];
        let param = {
                salesPriority: this.salesPriority, //1=销量优先 0=不选
                industryId: this.industryId, //行业
                driverId: this.driverId//驱动
            }
        this.getList(param)
    },
    computed:{
       
    },
    methods:{
        getList:function(param){
            let _self = this;
            model.getList(param,function(res){
                if(res.code == 200){
                    let list = res.data;
                    let compareList = _self.compareList?_self.compareList:[];
                    if(compareList){
                        list.map(function(item){
                            compareList.map(function(el){
                                if(item.modelCode == el.modelCode){
                                    item.activeCompare = true;
                                }
                            })
                        })
                    }
                    _self.list = list;
                }
            })
        },
        goDetail:function(item){
             this.$router.push({path:'/uniquApp/hotRecommendDetail',query: {modelCode:item.modelCode}})
        },
        addComp:function(index){
            let list = this.list;
            let compareList = this.compareList?this.compareList:[];
            if(!list[index].activeCompare||list[index].activeCompare == false){
                list[index].activeCompare = true;
                compareList.push(list[index]);
            }else{
                list[index].activeCompare = false;
                if(compareList){
                    for(var i =0;i<compareList.length;i++){
                        if(compareList[i].modelCode == list[index].modelCode){
                            compareList.splice(i,1);
                            break;
                        }
                    }
                }
            }
            Vue.set(this.list, index, list[index])
            window.sessionStorage.setItem("compareList", JSON.stringify(compareList));
            
            this.$refs.UintBuyCar.getComputerNum()
        }
    },
}
</script>
