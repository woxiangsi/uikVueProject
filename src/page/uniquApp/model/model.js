/**
 * Created by lsy on 2018/11/22.
 */

import $http from "../../../common/businessUtils/HTTP.js";

var config = require("../config/config");
function createModel(){
	var model = new Object();
	//  var base = createRefBasicModel();
	function Model(){}

	//   Model.prototype = base;
	var model = new Model();
	// model.baseModel = base;
	/***** 以上为固定代码，勿动, baseModel内方法自动继承过来，可用base调用  *****/

	//1.获取热销车型列表
	model.getList = function(params,succFun){
		/** 
		 * 1.注意get请求和post请求的区别。get {params:params}
		 * post parems
		*/
	console.log("999")
	console.log(config.listUrl)
	$http.get(config.listUrl,{params:params})

		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	//1.获取筛选列表
	model.getCondition = function(params,succFun){
		$http.get(config.conditionUrl,{params:params})
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	//发送短信验证码
	model.sendVerifty = function(params,succFun){
		$http.post(config.veriftyUrl,params)
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	//发送短信验证码
	model.getProvince = function(params,succFun){
		$http.get(config.provinceUrl)
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	//发送短信验证码
	model.getCity = function(params,succFun){
		$http.get(config.cityUrl,{params:params})
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	//发送短信验证码
	model.getDealer = function(params,succFun){
		$http.get(config.dealerUrl,{params:params})
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	//发送短信验证码
	model.getModelInfo = function(params,succFun){
		$http.get(config.modelInfoUrl,{params:params})
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	
	//发送短信验证码
	model.getIntention = function(params,succFun){
		$http.post(config.intentionUrl,params)
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});
	}
	//发送短信验证码
	model.checkPin = function(params,succFun){
		$http.post(config.checkUrl,params)
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	// 获取热销推荐详情
	model.getRecommendedDetail = function(params,succFun){
		$http.get(config.recommendedDetailUrl,{params:params})
		.then(function(response){

			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}

	// 获取全量配置包
	model.getFullConfig = function(params,succFun){
		$http.get(config.fullConfigUrl,{params:params})
		.then(function(response){

			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}

	//手动更改配置
	model.modifyConfiguration = function(params,succFun){
		$http.post(config.modifyConfigurationUrl,params)
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	// 生成车辆
	model.vehicleGeneration = function(params,succFun){
		$http.post(config.vehicleGenerationUrl,params)
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	// 冲突项
	model.recommend = function(params,succFun){
		$http.post(config.recommendUrl,params)
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	// 获取未选项推荐配置
	model.checkUnSelect = function(params,succFun){
		$http.post(config.checkUnSelectUrl,params)
		.then(function(response){
			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}

	// 个性定制配置包
	model.personalConfig = function(params,succFun){
		$http.get(config.personalConfigUrl,{params:params})
		.then(function(response){

			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	model.getQuestion = function(params,succFun){
		$http.get(config.questionUrl,{params:params})
		.then(function(response){

			succFun(response.data)
		})
		.catch(function(error){
			console.log(error);
		});   
	}
	

return model;
}
module.exports = createModel;
