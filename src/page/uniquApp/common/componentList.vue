<template>
    <div class="component-list">
        <div class="list">
            <span class='component-name'>{{data.componentName}}</span>
            <span class='select-name'>{{data.selectOptionName}}</span>
            <span class='status-icon' @click='handleOpen()'>{{isOpen ? '-' : '+'}}</span>
        </div>
        <div class="select-content" v-if='isOpen'>
            <OptionList  
                v-for='(item, index) in data.options'
                :key='index' :data='item'
                :index='index'
                :packages='packages'
                :relation='relation'
                :activeTabIndex='activeTabIndex'
                :activeBinIndex='activeBinIndex'
                :componentName='data.componentName'
                :componentId='data.id'
                :isPersonal='isPersonal'
            >
            </OptionList>
        </div>
    </div>
</template>
<script>
import headerPic from '../img/header-pic.png'
import OptionList from '../common/optionList'
export default {
    name: '',
    components: {                                                                                                         OptionList           
    },
    props: {
        data: {
            type: Object,
        },
        packages: {
            type: Array
        },
        relation: {
            type: Array  
        },
        activeTabIndex: {
            type: Number
        },
        activeBinIndex: {
            type: Number
        },
        isPersonal: {
            type: Boolean
        }
    },
  	data(){
        return {
            isOpen: false,
            headerPic: headerPic
        }
    },
    mounted(){
    },
    methods:{
        handleOpen() {
            const isOpen = this.isOpen
            this.isOpen = !isOpen
        },
        handleCheck(index, optionData) {
            if(this.isPersonal) {
                this.$parent.getPersonalConfig(optionData.id)
                console.log(optionData)
            }
            if(this.data.options.length == 1) return
            let data = this.data
            for(let i of data.options) {
                i.select = false
            }
            this.data = data
            this.data.options[index].select = true
        },
        getOptionStatus(data, relation) {
            this.$parent.getOptionStatus(data, relation)
        }
    }
}
</script>
<style lang="scss" scoped>
    .component-list {
        padding: 0 10px;
        .list {
            display: flex;
            justify-content: space-between;
            height: 86px;
            line-height: 86px;
            padding: 0 20px;
            border-bottom: 1px solid #B5B5B5;
            .component-name {
                font-size:31px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(0,0,0,1);
            }
            .select-name {
                font-size:25px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(25,135,233,1);
            }
            .status-icon {
                font-size: 28px;
            }
        }
        .select-content {
            padding: 20px;
            background:rgba(244,244,244,1);
        }
    }  
</style>