import Vue from 'vue'
import Router from 'vue-router'
import UniquAppHome from './page/uniquApp/components/home.vue'
// import CarExplorer from './components/CarExplorer.vue'
// import Vr from './components/vr/vr.vue'
import uniquAppHomeRouter from './page/uniquApp/router.js'

Vue.use(Router);
let routes = [
        {
            path:'/',
            name:'home',
            component:UniquAppHome
        },
        {
            path:'/uniquApp/home',
            name:'home',
            component:UniquAppHome

        },
        // {
        //     path:'/carExplorer',
        //     name:'home',
        //     component:CarExplorer

        // },
        // {
        //     path:'/vr',
        //     name:'home',
        //     component:Vr

        // }
    ]
uniquAppHomeRouter.forEach((item,index)=>{
    routes.push(item)
})

export default new Router({routes})
