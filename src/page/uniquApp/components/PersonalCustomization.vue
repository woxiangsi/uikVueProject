<template>
    <div class="personal-customization">
        <div class="tabs-box">
            <div class="tabs">
                <div 
                    class="tab"
                    v-for="(item,index) in packages"
                    :key="index"
                    :class="{'activeTab':index==activeTabIndex}"
                    @click='handleChangeTab(item, index)'
                >
                    <div class='name'>{{item.groupName}}</div>
                    <div class="line"></div>
                </div>
            </div>
        </div>
        <div class="select-list">
            <List
                v-for='(item, index) in components'
                :key='index'
                :data='item'
                :packages='packages'
                :relation='relation'
                :activeTabIndex='activeTabIndex'
                :activeBinIndex='index'
                :isPersonal='true'
            ></List>
        </div>
    </div>
</template>
<script>
var createModel = require("../model/model");
var model = createModel()
import List from '../common/componentList'
export default {
    data() {
        return{
            packages: [],
            activeTabIndex: 0,
            relation: []
        }
    },
    components: {
        List
    },
    mounted() {
        this.getPersonalConfig()
    },
    methods: {
        getPersonalConfig(id) {
            let param = {
                driveId: id
            }
            model.personalConfig(param,(res) => {
                if(res.code == 200){
                    if (id) {
                        this.packages = res.data.packages.slice(0,1)
                        this.components = this.packages[0].components.slice(0, 1)
                    } else {
                        this.packages = res.data.packages
                        this.components = this.packages[0].components
                    }
                    
                    console.log('1111111', this.packages)
                }
            }) 
        },
        handleChangeTab(item, index) {
            this.components = item.components
            this.activeTabIndex = index
            this.activeBinIndex = 0
        }
    }
}
</script>
<style lang="scss" scope>
    .personal-customization {
        .tabs-box {
            width: 100%;
            height: 100px;
            line-height: 100px;
            padding: 0px 20px;
            overflow-x: scroll;
            &::-webkit-scrollbar {display:none}
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
        }
        
    }
</style>