<template>
    <div class="UintHeader">
        <div class="header-let">
            <span class="goBack" @click="goBack"></span>
            <span class="goHome" @click="goHome"></span>
        </div>
        <div class="">
            <span>{{title}}</span>
        </div>
        <div class="header-rigt">
            <span class="filter" @click="filterBnt()" v-show="filterModel">筛选</span>
            <span class="filter_icon" @click="dropdownModel=!dropdownModel">
            </span>
        </div>
        <el-dropdown :hide-on-click="true">
            <span class="el-dropdown-link">
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            </span>
                <el-dropdown-menu class="dropdown" slot="dropdown" v-show="dropdownModel" >
                    <el-dropdown-item @click="goPage(1)">热销车型</el-dropdown-item>
                    <el-dropdown-item @click="goPage(2)">智能选车</el-dropdown-item>
                    <el-dropdown-item @click="goPage(3)">个性定制</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        
        
    
    </div>
</template>
<style lang="scss" scoped>
    @import '../css/Uint.scss'; 
    .UintHeader{

    .el-dropdown{
        position: absolute;
        right: -15px;
        // top: 45px;
    }
    .el-dropdown-link {
        width: 210px;
        cursor: pointer;
        color: #409EFF;
        right: 0px;
        // top: 20px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
     }
</style>
<script>
import _util_ from '../../../common/businessUtils/util';
import '../css/Uint.scss';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
export default {
    props: {
        title: {
            type: String, //指定传入的类型
            default: "热销车型" //这样可以指定默认的值
        },
        filterModel:{
            default: false //这样可以指定默认的值
        }
    },
    data(){
        return{
            dropdownModel:false
            // title:"热销车型"
        }
    },
    mounted(){
        let _self = this;
        document.addEventListener('click',function(e){
            if(e.target.className!='filter_icon'){
                _self.dropdownModel=false;
            }
        })
    },
    methods:{
        menuBnt:function(){
            this.dropdownModel = true;
        },
        goPage(command) {
            this.$message('click on item ' + command);
            // this.dropdownModel = false;
        },
        goHome:function(){
            this.$router.push({path:'/uniquApp/home'})
        },
        goBack:function(){
            this.$router.go(-1)
        },
        filterBnt:function(e){
            this.$emit('func',true)
            // e.nativeEvent.stopImmediatePropagation();
        }
    }

}
</script>
