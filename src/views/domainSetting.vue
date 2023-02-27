<template>
    <div>
        <el-tabs type="border-card" @tab-change="tabChange">
            <el-tab-pane label="节点管理">
                <div>
                    <ul>
                        <li v-for="(value,key,index) in liDatas" :key="index">
                            <span class="top-text">{{key}}</span><br/>
                            <span class="bottom-text">{{value}}</span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="配置分发">配置分发</el-tab-pane>
        </el-tabs>
        <el-card shadow="never" style="margin-top:10px;border-radius: 0" v-if="showCard">
            <el-input
                class="w-50 m-2"
                placeholder="筛选节点......"
                :prefix-icon="Search"
            />
            <el-table :data="tableData" style="width: 100%;margin-top: 15px;">
                <el-table-column prop="name" label="名称" min-width="100">
                    <template #default="scope">
                        <div>
                            <el-icon style="display:inline-block; margin-right: 5px;"><Star /></el-icon>
                            <span>{{ scope.row.name }}</span>
                            <span style="display:block;color:#aaaaaa;">{{ scope.row.ip }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="alarm" label="告警" min-width="100" />
                <el-table-column prop="status" label="状态" min-width="100"/>
                <el-table-column prop="burst" label="分片" min-width="100" />
                <el-table-column label="CPU使用率" min-width="100" >
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Top /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.CPU }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="负载平均值" min-width="100">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Top /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.load }}</span>
                        </div>
                    </template>
                </el-table-column>
                
                <el-table-column prop="JVM" label="JVM堆" min-width="100">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Bottom /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.JVM }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="磁盘可用空间" min-width="100">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><Bottom /></el-icon>
                            <span style="margin-left: 10px">{{ scope.row.disk }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="管理" label="管理" min-width="100">
                    <template #default>
                        <el-button link type="primary" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script setup lang="ts" name="domainSetting">
import { reactive,ref } from 'vue'
import { Search } from '@element-plus/icons-vue';
let showCard = ref(true)
const liDatas:object = reactive({
    状态:'Yellow',
    告警:0,
    节点:1,
    索引:34,
    JVM堆:'591.5MB/1.9GB',
    分片合计:35,
    未分配分片:1,
    文档:953514,
    数据:'533.6MB'
})
const tableData:any[] = [{
    name:'node1',
    ip:'192.168.136.136：9300',
    alarm:'Clear',
    status:'联机',
    burst: 34,
    CPU: '7%',
    load: '1.73',
    JVM: '29%',
    disk:'32.4GB'
},]
const tabChange = (a:any) => {
    console.log(a);
    if(a == 0){
        showCard.value = true
    }
    else if(a == 1){
        showCard.value = false
    }
}
</script>
<style scoped>
ul{
    display: flex;
    justify-content: space-between;
    /* background-color: pink; */
}
ul>li{
    display: inline-block;

}
.top-text {   
    display: block;
    font-size: 14px;
    color: #616161;
    /* margin: 6px 0 1px 10px; */
}

.bottom-text {
    font-size: 14px;
    font-weight: 600;
    /* margin: 1px 0 6px 10px; */
}
</style>