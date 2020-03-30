<template>
  <div v-loading="loading3D" element-loading-text="loadingText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(3, 24, 56, 0.4)" class="CarExplorer-wrap" v-if="hackReset" id="go3D">
    <span style="display:none">{{loadingText}}</span>
  </div>
</template>
<script>
import * as THREE from '../../config/three.module.js'
import {
  OrbitControls
} from '../../three.js/jsm/controls/OrbitControls.js'
import {
  DRACOLoader
} from '../../three.js/jsm/loaders/DRACOLoader.js'

// import {
//   TWEEN
// } from '../../three.js/jsm/libs/tween.module.min.js'
var TWEEN = require('../../three.js/jsm/libs/tween.module.min.js')
import { HDRCubeTextureLoader } from '../../three.js/jsm/loaders/HDRCubeTextureLoader.js'
import { PMREMGenerator } from '../../three.js/jsm/pmrem/PMREMGenerator.js'
import { PMREMCubeUVPacker } from '../../three.js/jsm/pmrem/PMREMCubeUVPacker.js'
import { RGBELoader } from '../../three.js/jsm/loaders/RGBELoader.js'
import { FBXLoader } from '../../three.js/jsm/loaders/FBXLoader.js'

var container, camera, scene, renderer, controls, clock, loadedClock
var _rootURL = './static/ops2/PublicG50/3d/'
var dracoCon = 0
var mtl = new THREE.MeshPhongMaterial()
var idddd = null
// 贴图加载器,场景贴图全局预加载，一进Home页面其实贴图和HDR资源已经加载完成
var chepaizi_img, M006AF_img, cheshenlogo_img, jingmian_img, youxiang_img, chebiao_img, yinsejinshu_img, luosi_img
var textureLoader = new THREE.TextureLoader()
textureLoader.crossOrigin = ''
// 车灯把手
chepaizi_img = textureLoader.load(_rootURL + 'car/textures/map/car01.jpg')
// cheshendeng_img = textureLoader.load(_rootURL + 'car/textures/map/cheshendeng.jpg')
// 轮胎
M006AF_img = textureLoader.load(_rootURL + 'car/textures/map/luntaiP.jpg')
cheshenlogo_img = textureLoader.load(_rootURL + 'car/textures/map/huoyanse2.png')
jingmian_img = textureLoader.load(_rootURL + 'car/textures/map/jingmiantietu.png')
youxiang_img = textureLoader.load(_rootURL + 'car/textures/map/youxiang1.jpg')
yinsejinshu_img = textureLoader.load(_rootURL + 'car/textures/map/timg.jpg')
chebiao_img = textureLoader.load(_rootURL + 'car/textures/map/timg.jpg')
luosi_img = textureLoader.load(_rootURL + 'car/textures/map/luosi.jpg')
// 加载完成释放加载器
textureLoader = null
var inited = false
// 场景灯光
var light, light1, light2, light3, light4, light5, light6, light7, light8, light9, dirLightHeper
var hemiLight, targetObject
var car_highlight_color = 0x6b6c6d
var hdrCubeRenderTarget, hdrCubeMap, cubemap, chebiaomap
// var hdrUrls = ['canary_wharf_1k.hdr','canary_wharf_1k.hdr','canary_wharf_1k.hdr','canary_wharf_1k.hdr','canary_wharf_1k.hdr','canary_wharf_1k.hdr']
var hdrUrls = ['px.hdr', 'nx.hdr', 'py.hdr', 'py.hdr', 'pz.hdr', 'nz.hdr']
hdrCubeMap = new HDRCubeTextureLoader()
  .setPath(_rootURL + 'car/textures/cube/ft/6/pisaHDR/')
  .setDataType(THREE.UnsignedByteType)
  .load(hdrUrls, function () {
    var pmremGenerator = new PMREMGenerator(hdrCubeMap)
    pmremGenerator.update(renderer)
    var pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods)
    pmremCubeUVPacker.update(renderer)
    hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget
    hdrCubeMap.magFilter = THREE.LinearFilter
    hdrCubeMap.needsUpdate = true
    pmremGenerator.dispose()
    pmremCubeUVPacker.dispose()
  })
