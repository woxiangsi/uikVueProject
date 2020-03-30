<template>
    <div class="detail-container">
        <Head :remarks='data.remarks' :labels='data.labels' :headImg='data.modelImage'></Head>
        <div class="info-content"  v-if='!isModifyConfiguration'>
            <div class="tabs-box">
                <div class="tabs">
                    <div 
                        class="tab"
                        v-for="(item,index) in dataList"
                        :class="{'activeTab':index==activeTabIndex}"
                        :key="index"
                        @click='handleChangeTab(item, index)'
                    >
                        <div class='name'>{{item.groupName}}</div>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
            <div class='bins-box'>
                <div class="bins-name">
                    <div
                        v-for='(item, index) in binsList'
                        :key='index'
                        :class="{'activeBin':index==activeBinIndex}"
                        @click='handleChangeBins(item,  index)'
                    >
                        {{item.componentName}}
                    </div>
                </div>
            </div>
            <Swiper :swiperList='swiperList'></Swiper>
        </div>
        <div class="info-select"  v-else>
            <div class="tabs-box">
                <div class="tabs">
                    <div 
                        class="tab"
                        v-for="(item,index) in changeDataList"
                        :class="{'activeTab':index==activeTabIndex}"
                        :key="index"
                        @click='handleChangeTab(item, index)'
                    >
                        <div class='name'>{{item.groupName}}</div>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
            <div class="select-list">
                <List
                    v-for='(item, index) in changeBinsList'
                    :key='index'
                    :data='item'
                    :packages='changeDataList'
                    :relation='relation'
                    :activeTabIndex='activeTabIndex'
                    :activeBinIndex='index'
                ></List>
            </div>
        </div>
        <footer>
            <div class="reference-price">
                <img :src='compareIcon' alt="">
                <span @click='getUnSelectItem()'>加入对比</span>
            </div>
            <div class="add-compare" @click='handleChangeConfig'>手动更改配置</div>
            <div class="floor-price">获取底价</div>
        </footer>
    </div>
