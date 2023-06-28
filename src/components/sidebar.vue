<template>
    <div class="sidebar">
        <!-- background-color="#324157" -->
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="sidebar.collapse" background-color="#0e538f"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <!-- background-color="#0e538f" -->
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <template #title>
                            <el-icon>
                                <component :is="item.icon"></component>
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <!-- <el-sub-menu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                                v-permiss="item.permiss"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index" v-permiss="item.permiss">
                                {{ subItem.title }}
                            </el-menu-item> -->
                            <el-menu-item :index="subItem.index" v-permiss="item.permiss">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
// import app from '../main';
import { usePermissStore } from '../store/permiss';
import { computed,ref } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';
import router from '../router';
let items:any = ref([
    // {
    //     icon: 'Odometer',
    //     index: '/dashboard',
    //     title: '数据安全',
    //     permiss: '1',
    //     subs: [
    //         {
    //             index: '/dashboard',
    //             title: '数据库安全事件',
    //             permiss: '2',
    //         },
    //         {
    //             index: '/APPstat',
    //             title: 'APP检测分析',
    //             permiss: '3',
    //         },
    //     ]
    // },
    // {
    //     icon: 'Warning',
    //     index: '/securityAnalysis',
    //     title: '网络安全',
    //     permiss: '4',
    //     subs: [
    //         {
    //             index: '/provincePage',
    //             title: '挖矿行为监测',
    //             permiss: '5',
    //         },
    //         {
    //             index: '/bugPage',
    //             title: '漏洞监测',
    //             permiss: '6',
    //         },
    //         {
    //             index: '/jiangPage',
    //             title: '僵木蠕事件监测',
    //             permiss: '7',
    //         },
    //         {
    //             index: '/domainMonitoring',
    //             title: '域名异常监测',
    //             permiss: '8',
    //         }
    //     ],
    // },
    // {
    //     icon: 'WarnTriangleFilled',
    //     index: '/threatIntelligence',
    //     title: '分析研判',
    //     permiss: '9',
    //     subs: [
    //         {
    //             index: '/attackSearch',
    //             title: '威胁研判',
    //             // title: '威胁研判',
    //             permiss: '10',
    //         },
    //         {
    //             index: '/threatIntelligence',
    //             title: '威胁情报库',
    //             // title: '威胁研判',
    //             permiss: '11',
    //         },
    //         {
    //             index: '/attackAndDefence',
    //             // title: '组织与资产检索',
    //             title: '追踪溯源分析',
    //             permiss: '12',
    //         },
    //         {
    //             index: '/harmEvent',
    //             // title: '组织与资产检索',
    //             title: '公共危害事件',
    //             permiss: '13',
    //         }
    //     ],
    // },
    // {
    //     icon: 'MessageBox',
    //     index: '/permission',
    //     title: '系统管理',
    //     permiss: '14',
    //     subs: [
    //         {
    //             index: '/permission',
    //             title: '用户管理',
    //             permiss: '15',
    //         },
    //     ],
    // }
]);
const items1 = [{
    icon: 'Odometer',
    index: '/dashboard',
    title: '数据安全',
    permiss: '1',
    subs: [
        {
            index: '/dashboard',
            title: '数据库安全事件',
            permiss: '2',
        },
        {
            index: '/APPstat',
            title: 'APP检测分析',
            permiss: '3',
        },
    ]
}];
const items2 = [{
    icon: 'Warning',
    index: '/securityAnalysis',
    title: '网络安全',
    permiss: '4',
    subs: [
        {
            index: '/provincePage',
            title: '挖矿行为监测',
            permiss: '5',
        },
        {
            index: '/bugPage',
            title: '漏洞监测',
            permiss: '6',
        },
        {
            index: '/jiangPage',
            title: '僵木蠕事件监测',
            permiss: '7',
        },
        {
            index: '/domainMonitoring',
            title: '域名异常监测',
            permiss: '8',
        }
    ],
}];
const items3 = [{
    icon: 'WarnTriangleFilled',
    index: '/threatIntelligence',
    title: '分析研判',
    permiss: '9',
    subs: [
        {
            index: '/attackSearch',
            title: '威胁研判',
            // title: '威胁研判',
            permiss: '10',
        },
        {
            index: '/threatIntelligence',
            title: '威胁情报库',
            // title: '威胁研判',
            permiss: '11',
        },
        {
            index: '/attackAndDefence',
            // title: '组织与资产检索',
            title: '追踪溯源分析',
            permiss: '12',
        },
        {
            index: '/harmEvent',
            // title: '组织与资产检索',
            title: '公共危害事件',
            permiss: '13',
        }
    ],
}];
const route = useRoute();
const onRoutes = computed(() => {
    // “不走登录” 设置 ms_keys 权限，侧边栏内容显示
    // localStorage.setItem('ms_keys', '["1","2","3","4","5","6","7","8","9","10","11","12","13"]');
    console.log('执行onRoutes');
    // router.beforeEach((to,from,next)=>{
    //     if(to.path=='/dashboard'||to.path=='/APPstat'){
    //         // localStorage.setItem('ms_keys', '["1","2","3"]')
    //         items.value = items1
    //     }else if(to.path=='/provincePage'||to.path=='/bugPage'||to.path=='/jiangPage'||to.path=='/domainMonitoring'){
    //         // localStorage.setItem('ms_keys', '["4","5","6","7","8"]')
    //         items.value = items2
    //     }else{
    //         // localStorage.setItem('ms_keys', '["9","10","11","12","13"]')
    //         items.value = items3
    //     }
    //     next()
    // })
    // console.log(route.path);
    
    const sidebarItems:any = {
    '/dashboard': items1,
    '/APPstat': items1,
    '/provincePage': items2,
    '/cityPage': items2,
    '/areaPage': items2,
    '/bugPage': items2,
    '/jiangPage': items2,
    '/domainMonitoring': items2,
    '/threatIntelligence': items3,
    '/attackSearch': items3,
    '/attackAndDefence': items3,
    '/harmEvent': items3,
  };
  const sidebar = sidebarItems[route.path] || [];
//   console.log(sidebar);
  items.value = sidebar
    return route.path;
});
const sidebar = useSidebarStore();

</script>

<style scoped lang="less">
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    // top: 48px;
    top: 56px;
    bottom: 0;
    overflow-y: scroll;
    transition: all 0.3s;
}

.sidebar .sidebar-el-menu {
    background: url(../assets/img/menuLeftpush.png) no-repeat;
    background-size: cover;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 220px;
}

.sidebar>ul {
    height: 100%;
}

.el-submenu .el-menu-item {
    font-size: 16px;
    padding-left: 68px !important;
}

.el-submenu .el-submenu__title {
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid;
    border-image: -webkit-linear-gradient(left, transparent, rgba(114, 171, 207, .2), transparent) 1 15 1;
}

.el-menu-item.is-active {
    color: #fff;
    background: rgba(111, 228, 242, .1) !important;
    outline: none;
    position: relative;
}

.el-menu--collapse .el-submenu.is-active:before,
.el-menu-item.is-active:before,
.el-menu-item:focus:before,
.el-submenu:focus:before {
    content: "";
    width: 0;
    height: 23%;
    border-top: 20px solid transparent;
    border-left: 3px solid #6fe4f2;
    border-bottom: 20px solid transparent;
    position: absolute;
    left: 2px;
}

.el-menu-item.is-active:after,
.el-menu-item:focus:after {
    content: "";
    width: 2px;
    height: 100%;
    background: #6fe4f2;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
