var _waitLoadingList = [];
var _downloadingList = [];
var _meshList = [];
var _meshList2 = [];
var sky_env;
var dracoLoader;
var box_z_q_Pos;
var box_z_h_Pos;
var box_y_q_Pos;
var box_y_h_Pos;
var box_h_Pos;
var box_yeyagan_L_Pos;
var box_yeyagan_R_Pos;
var box_yeyagan_H_Pos;
var obj_z_q_List = ["ABCzhu001", "chemen001", "waihoushijing001", "lunmei001", "cheboli001", "qianchemenshanjiaohei001", "waihoushijing004", "chechuangzhuangshi001", "CheMen_Nei_ZuoQian", "menbashou001", "dianzisuo", "mensuo", "waihoushijing003", "waihoushijingshexiangtou001", "zhaodideng001", "waihoushjingpian001", "QCMYYZS03001", "QCMTH002001", "QCMYYZC01001", "QCMYYZS02001"];
var obj_z_h_List = ["ABCzhu002", "chemen002", "menbashou002", "chebolihuan001", "lunmei002", "yueyelunmei001", "CheMen_Nei_ZuoHou", "chechuangzhuangshi002", "HCMYYZS01001", "HCMYYZS03001", "HCMYYZS02001", "HCMTH002001"];
var obj_y_q_List = ["ABCzhu003", "chemen003", "cheboli002", "waihoushijing01", "lunmei003", "waihoushijing04", "qianchemenshanjiaohei002", "chechuangzhuangshi003", "menbashou", "CheMen_Nei_YouQian", "waihoushijing03", "dianzisuo001", "waihoushijingshexiangtou", "zhaodideng", "waihoushjingpian", "QCMTH002002", "QCMYYZS03002", "QCMYYZC01002", "QCMYYZS02002"];
var obj_y_h_List = ["ABCzhu004", "chemen004", "CheMen_Nei_YouHou", "chechuangzhuangshi004", "lunmei004", "chebolihuan002", "menbashou003", "yueyelunmei002", "HCMYYZS02002", "HCMYYZS03002", "HCMYYZS01002", "HCMTH002002"];
var obj_h_List = ["houbeixianggai001", "houbeixiangchepaizi", "houbeixiangshitiao", "chebiaohou", "houbeixiangchepaizi002", "houbeixiangboli", "houbeixiangdianjiare", "houchechuangzhuangshi02", "houchechuangzhuangshi01", "houbeixianggai002", "houyushua", "houbeixiangtietu", "houbeixiangweidengbolihong", "houbeixianggaoweideng002", "houbeixianggaoweideng001", "houbeixianggaoweideng003", "houbeixiangdiweideng001", "houbeixiangdiweideng002", "houbeixiangdiweideng003", "houbeixiangweideng001", "houbeixianggai003", "guo5", "sqjt", "xinzhishengdi", "houbeixianganniu", "maxus", "4WD", "D90", "hong4", "gaoweishachedeng", "houshexiangtao", "houbeixiangdeng"];
var obj_yeyagan_List = ["yeyagan", "yeyagan003"];
var obj_yeyagan_houmen_List = ["yeyagan002", "yeyagan004"];
var dracoList = ['quan', 'jinqidugetiaobianse', 'houbeixiangshitiao', 'boliduge0001', '10Flungu', '15buduicenlungu', '15duicenlungu', 'ABCzhu', 'BCboli', 'boliduge', 'bolihei', 'cheboli', 'cheke', 'cheshendeng', 'chexian', 'dachuangcheding', 'dadengboli', 'dadengtongyong001', 'dadengtongyong002', 'dadengtongyong003', 'dadengtongyong004', 'dadengtongyong005', 'didadeng001', 'didadeng002', 'didadeng003', 'dipan', 'G50', 'ganglungu', 'gaodadeng001', 'gaodadeng002', 'gaodadeng003', 'houbeixiangchepaizi', 'houbeixiangchepaiziduge', 'houbiao', 'houbiao001', 'houbiaohei', 'houboli', 'houboli001', 'houbolihei', 'houbolihei001', 'houcheke', 'houcheke001', 'houshexiangtao', 'houyushua', 'hugang', 'jinqidugetiao', 'jinqidugetongyong', 'jinqitiao', 'jinqiwaikuang', 'leida', 'luntai', 'mantianxingduge', 'mantianxingsuliao', 'mantianxingzi', 'maxus', 'menbashou', 'menbashouhei', 'neishi', 'qianchepaizi', 'qianchepaiziduge', 'qiandangfengboli', 'qianleida', 'qianmenboli', 'qianshexiangtou', 'shadow', 'sqjt', 'tianchuang', 'tianchuangjiaotiao', 'tiaoziduge', 'tiaozisuliao', 'waihoushijing001', 'waihoushijing002', 'waihoushijing003', 'waihoushijing004', 'waihoushijingshexiangtouyou', 'waihoushijingshexiangtouyou01', 'waihoushijingshexiangtouzuo', 'waihoushijingshexiangtouzuo01', 'weideng001', 'weideng002', 'weideng003', 'weidengbolibai', 'weidengbolihong', 'wuchuangding', 'wudengduge', 'wudenggeshen', 'wudengsuliao', 'wuguyushua', 'xiaotianchuang', 'xiaotianchuangding', 'xiaotianchuangjiaotiao', 'xinglijia001', 'xinglijia002', 'youguyushua', 'youxiang', 'yushua', 'zhongzibiaoqian', 'zhongzibiaosuliao'];
var dracoCon = 0;


