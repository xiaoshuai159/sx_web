<template>
    <div class="sidebar">
        <!-- background-color="#324157" -->
        <el-menu 
            class="sidebar-el-menu" 
            :default-active="onRoutes" 
            :collapse="sidebar.collapse" 
            
            background-color="#0e528f"
            text-color="#bfcbd9" 
            active-text-color="#20a0ff" 
            unique-opened 
            router
        >
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
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [
    {
        icon: 'Odometer',
        index: '/dashboard',
        title: '数据安全',
        permiss: '1',
        subs:[
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
    },
    {
        icon: 'Warning',
        index: '/securityAnalysis',
        title: '网络安全',
        permiss: '5',
        subs: [
            {
                index: '/provincePage',
                title: '挖矿行为监测',
                permiss: '13',
            },
            {
                index: '/bugPage',
                title: '漏洞监测',
                permiss: '14',
            },
            {
                index: '/jiangPage',
                title: '僵木蠕事件监测',
                permiss: '15',
            }
        ],
    },
    {
        icon: 'WarnTriangleFilled',
        index: '/threatIntelligence',
        title: '分析研判',
        permiss: '9',
        subs: [
             {
                index: '/domainMonitoring',
                title: '域名异常监测',
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
                permiss: '12',
            }
        ],
    },
    {
        icon: 'MessageBox',
        index: '/permission',
        title: '系统管理',
        permiss: '13',
        subs: [
             {
                index: '/permission',
                title: '用户管理',
                permiss: '13',
            },
        ],
    },
    // {
    //     icon: 'MessageBox',
    //     index: '/domainMonitoring',
    //     title: '域名安全监测',
    //     permiss: '15',
    //     subs: [
    //         {
    //             index: '/domainMonitoring',
    //             title: '域名异常监测',
    //             permiss: '15',
    //         },
    //         {
    //             index: '4',
    //             title: '配置管理',
    //             permiss: '15',
    //             subs:[
    //                 {
    //                     index: '/domainSetting',
    //                     title: '三级菜单1',
    //                     permiss: '16',
    //                 },
    //                 {
    //                     index: '/threatIntelligence',
    //                     title: '三级菜单2',
    //                     permiss: '17',
    //                 },
    //             ]
    //         },
    //     ],
    // },
];

const route = useRoute();
const onRoutes = computed(() => {
    // “不走登录” 设置 ms_keys 权限，侧边栏内容显示
    localStorage.setItem('ms_keys', '["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]');
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
    top: 76px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 210px;
}
.sidebar > ul {
    height: 100%;
}
:deep(.el-sub-menu__title){
    height: 50px;
}
</style>