</template>
<script>
import _util_ from '../../../common/businessUtils/util';
import Head from '../common/head'
import List from '../common/componentList'
import Swiper from '../common/swiper'
import Icon1 from '../img/icon1.png'
import compareIcon from '../img/compare-icon.png'
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
export default {
    name: '',
    components: {
        Head,
        Swiper,
        List
    },
  	data(){
        return {
            compareIcon: compareIcon,
            data: {},
            dataList: [],
            binsList: [],
            changeBinsList: [],
            swiperList: [],
            labels: [],
            changeDataList: [],
            relation: [],
            activeTabIndex: 0,
            activeBinIndex: 0,
            isModifyConfiguration: false

        }
    },
    mounted(){
        this.vehicleGeneration()
    },
    methods:{
        // 生成车辆，获取配置项
        vehicleGeneration() {
            const modelCode = this.$route.query.modelCode
            let param = [
                {subjectCode: "INDUSTRY", items: [{id: 165, name: "快运"}]},
                {subjectCode: "DRIVE", items: [{id: 173, name: "6×2R"}]},
                {subjectCode: "LOAD_CAPACITY", items: [{id: 181, name: "46T"}]},
                {subjectCode: "SPEED", items: [{id: 185, name: 70}, {id: 187, name: 90}]},
                {subjectCode: "MODELS", items: [{id: 193, name: "北方款"}]},
                {subjectCode: "ROAD_TYPE", items: [{id: 199, name: "平路"}]},]
            
            model.vehicleGeneration(param,(res) => {
                if(res.code == 200){
                    this.data = res.data
                    this.dataList = res.data.packages
                    this.processData(res.data)
                }
            })
        },
        getFullConfig() {
            let param = {}
            model.getFullConfig(param,(res) => {
                if(res.code == 200){
                }
            }) 
        },
        // 获取修改配置时所有配置项数据
        getChangeData() {
            const carModelCode = this.$route.query.modelCode
            let param = {
                carModelCode, 
            }
            model.modifyConfiguration(param, (res) => {
                if(res.code == 200){
                    this.getOptionStatus(res.data.packages, res.data.relation)
                }
            })
        },
        // 获取未选项推荐配置
        getUnSelectItem() {
            console.log(this.changeDataList)
            let param = {
                packages: this.packages,
                relation: this.relation,
                currentInfo: this.currentInfo,
            }
            // model.checkUnSelect(param,(res) => {
            //     if(res.code == 200){
            //         this.data = res.data
            //         this.dataList = res.data.packages
            //         this.processData(res.data)
            //     }
            // })
        },
        handleChangeTab(item, index) {
            this.changeBinsList = item.components
            this.activeTabIndex = index
            this.activeBinIndex = 0
        },
        handleChangeBins(item, index) {
            this.activeBinIndex = index
            this.swiperList = item.options
        },
        // 将生成车辆获取的数据第三级数据全部取出来放到一个数组中，用于轮播
        processData(data) {
            let swiperList = []
            let binsList = [] 
            let secondIndex = -1
            for(let i = 0; i < data.packages.length; i++) {
                let item = data.packages[i].components
                for (let j = 0; j < item.length; j++) {
                    let component = item[j].options
                    let bins = item[j]
                    bins.groupName = data.packages[i].groupName
                    bins.firstIndex = i
                    binsList.push(bins)
                    for (let k = 0; k < component.length; k++){
                        let option = component[k]
                        option.groupName = data.packages[i].groupName
                        option.firstIndex = i
                        option.componentName = item[j].componentName
                        secondIndex++
                        option.secondIndex = secondIndex
                        swiperList.push(option)
                        
                    }

                }
            }
            this.binsList = binsList
            this.swiperList = swiperList
        },
        handleChangeHighlight(data) {
            this.activeTabIndex = data.firstIndex
            this.activeBinIndex = data.secondIndex
        },
        handleChangeConfig() {
            this.getChangeData()
            this.isModifyConfiguration = true
        },
        getOptionStatus(data, relation) {
            let opList = []
            for(let i = 0; i < data.length; i++){
               let group = data[i]
                for(let j = 0; j < data[i].components.length; j++){
                    let component = data[i].components[j]
                    const selectOption = this.swiperList.find(item => item.componentName == component.componentName)
                    data[i].components[j].selectOptionName = selectOption.optionName
                    for(let k = 0; k < data[i].components[j].options.length; k++) {
                        if (data[i].components[j].options[k].optionName == selectOption.optionName) {
                            data[i].components[j].options[k].select = true
                        } else {
                            data[i].components[j].options[k].select = false
                        }
                    }
                }
            }
            for(let group of data) {
                for(let component of group.components) {
                    for (let option of component.options) {
                        option.componentName = component.componentName
                        option.groupName = group.groupName
                        opList.push(option)
                    }
                }
            }
            let sameComArr = []
            for(let r_op of relation) {
                // 将选中的数据都过滤出来
                const matchOp = opList.filter(item => item.optionName == r_op.optionName && item.select && item.componentName == r_op.componentName)
                if (matchOp.length) {
                    // 选中数据对应的关联二级数据
                    const relationMatch = r_op.relations
                    // 获取到二级数据
                    for(let relationCom of relationMatch) {
                        // 将第三级数据中能和选中数据的所有第二级关联relations的数据获取
                        const matchOps = opList.filter(item => item.componentName == r_op.componentName)
                        sameComArr = sameComArr.concat(matchOps)
                        for(let m_op of relationCom.options) {
                           for (let op of sameComArr) {
                               if (op.optionName == m_op.optionName) {
                                   op.disabled = false
                               } else {
                                   op.disabled = true
                               }
                           }
                        }
                    }
                }
            }
            for (let _option of opList) {
                if (_option.disabled == undefined) {
                    _option.disabled = false
                }
            }
            console.log('111111122222222',opList)
            for(let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].components.length; j++) {
                    const e_options = opList.filter(op => op.componentName == data[i].components[j].componentName)
                    data[i].components[j].options = e_options
                }
            }
            // console.log('end----', data)
            this.relation = relation
            this.changeDataList = data
            this.changeBinsList = data[0].components
        },
    }
}
</script>
<style lang="scss" scoped>
    .detail-container {
        padding-bottom: 90px;
        background: #F0F0F0;
        overflow: hidden;
        .info-content {
            position: relative;
            width: 100%;
            background: #fff;
             .tabs-box, .bins-box {
                width: 100%;
                padding: 0px 20px;
                overflow-x: scroll;
                &::-webkit-scrollbar {display:none}
            }
        }
        .info-select {
            background: #fff;
            .tabs-box {
                padding: 0 20px;
            }
        }
        .tabs-box {
            height: 100px;
            line-height: 100px;
        }
        .tabs {
            min-width: 200%;
            display: flex;
            
            .tab {
                margin-right: 20px;
                font-size:31px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(0,0,0,1);          
            }
        }
        .bins-name {
            display: flex;
            width: 1000%;
            margin-top: 20px;
            div {
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
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size:36px;
            font-family:PingFang SC;
            font-weight:600;
            color:rgba(0,0,0,1); 
            .name {
                height: 90px;
            }   
            .line {
                width:56px;
                height:6px;
                background:rgba(25,135,233,1);
                border-radius:2px;
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
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-left: 14px;
                img {
                    height: 28px;
                    width: 28px;
                }
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