/**
 * 路由配置模块
 */

import Home from './components/home';
// import Details from './components/details';
// import ImgUpload from './components/imgUpload';
import ListView from './components/ListView.vue';
import Detail from './components/Detail.vue'
import IntelligenceSelDetail from './components/IntelligenceSelDetail.vue'
import CompareCarList from './components/CompareCarList.vue'
import CompareResult from './components/CompareResult.vue'
import CarDetails from './components/CarDetails.vue'
import PersonalCustomization from './components/PersonalCustomization.vue'
import CarExplorer from '../../components/CarExplorer.vue'
import Vr from '../../components/vr/vr.vue'
import IntelligenceHome from './components/IntelligenceHome.vue'




// import AddPage from './addPage.jsx';
let router = [
    {
        path: '/uniquApp/home',
        component: Home,
        title: '实名认证',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/listView',
        component: ListView,
        title: '热销推荐',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/hotRecommendDetail',
        component: Detail,
        title: '热销推荐详情',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/intelligenceSeldetail',
        component: IntelligenceSelDetail,
        title: '智能选车详情',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/compareCarList',
        component: CompareCarList,
        title: '车辆对比',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/compareResult',
        component: CompareResult,
        title: '车辆对比',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/carDetails',
        component: CarDetails,
        title: '配置小节',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/vr',
        component: Vr,
        title: 'VR',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/carExplorer',
        component: CarExplorer,
        title: '3D',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/personalCustomization',
        component: PersonalCustomization,
        title: '个性定制',
        show: true,
        exact: true
    },
    {
        path: '/uniquApp/intelligenceHome',
        component: IntelligenceHome,
        title: '3D',
        show: true,
        exact: true
    },
    
]
export default router; 
