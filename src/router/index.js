import { createRouter,createWebHistory } from "vue-router";


const routes = [
    {
        path:'/',
        name:'Home',
        component:()=> import('@/views/Home.vue')
    },
    {
        path:'/login',
        name:'Login',
        component:()=> import('@/views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component:()=> import('@/views/Register.vue')
    },
    {
        path: '/use-topic',
        name:'UseTopic',
        component:()=> import('@/views/UseTopic.vue')
    },
    {
        path: '/chat',
        name:'SparkChat',
        component:()=> import ('@/views/SparkChat.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router