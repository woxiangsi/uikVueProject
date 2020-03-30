<template>
    <div class="IntelligenceHome">
        <UintHeader :title="'智能选车'"></UintHeader>
        <div class="wrap">
            <div class="home"  v-show="false">
                <img :src="intellHome_icon" alt="">
                <div class="homeBnt">
                    <span>点击进入</span>
                </div>
            </div>
            <div class="slide" v-show="true">
                <div class="slide-item" v-for="(item,index) in list" :key="index" v-show="slideModel==index">
                    <div class="slideI-title">
                        <span class="title-icon titleLet-icon"></span><span>{{item.subjectTitle}}</span><span class="title-icon titleRigt-icon"></span>
                    </div>
                    <div class="slideI-speed" v-if="item.subjectCode=='SPEED'">
                        <div class="speed">
                            <div class="speedItem" :class="index2>speed+3||index2<speed?'':'speedItemActive'" v-for="(el,index2) in (Math.ceil(Number(item.items[1].name)/5))" :key="index2" @click="speedBnt(index2,item)"></div>
                        </div>
                        <div class="speedContent">
                            <span class="fl">{{item.items[0].name}}km/h</span>
                            <span class="color2BB5FE">{{minSpeed}}-{{maxSpeed}}</span>
                            <span class="fr">{{item.items[1].name}}km/h</span>
                        </div>
                    </div>
                    <div class="slideI-main" v-else>
                        <div v-show="item.subjectCode=='DRIVE'&&isWxP==true&&el.id == '177'" 
                            :class="activeTab.id==el.id?'activeTab':''" 
                            v-for="(el,index1) in item.items" 
                            :key="el.id" 
                            @click="tabBnt(el)">
                            
                            <div class="slide-img" v-if="el.id == '177'">
                                <div :class="'qdImg'+(index1+1)"></div>
                            </div>
                            <span>{{el.name}}</span>
                        </div>
                        <div v-show="item.subjectCode!='DRIVE'||isWxP==false" :class="activeTab.id==el.id?'activeTab':''" v-for="(el,index1) in item.items" :key="index1" @click="tabBnt(el)">
                            <div class="slide-img" v-if="item.subjectCode=='INDUSTRY'">
                                <div :class="'carTypeImg'+(index1+1)"></div>
                            </div>
                            <div class="slide-img" v-if="item.subjectCode=='DRIVE'&&isWxP==false">
                                <div :class="'qdImg'+(index1+1)"></div>
                            </div>
                            <div class="slide-img" v-if="item.subjectCode=='LOAD_CAPACITY'">
                                <div :class="'loadImg'+(index1+1)"></div>
                            </div>
                            
                            <div class="slide-img" v-if="item.subjectCode=='MODELS'">
                                <div :class="'modelImg'+(index1+1)"></div>
                            </div>
                            <div class="slide-img" v-if="item.subjectCode=='ROAD_TYPE'">
                                <div :class="'lineImg'+(index1+1)"></div>
                            </div>
                            <div class="slide-img" v-if="item.subjectCode=='FUEL'">
                                <div :class="'ryImg'+(index1+1)"></div>
                            </div>
                            <div class="slide-img" v-if="item.subjectCode=='ROAD_SLOPER'">
                                <div :class="'pdImg'+(index1+1)"></div>
                            </div>
                            <span>{{el.name}}</span>
                        </div>
                    </div>
                    <div class="slide-bnt" @click="nextStep(item,index)">
                        <span>下一步</span>
                    </div>
                </div>
            </div>
            <div class="wrap-tips" v-show="tipsModel">
                <div class="title">
                    <span>选项说明</span>
                    <span class="close-icon" @click="tipsModel=false"></span>
                </div>
                <div class="wrap-infor">
                    {{this.activeTab.itemDesc}}
                </div>
            </div>
        </div>

    </div>
    
</template>
<style lang="scss" scoped>
     @import '../css/IntelligenceHome.scss';
</style>
<script>
import Vue from 'vue'
import UintHeader from './UintHeader';
import _util_ from '../../../common/businessUtils/util';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
import intellHome_icon from '../img/intellHome_icon.png';
export default {
    name: 'IntelligenceHome',
    components: {UintHeader},
  	data(){
        return {
            title:"热销车型",
            intellHome_icon: intellHome_icon,
            tipsModel:false,
            slideModel:0,
            list:[],
            activeTab:{},
            queryParam:[],
            speed:0,
            speedData:{},
            minSpeed:0,
            maxSpeed:20,
            isWxP:false
        }
    },
    mounted(){
        // this.compareList = window.sessionStorage.getItem('compareList')?JSON.parse(window.sessionStorage.getItem('compareList')):[];
        let param = {
                subjectState: 0,// 问卷状态 0 启用 1 停用 不传查全部
                
            }
        this.getQuestion(param)
    },
    computed:{
       
    },
    methods:{
        getQuestion:function(param){
            let _self = this;
            model.getQuestion(param,function(res){
                if(res.code == 200){
                    let list = res.data;
                    _self.list = list;
                }
            })
        },
        vehicleGeneration:function(){

            let _self = this;
            let param = this.queryParam;
            model.vehicleGeneration(param,function(res){
                if(res.code == 200){
                    
                }
            })
        },
        speedBnt:function(index,item){
            
           this.speed = index;
           this.minSpeed = index*5;
           this.maxSpeed = index*5+20;
           this.speedData = item;
            if((index*5+20)>=Number(item.items[1].name)){
                
                this.maxSpeed = Number(item.items[1].name);
                this.speed = Math.ceil(Number(item.items[1].name)/5)-4;
                this.minSpeed = (Math.ceil(Number(item.items[1].name)/5)-4)*5;
            }
                
            
        },
        tabBnt:function(el){
            this.activeTab = el;
            this.tipsModel = true;
        },
        nextStep:function(el,index){
            if(JSON.stringify(this.activeTab)=="{}"&&el.subjectCode != 'SPEED'){
                this.$message(el.subjectTitle);
                return;

            }
            this.slideModel = index+1;
            let obj = {};
            if(el.subjectCode == 'INDUSTRY'&&this.activeTab.id == 167){
                this.isWxP = true;
            }
            if(el.subjectCode == 'SPEED'){
                obj = {
                    subjectCode:el.subjectCode,
                    items:[
                        {
                            id:this.speedData.items[0].id,
                            name:this.minSpeed
                        },
                        {
                            id:this.speedData.items[1].id,
                            name:this.maxSpeed
                        },
                    ]
                }
            }else{
                obj = {
                    subjectCode:el.subjectCode,
                    items:[
                        {
                            id:this.activeTab.id,
                            name:this.activeTab.name,
                        }
                    ]
                }
            }
            
            this.queryParam.push(obj);
            this.tipsModel = false;
            if(index>=(this.list.length-1)){
                this.vehicleGeneration()
            }
            this.activeTab = {};
        }
    },
}
</script>
