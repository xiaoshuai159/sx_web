import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { usePermissStore } from '../store/permiss';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
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
                    title: '数据库安全',
                    permiss: '2',
                },
                component: () => import('../views/dashboard.vue'),
            },
            {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '事件预警',
                    permiss: '3',
                },
                component: () => import('../views/editor.vue'),
            },
            {
                path: '/table',
                name: 'basetable',
                meta: {
                    title: '事件汇总',
                    permiss: '4',
                },
                component: () => import('../views/table.vue'),
            },
            {
                path: '/APPstat',
                name: 'APPstat',
                meta: {
                    title: 'APP监测',
                    permiss: '5',
                },
                component: () => import('../views/APPstat.vue'),
            },
            {
                path: '/APPsearch',
                name: 'APPsearch',
                meta: {
                    title: 'APP事件查询',
                    permiss: '6',
                },
                component: () => import('../views/APPsearch.vue'),
            },
            // {
            //     path: '/securityAnalysis',
            //     name: 'securityAnalysis',
            //     meta: {
            //         title: '安全分析',
            //         permiss: '7',
            //     },
            //     component: () => import('../views/securityAnalysis.vue'),
            // },
            {
                path: '/taskManagement',
                name: 'taskManagement',
                meta: {
                    title: '任务管理',
                    permiss: '8',
                },
                component: () => import('../views/taskManagement.vue'),
            },
            {
                path: '/networkStat',
                name: 'networkStat',
                meta: {
                    title: '数据展示',
                    permiss: '9',
                },
                component: () => import('../views/networkStat.vue'),
            },
            {
                path: '/noRecordApp',
                name: 'noRecordApp',
                meta: {
                    title: '未备案APP处置',
                    permiss: '10',
                },
                component: () => import('../views/noRecordApp.vue'),

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
                    title: '追踪溯源',
                    permiss: '12',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/attackAndDefence.vue'),
            },
            {
                path: '/provincePage',
                name: 'provincePage',
                meta: {
                    title: '挖矿行为监测',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/mining/provincePage.vue'),

            },
            {
                path: '/cityPage',
                name: 'cityPage',
                meta: {
                    title: '挖矿行为监测',
                    permiss: '14',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/mining/cityPage.vue'),
            },
            {
                path: '/areaPage',
                name: 'areaPage',
                meta: {
                    title: '挖矿行为监测',
                    permiss: '14',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/mining/areaPage.vue'),
            },
            {
                path: '/domainMonitoring',
                name: 'domainMonitoring',
                meta: {
                    title: '域名异常监测',
                    permiss: '15',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/domainMonitoring.vue'),
            },
            
            {
                path: '/domainSetting',
                name: 'domainSetting',
                meta: {
                    title: '配置管理',
                    permiss: '15',
                },
                component: () => import(/* webpackChunkName: "charts" */ '../views/domainSetting.vue'),
            },
            {
                path:'/bugPage',
                name:'bugPage',
                meta:{
                    title:'漏洞',
                    permiss:'16',
                },
                component: () => import('../views/bugPage.vue')

            },
            {
                path:'/jiangPage',
                name:'jiangPage',
                meta:{
                    title:'僵木蠕',
                    permiss:'16',
                },
                component: () => import('../views/jiangPage.vue')

            },
            {
                path:'/harmEvent',
                name:'harmEvent',
                meta:{
                    title:'公共危害事件',
                    permiss:'16',
                },
                component: () => import('../views/harmEvent.vue')

            },
            {
                path: '/permission',
                name: 'permission',
                meta: {
                    title: '权限管理',
                    permiss: '13',
                },
                component: () => import(/* webpackChunkName: "permission" */ '../views/permission.vue'),
            },
            // {
            //     path: '/upload',
            //     name: 'upload',
            //     meta: {
            //         title: '上传插件',
            //         permiss: '6',
            //     },
            //     component: () => import(/* webpackChunkName: "upload" */ '../views/upload.vue'),
            // },
            // {
            //     path: '/icon',
            //     name: 'icon',
            //     meta: {
            //         title: '自定义图标',
            //         permiss: '10',
            //     },
            //     component: () => import(/* webpackChunkName: "icon" */ '../views/icon.vue'),
            // },
            // {
            //     path: '/user',
            //     name: 'user',
            //     meta: {
            //         title: '个人中心',
            //     },
            //     component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
            // },
            // {
            //     path: '/editor',
            //     name: 'editor',
            //     meta: {
            //         title: '富文本编辑器',
            //         permiss: '8',
            //     },
            //     component: () => import(/* webpackChunkName: "editor" */ '../views/editor.vue'),
            // },
            // {
            //     path: '/markdown',
            //     name: 'markdown',
            //     meta: {
            //         title: 'markdown编辑器',
            //         permiss: '9',
            //     },
            //     component: () => import(/* webpackChunkName: "markdown" */ '../views/markdown.vue'),
            // },
            // {
            //     path: '/export',
            //     name: 'export',
            //     meta: {
            //         title: '导出Excel',
            //         permiss: '2',
            //     },
            //     component: () => import(/* webpackChunkName: "export" */ '../views/export.vue'),
            // },
            // {
            //     path: '/import',
            //     name: 'import',
            //     meta: {
            //         title: '导入Excel',
            //         permiss: '2',
            //     },
            //     component: () => import(/* webpackChunkName: "import" */ '../views/import.vue'),
            // },
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
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} `;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;
