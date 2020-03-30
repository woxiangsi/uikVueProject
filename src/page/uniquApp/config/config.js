/**
 * Created by lsy on 2018/11/22.
 * 接口配置文件
 */
// import {BASEHOST_BASE,BASEHOST_USER} from '../../../common/constant/baseHost.js'
import {Env, HostURL, } from '../../../common/constant/Env.js'
console.log(Env)
module.exports = {
   listUrl:HostURL+'/unique/api/hot_recommend/model/list', //热销车型车辆列表

   conditionUrl:HostURL+'/unique/api/hot_recommend/condition',   //筛选条件

   veriftyUrl:HostURL+'/unique/api/sms/verifty',     //发送短信验证码

   checkUrl:HostURL+'/unique/api/sms/check',   //校验验证码

   provinceUrl:HostURL+'/unique/api/province/info',   //获取省份

   cityUrl:HostURL+'/unique/api/city/info',   //获取市

   dealerUrl:HostURL+'/unique/api/dealer',  //经销商列表

   intentionUrl:HostURL+'/unique/api/intention/info',    //获取底价

   modelInfoUrl:HostURL+'/unique/api/hot_recommend/model/info',   //车辆详情

   recommendedDetailUrl:HostURL+'/unique/api/hot_recommend/model/info',    //热销推荐详情

   fullConfigUrl:HostURL+'/unique/api/hot_recommend/group/list',    //全量配置包

   modifyConfigurationUrl:HostURL+'/unique/api/intelligent/manual',    // 手动更改配置

   vehicleGenerationUrl: HostURL+'/unique/api/intelligent/generate',  //生成车辆

   recommendUrl: HostURL+'/unique/api/custom/recommend', // 冲突项

   checkUnSelectUrl: HostURL+'/unique/api/intelligent/check', // 获取未选项推荐配置

   personalConfigUrl: HostURL+'/unique/api/custom/config',  // 个性配置信息
   questionUrl: HostURL+'/unique/api/intelligent/question'   //查询选题
   
};