//var dracoList = ['quan', 'jinqidugetiaobianse'];
//var dracoCon = 0;

var pianyi_x = 20;
var pianyi_y = 0;
var blendings = ["NoBlending", "NormalBlending", "AdditiveBlending", "SubtractiveBlending", "MultiplyBlending"];
var blending = blendings[1];
var ieBoo = false;
function initDracoLoaderManage() {
	console.log("_rootURL:" + _rootURL);
	console.log("判断当前浏览器是否是IE", getIE());
	if (getIE()) {
		ieBoo = true
	} else {
		ieBoo = false;
		var dracoDecoderType = {};
		dracoDecoderType.type = 'js';
		dracoLoader = new THREE.DRACOLoader(_rootURL + 'car/G50/js/loaders/draco/', dracoDecoderType);
		dracoLoader.setVerbosity(1);
		dracoLoader.setDrawMode(THREE.TrianglesDrawMode)
	}
};
function setCodeLoader(value, value_code) {
	if (_downloadingList.indexOf(value) > -1) {
		return
	};
	_downloadingList.push(value);
	var code_dracoList = this[value];
	for (var i = 0; i < code_dracoList.length; i++) {
		var name_code = value + "&&" + value_code + "&&" + code_dracoList[i];
		dracoLoader.load(_rootURL + 'car/models/drc/' + value + '/' + code_dracoList[i] + '.drc', codeDracoLoaderComplete, null, null, name_code)
	}
};
function codeDracoLoaderComplete(geometry, id) {
	var nameid = id.split('&&')[0];
	var codeid = id.split('&&')[1];
	var dracoName = id.split('&&')[2];
	this[nameid + '_id']++;
	var code_dracoList = this[nameid];
	var dracoListNum = this[nameid + '_id'];
	geometry.computeVertexNormals();
	var material = new THREE.MeshLambertMaterial({
		color: 0x777777,
		specular: 0x333333,
		shininess: 0.1,
		metal: false,
		ambient: 0xffffff,
		emissive: 0x000000
	});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	mesh.name = dracoName;
	modelLoaderComplete2(mesh);
	if (dracoListNum == code_dracoList.length) {
		_downloadingList.remove(nameid);
		_waitLoadingList.remove(nameid);
		setFeatureList(codeid.split(","));
		if (_downloadingList.length == 0) {
			carExtLoadingEnd();
			_loadingBoo = true;
		}
	}
};
function dracoLoaderStart() {
	if (ieBoo) {
		var loader = new THREE.AWDLoader();
		loader.crossOrigin = '';
		loader.load(_rootURL + 'car/models/awd/myModel/myModel.awd', function (_trunk) {
			for (var i = 0; i < _trunk.children[0].children.length; i++) {
				var geometry = _trunk.children[0].children[i];
				modelLoaderComplete2(geometry)
			};
			ccccc();
			setRenderOpen(true);
			basicConfiguration();
			carStartFunc();
			carExtLoadingEnd();
			_loadingBoo = true;
			scene.add(_trunk)
		},
		"myModel", "AA", onProgress, onError)
	} else {
		for (var i = 0; i < dracoList.length; i++) {
			var tempURL;
			if (webSiteCDNURLList && webSiteCDNURLList.length > 0) {
				console.log(webSiteCDNURLList[i % webSiteCDNURLList.length]);
				console.log(i % webSiteCDNURLList.length);
				tempURL = webSiteCDNURLList[i % webSiteCDNURLList.length]
			};
			if (tempURL) {
				dracoLoader.load(tempURL + 'car/models/drc/' + dracoList[i] + '.drc', dracoLoaderComplete, null, null, dracoList[i])
			} else {
				dracoLoader.load(_rootURL + 'car/models/drc/' + dracoList[i] + '.drc', dracoLoaderComplete, null, null, dracoList[i])
			}
		}
	}
};
function dracoLoaderComplete(geometry, id) {
	dracoCon++;
	geometry.computeVertexNormals();
	var material = new THREE.MeshLambertMaterial({
		color: 0x777777,
		specular: 0x333333,
		shininess: 0.1,
		metal: false,
		ambient: 0xffffff,
		emissive: 0x000000
	});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = false;
	mesh.receiveShadow = false;
	mesh.name = id;
	carExtLoading(Math.floor(dracoCon / (dracoList.length / 100)));
	modelLoaderComplete2(mesh);
	if (dracoCon == dracoList.length) {
		setRenderOpen(true);
		basicConfiguration();
		carStartFunc();
		carExtLoadingEnd();
	}
};
function ccccc() {};
function modelLoaderComplete2(_trunk) {
	_trunk.position.x -= pianyi_x;
	_meshList.push(_trunk);
	if (ieBoo) {} else {
		scene.add(_trunk)
		console.log('Mesh loaded and add in scene:'+_trunk.name)
	};
	var geometry = _trunk;
	trunk_objects[geometry.name] = geometry;
	//geometry.visible = false;


	if (geometry.name == "cheke" || geometry.name == "menbashou" || geometry.name == "waihoushijing002" || geometry.name == "houcheke001" || geometry.name == "wuchuangding" || geometry.name == "xiaotianchuangding" || geometry.name == "dachuangcheding" || geometry.name == "houcheke") {
		createScene(geometry, mtl, null, 0, 0, 0, 0)
	};
	if (geometry.name == "shadow") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0x000000,
			transparent: true
		}), shadow_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "qianchepaizi" || geometry.name == "houbeixiangchepaizi") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), chepaizi_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "qiandangfengboli" || geometry.name == "qianmenboli" || geometry.name == "BCboli" || geometry.name == "cheboli" || geometry.name == "houboli" || geometry.name == "houboli001") {
		createScene(geometry, _carMaterials[3], null, 0, 0, 0, 0)
	};
	if (geometry.name == "xiaotianchuang" || geometry.name == "tianchuang") {
		createScene(geometry, _carMaterials[19], null, 0, 0, 0, 0)
	};
	if (geometry.name == "jinqidugetiao" || geometry.name == "jinqidugetongyong" || geometry.name == "mantianxingduge" || geometry.name == "dadengtongyong005" || geometry.name == "gaodadeng001" || geometry.name == "didadeng003" || geometry.name == "xinglijia001" || geometry.name == "wudengduge" || geometry.name == "houbiao" || geometry.name == "houbiao001" || geometry.name == "boliduge" || geometry.name == "zhongzibiaoqian" || geometry.name == "boliduge0001" || geometry.name == "jinqidugetiaobianse") {
		createScene(geometry, _carMaterials[5], null, 0, 0, 0, 0)
	};
	if (geometry.name == "ABCzhu") {
		createScene(geometry, _carMaterials[12], null, 0, 0, 0, 0)
	};
	if (geometry.name == "tiaozisuliao" || geometry.name == "zhongzibiaosuliao" || geometry.name == "tiaozisuliao" || geometry.name == "zhongzibiaosuliao" || geometry.name == "mantianxingsuliao" || geometry.name == "jinqitiao" || geometry.name == "jinqiwaikuang" || geometry.name == "hugang" || geometry.name == "wudenggeshen" || geometry.name == "wudengsuliao" || geometry.name == "waihoushijing001" || geometry.name == "wuguyushua" || geometry.name == "youguyushua" || geometry.name == "houyushua" || geometry.name == "yushua" || geometry.name == "xinglijia002" || geometry.name == "houshexiangtao" || geometry.name == "qianshexiangtou" || geometry.name == "waihoushijingshexiangtouzuo01" || geometry.name == "waihoushijingshexiangtouzuo" || geometry.name == "waihoushijingshexiangtouyou01" || geometry.name == "waihoushijingshexiangtouyou") {
		createScene(geometry, new THREE.MeshPhongMaterial({
			color: 0x111111,
			specular: 0xffffff,
			shininess: 45,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), null, 0, 0, 0, 0)
	};
	if (geometry.name == "bolihei" || geometry.name == "dipan" || geometry.name == "tianchuangjiaotiao" || geometry.name == "youxiang" || geometry.name == "chexian" || geometry.name == "houbiaohei" || geometry.name == "leida" || geometry.name == "dadengtongyong001" || geometry.name == "dadengtongyong003" || geometry.name == "didadeng001" || geometry.name == "gaodadeng003" || geometry.name == "xiaotianchuangjiaotiao" || geometry.name == "qianleida") {
		createScene(geometry, _carMaterials[9], null, 0, 0, 0, 0)
	};
	if (geometry.name == "dadengboli" || geometry.name == "weidengbolibai") {
		createScene(geometry, _carMaterials[1], null, 0, 0, 0, 0)
	};
	if (geometry.name == "quan") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0x000000,
			opacity: 0.10,
			transparent: true
		}), null, 0, 0, 0, 0);
	};
	if (geometry.name == "weidengbolihong") {
		createScene(geometry, _carMaterials[6], null, 0, 0, 0, 0);
	};
	if (geometry.name == "dadengtongyong002" || geometry.name == "dadengtongyong004" || geometry.name == "didadeng002" || geometry.name == "gaodadeng002") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), dadeng_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "cheshendeng" || geometry.name == "waihoushijing004") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), cheshendeng_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "weideng001" || geometry.name == "weideng002") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), weideng_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "weideng003") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), weidengbuliang_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "tiaoziduge" || geometry.name == "sqjt" || geometry.name == "G50" || geometry.name == "mantianxingzi" || geometry.name == "maxus") {
		createScene(geometry, _carMaterials[30], null, 0, 0, 0, 0)
	};
	if (geometry.name == "luntai" || geometry.name == "10Flungu") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), M006AF_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "15duicenlungu") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), M006AB_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "15buduicenlungu") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), M006AD_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "ganglungu") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), M006AA_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "waihoushijing003") {
		createScene(geometry, new THREE.MeshBasicMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 1,
			metal: false,
			ambient: 0xffffff,
			emissive: 0x000000
		}), houshijing_img, null, 0, 0, 0, 0)
	};
	if (geometry.name == "paiqiguan" || geometry.name == "houshijing") {};
	if (geometry.name == "houbeixiangshitiao") {
		createScene(geometry, _carMaterials[29], null, null, 0, 0, 0, 0)
	};
	if (geometry.name == "paiqiguan") {
		geometry.material.side = THREE.DoubleSide
	};
	if (geometry.name == "luntai001" || geometry.name == "lungu001" || geometry.name == "lungu002" || geometry.name == "lungu003" || geometry.name == "lungu004") {}
};
function reset_object_Center(object_name, direction) {
	var boxPos = trunk_objects[object_name].geometry.center();
	var object = trunk_objects[object_name];
	object.geometry.computeBoundingBox();
	if (direction == "LF") {
		object.position.x = Math.abs(boxPos.x) - pianyi_x;
		object.position.y = Math.abs(boxPos.y) - pianyi_y;
		object.position.z = -Math.abs(boxPos.z)
	};
	if (direction == "LB") {
		object.position.x = -Math.abs(boxPos.x) - pianyi_x;
		object.position.y = Math.abs(boxPos.y) - pianyi_y;
		object.position.z = -Math.abs(boxPos.z)
	};
	if (direction == "LB2") {
		object.position.x = -Math.abs(boxPos.x) + 5;
		object.position.y = Math.abs(boxPos.y) - pianyi_y;
		object.position.z = -Math.abs(boxPos.z)
	};
	if (direction == "RF") {
		object.position.x = Math.abs(boxPos.x) - pianyi_x;
		object.position.y = Math.abs(boxPos.y) - pianyi_y;
		object.position.z = Math.abs(boxPos.z)
	};
	if (direction == "RB") {
		object.position.x = -Math.abs(boxPos.x) - pianyi_x;
		object.position.y = Math.abs(boxPos.y) - pianyi_y;
		object.position.z = Math.abs(boxPos.z)
	};
	if (direction == "RB2") {
		object.position.x = -Math.abs(boxPos.x) + 5;
		object.position.y = Math.abs(boxPos.y) - pianyi_y;
		object.position.z = Math.abs(boxPos.z)
	};
	if (direction == "B") {
		object.position.x = -Math.abs(boxPos.x);
		object.position.y = Math.abs(boxPos.y) - pianyi_y;
		object.position.z = Math.abs(boxPos.z)
	}
};
function reset_h_Center(object, boxPos) {
	var objPos = object.geometry.center();
	object.geometry.computeBoundingBox();
	object.position.x = -Math.abs(boxPos.x) - pianyi_x;
	object.position.y = Math.abs(boxPos.y) - pianyi_y;
	object.position.z = Math.abs(boxPos.z);
	if (object.name == "guo5" || object.name == "sqjt" || object.name == "xinzhishengdi") {
		object.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(Math.abs(boxPos.x) - Math.abs(objPos.x), Math.abs(objPos.y) - Math.abs(boxPos.y), boxPos.z - objPos.z))
	} else {
		if (object.name == "box012" || object.name == "yeyagan002") {
			object.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(Math.abs(boxPos.x) - Math.abs(objPos.x), Math.abs(objPos.y) - Math.abs(boxPos.y), Math.abs(boxPos.z) - Math.abs(objPos.z)))
		} else {
			object.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(Math.abs(boxPos.x) - Math.abs(objPos.x), Math.abs(objPos.y) - Math.abs(boxPos.y), Math.abs(objPos.z) - Math.abs(boxPos.z)))
		}
	}
};
function reset_y_q_Center(object, boxPos) {
	var objPos = object.geometry.center();
	object.geometry.computeBoundingBox();
	object.position.x = Math.abs(boxPos.x) - pianyi_x;
	object.position.y = Math.abs(objPos.y) - pianyi_y;
	object.position.z = Math.abs(boxPos.z);
	object.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(Math.abs(objPos.x) - Math.abs(boxPos.x), 0, Math.abs(objPos.z) - Math.abs(boxPos.z)))
};
function reset_y_h_Center(object, boxPos) {
	var objPos = object.geometry.center();
	object.geometry.computeBoundingBox();
	object.position.x = Math.abs(boxPos.x) - pianyi_x;
	object.position.y = Math.abs(objPos.y) - pianyi_y;
	object.position.z = Math.abs(boxPos.z);
	object.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(boxPos.x - Math.abs(objPos.x), 0, Math.abs(objPos.z) - Math.abs(boxPos.z)))
};
function reset_z_h_Center(object, boxPos) {
	var objPos = object.geometry.center();
	object.geometry.computeBoundingBox();
	object.position.x = Math.abs(boxPos.x) - pianyi_x;
	object.position.y = Math.abs(objPos.y) - pianyi_y;
	object.position.z = -Math.abs(boxPos.z);
	object.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(boxPos.x - Math.abs(objPos.x), 0, Math.abs(boxPos.z) - Math.abs(objPos.z)))
};
function reset_z_q_Center(object, boxPos) {
	var objPos = object.geometry.center();
	object.geometry.computeBoundingBox();
	object.position.x = Math.abs(boxPos.x) - pianyi_x;
	object.position.y = Math.abs(objPos.y) - pianyi_y;
	object.position.z = -Math.abs(boxPos.z);
	object.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(Math.abs(objPos.x) - Math.abs(boxPos.x), 0, Math.abs(boxPos.z) - Math.abs(objPos.z)))
};
function deleteSelf() {
	for (var i = 0; i < _meshList.length; i++) {
		var object = _meshList[i];
		scene.remove(object)
	};
	THREE.Cache.clear();
	setRenderOpen(false)
};
function removeEntity(object) {
	if (object.material) {
		object.material.dispose()
	};
	if (object.geometry) {
		object.geometry.dispose()
	};
	if (object.material.map) {
		object.material.map.dispose()
	};
	object = undefined
}