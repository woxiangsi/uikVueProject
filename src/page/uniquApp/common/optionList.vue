<template>
    <div class="option-list" :class="data.disabled ? 'disable' : ''">
        <div class='second' @click='handleCheck()' v-if='data.optionImage'>
            <p :class="data.select ? 'checked': ''">
                <span class='check-btn'>
                </span>
                <span class='btn-text'>{{data.select ? '已选择' : '选择'}}</span>
            </p>
            
            <img :src='data.optionImage' alt="">
            <p class='name'>{{data.optionName}}</p>
            <p class='text' v-html='data.optionDescription'></p>
        </div>
        <div class='third' v-else @click='handleCheck()'>
            <p :class="data.select ? 'checked': ''">
                <span class='check-btn'>
                </span>
                <span class='btn-text'>{{data.select ? '已选择' : '选择'}}</span>
            </p>
            <p class='name'>{{data.optionName}}</p>
            <p class='text' v-html='data.optionDescription'></p>
        </div>
    </div>
</template>
<script>
import headerPic from '../img/header-pic.png'
let _ = require('lodash')
var createModel = require("../model/model");
var model = createModel();
export default {
    name: '',
    components: {
    },
    props: {
        data: {
            type: Object,
        },
        selectOptionName: {
            type: String
        },
        index: {
            type: Number
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
        componentName: {
            type: String
        },
        componentId: {
            type: Number
        },
    },
  	data(){
        return {
            isOpen: false,
            headerPic: headerPic,
            currentInfo: [],
            conflictComponent: {},
            recommendComponents: {}
        }
    },
    mounted(){
        // console.log('o-o-o-o-o-xs',this.data) 
    },
    methods:{
        handleOpen() {
            const isOpen = this.isOpen
            this.isOpen = !isOpen
        },
        handleRecommend() {
            const param = {
                packages: this.packages,
                relation: this.relation,
                currentInfo: this.currentInfo,
                conflictComponent: this.conflictComponent
            }
            // console.log(JSON.stringify(param))
            model.recommend(param,(res) => {
                if(res.code == 200){
                    console.log(res)
                    this.recommendComponents = res.data.recommendComponents
                }
            })
        },
        handleCheck() {
            if (this.data.disabled) {
                let currentInfo = []
                let deepPackages = _.cloneDeep(this.packages)
                let _currentInfo = this.packages
                this.packages = deepPackages
                let this_option = this.data
                this_option.select = true
                const conflictComponent = {
                    id: this.componentId,
                    componentName: this.componentName,
                    options:[this_option]

                }
                // 获取当前选中的数据集
                for(let group of _currentInfo) { 
                    let _components = group.components
                    for(let component of group.components) {
                        let _options = []
                        for(let _option of component.options) {
                            if(_option.select) {
                                _options.push(_option)
                            }
                        }
                        component.options = _options

                    }
                    group.components = _components
                    currentInfo.push(group)
                }
                currentInfo[this.activeTabIndex].components[this.activeBinIndex].options[0] = this_option
                this.conflictComponent = conflictComponent
                this.currentInfo = currentInfo
                this.handleRecommend()
                // if (OK) {
                //     this.$parent.handleCheck(this.index)
                //     for(let group of this.packages) {
                //         for(let component of group.components) {
                //             if (component.componentName == this.recommendComponents.componentName) {
                //                 console.log(group, component)
                //                 for(let n_option of component.options) {
                //                     n_option.select = false
                //                     if (n_option.optionName == this.recommendComponents.options[0].optionName) {
                //                         n_option.select = true
                //                     }
                //                 }
                //             }
                //         }
                //     }
                //     this.$parent.getOptionStatus(this.packages, this.relation)
                // } else {

                // }
                
            } else {
                this.$parent.handleCheck(this.index, this.data)
            }
        }
        
    }
}
</script>
<style lang="scss" scoped>
    .check-btn {
        display: inline-block;
        width:25px;
        height:25px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(49,49,49,1);
        border-radius:50%;
    }
    .checked {
        display: flex;
        align-items: center;
        .check-btn {
            width:11px;
            height:11px;
            background:rgba(255,255,255,1);
            border:7px solid rgba(25,135,233,1);
            border-radius:50%;
        }
        .btn-text {
            margin-left: 10px;
            color: rgba(25,135,233,1);
        }
    }
    .second, .third {
        padding: 20px;
        .name {
            padding-top: 8px;
            margin-bottom: 8px;
            border-top: 1px solid #959595;
            font-weight: 500;
            color: #000;
            font-size: 28px;
        }
        .text {
            font-size: 21px;
            color: #000;
        }
    }
    .second, .third {
        background: #fff;
        margin-top: 10px;
        img {
            width: 100%;
            // height: 100px;
        }
    } 
    .disable {
        .name, .text {
            color: #7D7D7D
        }
    }
</style>