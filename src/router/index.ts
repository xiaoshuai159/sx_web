import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        // redirect: '/dashboard',
        redirect: '/provincePage',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '数据库安全事件',
                    permiss: '2',
                },
                component: () => import('../views/dashboard.vue'),
            },
            {
                path: '/APPstat',
                name: 'APPstat',
                meta: {
                    title: 'APP检测分析',
                    permiss: '3',
                },
                component: () => import('../views/APPstat.vue')
                
            },
            {
                path: '/threatIntelligence',
                name: 'threatIntelligence',
                meta: {
                    title: '威胁情报库',
                    permiss: '11',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/threatIntelligence.vue'),
            },
            {
                path: '/attackAndDefence',
                name: 'attackAndDefence',
                meta: {
                    title: '追踪溯源分析',
                    permiss: '12',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/attackAndDefence.vue'),
            },
            // {
            //     path: '/countryPage',
            //     name: 'countryPage',
            //     meta: {
            //         title: '挖矿行为监测',
            //         permiss: '13',
            //     },
            //     component: () => import(/* webpackChunkName: "charts" */ '../views/mining/countryPage.vue'),

            // },
            {
                path: '/provincePage',
                name: 'provincePage',
                meta: {
                    title: '挖矿行为监测',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/mining/provincePage.vue')
                
            },
            {
                path: '/cityPage',
                name: 'cityPage',
                meta: {
                    title: '挖矿行为监测',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/mining/cityPage.vue'),
            },
            {
                path: '/areaPage',
                name: 'areaPage',
                meta: {
                    title: '挖矿行为监测',
                    permiss: '5',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/mining/areaPage.vue'),
            },
            {
                path: '/domainMonitoring',
                name: 'domainMonitoring',
                meta: {
                    title: '域名异常监测',
                    permiss: '8',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/domainMonitoring.vue'),
            },
            
            // {
            //     path: '/domainSetting',
            //     name: 'domainSetting',
            //     meta: {
            //         title: '配置管理',
            //         permiss: '15',
            //     },
            //     component: () => import(/* webpackChunkName: "charts" */ '../views/domainSetting.vue'),
            // },
            {
                path:'/bugPage',
                name:'bugPage',
                meta:{
                    title:'漏洞监测',
                    permiss:'6',
                },
                component: () => import('../views/bugPage.vue')

            },
            {
                path:'/jiangPage',
                name:'jiangPage',
                meta:{
                    title:'僵木蠕事件监测',
                    permiss:'7',
                },
                component: () => import('../views/jiangPage.vue')

            },
            {
                path:'/attackSearch',
                name:'attackSearch',
                meta:{
                    title:'威胁研判',
                    permiss:'10',
                },
                component: () => import('../views/attackSearch.vue')

            },
            {
                path:'/harmEvent',
                name:'harmEvent',
                meta:{
                    title:'公共危害事件',
                    permiss:'13',
                },
                component: () => import('../views/harmEvent.vue')

            },
            {
                path: '/permission',
                name: 'permission',
                meta: {
                    title: '用户管理',
                    permiss: '15',
                },
                component: () => import(/* webpackChunkName: "permission" */ '../views/permission.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
// 路由守卫
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} `;
//     const role = localStorage.getItem('ms_username');
//     const permiss = usePermissStore();
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
//         // 如果没有权限，则进入403
//         next('/403');
//     } else {
//         next();
//     }
// });

export default router;
