<template>
    <div class="UintBottomFun UintBottomTips">
        <div class="fl funContent">
            <span>推荐车辆不是您想要的类型？快来个性定制看看吧</span>
        </div>
        <div class="fr funBnt">
            <span class="color1">个性定制</span>
        </div>
    </div>
</template>
<script>

import _util_ from '../../../common/businessUtils/util';
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
export default {
    name: '',
  	data(){
        return {

        }
    },
    mounted(){

    },
    methods:{
       
    },
}
</script>
<style lang="scss" scoped>
     @import '../css/Uint.scss';
   
</style>
