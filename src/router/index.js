import Vue from 'vue'
import Router from 'vue-router'

const DashboardLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue')
const LandingPageLayout = () => import('../components/landingPageLayout.vue')

function loadView(view) {
    return () => import( /* webpackChunkName: "view-[request]" */ `../components/dashboardContents/${view}.vue`)
}

function loadLandingPage(view){
    return () => import(`../components/landingPageContents/${view}.vue`)
}

const routes = [
    { 
        path: '/',
        component: LandingPageLayout,
        children: [
            {
                name: 'LandingPage',
                path: '',
                component: loadLandingPage('landingPage')
            }
        ]
    },
    {
        path: '/dashboard', 
        component: DashboardLayout, 
        children: [ 
            {
                name: 'loginController',
                path: '/login',
                component: loadView('loginController')
            },
            { 
                name: 'UserController', 
                path: '/user', 
                component: loadView('userController') 
            },
            { 
                name: 'CabangBengkelController',            
                path: '/bengkel', 
                component: loadView('bengkelController') 
            } 
        ] 
    }, 
    // {
    //     path: '/',
    //     component: DashboardLayout,
    //     children: [
    //         {
    //             name: 'UserController',
    //             path: '',
    //             component: loadView('userController')
    //         }
    //     ]
    // },
    // {
    //     path: '/bengkel',
    //     component: DashboardLayout,
    //     children: [
    //         {
    //             name: 'CabangBengkelController',
    //             path: '',
    //             component: loadView('bengkelController')
    //         }
    //     ]
    // }, 
]
Vue.use(Router)

const router = new Router({mode: 'history', routes: routes})

export default router