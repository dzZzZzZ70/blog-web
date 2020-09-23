import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login'
import Home from './pages/Home'
import store from './store/index'
// import Index from './pages/Index'
import BlogLayout from './layout/BlogLayout'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '',
            name: 'index',
            component: BlogLayout,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: Home
                },
                {
                    path: 'info/:id',
                    name: 'info',
                    component: () => import('./pages/Info.vue')
                },
                {
                    path: 'type',
                    name: 'type',
                    props: true,
                    component: () => import('./pages/type.vue')
                },
                {
                    path: 'label',
                    name: 'label',
                    component: () => import('./pages/label.vue')
                },
                {
                    path: '',
                    name: 'view',
                    component: () => import('./pages/management/BlogView'),
                    children: [
                        {
                            path: 'issue/:id',
                            name: 'issue',
                            component: () => import('./pages/management/Issue.vue')
                        },

                        {
                            path: 'neaten',
                            name: 'neaten',
                            component: () => import('./pages/management/Neaten')
                        }
                    ]
                },
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log('to', to, store.state.userInfo)
    if (to.name !== 'login' && to.name === 'neaten' &&  (!store.state.userInfo || !store.state.userInfo.userAccount || store.state.userInfo.userAccount === '')) {
        console.log('重定向登录')
        next({ name: 'login' })
    } 
    else {
        next()
    }
})

export default router