cubemap = function () {
  var path = _rootURL + 'car/textures/cube/ft/6/2/'
  var format = '.jpg'
  var urls = [path + 'posx' + format, path + 'negx' + format, path + 'posy' + format, path + 'negy' + format, path + 'posz' + format, path + 'negz' + format]
  var textureCube_load = new THREE.CubeTextureLoader()
  textureCube_load.crossOrigin = ''
  var textureCube = textureCube_load.load(urls)
  textureCube.format = THREE.RGBFormat
  return textureCube
}()
chebiaomap = function () {
  var path = _rootURL + 'car/textures/cube/ft/6/2/'
  var format = '.jpg'
  var urls = [path + '20_u' + format, path + '20_u' + format, path + '20_u' + format, path + '20_u' + format, path + '20_u' + format, path + '20_u' + format]
  var textureCube_load = new THREE.CubeTextureLoader()
  textureCube_load.crossOrigin = ''
  var textureCube = textureCube_load.load(urls)
  textureCube.format = THREE.RGBFormat
  return textureCube
}()
var options = { text: '模型加载中...', background: '' }
// Configure and create Draco decoder.
var dracoLoader = new DRACOLoader()
// var dracoList = ['boli', 'chedeng', 'cheshen_1', 'cheshen_2', 'cheshen_3', 'cheshen_4', 'cheshen_5', 'cheshen_6', 'cheshentuya_1', 'cheshentuya_2', 'dimian', 'jingmian', 'heisejinshu_1', 'heisejinshu_2', 'heisejinshu_3', 'heisejinshu_4', 'heisejinshu_5', 'heisejinshu_6','heisejinshu_9', 'heisemosha_1', 'heisemosha_2', 'heisemosha_3', 'heisemosha_4', 'heisemosha_5', 'heisemosha_6', 'heisemosha_7', 'heisemosha_8', 'heisemosha_9','luntai', 'yinsejinshu_1', 'yinsejinshu_2', 'yinsejinshu_3', 'yinsejinshu_4', 'yinsejinshu_5', 'yinsejinshu_7', 'yinsejinshu_8', 'yinsejinshu_9', 'yinsejinshu_10','yinsejinshu_11','yinsejinshu_12','lansejinshu', 'gualogotoumingmoxing', 'heisechunse_1', 'heisechunse_2', 'heisechunse_3']
// var dracoList = ['boli', 'chedeng', 'chedeng2','cheshen_1', 'cheshen_2', 'cheshen_3', 'cheshen_4', 'cheshen_5', 'cheshen_6', 'cheshentuya_1', 'cheshentuya_2', 'dimian', 'jingmian', 'heisejinshu_3','heisejinshu_5','heisejinshu_9', 'heisemosha_1', 'heisemosha_2', 'heisemosha_3', 'heisemosha_4','heisemosha_5', 'heisemosha_6', 'heisemosha_7', 'heisemosha_8', 'heisemosha_9', 'yinsejinshu_1', 'yinsejinshu_2', 'yinsejinshu_9', 'yinsejinshu_10','lansejinshu', 'gualogotoumingmoxing', 'heisechunse_1', 'heisechunse_2','heisechunse_3','chedeng_4x2','heisejinshu_1_4x2','heisejinshu_3_4x2','heisejinshu_6_4x2','heisemosha_4_4x2','luntai_4x2','yinsejinshu_2_4x2','yinsejinshu_3_4x2','yinsejinshu_4_4x2','yinsejinshu_5_4x2','yinsejinshu_7_4x2','yinsejinshu_8_4x2','yinsejinshu_11_4x2','luntai_4x2_1','yinsejinshu_3_4x2_1','yinsejinshu_5_4x2_1','chedeng_6x4','heisejinshu_1_6x4','heisejinshu_2_6x4','heisejinshu_3_6x4','heisejinshu_4_6x4','heisejinshu_6_6x4','luntai_6x4','yinsejinshu_2_6x4','yinsejinshu_3_6x4','yinsejinshu_4_6x4','yinsejinshu_5_6x4','yinsejinshu_7_6x4','yinsejinshu_8_6x4','yinsejinshu_11_6x4','heisemosha_4_6x4','chedeng_6x2','heisejinshu_1_6x2','heisejinshu_3_6x2','heisemosha_4_6x2','yinsejinshu_7_6x2']
var dracoList = ['boli', 'chedeng', 'chedeng2', 'cheshen_1', 'cheshen_2', 'cheshen_3', 'cheshen_4', 'cheshen_5', 'cheshen_6', 'cheshentuya_1', 'cheshentuya_2', 'dimian', 'jingmian', 'heisechunse_1', 'heisechunse_2', 'heisechunse_3', 'heisejinshu_1', 'heisejinshu_3', 'heisejinshu_5', 'heisejinshu_9', 'heisemosha_1', 'heisemosha_2', 'heisemosha_3', 'heisemosha_4', 'heisemosha_5', 'heisemosha_6', 'heisemosha_7', 'heisemosha_8', 'heisemosha_9', 'yinsejinshu_1', 'yinsejinshu_2', 'yinsejinshu_9', 'yinsejinshu_10', 'lansejinshu', 'gualogotoumingmoxing',
  'chedeng_6x4', 'heisejinshu_1_6x4', 'heisejinshu_2_6x4', 'heisejinshu_3_6x4', 'heisejinshu_4_6x4', 'heisejinshu_6_6x4', 'heisemosha_4_6x4', 'luntai_6x4', 'yinsejinshu_2_6x4', 'yinsejinshu_3_6x4', 'yinsejinshu_4_6x4', 'yinsejinshu_5_6x4', 'yinsejinshu_7_6x4', 'yinsejinshu_8_6x4', 'yinsejinshu_11_6x4',
  'chedeng_4x2', 'heisejinshu_1_4x2', 'heisejinshu_3_4x2', 'heisejinshu_6_4x2', 'heisemosha_4_4x2', 'luntai_4x2_1', 'luntai_4x2', 'yinsejinshu_2_4x2', 'yinsejinshu_3_4x2', 'yinsejinshu_3_4x2_1', 'yinsejinshu_4_4x2', 'yinsejinshu_5_4x2', 'yinsejinshu_5_4x2_1', 'yinsejinshu_7_4x2', 'yinsejinshu_8_4x2', 'yinsejinshu_11_4x2',
  'chedeng_6x2', 'heisejinshu_1_6x2', 'heisejinshu_3_6x2', 'heisemosha_4_6x2', 'yinsejinshu_7_6x2', 'Anim_OK']
