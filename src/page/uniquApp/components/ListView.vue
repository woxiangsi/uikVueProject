<template>
    <div class="ListView">
        <UintHeader @func="setModelFiler" :title="'热销型'" :filterModel="true"></UintHeader>
        <FilterView ref="filterView" @sure="getFilterData"></FilterView>
        <ListItem ref = "ListItem"></ListItem>
        <!-- <UintBottomFun @fun="setPrice"></UintBottomFun> -->
        <UintBottomTips></UintBottomTips>
        <ConsultationPrice ref="ConsultationPrice"></ConsultationPrice>
    </div>
</template>
<style lang="scss" scoped>
    @import '../css/ListView.scss'; 
    .ListView{
        height: 100%;
        overflow: hidden;
        padding-bottom: 96px;
        box-sizing: border-box;
    }
</style>
<script>
import UintHeader from './UintHeader.vue';
import FilterView from './FilterView.vue';
import ListItem from './ListItem';
import UintBottomFun from './UintBottomFun';
import UintBottomTips from './UintBottomTips';
import UintBuyCar from './UintBuyCar';
import ConsultationPrice from './ConsultationPrice';
var createModel = require("../model/model");
var model = createModel();
// const locationUrl = _util_.getLocation_util() + '/#';
export default{
    name:'',
    components: { UintHeader ,FilterView,ListItem,UintBuyCar,UintBottomTips,UintBottomFun,ConsultationPrice},
    data(){
        return{
            
        }
    },
    mounted(){
    },
    methods:{
        setModelFiler:function(val){
            this.$refs.filterView.modelFiler = !this.$refs.filterView.modelFiler
        },
        getFilterData:function(val){
            this.$refs.ListItem.getList(val)
        },
        setPrice:function(){
            this.$refs.ConsultationPrice.showModel = true;
        }
    },
} 
</script>