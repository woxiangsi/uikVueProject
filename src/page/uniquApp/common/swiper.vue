<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
        <div class="swiper-slide" v-for='(item, index) in swiperList' :key='index'>
            <List :data='item'></List>
        </div>
    </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import List from '../common/list'
// import {  } from 'element-ui';
export default {
    name: '',
    components: {
        List
    },
    props: {
        swiperList: {
            type: Array,
        }
    },
  	data(){
        return {
        }
    },
    mounted(){
        setTimeout(() => {
            const _self = this
            new Swiper ('.swiper-container', {
            loop: true,
            slidesPerView: 1.6,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            autoplay: true,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
            on:{
                slideChangeTransitionEnd() {
                     const dataObj = _self.swiperList[this.activeIndex - 2]
                     _self.$parent.handleChangeHighlight(dataObj)
                },
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        }, 1000)
        
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
    .swiper-container {
        width: 100%;
        height: 500px;
        padding-top: 40px!important;
        margin-top: 30px;
        background: #fff;
        overflow-x: hidden;
        .swiper-slide {
            width: 530px;
        }
        .swiper-slide-active,.swiper-slide-duplicate-active{
            transform: scale(1.2);
        }
    }
    .el-carousel__indicators {
        display: none;
    }
</style>