// 追加FBX，FBX也显示loading遮盖黑屏
// var dracoList = ['yinsejinshu_1', 'yinsejinshu_2', 'yinsejinshu_3', 'yinsejinshu_4', 'yinsejinshu_5', 'yinsejinshu_7', 'yinsejinshu_8', 'yinsejinshu_9', 'yinsejinshu_10','yinsejinshu_11','yinsejinshu_12']

var _carMaterials = []
var _carMaterials_4x2 = []
var _carMaterials_6x2 = []
// 动画相关变量
var action, clip
var mixers
var clock2 = new THREE.Clock()
// 主材质
var car_main_color = 0x555555
console.log('_rootURL:' + _rootURL)
dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./static/js/libs/draco/')
dracoLoader.setDecoderConfig({
  type: 'js'
})
console.log('Mesh preloading......')
// this.percent = 0
// FBX加载黑屏优化，FBX也显示loading遮盖黑屏
for (var i = 0; i < dracoList.length - 1; i++) {
  dracoLoader.load(_rootURL + 'car/models/drc/' + dracoList[i] + '.drc', dracoLoaderComplete, null, null, dracoList[i])
}
dracoLoader.dispose()
// 预加载将模型缓存在数组中
var loadedMeshes = []
function dracoLoaderComplete (geometry) {
  console.log('Mesh has preloaded :' + geometry.name)
  loadedMeshes.push(geometry)
  geometry = null
}
export default {
  props: {
    color: {
      type: String,
      default: '贝壳白'
    },
    driver: {
      type: String,
      default: '6×4'
    },
    setXposition: ''
  },
  data () {
    return {
      percent: 0,
      hackReset: true,
      loading3D: true,
      loadingText: '整车装配中...'
    }
  },
  watch: {
    $route (to, from) {
      console.log(to.path)
      if (to.path == '/console' || to.path == '/ideCustom' || to.path == '/Custom' || to.path == '/CustomJOG') {
        this.setRenderOpen(true)
      }
      else {
        this.setRenderOpen(false)
        THREE.Cache.clear()
      }
    },
    driver () {
      console.log('车型变化：', this.driver)
      this.driveOption(this.driver)
    }

  },
  mounted () {
    this.percent = 0
    console.log('driver--', this.driver)
    //this.driveOption(this.driver)
    //console.log('9899--',this.setCarColor())

    console.log('this.V_3d_status', this.V_3d_status)
    container = document.getElementById('go3D')
    if (!inited) {
      this.init()
    }
    else {
      this.loading3D = false
      // 路由跳转，DOM元素会卸载，重新挂载canvas渲染器输出节点
      container.appendChild(renderer.domElement)
      // 重新绑定摄像机控制器
      this.initControls()
      // 打开动画器，循环渲染
      this.setRenderOpen(true)
    }
    this.changeOption('贝壳白')
  },
  beforeDestroy () {
    //this.$refs.Zone3D = this.$vnode.elm
    console.log('vue 组件销毁', this)
    this.hackReset = false //销毁组件
    this.$nextTick(() => {
      this.hackReset = true //重建组件
    })
    //controls = null
    this.setRenderOpen(false)
    window.removeEventListener('resize', this.onWindowResize, false)
  },
  methods: {
    init () {
      scene = new THREE.Scene()
      // scene.position.x = 500
      // scene.autoUpdate = false
      // 初始化摄像机
      this.initCamera()
      // 初始化渲染器
      this.initRender()
      // 初始化灯光设置
      this.initLights()
      // 初始化场景的材质库
      this.updateMaterial()
      /// // 初始化模型加载管理器
      // this.initDracoLoaderManage()
      // 管理器加载经压缩处理过的drc模型
      if (loadedMeshes.length == dracoList.length) {
        this.dracoLoaderStart()
      }
      else {
        loadedClock = setInterval(this.dracoLoaderStart, 600)
      }
      // 动画模型单独FBX加载
      var fbx_loader = new FBXLoader()
      let that = this
      // fbx模型和动画
      fbx_loader.load(_rootURL + 'car/models/drc/Anim_OK.FBX', function (object) {
        //console.log('FBX has loaded :', object)
        loadedMeshes.push(object)
        mixers = object.mixer = new THREE.AnimationMixer(object)
        clip = object.animations[0]
        action = object.mixer.clipAction(clip)
        // object.scale.multiplyScalar(30)
        object.position.set(0, -150, 0)
        object.traverse(function (child) {
          console.log('child---', child.name)
          if (child.name.includes('luntai')) {
            child.material = _carMaterials_6x2[1]
            child.material.map = M006AF_img
          }
          if (child.name.includes('yinsejinshu')) {
            child.material = _carMaterials_6x2[4]
            child.material.map = yinsejinshu_img
          }
          if (child.name.includes('heisejinshu')) {
            child.material = _carMaterials_6x2[2]
          }
          // if(child.name.includes('yinsejinshu_8')){
          //     // this.createScene(child, _carMaterials_6x2[4], yinsejinshu_img, null, 0, 0, 0, 0)
          //     child.material.map = luosi_img
          // }
          if (child.name.includes('heisechunse')) {
            child.material = _carMaterials_6x2[9]

          }
          // if ( child instanceof THREE.Mesh ) {
          //
          //     child.material.map = texture;
          // }
        })
        action.loop = THREE.LoopOnce
        console.log('this.driver--', that.driver)
        that.driveOption(that.driver)
        that.changeOption(that.color)
        scene.add(object)
      })
      fbx_loader = null
      inited = true
      window.addEventListener('resize', this.onWindowResize, false)
    },
    updateMaterial () {
      mtl = new THREE.MeshStandardMaterial({
        color: car_main_color,
        metalness: 0.24,
        roughness: 0.25,
        envMap: hdrCubeMap
      })
      _carMaterials = [new THREE.MeshBasicMaterial({
        color: 0x5E5E5E,
        specular: 0x9B9BA8,
        opacity: 0.85,
        transparent: true,
        envMap: cubemap,
        shininess: 10,
        emissive: 0x9B9BA8,
        reflectivity: 0.8
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 1,
        metal: false,
        ambient: 0xffffff,
        emissive: 0x000000
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.3
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x111111),
        metalness: 0.1,
        roughness: 0.4
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xAAAAAA),
        metalness: 0.6,
        roughness: 0.3
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xAAAAAA),
        metalness: 0.5,
        roughness: 0.2
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x3C3C3C),
        metalness: 0.2,
        envMap: hdrCubeMap
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.1
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 1,
        metal: false,
        ambient: 0xffffff,
        emissive: 0x000000
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.3
      })
      ]
      _carMaterials_6x2 = [new THREE.MeshBasicMaterial({
        color: 0x5E5E5E,
        specular: 0x9B9BA8,
        opacity: 0.85,
        transparent: true,
        envMap: cubemap,
        shininess: 10,
        emissive: 0x9B9BA8,
        reflectivity: 0.8
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 1,
        metal: false,
        ambient: 0xffffff,
        emissive: 0x000000
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.3
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x111111),
        metalness: 0.1,
        roughness: 0.4
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xAAAAAA),
        metalness: 0.6,
        roughness: 0.3
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xAAAAAA),
        metalness: 0.5,
        roughness: 0.2
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x3C3C3C),
        metalness: 0.2,
        envMap: hdrCubeMap
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.1
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 1,
        metal: false,
        ambient: 0xffffff,
        emissive: 0x000000
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.3
      })
      ]
      _carMaterials_4x2 = [new THREE.MeshBasicMaterial({
        color: 0x5E5E5E,
        specular: 0x9B9BA8,
        opacity: 0.85,
        transparent: true,
        envMap: cubemap,
        shininess: 10,
        emissive: 0x9B9BA8,
        reflectivity: 0.8
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 1,
        metal: false,
        ambient: 0xffffff,
        emissive: 0x000000
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.3
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x111111),
        metalness: 0.1,
        roughness: 0.4
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xAAAAAA),
        metalness: 0.6,
        roughness: 0.3
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xAAAAAA),
        metalness: 0.5,
        roughness: 0.2
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x3C3C3C),
        metalness: 0.2,
        envMap: hdrCubeMap
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.1
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 1,
        metal: false,
        ambient: 0xffffff,
        emissive: 0x000000
      }),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2B2B2B),
        metalness: 0.7,
        roughness: 0.3
      })
      ]
    },
    initCamera () {
      let width = container.offsetWidth
      let height = container.offsetHeight
      camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 6000)
      // 摄像机初始位置：平视汽车正脸
      camera.position.x = 2477.2350207333543
      camera.position.y = 144.00200950263783
      camera.position.z = 47.028635331303356
      camera.lookAt(new THREE.Vector3(0, 0, 0))
    },
    initControls () {
      controls = new OrbitControls(camera, container)
      controls.autoRotate = false
      controls.enablePan = false
      controls.minDistance = 630
      controls.maxDistance = 2090
      controls.minPolarAngle = 1.1
      controls.maxPolarAngle = 1.5
      // controls.target = new THREE.Vector3(0, 0, 0)
      // clock = new THREE.Clock()
      // 摄像机缓动目标位置：左前方俯视整车
      let temp_x = 1400
      let temp_y = 500
      let temp_z = -1500
      let tween = new TWEEN.Tween(camera.position).to({
        x: temp_x,
        y: temp_y,
        z: temp_z
      }).start().duration(2500)
      tween.onUpdate(function () {
        // console.log(camera.position)
        controls.update()
      })
    },
    initRender () {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        logarithmicDepthBuffer: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      let width = container.offsetWidth
      let height = container.offsetHeight
      renderer.setSize(width, height)
      renderer.shadowMapSoft = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
      // renderer.domElement.style.position = 'relative'
      renderer.autoClear = false
      renderer.toneMappingExposure = 1
      container.appendChild(renderer.domElement)
    },
    initLights () {
      scene.add(new THREE.AmbientLight(0xffffff))
      hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2.00)
      hemiLight.position.set(0, 500, 0)
      hemiLight.color = new THREE.Color(0xffffff)
      hemiLight.groundColor = new THREE.Color(0x000000)
      hemiLight.intensity = 1
      hemiLight.visible = false
      scene.add(hemiLight)
      light1 = this.addDirectionalLight(-350, 550, -350, 0xffffff, 1, 150, scene)
      // light9 = this.addDirectionalLight(600, 150, 30, 0xffffff, 0.2, 150, scene)
      light = this.addDirectionalLight(-300, 550, 350, 0xffffff, 1, 150, scene)
      // light5 = this.addDirectionalLight(600, 150, 30, 0xffffff, 0.2, 150, scene)
      // light9.visible = false
      light.visible = false
      // light5.visible = false
      // light1.visible = false
      light5 = new THREE.PointLight(0xffffff, 1, 0, 2)
      light5.position.set(600, 200, 30)
      light5.castShadow = true
      scene.add(light5)
      // var sphereSize = 10
      // var pointLightHelper = new THREE.PointLightHelper( light5, sphereSize )
      // scene.add( pointLightHelper )
      // var dirLightHeper5 = new THREE.DirectionalLightHelper( light5, 10 ,0x0033FF)//蓝
      // var dirLightHeper9 = new THREE.DirectionalLightHelper( light9, 10 ,0x22DD6D) //绿
      // var dirLightHeper1 = new THREE.DirectionalLightHelper( light1, 10,0xF70909 ) //红
      // var dirLightHeper = new THREE.DirectionalLightHelper( light, 10,0xCCAE33 )  //黄
      // scene.add( dirLightHeper )
      // scene.add( dirLightHeper9 )
      // scene.add( dirLightHeper5 )
      // scene.add( dirLightHeper1 )
    },
    addDirectionalLight (x, y, z, color, intensity, distance, root) {
      let directional = new THREE.DirectionalLight(color, intensity, distance)
      directional.position.set(x, y, z)
      directional.castShadow = false
      directional.shadowCameraVisible = false
      directional.shadowDarkness = 5
      root.add(directional)
      return directional
    },
    initDracoLoaderManage () {
      console.log('_rootURL:' + _rootURL)
      dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('./static/js/libs/draco/')
      dracoLoader.setDecoderConfig({
        type: 'js'
      })
    },
    dracoLoaderStart () {
      console.log('All meshes have loaded checking......')
      this.percent = 0
      // 显示已下载百分比
      this.carExtLoading(Math.floor(loadedMeshes.length / (dracoList.length / 100)))
      //loadedMeshes = null
      if (loadedMeshes.length == dracoList.length) {
        window.clearInterval(loadedClock)
        this.dracoLoaderComplete1()
      }
    },
    dracoLoaderComplete1 () {
      for (var i = 0; i < loadedMeshes.length; i++) {
        let geometry = loadedMeshes[i]
        if (geometry.type == 'Group') {
          continue
        }
        geometry.computeVertexNormals()
        // 默认挂主材质
        let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial())
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.name = geometry.name
        // 显示已下载百分比
        // this.carExtLoading(Math.floor(dracoCon / (dracoList.length / 100)))
        // 逐个处理模型材质球
        mesh.position.y = -150
        mesh.material.envMap = hdrCubeRenderTarget
        mesh.material.needsUpdate = true
        // 逐个处理模型材质球
        this.modelLoaderComplete(mesh)
      }
      // 释放预加载列表内存
      loadedMeshes = null
      this.setRenderOpen(true)
      this.loading3D = false
      // 场景中模型装载完毕，摄像机控制器缓动入镜
      this.initControls()
    },
    setRenderOpen (open) {
      if (open) {
        // light9.visible = true
        // light5.visible = true
        hemiLight.visible = true
        light.visible = true
        light1.visible = true
        // light2.visible = true
        // directionalLight.visible = true
        console.log('idddd--', idddd)
        if (idddd == null) {
          console.log('调用animate')
          idddd = requestAnimationFrame(this.animate)
        }
      } else {
        if (idddd !== null) {
          console.log('cancelanimate')
          cancelAnimationFrame(idddd)
          clearTimeout(clock)
          idddd = null
        }
      }
    },
    modelLoaderComplete (_trunk) {
      _trunk.position.y = -150
      // _trunk.position.x= this.setXposition
      // this.changePivot(500,-200,0,_trunk)
      // _trunk.rotation.x += this.setXposition
      // _meshList.push(_trunk)
      _trunk.material.envMap = hdrCubeRenderTarget
      _trunk.material.needsUpdate = true
      scene.add(_trunk)
      console.log('Mesh loaded and add in scene:' + _trunk.name)
      var geometry = _trunk
      if (geometry.name == 'cheshen_1' || geometry.name == 'cheshen_2' || geometry.name == 'cheshen_3' || geometry.name == 'cheshen_4' || geometry.name == 'cheshen_5' || geometry.name == 'cheshen_6' || geometry.name == 'cheshentuya_1' || geometry.name == 'cheshentuya_2') {
        this.createScene(geometry, mtl, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'gualogotoumingmoxing') {
        this.createScene(geometry, new THREE.MeshBasicMaterial({
          color: 0xffffff,
          specular: 0xffffff,
          transparent: true,
          shininess: 1,
          metal: false
        }), cheshenlogo_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'jingmian') {
        this.createScene(geometry, new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true
        }), jingmian_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'dimian') {
        this.createScene(geometry, new THREE.MeshBasicMaterial({
          color: 0xffffff,
          specular: 0x000000,
          opacity: 0.10,
          transparent: true
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'boli') {
        this.createScene(geometry, new THREE.MeshBasicMaterial({
          color: 0x5E5E5E,
          specular: 0x9B9BA8,
          opacity: 0.85,
          transparent: true,
          envMap: cubemap,
          shininess: 10,
          emissive: 0x9B9BA8,
          reflectivity: 0.8
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisejinshu_2' || geometry.name == 'heisejinshu_3' || geometry.name == 'heisejinshu_4' || geometry.name == 'heisejinshu_5' || geometry.name == 'heisejinshu_9') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x2B2B2B),
          metalness: 0.7,
          roughness: 0.3
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisechunse_1' || geometry.name == 'heisechunse_2' || geometry.name == 'heisechunse_3') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x000000),
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisemosha_1' || geometry.name == 'heisemosha_2' || geometry.name == 'heisemosha_3' || geometry.name == 'heisemosha_5' || geometry.name == 'heisemosha_7' || geometry.name == 'heisemosha_8') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x1A1A1A),
          metalness: 0.6,
          roughness: 0.4
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisemosha_6') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x3C3C3C),
          metalness: 0.6,
          roughness: 0.4
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisemosha_9') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x111111),
          metalness: 0.1,
          roughness: 0.4
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_1' || geometry.name == 'yinsejinshu_2') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xD5D5D5),
          metalness: 0.7,
          roughness: 0.3
        }), yinsejinshu_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'lansejinshu') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xAAAAAA),
          metalness: 0.5,
          roughness: 0.2
        }), youxiang_img, null, 0, 0, 0, 0)
      }

      if (geometry.name == 'yinsejinshu_9') {
        this.createScene(geometry, new THREE.MeshPhongMaterial({
          color: new THREE.Color(0x383838),
          metalness: 1,
          roughness: 0,
          specular: 0xcecece,
          shininess: 100
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_10') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0xB3B3B3),
          metalness: 0.7,
          roughness: 0.1
        }), null, 0, 0, 0, 0)
      }

      if (geometry.name == 'yinsejinshu_12') {
        this.createScene(geometry, new THREE.MeshBasicMaterial({
          map: luosi_img
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsemosha') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x919191),
          metalness: 0.7,
          roughness: 0.3,
          envMap: hdrCubeMap
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'chedeng') {
        this.createScene(geometry, new THREE.MeshBasicMaterial({
          color: 0xffffff,
          specular: 0xffffff,
          shininess: 1,
          metal: false,
          ambient: 0xffffff,
          emissive: 0x000000
        }), chepaizi_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisemosha_4') {//车尾挡泥板
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x111111),
          metalness: 0.1,
          roughness: 0.4
        }), null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisejinshu_1') {
        this.createScene(geometry, new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x2B2B2B),
          metalness: 0.7,
          roughness: 0.3
        }), null, 0, 0, 0, 0)
      }
      //更改
      if (geometry.name == 'luntai_6x4') {
        this.createScene(geometry, _carMaterials[1], M006AF_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisejinshu_1_6x4' || geometry.name == 'heisejinshu_2_6x4' || geometry.name == 'heisejinshu_4_6x4' || geometry.name == 'heisejinshu_3_6x4' || geometry.name == 'heisejinshu_6_6x4') {
        this.createScene(geometry, _carMaterials[2], null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisemosha_4_6x4') {//车尾挡泥板
        this.createScene(geometry, _carMaterials[3], null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_2_6x4' || geometry.name == 'yinsejinshu_3_6x4' || geometry.name == 'yinsejinshu_4_6x4' || geometry.name == 'yinsejinshu_5_6x4') {
        this.createScene(geometry, _carMaterials[4], yinsejinshu_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_7_6x4') {
        this.createScene(geometry, _carMaterials[5], youxiang_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_8_6x4') {
        this.createScene(geometry, _carMaterials[6], null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_11_6x4') {
        this.createScene(geometry, _carMaterials[7], null, 0, 0, 0, 0)
      }
      if (geometry.name == 'chedeng_6x4') {
        this.createScene(geometry, _carMaterials[8], chepaizi_img, null, 0, 0, 0, 0)
      }
      //4x2,'luntai_4x2_1','yinsejinshu_3_4x2_1','yinsejinshu_5_4x2_1'
      if (geometry.name == 'luntai_4x2' || geometry.name == 'luntai_4x2_1') {
        this.createScene(geometry, _carMaterials_4x2[1], M006AF_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisejinshu_1_4x2' || geometry.name == 'heisejinshu_3_4x2' || geometry.name == 'heisejinshu_6_4x2') {
        this.createScene(geometry, _carMaterials_4x2[2], null, 0, 0, 0, 0)
      }
      if (geometry.name == 'heisemosha_4_4x2') {//车尾挡泥板
        this.createScene(geometry, _carMaterials_4x2[3], null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_2_4x2' || geometry.name == 'yinsejinshu_3_4x2' || geometry.name == 'yinsejinshu_3_4x2_1' || geometry.name == 'yinsejinshu_4_4x2' || geometry.name == 'yinsejinshu_5_4x2' || geometry.name == 'yinsejinshu_5_4x2_1') {
        this.createScene(geometry, _carMaterials_4x2[4], yinsejinshu_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_7_4x2') {
        this.createScene(geometry, _carMaterials_4x2[5], youxiang_img, null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_8_4x2') {
        this.createScene(geometry, _carMaterials_4x2[6], null, 0, 0, 0, 0)
      }
      if (geometry.name == 'yinsejinshu_11_4x2') {
        this.createScene(geometry, _carMaterials_4x2[7], null, 0, 0, 0, 0)
      }
      if (geometry.name == 'chedeng_4x2') {
        this.createScene(geometry, _carMaterials_4x2[8], chepaizi_img, null, 0, 0, 0, 0)
      }
      // //6x2 'chedeng_6x2','heisejinshu_1_6x2','heisejinshu_3_6x2','heisemosha_4_6x2','yinsejinshu_7_6x2'

      if (geometry.name == 'heisejinshu_1_6x2' || geometry.name == 'heisejinshu_3_6x2' || geometry.name == 'heisemosha_4_6x2') {
        this.createScene(geometry, _carMaterials_6x2[3], null, 0, 0, 0, 0)
      }

      if (geometry.name == 'yinsejinshu_7_6x2') {
        this.createScene(geometry, _carMaterials_6x2[5], youxiang_img, null, 0, 0, 0, 0)
      }

      if (geometry.name == 'chedeng_6x2') {
        this.createScene(geometry, _carMaterials_6x2[8], chepaizi_img, null, 0, 0, 0, 0)
      }
      _trunk = null
      geometry = null
    },
    createScene (geometry, material, map, x, y, z, b) {
      var mesh = geometry
      if (material) {
        mesh.material = material
      }
      if (map) {
        //mesh.material.transparent = true
        mesh.material.map = map
      }
    },
    // 进度条
    carExtLoading (value) {
      // console.log(container)
      container.setAttribute('element-loading-text', '已完成:' + value + '%，整车装配中...')
      this.percent = value
      this.loadingText = value + '%,整车装配中...'
      options.text = value + '%,整车装配中...'
      options.target = container
      options.body = false
      options.fullscreen = false
      // loadingInstance = Loading.service(options)
    },
    driveOption (option) {
      console.log('驱动----', option)
      if (option == '6×4') {
        for (var i = 1; i < _carMaterials.length; i++) {
          _carMaterials[i].visible = true
          _carMaterials_4x2[i].visible = false
          _carMaterials_6x2[i].visible = false
        }
      }
      if (option == '6×4危险品') {
        for (var i = 1; i < _carMaterials.length; i++) {
          _carMaterials[i].visible = true
          _carMaterials_4x2[i].visible = false
          _carMaterials_6x2[i].visible = false
        }
      }
      if (option == '4×2') {
        for (var i = 1; i < _carMaterials.length; i++) {
          _carMaterials[i].visible = false
          _carMaterials_4x2[i].visible = true
          _carMaterials_6x2[i].visible = false
        }
      }
      if (option == '6×2R') {
        for (var i = 1; i < _carMaterials.length; i++) {
          _carMaterials[i].visible = false
          _carMaterials_4x2[i].visible = false
          _carMaterials_6x2[i].visible = true
        }
        console.log('action---', action)
        action.stop()
        action.loop = THREE.LoopRepeat
        // action.clampWhenFinished = true
        // clip.duration = 5
        // action.time = 2
        //action.setDuration(2)
        action.play()
        console.log('action2---', action)
      }
    },
    changeOption (option) {
      console.log('-----------------------', option)
      let clolorOption = option.replace('金属漆', '')
      if (clolorOption.includes('红')) {
        car_main_color = '0x2C0707'
        // light9.visible = true
        // light9.color = new THREE.Color(0xFFFFFF)
        // light9.intensity = 0.10
        // light5.visible = true
        // light5.color = new THREE.Color(0xFFFFFF)
        // light5.intensity = 0.10
        car_highlight_color = 0x2C0707
        hemiLight.color = new THREE.Color(0xFFFFFF)
        hemiLight.groundColor = new THREE.Color(0xFFFFFF)
        // hemiLight.intensity = 1.50
        light.color = new THREE.Color(0xFFFFFF)
        mtl.color = new THREE.Color(0x2C0707)
        mtl.specular = new THREE.Color(car_highlight_color)
        mtl.shininess = new THREE.Color(25)
        // mtl.shadow = new THREE.Color(4.6)
        mtl.metalness = 0.06
        mtl.roughness = 0.16
        light1.color = new THREE.Color(0xFFFFFF)
        // for (var i =1; i < _carMaterials.length; i++) {
        //     _carMaterials[i].visible = false
        //     _carMaterials_4x2[i].visible = true
        //     _carMaterials_6x2[i].visible = false
        // }

      }
      if (clolorOption == '铂金灰') {
        car_main_color = '0x333333'
        // light9.visible = true
        // light9.color = new THREE.Color(0xFFFFFF)
        // light9.intensity = 0.10
        // light5.visible = true
        // light5.color = new THREE.Color(0xFFFFFF)
        // light5.intensity = 0.10
        car_highlight_color = 0x333333
        hemiLight.color = new THREE.Color(0xFFFFFF)
        hemiLight.groundColor = new THREE.Color(0xFFFFFF)
        // hemiLight.intensity = 1.50
        light.color = new THREE.Color(0xFFFFFF)
        // light.intensity = 0.08
        mtl.color = new THREE.Color(0x333333)
        mtl.specular = new THREE.Color(car_highlight_color)
        mtl.shininess = new THREE.Color(25)
        // mtl.shadow = new THREE.Color(4.6)
        mtl.metalness = 0.06
        mtl.roughness = 0.16
        light1.color = new THREE.Color(0xFFFFFF)
        // for (var i =1; i < _carMaterials.length; i++) {
        //     _carMaterials[i].visible = true
        //     _carMaterials_4x2[i].visible = false
        //     _carMaterials_6x2[i].visible = false
        // }

      }
      if (clolorOption == '贝壳白') {
        car_main_color = '0x555555'
        // light9.visible = true
        // light9.color = new THREE.Color(0xFFFFFF)
        // light9.intensity = 0.10
        // light5.visible = true
        // light5.color = new THREE.Color(0xFFFFFF)
        // light5.intensity = 0.10

        car_highlight_color = 0x555555
        hemiLight.color = new THREE.Color(0xFFFFFF)
        hemiLight.groundColor = new THREE.Color(0xFFFFFF)
        // hemiLight.intensity = 1.50
        light.color = new THREE.Color(0xFFFFFF)
        // light.intensity = 0.08
        mtl.color = new THREE.Color(0x555555)
        mtl.specular = new THREE.Color(car_highlight_color)
        mtl.shininess = new THREE.Color(25)
        // mtl.shadow = new THREE.Color(4.6)
        mtl.metalness = 0.06
        mtl.roughness = 0.16
        light1.color = new THREE.Color(0xFFFFFF)
        // for (var i =1; i < _carMaterials.length; i++) {
        //     _carMaterials[i].visible = false
        //     _carMaterials_4x2[i].visible = false
        //     _carMaterials_6x2[i].visible = true
        // }
      }
      if (clolorOption == '珠光黑') {
        car_main_color = '0x111111'
        // light9.visible = true
        // light9.color = new THREE.Color(0xFFFFFF)
        // light9.intensity = 0.10
        // light5.visible = true
        // light5.color = new THREE.Color(0xFFFFFF)
        // light5.intensity = 0.10
        car_highlight_color = 0x111111
        hemiLight.color = new THREE.Color(0xFFFFFF)
        hemiLight.groundColor = new THREE.Color(0xFFFFFF)
        // hemiLight.intensity = 1.50
        // renderer.toneMappingExposure = 1.2
        light.color = new THREE.Color(0xFFFFFF)
        // light.intensity = 0.08
        mtl.color = new THREE.Color(0x111111)
        mtl.specular = new THREE.Color(car_highlight_color)
        mtl.shininess = new THREE.Color(25)
        // mtl.shadow = new THREE.Color(4.6)
        mtl.metalness = 0.06
        mtl.roughness = 0.16
        light1.color = new THREE.Color(0xFFFFFF)
        // light2.color = new THREE.Color(0xFFFFFF)
        // for (var i =1; i < _carMaterials.length; i++) {
        //     _carMaterials[i].visible = false
        //     _carMaterials_4x2[i].visible = true
        //     _carMaterials_6x2[i].visible = false
        // }
      }
      if (clolorOption == '嫩芽绿') {
        car_main_color = '0x445500'
        // light9.visible = true
        // light9.color = new THREE.Color(0xFFFFFF)
        // light9.intensity = 0.10
        // light5.visible = true
        // light5.color = new THREE.Color(0xFFFFFF)
        // light5.intensity = 0.10
        car_highlight_color = 0x445500
        hemiLight.color = new THREE.Color(0xFFFFFF)
        hemiLight.groundColor = new THREE.Color(0xFFFFFF)
        // hemiLight.intensity = 1.50
        light.color = new THREE.Color(0xFFFFFF)
        // light.intensity = 0.08
        mtl.color = new THREE.Color(0x445500)
        mtl.specular = new THREE.Color(car_highlight_color)
        mtl.shininess = new THREE.Color(25)
        mtl.shadow = new THREE.Color(4)
        mtl.metalness = 0.06
        mtl.roughness = 0.16
        light1.color = new THREE.Color(0xFFFFFF)
        // light2.color = new THREE.Color(0xFFFFFF)
        // for (var i =1; i < _carMaterials.length; i++) {
        //     _carMaterials[i].visible = false
        //     _carMaterials_4x2[i].visible = true
        //     _carMaterials_6x2[i].visible = false
        // }
      }
    },
    onWindowResize () {
      let width = document.getElementById('go3D').offsetWidth
      let height = document.getElementById('go3D').offsetHeight
      // camera.aspect = width / height
      // camera.updateProjectionMatrix()
      // renderer.setSize(width, height)
      // renderer.setPixelRatio(window.devicePixelRatio)
      // camera.aspect = window.innerWidth / window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      //render()
      renderer.setSize(width, height)
    },
    animate () {
      renderer.clear()
      console.log('在执行.....')
      if (inited) {
        renderer.render(scene, camera)
      }
      var delta = clock2.getDelta()
      if (mixers) mixers.update(delta)
      // Angle()
      TWEEN.update()
      controls.update()
      clock = setTimeout(() => {
        idddd = requestAnimationFrame(this.animate)
      }, 50)
    }
  }
}
</script>
<style>
.CarExplorer-wrap {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
