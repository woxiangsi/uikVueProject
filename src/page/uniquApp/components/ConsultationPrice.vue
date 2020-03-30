<template>
<div class="">
    <div class="ConsultationPrice" v-show="showModel" @click="selShow=false,selShow1=false,selShow2=false">
        <div class="wrap" v-if="carData">
            <div class="title">
                <span>获取底价</span>
                <span class="close-icon" @click="showModel=false"></span>
            </div>
            <div class="wrap-infor">
                <div class="wrapInfor-img">
                    <img :src="carData.modelImage" alt=""/>
                </div>
                <div class="itemM-content">
                    <div class="itemM-content-title">{{carData.modelName}}</div>
                    <div class="itemM-content-content" v-html="carData.remarks">{{carData.remarks}}</div>
                    <div class="itemM-content-fun">
                        <span v-for="item in carData.labels" :key="item.id">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div class="wrap-li">
                <div class="wrapLi-let">
                    <span class="must-icon">*</span>
                    <span>姓名</span>
                </div>
                <div class="wrapLi-rigt">
                    <input type="text" v-model="name" placeholder="请输入姓名"  @blur.prevent="nameModel=true"/>
                    <div class="tipsForm" v-show="!name&&nameModel">请输入姓名</div>
                </div>
            </div>
            <div class="wrap-li">
                <div class="wrapLi-let">
                    <span class="must-icon">*</span>
                    <span>性别</span>
                </div>
                <div class="wrapLi-rigt radio">
                    <div class="radioOption " @click="sex=0">
                        <span :class="sex==0?'radio-icon radioCheck':'radio-icon'"></span>
                        <span>男</span>
                    </div>
                    <div class="radioOption" @click="sex=1">
                        <span :class="sex==1?'radio-icon radioCheck':'radio-icon'"></span>
                        <span>女</span>
                    </div>
                </div>
            </div>
            <div class="wrap-li">
                <div class="wrapLi-let">
                    <span class="must-icon">*</span>
                    <span>手机号</span>
                </div>
                <div class="wrapLi-rigt">
                    <input type="text" v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11" placeholder="请输入您的手机号" @blur.prevent="phoneBlur()"/>
                    <span :class="count>0?'sendCode':'getCode'" @click="sendVerifty()">{{count>0?(count+'s'):'获取验证码'}}</span>
                    <div class="tipsForm" v-show="phoneModel">{{phoneTips}}</div>
                </div>
            </div>
            <div class="wrap-li">
                <div class="wrapLi-let">
                    <span class="must-icon">*</span>
                    <span>验证码</span>
                </div>
                <div class="wrapLi-rigt">
                    <input type="text" v-model="pin" placeholder="请输入验证码" @blur.prevent="pinModel=true"/>
                    <div class="tipsForm" v-show="!pin&&pinModel">请输入验证码</div>
                </div>
            </div>
            <div class="wrap-li">
                <div class="wrapLi-let">
                    <span class="must-icon"></span>
                    <span>所属公司</span>
                </div>
                <div class="wrapLi-rigt with100">
                    <input type="text" v-model="company" placeholder="请输入您所属公司"/>
                </div>
            </div>
            <div class="wrap-li">
                <div class="wrapLi-let">
                    <span class="must-icon">*</span>
                    <span>地区</span>
                </div>
                <div class="wrapLi-rigt selectP">
                    <div class="select selectLet" >
                        <div class="" @click.stop="selShow=!selShow">
                            <span>{{provinceName?provinceName:'请选择省份'}}</span>
                            <span class="select-icon"></span>
                        </div>
                        
                        <transition name="fade" >
                            <ul class="select-option" @click.stop="selShow=true" v-if="selShow">
                                <li :class="province==item.id?'selectCheck':''" v-for="item in provinceList" :key="item.id" @click.stop="provinceChange(item)">{{item.name}}</li>
                            </ul>
                        </transition>
                    </div>
                    <div class="select">
                        <div class=""  @click.stop="selShow1=!selShow1">
                            <span>{{cityName?cityName:'请选择地区'}}</span>
                            <span class="select-icon"></span>
                        </div>
                        <transition name="fade" >
                            <ul class="select-option" @click.stop="selShow1=true" v-if="selShow1">
                                <li :class="city==item.id?'selectCheck':''" v-for="item in cityList" :key="item.id" @click.stop="cityChange(item)">{{item.name}}</li>
                            </ul>
                        </transition>
                    </div>
                    <div class="tipsForm" v-show="provinceModel">{{provinceTips}}</div>
                    
                </div>
            </div>
            <div class="wrap-li">
                <div class="wrapLi-let">
                    <span class="must-icon"></span>
                    <span>经销商</span>
                </div>
                <div class="wrapLi-rigt with100">
                    <div class="select slectJ">
                        <div @click.stop="selShow2=!selShow2">
                            <span>{{dealerName?dealerName:'请选择经销商'}}</span>
                            <span class="select-icon"></span>
                        </div>
                        <transition name="fade" >
                            <ul class="select-option" @click.stop="selShow2=true" v-if="selShow2">
                                <li :class="dealer==item.id?'selectCheck':''" v-for="item in dealerList" :key="item.id" @click.stop="dealerChange(item)">{{item.dealerName}}</li>
                            </ul>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="wrap-li">
                <div class="wrapLi-let">
                    
                </div>
                <div class="wrapLi-rigt with100 tips">
                    <span class="tips_icon">
                        <span class="tipsActive_icon"></span>
                    </span>
                    <span>风险说明：Lorem ipsum dolor sit amet, consectetur adipiscing elit, sLorem ipsum dolor sit amet, consectetur adipiscing elit, sLorem ipsum dolor sit amet, consectetur adipiscing elit, s</span>
                </div>
            </div>
            <div class="sure" @click="sure()">
                <span >提交</span>
            </div>
        </div>
        
        
    </div>
    <UintTips ref="UintTips"></UintTips>
    </div>
