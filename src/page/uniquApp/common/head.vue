<template>
    <div class="head">
        <header>
            <img :src='headImg' alt="" v-if='!isShow3D'/>
            <CarExplorer v-else></CarExplorer>
            <img class='angle-all' :src="angleAll" alt="" @click="handleshow3D()">
            <div class='icon-box'>
                <div @click='handleScreenAll()'>
                    <img class='screen-all' :src='screenAll' alt=""/>
                    <span>全屏</span>
                </div>
                <div @click="handleShowVr()">
                    <img class='vr' :src='vrIcon' alt=""/>
                    <span>VR</span>
                </div>
            </div>
        </header>
        <p class='head-text' v-html='remarks'></p>
        <div class='tags'>
            <div v-for='(item, index) in labels' :key='index'>{{item.name}}</div>
            
        </div>
    </div>
</template>
<script>
import CarExplorer from '../../../components/carExplorer'
import headerPic from '../img/header-pic.png'
import screenAll from '../img/screen-all.png'
import vrIcon from '../img/vr-icon.png'
import angleAll from '../img/angle-all.png'
export default {
    name: '',
    components: {
        CarExplorer
    },
    props: {
        remarks: {
            type: String
        },
        labels: {
            type: Array
        },
        headImg: {
            type: String
        }
    },
  	data(){
        return {
            headerPic: headerPic,
            vrIcon: vrIcon,
            screenAll: screenAll,
            angleAll: angleAll,
            isShow3D: false
        }
    },
    mounted(){
    },
    methods:{
        handleScreenAll() {
            this.$router.push({
                path:'/uniquApp/carExplorer',
            })
        },
        handleShowVr() {
            const modelCode = this.$route.query.modelCode
            this.$router.push({
                path:'/uniquApp/vr',
                query: {
                    vrModelCode: modelCode
                }
            })
        },
        handleshow3D() {
            const isShow3D = this.isShow3D
            this.isShow3D = !isShow3D
        }
    }
}
</script>
<style lang="scss" scoped>
    .head {
        header {
            position: relative;
            img {
                width: 100%;
            }
            .angle-all {
                position: absolute;
                left: 10px;
                top: 40px;
                width: 58px;
                height: 38px;
            }
        }
        .icon-box {
            position: absolute;
            right: 0;
            top: 40px;
            >div {
                display: flex;
                justify-content: center;
                align-items: center;
                width:111px;
                height:50px;
                margin-bottom: 10px;
                background:rgba(0,0,0,0.6);
                border-radius:7px 0px 0px 7px;
                img {
                    margin-right: 6px;
                }
                span {
                    color: #fff;
                }
            }
            .vr {
                width: 30px; 
                height: 20px;
            }
            .screen-all {
                height: 22px;
                width: 22px;
            }
        }
        .head-text {
            padding: 20px;
            font-size:22px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:31px;
        }
        .tags {
            display: flex;
            height: 60px;
            margin: 0;
            padding: 0 20px;
            div {
                width:100px;
                height:42px;
                margin-right: 10px;
                line-height:42px;
                text-align: center;
                background:rgba(240,240,240,1);
                border:1px solid rgba(25,135,233,1);
                border-radius:3px;
                font-size:22px;
                font-family:PingFang SC;
                color:rgba(25,135,233,1);
            }
        }
    }
</style>