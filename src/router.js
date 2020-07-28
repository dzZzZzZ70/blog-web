import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login'
import Home from './pages/Home'
import store from './store/index'
// import Index from './pages/Index'
import BlogLayout from './layout/BlogLayout'
import Edit from './pages/EditBlog'
import Visit from './pages/blog/Blog'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/index/home'
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/index',
            name: 'index',
            component: BlogLayout,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: Home
                },
                {
                    path: 'edit',
                    name: 'edit',
                    component: Edit
                },
                {
                    path: ':id',
                    name: 'visti',
                    props: true,
                    component: Visit
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && to.name === 'edit' &&  (!store.state.userInfo || !store.state.userInfo.userAccount || store.state.userInfo.userAccount === '')) {
        next({ name: 'login' })
    } 
    else {
        next()
    }
})

export default router