</template>
<script>
import _util_ from '../../../common/businessUtils/util';
import '../css/ConsultationPrice.scss';
import UintTips from './UintTips'
var createModel = require("../model/model");
var model = createModel();
const locationUrl = _util_.getLocation_util() + '/#';
import carIcon from '../img/carPrice_icon.png'
export default {
    name: '',
    components:{UintTips},
    props:{
        
    },
  	data(){
        return {
            showModel:false,
            name:'',
            nameModel:false,
            phone:'',
            phoneModel:false,
            phoneTips:'请输入手机号',
            pin:'',
            pinModel:false,
            company:'',
            sex:0,
            count:0,
            timer:null,
            carIcon:carIcon,
            selected:'',
            selShow:false,
            provinceList:[],
            province:'',
            provinceName:'',
            provinceTips:'请选择地区',
            provinceModel:false,
            selShow1:false,
            cityList:[],
            city:'',
            cityName:'',
            selShow2:false,
            dealerList:[],
            dealer:'',
            dealerName:'',
            carData:{}
            
        }
    },
    mounted(){
        this.getProvince()
        this.getDealer()
    },
    methods:{
        phoneBlur:function(){
            // 验证手机号
            let reg = /^1[0-9]{10}$/
            if(this.phone == ''){
                this.phoneTips = '请输入您的手机号'
                this.phoneModel = true
                return;
            }
            if (this.phone&& (this.phone.length <= 10 || !reg.test(this.phone)) ) {
                this.phoneTips = '请输入正确的手机号'
                this.phoneModel = true
            }else{
                this.phoneModel = false;
            }
        },
        sendVerifty:function(){
            if(this.phoneModel&&this.count>0){
                return
            }
            let _self = this;
            let param = {
                phone: this.phone, 
            }

            model.sendVerifty(param,function(res){
                if(res.code == 200){
                    const TIME_COUNT = 60;
                    if (!_self.timer) {
                        _self.count = TIME_COUNT;
                        _self.show = false;
                        _self.timer = setInterval(() => {
                            if (_self.count > 0 && _self.count <= TIME_COUNT) {
                                _self.count--;
                            } else {
                                _self.show = true;
                                clearInterval(_self.timer);
                                _self.timer = null;
                            }

                        }, 1000)
                    }
                }else{
                    alert(res.message)
                }
            })
        },
        checkPin:function(){
            let _self = this;
            let param = {
                pin: this.pin, 
                phone: this.phone
            }
            model.checkPin(param,function(res){
                if(res.code == 200){
                    _self.getIntention()
                }
            })
        },
        getProvince:function(){
            let _self = this;
            let param = {}
            model.getProvince(param,function(res){
                if(res.code == 200){
                    _self.provinceList = res.data
                }
            })
        },
        getCity:function(){
            let _self = this;
            let param = {
                province:this.province
            }
            model.getCity(param,function(res){
                if(res.code == 200){
                    _self.cityList = res.data
                }
            })
        },
        getDealer:function(){
            let _self = this;
            let param = {}
            model.getDealer(param,function(res){
                if(res.code == 200){
                    _self.dealerList = res.data
                }
            })
        },
        getIntention:function(){
            let _self = this;
            let packages = [];
            let carData = this.carData;
            carData.packages.map(function(item){
                let components = [];
                item.components.map(function(el){
                    let obj1 = {
                        id: el.id,
                        optionId: el.options?el.options[0].id:''
                    }
                    components.push(obj1)
                })
                let obj = {
                    groupId: item.id,
                    components: components
                }
                packages.push(obj)
            })

            let param = {
                customRealName:this.name,
                customGender:this.sex,
                customMobile:this.phone,
                customCompany:this.company,
                customProvince:this.province,
                customCity:this.city,
                dealerId:this.province, //经销商Id
                sellerCode: 1, //销售员编码
                nicheSource: '1', // 意向来源1：热销推荐，2：智能选车，3：智能选车-手动，4：个性定制
                nicheRole: '2', // 销售顾客区分1：销售，2：顾客
                nicheEntry: '1',// 意向单入口1：解放行app，2：智行app:3：经销商pad，4：网页，5  鹰雄汇，6 官微
                packages: [
                            {
                                "groupId": 1,
                                "components": [
                                    {
                                    "id": 1,
                                    "optionId": 1
                                    },
                                    {
                                    "id": 2,
                                    "optionId": 2
                                    }
                                ]
                            }
                ]
                           
            }
            model.getIntention(param,function(res){
                if(res.code == 200){
                    _self.$refs.UintTips.tipsModel = true;
                }
            })
        },
        provinceChange:function(item){
            this.province = item.id;
            this.provinceName = item.name;
            this.selShow = false;
            this.provinceTips = '请选择市区';
            this.provinceModel = true;
            this.getCity()
        },
        cityChange:function(item){
            this.city = item.id;
            this.cityName = item.name;
            this.selShow1 = false;
            this.provinceModel = false;
        },
        dealerChange:function(item){
            this.dealer = item.id;
            this.dealerName = item.dealerName;
            this.selShow2 = false;
        },
        sure:function(){
            this.$refs.UintTips.tipsModel = true;
            if(!this.name&&this.nameModel==false){
                this.nameModel = true;
            }
            if(!this.phone&&this.phoneModel==false){
                this.phoneModel = true;
            }
            if(!this.pin&&this.pinModel==false){
                this.pinModel = true;
            }
            if(!this.province&&this.provinceModel==false){
                this.provinceModel = true;
            }
            if(this.name&&this.phoneModel==false&&this.pin&&this.provinceModel==false){
                this.checkPin();
            }
        }
    },
}
</script>
<style lang="scss" scoped>
     @import '../css/ConsultationPrice.scss';
</style>