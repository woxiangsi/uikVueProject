var trunk_objects;
var _listConfig = ['quan', 'boliduge0001', 'ABCzhu', 'boliduge', 'cheboli', 'BCboli', 'qianmenboli', 'qiandangfengboli', 'luntai', 'dadengboli', 'dadengtongyong001', 'dadengtongyong002', 'dadengtongyong005', 'dadengtongyong004', 'dadengtongyong003', 'shadow', 'cheke', 'bolihei', 'neishi', 'yushua', 'menbashou', 'chexian', 'dipan', 'hugang', 'cheshendeng', 'youxiang', 'houbeixiangchepaizi', 'houbeixiangchepaiziduge', 'sqjt', 'G50', 'weidengbolihong', 'weidengbolibai', 'weideng001', 'weideng003', 'weideng002', 'waihoushijing002', 'waihoushijing003', 'waihoushijing001', 'waihoushijing004', 'wudengduge', 'wudengsuliao', 'qianchepaizi', 'qianchepaiziduge', 'wudenggeshen'];
var _jichupeizhi = false;
var _J05 = "";
var _J07 = "";
var _K08 = "";
var _K15 = "";
var _K53 = "";
var _K60 = "";
var _L00 = "";
var _L14 = "";
var _L16 = "";
var _L15 = "";
var _S00 = "";
var _S25 = "";
var _S35 = "";
var _S41 = "";
var _S45 = "";
var _S46 = "";
var _K25 = "";
function initOptional() {
	_jichupeizhi = false
};
function basicConfiguration() {
	if (_jichupeizhi) {
		return
	};
	trunk_objects = getTrunk_objects();
	for (var i = 0; i < _listConfig.length; i++) {
		if (trunk_objects[_listConfig[i]]) {
			trunk_objects[_listConfig[i]].visible = true
		}
	};
	_jichupeizhi = true;
	setMeshVisible("quan", false);
};
function setFeatureList(featureCodeList) {
	basicConfiguration();
	for (var u = 0; u < featureCodeList.length; u++) {
		setFeature(featureCodeList[u])
	};
	setFeature(_K25)
};
function setMeshVisible(value_code, value_boo) {
	if (trunk_objects[value_code]) {
		trunk_objects[value_code].visible = value_boo
	}
};
var cheseList = ["cheke", "menbashou", "waihoushijing002", "houcheke001", "wuchuangding", "xiaotianchuangding", "dachuangcheding", "houcheke"];
function setFeature(value) {
	var familyCode = value.substring(0, 3);
	if (value == "M001") {
		color_value = value;
		if (_K08 == 'K08M') {
			reflectance.number = 0.6
		} else {
			reflectance.number = 0.6
		};
		buttonClick(0)
	};
	if (value == "B001") {
		color_value = value;
		if (_K08 == 'K08M') {
			reflectance.number = 0.40
		} else {
			reflectance.number = 0.40
		};
		buttonClick(3)
	};
	if (value == "C001") {
		color_value = value;
		if (_K08 == 'K08M') {
			reflectance.number = 0.55
		} else {
			reflectance.number = 0.55
		};
		buttonClick(7)
	};
	if (value == "L001") {
		color_value = value;
		if (_K08 == 'K08M') {
			reflectance.number = 0.55
		} else {
			reflectance.number = 0.55
		};
		buttonClick(6)
	};
	if (value == "F081") {
		color_value = value;
		if (_K08 == 'K08M') {
			reflectance.number = 0.60
		} else {
			reflectance.number = 0.60
		};
		buttonClick(5)
	};
	if (value == "A121") {
		color_value = value;
		if (_K08 == 'K08M') {
			reflectance.number = 0.40
		} else {
			reflectance.number = 0.40
		};
		buttonClick(4)
	};
	if (value == "P004") {
		color_value = value;
		if (_K08 == 'K08M') {
			reflectance.number = 0.5
		} else {
			reflectance.number = 0.5
		};
		buttonClick(1)
	};
	if (familyCode == "J05") {
		if (value == _J05) {
			return
		};
		setMeshVisible("15duicenlungu", false);
		setMeshVisible("15buduicenlungu", false);
		setMeshVisible("10Flungu", false);
		setMeshVisible("ganglungu", false);
		if (value == "J05M") {
			setMeshVisible("15duicenlungu", true)
		};
		if (value == "J05N") {
			setMeshVisible("15buduicenlungu", true)
		};
		if (value == "J05P") {
			setMeshVisible("10Flungu", true)
		};
		if (value == "J05X") {
			setMeshVisible("ganglungu", true)
		};
		_J05 = value
	};
	if (familyCode == "J07") {
		if (value == _J07) {
			return
		};
		if (value == "J07A") {
			trunk_objects["15buduicenlungu"].material.map = M006AE_img
		};
		if (value == "J07D") {
			trunk_objects["15buduicenlungu"].material.map = M006AD_img
		};
		if (value == "J07X") {};
		_J07 = value
	};
	if (familyCode == "K08") {
		if (value == _K08) {
			return
		};
		if (value == "K08M") {};
		if (value == "K08N") {};
		_K08 = value;
		setFeature(color_value)
	};
	if (familyCode == "K15") {
		if (value == _K15) {
			return
		};
		setMeshVisible("tiaoziduge", false);
		setMeshVisible("tiaozisuliao", false);
		setMeshVisible("jinqidugetiao", false);
		setMeshVisible("jinqitiao", false);
		setMeshVisible("jinqiwaikuang", false);
		setMeshVisible("jinqidugetongyong", false);
		setMeshVisible("zhongzibiaoqian", false);
		setMeshVisible("zhongzibiaosuliao", false);
		setMeshVisible("jinqidugetiao", false);
		setMeshVisible("jinqitiao", false);
		setMeshVisible("jinqiwaikuang", false);
		setMeshVisible("jinqidugetongyong", false);
		setMeshVisible("tiaoziduge", false);
		setMeshVisible("tiaozisuliao", false);
		setMeshVisible("jinqidugetiao", false);
		setMeshVisible("jinqitiao", false);
		setMeshVisible("jinqiwaikuang", false);
		setMeshVisible("jinqidugetongyong", false);
		setMeshVisible("zhongzibiaoqian", false);
		setMeshVisible("zhongzibiaosuliao", false);
		setMeshVisible("jinqidugetiao", false);
		setMeshVisible("jinqitiao", false);
		setMeshVisible("jinqiwaikuang", false);
		setMeshVisible("jinqidugetongyong", false);
		setMeshVisible("mantianxingzi", false);
		setMeshVisible("mantianxingsuliao", false);
		setMeshVisible("mantianxingduge", false);
		setMeshVisible("jinqiwaikuang", false);
		setMeshVisible("jinqidugetongyong", false);
		setMeshVisible("houbiao", false);
		setMeshVisible("houbiaohei", false);
		setMeshVisible("houboli", false);
		setMeshVisible("houcheke", false);
		setMeshVisible("houbolihei", false);
		setMeshVisible("houboli001", false);
		setMeshVisible("houbolihei001", false);
		setMeshVisible("houbiao001", false);
		setMeshVisible("houcheke001", false);
		setMeshVisible("maxus", false);
		setMeshVisible("jinqidugetiaobianse", false);
		if (value == "K15C") {
			setMeshVisible("tiaoziduge", true);
			setMeshVisible("tiaozisuliao", true);
			setMeshVisible("jinqidugetiao", true);
			setMeshVisible("jinqitiao", true);
			setMeshVisible("jinqiwaikuang", true);
			setMeshVisible("jinqidugetongyong", true);
			setMeshVisible("houboli001", true);
			setMeshVisible("houbolihei001", true);
			setMeshVisible("houbiao001", true);
			setMeshVisible("houcheke001", true);
			setMeshVisible("maxus", true);
			setMeshVisible("jinqidugetiaobianse", true);

			console.log(trunk_objects);
			trunk_objects["tiaoziduge"].material = getCarMaterials()[30];
			trunk_objects["jinqidugetiao"].material = getCarMaterials()[5];
			trunk_objects["jinqidugetongyong"].material = getCarMaterials()[5];
			trunk_objects["jinqidugetiaobianse"].material = getCarMaterials()[5]
		};
		if (value == "K15B") {
			setMeshVisible("zhongzibiaoqian", true);
			setMeshVisible("zhongzibiaosuliao", true);
			setMeshVisible("jinqidugetiao", true);
			setMeshVisible("jinqitiao", true);
			setMeshVisible("jinqiwaikuang", true);
			setMeshVisible("jinqidugetongyong", true);
			setMeshVisible("houbiao", true);
			setMeshVisible("houbiaohei", true);
			setMeshVisible("houboli", true);
			setMeshVisible("houcheke", true);
			setMeshVisible("houbolihei", true);
			setMeshVisible("jinqidugetiaobianse", true);
			trunk_objects["tiaoziduge"].material = getCarMaterials()[30];
			trunk_objects["jinqidugetiao"].material = getCarMaterials()[5];
			trunk_objects["jinqidugetongyong"].material = getCarMaterials()[5];
			trunk_objects["jinqidugetiaobianse"].material = getCarMaterials()[5]
		};
		if (value == "K15T") {
			setMeshVisible("tiaoziduge", true);
			setMeshVisible("tiaozisuliao", true);
			setMeshVisible("jinqidugetiao", true);
			setMeshVisible("jinqitiao", true);
			setMeshVisible("jinqiwaikuang", true);
			setMeshVisible("jinqidugetongyong", true);
			setMeshVisible("houboli001", true);
			setMeshVisible("houbolihei001", true);
			setMeshVisible("houbiao001", true);
			setMeshVisible("houcheke001", true);
			setMeshVisible("maxus", true);
			setMeshVisible("jinqidugetiaobianse", true);
			trunk_objects["tiaoziduge"].material = getCarMaterials()[27];
			trunk_objects["jinqidugetiao"].material = getCarMaterials()[27];
			trunk_objects["jinqidugetongyong"].material = getCarMaterials()[27];
			trunk_objects["jinqidugetiaobianse"].material = getCarMaterials()[27]
		};
		if (value == "K15D") {
			setMeshVisible("zhongzibiaoqian", true);
			setMeshVisible("zhongzibiaosuliao", true);
			setMeshVisible("jinqidugetiao", true);
			setMeshVisible("jinqitiao", true);
			setMeshVisible("jinqiwaikuang", true);
			setMeshVisible("jinqidugetongyong", true);
			setMeshVisible("houbiao", true);
			setMeshVisible("houbiaohei", true);
			setMeshVisible("houboli", true);
			setMeshVisible("houcheke", true);
			setMeshVisible("houbolihei", true);
			setMeshVisible("jinqidugetiaobianse", true);
			trunk_objects["tiaoziduge"].material = getCarMaterials()[27];
			trunk_objects["jinqidugetiao"].material = getCarMaterials()[27];
			trunk_objects["jinqidugetongyong"].material = getCarMaterials()[27];
			trunk_objects["jinqidugetiaobianse"].material = getCarMaterials()[27]
		};
		if (value == "K15P") {
			setMeshVisible("mantianxingzi", true);
			setMeshVisible("mantianxingsuliao", true);
			setMeshVisible("mantianxingduge", true);
			setMeshVisible("jinqiwaikuang", true);
			setMeshVisible("jinqidugetongyong", true);
			setMeshVisible("houboli001", true);
			setMeshVisible("houbolihei001", true);
			setMeshVisible("houbiao001", true);
			setMeshVisible("houcheke001", true);
			setMeshVisible("maxus", true);
			trunk_objects["tiaoziduge"].material = getCarMaterials()[30];
			trunk_objects["jinqidugetiao"].material = getCarMaterials()[5];
			trunk_objects["jinqidugetongyong"].material = getCarMaterials()[5];
			trunk_objects["jinqidugetiaobianse"].material = getCarMaterials()[5]
		};
		_K15 = value
	};
	if (familyCode == "K53") {
		if (value == _K53) {
			return
		};
		if (value == "K53B") {
			trunk_objects["boliduge0001"].material = getCarMaterials()[28]
		};
		if (value == "K53C") {
			trunk_objects["boliduge"].material = getCarMaterials()[5];
			trunk_objects["boliduge0001"].material = getCarMaterials()[5]
		};
		_K53 = value
	};
	if (familyCode == "K60") {
		if (value == _K60) {
			return
		};
		setMeshVisible("xinglijia001", false);
		setMeshVisible("xinglijia002", false);
		if (value == "K60B") {
			setMeshVisible("xinglijia001", true);
			setMeshVisible("xinglijia002", true)
		};
		if (value == "K60W") {};
		_K60 = value
	};
	if (familyCode == "L00") {
		if (value == _L00) {
			return
		};
		if (value == "L00D") {};
		if (value == "L00G") {};
		_L00 = value
	};
	if (familyCode == "L14") {
		if (value == _L14) {
			return
		};
		if (value == "L14C") {
			trunk_objects["BCboli"].material = getCarMaterials()[25]
		};
		if (value == "L14D") {
			trunk_objects["BCboli"].material = getCarMaterials()[26]
		};
		_L14 = value
	};
	if (familyCode == "L16") {
		if (value == _L16) {
			return
		};
		if (value == "L16A") {
			trunk_objects["cheboli"].material = getCarMaterials()[25]
		};
		if (value == "L16B") {
			trunk_objects["cheboli"].material = getCarMaterials()[26]
		};
		_L16 = value
	};
	if (familyCode == "L15") {
		if (value == _L15) {
			return
		};
		if (value == "L15N") {
			trunk_objects["houboli"].material = getCarMaterials()[25];
			trunk_objects["houboli001"].material = getCarMaterials()[25]
		};
		if (value == "L15M") {
			trunk_objects["houboli"].material = getCarMaterials()[26];
			trunk_objects["houboli001"].material = getCarMaterials()[26]
		};
		_L15 = value
	};
	if (familyCode == "S00") {
		if (value == _S00) {
			return
		};
		setMeshVisible("didadeng001", false);
		setMeshVisible("didadeng002", false);
		setMeshVisible("didadeng003", false);
		setMeshVisible("gaodadeng001", false);
		setMeshVisible("gaodadeng002", false);
		setMeshVisible("gaodadeng003", false);
		if (value == "S00B") {
			setMeshVisible("didadeng001", true);
			setMeshVisible("didadeng002", true);
			setMeshVisible("didadeng003", true)
		};
		if (value == "S00T") {
			setMeshVisible("gaodadeng001", true);
			setMeshVisible("gaodadeng002", true);
			setMeshVisible("gaodadeng003", true)
		};
		_S00 = value
	};
	if (familyCode == "S25") {
		if (value == _S25) {
			return
		};
		setMeshVisible("houshexiangtao", false);
		setMeshVisible("waihoushijingshexiangtouzuo01", false);
		setMeshVisible("waihoushijingshexiangtouzuo", false);
		setMeshVisible("waihoushijingshexiangtouyou01", false);
		setMeshVisible("waihoushijingshexiangtouyou", false);
		setMeshVisible("qianshexiangtou", false);
		if (value == "S25V") {
			setMeshVisible("houshexiangtao", true)
		};
		if (value == "S25W") {
			setMeshVisible("houshexiangtao", true);
			setMeshVisible("waihoushijingshexiangtouzuo01", true);
			setMeshVisible("waihoushijingshexiangtouzuo", true);
			setMeshVisible("waihoushijingshexiangtouyou01", true);
			setMeshVisible("waihoushijingshexiangtouyou", true);
			setMeshVisible("qianshexiangtou", true)
		};
		if (value == "S25X") {};
		_S25 = value
	};
	if (familyCode == "S35") {
		if (value == _S35) {
			return
		};
		setMeshVisible("xiaotianchuang", false);
		setMeshVisible("xiaotianchuangding", false);
		setMeshVisible("xiaotianchuangjiaotiao", false);
		setMeshVisible("tianchuang", false);
		setMeshVisible("dachuangcheding", false);
		setMeshVisible("tianchuangjiaotiao", false);
		setMeshVisible("wuchuangding", false);
		if (value == "S35S") {
			setMeshVisible("xiaotianchuang", true);
			setMeshVisible("xiaotianchuangding", true);
			setMeshVisible("xiaotianchuangjiaotiao", true)
		};
		if (value == "S35U") {
			setMeshVisible("tianchuang", true);
			setMeshVisible("dachuangcheding", true);
			setMeshVisible("tianchuangjiaotiao", true)
		};
		if (value == "S35X") {
			setMeshVisible("wuchuangding", true)
		};
		_S35 = value
	};
	if (familyCode == "S41") {
		if (value == _S41) {
			return
		};
		setMeshVisible("leida", false);
		setMeshVisible("qianleida", false);
		if (value == "S41A") {
			setMeshVisible("leida", true)
		};
		if (value == "S41S") {
			setMeshVisible("leida", true);
			setMeshVisible("qianleida", true)
		};
		if (value == "S41X") {};
		_S41 = value
	};
	if (familyCode == "S45") {
		if (value == _S45) {
			return
		};
		setMeshVisible("wuguyushua", false);
		setMeshVisible("youguyushua", false);
		if (value == "S45B") {
			setMeshVisible("wuguyushua", true)
		};
		if (value == "S45C") {
			setMeshVisible("youguyushua", true)
		};
		_S45 = value
	};
	if (familyCode == "S46") {
		if (value == _S46) {
			return
		};
		setMeshVisible("houyushua", false);
		if (value == "S46R") {
			setMeshVisible("houyushua", true)
		};
		if (value == "S46X") {};
		_S46 = value
	};
	if (familyCode == "K25") {
		if (value == _K25) {};
		setMeshVisible("houbeixiangshitiao", false);
		if (value == "K25B") {
			setMeshVisible("houbeixiangshitiao", true);
			trunk_objects["jinqidugetiaobianse"].material = trunk_objects["houbeixiangshitiao"].material;
			trunk_objects["wudengduge"].material = trunk_objects["houbeixiangshitiao"].material;
			trunk_objects["10Flungu"].material.map = M006AF_img
		};
		if (value == "K25C") {};
		if (value == "K25Z") {
			trunk_objects["jinqidugetiaobianse"].material = trunk_objects["jinqidugetiao"].material;
			trunk_objects["wudengduge"].material = trunk_objects["jinqidugetiao"].material;
			trunk_objects["10Flungu"].material.map = M006AF01_img
		};
		_K25 = value
	}
};
function setFeatureAngle(value) {
	var familyCode = value.substring(0, 3);
	var obj = {};
	switch (familyCode) {
	case "J05":
	case "J07":
	case "L14":
	case "S30":
	case "S42":
	case "K42":
	case "450":
	case "K45":
	case "K26":
	case "L16":
		if (_angle) {
			if (_angle == "右") {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 71.15408684983076,
						y: 81.0065330580634,
						z: -928.0621635548528
					}
				} else {}
			} else {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 71.15408684983076,
						y: 81.0065330580634,
						z: -928.0621635548528
					}
				} else {}
			}
		};
		break;
	case "215":
	case "C31":
	case "S25":
	case "C08":
	case "S48":
	case "K70":
	case "S21":
	case "K07":
	case "440":
	case "L15":
	case "S46":
	case "S41":
		if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
			obj = {
				x: -930.1120784975417,
				y: 81.0065330580624,
				z: -35.409108016216344
			}
		} else {};
		break;
	case "K15":
	case "S00":
	case "K04":
	case "K06":
	case "S45":
		if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
			obj = {
				x: 930.4901373389845,
				y: 81.00653305806242,
				z: 23.46034553026142
			}
		} else {};
		break;
	case "S35":
	case "K50":
	case "K60":
	case "K20":
	case "K72":
	case "L13":
	case "L15":
	case "L20":
	case "K53":
		if (_angle) {
			if (_angle == "右") {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 387.53782692970265,
						y: 429.87432271113704,
						z: 740.5490361599602
					}
				} else {}
			} else {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 387.53782692970265,
						y: 429.87432271113704,
						z: 740.5490361599602
					}
				} else {}
			}
		};
		break;
	case "K35":
	case "K47":
	case "K37":
		if (_angle) {
			if (_angle == "右") {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 512.7409255715227,
						y: 81.00653305806242,
						z: 776.8262526083807
					}
				} else {}
			} else {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 555.5512118827481,
						y: 177.23670773348164,
						z: -731.9571350449919
					}
				} else {}
			}
		};
		break;
	case "K48":
		if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
			if (value == "K48A") {
				obj = {
					x: -454.6801609821652,
					y: 243.24509609034837,
					z: -782.2335157891227
				};
			};
			if (value == "K48B") {
				obj = {
					x: -883.8834416014852,
					y: 101.51924797650884,
					z: -286.3278318574193
				};
			}
		} else {};
		break;
	case "K55":
	case "K25":
		if (_angle) {
			if (_angle == "右") {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 622.4577877478727,
						y: 229.33015038569846,
						z: 661.3078216772716
					}
				} else {}
			} else {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 646.1337898971677,
						y: 214.93473249503674,
						z: -642.8501957681352
					}
				} else {}
			}
		};
		break;
	case "S47":
		if (_angle) {
			if (_angle == "右") {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 841.6784256228954,
						y: 305.4636181311904,
						z: 279.15490374874275
					}
				} else {}
			} else {
				if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
					obj = {
						x: 856.9183623935147,
						y: 287.5638973075023,
						z: -249.236811047707
					}
				} else {}
			}
		};
		break;
	case "YP5":
	case "YPM_006":
	case "YPM_00A":
		if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
			obj = {
				x: 515.418918318935,
				y: 155.3091979565663,
				z: -959.9929640582089
			}
		} else {};
		break
	};
	toTurnTo2(obj)
};
function setExtHotspotFeatureAngle(value) {
	switch (value) {
	case "YP5":
	case "YPM_006":
	case "YPM_00A":
		if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
			obj = {
				x: 515.418918318935,
				y: 155.3091979565663,
				z: -959.9929640582089
			}
		} else {};
		break;
	case "YPS00":
	case "YPM_00L":
		if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
			obj = {
				x: 1087.2597988946281,
				y: 77.10354981779597,
				z: -4.6013381858814215
			}
		} else {};
		break;
	case "YPK60":
	case "YPM_00K":
		if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
			obj = {
				x: 243.9874123301462,
				y: 403.02177897878096,
				z: 753.314147443036
			}
		} else {};
		break;
	case "YP440":
		if (_deviceType == "Windows" || _deviceType == "Mobile" || _deviceType == "iPad") {
			obj = {
				x: -857.074048495027,
				y: 123.022969149194,
				z: 245.23288850389426
			}
		} else {};
		break
	};
	toTurnTo2(obj)
};
var hotspotList = {};
hotspotList["YP5"] = {
	"name": "YP5",
	"point": {
		'x': 66.94123826596433,
		'y': 27.463989362030205,
		'z': -99.22254943847656 - 9
	}
};
hotspotList["YPM_006"] = {
	"name": "YPM_006",
	"point": {
		'x': 184.57802333400258,
		'y': 8.482009688861282,
		'z': -99.29527282714855 - 5
	}
};
hotspotList["YP440"] = {
	"name": "YP440",
	"point": {
		'x': -240.3778901137631 - 9,
		'y': 37.20278977257823,
		'z': -34.63966369628909
	}
};
hotspotList["YPM_00A"] = {
	"name": "YPM_00A",
	"point": {
		'x': -80.86201429587863,
		'y': 87.78850675305421,
		'z': -91.89221954345703 - 9
	}
};
hotspotList["YPS00"] = {
	"name": "YPS00",
	"point": {
		'x': 249.41871335480027 + 9,
		'y': 55.136745692202425,
		'z': 76.16149139404297
	}
};
hotspotList["YPM_00K"] = {
	"name": "YPM_00K",
	"point": {
		'x': 31.101009368896484,
		'y': 144.10615134720777 + 9,
		'z': 0.95686863802058
	}
};
hotspotList["YPK60"] = {
	"name": "YPK60",
	"point": {
		'x': -83.67556762695312,
		'y': 149.90268066693375 + 9,
		'z': 59.03487207336485
	}
};
hotspotList["YPM_00L"] = {
	"name": "YPM_00L",
	"point": {
		'x': 276.5645622563872 + 9,
		'y': 29.698868096262373,
		'z': 0.903146743774414
	}
};
var hotspotSpriteList = {};
var cheDengBoo = false;
var switchLightBoo = false;
function oveSitClickGroupFamily(valueList) {
	Object.keys(hotspotSpriteList).forEach(function (key) {
		hotspotSpriteList[key].visible = false
	});
	cheDengBoo = false;
	setCarDoor(false);
	for (var i = 0; i < valueList.length; i++) {
		if (hotspotList[valueList[i]]) {
			if (hotspotSpriteList[valueList[i]]) {
				hotspotSpriteList[valueList[i]].visible = true;
				hotspotSpriteList[valueList[i]].material.map = hotspot_noselect_map;
				hotspotSpriteList[valueList[i]].animationBoo = true
			} else {
				var material = new THREE.SpriteMaterial({
					map: hotspot_noselect_map,
					color: 0xffffff,
					fog: true
				});
				var sprite = new THREE.Sprite(material);
				sprite.scale.set(49, 49, 1);
				scene.add(sprite);
				sprite.name = valueList[i];
				sprite.position.set(hotspotList[valueList[i]].point.x, hotspotList[valueList[i]].point.y, hotspotList[valueList[i]].point.z);
				hotspotSpriteList[valueList[i]] = sprite;
				clickObjects.push(sprite);
				hotspotSpriteList[valueList[i]].animationBoo = true;
				trunk_objects[valueList[i]] = sprite
			};
			if (valueList[i] == 'YPS00') {
				cheDengBoo = true;
				if (switchLightBoo) {
					trunk_objects[valueList[i]].visible = false
				}
			};
			setCarDoor(true)
		}
	}
};
function setExtHotspotSelect(value) {
	if (trunk_objects[value]) {
		selectExtHotspotObject(trunk_objects[value])
	}
};
function switchLight(value, value_id) {
	addCarFlares(value, value_id);
	switchLightBoo = value;
	if (trunk_objects["YPS00"]) {
		if (value) {
			trunk_objects["YPS00"].visible = false
		} else {
			trunk_objects["YPS00"].visible = cheDengBoo
		}
	};
	if (trunk_objects["weideng003"]) {
		if (value) {
			trunk_objects["weideng003"].material.map = weidengliang_img
		} else {
			trunk_objects["weideng003"].material.map = weidengbuliang_img
		}
	}
}