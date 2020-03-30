var directionalLight;
var light, light1, light2, light3, light4, light5, light6, light7, light8, light9;
var hemiLight;
var areaLight1, areaLight2, areaLight3;
var _ambientLight;
var lensFlare, lensFlare2;
function initLights() {
	car_main_color = 0x000000;
	car_highlight_color = 0xffffff;
	hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2.00);
	hemiLight.position.set(0, 5000, 0);
	scene.add(hemiLight);
	light9 = addDirectionalLight( - 200, 200.75, 300.5, 0x727272, 0.20, 150, scene);
	light = addDirectionalLight( - 0.65, 0.4, 0.85, 0x1c1c1c, 0.30, 5, scene);
	directionalLight = addDirectionalLight( - 0.65, 0.4, -0.85, 0x1c1c1c, 0.30, 5, scene);
	reflectance.number = 0.60;
	power.number = 1.1;
	mtl.color.value.setHex(car_main_color);
	mtl.specular = new THREE.ColorNode(car_highlight_color);
	mtl.build();
	light1 = addDirectionalLight(350, 550, 600, 0x3b3a3a, 0.10122, 500, scene);
	light2 = addDirectionalLight(350, 550, -600, 0x3b3a3a, 0.10122, 500, scene);
	light9.visible = false;
	hemiLight.visible = false;
	light.visible = false;
	directionalLight.visible = false;
	light1.visible = false;
	light2.visible = false;
	light3 = addDirectionalLight(3500, 900, 0, 0xffffff, 0.056, 500, scene);
	light4 = addDirectionalLight(1500, 790, 0, 0xffffff, 0.056, 500, scene)
};
function addPointLight(x, y, z, color, intensity, distance, root) {
	var point = new THREE.PointLight(color, intensity, distance);
	point.shadowCameraVisible = true;
	point.position.set(x, y, z);
	root.add(point);
	point.castShadow = true;
	return point
};
function addDirectionalLight(x, y, z, color, intensity, distance, root) {
	var directional = new THREE.DirectionalLight(color, intensity, distance);
	directional.position.set(x, y, z);
	directional.castShadow = true;
	directional.shadowCameraVisible = true;
	directional.shadowDarkness = 10.5;
	root.add(directional);
	return directional
};
function addCarFlares(value, value_id) {
	if (lensFlare) {
		if (value) {
			lensFlare.visible = true;
			lensFlare2.visible = true;
			if (value_id == 0) {
				lensFlare.lensFlares[0].color = new THREE.Color(0xffffff);
				lensFlare2.lensFlares[0].color = new THREE.Color(0xffffff)
			};
			if (value_id == 1) {
				lensFlare.lensFlares[0].color = new THREE.Color(0xa5a49b);
				lensFlare2.lensFlares[0].color = new THREE.Color(0xa5a49b)
			}
		} else {
			lensFlare.visible = false;
			lensFlare2.visible = false
		};
		return
	};
	if (!value) {
		return
	};
	var textureLoader = new THREE.TextureLoader();
	var textureFlare0 = textureLoader.load(_rootURL + 'car/textures/lensflare/lensflare0_alpha.png');
	var flareColor = new THREE.Color(0xffffff);
	lensFlare = new THREE.LensFlare(textureFlare0, 850, 0.005, THREE.AdditiveBlending, flareColor);
	lensFlare.position.set(254.83058010731338, 54.83265655213302, 77.20861219643479);
	scene.add(lensFlare);
	lensFlare2 = lensFlare.clone();
	lensFlare2.position.set(254.83058010731338, 54.83265655213302, -77.20861219643479);
	scene.add(lensFlare2);
	if (value_id == 0) {
		lensFlare.lensFlares[0].color = new THREE.Color(0xffffff);
		lensFlare2.lensFlares[0].color = new THREE.Color(0xffffff)
	};
	if (value_id == 1) {
		lensFlare.lensFlares[0].color = new THREE.Color(0xa5a49b);
		lensFlare2.lensFlares[0].color = new THREE.Color(0xa5a49b)
	}
};
function lensFlareUpdateCallback(object) {
	var f, fl = this.lensFlares.length;
	var flare;
	var vecX = -this.positionScreen.x * 2;
	var vecY = -this.positionScreen.y * 2;
	var camDistance = camera.position.length();
	for (f = 0; f < fl; f++) {
		flare = this.lensFlares[f];
		flare.x = this.positionScreen.x + vecX * flare.distance;
		flare.y = this.positionScreen.y + vecY * flare.distance;
		flare.rotation = 0
	}
}