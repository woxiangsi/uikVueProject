<template>
    <div class="list">
        <img :src='headerPic || data.optionImage' alt="">
        <div class='list-text' v-html='data.optionDescription'>
        </div>
    </div>
</template>
<script>
import headerPic from '../img/header-pic.png'
export default {
    name: '',
    components: {
    },
    props: {
        data: {
            type: Object,
        },
    },
  	data(){
        return {
            headerPic: headerPic
        }
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
    .list {
        // height: 300px;
        background: #fff;
        img {
            width: 447px;
            // height: 396px;
        }
        .list-text {
            width:447px;
            height:325px;
            padding: 20px 0;
            background: #fff;
            text-align:justify;
            font-size:21px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:28px;
        }
    }
</style>