<template>
    <div class="FilterView" @click="modelFiler=false" v-show="modelFiler">
        <div class="wrap" @click.stop="modelFiler=true">
            <div class="sel-line">
                <div class="option" @click="salesPriorityCheck(1)">
                    <div class="selIcon"><i :class="salesPriority==1?'selCheck':''"></i></div>
                    销量优先
                </div>
                <div class="option" @click="salesPriorityCheck(0)">
                    <div class="selIcon"><i :class="salesPriority==0?'selCheck':''"></i></div>
                    人气优先
                </div>
            </div>
            <div class="sel-line" v-for="(item,index) in list" :key="index">
                <div class="title">
                    <i class="titleTips-icon"></i><span class="title-content">{{item.category}}</span>
                    <i class="line_icon"></i>
                    <i class="line_icon"></i>
                    <i class="line_icon"></i>
                    <i class="spot_icon"></i>
                    <i class="spot_icon"></i>
                    <i class="spot_icon"></i>
                    <i class="line_icon"></i>
                    <i class="line_icon"></i>
                    <i class="line_icon"></i>
                    <!-- <i class="line_icon"></i> -->
                    <i class="spot_icon"></i>
                    <i class="spot_icon"></i>
                    <i class="line_icon"></i>
                    <i class="spot_icon"></i>
                </div>
                <div class=""  v-if='item.category == "行业"'>
                    <div class="option" v-for="el in item.values" :key='el.id'  @click="industryIdCheck(el.id)">
                        <div class="selIcon"><i :class="industryId==el.id?'selCheck':''" ></i></div>
                        {{el.name}}
                    </div>
                </div>
                <div class="" v-else>
                    <div class="option" v-for="el in item.values" :key='el.id' @click="driverIdCheck(el.id)">
                        <div class="selIcon"><i :class="driverId==el.id?'selCheck':''"></i></div>
                        {{el.name}}
                    </div>
                </div>
                
            </div>
                   
            <div class="sure" @click.stop="sure()">
                <span>确定</span>
            </div>
            
        </div>
        <div class="yuan-con"></div>
    </div>
</template>
<script>
import _util_ from '../../../common/businessUtils/util';
import '../css/FilterView.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
export default {
    name: '',
  	data(){
        return {
            modelFiler:false,
            title:"热销车型",
            list:[],
            salesPriority:0,
            industryId:1,
            driverId:1,
        }
    },
    mounted(){
        this.getCondition();
    },
    methods:{
        getCondition:function(){
            let _self = this;
            let param = {
                salesPriority: this.salesPriority, //1=销量优先 0=不选
                industryId: this.industryId, //行业
                driverId: this.driverId,//驱动
            }
            model.getCondition(param,function(res){
                if(res.code == 200){
                    _self.list = res.data;
                }
            })
        },
        salesPriorityCheck:function(vl){
            this.salesPriority = vl
        },
        industryIdCheck:function(vl){
            this.industryId = vl
        },
        driverIdCheck:function(vl){
            this.driverId = vl
        },
        sure:function(){
            this.modelFiler = false;
            let param = {
                salesPriority:this.salesPriority,
                industryId:this.industryId,
                driverId:this.driverId,
            }
            this.$emit("sure",param)
            
        },
    },
}
</script>
<style lang="scss" scoped>
     @import '../css/FilterView.scss';
</style>
