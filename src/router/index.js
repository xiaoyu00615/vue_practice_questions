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
        path: '/chat',
        name:'SparkChat',
        component:()=> import ('@/views/SparkChat.vue')
    },
    {
        path: '/answer-question',
        name:'AnswerQuestion',
        component:()=> import('@/views/AnswerQuestion.vue')
    },
    {
        path: '/back-question',
        name:'BackQuestion',
        component:()=> import('@/views/BackQuestion.vue')
    },
    {
        path: '/notebook',
        name:'NoteBook',
        component:()=> import('@/views/NoteBook.vue')
    },{
        path: '/setting',
        name:"Setting",
        component:()=> import('@/views/Setting.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router