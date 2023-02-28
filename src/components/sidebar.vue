<template>
    <div class="sidebar">
        <el-menu 
            class="sidebar-el-menu" 
            :default-active="onRoutes" 
            :collapse="sidebar.collapse" 
            background-color="#324157"
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
                            <el-sub-menu
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
        title: '数据安全监测',
        permiss: '1',
        subs:[
            {
                index: '/dashboard',
                title: '数据安全事件统计',
                permiss: '2',
            },
            // {
            //     index: '/editor',
            //     title: '数据安全事件预警',
            //     permiss: '3',
            // },
            {
                index: '/table',
                title: '数据安全事件汇总',
                permiss: '4',
            },
        ]
    },
    {
        icon: 'Bell',
        index: '1',
        title: '重点APP监测',
        permiss: '5',
        subs: [
            {
                index: '/APPstat',
                title: 'APP事件统计',
                permiss: '6',
            },
            {
                index: '/APPsearch',
                title: 'APP综合查询',
                permiss: '7',
            },
            {
                index: '/noRecordApp',
                title: '未备案APP处置',
                permiss: '8',
            },
        ],
    },
    {
        icon: 'Warning',
        index: '/securityAnalysis',
        title: '网站安全监测',
        permiss: '5',
        subs: [
            // {
            //     index: '/securityAnalysis',
            //     title: '安全分析',
            //     permiss: '6',
            // },
            {
                index: '/taskManagement',
                title: '任务管理',
                permiss: '7',
            },
            {
                index: '/networkStat',
                title: '数据展示',
                permiss: '8',
            },
        ],
    },
    {
        icon: 'WarnTriangleFilled',
        index: '/threatIntelligence',
        title: '威胁情报分析',
        permiss: '9',
        subs: [
            {
                index: '/threatIntelligence',
                title: '威胁研判',
                permiss: '10',
            },
            {
                index: '/attackAndDefence',
                title: '组织与资产检索',
                permiss: '11',
            },
        ],
    },
    {
        icon: 'Wallet',
        index: '/provincePage',
        title: '虚拟货币挖矿监测',
        permiss: '12',
        subs: [
            {
                index: '/provincePage',
                title: '挖矿行为监测',
                permiss: '13',
            },
        ],
    },
    {
        icon: 'MessageBox',
        index: '/domainMonitoring',
        title: '域名安全监测',
        permiss: '15',
        subs: [
            {
                index: '/domainMonitoring',
                title: '域名异常监测',
                permiss: '15',
            },
            {
                index: '/domainSetting',
                title: '配置管理',
                permiss: '15',
            },
        ],
    },
    // {
    //     icon: 'DocumentCopy',
    //     index: '/tabs',
    //     title: 'tab选项卡',
    //     permiss: '3',
    // },
    // {
    //     icon: 'Edit',
    //     index: '3',
    //     title: '表单相关',
    //     permiss: '4',
    //     subs: [
    //         {
    //             index: '/form',
    //             title: '基本表单',
    //             permiss: '5',
    //         },
    //         {
    //             index: '/upload',
    //             title: '文件上传',
    //             permiss: '6',
    //         },
    //         {
    //             index: '4',
    //             title: '三级菜单',
    //             permiss: '7',
    //             subs: [
    //                 {
    //                     index: '/editor',
    //                     title: '富文本编辑器',
    //                     permiss: '8',
    //                 },
    //                 {
    //                     index: '/markdown',
    //                     title: 'markdown编辑器',
    //                     permiss: '9',
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     icon: 'Setting',
    //     index: '/icon',
    //     title: '自定义图标',
    //     permiss: '10',
    // },
    // {
    //     icon: 'PieChart',
    //     index: '/charts',
    //     title: 'schart图表',
    //     permiss: '11',
    // },
    // {
    //     icon: 'Warning',
    //     index: '/permission',
    //     title: '权限管理',
    //     permiss: '13',
    // },
    // {
    //     icon: 'CoffeeCup',
    //     index: '/donate',
    //     title: '支持作者',
    //     permiss: '14',
    // },
];

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 48px;
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
</style>
