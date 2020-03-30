<template>
    <div class="detail-container">
        <Head :remarks='data.remarks' :labels='data.labels' :headImg='data.headImg'></Head>
        <div class="info-content">
            <div class="tabs-box">
                <div class="tabs">
                    <div 
                        class="tab"
                        v-for="(item,index) in dataList"
                        :class="{'activeTab':index==activeTabIndex}"
                        :key="index"
                    >
                        <img :src="item.img" alt="">
                        <span>{{item.packageName}}</span>
                    </div>
                </div>
            </div>
            <div class='bins-box'>
                <div class="bins-name">
                    <div
                        v-for='(item, index) in binsList'
                        :key='index'
                        :class="{'activeBin':index==activeBinIndex}"
                    >
                        {{item.componentName}}
                    </div>
                </div>
            </div>
            <Swiper :swiperList='swiperList'></Swiper>
        </div>
        <footer>
            <div class="reference-price">
                参考价：{{(data.price / 10000).toFixed(2)}}万元
            </div>
            <div class="add-compare">加入对比</div>
            <div class="floor-price">获取底价</div>
        </footer>
    </div>
</template>
<script>
import _util_ from '../../../common/businessUtils/util';
import Head from '../common/head'
// import List from '../common/list'
import Swiper from '../common/swiper'
import Icon1 from '../img/icon1.png'
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
export default {
    name: '',
    components: {
        Head,
        Swiper
        // List
    },
  	data(){
        return {
            data: {},
            dataList: [],
            binsList: [],
            swiperList: [],
            labels: [],
            packagesList: [],
            activeTabIndex: 0,
            activeBinIndex: 0,

        }
    },
    mounted(){
        this.getRecommendedDetail()
        this.getFullConfig()
    },
    methods:{
        getRecommendedDetail() {
            const modelCode = this.$route.query.modelCode
            let param = {
                modelCode, 
            }
            model.getRecommendedDetail(param,(res) => {
                if(res.code == 200){
                    this.data = res.data
                    let packagesList = []
                    for (let i = 0; i < res.data.packages.length; i++) {
                        let item = res.data.packages[i].components
                        packagesList = packagesList.concat(item)

                    }
                    this.packagesList = packagesList
                }
            })
        },
        getFullConfig() {
            let param = {}
            model.getFullConfig(param,(res) => {
                if(res.code == 200){
                    this.dataList = res.data
                    this.processData(res.data)
                }
            }) 
        },
        // handleChangeTab(item, index) {
        //     this.binsList = item.components
        //     this.activeTabIndex = index
        //     this.activeBinIndex = 0
        // },
        // handleChangeBins(item, index) {
        //     this.activeBinIndex = index
        //     this.swiperList = item.options
        // },
        processData(data) {
            let swiperList = []
            let binsList = [] 
            let secondIndex = -1
            for(let i = 0; i < data.length; i++) {
                let item = data[i].components
                for (let j = 0; j < item.length; j++) {
                    const fil = this.packagesList.find(el => el.componentName == item[j].componentName)
                    if (fil) {
                        let component = fil.options
                        let bins = fil
                        bins.componentName = fil.componentName
                        bins.firstIndex = i
                        binsList.push(bins)
                        for (let k = 0; k < component.length; k++){
                            let option = component[k]
                            // option.groupName = data[i].componentName
                            option.firstIndex = i
                            option.componentName = fil.componentName
                            secondIndex++
                            option.secondIndex = secondIndex
                            swiperList.push(option)
                            
                        }
                    }
                }
            }
            this.binsList = binsList
            this.swiperList = swiperList
        },
        handleChangeHighlight(data) {
            this.activeTabIndex = data.firstIndex
            this.activeBinIndex = data.secondIndex
        }
    }
}
</script>
<style lang="scss" scoped>
    .detail-container {
        padding-bottom: 90px;
        background: #F0F0F0;
        overflow-x: hidden;
        .info-content {
            position: relative;
            width: 100%;
            height: 900px;
            margin-top: 60px;
            padding-top: 100px;
            background: #fff;
            .tabs-box, .bins-box {
                width: 100%;
                padding: 0px 20px;
                overflow-x: scroll;
                &::-webkit-scrollbar {display:none}
            }
        }
        .tabs-box {
            // margin-top: -40px;
            position: absolute;
            top: -40px;
            left: 10px;
        }
        .tabs {
            min-width: 200%;
            display: flex;
            
            .tab {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width:160px;
                height:125px;
                margin-right: 40px;
                background:rgba(255,255,255,1);
                box-shadow:0px 0px 17px 0px rgba(0, 0, 0, 0.2);
                border-radius:6px;
                img {
                    width: 50px;
                }
                span {
                    display: block;
                    margin-top: 10px;
                    font-size:25px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(112,112,112,1);
                }
            }
        }
        .bins-name {
            display: flex;
            width: 1000%;
            margin-top: 20px;
            div {
                // width:181px;
                height:50px;
                padding: 0 10px;
                line-height: 50px;
                text-align: center;
                margin-right: 10px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(98,98,98,1);
                border-radius:25px;
                font-size:25px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(98,98,98,1);
            }
        }
        .bins-name .activeBin {
            background:rgba(255,255,255,1);
            border:2px solid rgba(25,135,233,1);
            border-radius:25px;
            color: #1987E9;
        }
        .tabs .activeTab {
            border:1px solid rgba(25,135,233,1);
            box-shadow:0px 0px 17px 0px rgba(0, 0, 0, 0.2);
            border-radius:6px;
            span {
                color: #1987E9;
            }
        }
        footer {
            position: fixed;
            left: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height:90px;
            width: 100%;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 28px 0px rgba(0, 0, 0, 0.25);
            z-index: 100;
            .reference-price {
                margin-left: 14px;
            }
            .add-compare {
                width:208px;
                height:56px;
                line-height: 56px;
                text-align: center;
                background:linear-gradient(-90deg,rgba(25,135,233,1) 0%,rgba(43,181,254,1) 100%);
                box-shadow:0px 6px 10px 0px rgba(191,206,231,0.75);
                border-radius:28px;
                color: #fff;
            }
            .floor-price {
                width:208px;
                height:56px;
                margin-right: 14px;
                line-height: 56px;
                text-align: center;
                background:linear-gradient(-90deg,rgba(255,101,101,1) 0%,rgba(251,148,148,1) 100%);
                box-shadow:0px 6px 10px 0px rgba(223,185,185,0.75);
                border-radius:28px;
                color: #fff;
            }
        }
    }
</style>