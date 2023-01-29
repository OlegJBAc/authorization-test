import Main from '@/components/pages/Main'
import Login from '@/components/pages/Login'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {
        path: '/main',
        component: Main,
    },
    {
        path: '/login',
        component: Login,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})


export default router